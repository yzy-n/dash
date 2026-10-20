<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import stationUpIconUrl from '@/assets/img/bus-stop.svg'

const props = withDefaults(
  defineProps<{
    stations?: Array<{ name: string; lng?: number; lat?: number; direction?: 'up' | 'down' }>
  }>(),
  {
    stations: () => []
  }
)

const mapRef = ref<HTMLDivElement | null>(null)

let map: AMap.Map | null = null
let geoLayer: AMap.Polygon[] = []
let stationLayer: any[] = []
let AMapGlobal: typeof AMap | null = null
let loadPromise: Promise<typeof AMap | null> | null = null
const loadError = ref('')

const anshanGeoBase = import.meta.env.BASE_URL.startsWith('.') ? '/' : import.meta.env.BASE_URL
const ANSHAN_GEO_URL = `${anshanGeoBase}geo/anshan.geojson`

const resolveFeaturePath = (feature: any) => {
  const geometry = feature?.geometry
  if (!geometry) return null

  if (geometry.type === 'Polygon') {
    return geometry.coordinates
  }

  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates
  }

  return null
}

const loadAMapApi = async () => {
  if (AMapGlobal) return AMapGlobal
  if (loadPromise) return loadPromise
  const key =
    (import.meta.env.VITE_AMAP_KEY as string | undefined) ||
    (import.meta.env.VITE_GAODE_KEY as string | undefined) ||
    ''
  if (!key) {
    loadError.value = '未配置高德 Key（VITE_AMAP_KEY）'
    return null
  }

  loadPromise = AMapLoader.load({
    key,
    version: '2.0',
    plugins: ['AMap.ToolBar', 'AMap.Scale']
  })
    .then((AMap) => {
      AMapGlobal = AMap
      return AMap
    })
    .catch(() => {
      loadError.value = '高德地图加载失败'
      return null
    })
    .finally(() => {
      loadPromise = null
    })

  return loadPromise
}

const resolveLngLat = (item: any) => {
  const lng =
    item?.lng ??
    item?.lon ??
    item?.longitude ??
    item?.x ??
    item?.lngLat?.[0] ??
    item?.location?.[0] ??
    item?.position?.[0]
  const lat =
    item?.lat ??
    item?.latitude ??
    item?.y ??
    item?.lngLat?.[1] ??
    item?.location?.[1] ??
    item?.position?.[1]
  const lngNum = typeof lng === 'string' ? Number(lng) : lng
  const latNum = typeof lat === 'string' ? Number(lat) : lat
  if (typeof lngNum !== 'number' || typeof latNum !== 'number') return null
  if (!Number.isFinite(lngNum) || !Number.isFinite(latNum)) return null
  return [lngNum, latNum] as [number, number]
}

const clearStationLayer = () => {
  if (!map || !stationLayer.length) return
  map.remove(stationLayer)
  stationLayer = []
}

const renderStations = () => {
  if (!map || !AMapGlobal) return
  const source = props.stations || []
  const upPoints = source
    .filter((item) => item?.direction === 'up' || !item?.direction)
    .map((item) => resolveLngLat(item))
    .filter(Boolean) as [number, number][]
  const downPoints = source
    .filter((item) => item?.direction === 'down')
    .map((item) => resolveLngLat(item))
    .filter(Boolean) as [number, number][]

  const overlays: any[] = []

  if (upPoints.length >= 2) {
    overlays.push(
      new (AMapGlobal as any).Polyline({
        path: upPoints,
        strokeColor: '#ffbc40',
        strokeOpacity: 0.9,
        strokeWeight: 5,
        zIndex: 260
      })
    )
  }

  if (downPoints.length >= 2) {
    overlays.push(
      new (AMapGlobal as any).Polyline({
        path: downPoints,
        strokeColor: '#36e8ff',
        strokeOpacity: 0.9,
        strokeWeight: 5,
        zIndex: 259
      })
    )
  }

  const upIcon = new (AMapGlobal as any).Icon({
    image: stationUpIconUrl,
    size: new (AMapGlobal as any).Size(34, 34),
    imageSize: new (AMapGlobal as any).Size(34, 34)
  })

  overlays.push(
    ...(upPoints.map(
      (lngLat) =>
        new (AMapGlobal as any).Marker({
          position: lngLat,
          icon: upIcon,
          offset: new (AMapGlobal as any).Pixel(-17, -34),
          zIndex: 300
        })
    ) as any[])
  )

  clearStationLayer()
  stationLayer = overlays
  if (stationLayer.length) {
    map.add(stationLayer)
    map.setFitView(stationLayer, false, [140, 140, 140, 140], 14)
  }
}

