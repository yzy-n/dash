<template>
  <EChart :option="chartOption" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

// 图表数据（对应截图 rose1~rose5，数值控制扇区长度）
const roseData = [
  { name: '安装路灯道路长度', value: 12, color: '#2563eb' },
  { name: '道路照明灯盏数', value: 26, color: '#caa822' },
  { name: '城市照明装灯总功率', value: 35, color: '#10b98c' },
  { name: '城市照明总用电量', value: 48, color: '#6c42d8' }
]

const chartOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'pie',
        // 空心环形内外半径
        radius: ['22%', '82%'],
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
          fontSize: 14,
          color: '#fff'
        },
        labelLine: {
          show: true,
          length: 15,
          length2: 30,
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
