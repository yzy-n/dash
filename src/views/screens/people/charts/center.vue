<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'

interface MapDataItem {
  name: string
  value: number
}

const props = defineProps<{
  data?: MapDataItem[]
  activeName?: string
}>()

const emit = defineEmits<{
  (e: 'region-change', name: string): void
}>()

// 原始模拟数据
const defaultData: MapDataItem[] = [
  { name: '海城市', value: 410 },
  { name: '台安县', value: 256 },
  { name: '岫岩满族自治县', value: 110 },
  { name: '铁东区', value: 3654 },
  { name: '铁西区', value: 2103 },
  { name: '立山区', value: 2552 },
  { name: '千山区', value: 567 }
]

const mapData = computed(() => (props.data && props.data.length ? props.data : defaultData))

const mapReady = ref(false)
const featureNames = ref<string[]>([])
const rootEl = ref<HTMLDivElement | null>(null)
const techTexture = ref<HTMLCanvasElement | null>(null)
let chart: echarts.ECharts | null = null
let ro: ResizeObserver | undefined

/** 生成科技感纹理（网格 + 星点），与上面组件保持一致 */
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
    const url = `${import.meta.env.BASE_URL}geo/anshan.geojson`
    const geoJson = await fetch(url).then((res) => res.json())
    if (!echarts.getMap('anshan')) echarts.registerMap('anshan', geoJson)
    featureNames.value = Array.isArray(geoJson?.features)
      ? geoJson.features.map((f: any) => f?.properties?.name).filter(Boolean)
      : []
    mapReady.value = true
  } catch {
    mapReady.value = false
  }
})

const option = computed(() => {
  if (!mapReady.value) {
    return {
      backgroundColor: 'transparent',
      graphic: {
        type: 'text',
        left: 'center',
        top: 'middle',
        style: {
          text: '地图加载中...',
          fill: 'rgba(214, 238, 255, 0.75)',
          fontSize: 16,
          fontWeight: 800
        }
      }
    }
  }

  const active = props.activeName ?? ''
  const map = new Map(mapData.value.map((d) => [d.name, d.value]))
  const seriesData =
    featureNames.value.length > 0
      ? featureNames.value.map((name) => ({ name, value: map.get(name) ?? 0 }))
      : mapData.value

  // 主色（与 3D 版本一致）
  const topColor = 'rgba(20, 140, 220, 0.65)'
  const topColorEmphasis = 'rgba(80, 200, 255, 0.85)'
  const activeColor = 'rgba(80, 200, 255, 0.92)'
  const inactiveOpacity = 0.58
  const detailTexture = techTexture.value as any
  const hasActiveRegion = Boolean(active)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' },
      formatter: (p: any) => {
        const v = Number(p?.value)
        const valueText = Number.isFinite(v) && v !== 0 ? v : '-'
        return `${p?.name ?? ''}<br/>${valueText} 人/平方公里`
      }
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
        textShadowColor: 'rgba(0, 120, 200, 0.6)',
        formatter: (p: any) => {
          const v = Number(p?.value)
          const valueText = Number.isFinite(v) && v !== 0 ? v : '-'
          return `${p?.name ?? ''}\n${valueText}`
        }
      },
      emphasis: {
        label: { color: '#ffffff' },
        itemStyle: {
          color: topColorEmphasis,
          borderColor: 'rgba(255, 180, 80, 1)',
          borderWidth: 2.6
        }
      },
      viewControl: {
        projection: 'perspective',
        alpha: 70, // ← 倾斜角度
        beta: -18, // ← 水平旋转
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
        ambient: { intensity: 0.35 }
      },
      regions: seriesData.map((r) => {
        const isActive = hasActiveRegion && r.name === active
        return {
          name: r.name,
          value: r.value,
          itemStyle: isActive
            ? {
                color: activeColor,
                borderColor: 'rgba(255, 210, 120, 1)',
                borderWidth: 3,
                opacity: 1
              }
            : hasActiveRegion
              ? { opacity: inactiveOpacity }
              : undefined,
          label: isActive ? { color: '#ffffff', fontSize: 16 } : undefined
        }
      })
    },
    postEffect: {
      enable: true,
      bloom: { enable: true, bloomIntensity: 0.85 },
      SSAO: { enable: true, radius: 6, intensity: 1 },
      FXAA: { enable: true }
    }
  }
})

const mount = () => {
  if (!rootEl.value) return
  chart = echarts.init(rootEl.value)
  chart.setOption(option.value as any, { notMerge: true, lazyUpdate: true })
  chart.on('click', (params: any) => {
    const name = params?.name as string | undefined
    if (!name) return
    emit('region-change', name)
  })

  ro = new ResizeObserver(() => {
    chart?.resize()
  })
  ro.observe(rootEl.value)
}

const unmount = () => {
  ro?.disconnect()
  ro = undefined
  chart?.dispose()
  chart = null
}

onMounted(mount)
onBeforeUnmount(unmount)

watch(
  option,
  () => {
    chart?.setOption(option.value as any, { notMerge: true, lazyUpdate: true })
  },
  { deep: true }
)
</script>

<template>
  <div ref="rootEl" class="map-root" />
</template>

<style scoped>
.map-root {
  width: 100%;
  height: 100%;
}
</style>
