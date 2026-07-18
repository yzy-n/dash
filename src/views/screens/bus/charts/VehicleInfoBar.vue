<template>
  <EChart :option="chartOption" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import * as echarts from 'echarts'

// X轴车辆类型
const xAxisData = ['拖拉机', '挂车', '摩托车', '汽车']

// 柱状数据源（私人数量、总数，左Y轴：辆）
const barSource = [
  {
    name: '私人数',
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#90f0e8' },
      { offset: 1, color: '#22b8b0' }
    ]),
    data: [26916, 12000, 102000, 990000]
  },
  {
    name: '总数',
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#b8ff78' },
      { offset: 1, color: '#48c820' }
    ]),
    data: [26916, 38000, 118000, 1090000]
  }
]

// 生成立体圆柱series（bar主体 + pictorialBar上下椭圆顶盖底盖）
const buildCylinderSeries = () => {
  const seriesArr: any[] = []
  barSource.forEach(item => {
    // 圆柱主体
    seriesArr.push({
      name: item.name,
      type: 'bar',
      barWidth: 26,
      barGap: '12%',
      itemStyle: {
        color: item.gradient,
        shadowBlur: 10,
        shadowColor: item.gradient.colorStops[1].color
      },
      data: item.data
    })
    // 顶部椭圆顶盖
    seriesArr.push({
      name: item.name + '顶盖',
      type: 'pictorialBar',
      symbol: 'ellipse',
      symbolSize: [30, 11],
      symbolOffset: [0, -5],
      silent: true,
      z: 99,
      itemStyle: { color: 'rgba(255,255,255,0.35)' },
      data: item.data
    })
    // 底部椭圆底座
    seriesArr.push({
      name: item.name + '底盖',
      type: 'pictorialBar',
      symbol: 'ellipse',
      symbolSize: [30, 11],
      symbolOffset: [0, 5],
      silent: true,
      z: 99,
      itemStyle: { color: 'rgba(255,255,255,0.15)' },
      data: xAxisData.map(() => 0)
    })
  })
  return seriesArr
}

const chartOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.75)',
      textStyle: { color: '#fff', fontSize: 14 },
      formatter: (params: any[]) => {
        let str = params[0].axisValue + '<br/>'
        params.forEach(p => {
          if (!p.seriesName.includes('顶盖') && !p.seriesName.includes('底盖')) {
            str += `${p.seriesName}: ${p.value} 辆<br/>`
          }
        })
        return str
      }
    },
    legend: {
      top: 10,
      right: '8%',
      textStyle: { color: '#ffffff', fontSize: 14 },
      data: barSource.map(item => item.name)
    },
    grid: {
      left: '8%',
      right: '6%',
      bottom: '12%',
      top: '18%',
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
    yAxis: {
      name: '单位：辆',
      nameTextStyle: { color: '#fff', fontSize: 16 },
      type: 'value',
      max: 1200000,
      interval: 200000,
      axisLine: { lineStyle: { color: '#405888' } },
      axisLabel: { color: '#fff', fontSize: 15 },
      splitLine: { lineStyle: { color: 'rgba(82, 110, 165, 0.3)' } },
      axisTick: { show: false }
    },
    series: buildCylinderSeries()
  }
})
</script>