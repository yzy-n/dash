<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

// 改成传入数组，每一项：x名称 + 多个指标数值
interface ChartListItem {
  name: string // x轴类目，如 '2017'
  [key: string]: string | number // 支持动态指标字段
}

interface Props {
  list?: ChartListItem[]
  seriesNames: string[] // 需要渲染的系列名称，用来匹配字段，例如 ['总户数','总人数']
}
const props = defineProps<Props>()

// 默认模拟数据
const defaultList: ChartListItem[] = [
  { name: '2017', 总户数: 120.3, 总人数: 343 },
  { name: '2018', 总户数: 121.0, 总人数: 341 },
  { name: '2019', 总户数: 121.4, 总人数: 338 },
  { name: '2020', 总户数: 121.45, 总人数: 335 },
  { name: '2021', 总户数: 121.48, 总人数: 333 }
]

const chartList = computed(() => props.list ?? defaultList)

const option = computed(() => {
  const xAxisData = chartList.value.map((item) => item.name as string)

  // 根据 seriesNames 自动生成series
  const series = props.seriesNames.map((name, idx) => {
    // 配色，可自行扩展
    const colorMap: Record<string, string> = {
      总户数: '#ffd058',
      总人数: '#38d8d0'
    }
    // 双y轴：0=总户数（左），1=总人数（右）
    const yAxisIndexMap: Record<string, number> = {
      总户数: 0,
      总人数: 1
    }
    return {
      name,
      type: 'line',
      smooth: true,
      color: colorMap[name],
      yAxisIndex: yAxisIndexMap[name] ?? 0,
      data: chartList.value.map((item) => item[name] as number)
    }
  })

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,24,53,0.75)',
      textStyle: { color: '#fff' }
    },
    legend: {
      data: props.seriesNames,
      textStyle: { color: '#ffffff' },
      top: 8
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: { lineStyle: { color: 'rgba(120, 200, 255, 0.4)' } },
      axisLabel: { color: '#fff', fontSize: 30 },
      splitLine: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: '单位：万户',
        min: 120,
        max: 125,
        axisLine: { lineStyle: { color: 'rgba(120, 200, 255, 0.4)' } },
        axisLabel: { color: '#fff', fontSize: 30 },
        splitLine: { lineStyle: { color: 'rgba(120, 200, 255, 0.15)' } }
      },
      {
        type: 'value',
        name: '单位：万人',
        min: 300,
        max: 350,
        position: 'right',
        axisLine: { lineStyle: { color: 'rgba(120, 200, 255, 0.4)' } },
        axisLabel: { color: '#fff', fontSize: 30 },
        splitLine: { show: false }
      }
    ],
    series
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
