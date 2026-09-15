<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

// 每条数据：name对应x轴类目，其余字段为指标
interface ChartListItem {
  name: string
  [key: string]: number
}

const props = defineProps<{
  list?: ChartListItem[]
}>()

// 默认模拟数据（鞍山各区县）
const defaultList: ChartListItem[] = [
  { name: '海城市', 农村人口数: 76, 城镇人口数: 31 },
  { name: '台安县', 农村人口数: 29, 城镇人口数: 8 },
  { name: '岫岩县', 农村人口数: 36, 城镇人口数: 15 },
  { name: '铁东区', 农村人口数: 2, 城镇人口数: 52 },
  { name: '铁西区', 农村人口数: 6, 城镇人口数: 24 },
  { name: '立山区', 农村人口数: 2, 城镇人口数: 47 },
  { name: '千山区', 农村人口数: 10, 城镇人口数: 4 }
]

const chartList = computed(() => props.list ?? defaultList)

const option = computed(() => {
  // 提取x轴类目
  const xAxisData = chartList.value.map((item) => item.name)
  // 自动提取指标名称（排除name字段）
  const seriesNames = Object.keys(chartList.value[0] ?? {}).filter((key) => key !== 'name')

  // 颜色映射
  const colorMap: Record<string, Array<{ offset: number; color: string }>> = {
    农村人口数: [
      { offset: 0, color: '#ffdd44' },
      { offset: 1, color: '#b89c20' }
    ],
    城镇人口数: [
      { offset: 0, color: '#33c8ff' },
      { offset: 1, color: '#1772d8' }
    ]
  }

  // 生成series
  const series = seriesNames.map((name) => {
    return {
      name,
      type: 'bar',
      barWidth: 50,
      itemStyle: {
        borderRadius: [6, 6, 0, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: colorMap[name]
        }
      },
      data: chartList.value.map((item) => item[name])
    }
  })

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    legend: {
      data: seriesNames,
      top: 4,
      right: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 26 },
      itemWidth: 10,
      itemHeight: 10
    },
    grid: {
      left: 48,
      right: 20,
      top: 60,
      bottom: 20,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        color: 'rgba(214, 238, 255, 0.6)',
        fontSize: 26,
        rotate: 30
      },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位：万人',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 26 },
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 26 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
