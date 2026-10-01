<script setup lang="ts">
import { computed } from 'vue'
import * as echarts from 'echarts'
import EChart from '@/components/echarts/EChart.vue'

/** 接口返回的原始结构 */
interface ApiDataItem {
  quarter: string
  speed: string | number
}

const props = defineProps<{
  data?: ApiDataItem[]
}>()

// 默认（接口无数据时兜底）—— 按接口结构写成 quarter / speed
const defaultData: ApiDataItem[] = [
  { quarter: '2020年1季度', speed: -20 },
  { quarter: '2020年2季度', speed: -13 },
  { quarter: '2020年3季度', speed: -8 },
  { quarter: '2020年4季度', speed: -7 },
  { quarter: '2021年1季度', speed: 20 },
  { quarter: '2021年2季度', speed: 11.7 },
  { quarter: '2021年3季度', speed: 18.5 },
  { quarter: '2021年4季度', speed: 11 },
  { quarter: '2022年1季度', speed: 9 },
  { quarter: '2022年2季度', speed: -1 },
  { quarter: '2022年3季度', speed: 4 },
  { quarter: '2022年4季度', speed: 1 }
]

// 只取有值的项，speed 统一转 number
const chartData = computed<ApiDataItem[]>(() => {
  const list = (props.data && props.data.length ? props.data : defaultData) ?? []
  return list.map((it) => ({
    quarter: String(it?.quarter ?? ''),
    speed: Number(it?.speed) || 0
  }))
})

const option = computed(() => {
  const xAxisData = chartData.value.map((item) => item.quarter)
  const seriesData = chartData.value.map((item) => item.speed)

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
      bottom: '12%',
      top: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        color: '#fff',
        fontSize: 26,
        rotate: 65
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
      axisLabel: { color: '#fff', fontSize: 30 },
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