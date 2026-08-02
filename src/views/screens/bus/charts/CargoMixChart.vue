<template>
  <EChart :option="chartOption" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import * as echarts from 'echarts'

interface Props {
  xData?: string[]
  provinceNumData?: number[]
  provinceGrowthData?: number[]
  cityNumData?: number[]
  cityGrowthData?: number[]
  numUnit?: string
}

const props = defineProps<Props>()

const defaultXAxisData = ['2022-09', '2022-10', '2022-11', '2022-12', '2023-01', '2023-02']
const defaultProvinceNumData = [1020, 930, 880.2, 820, 650, 800]
const defaultProvinceGrowthData = [0, -12, 3.4, -8, -22, 26]
const defaultCityNumData = [1420, 1140, 1491, 1450, 940, 1060]
const defaultCityGrowthData = [-10, -28, -6, 13, -16, 29]

const xAxisData = computed(() => (props.xData?.length ? props.xData : defaultXAxisData))
const barSource = computed(() => [
  {
    name: '省均货运量',
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#a5ffb8' },
      { offset: 1, color: '#24b956' }
    ]),
    data: props.provinceNumData?.length ? props.provinceNumData : defaultProvinceNumData
  },
  {
    name: '市货运量',
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#ffe99a' },
      { offset: 1, color: '#f7b71e' }
    ]),
    data: props.cityNumData?.length ? props.cityNumData : defaultCityNumData
  }
])

const lineSource = computed(() => [
  {
    name: '省同比增长',
    color: '#47e1ff',
    data: props.provinceGrowthData?.length ? props.provinceGrowthData : defaultProvinceGrowthData
  },
  {
    name: '市同比增长',
    color: '#ffcc21',
    data: props.cityGrowthData?.length ? props.cityGrowthData : defaultCityGrowthData
  }
])

// 参考链接 xWkXG0IATZ 标准圆柱生成函数
function createCylinderSeries(list: any[]) {
  const series: any[] = []
  list.forEach((item) => {
    // 柱身主体
    series.push({
      name: item.name,
      type: 'bar',
      yAxisIndex: 0,
      barWidth: 22,
      itemStyle: {
        color: item.gradient,
        shadowBlur: 8,
        shadowColor: item.gradient.colorStops[1].color
      },
      barGap: '20%',
      data: item.data
    })
    // 顶部椭圆顶盖
    series.push({
      name: item.name + 'top',
      type: 'pictorialBar',
      yAxisIndex: 0,
      symbol: 'ellipse',
      symbolSize: [26, 10],
      symbolOffset: [0, -5],
      silent: true,
      itemStyle: { color: 'rgba(255,255,255,0.3)' },
      data: item.data
    })
    // 底部椭圆底座
    series.push({
      name: item.name + 'bottom',
      type: 'pictorialBar',
      yAxisIndex: 0,
      symbol: 'ellipse',
      symbolSize: [26, 10],
      symbolOffset: [0, 5],
      silent: true,
      itemStyle: { color: 'rgba(255,255,255,0.12)' },
      data: xAxisData.value.map(() => 0)
    })
  })
  return series
}

const chartOption = computed(() => {
  const numValues = [...barSource.value[0].data, ...barSource.value[1].data]
  const growthValues = [...lineSource.value[0].data, ...lineSource.value[1].data]
  const leftAxisMax = numValues.length ? Math.ceil((Math.max(...numValues) * 1.2) / 100) * 100 : 100
  const maxAbsGrowth = growthValues.length
    ? Math.max(...growthValues.map((item) => Math.abs(item)))
    : 0
  const rightAxisMax = maxAbsGrowth <= 10 ? 10 : Math.ceil(maxAbsGrowth / 10) * 10
  const cylinderSeries = createCylinderSeries(barSource.value)
  // 追加折线
  lineSource.value.forEach((line) => {
    cylinderSeries.push({
      name: line.name,
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      symbol: 'circle',
      symbolSize: 9,
      lineStyle: { color: line.color, width: 2 },
      itemStyle: { color: line.color },
      data: line.data
    })
  })

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.75)',
      textStyle: { color: '#fff', fontSize: 14 },
      formatter(params: any[]) {
        let res = params[0].axisValue + '<br/>'
        params.forEach((p) => {
          if (!p.seriesName.includes('top') && !p.seriesName.includes('bottom')) {
            const unit = p.seriesName.includes('货运') ? props.numUnit || '万吨' : '%'
            res += `${p.seriesName}: ${p.value}${unit}<br/>`
          }
        })
        return res
      }
    },
    legend: {
      top: 10,
      left: 'center',
      textStyle: { color: '#fff', fontSize: 14 },
      data: [...barSource.value.map((i) => i.name), ...lineSource.value.map((i) => i.name)]
    },
    grid: {
      left: '6%',
      right: '10%',
      top: '18%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData.value,
      axisLine: { lineStyle: { color: '#405888' } },
      axisLabel: { color: '#fff', fontSize: 15 },
      splitLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: [
      // 左侧 货运万吨
      {
        name: `单位：${props.numUnit || '万吨'}`,
        nameTextStyle: { color: '#fff', fontSize: 16 },
        type: 'value',
        min: 0,
        max: leftAxisMax,
        interval: Math.max(1, leftAxisMax / 5),
        axisLine: { lineStyle: { color: '#405888' } },
        axisLabel: { color: '#fff', fontSize: 15 },
        splitLine: { lineStyle: { color: 'rgba(82,110,165,0.3)' } },
        axisTick: { show: false }
      },
      // 右侧 同比百分比
      {
        name: '单位：%',
        nameTextStyle: { color: '#fff', fontSize: 16 },
        type: 'value',
        min: -rightAxisMax,
        max: rightAxisMax,
        interval: Math.max(1, rightAxisMax / 5),
        position: 'right',
        axisLine: { lineStyle: { color: '#405888' } },
        axisLabel: { color: '#fff', fontSize: 15 },
        splitLine: { show: false },
        axisTick: { show: false }
      }
    ],
    series: cylinderSeries
  }
})
</script>
