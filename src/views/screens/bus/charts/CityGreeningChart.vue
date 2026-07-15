<script setup lang="ts">
import { computed } from 'vue'

import EChart from '@/components/echarts/EChart.vue'

type Metric = 'cover' | 'garden' | 'park'

const props = withDefaults(defineProps<{ metric?: Metric }>(), {
  metric: 'cover'
})

const option = computed(() => {
  const years = ['2020', '2021', '2022', '2023']
  const metricMap: Record<Metric, { name: string; data: number[]; yMax: number; unit: string }> = {
    cover: { name: '绿化覆盖面积', data: [7050, 7375.28, 7480, 7360], yMax: 8000, unit: '公顷' },
    garden: { name: '园林绿地面积', data: [5120, 5360, 5580, 5730], yMax: 6500, unit: '公顷' },
    park: { name: '公园占地面积', data: [1320, 1410, 1560, 1685], yMax: 2200, unit: '公顷' }
  }

  const selected = metricMap[props.metric]

  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    grid: { left: 56, right: 18, top: 26, bottom: 26 },
    xAxis: {
      type: 'category',
      data: years,
      axisLine: { lineStyle: { color: 'rgba(101,200,255,0.25)' } },
      axisLabel: { color: 'rgba(214,238,255,0.7)', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      max: selected.yMax,
      name: `单位：${selected.unit}`,
      nameTextStyle: { color: 'rgba(214,238,255,0.55)', fontSize: 12, padding: [0, 0, 0, 10] },
      axisLabel: { color: 'rgba(214,238,255,0.55)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(101,200,255,0.12)' } }
    },
    series: [
      {
        name: selected.name,
        type: 'bar',
        barWidth: 22,
        data: selected.data,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#7d5dff' },
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
