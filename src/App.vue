<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

import titleBg6 from '@/assets/img/titleBg6.png'
import titleBg8 from '@/assets/img/titleBg8.png'
import titleBg10 from '@/assets/img/titleBg10.png'

let observer: MutationObserver | null = null
let scheduled = false

const pickTitleBg = (length: number) => {
  if (length <= 6) return titleBg6
  if (length <= 8) return titleBg8
  return titleBg10
}

/**
 * 卡片标题长度不同，统一背景图会导致长标题压到右侧斜切装饰上。
 * 根据 .panel-title 的字数切换三套标题区长度不同的底图。
 */
const applyCardBackgrounds = () => {
  document.querySelectorAll<HTMLElement>('.panel').forEach((panel) => {
    const title = panel.querySelector<HTMLElement>('.panel-title')
    if (!title) return

    const original = panel.dataset.titleBgOriginal || getComputedStyle(panel).backgroundImage
    if (!original.includes('leftBg') && !original.includes('panelBody')) return
    if (!panel.dataset.titleBgOriginal) panel.dataset.titleBgOriginal = original

    const length = Array.from((title.textContent || '').replace(/\s+/g, '')).length
    const image = pickTitleBg(length)
    const slice = length <= 6 ? 520 : length <= 8 ? 640 : 820

    panel.style.setProperty('--title-bg', `url("${image}")`)
    panel.style.setProperty('--title-slice', String(slice))
    if (panel.dataset.titleBgApplied === image) return

    panel.style.backgroundImage = panel.dataset.titleBgOriginal.replace(
      /url\([^)]*leftBg[^)]*\)/g,
      `url("${image}")`
    )
    panel.dataset.titleBgApplied = image
  })
}

const scheduleApply = () => {
  if (scheduled) return
  scheduled = true
  requestAnimationFrame(() => {
    scheduled = false
    applyCardBackgrounds()
  })
}

onMounted(() => {
  applyCardBackgrounds()
  observer = new MutationObserver(scheduleApply)
  observer.observe(document.body, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>
