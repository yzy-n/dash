<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

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

// 截图原始模拟数据
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
let chart: echarts.ECharts | null = null
let ro: ResizeObserver | undefined

onMounted(async () => {
  try {
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

  const regions =
    active && featureNames.value.length > 0
      ? featureNames.value.map((name) => {
          const isActive = name === active
          return {
            name,
            itemStyle: isActive ? { opacity: 1 } : { opacity: 0.35 },
            label: isActive ? { color: '#ffffff', fontWeight: 900 } : undefined
          }
        })
      : []

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
    visualMap: {
      show: false,
      left: 10,
      bottom: 10,
      textStyle: { color: '#fff', fontSize: 12 },
      pieces: [
        { gte: 2000, label: '2000以上', color: '#2288dd' },
        { gte: 1000, lte: 2000, label: '1000‑2000', color: '#2288dd' },
        { gte: 500, lte: 1000, label: '500‑1000', color: '#2288dd' },
        { gte: 300, lte: 500, label: '300‑500', color: '#2288dd' },
        { lt: 300, label: '300以下', color: '#2288dd' }
      ]
    },
    series: [
      {
        name: '年平均人数/平方公里',
        type: 'map',
        map: 'anshan',
        roam: false,
        zoom: 1.05,
        // 伪3D下沉阴影效果
        itemStyle: {
          shadowColor: '#0066bb',
          shadowOffsetX: 4,
          shadowOffsetY: 6,
          shadowBlur: 8,
          borderColor: '#2288dd',
          borderWidth: 1
        },
        label: {
          show: true,
          color: '#ffffff',
          fontSize: 23,
          formatter: (p: any) => {
            const v = Number(p?.value)
            const valueText = Number.isFinite(v) && v !== 0 ? v : '-'
            return `${p?.name ?? ''}\n${valueText}`
          }
        },
        emphasis: {
          itemStyle: {
            areaColor: '#2077bb',
            borderColor: '#70ddff',
            borderWidth: 2
          },
          label: { show: true, color: '#fff' }
        },
        data: seriesData
      }
    ]
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
