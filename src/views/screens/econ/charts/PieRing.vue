<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

interface PieDataItem {
  name: string
  value: number
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
        radius: ['45%', '70%'], // 环形内外半径，做成空心环
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}\n增加值:{c}亿元\n占比:{d}%',
          color: '#fff',
          fontSize: 14
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: 'rgba(120, 200, 255, 0.6)'
          }
        },
        data: chartData.value,
        color: [
          '#33b8ff', // 第三产业蓝色
          '#e65c4f', // 第二产业红色
          '#ffd058' // 第一产业黄色
        ]
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
