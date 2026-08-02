<template>
  <EChart :option="chartOption" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import * as echarts from 'echarts'

interface Props {
  xData?: string[]
  passengerData?: number[]
  taxiNumData?: number[]
}

const props = defineProps<Props>()

const xAxisList = computed(() => (props.xData?.length ? props.xData : []))
const passengerData = computed(() => (props.passengerData?.length ? props.passengerData : []))
const taxiNumData = computed(() => (props.taxiNumData?.length ? props.taxiNumData : []))

const companySource = computed(() => [
  {
    name: '客运量',
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#a0d8ff' },
      { offset: 1, color: '#3678e8' }
    ]),
    data: passengerData.value
  }
])

// 组装series：柱体 + 顶盖底盖
const buildSeries = () => {
  const seriesArr: any[] = []
  companySource.value.forEach((item) => {
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
    data: xAxisList.value.map((_, idx) => {
      const total = companySource.value.reduce((sum, comp) => sum + (comp.data[idx] || 0), 0)
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
    data: xAxisList.value.map(() => 0)
  })
  return seriesArr
}

const chartOption = computed(() => {
  const hasData = xAxisList.value.length && passengerData.value.length
  const maxPassenger = passengerData.value.length ? Math.max(...passengerData.value) : 0
  const yAxisMax = maxPassenger <= 0 ? 100 : Math.ceil((maxPassenger * 1.2) / 100) * 100
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
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(0,0,0,0.75)',
      textStyle: { color: '#fff', fontSize: 14 },
      formatter: (params: any[]) => {
        const dataIndex = params?.[0]?.dataIndex ?? 0
        let tipStr = `${params[0].axisValue}<br/>`
        params.forEach((p) => {
          if (!['顶盖', '底盖'].includes(p.seriesName)) {
            tipStr += `${p.seriesName}: ${p.value} 万人<br/>`
          }
        })
        const taxiNum = taxiNumData.value[dataIndex]
        if (taxiNum !== undefined) {
          tipStr += `出租车数量: ${taxiNum} 辆<br/>`
        }
        return tipStr
      }
    },
    legend: {
      top: 12,
      left: 'center',
      textStyle: { color: '#ffffff', fontSize: 14 },
      data: companySource.value.map((item) => item.name)
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
      data: xAxisList.value,
      axisLine: { lineStyle: { color: '#405888' } },
      axisLabel: { color: '#fff', fontSize: 15 },
      splitLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      name: '单位：万人',
      nameTextStyle: { color: '#fff', fontSize: 16 },
      type: 'value',
      max: yAxisMax,
      interval: yAxisMax / 5,
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
