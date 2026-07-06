<script setup lang="ts">
import { computed } from 'vue'

import EChart from '@/components/echarts/EChart.vue'

const option = computed(() => {
  const done = 77623
  const total = 90400
  const rate = Math.round((done / total) * 1000) / 10

  return {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'pie',
        radius: ['62%', '82%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        silent: true,
        label: { show: false },
        data: [
          {
            value: done,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#36e8ff' },
                  { offset: 0.5, color: '#2f7dff' },
                  { offset: 1, color: '#b14cff' }
                ]
              }
            }
          },
          { value: Math.max(0, total - done), itemStyle: { color: 'rgba(30,80,180,0.2)' } }
        ]
      }
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '42%',
        style: { text: '上报数', fill: 'rgba(214,238,255,0.78)', fontSize: 14 }
      },
      {
        type: 'text',
        left: 'center',
        top: '50%',
        style: { text: String(done), fill: '#ffe27a', fontSize: 22, fontWeight: 700 }
      },
      {
        type: 'text',
        left: 'center',
        top: '62%',
        style: { text: `完成率 ${rate}%`, fill: 'rgba(214,238,255,0.72)', fontSize: 14 }
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
