<template>
  <EChart :option="chartOption" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import * as echarts from 'echarts'

// X轴时间维度
const xAxisData = ['2022-09', '2022-10', '2022-11', '2022-12', '2023-01', '2023-02']

// 柱状图数据源（左Y轴：万人）
const barSource = [
  {
    name: '省均客运量',
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#90e8ff' },
      { offset: 1, color: '#28b8d8' }
    ]),
    data: [82, 78.2, 16, 60, 74, 80]
  },
  {
    name: '市客运量',
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#d8b8ff' },
      { offset: 1, color: '#9258e8' }
    ]),
    data: [132, 81, 14, 61, 104, 122]
  }
]

// 折线图数据源（右Y轴：百分比 %）
const lineSource = [
  {
    name: '省同比增长',
    color: '#46e878',
    data: [-22, -35.2, -52, -48, -32, -18]
  },
  {
    name: '市同比增长',
    color: '#ffcc33',
    data: [-36, -60, -72, -68, -45, -34]
  }
]

// 组装series：柱状 + 两条折线
const buildSeries = () => {
  const seriesArr: any[] = []
  // 并列柱状
  barSource.forEach(item => {
    seriesArr.push({
      name: item.name,
      type: 'bar',
      yAxisIndex: 0,
      barWidth: 22,
      itemStyle: {
        color: item.color,
        shadowBlur: 8,
        shadowColor: item.color.colorStops[1].color
      },
      data: item.data
    })
  })
  // 折线
  lineSource.forEach(item => {
    seriesArr.push({
      name: item.name,
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      symbol: 'square',
      symbolSize: 10,
      lineStyle: {
        color: item.color,
        width: 2
      },
      itemStyle: { color: item.color },
      data: item.data
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
          const unit = p.seriesName.includes('客运') ? '万人' : '%'
          str += `${p.seriesName}: ${p.value}${unit}<br/>`
        })
        return str
      }
    },
    legend: {
      top: 10,
      left: 'center',
      textStyle: { color: '#ffffff', fontSize: 14 },
      data: [...barSource.map(i => i.name), ...lineSource.map(i => i.name)]
    },
    grid: {
      left: '6%',
      right: '10%',
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
    yAxis: [
      // 左轴：客运量 万人
      {
        name: '单位：万人',
        nameTextStyle: { color: '#fff', fontSize: 16 },
        type: 'value',
        min: 0,
        max: 150,
        interval: 30,
        axisLine: { lineStyle: { color: '#405888' } },
        axisLabel: { color: '#fff', fontSize: 15 },
        splitLine: { lineStyle: { color: 'rgba(82, 110, 165, 0.3)' } },
        axisTick: { show: false }
      },
      // 右轴：同比百分比 %
      {
        name: '单位：%',
        nameTextStyle: { color: '#fff', fontSize: 16 },
        type: 'value',
        min: -70,
        max: 0,
        interval: 10,
        position: 'right',
        axisLine: { lineStyle: { color: '#405888' } },
        axisLabel: { color: '#fff', fontSize: 15 },
        splitLine: { show: false },
        axisTick: { show: false }
      }
    ],
    series: buildSeries()
  }
})
</script>