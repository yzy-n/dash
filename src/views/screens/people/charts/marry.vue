<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import type { EChartsOption } from 'echarts'

// 柱状数据类型：初婚、再婚、复婚、准许登记结婚；折线：离婚率
type MarriageRow = {
  year: string
  firstMarry: number // 初婚 对
  remarry: number // 再婚 对
  remarryRestore: number // 复婚 对
  permitMarry: number // 准许登记结婚 对
  divorceRate: number // 离婚率 ‰
}

const props = defineProps<{
  data?: MarriageRow[]
}>()

// 和截图匹配的模拟数据
const defaultRows: MarriageRow[] = [
  {
    year: '2017',
    firstMarry: 14800,
    remarry: 4709,
    remarryRestore: 2189,
    permitMarry: 11660,
    divorceRate: 3.4
  },
  {
    year: '2018',
    firstMarry: 18200,
    remarry: 3400,
    remarryRestore: 2000,
    permitMarry: 11400,
    divorceRate: 2.8
  },
  {
    year: '2019',
    firstMarry: 10800,
    remarry: 5600,
    remarryRestore: 2300,
    permitMarry: 9800,
    divorceRate: 2.7
  },
  {
    year: '2020',
    firstMarry: 11800,
    remarry: 4000,
    remarryRestore: 2200,
    permitMarry: 10200,
    divorceRate: 5.6
  },
  {
    year: '2021',
    firstMarry: 11400,
    remarry: 3800,
    remarryRestore: 1900,
    permitMarry: 5800,
    divorceRate: 3.6
  }
]

const rows = computed(() => (props.data && props.data.length ? props.data : defaultRows))

const option = computed<EChartsOption>(() => {
  const xAxisData = rows.value.map((item) => item.year)
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.92)' }
    },
    legend: {
      data: ['初婚', '再婚', '复婚', '准许登记结婚', '离婚率'],
      top: 4,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 12 }
    },
    grid: {
      left: '6%',
      right: '8%',
      top: '14%',
      bottom: '12%'
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: { lineStyle: { color: 'rgba(24, 110, 155, 0.45)' } },
      axisLabel: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 12 },
      splitLine: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: '单位：对',
        nameTextStyle: { color: 'rgba(214, 238, 255, 0.7)' },
        max: 21000,
        axisLine: { lineStyle: { color: 'rgba(24, 110, 155, 0.45)' } },
        axisLabel: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 12 },
        splitLine: { lineStyle: { color: 'rgba(24, 110, 155, 0.3)' } }
      },
      {
        type: 'value',
        name: '单位：‰',
        nameTextStyle: { color: 'rgba(214, 238, 255, 0.7)' },
        max: 6,
        position: 'right',
        axisLine: { lineStyle: { color: 'rgba(24, 110, 155, 0.45)' } },
        axisLabel: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 12 },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '初婚',
        type: 'bar',
        barWidth: '16%',
        data: rows.value.map((i) => i.firstMarry),
        itemStyle: { color: '#4096ff' }
      },
      {
        name: '再婚',
        type: 'bar',
        barWidth: '16%',
        data: rows.value.map((i) => i.remarry),
        itemStyle: { color: '#52c41a' }
      },
      {
        name: '复婚',
        type: 'bar',
        barWidth: '16%',
        data: rows.value.map((i) => i.remarryRestore),
        itemStyle: { color: '#faad14' }
      },
      {
        name: '准许登记结婚',
        type: 'bar',
        barWidth: '16%',
        data: rows.value.map((i) => i.permitMarry),
        itemStyle: { color: '#f55442' }
      },
      {
        name: '离婚率',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: rows.value.map((i) => i.divorceRate),
        itemStyle: { color: '#36cfc9' },
        lineStyle: { width: 2 }
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
