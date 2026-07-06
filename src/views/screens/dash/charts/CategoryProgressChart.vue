<script setup lang="ts">
import { computed } from 'vue'

import EChart from '@/components/echarts/EChart.vue'

const option = computed(() => {
  const data = [
    { name: '公共设施', value: 330543 },
    { name: '园林绿化', value: 187872 },
    { name: '市容环境', value: 68894 },
    { name: '交通设施', value: 23621 },
    { name: '其他部件', value: 292 }
  ]

  const max = Math.max(...data.map((d) => d.value)) || 1

  return {
    backgroundColor: 'transparent',
    grid: { left: 120, right: 24, top: 12, bottom: 10 },
    xAxis: {
      type: 'value',
      max,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'category',
      data: data.map((d) => d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(214,238,255,0.78)', fontSize: 12 }
    },
    series: [
      {
        type: 'bar',
        data: data.map((d) => d.value),
        barWidth: 12,
        showBackground: true,
        backgroundStyle: { color: 'rgba(6,18,48,0.55)' },
        label: {
          show: true,
          position: 'right',
          formatter: (p: any) => `${p.value}个`,
          color: '#dff3ff',
          fontSize: 12
        },
        itemStyle: {
          borderRadius: 8,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#b14cff' },
              { offset: 0.55, color: '#36e8ff' },
              { offset: 1, color: '#5dffcb' }
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