const renderGeo = async () => {
  if (!map || !AMapGlobal) return
  try {
    const response = await fetch(ANSHAN_GEO_URL)
    if (!response.ok) throw new Error('geo fetch failed')
    const geo = await response.json()

    if (geoLayer.length) {
      map.remove(geoLayer)
      geoLayer = []
    }

    geoLayer = (geo?.features || [])
      .map((feature: any) => {
        const path = resolveFeaturePath(feature)
        if (!path) return null

        return new AMapGlobal!.Polygon({
          path,
          strokeColor: '#67d7ff',
          strokeWeight: 2.5,
          strokeOpacity: 0.95,
          fillColor: '#0b4f99',
          fillOpacity: 0.12
        })
      })
      .filter(Boolean) as AMap.Polygon[]

    map.add(geoLayer)

    geoLayer.forEach((overlay) => {
      overlay.on('mouseover', () =>
        overlay.setOptions({
          fillOpacity: 0.22,
          fillColor: '#2ba6ff',
          strokeColor: '#8fe8ff'
        })
      )
      overlay.on('mouseout', () =>
        overlay.setOptions({
          fillOpacity: 0.12,
          fillColor: '#0b4f99',
          strokeColor: '#67d7ff'
        })
      )
    })

    if (geoLayer.length) {
      map.setFitView(geoLayer, false, [60, 60, 60, 60], 10)
    }

    loadError.value = ''
  } catch (error) {
    console.error('render anshan geo failed:', error)
    loadError.value = loadError.value || '鞍山边界加载失败'
  }
}

const initMap = async () => {
  if (!mapRef.value) return
  if (map) return
  const AMap = await loadAMapApi()
  if (!AMap) return

  const satelliteLayer = new AMap.TileLayer.Satellite()
  const roadNetLayer = new AMap.TileLayer.RoadNet()

  map = new AMap.Map(mapRef.value, {
    zoom: 10,
    center: [122.9946, 41.1086],
    viewMode: '2D',
    pitch: 0,
    rotation: 0,
    resizeEnable: true,
    features: ['bg', 'road', 'building', 'point'],
    layers: [satelliteLayer, roadNetLayer]
  })

  map.addControl(new AMap.ToolBar({ position: 'RT' }))
  map.addControl(new AMap.Scale({ position: 'LB' }))

  await renderGeo()
}

onMounted(async () => {
  await initMap()
  renderStations()
})

onBeforeUnmount(() => {
  clearStationLayer()
  if (map) {
    map.destroy()
    map = null
  }
})

watch(
  () => props.stations,
  () => {
    renderStations()
  },
  { deep: true }
)
</script>

<template>
  <div class="bus-map">
    <div ref="mapRef" class="bus-map__inner"></div>
    <div v-if="loadError" class="bus-map__hint">{{ loadError }}</div>
  </div>
</template>

<style scoped>
.bus-map {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.bus-map__inner {
  width: 100%;
  height: 100%;
}

:deep(canvas) {
  filter: brightness(0.78) contrast(1.18) saturate(0.82) hue-rotate(188deg);
}

:deep(.amap-logo),
:deep(.amap-copyright) {
  opacity: 0;
  pointer-events: none;
}

.bus-map__hint {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 14px;
  border: 1px solid rgba(78, 184, 255, 0.3);
  background: rgba(5, 26, 66, 0.65);
  box-shadow: inset 0 0 20px rgba(36, 152, 255, 0.18);
  color: rgba(209, 234, 255, 0.9);
  font-size: 16px;
  letter-spacing: 1px;
  pointer-events: none;
}
</style>
