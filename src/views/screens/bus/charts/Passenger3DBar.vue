<template>
  <EChart :option="chartOption" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import * as echarts from 'echarts'

// 1. 业务数据源（和截图弹窗数据完全对应）
const xAxisList = ['2022-09', '2022-10', '2022-11', '2022-12', '2023-01', '2023-02']
const companySource = [
  {
    name: '龙腾城际',
    // 渐变配色：浅蓝科技色
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#a0d8ff' },
      { offset: 1, color: '#3678e8' }
    ]),
    data: [0, 3.5, 0, 0, 0, 5]
  },
  {
    name: '长旅集团',
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#b6e3ff' },
      { offset: 1, color: '#48b8ff' }
    ]),
    data: [0, 18, 0, 0, 0, 0]
  },
  {
    name: '交运集团',
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#fff999' },
      { offset: 1, color: '#f9dd20' }
    ]),
    data: [980, 861.9, 620, 600, 380, 790]
  },
  {
    name: '龙腾快客',
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#b0fff0' },
      { offset: 1, color: '#38d8bc' }
    ]),
    data: [10, 1.4, 8, 6, 5, 7]
  },
  {
    name: '通达巴士',
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#ffe8b3' },
      { offset: 1, color: '#ffbc40' }
    ]),
    data: [120, 213.6, 150, 130, 110, 140]
  }
]

// 2. 组装series：堆叠主体bar + 上下椭圆顶盖底盖（实现圆柱立体效果）
const buildSeries = () => {
  const seriesArr: any[] = []
  // 堆叠柱状主体
  companySource.forEach(item => {
    seriesArr.push({
      name: item.name,
      type: 'bar',
      stack: 'total',
      barWidth: 28,
      barBorderRadius: [0, 0, 0, 0],
      itemStyle: {
        color: item.gradient
      },
      data: item.data
    })
  })

  // 顶部椭圆顶盖（所有堆叠总和，模拟圆柱上圆面）
  seriesArr.push({
    name: '顶盖',
    type: 'pictorialBar',
    stack: 'total',
    symbolSize: [32, 12],
    symbolOffset: [0, -6],
    z: 99,
    itemStyle: {
      color: 'rgba(255,255,255,0.4)'
    },
    data: xAxisList.map((_, idx) => {
      // 计算当月总客流
      const total = companySource.reduce((sum, comp) => sum + comp.data[idx], 0)
      return total
    })
  })

  // 底部椭圆底盖（最底层圆柱底面）
  seriesArr.push({
    name: '底盖',
    type: 'pictorialBar',
    stack: 'total',
    symbolSize: [32, 12],
    symbolOffset: [0, 6],
    z: 99,
    itemStyle: {
      color: 'rgba(255,255,255,0.2)'
    },
    data: xAxisList.map(() => 0)
  })
  return seriesArr
}

// 3. 图表配置
const chartOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(0,0,0,0.75)',
      textStyle: { color: '#fff', fontSize: 14 },
      formatter: (params: any[]) => {
        let tipStr = params[0].axisValue + '<br/>'
        params.forEach(p => {
          if (!['顶盖', '底盖'].includes(p.seriesName)) {
            tipStr += `${p.seriesName}: ${p.value} 万人<br/>`
          }
        })
        return tipStr
      }
    },
    legend: {
      top: 12,
      left: 'center',
      textStyle: { color: '#ffffff', fontSize: 14 },
      data: companySource.map(item => item.name)
    },
    grid: {
      left: '6%',
      right: '4%',
      bottom: '12%',
      top: '18%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisList,
      axisLine: { lineStyle: { color: '#405888' } },
      axisLabel: { color: '#fff', fontSize: 15 },
      splitLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      name: '单位：万人',
      nameTextStyle: { color: '#fff', fontSize: 16 },
      type: 'value',
      max: 1500,
      interval: 300,
      axisLine: { lineStyle: { color: '#405888' } },
      axisLabel: { color: '#fff', fontSize: 15 },
      splitLine: {
        lineStyle: { color: 'rgba(82, 110, 165, 0.3)' }
      },
      axisTick: { show: false }
    },
    series: buildSeries()
  }
})
</script>