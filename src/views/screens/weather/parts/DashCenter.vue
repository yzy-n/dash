<template>
  <div class="center-shell">
    <!-- 顶部标题栏 -->
    <div class="header-title">
      <span class="title-text">空气质量监测</span>
      <span class="title-suffix">AQI</span>
    </div>
    <div class="main">
      <!-- 左侧：监测站点列表 -->
      <section class="panel panel--left">
        <div class="aqi-station-list">
          <div class="station-item" v-for="(item, idx) in stationList" :key="idx">
            <div class="station-index">{{ String(idx + 1).padStart(2, '0') }}</div>
            <div class="station-name">{{ item.name }}</div>
            <div class="station-level" :class="levelClass(item.level)">{{ item.level }}</div>
            <div class="station-value">{{ item.aqi }}</div>
          </div>
        </div>
        <!-- AQI图例 -->
        <div class="aqi-legend">
          <div class="legend-item">
            <span class="legend-color color-0"></span>
            <span>0‑35 优</span>
          </div>
          <div class="legend-item">
            <span class="legend-color color-1"></span>
            <span>35‑75 良</span>
          </div>
          <div class="legend-item">
            <span class="legend-color color-2"></span>
            <span>75‑115 轻度污染</span>
          </div>
          <div class="legend-item">
            <span class="legend-color color-3"></span>
            <span>115‑150 中度污染</span>
          </div>
          <div class="legend-item">
            <span class="legend-color color-4"></span>
            <span>150‑250 重度污染</span>
          </div>
          <div class="legend-item">
            <span class="legend-color color-5"></span>
            <span>&gt;250 严重污染</span>
          </div>
        </div>
      </section>

      <!-- 中间：地图【完全保留原有地图组件】 -->
      <section class="panel panel--map">
        <div class="map-stage">
          <div class="map-box">
            <CityMapChart :rows="gridInfoRows" :active-name="selectedAreaName" />
          </div>
          <div class="map-base">
            <div class="map-ring map-ring--a"></div>
            <div class="map-ring map-ring--b"></div>
            <div class="map-ring map-ring--c"></div>
          </div>
        </div>
      </section>

      <!-- 右侧：气象参数面板 温度/风速/湿度/气压 -->
      <section class="panel panel--right">
        <div class="weather-param-list">
          <div class="param-item">
            <span class="param-icon temp-icon"></span>
            <span class="param-label">温度</span>
            <span class="param-value">6℃</span>
          </div>
          <div class="param-item">
            <span class="param-icon wind-icon"></span>
            <span class="param-label">风速</span>
            <span class="param-value">南风1级</span>
          </div>
          <div class="param-item">
            <span class="param-icon hum-icon"></span>
            <span class="param-label">湿度</span>
            <span class="param-value">41%</span>
          </div>
          <div class="param-item">
            <span class="param-icon press-icon"></span>
            <span class="param-label">气压</span>
            <span class="param-value">1002百帕</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CityMapChart from '../charts/CityMapChart.vue'
import type { GridInfoRow } from '../types'

const selectedAreaName = ref('铁西区')
const gridInfoRows: GridInfoRow[] = [
  { name: '铁东区', town: 0, village: 0, grid: 12 },
  { name: '铁西区', town: 0, village: 0, grid: 16 },
  { name: '立山区', town: 0, village: 0, grid: 10 },
  { name: '高新区', town: 0, village: 0, grid: 8 },
  { name: '风景区', town: 0, village: 0, grid: 6 },
  { name: '台安县', town: 0, village: 0, grid: 9 },
  { name: '海城市', town: 0, village: 0, grid: 14 },
  { name: '岫岩县', town: 0, village: 0, grid: 7 }
]

// 站点数据，和截图保持一致
const stationList = ref([
  { name: '铁西工业园区', level: '轻度污染', aqi: 131 },
  { name: '铁西三道街', level: '轻度污染', aqi: 132 },
  { name: '太阳城', level: '良', aqi: 96 },
  { name: '明达新区', level: '良', aqi: 79 },
  { name: '深沟寺', level: '良', aqi: 66 },
  { name: '太平', level: '轻度污染', aqi: 133 }
])

const levelClass = (lv: string) => {
  if (lv === '良') return 'level‑good'
  if (lv === '轻度污染') return 'level‑light'
  return ''
}
</script>

<style scoped>
.center-shell {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 80px 1fr;
  gap: 20px;
  min-height: 0;
}

