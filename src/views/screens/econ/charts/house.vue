<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

/** 与 econ/index.vue 中 fetchHouseData 的映射保持一致 */
interface HouseDataItem {
  /** 地区名（来自 departmentName） */
  area: string
  /** 内部水平 / 面积值（来自 internalLevel） */
  internalLevel: number
  /** 同比增速（来自 yoyGrowth） */
  yoyGrowth: number
  /** 数据类型：'1'=新房，'2'=二手房 */
  type?: string
}

const props = defineProps<{
  data?: HouseDataItem[]
  /** 当前激活的 tab（新房/二手房），用于将来按 tab 差异化展示 */
  tabKey?: string
}>()

// 兜底数据（接口无数据时展示，字段与后端一致）
const defaultData: HouseDataItem[] = [
  { area: '海城市', internalLevel: 14.6, yoyGrowth: 11.5, type: '1' },
  { area: '台安县', internalLevel: 4.5, yoyGrowth: -12.8, type: '1' },
  { area: '岫岩县', internalLevel: 4.4, yoyGrowth: 9.9, type: '1' },
  { area: '铁东区', internalLevel: 2.7, yoyGrowth: 5.2, type: '1' }
]

const chartData = computed<HouseDataItem[]>(() => {
  const list = props.data && props.data.length ? props.data : defaultData
  return list.map((it) => ({
    area: String(it?.area ?? ''),
    internalLevel: Number(it?.internalLevel) || 0,
    yoyGrowth: Number(it?.yoyGrowth) || 0,
    type: it?.type
  }))
})

const option = computed(() => {
  const xAxisData = chartData.value.map((item) => item.area)
  const levelData = chartData.value.map((item) => item.internalLevel)
  const growthData = chartData.value.map((item) => item.yoyGrowth)

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
            result += `<br/>面积：${p.value} 万平方米`
          }
          if (p.seriesType === 'line') {
            result += `<br/>同比：${p.value} %`
          }
        })
        return result
      }
    },
    grid: {
      left: '8%',
      right: '8%',
      bottom: '10%',
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
        nameTextStyle: { color: '#82d8e8', fontSize: 22 },
        splitLine: {
          lineStyle: { color: 'rgba(120, 200, 255, 0.2)' }
        },
        axisLabel: { color: '#82d8e8', fontSize: 30 },
        axisLine: { show: false }
      },
      {
        type: 'value',
        name: '单位：%',
        nameTextStyle: { color: '#82d8e8', fontSize: 16 },
        splitLine: { show: false },
        axisLabel: { color: '#82d8e8', fontSize: 20 },
        axisLine: { show: false }
      }
    ],
    series: [
      {
        name: '面积',
        type: 'bar',
        barWidth: '32%',
        data: levelData,
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
        data: growthData
      }
    ]
  }

  return JSON.parse(JSON.stringify(opt))
})
</script>

<template>
  <EChart :option="option" height="360px" />
</template>