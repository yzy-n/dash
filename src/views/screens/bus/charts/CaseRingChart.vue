<template>
  <EChart :option="chartOption" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

// 图表数据，和截图一一对应
const dataList = [
  { name: '上报数', value: 40, color: '#ffdd22' },
  { name: '立案数', value: 30, color: '#0078ff' },
  { name: '派遣数', value: 10, color: '#00ccff' },
  { name: '处置数', value: 20, color: '#26e8ee' },
  { name: '结案数', value: 80, color: '#ff8822' },
  { name: '核查数', value: 10, color: '#ff2222' }
]

const chartOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      // 外层主圆环（带外发光）
      {
        type: 'pie',
        radius: ['64%', '80%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        silent: true,
        gap: 6, // 分段间隙留白
        itemStyle: {
          borderRadius: 10, // 分段圆角
          shadowBlur: 25, // 发光强度
          shadowColor: 'auto' // 跟随色块颜色发光
        },
        label: {
          show: true,
          position: 'outer',
          alignTo: 'labelLine',
          formatter: (params) => `${params.name}: ${params.value}`,
          color: '#ffffff',
          fontSize: 20
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
        data: dataList.map((item) => ({
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
        silent: true,
        gap: 6,
        itemStyle: {
          borderRadius: 10,
          color: '#ffdd22',
          shadowBlur: 12,
          shadowColor: '#ffdd22'
        },
        label: { show: false },
        labelLine: { show: false },
        data: dataList.map((item) => ({ value: item.value }))
      }
    ],
    graphic: [
      // 中间文字「交通方式」
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
