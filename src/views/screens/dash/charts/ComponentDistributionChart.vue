<script setup lang="ts">
import { computed } from 'vue'

import EChart from '@/components/echarts/EChart.vue'

const option = computed(() => {
  const categories = ['公共设施', '园林绿化', '市容环境', '交通设施', '其他']
  const values = [33.05, 18.79, 6.89, 2.36, 0.29]

  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 18, top: 48, bottom: 44 },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: 'rgba(101,200,255,0.25)' } },
      axisLabel: { color: 'rgba(214,238,255,0.7)', fontSize: 20, rotate: 18 }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214,238,255,0.55)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(101,200,255,0.12)' } }
    },
    series: [
      {
        type: 'bar',
        barWidth: 24,
        data: values,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#b14cff' },
              { offset: 0.5, color: '#24e8ff' },
              { offset: 1, color: '#2f7dff' }
            ]
          }
        }
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
