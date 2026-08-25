<template>
  <div class="pie3d">
    <EChart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

const props = defineProps<{
  done: number
  todo: number
}>()

const option = computed(() => {
  const done = props.done
  const todo = props.todo

  const top = [
    {
      name: '已报装',
      value: done,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(51, 213, 255, 0.95)' },
            { offset: 1, color: 'rgba(0, 160, 255, 0.85)' }
          ]
        }
      }
    },
    {
      name: '待报装',
      value: todo,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255, 226, 74, 0.95)' },
            { offset: 1, color: 'rgba(255, 184, 74, 0.85)' }
          ]
        }
      }
    }
  ]

  const bottom = [
    { name: '已报装', value: done, itemStyle: { color: 'rgba(0, 120, 190, 0.75)' } },
    { name: '待报装', value: todo, itemStyle: { color: 'rgba(180, 130, 40, 0.75)' } }
  ]

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
