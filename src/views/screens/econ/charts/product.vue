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

// 模拟图片里季度增速数据
const defaultData: LineDataItem[] = [
  { name: '2020年1季度', value: -20 },
  { name: '2020年2季度', value: -13 },
  { name: '2020年3季度', value: -8 },
  { name: '2020年4季度', value: -7 },
  { name: '2021年1季度', value: 20 },
  { name: '2021年2季度', value: 11.7 },
  { name: '2021年3季度', value: 18.5 },
  { name: '2021年4季度', value: 11 },
  { name: '2022年1季度', value: 9 },
  { name: '2022年2季度', value: -1 },
  { name: '2022年3季度', value: 4 },
  { name: '2022年4季度', value: 1 }
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
      textStyle: { color: '#fff' },
      formatter: '{b}<br/>增速: {c} %'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '22%',
      top: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        color: '#fff',
        fontSize: 23,
        rotate: 45
      },
      axisLine: {
        lineStyle: { color: 'rgba(120, 200, 255, 0.4)' }
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位：%',
      nameTextStyle: { color: '#fff', fontSize: 14 },
      splitLine: {
        lineStyle: { color: 'rgba(120, 200, 255, 0.2)' }
      },
      axisLabel: { color: '#fff' },
      axisLine: { show: false }
    },
    series: [
      {
        name: '增速',
        type: 'line',
        smooth: false,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: '#33d8ff',
          width: 2
        },
        itemStyle: {
          color: '#33d8ff'
        },
        data: seriesData,
        markLine: {
          silent: true,
          data: [{ yAxis: 0 }],
          lineStyle: { color: '#ff3344', width: 2 }
        }
      }
    ]
  }
  return JSON.parse(JSON.stringify(opt))
})
</script>

<template>
  <EChart :option="option" height="360px" />
</template>
