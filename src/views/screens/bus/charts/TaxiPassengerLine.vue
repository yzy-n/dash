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
const defaultProvinceNumData = [82, 78.2, 16, 60, 74, 80]
const defaultProvinceGrowthData = [-22, -35.2, -52, -48, -32, -18]
const defaultCityNumData = [132, 81, 14, 61, 104, 122]
const defaultCityGrowthData = [-36, -60, -72, -68, -45, -34]

const xAxisData = computed(() => (props.xData?.length ? props.xData : defaultXAxisData))
const barSource = computed(() => [
  {
    name: '省均客运量',
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#90e8ff' },
      { offset: 1, color: '#28b8d8' }
    ]),
    data: props.provinceNumData?.length ? props.provinceNumData : defaultProvinceNumData
  },
  {
    name: '市客运量',
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#d8b8ff' },
      { offset: 1, color: '#9258e8' }
    ]),
    data: props.cityNumData?.length ? props.cityNumData : defaultCityNumData
  }
])

const lineSource = computed(() => [
  {
    name: '省同比增长',
    color: '#46e878',
    data: props.provinceGrowthData?.length ? props.provinceGrowthData : defaultProvinceGrowthData
  },
  {
    name: '市同比增长',
    color: '#ffcc33',
    data: props.cityGrowthData?.length ? props.cityGrowthData : defaultCityGrowthData
  }
])

// 组装series：柱状 + 两条折线
const buildSeries = () => {
  const seriesArr: any[] = []
  // 并列柱状
  barSource.value.forEach(item => {
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
  lineSource.value.forEach(item => {
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
  const numValues = [...barSource.value[0].data, ...barSource.value[1].data]
  const growthValues = [...lineSource.value[0].data, ...lineSource.value[1].data]
  const maxNum = numValues.length ? Math.max(...numValues) : 0
  const maxAbsGrowth = growthValues.length ? Math.max(...growthValues.map((item) => Math.abs(item))) : 0
  const leftAxisMax = maxNum <= 0 ? 100 : Math.ceil(maxNum * 1.2 / 10) * 10
  const rightAxisMax = maxAbsGrowth <= 10 ? 10 : Math.ceil(maxAbsGrowth / 10) * 10

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.75)',
      textStyle: { color: '#fff', fontSize: 14 },
      formatter: (params: any[]) => {
        let str = params[0].axisValue + '<br/>'
        params.forEach(p => {
          const unit = p.seriesName.includes('客运') ? props.numUnit || '万人' : '%'
          str += `${p.seriesName}: ${p.value}${unit}<br/>`
        })
        return str
      }
    },
    legend: {
      top: 10,
      left: 'center',
      textStyle: { color: '#ffffff', fontSize: 14 },
      data: [...barSource.value.map(i => i.name), ...lineSource.value.map(i => i.name)]
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
      data: xAxisData.value,
      axisLine: { lineStyle: { color: '#405888' } },
      axisLabel: { color: '#fff', fontSize: 15 },
      splitLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: [
      // 左轴：客运量 万人
      {
        name: `单位：${props.numUnit || '万人'}`,
        nameTextStyle: { color: '#fff', fontSize: 16 },
        type: 'value',
        min: 0,
        max: leftAxisMax,
        interval: leftAxisMax / 5,
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
    series: buildSeries()
  }
})
</script>
