<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

type BusPoint = {
  id: string | number
  lng: number
  lat: number
  label?: string
}

const props = withDefaults(
  defineProps<{
    buses?: BusPoint[]
    routePath?: Array<[number, number]>
  }>(),
  {
    buses: () => [],
    routePath: () => []
  }
)

const mapRef = ref<HTMLDivElement>()

let map: maplibregl.Map

const ANSHAN_GEO_URL = 'https://geo.datav.aliyun.com/areas_v3/bound/210300_full.json'
const ANSHAN_SAT_TILES =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

const calcBoundsFromGeoJSON = (geo: any) => {
  let minLng = Infinity
  let minLat = Infinity
  let maxLng = -Infinity
  let maxLat = -Infinity

  const walkCoords = (coords: any) => {
    if (!Array.isArray(coords)) return
    if (typeof coords[0] === 'number' && typeof coords[1] === 'number') {
      const [lng, lat] = coords as [number, number]
      minLng = Math.min(minLng, lng)
      minLat = Math.min(minLat, lat)
      maxLng = Math.max(maxLng, lng)
      maxLat = Math.max(maxLat, lat)
      return
    }
    for (const c of coords) walkCoords(c)
  }

  const features = geo?.type === 'FeatureCollection' ? geo.features : geo?.features ? geo.features : []
  for (const f of features) {
    walkCoords(f?.geometry?.coordinates)
  }

  if (!isFinite(minLng) || !isFinite(minLat) || !isFinite(maxLng) || !isFinite(maxLat)) return null

  return [
    [minLng, minLat],
    [maxLng, maxLat]
  ] as [[number, number], [number, number]]
}

const setBuses = (buses: BusPoint[]) => {
  if (!map) return
  const src = map.getSource('buses') as maplibregl.GeoJSONSource | undefined
  if (!src) return
  src.setData({
    type: 'FeatureCollection',
    features: buses.map((b) => ({
      type: 'Feature',
      properties: { id: b.id, label: b.label ?? String(b.id) },
      geometry: { type: 'Point', coordinates: [b.lng, b.lat] }
    }))
  } as any)
}

const setRoutePath = (path: Array<[number, number]>) => {
  if (!map) return
  const src = map.getSource('route') as maplibregl.GeoJSONSource | undefined
  if (!src) return
  src.setData({
    type: 'FeatureCollection',
    features: path.length
      ? [
          {
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates: path }
          }
        ]
      : []
  } as any)
}

onMounted(async () => {
  map = new maplibregl.Map({
    container: mapRef.value!,
    style: {
      version: 8,
      glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      sources: {
        sat: {
          type: 'raster',
          tiles: [ANSHAN_SAT_TILES],
          tileSize: 256
        }
      },
      layers: [
        {
          id: 'sat',
          type: 'raster',
          source: 'sat'
        }
      ]
    },

    center: [122.9946, 41.1086],

    zoom: 9,

    pitch: 45,

    bearing: -8,

    antialias: true
  })

  map.addControl(new maplibregl.NavigationControl(), 'top-right')

  map.on('load', async () => {
    const geo = await fetch(ANSHAN_GEO_URL).then((r) => r.json())
    const bounds = calcBoundsFromGeoJSON(geo)

    map.addSource('anshan', {
      type: 'geojson',
      data: geo
    })

    if (bounds) {
      map.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 11,
        duration: 0
      })
    }

    map.addLayer({
      id: 'district-fill',
      type: 'fill',
      source: 'anshan',
      paint: {
        'fill-color': '#0a5ea8',
        'fill-opacity': 0.25
      }
    })

    map.addLayer({
      id: 'district-border',
      type: 'line',
      source: 'anshan',
      paint: {
        'line-color': '#5fd7ff',
        'line-width': 2
      }
    })

    map.addLayer({
      id: 'district-hover',
      type: 'fill',
      source: 'anshan',
      paint: {
        'fill-color': '#33b5ff',
        'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.45, 0]
      }
    })

    map.addSource('route', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] }
    })
    map.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route',
      paint: {
        'line-color': '#3fd5ff',
        'line-width': 4,
        'line-opacity': 0.85
      }
    })

    map.addSource('buses', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] }
    })
    map.addLayer({
      id: 'bus-points',
      type: 'circle',
      source: 'buses',
      paint: {
        'circle-radius': 6,
        'circle-color': '#ffe27a',
        'circle-opacity': 0.95,
        'circle-stroke-color': '#3fd5ff',
        'circle-stroke-width': 2
      }
    })
    map.addLayer({
      id: 'bus-labels',
      type: 'symbol',
      source: 'buses',
      layout: {
        'text-field': ['get', 'label'],
        'text-size': 12,
        'text-offset': [0, 1.2],
        'text-anchor': 'top'
      },
      paint: {
        'text-color': '#eaf4ff',
        'text-halo-color': 'rgba(0, 20, 60, 0.9)',
        'text-halo-width': 1.2
      }
    })

    setRoutePath(props.routePath)
    setBuses(props.buses)

    let hoveredId: number | string | null = null

    map.on('mousemove', 'district-fill', (e) => {
      if (!e.features?.length) return

      if (hoveredId !== null) {
        map.setFeatureState(
          {
            source: 'anshan',
            id: hoveredId
          },
          {
            hover: false
          }
        )
      }

      hoveredId = e.features[0].id!

      map.setFeatureState(
        {
          source: 'anshan',
          id: hoveredId
        },
        {
          hover: true
        }
      )

      map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'district-fill', () => {
      if (hoveredId !== null) {
        map.setFeatureState(
          {
            source: 'anshan',
            id: hoveredId
          },
          {
            hover: false
          }
        )
      }

      hoveredId = null

      map.getCanvas().style.cursor = ''
    })

    map.on('click', 'district-fill', (e) => {
      const feature = e.features?.[0]

      console.log(feature?.properties)
    })
  })
})

onBeforeUnmount(() => {
  map?.remove()
})

watch(
  () => props.buses,
  (v) => setBuses(v),
  { deep: true }
)
watch(
  () => props.routePath,
  (v) => setRoutePath(v),
  { deep: true }
)
</script>

<template>
  <div ref="mapRef" class="bus-map"></div>
</template>

<style scoped>
.bus-map {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
}

:deep(.maplibregl-ctrl) {
  background: rgba(10, 32, 65, 0.8);
}

:deep(.maplibregl-ctrl button) {
  color: white;
}

:deep(canvas) {
  filter: brightness(0.72) contrast(1.25) saturate(0.45) hue-rotate(170deg);
}
</style>
