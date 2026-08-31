<script setup lang="ts">
import { computed } from 'vue'
import * as echarts from 'echarts'
import EChart from '@/components/echarts/EChart.vue'

interface LineDataItem {
  name: string
  value: number
}

const props = defineProps<{
  data?: LineDataItem[]
}>()

// 参考截图：2018‑2022 增加值（亿元）模拟数据
const defaultData: LineDataItem[] = [
  { name: '2018', value: 115.9 },
  { name: '2019', value: 126 },
  { name: '2020', value: 123 },
  { name: '2021', value: 125 },
  { name: '2022', value: 121 }
]

const chartData = computed(() => props.data ?? defaultData)

const option = computed(() => {
  const xAxisData = chartData.value.map((item) => item.name)
  const seriesData = chartData.value.map((item) => item.value)

  const opt = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,24,53,0.75)',
      textStyle: { color: '#ffffff' },
      formatter: '{b}<br/>增加值：{c}亿元'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '18%',
      top: '14%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        color: '#fff',
        fontSize: 22,
        rotate: 35
      },
      axisLine: {
        lineStyle: { color: 'rgba(120, 200, 255, 0.4)' }
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位：亿元',
      nameTextStyle: { color: '#fff', fontSize: 16 },
      splitLine: {
        lineStyle: { color: 'rgba(120, 200, 255, 0.2)' }
      },
      min: 0,
      max: 150,
      interval: 30,
      axisLabel: { color: '#fff', fontSize: 20 },
      axisLine: { show: false }
    },
    series: [
      {
        name: '增加值',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: {
          color: '#94ccff',
          width: 3
        },
        itemStyle: {
          color: '#94ccff'
        },
        data: seriesData
      }
    ]
  }
  return JSON.parse(JSON.stringify(opt))
})
</script>

<template>
  <EChart :option="option" height="360px" />
</template>
