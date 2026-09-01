<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import type { EChartsOption } from 'echarts'

type Row = { name: string; value: number }

const props = defineProps<{
  data?: Row[]
}>()

// 默认模拟数据，和截图数值对应
const defaultRows: Row[] = [
  { name: 'IDS', value: 10 },
  { name: 'VPN', value: 5 },
  { name: '交换机', value: 15 },
  { name: '防火墙', value: 25 },
  { name: 'WAF', value: 20 },
  { name: '堡垒机', value: 35 }
]

const rows = computed(() => (props.data && props.data.length ? props.data : defaultRows))

const option = computed<EChartsOption>(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.92)' },
      formatter: '{b}<br/>数值：{c}'
    },
    legend: {
      right: 8,
      top: 'center',
      orient: 'vertical',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 12 }
    },
    polar: {
      radius: ['12%', '88%'],
      axisLine: {
        lineStyle: { color: 'rgba(24, 110, 155, 0.45)' }
      },
      splitLine: {
        lineStyle: { color: 'rgba(24, 110, 155, 0.3)' }
      }
    },
    angleAxis: {
      type: 'category',
      show: false
    },
    radiusAxis: {
      type: 'value',
      axisLabel: {
        color: '#fce647',
        fontSize: 11
      },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    series: [
      {
        type: 'pie',
        roseType: 'area',
        polarIndex: 0,
        center: ['50%', '50%'],
        radius: ['12%', '88%'],
        label: {
          show: true,
          position: 'outside',
          color: '#fce647',
          fontSize: 11
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: '#fce647',
            width: 1
          }
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: '#0b2442'
        },
        data: rows.value
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
