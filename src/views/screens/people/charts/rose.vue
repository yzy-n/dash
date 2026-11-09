<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import type { EChartsOption } from 'echarts'

type Row = { name: string; value: number }

const props = defineProps<{
  data?: Row[]
}>()

// 默认模拟数据，和截图数值对应
const defaultRows: Row[] = []

const rows = computed(() => (props.data && props.data.length ? props.data : defaultRows))

const option = computed<EChartsOption>(() => {
  const config = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.92)', fontSize: 40 },
      formatter: '{b}<br/>数值：{c}'
    },
    legend: {
      right: 8,
      top: 'center',
      orient: 'vertical',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 40 }
    },
    // 删除无用的 polar, angleAxis, radiusAxis 配置

    series: [
      {
        type: 'pie',
        roseType: 'area',
        // 调整中心位置，稍微偏左给右侧图例和文字留空间
        center: ['40%', '50%'],
        // 缩小半径（原 88% 太大，文字没地方放，这里缩到 65%）
        radius: ['12%', '65%'],
        label: {
          show: true,
          position: 'outside',
          // 移除 alignTo: 'edge'，让它自然跟在引线后面
          color: '#fce647',
          fontSize: 28
        },
        labelLine: {
          show: true,
          // 设置适中的固定引线长度
          length: 15,
          length2: 20,
          lineStyle: {
            color: '#fce647',
            width: 1
          }
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: '#0b2442'
        },
        data: rows.value
      }
    ]
  }

  // 深度克隆，防止部分 Vue 环境下产生的深层响应式 Proxy 导致 ECharts 栈溢出
  return JSON.parse(JSON.stringify(config)) as EChartsOption
})
</script>

<template>
  <EChart :option="option" />
</template>
