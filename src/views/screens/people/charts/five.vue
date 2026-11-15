<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

// 改成传入数组，每一项：x名称 + 多个指标数值
interface ChartListItem {
  name: string // x轴类目，如 '2017'
  [key: string]: string | number // 支持动态指标字段
}

interface Props {
  list?: ChartListItem[]
  seriesNames: string[] // 需要渲染的系列名称，用来匹配字段，例如 ['总户数','总人数']
}
const props = defineProps<Props>()

// 默认模拟数据
const defaultList: ChartListItem[] = []

const chartList = computed(() => props.list ?? defaultList)

const option = computed(() => {
  const xAxisData = chartList.value.map((item) => item.name as string)

  // 根据 seriesNames 自动生成series
  const series = props.seriesNames.map((name, idx) => {
    // 配色：亮金色 + 冰蓝，与左侧其余面板的紫/绿/青拉开层次
    const colorMap: Record<string, string> = {
      总户数: '#ffd15c',
      总人数: '#36e8ff'
    }
    // 双y轴：0=总户数（左），1=总人数（右）
    const yAxisIndexMap: Record<string, number> = {
      总户数: 0,
      总人数: 1
    }
    return {
      name,
      type: 'line',
      smooth: true,
      lineStyle: { width: 3, color: colorMap[name] },
      itemStyle: { color: colorMap[name] },
      yAxisIndex: yAxisIndexMap[name] ?? 0,
      data: chartList.value.map((item) => item[name] as number)
    }
  })

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      textStyle: { fontSize: 40, color: '#ffffff' },
      backgroundColor: 'rgba(6, 18, 48, 0.92)'
    },
    legend: {
      data: props.seriesNames,
      textStyle: { color: '#ffffff', fontSize: 40 },
      top: 8
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 80, // 增加顶部留白，防止 y 轴 name 和 legend 挤在一起
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: { lineStyle: { color: 'rgba(120, 200, 255, 0.4)' } },
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 28 },
      splitLine: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: '单位：万户',
        min: 120,
        max: 125,
        // 专门设置 y 轴 name 的字体大小和颜色
        nameTextStyle: {
          color: 'rgba(214, 238, 255, 0.6)',
          fontSize: 28, // 调整为你需要的大小
          fontWeight: 'bold'
        },
        axisLine: { lineStyle: { color: 'rgba(120, 200, 255, 0.4)' } },
        axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 28 },
        splitLine: { lineStyle: { color: 'rgba(120, 200, 255, 0.15)' } }
      },
      {
        type: 'value',
        name: '单位：万人',
        min: 300,
        max: 350,
        position: 'right',
        // 专门设置 y 轴 name 的字体大小和颜色
        nameTextStyle: {
          color: 'rgba(214, 238, 255, 0.6)',
          fontSize: 28, // 调整为你需要的大小
          fontWeight: 'bold'
        },
        axisLine: { lineStyle: { color: 'rgba(120, 200, 255, 0.4)' } },
        axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 28 },
        splitLine: { show: false }
      }
    ],
    series
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
