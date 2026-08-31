<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

interface BarSeriesItem {
  name: string
  data: number[]
}
interface ChartPropData {
  xAxisData: string[]
  series: BarSeriesItem[]
}

const props = defineProps<{
  data?: ChartPropData
}>()

// 截图鞍山区县模拟数据
const defaultData: ChartPropData = {
  xAxisData: ['海城市', '台安县', '岫岩县', '铁东区', '铁西区', '立山区', '千山区'],
  series: [
    {
      name: '每户平均人数',
      data: [3.12, 2.62, 3.28, 2.6, 2.12, 2.15, 5.6]
    }
  ]
}

const chartData = computed(() => props.data ?? defaultData)

const option = computed(() => {
  return {
    backgroundColor: 'transparent',
    // 重点：aria.decal 实现柱子内部斜向光栅纹理，就是截图里的斜条纹效果
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
      data: chartData.value.series.map((s) => s.name),
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
      data: chartData.value.xAxisData,
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
    series: [
      {
        name: chartData.value.series[0].name,
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
        data: chartData.value.series[0].data
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
