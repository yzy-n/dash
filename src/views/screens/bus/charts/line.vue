<template>
  <EChart :option="chartOption" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

const props = withDefaults(
  defineProps<{
    xData?: string[]
    taxiNumData?: number[]
    passengerData?: number[]
  }>(),
  {
    xData: () => [],
    taxiNumData: () => [],
    passengerData: () => []
  }
)

const chartOption = computed(() => {
  const hasData = props.xData.length && (props.taxiNumData.length || props.passengerData.length)
  const legendData = [
    ...(props.taxiNumData.length ? ['出租车数量'] : []),
    ...(props.passengerData.length ? ['客运量'] : [])
  ]

  return {
    backgroundColor: 'transparent',
    graphic: hasData
      ? undefined
      : {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: '暂无数据',
            fill: 'rgba(214, 238, 255, 0.72)',
            fontSize: 18,
            fontWeight: 600
          }
        },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.75)',
      textStyle: { color: '#fff' },
      formatter: (params: any[]) => {
        let str = params[0].axisValue + '<br/>'
        params.forEach((item) => {
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
      data: legendData
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
      data: props.xData,
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
        position: 'right',
        axisLine: { lineStyle: { color: '#405888' } },
        axisLabel: { color: '#fff', fontSize: 15 },
        splitLine: { show: false },
        axisTick: { show: false }
      }
    ],
    series: [
      ...(props.taxiNumData.length
        ? [
            {
              name: '出租车数量',
              type: 'line',
              yAxisIndex: 0,
              data: props.taxiNumData,
              lineStyle: {
                color: '#46b8f0',
                width: 2
              },
              itemStyle: { color: '#46b8f0' },
              symbol: 'rect',
              symbolSize: 12,
              smooth: true
            }
          ]
        : []),
      ...(props.passengerData.length
        ? [
            {
              name: '客运量',
              type: 'line',
              yAxisIndex: 1,
              data: props.passengerData,
              lineStyle: {
                color: '#ffbc40',
                width: 2
              },
              itemStyle: { color: '#ffbc40' },
              symbol: 'rect',
              symbolSize: 12,
              smooth: true
            }
          ]
        : [])
    ]
  }
})
</script>
