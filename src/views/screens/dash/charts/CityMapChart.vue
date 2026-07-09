<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'
import EChart from '@/components/echarts/EChart.vue'

const mapReady = ref(false)
const ANSHAN_GEO_URL = 'https://geo.datav.aliyun.com/areas_v3/bound/210300_full.json'
const techTexture = ref<HTMLCanvasElement | null>(null)

const createTechTexture = () => {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  ctx.fillStyle = 'rgba(5, 25, 70, 0.2)'
  ctx.fillRect(0, 0, size, size)

  ctx.strokeStyle = 'rgba(140, 245, 255, 0.10)'
  ctx.lineWidth = 1
  const step = 32
  for (let x = 0; x <= size; x += step) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, size)
    ctx.stroke()
  }
  for (let y = 0; y <= size; y += step) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(size, y)
    ctx.stroke()
  }

  ctx.strokeStyle = 'rgba(140, 245, 255, 0.08)'
  for (let i = 0; i < 20; i += 1) {
    const y = Math.floor((i / 20) * size)
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(size, y + 18)
    ctx.stroke()
  }

  ctx.fillStyle = 'rgba(220, 255, 255, 0.12)'
  for (let i = 0; i < 2600; i += 1) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = Math.random() * 1.2
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)'
  for (let i = 0; i < 180; i += 1) {
    const x = Math.random() * size
    const y = Math.random() * size
    ctx.fillRect(x, y, 1, 1)
  }

  return canvas
}

onMounted(async () => {
  try {
    techTexture.value = createTechTexture()
    const res = await fetch(ANSHAN_GEO_URL)
    if (!res.ok) throw new Error('地图JSON加载失败')
    const geoJson = await res.json()
    // 全局注册鞍山地图，所有图表共享
    echarts.registerMap('anshan', geoJson)
    mapReady.value = true
  } catch (err) {
    console.error('鞍山地图加载异常', err)
  }
})

const option = computed(() => {
  if (!mapReady.value) return {}
  // 匹配图里蓝色地块
  const topColor = 'rgba(20, 140, 220, 0.65)'
  // hover高亮浅亮蓝
  const topColorEmphasis = 'rgba(80, 200, 255, 0.85)'
  const detailTexture = techTexture.value as any

  const mapData = [
    { name: '铁东区', value: 120 },
    { name: '铁西区', value: 98 },
    { name: '立山区', value: 145 },
    { name: '千山区', value: 76 },
    { name: '台安县', value: 63 },
    { name: '岫岩满族自治县', value: 52 },
    { name: '海城市', value: 189 }
  ]

  const points = [
    { name: '台安县', value: [122.42, 41.26, 18] },
    { name: '海城市', value: [122.73, 40.87, 18] },
    { name: '岫岩满族自治县', value: [123.27, 40.28, 18] }
  ]

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: (p: any) => {
        if (Array.isArray(p?.value)) return p?.name ?? ''
        return `${p?.name ?? ''}<br>数据：${p?.value ?? ''}`
      },
      textStyle: { color: '#fff' }
    },
    geo3D: {
      map: 'anshan',
      regionHeight: 10,
      shading: 'realistic',
      realisticMaterial: {
        detailTexture,
        textureTiling: 1,
        roughness: 0.28,
        metalness: 0.02
      },
      groundPlane: { show: false },
      itemStyle: {
        color: topColor,
        borderColor: 'rgba(255, 160, 40, 0.92)',
        borderWidth: 2,
        opacity: 1
      },
      label: {
        show: true,
        color: 'rgba(240, 252, 255, 0.92)',
        fontSize: 14,
        fontWeight: 'bold',
        textShadowBlur: 10,
        textShadowColor: 'rgba(0, 120, 200, 0.6)'
      },
      emphasis: {
        label: {
          color: '#ffffff'
        },
        itemStyle: {
          color: topColorEmphasis,
          borderColor: 'rgba(255, 180, 80, 1)',
          borderWidth: 2.6
        }
      },
      viewControl: {
        projection: 'perspective',
        alpha: 70,
        beta: -18,
        distance: 175,
        minDistance: 80,
        maxDistance: 170,
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0
      },
      light: {
        main: {
          intensity: 1.3,
          alpha: 35,
          beta: 35,
          shadow: true,
          shadowQuality: 'high',
          color: '#e6f7ff'
        },
        ambient: {
          intensity: 0.35
        }
      },
      regions: mapData.map((r) => ({ name: r.name, value: r.value }))
    },
    postEffect: {
      enable: true,
      bloom: {
        enable: true,
        bloomIntensity: 0.85
      },
      SSAO: {
        enable: true,
        radius: 6,
        intensity: 1
      },
      FXAA: {
        enable: true
      }
    },
    series: [
      {
        type: 'scatter3D',
        coordinateSystem: 'geo3D',
        geo3DIndex: 0,
        data: points,
        symbolSize: 12,
        label: {
          show: true,
          formatter: (p: any) => p?.name ?? '',
          position: 'right',
          color: '#f2fbff',
          fontSize: 14
        },
        itemStyle: {
          color: '#00ccff',
          shadowBlur: 18,
          shadowColor: 'rgba(0, 180, 255, 0.6)'
        }
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" style="width: 100%; height: 100%" />
</template>
