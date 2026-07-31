<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const mapRef = ref<HTMLDivElement | null>(null)

let map: AMap.Map | null = null
let geoLayer: AMap.Polygon[] = []
let AMapGlobal: typeof AMap | null = null
let loadPromise: Promise<typeof AMap | null> | null = null
const loadError = ref('')

const ANSHAN_GEO_URL = `${import.meta.env.BASE_URL}geo/anshan.geojson`

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
})

onBeforeUnmount(() => {
  if (map) {
    map.destroy()
    map = null
  }
})
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
