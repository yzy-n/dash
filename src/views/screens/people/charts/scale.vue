<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

// list每一项：name是x轴类目，后面属性为指标
interface ChartListItem {
  name: string
  [key: string]: number
}

const props = defineProps<{
  list?: ChartListItem[]
}>()

// 默认模拟数据
const defaultList: ChartListItem[] = [
  { name: '海城市', 每户平均人数: 3.12 },
  { name: '台安县', 每户平均人数: 2.62 },
  { name: '岫岩县', 每户平均人数: 3.28 },
  { name: '铁东区', 每户平均人数: 2.6 },
  { name: '铁西区', 每户平均人数: 2.12 },
  { name: '立山区', 每户平均人数: 2.15 },
  { name: '千山区', 每户平均人数: 5.6 }
]

const chartList = computed(() => props.list ?? defaultList)

const option = computed(() => {
  const list = chartList.value
  // x轴类目
  const xAxisData = list.map((item) => item.name)
  // 提取指标名称（排除name）
  const seriesNames = Object.keys(list[0] ?? {}).filter((k) => k !== 'name')

  // 生成series数组
  const series = seriesNames.map((name) => {
    return {
      name: '每户平均人数',
      type: 'bar',
      barWidth: 26,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#22c8ff' },
            { offset: 1, color: '#084894' }
          ]
        },
        borderRadius: [3, 3, 0, 0]
      },
      data: list.map((item) => item[name])
    }
  })

  return {
    backgroundColor: 'transparent',
    // 柱子斜向光栅纹理
    aria: {
      enabled: true,
      decal: {
        show: true,
        decals: {
          symbol: 'rect',
          symbolSize: 2,
          rotation: 45,
          color: 'rgba(170,225,255,0.22)',
          dashArrayX: [4, 6],
          dashArrayY: [0, 0]
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,24,53,0.85)',
      borderColor: 'rgba(84,188,255,0.22)',
      borderWidth: 1,
      textStyle: { color: '#ffffff' },
      formatter: '{b}<br/>● {a}: {c}'
    },
    legend: {
      data: seriesNames,
      top: 8,
      right: 12,
      textStyle: { color: '#fff', fontSize: 13 },
      itemWidth: 12,
      itemHeight: 12
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '14%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: { lineStyle: { color: 'rgba(120,200,255,0.35)' } },
      axisLabel: { color: '#fff', fontSize: 14 },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位：人',
      nameTextStyle: { color: '#fff', fontSize: 14 },
      min: 0,
      max: 6,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#fff', fontSize: 14 },
      splitLine: { lineStyle: { color: 'rgba(120,200,255,0.15)' } }
    },
    series
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
