<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

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
const defaultRows: MarriageRow[] = []

const rows = computed(() => (props.data && props.data.length ? props.data : defaultRows))

const option = computed<EChartsOption>(() => {
  const xAxisData = rows.value.map((item) => item.year)
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      textStyle: { fontSize: 40, color: '#ffffff' },
      backgroundColor: 'rgba(6, 18, 48, 0.92)'
    },
    legend: {
      data: ['初婚', '再婚', '复婚', '准许登记结婚', '离婚对'],
      top: 44,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 40 }
    },
    grid: {
      left: '12%',
      right: '8%',
      top: '24%',
      bottom: '12%'
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: { lineStyle: { color: 'rgba(24, 110, 155, 0.45)' } },
      axisLabel: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 28 },
      splitLine: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: '单位：对',
        nameTextStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 28 },
        max: 21000,
        axisLine: { lineStyle: { color: 'rgba(24, 110, 155, 0.45)' } },
        axisLabel: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 28 },
        splitLine: { lineStyle: { color: 'rgba(24, 110, 155, 0.3)' } }
      },
      {
        type: 'value',
        name: '单位：%',
        nameTextStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 28 },
        max: 6,
        position: 'right',
        axisLine: { lineStyle: { color: 'rgba(24, 110, 155, 0.45)' } },
        axisLabel: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 28 },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '初婚',
        type: 'bar',
        barWidth: '20',
        data: rows.value.map((i) => i.firstMarry),
        itemStyle: { color: '#b14cff' }
      },
      {
        name: '再婚',
        type: 'bar',
        barWidth: '20',
        data: rows.value.map((i) => i.remarry),
        itemStyle: { color: '#5dffcb' }
      },
      {
        name: '复婚',
        type: 'bar',
        barWidth: '20',
        data: rows.value.map((i) => i.remarryRestore),
        itemStyle: { color: '#ffd15c' }
      },
      {
        name: '准许登记结婚',
        type: 'bar',
        barWidth: '20',
        data: rows.value.map((i) => i.permitMarry),
        itemStyle: { color: '#2f7dff' }
      },
      {
        name: '离婚率',
        type: 'line',
        yAxisIndex: 1,
        barWidth: '20',
        smooth: true,
        data: rows.value.map((i) => i.divorceRate),
        itemStyle: { color: '#ff6b8a' },
        lineStyle: { width: 3, color: '#ff6b8a' }
      }
    ]
  }
})
</script>

<template>
  <EChart :option="option" />
</template>
