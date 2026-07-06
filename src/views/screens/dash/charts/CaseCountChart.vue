<script setup lang="ts">
import { computed } from 'vue'

import EChart from '@/components/echarts/EChart.vue'

const option = computed(() => {
  const x = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06']
  const y = [35210, 26840, 40120, 65420, 52890, 70210]

  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    grid: { left: 46, right: 18, top: 18, bottom: 34 },
    xAxis: {
      type: 'category',
      data: x,
      axisLine: { lineStyle: { color: 'rgba(101,200,255,0.25)' } },
      axisLabel: { color: 'rgba(214,238,255,0.7)', fontSize: 12, rotate: 25 }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214,238,255,0.55)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(101,200,255,0.12)' } }
    },
    series: [
      {
        type: 'bar',
        barWidth: 18,
        data: y,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#ffd15c' },
              { offset: 0.5, color: '#36e8ff' },
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
