<script setup lang="ts">
import { computed } from 'vue'

import EChart from '@/components/echarts/EChart.vue'

const option = computed(() => {
  const value = 86.4

  return {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        startAngle: 210,
        endAngle: -30,
        radius: '94%',
        progress: {
          show: true,
          width: 16,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#36e8ff' },
                { offset: 0.5, color: '#2f7dff' },
                { offset: 1, color: '#7d5dff' }
              ]
            }
          }
        },
        axisLine: {
          lineStyle: {
            width: 16,
            color: [[1, 'rgba(30,80,180,0.22)']]
          }
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        pointer: { show: false },
        anchor: { show: false },
        title: { show: false },
        detail: {
          valueAnimation: true,
          formatter: `{value}%\n路灯亮灯率`,
          color: '#eaf4ff',
          fontSize: 22,
          offsetCenter: [0, 10]
        },
        data: [{ value }]
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
