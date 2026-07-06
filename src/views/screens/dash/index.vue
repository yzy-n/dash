<template>
  <div class="shell" :class="{ 'shell--dev': isDev }">
    <div class="viewport" :style="{ width: `${designWidth}px`, height: `${designHeight}px` }">
      <div
        class="screen"
        :style="{
          width: `${designWidth}px`,
          height: `${designHeight}px`,
          backgroundImage: `linear-gradient(rgba(4, 14, 42, 0.72), rgba(2, 9, 28, 0.78)), url(${bgUrl})`
        }"
      >
        <header class="header">
          <div class="header-side header-side-right">
            <span class="header-chip">{{ timeText }}</span>
          </div>
          <div class="brand">城 市 管 理</div>
          <div class="header-side"></div>
        </header>

        <section class="body">
          <DashLeft />
          <DashCenter />
          <DashRight />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import bgUrl from '@/assets/img/bg.jpg'
import DashCenter from './parts/DashCenter.vue'
import DashLeft from './parts/DashLeft.vue'
import DashRight from './parts/DashRight.vue'

const designWidth = 11520
const designHeight = 2160

const isDev = import.meta.env.DEV

const now = ref(new Date())

let timer: number | undefined

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})

const timeText = computed(() => {
  const d = now.value
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}:${pad(d.getSeconds())}`
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
  background: #020a1e;
}

.shell--dev {
  display: block;
  overflow: auto;
  padding: 24px;
  box-sizing: border-box;
}

.shell--dev .viewport {
  margin: 0 auto;
}

.viewport {
  display: block;
  overflow: hidden;
}

.screen {
  box-sizing: border-box;
  padding: 46px 88px 48px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #eaf4ff;
  position: relative;
}

.screen::before {
  content: '';
  position: absolute;
  inset: 22px;
  border: 1px solid rgba(73, 170, 255, 0.12);
  box-shadow: inset 0 0 120px rgba(34, 121, 255, 0.08);
  pointer-events: none;
}

.header {
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

.header-side-right {
  justify-content: flex-end;
}

.header-chip {
  height: 44px;
  padding: 0 20px;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(78, 184, 255, 0.3);
  background: rgba(5, 26, 66, 0.55);
  box-shadow: inset 0 0 20px rgba(36, 152, 255, 0.18);
  font-size: 18px;
  color: rgba(209, 234, 255, 0.88);
}

.brand {
  justify-self: center;
  padding: 0 100px;
  height: 66px;
  display: inline-flex;
  align-items: center;
  font-size: 38px;
  letter-spacing: 20px;
  font-weight: 800;
  color: #eef8ff;
  text-shadow: 0 0 20px rgba(57, 170, 255, 0.55);
  border-top: 2px solid rgba(83, 188, 255, 0.4);
  border-bottom: 2px solid rgba(83, 188, 255, 0.25);
}

.body {
  height: calc(100% - 146px);
  display: grid;
  grid-template-columns: 3600px 4000px 3600px;
  gap: 72px;
  padding-top: 34px;
}
</style>
