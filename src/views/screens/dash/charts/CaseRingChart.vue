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

const chartOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      // ① 饼图必须用 item
      trigger: 'item',
      formatter: '{b}<br/>{c}',
      textStyle: { fontSize: 40, color: '#ffffff' },
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.5)',
      borderWidth: 1,
      padding: [12, 20],
      confine: true // 防止贴近边缘时被容器裁掉
    },
    series: [
      // 外层主圆环（带外发光）
      {
        type: 'pie',
        radius: ['60%', '64%'], // ② 原来是 ['64%','60%']，内径>外径，环反了
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        // ③ 删除 silent: true，否则鼠标事件被禁用，tooltip 不触发
        gap: 6,
        itemStyle: {
          borderRadius: 10,
          shadowBlur: 25,
          shadowColor: 'auto'
        },
        label: {
          show: true,
          position: 'outer',
          alignTo: 'labelLine',
          formatter: (params) => `${params.name}: ${params.value}`,
          color: '#ffffff',
          fontSize: 28
        },
        labelLine: {
          show: true,
          length: 18,
          length2: 35,
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        data: props.data.map((item) => ({
          name: item.name,
          value: item.value,
          itemStyle: { color: item.color }
        }))
      },
      // 内层细黄色圆环（同步黄色发光）
      {
        type: 'pie',
        radius: ['46%', '56%'],
        center: ['50%', '50%'],
        gap: 6,
        itemStyle: {
          borderRadius: 10,
          color: '#ffdd22',
          shadowBlur: 12,
          shadowColor: '#ffdd22'
        },
        // ③ 内层环没有 name，加了 tooltip.show:false 避免 hover 弹出空白名称
        tooltip: { show: false },
        label: { show: false },
        labelLine: { show: false },
        data: props.data.map((item) => ({
          name: item.name,
          value: item.value
        }))
      }
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: '',
          fill: '#ffffff',
          fontSize: 30,
          fontWeight: 'bold'
        }
      }
    ]
  }
})
</script>
