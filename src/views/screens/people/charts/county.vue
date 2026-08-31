<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

interface SeriesItem {
  name: string
  data: number[]
}
interface ChartData {
  xAxisData: string[]
  series: SeriesItem[]
}

const props = defineProps<{
  data?: ChartData
}>()

// 截图里鞍山各区县模拟数据
const defaultData: ChartData = {
  xAxisData: ['海城市', '台安县', '岫岩县', '铁东区', '铁西区', '立山区', '千山区'],
  series: [
    { name: '农村人口数', data: [76, 29, 36, 2, 6, 2, 10] },
    { name: '城镇人口数', data: [31, 8, 15, 52, 24, 47, 4] }
  ]
}

const chartData = computed(() => props.data ?? defaultData)

const option = computed(() => {
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
      data: ['农村人口数', '城镇人口数'],
      top: 4,
      right: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 12 },
      itemWidth: 10,
      itemHeight: 10
    },
    grid: {
      left: 48,
      right: 20,
      top: 40,
      bottom: 60,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.value.xAxisData,
      axisLabel: {
        color: 'rgba(214, 238, 255, 0.6)',
        fontSize: 12,
        rotate: 30
      },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位：万人',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '农村人口数',
        type: 'bar',
        barWidth: 16,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#ffdd44' },
              { offset: 1, color: '#b89c20' }
            ]
          }
        },
        data: chartData.value.series[0].data
      },
      {
        name: '城镇人口数',
        type: 'bar',
        barWidth: 16,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#33c8ff' },
              { offset: 1, color: '#1772d8' }
            ]
          }
        },
        data: chartData.value.series[1].data
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
