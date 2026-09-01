<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import type { EChartsOption } from 'echarts'

type Row = { name: string; worker: number; retire: number }

const props = defineProps<{
  data?: Row[]
}>()

const defaultRows: Row[] = [
  { name: '市本级', worker: 12.95, retire: 17.65 },
  { name: '海城市', worker: 23.6, retire: 12.3 },
  { name: '台安县', worker: 4.5, retire: 2.2 },
  { name: '岫岩县', worker: 7.1, retire: 6.0 },
  { name: '铁东区', worker: 9.8, retire: 4.6 },
  { name: '铁西区', worker: 7.4, retire: 4.2 },
  { name: '立山区', worker: 7.6, retire: 4.1 },
  { name: '千山区', worker: 4.9, retire: 2.6 }
]

const rows = computed(() => (props.data && props.data.length ? props.data : defaultRows))

const option = computed<EChartsOption>(() => {
  const names = rows.value.map((r) => r.name)
  const worker = rows.value.map((r) => r.worker)
  const retire = rows.value.map((r) => r.retire)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.92)' },
      axisPointer: { type: 'shadow' },
      formatter: (ps: any) => {
        const p0 = ps?.[0]
        const p1 = ps?.[1]
        return `${p0?.axisValue ?? ''}<br/>参保职工数：${p0?.value ?? '-'}万人<br/>退休数：${p1?.value ?? '-'}万人`
      }
    },
    legend: {
      top: 6,
      right: 16,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 12, fontWeight: 800 },
      data: ['参保职工数', '退休数']
    },
    grid: { left: 52, right: 18, top: 40, bottom: 44 },
    xAxis: {
      type: 'category',
      data: names,
      axisLine: { lineStyle: { color: 'rgba(140, 210, 255, 0.22)' } },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 12, fontWeight: 800 }
    },
    yAxis: {
      type: 'value',
      name: '单位：万人',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12, fontWeight: 800, padding: [0, 0, 0, 10] },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 12, fontWeight: 800 },
      splitLine: { lineStyle: { color: 'rgba(140, 210, 255, 0.12)' } }
    },
    series: [
      {
        name: '参保职工数',
        type: 'bar',
        barWidth: 14,
        barGap: '35%',
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(206, 255, 106, 0.95)' },
              { offset: 1, color: 'rgba(118, 216, 86, 0.85)' }
            ]
          }
        },
        data: worker
      },
      {
        name: '退休数',
        type: 'bar',
        barWidth: 14,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 192, 90, 0.95)' },
              { offset: 1, color: 'rgba(255, 122, 44, 0.85)' }
            ]
          }
        },
        data: retire
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
