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
const defaultList: ChartListItem[] = []

const chartList = computed(() => props.list ?? defaultList)

const option = computed(() => {
  // 提取x轴类目
  const xAxisData = chartList.value.map((item) => item.name)
  // 自动提取指标名称（排除name字段）
  const seriesNames = Object.keys(chartList.value[0] ?? {}).filter((key) => key !== 'name')

  // 颜色映射：紫罗兰 / 荧光绿，与上方"进5年人口总数"的金-冰蓝区分
  const colorMap: Record<string, Array<{ offset: number; color: string }>> = {
    农村人口数: [
      { offset: 0, color: '#5dffcb' },
      { offset: 1, color: '#00a67a' }
    ],
    城镇人口数: [
      { offset: 0, color: '#b14cff' },
      { offset: 1, color: '#6a1fd0' }
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
      textStyle: { fontSize: 40, color: '#ffffff' },
      backgroundColor: 'rgba(6, 18, 48, 0.92)'
    },
    legend: {
      data: seriesNames,
      top: 4,
      right: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 40 },
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
        fontSize: 28,
        rotate: 30
      },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位：万人',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 28 },
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 28 },
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
