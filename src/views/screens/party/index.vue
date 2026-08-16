<template>
  <div class="shell" :class="{ 'shell--scrollable': shouldScroll }">
    <div class="viewport" :style="{ width: `${designWidth}px`, height: `${designHeight}px` }">
      <div
        class="screen"
        :style="{
          width: `${designWidth}px`,
          height: `${designHeight}px`,
          backgroundImage: `url(${partyUrl})`
        }"
      >
        <header class="header">
          <div class="header-side header-side-left">
            <span class="header-chip">{{ timeText }}</span>
            <span class="header-chip2">{{ weekText }}</span>
          </div>
          <div class="header-side header-side-right">
            <span class="header-chip3">北京时间</span>
            <span class="header-chip4">{{ hmsText }}</span>
          </div>
        </header>
        <section class="body">
          <div class="body-left">
            <PartyLeft :data="screenData.left" />
          </div>
          <div class="body-center">
            <PartyCenter :data="screenData.center" />
          </div>
          <div class="body-right">
            <PartyRight :data="screenData.right" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

import partyUrl from '@/assets/img/party.jpg'
import { partyScreenMock } from './data'
import PartyCenter from './parts/PartyCenter.vue'
import PartyLeft from './parts/PartyLeft.vue'
import PartyRight from './parts/PartyRight.vue'

const designWidth = 11520
const designHeight = 2160

const isFile = typeof window !== 'undefined' && window.location.protocol === 'file:'
const shouldScroll = ref(isFile)

const screenData = ref(partyScreenMock)
const now = ref(new Date())

let timer: number | undefined

const syncShellMode = () => {
  if (typeof window === 'undefined') return
  shouldScroll.value =
    isFile || window.innerWidth < designWidth || window.innerHeight < designHeight
}

onMounted(() => {
  syncShellMode()
  window.addEventListener('resize', syncShellMode)
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncShellMode)
  if (timer) window.clearInterval(timer)
})

const timeText = computed(() => {
  const d = now.value
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
})

const weekText = computed(() => {
  const list = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return list[now.value.getDay()]
})

const hmsText = computed(() => {
  const d = now.value
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
})
</script>

<style scoped>
.shell {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1d0505;
}

.shell--scrollable {
  display: block;
  overflow: auto;
  padding: 24px;
  box-sizing: border-box;
}

.shell--scrollable .viewport {
  margin: 0 auto;
}

.viewport {
  overflow: hidden;
}

.screen {
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.header {
  width: 100%;
  height: 146px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
}

.header-side {
  display: flex;
  gap: 16px;
}

.header-side-left {
  justify-content: flex-start;
  margin-top: 0px;
  margin-left: 100px;
}

.header-side-right {
  justify-content: flex-end;
  margin-top: 0px;
  margin-left: 10300px;
}

.header-chip {
  width: 140px;
  height: 44px;
  padding: 0 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border: 1px solid rgba(255, 200, 130, 0.55);
  background: rgba(120, 10, 10, 0.28);
  box-shadow:
    inset 0 0 18px rgba(255, 200, 130, 0.12),
    0 0 16px rgba(255, 120, 0, 0.06);
  color: rgba(255, 238, 206, 0.9);
}

.header-chip2 {
  width: 140px;
  justify-content: center;
  margin-left: 92px;
  height: 44px;
  padding: 0 40px;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(255, 200, 130, 0.55);
  background: rgba(120, 10, 10, 0.28);
  box-shadow:
    inset 0 0 18px rgba(255, 200, 130, 0.12),
    0 0 16px rgba(255, 120, 0, 0.06);
  font-size: 18px;
  color: rgba(255, 238, 206, 0.9);
}
.header-chip3 {
  width: 140px;
  justify-content: center;
  margin-right: -10px;
  height: 44px;
  padding: 0 40px;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(255, 200, 130, 0.55);
  background: rgba(120, 10, 10, 0.28);
  box-shadow:
    inset 0 0 18px rgba(255, 200, 130, 0.12),
    0 0 16px rgba(255, 120, 0, 0.06);
  font-size: 18px;
  color: rgba(255, 238, 206, 0.9);
}
.header-chip4 {
  width: 140px;
  justify-content: center;
  margin-left: 55px;
  height: 44px;
  padding: 0 40px;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(255, 200, 130, 0.55);
  background: rgba(120, 10, 10, 0.28);
  box-shadow:
    inset 0 0 18px rgba(255, 200, 130, 0.12),
    0 0 16px rgba(255, 120, 0, 0.06);
  font-size: 18px;
  color: rgba(255, 238, 206, 0.9);
}
.body {
  position: absolute;
  inset: 0;
}

.body-left,
.body-center,
.body-right {
  position: absolute;
  top: 0;
}

.body-left {
  left: 0;
  width: 3840px;
  height: 2160px;
}

.body-center {
  left: 3840px;
  width: 3840px;
  height: 2160px;
}

.body-right {
  right: 0;
  width: 3840px;
  height: 2160px;
}
</style>
