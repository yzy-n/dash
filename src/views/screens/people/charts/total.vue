<template>
  <div ref="chartRef" class="echarts-double-bar"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

// 传入的list每一项：name为x轴名称，两个指标字段
interface ChartListItem {
  name: string
  总户数: number
  总人数: number
}

interface Props {
  list?: ChartListItem[]
}
const props = defineProps<Props>()

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const renderChart = () => {
  if (!chartInstance || !chartRef.value || !props.list?.length) return

  // 从list自动拆分x轴、两组数据
  const xAxisData = props.list.map((item) => item.name)
  const data1 = props.list.map((item) => item.总户数)
  const data2 = props.list.map((item) => item.总人数)

  const option: echarts.EChartsOption = {
    backgroundColor: '#091835',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['总户数', '总人数'],
      textStyle: { color: '#fff' },
      top: 8
    },
    grid: {
      left: '6%',
      right: '6%',
      top: '15%',
      bottom: '12%'
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: { lineStyle: { color: '#335488' } },
      axisLabel: { color: '#ffffff', fontSize: 26 }
    },
    yAxis: [
      {
        type: 'value',
        name: '单位：万户',
        nameTextStyle: { color: '#fff', fontSize: 26 },
        splitLine: { lineStyle: { color: '#25406b' } },
        axisLine: { show: false },
        axisLabel: { color: '#fff', fontSize: 26 },
        max: 35
      },
      {
        type: 'value',
        name: '单位：万人',
        nameTextStyle: { color: '#fff' },
        splitLine: { show: false },
        axisLine: { show: false },
        axisLabel: { color: '#fff' },
        max: 120
      }
    ],
    series: [
      {
        name: '总户数',
        type: 'bar',
        yAxisIndex: 0,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#ffdd22' },
              { offset: 1, color: '#d4b000' }
            ]
          }
        },
        barWidth: 50,
        data: data1
      },
      {
        name: '总人数',
        type: 'bar',
        yAxisIndex: 1,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#36e8b2' },
              { offset: 1, color: '#08a878' }
            ]
          }
        },
        barWidth: 50,
        data: data2
      }
    ]
  }
  chartInstance.setOption(option)
}
const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  renderChart()
}
const resize = () => chartInstance?.resize()
onMounted(() => {
  initChart()
  window.addEventListener('resize', resize)
})
watch(
  () => props.list,
  () => renderChart(),
  { deep: true }
)
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  chartInstance?.dispose()
})
</script>
<style scoped>
.echarts-double-bar {
  width: 100%;
  height: 100%;
}
</style>
