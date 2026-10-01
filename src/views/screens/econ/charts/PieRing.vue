<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

interface PieDataItem {
  name: string
  value: number
  rate?: number
}

const props = defineProps<{
  data?: PieDataItem[]
}>()

const defaultData: PieDataItem[] = [
  { name: '第三产业', value: 995.5 },
  { name: '第二产业', value: 746 },
  { name: '第一产业', value: 121.7 }
]

const chartData = computed(() => props.data ?? defaultData)

const option = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,24,53,0.75)',
      textStyle: { color: '#fff' }
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4
        },
        label: {
          show: true,
          position: 'outside',
          formatter: (params: any) => {
            const it = params.data || {}
            const rate =
              it.rate !== undefined && it.rate !== null ? it.rate : params.percent
            return `${it.name}\n增加值:${it.value}亿元\n占比:${rate}%`
          },
          color: '#fff',
          fontSize: 30
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: 'rgba(120, 200, 255, 0.6)'
          }
        },
        data: chartData.value,
        color: ['#33b8ff', '#e65c4f', '#ffd058']
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>