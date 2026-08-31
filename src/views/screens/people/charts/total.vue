<template>
  <div ref="chartRef" class="echarts-double-bar"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

interface Props {
  xAxisData: string[]
  data1: number[] //总户数 万户 左Y轴
  data2: number[] //总人数 万人 右Y轴
}
const props = defineProps<Props>()

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const renderChart = () => {
  if (!chartInstance || !chartRef.value) return
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
      data: props.xAxisData,
      axisLine: { lineStyle: { color: '#335488' } },
      axisLabel: { color: '#ffffff', fontSize: 14 }
    },
    yAxis: [
      {
        type: 'value',
        name: '单位：万户',
        nameTextStyle: { color: '#fff' },
        splitLine: { lineStyle: { color: '#25406b' } },
        axisLine: { show: false },
        axisLabel: { color: '#fff' },
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
        barWidth: 22,
        data: props.data1
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
        barWidth: 22,
        data: props.data2
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
  () => [props.xAxisData, props.data1, props.data2],
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
