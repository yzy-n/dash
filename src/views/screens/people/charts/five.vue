<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

interface LineSeriesItem {
  name: string
  data: number[]
}
interface ChartPropData {
  xAxisData: string[]
  series: LineSeriesItem[]
}

const props = defineProps<{
  data?: ChartPropData
}>()

// 图片里的模拟默认数据
const defaultData: ChartPropData = {
  xAxisData: ['2017', '2018', '2019', '2020', '2021'],
  series: [
    {
      name: '总户数',
      data: [120.3, 121.0, 121.4, 121.45, 121.48]
    },
    {
      name: '总人数',
      data: [343, 341, 338, 335, 333]
    }
  ]
}

const chartData = computed(() => props.data ?? defaultData)

const option = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,24,53,0.75)',
      textStyle: { color: '#fff' }
    },
    legend: {
      data: ['总户数', '总人数'],
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
      data: chartData.value.xAxisData,
      axisLine: { lineStyle: { color: 'rgba(120, 200, 255, 0.4)' } },
      axisLabel: { color: '#fff', fontSize: 14 },
      splitLine: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: '单位：万户',
        min: 120,
        max: 125,
        axisLine: { lineStyle: { color: 'rgba(120, 200, 255, 0.4)' } },
        axisLabel: { color: '#fff', fontSize: 14 },
        splitLine: { lineStyle: { color: 'rgba(120, 200, 255, 0.15)' } }
      },
      {
        type: 'value',
        name: '单位：万人',
        min: 300,
        max: 350,
        position: 'right',
        axisLine: { lineStyle: { color: 'rgba(120, 200, 255, 0.4)' } },
        axisLabel: { color: '#fff', fontSize: 14 },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '总户数',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        color: '#ffd058',
        data: chartData.value.series[0].data
      },
      {
        name: '总人数',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        color: '#38d8d0',
        data: chartData.value.series[1].data
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
