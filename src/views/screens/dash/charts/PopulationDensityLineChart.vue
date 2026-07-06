<script setup lang="ts">
import { computed } from 'vue'

import EChart from '@/components/echarts/EChart.vue'

const option = computed(() => {
  const x = ['2018', '2019', '2020', '2021']
  const series = [
    { name: '主城区', data: [14.2, 14.6, 15.1, 15.3], color: '#36e8ff' },
    { name: '郊区', data: [12.1, 12.6, 13.4, 13.9], color: '#7d5dff' },
    { name: '新区', data: [11.3, 11.7, 12.2, 12.8], color: '#ffd15c' }
  ]

  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    legend: {
      top: 0,
      right: 8,
      textStyle: { color: 'rgba(214,238,255,0.75)', fontSize: 12 },
      itemWidth: 10,
      itemHeight: 6
    },
    grid: { left: 40, right: 18, top: 34, bottom: 26 },
    xAxis: {
      type: 'category',
      data: x,
      axisLine: { lineStyle: { color: 'rgba(101,200,255,0.25)' } },
      axisLabel: { color: 'rgba(214,238,255,0.7)', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214,238,255,0.55)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(101,200,255,0.12)' } }
    },
    series: series.map((s) => ({
      name: s.name,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 7,
      data: s.data,
      lineStyle: { width: 3, color: s.color },
      itemStyle: { color: s.color },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: `${s.color}55` },
            { offset: 1, color: `${s.color}00` }
          ]
        }
      }
    }))
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
