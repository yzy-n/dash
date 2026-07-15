<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

// 接收父组件传参
interface Props {
  xData: string[]
  yData: number[]
}
const props = defineProps<Props>()

let chartInstance: echarts.ECharts | null = null
const chartRef = ref<HTMLDivElement | null>(null)

// 渲染图表
const renderChart = () => {
  if (!chartRef.value || !chartInstance) return
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.9)',
      borderColor: 'rgba(89, 194, 255, 0.12)',
      textStyle: { color: '#fff' },
      formatter: '{b}<br/>数量 : {c}'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.xData,
      axisLine: { lineStyle: { color: 'rgba(90, 200, 255, 0.2)' } },
      axisLabel: {
        color: 'rgba(214, 238, 255, 0.7)',
        rotate: 15
      }
    },
    yAxis: {
      type: 'value',
      name: '单位：万个',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.6)' },
      max: 20,
      axisLine: { lineStyle: { color: 'rgba(90, 200, 255, 0.2)' } },
      splitLine: { lineStyle: { color: 'rgba(90, 200, 255, 0.1)' } },
      axisLabel: { color: 'rgba(214, 238, 255, 0.7)' }
    },
    series: [
      {
        name: '停车位数量',
        type: 'bar',
        data: props.yData,
        barWidth: 80,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#fff266' },
            { offset: 1, color: '#ffaa00' }
          ])
        }
      }
    ]
  }
  chartInstance.setOption(option)
}

// 初始化
const initChart = async () => {
  await nextTick()
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  renderChart()
  window.addEventListener('resize', () => chartInstance?.resize())
}

// 监听数据变化刷新图表
watch(
  () => [props.xData, props.yData],
  () => {
    renderChart()
  },
  { deep: true }
)

onMounted(() => initChart())
</script>

<template>
  <div ref="chartRef" class="parking-bar-chart"></div>
</template>

<style scoped>
.parking-bar-chart {
  width: 100%;
  height: 100%;
}
</style>
