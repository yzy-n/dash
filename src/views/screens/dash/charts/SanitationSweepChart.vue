<script setup lang="ts">
import { computed } from 'vue'

import EChart from '@/components/echarts/EChart.vue'

const option = computed(() => {
  const years = ['2018', '2019', '2020', '2021', '2022']
  const values = [2350, 2680, 2890, 3050, 3320]

  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 18, top: 18, bottom: 26 },
    xAxis: {
      type: 'category',
      data: years,
      axisLine: { lineStyle: { color: 'rgba(101,200,255,0.25)' } },
      axisLabel: { color: 'rgba(214,238,255,0.7)', fontSize: 12 }
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
              { offset: 0, color: '#36e8ff' },
              { offset: 1, color: '#2c8bff' }
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
