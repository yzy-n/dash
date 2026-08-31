<script setup lang="ts">
import { computed } from 'vue'
import * as echarts from 'echarts'
import EChart from '@/components/echarts/EChart.vue'

interface AreaRatioItem {
  name: string
  area: number
  ratio: number
}

const props = defineProps<{
  data?: AreaRatioItem[]
}>()

// 参考截图模拟数据：面积单位万平方米，同比单位 %
const defaultData: AreaRatioItem[] = [
  { name: '海城区', area: 1.6, ratio: -32.5 },
  { name: '合浦县', area: 1.2, ratio: -18.4 },
  { name: '银海区', area: 2.3, ratio: 5.6 },
  { name: '铁山港区', area: 0.8, ratio: -25.2 },
  { name: '防城区', area: 2.1, ratio: 12.8 },
  { name: '上思县', area: 3.5, ratio: 8.4 },
  { name: '东兴市', area: 1.9, ratio: -5.7 }
]

const chartData = computed(() => props.data ?? defaultData)

const option = computed(() => {
  const xAxisData = chartData.value.map((item) => item.name)
  const areaData = chartData.value.map((item) => item.area)
  const ratioData = chartData.value.map((item) => item.ratio)

  const opt = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,24,53,0.75)',
      borderColor: '#26c9dd',
      textStyle: { color: '#ffffff' },
      formatter: (params: any) => {
        let result = params[0].axisValue
        params.forEach((p: any) => {
          if (p.seriesType === 'bar') {
            result += `<br/>面积：${p.value}万平方米`
          }
          if (p.seriesType === 'line') {
            result += `<br/>同比：${p.value}%`
          }
        })
        return result
      }
    },
    grid: {
      left: '8%',
      right: '8%',
      bottom: '18%',
      top: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        color: '#fff',
        fontSize: 22,
        rotate: 35
      },
      axisLine: {
        lineStyle: { color: 'rgba(120, 200, 255, 0.4)' }
      },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: '单位：万平方米',
        nameTextStyle: { color: '#82d8e8', fontSize: 16 },
        splitLine: {
          lineStyle: { color: 'rgba(120, 200, 255, 0.2)' }
        },
        min: 0,
        max: 10,
        axisLabel: { color: '#82d8e8', fontSize: 20 },
        axisLine: { show: false }
      },
      {
        type: 'value',
        name: '单位：%',
        nameTextStyle: { color: '#82d8e8', fontSize: 16 },
        splitLine: { show: false },
        min: -100,
        max: 400,
        axisLabel: { color: '#82d8e8', fontSize: 20 },
        axisLine: { show: false }
      }
    ],
    series: [
      {
        name: '面积',
        type: 'bar',
        barWidth: '32%',
        data: areaData,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#26e2dd' },
              { offset: 1, color: '#086c94' }
            ]
          }
        }
      },
      {
        name: '同比',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: {
          color: '#ff6677',
          width: 3
        },
        itemStyle: {
          color: '#ff6677'
        },
        data: ratioData
      }
    ]
  }

  return JSON.parse(JSON.stringify(opt))
})
</script>

<template>
  <EChart :option="option" height="360px" />
</template>
