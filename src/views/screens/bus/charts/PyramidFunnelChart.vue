<template>
  <div class="funnel-wrap">
    <!-- 右上角月份下拉框 -->
    <div class="select-box">
      <select v-model="currentMonth">
        <option value="2022-09">2022-09</option>
        <option value="2022-10">2022-10</option>
        <option value="2022-11">2022-11</option>
        <option value="2022-12">2022-12</option>
        <option value="2023-01">2023-01</option>
        <option value="2023-02">2023-02</option>
      </select>
    </div>
    <EChart :option="chartOption" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import * as echarts from 'echarts'

// 默认选中2023-02
const currentMonth = ref('2023-02')

// 各月份分层数据（从上到下：跨市班线 → 跨县班线 → 县内班线）
const monthDataMap: Record<string, Array<{ name: string; value: number }>> = {
  '2023-02': [
    { name: '跨市班线', value: 15.8 },
    { name: '跨县班线', value: 38.69 },
    { name: '县内班线', value: 80.06 }
  ],
  '2023-01': [
    { name: '跨市班线', value: 14.2 },
    { name: '跨县班线', value: 37.1 },
    { name: '县内班线', value: 66.3 }
  ],
  '2022-12': [
    { name: '跨市班线', value: 13.5 },
    { name: '跨县班线', value: 26.8 },
    { name: '县内班线', value: 59.2 }
  ],
  '2022-11': [
    { name: '跨市班线', value: 12.9 },
    { name: '跨县班线', value: 25.3 },
    { name: '县内班线', value: 44.7 }
  ],
  '2022-10': [
    { name: '跨市班线', value: 13.2 },
    { name: '跨县班线', value: 36.2 },
    { name: '县内班线', value: 72.1 }
  ],
  '2022-09': [
    { name: '跨市班线', value: 14.6 },
    { name: '跨县班线', value: 37.9 },
    { name: '县内班线', value: 77.5 }
  ]
}

// 径向渐变 模拟圆柱3D明暗光影（从上至下三层）
const gradientList = [
  // 顶层跨市：浅蓝径向渐变，中间亮边缘暗，模拟3D锥顶
  new echarts.graphic.RadialGradient(0.5, 0.3, 0.8, [
    { offset: 0, color: '#99e0ff' },
    { offset: 1, color: '#1a78dd' }
  ]),
  // 中层跨县：青绿渐变
  new echarts.graphic.RadialGradient(0.5, 0.3, 0.8, [
    { offset: 0, color: '#a8fff0' },
    { offset: 1, color: '#18b8a8' }
  ]),
  // 底层县内：深蓝渐变
  new echarts.graphic.RadialGradient(0.5, 0.3, 0.8, [
    { offset: 0, color: '#80bfff' },
    { offset: 1, color: '#1044bb' }
  ])
]

const chartOption = computed(() => {
  const rawData = monthDataMap[currentMonth.value]
  const renderData = rawData.map((item, idx) => ({
    name: item.name,
    value: item.value,
    itemStyle: { color: gradientList[idx] }
  }))

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.75)',
      textStyle: { color: '#fff' },
      formatter: (params: any) => `${params.name}：${params.value} 万人`
    },
    series: [
      {
        type: 'funnel',
        left: '8%',
        top: '5%',
        width: '65%',
        height: '90%',
        sort: 'ascending', // 数值小在上，金字塔上尖下宽
        gap: 2,
        min: 0,
        max: 90,
        itemStyle: {
          borderRadius: 14, // 圆角模拟圆柱侧面
          shadowBlur: 22, // 外发光增强立体
          shadowColor: 'rgba(80,200,255,0.45)',
          shadowOffsetX: 4,
          shadowOffsetY: 6
        },
        label: {
          show: true,
          position: 'right',
          color: '#ffffff',
          fontSize: 16,
          formatter: '{b} {c} 万人'
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: '#70e0ff',
            width: 1
          }
        },
        data: renderData
      }
    ]
  }
})
</script>

<style scoped>
.funnel-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
/* 右上角下拉 大屏深色科技样式 */
.select-box {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
}
.select-box select {
  background: rgba(30, 70, 140, 0.4);
  border: 1px solid #40a8ff;
  color: #fff;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
}
.select-box select option {
  background: #0a2048;
  color: #fff;
}
</style>