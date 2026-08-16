<template>
  <div class="funnel-wrap">
    <!-- 右上角月份下拉框 -->
    <div class="select-box">
      <select v-model="currentMonth">
        <option v-for="month in monthOptions" :key="month" :value="month">{{ month }}</option>
      </select>
    </div>
    <EChart :option="chartOption" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import * as echarts from 'echarts'

type FunnelRow = { name: string; value: number }

const props = withDefaults(
  defineProps<{
    monthDataMap?: Record<string, FunnelRow[]>
    unit?: string
  }>(),
  {
    monthDataMap: () => ({}),
    unit: '万人'
  }
)

const monthOptions = computed(() => {
  const list = Object.keys(props.monthDataMap || {})
  return list.length ? list : ['-']
})

const currentMonth = ref(monthOptions.value[0])

watch(monthOptions, (list) => {
  if (!list.length) return
  if (!list.includes(currentMonth.value)) currentMonth.value = list[0]
})

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
  const rawData = props.monthDataMap?.[currentMonth.value] ?? []
  const rowMap = new Map<string, number>()
  if (Array.isArray(rawData)) {
    rawData.forEach((item) => {
      if (!item) return
      const name = String((item as any).name ?? '')
      if (!name) return
      const value = Number((item as any).value)
      if (!Number.isFinite(value)) return
      const prev = rowMap.get(name)
      if (prev === undefined || value > prev) rowMap.set(name, value)
    })
  }

  const uniqueRows: FunnelRow[] = Array.from(rowMap.entries()).map(([name, value]) => ({
    name,
    value
  }))

  const hasData = uniqueRows.length > 0
  const renderData = hasData
    ? uniqueRows.slice(0, 3).map((item, idx) => ({
        name: item.name,
        value: item.value,
        itemStyle: { color: gradientList[idx % gradientList.length] }
      }))
    : []

  return {
    backgroundColor: 'transparent',
    graphic: hasData
      ? undefined
      : {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: '暂无数据',
            fill: 'rgba(214, 238, 255, 0.72)',
            fontSize: 18,
            fontWeight: 600
          }
        },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.75)',
      textStyle: { color: '#fff' },
      formatter: (params: any) => `${params.name}：${params.value} ${props.unit}`
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
          formatter: `{b} {c} ${props.unit}`
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
