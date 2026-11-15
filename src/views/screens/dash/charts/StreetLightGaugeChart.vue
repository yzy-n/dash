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

// 💡 步骤1：定义一个高级的“科技色板”
// 替换掉后端的默认色，按顺序分配给这四个扇形
const techColorPalette = [
  '#00E5FF', // 冰蓝
  '#FFB13D', // 亮金色（替代原来的土黄）
  '#7C4DFF', // 紫罗兰
  '#00FFB4'  // 荧光绿
]

// 💡 步骤2：优化渐变，增加玻璃质感，而不是渐变到发黑的颜色
const getGlassGradient = (color: string) => {
  return {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: color // 起始颜色使用传入的亮色
      },
      {
        offset: 1,
        // 用颜色本身加透明度，或者渐变到高亮白色，质感更好
        color: hexToRgba(color, 0.1) 
      }
    ]
  }
}

// 辅助函数：将 Hex 颜色转换为带透明度的 RGBA
const hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

const chartOption = computed(() => {
  const roseData = props.data

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c}（{d}%）',
      textStyle: { fontSize: 40, color: '#ffffff' },
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: '#fff',
      borderWidth: 1,
      padding: [12, 20],
      confine: true
    },
    series: [
      {
        type: 'pie',
        radius: ['30%', '55%'],
        center: ['50%', '50%'],
        roseType: 'radius',
        avoidLabelOverlap: true,
        minAngle: 15, 
        
        itemStyle: {
          borderRadius: 8,
          borderWidth: 2,
          // 边框使用半透明白色，增加切割感
          borderColor: 'rgba(255, 255, 255, 0.4)', 
          shadowBlur: 15,
          // 阴影使用当前颜色的发光效果
          shadowColor: 'auto' 
        },
        
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}\n{c}', 
          fontSize: 24, 
          color: '#e0f2fe',
          lineHeight: 34,
          fontWeight: 'bold'
        },
        
        labelLine: {
          show: true,
          length: 20,
          length2: 40,
          lineStyle: {
            color: 'rgba(84, 188, 255, 0.5)',
            width: 2
          }
        },
        
        // 💡 步骤3：覆盖原本的 item.color，使用我们的科技色板
        data: roseData.map((item, index) => {
          // 如果数据超过 4 个，循环使用色板
          const color = techColorPalette[index % techColorPalette.length] 
          
          return {
            name: item.name,
            value: item.value,
            itemStyle: { 
              // 应用新的渐变
              color: getGlassGradient(color) 
            }
          }
        })
      }
    ]
  }
})
</script>