<template>
  <div class="pie3d">
    <EChart :key="chartKey" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

const props = defineProps<{
  items: Array<{ name: string; value: number }>
}>()

const chartKey = ref(0)

watch(
  () => JSON.stringify(props.items),
  async () => {
    await nextTick()
    chartKey.value++
  }
)

// 颜色池：青蓝 / 黄橙 / 青绿 / 紫
const COLOR_PAIRS = [
  {
    top: {
      type: 'linear', x: 0, y: 0, x2: 1, y2: 1,
      colorStops: [
        { offset: 0, color: 'rgba(51, 213, 255, 0.95)' },
        { offset: 1, color: 'rgba(0, 160, 255, 0.85)' }
      ]
    },
    bottom: 'rgba(0, 120, 190, 0.75)'
  },
  {
    top: {
      type: 'linear', x: 0, y: 0, x2: 1, y2: 1,
      colorStops: [
        { offset: 0, color: 'rgba(255, 226, 74, 0.95)' },
        { offset: 1, color: 'rgba(255, 184, 74, 0.85)' }
      ]
    },
    bottom: 'rgba(180, 130, 40, 0.75)'
  },
  {
    top: {
      type: 'linear', x: 0, y: 0, x2: 1, y2: 1,
      colorStops: [
        { offset: 0, color: 'rgba(64, 243, 184, 0.95)' },
        { offset: 1, color: 'rgba(20, 180, 140, 0.85)' }
      ]
    },
    bottom: 'rgba(20, 130, 100, 0.75)'
  },
  {
    top: {
      type: 'linear', x: 0, y: 0, x2: 1, y2: 1,
      colorStops: [
        { offset: 0, color: 'rgba(180, 120, 255, 0.95)' },
        { offset: 1, color: 'rgba(120, 80, 220, 0.85)' }
      ]
    },
    bottom: 'rgba(90, 60, 170, 0.75)'
  }
]

const option = computed(() => {
  const items = props.items ?? []

  const top = items.map((item, idx) => {
    const pair = COLOR_PAIRS[idx % COLOR_PAIRS.length]
    return { name: item.name, value: item.value, itemStyle: { color: pair.top } }
  })

  const bottom = items.map((item, idx) => {
    const pair = COLOR_PAIRS[idx % COLOR_PAIRS.length]
    return { name: item.name, value: item.value, itemStyle: { color: pair.bottom } }
  })

  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'pie',
        radius: ['44%', '74%'],
        center: ['50%', '56%'],
        silent: true,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: { borderWidth: 0 },
        data: bottom
      },
      {
        type: 'pie',
        radius: ['44%', '74%'],
        center: ['50%', '50%'],
        silent: true,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: {
          borderWidth: 2,
          borderColor: 'rgba(2, 10, 30, 0.92)',
          shadowBlur: 18,
          shadowColor: 'rgba(54, 232, 255, 0.12)'
        },
        data: top
      }
    ]
  }
})
</script>

<style scoped>
.pie3d {
  width: 320px;
  height: 320px;
  transform: perspective(900px) rotateX(68deg);
  transform-origin: center;
  filter: drop-shadow(0 0 22px rgba(54, 232, 255, 0.14));
}
</style>