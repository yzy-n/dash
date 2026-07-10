<template>
  <EChart :option="option" />
</template>

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

  // 计算总值
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const max = Math.max(...data.map((d) => d.value)) || 1

  return {
    backgroundColor: 'transparent',
    grid: { left: 120, right: 80, top: 12, bottom: 10 },
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
      axisLabel: { color: 'rgba(214,238,255,0.78)', fontSize: 20 }
    },
    series: [
      {
        type: 'bar',
        data: data.map((d) => d.value),
        barWidth: 40,
        showBackground: true,
        backgroundStyle: { color: 'rgba(6,18,48,0.55)' },
        label: {
          show: true,
          position: 'right',
          formatter: (p: any) => {
            // p.data 是当前条原始数值
            const percent = ((p.data / total) * 100).toFixed(1)
            return `${percent}%`
          },
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