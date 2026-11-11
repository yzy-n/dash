<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import titleBg6 from '@/assets/img/titleBg6.png'
import titleBg8 from '@/assets/img/titleBg8.png'
import titleBg10 from '@/assets/img/titleBg10.png'

const route = useRoute()

/** 仅这五个页面参与标题背景切换 */
const TITLE_BG_PAGES = new Set([
  'big-screen', // dash
  'bus-screen',
  'econ-screen',
  'service-screen',
  'people-screen'
])

let observer: MutationObserver | null = null
let scheduled = false

const pickTitleBg = (length: number) => {
  if (length <= 6) return titleBg6
  if (length <= 8) return titleBg8
  return titleBg10
}

const pickTitleSlice = (length: number) => {
  if (length <= 6) return 520
  if (length <= 8) return 640
  return 820
}

/**
 * 卡片标题长度不同，统一背景图会导致长标题压到右侧斜切装饰上。
 * 只处理 bus / dash / econ / service / people 五个页面；
 * 标题不超过 4 个字时继续使用原来的 leftBg。
 */
const applyCardBackgrounds = () => {
  const enabledPage = TITLE_BG_PAGES.has(String(route.name))

  document.querySelectorAll<HTMLElement>('.panel').forEach((panel) => {
    const title = panel.querySelector<HTMLElement>('.panel-title')
    if (!title) return

    const original = panel.dataset.titleBgOriginal || getComputedStyle(panel).backgroundImage
    if (!original.includes('leftBg')) return
    if (!panel.dataset.titleBgOriginal) panel.dataset.titleBgOriginal = original

    const length = Array.from((title.textContent || '').replace(/\s+/g, '')).length
    const useCustom = enabledPage && length > 4

    if (!useCustom) {
      panel.classList.remove('title-bg-custom')
      panel.style.removeProperty('background-image')
      panel.style.removeProperty('--title-bg')
      panel.style.removeProperty('--title-slice')
      panel.dataset.titleBgApplied = 'original'
      return
    }

    const image = pickTitleBg(length)
    const slice = pickTitleSlice(length)
    panel.classList.add('title-bg-custom')
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
