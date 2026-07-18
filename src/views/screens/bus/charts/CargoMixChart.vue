<template>
  <EChart :option="chartOption" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import * as echarts from 'echarts'

const xAxisData = ['2022-09', '2022-10', '2022-11', '2022-12', '2023-01', '2023-02']

// 柱状：省均货运、市货运（左Y轴 万吨）
const barSource = [
  {
    name: '省均货运量',
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#a5ffb8' },
      { offset: 1, color: '#24b956' }
    ]),
    data: [1020, 930, 880.2, 820, 650, 800]
  },
  {
    name: '市货运量',
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#ffe99a' },
      { offset: 1, color: '#f7b71e' }
    ]),
    data: [1420, 1140, 1491, 1450, 940, 1060]
  }
]

// 折线：省同比、市同比（右Y轴 %）
const lineSource = [
  {
    name: '省同比增长',
    color: '#47e1ff',
    data: [0, -12, 3.4, -8, -22, 26]
  },
  {
    name: '市同比增长',
    color: '#ffcc21',
    data: [-10, -28, -6, 13, -16, 29]
  }
]

// 参考链接 xWkXG0IATZ 标准圆柱生成函数
function createCylinderSeries(list: any[]) {
  const series: any[] = []
  list.forEach(item => {
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
      data: xAxisData.map(() => 0)
    })
  })
  return series
}

const chartOption = computed(() => {
  const cylinderSeries = createCylinderSeries(barSource)
  // 追加折线
  lineSource.forEach(line => {
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
        params.forEach(p => {
          if (!p.seriesName.includes('top') && !p.seriesName.includes('bottom')) {
            const unit = p.seriesName.includes('货运') ? '万吨' : '%'
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
      data: [...barSource.map(i => i.name), ...lineSource.map(i => i.name)]
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
      data: xAxisData,
      axisLine: { lineStyle: { color: '#405888' } },
      axisLabel: { color: '#fff', fontSize: 15 },
      splitLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: [
      // 左侧 货运万吨
      {
        name: '单位：万吨',
        nameTextStyle: { color: '#fff', fontSize: 16 },
        type: 'value',
        min: 0,
        max: 1500,
        interval: 300,
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
        min: -30,
        max: 30,
        interval: 10,
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