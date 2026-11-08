<script setup lang="ts">
import { computed } from 'vue'
import * as echarts from 'echarts'
import EChart from '@/components/echarts/EChart.vue'

export interface StackBarItem {
  name: string
  val1: number // 红色堆叠部分
  val2: number // 青色堆叠部分
}

const props = defineProps<{
  data?: StackBarItem[]
}>()

// 截图模拟数据
const defaultData: StackBarItem[] = []

const chartData = computed(() => props.data ?? defaultData)

const option = computed(() => {
  const xData = chartData.value.map((i) => i.name)
  const part1 = chartData.value.map((i) => i.val1)
  const part2 = chartData.value.map((i) => i.val2)
  // 折线取堆叠总和
  const totalLine = chartData.value.map((i) => i.val1 + i.val2)

  return {
    backgroundColor: '#2c424b',
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 28 },
      axisLine: { lineStyle: { color: '#556e78' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      max: 7000,
      splitLine: { lineStyle: { color: '#445962' } },
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 28 },
      axisLine: { show: false }
    },
    series: [
      {
        name: '类别A',
        type: 'bar',
        stack: 'total',
        data: part1,
        itemStyle: { color: '#ff8877' },
        label: {
          show: true,
          position: 'inside',
          color: '#fff'
        }
      },
      {
        name: '类别B',
        type: 'bar',
        stack: 'total',
        data: part2,
        itemStyle: { color: '#00bcb4' },
        label: {
          show: true,
          position: 'inside',
          color: '#fff'
        }
      },
      {
        name: '合计',
        type: 'line',
        data: totalLine,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { color: '#f8e238', width: 2 },
        itemStyle: { color: '#f8e238' },
        label: {
          show: true,
          position: 'top',
          color: '#f8e238'
        }
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" height="460px" />
</template>
