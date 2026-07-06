<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import * as echarts from 'echarts'

type Props = {
  option: unknown
  autoresize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoresize: true
})

const rootEl = ref<HTMLDivElement | null>(null)
let chart: any
let ro: ResizeObserver | undefined

const optionRef = computed(() => props.option as any)

const mount = () => {
  if (!rootEl.value) return
  chart = echarts.init(rootEl.value)
  chart.setOption(optionRef.value, { notMerge: true, lazyUpdate: true })

  if (props.autoresize) {
    ro = new ResizeObserver(() => {
      chart?.resize()
    })
    ro.observe(rootEl.value)
  }
}

const unmount = () => {
  ro?.disconnect()
  ro = undefined
  chart?.dispose()
  chart = undefined
}

onMounted(mount)
onBeforeUnmount(unmount)

watch(
  () => props.option,
  () => {
    chart?.setOption(optionRef.value, { notMerge: true, lazyUpdate: true })
  },
  { deep: true }
)
</script>

<template>
  <div ref="rootEl" class="echart" />
</template>

<style scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>
