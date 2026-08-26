<script setup lang="ts">
import { computed } from 'vue'
import * as echarts from 'echarts'
import EChart from '@/components/echarts/EChart.vue'

interface BarDataItem {
  name: string
  value: number
}

const props = defineProps<{
  data?: BarDataItem[]
}>()

const defaultData: BarDataItem[] = [
  { name: '海城市', value: 10.1 },
  { name: '台安县', value: 18 },
  { name: '岫岩县', value: 6.1 },
  { name: '铁东区', value: -3.8 },
  { name: '铁西区', value: 22.8 },
  { name: '立山区', value: 21.4 },
  { name: '千山区', value: 16.7 },
  { name: '高新区', value: 11.9 },
  { name: '经开区', value: 10.1 }
]

const chartData = computed(() => props.data ?? defaultData)

// ✅ 渐变移到 computed 外面，只实例化一次
const positiveGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  { offset: 0, color: '#33d8ff' },
  { offset: 1, color: '#0066bb' }
])
const negativeGradient = new echarts.graphic.LinearGradient(0, 1, 0, 0, [
  { offset: 0, color: '#bb2233' },
  { offset: 1, color: '#ff6677' }
])

const option = computed(() => {
  const xAxisData = chartData.value.map((item) => item.name)
  // ✅ 每条数据单独配置颜色、标签位置，处理正负值
  const seriesData = chartData.value.map((item) => {
    const isNeg = item.value < 0
    return {
      value: item.value,
      itemStyle: {
        color: isNeg ? negativeGradient : positiveGradient
      },
      label: {
        show: true,
        position: isNeg ? 'bottom' : 'top',
        color: '#fff',
        fontSize: 13
      }
    }
  })

  // ✅ 用 JSON.parse(JSON.stringify()) 彻底剥离Vue Proxy响应代理
  const opt = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,24,53,0.75)',
      textStyle: { color: '#fff' },
      formatter: '{b}<br/>{c} %'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '18%',
      top: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        color: '#fff',
        fontSize: 13,
        rotate: 40
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
        name: '占比',
        type: 'bar',
        barWidth: 24,
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
  <!-- 给EChart强制指定高度，防止容器高度0不渲染 -->
  <EChart :option="option" height="360px" />
</template>
