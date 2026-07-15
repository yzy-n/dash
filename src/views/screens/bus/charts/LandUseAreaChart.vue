<script setup lang="ts">
import { computed } from 'vue'

import EChart from '@/components/echarts/EChart.vue'

const option = computed(() => {
  const data = [
    { name: '居住用地', value: 80.91, total: 106.43 },
    { name: '工业用地', value: 82.06, total: 68.53 },
    { name: '道路交通设施用地', value: 61.17, total: 34.5 },
    { name: '商业服务业设施用地', value: 30.71, total: 14.91 },
    { name: '绿地与广场用地', value: 60.29, total: 27.65 }
  ]

  return {
    backgroundColor: 'transparent',
    grid: { left: 160, right: 18, top: 12, bottom: 10, containLabel: true },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'category',
      data: data.map((d) => d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(214,238,255,0.78)', fontSize: 20 }
    },
    series: [
      {
        type: 'bar',
        data: data.map((d) => d.value),
        barWidth: 30,
        showBackground: true,
        backgroundStyle: { color: 'rgba(6,18,48,0.55)' },
        label: {
          show: true,
          position: 'right',
          formatter: (p: any) => `${Number(p.value).toFixed(2)}%`,
          color: '#dff3ff',
          fontSize: 20
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
              { offset: 0, color: '#2f7dff' },
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
