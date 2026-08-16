<script setup lang="ts">
import { computed } from 'vue'

import EChart from '@/components/echarts/EChart.vue'
import type { MetricKey, TimeBarMetric } from '../types'

const props = withDefaults(
  defineProps<{
    metric?: MetricKey
    metrics?: Partial<Record<MetricKey, TimeBarMetric>>
  }>(),
  {
    metric: 'cover'
  }
)

const option = computed(() => {
  const metricNameMap: Record<MetricKey, string> = {
    cover: '绿化覆盖面积',
    garden: '园林绿地面积',
    park: '公园占地面积'
  }

  const selected: TimeBarMetric = {
    name: props.metrics?.[props.metric]?.name ?? metricNameMap[props.metric],
    years: props.metrics?.[props.metric]?.years ?? [],
    data: props.metrics?.[props.metric]?.data ?? [],
    yMax: props.metrics?.[props.metric]?.yMax,
    unit: props.metrics?.[props.metric]?.unit
  }

  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    grid: { left: 56, right: 18, top: 26, bottom: 26 },
    xAxis: {
      type: 'category',
      data: selected.years,
      axisLine: { lineStyle: { color: 'rgba(101,200,255,0.25)' } },
      axisLabel: { color: 'rgba(214,238,255,0.7)', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      max: selected.yMax,
      name: selected.unit ? `单位：${selected.unit}` : undefined,
      nameTextStyle: { color: 'rgba(214,238,255,0.55)', fontSize: 12, padding: [0, 0, 0, 10] },
      axisLabel: { color: 'rgba(214,238,255,0.55)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(101,200,255,0.12)' } }
    },
    series: [
      {
        name: selected.name,
        type: 'bar',
        barWidth: 50,
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
