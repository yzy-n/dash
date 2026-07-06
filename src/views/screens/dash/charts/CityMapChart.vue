<script setup lang="ts">
import { computed } from 'vue'

import EChart from '@/components/echarts/EChart.vue'

const option = computed(() => {
  const polygon = [
    [18, 22],
    [36, 10],
    [60, 16],
    [78, 30],
    [86, 52],
    [74, 72],
    [56, 86],
    [34, 88],
    [18, 78],
    [10, 58],
    [12, 36]
  ]

  return {
    backgroundColor: 'transparent',
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    xAxis: { type: 'value', min: 0, max: 100, show: false },
    yAxis: { type: 'value', min: 0, max: 100, show: false },
    series: [
      {
        type: 'custom',
        coordinateSystem: 'cartesian2d',
        renderItem: (_: any, api: any) => {
          const pts = polygon.map((p) => api.coord(p))
          return {
            type: 'polygon',
            shape: { points: pts },
            style: api.style({
              fill: 'rgba(76, 210, 255, 0.28)',
              stroke: 'rgba(255, 226, 122, 0.8)',
              lineWidth: 3,
              shadowBlur: 18,
              shadowColor: 'rgba(80,190,255,0.35)'
            })
          }
        },
        data: [0]
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        data: [
          { name: '台安', value: [38, 56] },
          { name: '海城市', value: [52, 74] },
          { name: '岫岩县', value: [70, 40] }
        ],
        symbolSize: 10,
        rippleEffect: { scale: 2.4, brushType: 'stroke' },
        label: {
          show: true,
          formatter: (p: any) => p.name,
          color: '#eaf4ff',
          fontSize: 14,
          position: 'right'
        },
        itemStyle: { color: '#36e8ff' }
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