.header-title {
  display: flex;
  align-items: center;
  padding-left: 12px;
}
.title-text {
  font-size: 32px;
  font-weight: bold;
  color: #e8f6ff;
  letter-spacing: 2px;
}
.title-suffix {
  font-size: 24px;
  color: #90ccff;
  margin-left: 16px;
}

.main {
  min-height: 0;
  display: grid;
  grid-template-columns: 520px minmax(1px, 1fr) 520px;
  gap: 40px;
}

.panel {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: radial-gradient(ellipse at top left, rgba(24, 78, 148, 0.42), rgba(4, 14, 36, 0.75));
  border: 1px solid rgba(84, 188, 255, 0.24);
  box-shadow:
    0 0 32px rgba(44, 142, 255, 0.14),
    inset 0 0 40px rgba(54, 232, 255, 0.06);
  padding: 28px;
  color: rgba(214, 238, 255, 0.86);
  box-sizing: border-box;
  min-height: 0;
}
.panel::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(54, 232, 255, 0.4) 0, transparent 40px),
    linear-gradient(to bottom, rgba(54, 232, 255, 0.4) 0, transparent 40px),
    linear-gradient(to left, rgba(54, 232, 255, 0.4) 0, transparent 40px),
    linear-gradient(to top, rgba(54, 232, 255, 0.4) 0, transparent 40px);
  background-position:
    top left,
    top left,
    bottom right,
    bottom right;
  background-repeat: no-repeat;
  background-size:
    80px 1px,
    1px 80px,
    80px 1px,
    1px 80px;
}

.panel--map {
  padding: 0;
  border-radius: 18px;
}
.panel--map::before {
  inset: 0;
  border-color: rgba(94, 197, 255, 0.1);
}
.map-stage {
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 0;
}
.map-box {
  position: absolute;
  inset: 0;
  z-index: 2;
}
.map-base {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 80px;
  height: 260px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.map-ring {
  position: absolute;
  border-radius: 999px;
  border: 2px solid rgba(54, 232, 255, 0.18);
  box-shadow: 0 0 26px rgba(45, 216, 255, 0.1);
}
.map-ring--a {
  width: 520px;
  height: 520px;
  border-color: rgba(54, 232, 255, 0.18);
}
.map-ring--b {
  width: 420px;
  height: 420px;
  border-color: rgba(54, 232, 255, 0.12);
}
.map-ring--c {
  width: 320px;
  height: 320px;
  border-color: rgba(54, 232, 255, 0.1);
}

/* 左侧站点列表 */
.panel--left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.aqi-station-list {
  display: grid;
  gap: 14px;
  margin-top: 100px;
}
.station-item {
  display: grid;
  grid-template-columns: 60px 1fr 120px 80px;
  align-items: center;
  height: 64px;
  padding: 0 14px;
  border: 1px solid rgba(84, 188, 255, 0.18);
  background: rgba(8, 24, 56, 0.55);
  border-radius: 10px;
}
.station-index {
  font-size: 22px;
  font-weight: bold;
  color: #72d8ff;
}
.station-name {
  font-size: 20px;
  color: #e6f4ff;
}
.station-level {
  font-size: 18px;
}
.level‑good {
  color: #98ee77;
}
.level‑light {
  color: #ffbc60;
}
.station-value {
  justify-self: end;
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
}

/* AQI图例 */
.aqi-legend {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: auto;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
}
.legend-color {
  width: 18px;
  height: 12px;
  display: block;
}
.color-0 {
  background: #28c928;
}
.color-1 {
  background: #f9dd34;
}
.color-2 {
  background: #ff8822;
}
.color-3 {
  background: #f03c3c;
}
.color-4 {
  background: #b838c9;
}
.color-5 {
  background: #a81818;
}

/* 右侧气象参数 */
.panel--right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.weather-param-list {
  display: grid;
  gap: 36px;
}
.param-item {
  display: grid;
  grid-template-columns: 70px 120px 1fr;
  align-items: center;
}
.param-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid rgba(84, 188, 255, 0.25);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.18), rgba(6, 18, 48, 0.2));
  box-shadow: 0 0 14px rgba(45, 216, 255, 0.12);
}
.param-label {
  font-size: 24px;
  color: #c6e7ff;
}
.param-value {
  justify-self: end;
  font-size: 26px;
  font-weight: bold;
  color: #fcfca8;
  text-shadow: 0 0 10px rgba(252, 252, 168, 0.25);
}
</style>
