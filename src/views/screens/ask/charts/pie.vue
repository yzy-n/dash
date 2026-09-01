<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import type { EChartsOption } from 'echarts'

// 饼图数据类型：各类婚姻登记数量占比
type MarriagePieRow = {
  name: string
  value: number
}

const props = defineProps<{
  data?: MarriagePieRow[]
}>()

// 模拟默认数据，和上面柱状图数值对应汇总
const defaultRows: MarriagePieRow[] = [
  { name: '初婚', value: 67000 },
  { name: '再婚', value: 21509 },
  { name: '复婚', value: 10589 },
  { name: '准许登记结婚', value: 48860 }
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
      formatter: '{b}: {c} 对 ({d}%)'
    },
    legend: {
      top: 4,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 12 }
    },
    series: [
      {
        name: '婚姻登记占比',
        type: 'pie',
        radius: ['40%', '68%'],
        center: ['50%', '54%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(6, 18, 48, 0.75)',
          borderWidth: 2
        },
        label: {
          show: true,
          color: 'rgba(240, 251, 255, 0.92)',
          fontSize: 12,
          formatter: '{b}\n{d}%'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(120, 190, 255, 0.45)'
          }
        },
        data: rows.value.map((item, idx) => {
          // 和柱状图保持一套配色
          const colorList = ['#4096ff', '#52c41a', '#faad14', '#f55442']
          return {
            ...item,
            itemStyle: { color: colorList[idx] }
          }
        })
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
