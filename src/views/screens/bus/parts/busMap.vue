<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const mapRef = ref<HTMLDivElement>()

let map: maplibregl.Map

const ANSHAN_GEO_URL = 'https://geo.datav.aliyun.com/areas_v3/bound/210300_full.json'

onMounted(async () => {
  map = new maplibregl.Map({
    container: mapRef.value!,
    style: {
      version: 8,
      glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      sources: {
        osm: {
          type: 'raster',
          tiles: [
            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
          ],
          tileSize: 256
        }
      },
      layers: [
        {
          id: 'osm',
          type: 'raster',
          source: 'osm'
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

    map.addSource('anshan', {
      type: 'geojson',
      data: geo
    })

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
