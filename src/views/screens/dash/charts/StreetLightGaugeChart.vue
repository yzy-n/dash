<template>
  <EChart :option="chartOption" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import type { RoseDatum } from '../types'

const props = defineProps<{
  data: RoseDatum[]
}>()

const legendNames = ['安装路灯道路长度', '道路照明灯盏数', '城市照明装灯总功率', '城市照明总用电量']

const chartOption = computed(() => {
  const roseData = props.data
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'pie',
        // 空心环形内外半径（原 ['22%', '82%']，整体缩小）
        radius: ['18%', '40%'],
        center: ['50%', '50%'],
        // 玫瑰图核心配置：radius 扇区长度随数值变化
        roseType: 'radius',
        silent: true,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6, // 扇区圆角
          borderWidth: 2, // 外描边发光线
          borderColor: 'auto',
          shadowBlur: 18, // 外发光效果
          shadowColor: 'auto'
        },
        // 外侧文字引导线
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}：{c}',
          fontSize: 28, // 36 → 28，配合圆环缩小
          color: '#fff'
        },
        labelLine: {
          show: true,
          length: 10, // 15 → 10
          length2: 4, // 5  → 4
          lineStyle: {
            color: 'auto',
            width: 1
          }
        },
        data: roseData.map((item) => ({
          name: item.name,
          value: item.value,
          itemStyle: { color: item.color }
        }))
      }
    ]
  }
})
</script>
