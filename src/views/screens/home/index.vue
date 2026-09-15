<template>
  <div class="shell shell--scrollable">
    <div class="viewport" :style="{ width: `${designWidth}px`, height: `${designHeight}px` }">
      <div
        class="screen"
        :style="{
          width: `${designWidth}px`,
          height: `${designHeight}px`,
          backgroundImage: `url(${bgUrl})`
        }"
      >
        <header class="header">
          <div class="header-side header-side-left">
            <span class="header-chip">{{ timeText }}</span>
            <span class="header-chip2">{{ weekText }}</span>
          </div>
          <div class="brand">城 市 体 征</div>
          <div class="header-side header-side-right">
            <span class="header-chip3">北京时间</span>
            <span class="header-chip4">{{ hmsText }}</span>
          </div>
        </header>
        <section class="body body--home">
          <!-- 居中容器：宽度=大屏1/3，高度=大屏1/2，整体占屏幕1/6，水平垂直居中 -->
          <div class="center-container">
            <section class="home-panel">
              <div class="home-panel-head">
                <div class="home-panel-title">模块入口</div>
                <div class="home-panel-sub">选择一个大屏进入查看</div>
              </div>
              <div class="nav-grid">
                <button
                  v-for="item in navItems"
                  :key="item.path"
                  type="button"
                  class="nav-card"
                  @click="go(item.path)"
                >
                  <div class="nav-card-top">
                    <div class="nav-card-name">{{ item.title }}</div>
                  </div>
                  <div class="nav-card-desc">{{ item.desc }}</div>
                  <div class="nav-card-cta">进入</div>
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import bgUrl from '@/assets/img/bg.jpg'
const designWidth = 11520
const designHeight = 2160
const router = useRouter()
const navItems = [
  { title: '城市管理', path: '/dash', desc: '基础城市管理大屏（默认主屏）' },
  { title: '城市交通', path: '/bus', desc: '公交线路与运行态势' },
  { title: '党的建设', path: '/party', desc: '党建组织与工作概览' },
  { title: '公共服务', path: '/service', desc: '公共服务与民生保障' },
  { title: '经济运行', path: '/econ', desc: '经济指标与产业分析' },
  { title: '人口信息', path: '/people', desc: '人口结构与区域画像' }
]
const go = (path: string) => {
  router.push(path)
}
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
  background: #020a1e;
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
.header-side-left {
  justify-content: flex-start;
  margin-top: -100px;
}
.header-side-right {
  justify-content: flex-end;
  margin-top: -100px;
}
.header-chip {
  width: 140px;
  height: 44px;
  padding: 0 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(78, 184, 255, 0.3);
  background: rgba(5, 26, 66, 0.55);
  box-shadow: inset 0 0 20px rgba(36, 152, 255, 0.18);
  font-size: 18px;
  color: rgba(209, 234, 255, 0.88);
}
.header-chip2 {
  width: 140px;
  justify-content: center;
  margin-left: 92px;
  height: 44px;
  padding: 0 40px;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(78, 184, 255, 0.3);
  background: rgba(5, 26, 66, 0.55);
  box-shadow: inset 0 0 20px rgba(36, 152, 255, 0.18);
  font-size: 18px;
  color: rgba(209, 234, 255, 0.88);
}
.header-chip3 {
  width: 140px;
  justify-content: center;
  margin-right: -10px;
  height: 44px;
  padding: 0 40px;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(78, 184, 255, 0.3);
  background: rgba(5, 26, 66, 0.55);
  box-shadow: inset 0 0 20px rgba(36, 152, 255, 0.18);
  font-size: 18px;
  color: rgba(209, 234, 255, 0.88);
}
.header-chip4 {
  width: 140px;
  justify-content: center;
  margin-left: 55px;
  height: 44px;
  padding: 0 40px;
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
  margin-top: -80px;
  height: 66px;
  display: inline-flex;
  align-items: center;
  font-size: 88px;
  letter-spacing: 40px;
  font-weight: 800;
  color: #eef8ff;
  text-shadow: 0 0 20px rgba(57, 170, 255, 0.55);
}
.body {
  height: calc(100% - 146px);
  display: grid;
  padding-top: 34px;
}
.body--home {
  grid-template-columns: minmax(1px, 1fr);
  min-height: 0;
}
/* 核心居中容器：宽度=大屏1/3，高度=大屏1/2，垂直水平居中 */
.center-container {
  width: calc(100% / 3);
  height: calc(100% / 2);
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.home-panel {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 80px 44px 44px;
  border: 1px solid rgba(84, 188, 255, 0.24);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  background:
    linear-gradient(180deg, rgba(7, 22, 60, 0.62), rgba(5, 16, 44, 0.4)),
    radial-gradient(ellipse at 50% 0%, rgba(54, 232, 255, 0.08), transparent 55%);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.home-panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}
.home-panel::after {
  content: '';
  position: absolute;
  left: -20%;
  top: -40%;
  width: 60%;
  height: 140%;
  background: linear-gradient(120deg, transparent, rgba(54, 232, 255, 0.14), transparent);
  transform: skewX(-16deg);
  opacity: 0.55;
  pointer-events: none;
}
.home-panel-head {
  position: absolute;
  left: 44px;
  right: 44px;
  top: 24px;
  height: 44px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  z-index: 1;
}
.home-panel-title {
  font-size: 40px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(240, 251, 255, 0.98);
  transform: skewX(-10deg);
  text-shadow: 0 0 18px rgba(57, 170, 255, 0.35);
}
.home-panel-sub {
  font-size: 22px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.62);
}
.nav-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(1px, 1fr));
  gap: 28px;
  padding-top: 26px;
}
.nav-card {
  position: relative;
  min-height: 240px;
  border-radius: 16px;
  border: 1px solid rgba(84, 188, 255, 0.18);
  background:
    radial-gradient(circle at 30% 20%, rgba(54, 232, 255, 0.18), transparent 55%),
    linear-gradient(180deg, rgba(10, 30, 70, 0.55), rgba(6, 18, 48, 0.25));
  box-shadow: inset 0 0 26px rgba(54, 232, 255, 0.06);
  padding: 22px 22px 18px;
  text-align: left;
  color: rgba(240, 251, 255, 0.92);
  cursor: pointer;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
}
.nav-card::before {
  content: '';
  position: absolute;
  inset: 10px;
  border-radius: 14px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}
.nav-card::after {
  content: '';
  position: absolute;
  left: -30%;
  top: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(54, 232, 255, 0.16), transparent);
  transform: skewX(-16deg);
  opacity: 0.5;
  pointer-events: none;
}
.nav-card:hover {
  transform: translateY(-6px);
  border-color: rgba(84, 188, 255, 0.32);
  box-shadow:
    inset 0 0 28px rgba(54, 232, 255, 0.1),
    0 0 24px rgba(54, 232, 255, 0.12);
}
.nav-card-top {
  display: grid;
  gap: 8px;
}
.nav-card-name {
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 1px;
}
.nav-card-desc {
  margin-top: 18px;
  font-size: 22px;
  line-height: 1.2;
  color: rgba(214, 238, 255, 0.78);
  min-height: 60px;
}
.nav-card-cta {
  margin-top: auto;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border-radius: 8px;
  border: 1px solid rgba(84, 188, 255, 0.24);
  background: rgba(22, 70, 140, 0.45);
  color: rgba(240, 251, 255, 0.95);
  font-size: 20px;
  font-weight: 900;
  width: 120px;
  box-shadow: inset 0 0 18px rgba(54, 232, 255, 0.08);
}
</style>
