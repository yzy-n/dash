<template>
  <EChart :option="chartOption" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

// 数据源，严格对照截图每个月份数值
const xData = ['2022-09', '2022-10', '2022-11', '2022-12', '2023-01', '2023-02']
const sourceList = [
  {
    name: '出租车数量',
    color: '#46b8f0',
    yAxisIndex: 0, // 左侧Y轴：辆
    data: [9120, 9117, 9119, 9118, 9112, 9110]
  },
  {
    name: '客运量',
    color: '#ffbc40',
    yAxisIndex: 1, // 右侧Y轴：万人次
    data: [1650, 1002.4, 1120, 920, 1200, 2000]
  }
]

const chartOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.75)',
      textStyle: { color: '#fff' },
      formatter: (params: any[]) => {
        let str = params[0].axisValue + '<br/>'
        params.forEach(item => {
          const unit = item.seriesName === '出租车数量' ? '辆' : '万人次'
          str += `${item.seriesName}: ${item.value}${unit}<br/>`
        })
        return str
      }
    },
    legend: {
      top: 10,
      right: '8%',
      textStyle: { color: '#fff', fontSize: 14 },
      data: sourceList.map(item => item.name)
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
      data: xData,
      axisLine: { lineStyle: { color: '#405888' } },
      axisLabel: { color: '#fff', fontSize: 15 },
      splitLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: [
      // 左轴 出租车数量（单位：辆）
      {
        name: '单位：辆',
        nameTextStyle: { color: '#fff', fontSize: 16 },
        type: 'value',
        min: 9000,
        max: 9200,
        interval: 50,
        axisLine: { lineStyle: { color: '#405888' } },
        axisLabel: { color: '#fff', fontSize: 15 },
        splitLine: { lineStyle: { color: 'rgba(82, 110, 165, 0.3)' } },
        axisTick: { show: false }
      },
      // 右轴 客运量（单位：万人次）
      {
        name: '单位：万人次',
        nameTextStyle: { color: '#fff', fontSize: 16 },
        type: 'value',
        min: 0,
        max: 2000,
        interval: 500,
        position: 'right',
        axisLine: { lineStyle: { color: '#405888' } },
        axisLabel: { color: '#fff', fontSize: 15 },
        splitLine: { show: false },
        axisTick: { show: false }
      }
    ],
    series: sourceList.map(item => ({
      name: item.name,
      type: 'line',
      yAxisIndex: item.yAxisIndex,
      data: item.data,
      lineStyle: {
        color: item.color,
        width: 2
      },
      itemStyle: { color: item.color },
      symbol: 'rect', // 方块标记，和原图一致
      symbolSize: 12,
      smooth: true // 平滑曲线
    }))
  }
})
</script>