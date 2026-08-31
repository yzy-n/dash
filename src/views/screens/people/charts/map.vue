<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import * as echarts from 'echarts'

interface MapDataItem {
  name: string
  value: number
}

const props = defineProps<{
  data?: MapDataItem[]
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

onMounted(async () => {
  try {
    const url = `${import.meta.env.BASE_URL}geo/anshan.geojson`
    const geoJson = await fetch(url).then((res) => res.json())
    if (!echarts.getMap('anshan')) echarts.registerMap('anshan', geoJson)
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
        const valueText = Number.isFinite(v) ? v : '-'
        return `${p?.name ?? ''}<br/>${valueText} 人/平方公里`
      }
    },
    visualMap: {
      show: true,
      left: 10,
      bottom: 10,
      textStyle: { color: '#fff', fontSize: 12 },
      pieces: [
        { gte: 2000, label: '2000以上', color: '#ff4455' },
        { gte: 1000, lte: 2000, label: '1000‑2000', color: '#ffdd44' },
        { gte: 500, lte: 1000, label: '500‑1000', color: '#36e8c2' },
        { gte: 300, lte: 500, label: '300‑500', color: '#ff9922' },
        { lt: 300, label: '300以下', color: '#88ff99' }
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
          fontSize: 13,
          formatter: (p: any) => {
            const v = Number(p?.value)
            const valueText = Number.isFinite(v) ? v : '-'
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
        data: mapData.value
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
