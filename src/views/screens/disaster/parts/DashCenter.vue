<template>
  <div class="center-shell">
    <div class="hazard-tabs">
      <button
        type="button"
        class="hazard-tab"
        :class="{ 'hazard-tab--active': activeHazard === 'eq' }"
        @click="activeHazard = 'eq'"
      >
        <span class="hazard-icon hazard-icon--eq"></span>
        <span class="hazard-name">地震灾害</span>
        <span class="hazard-num">9</span>
      </button>
      <button
        type="button"
        class="hazard-tab"
        :class="{ 'hazard-tab--active': activeHazard === 'geo' }"
        @click="activeHazard = 'geo'"
      >
        <span class="hazard-icon hazard-icon--geo"></span>
        <span class="hazard-name">地质灾害</span>
        <span class="hazard-num">40</span>
      </button>
      <button
        type="button"
        class="hazard-tab"
        :class="{ 'hazard-tab--active': activeHazard === 'fire' }"
        @click="activeHazard = 'fire'"
      >
        <span class="hazard-icon hazard-icon--fire"></span>
        <span class="hazard-name">森林火灾</span>
        <span class="hazard-num">3</span>
      </button>
      <button
        type="button"
        class="hazard-tab"
        :class="{ 'hazard-tab--active': activeHazard === 'met' }"
        @click="activeHazard = 'met'"
      >
        <span class="hazard-icon hazard-icon--met"></span>
        <span class="hazard-name">气象灾害</span>
        <span class="hazard-num">7</span>
      </button>
      <button
        type="button"
        class="hazard-tab"
        :class="{ 'hazard-tab--active': activeHazard === 'flood' }"
        @click="activeHazard = 'flood'"
      >
        <span class="hazard-icon hazard-icon--flood"></span>
        <span class="hazard-name">汛情灾害</span>
        <span class="hazard-num">2</span>
      </button>
    </div>

    <div class="main">
      <section class="panel panel--left">
        <div class="panel-title">地震灾害</div>
        <div class="quake-list">
          <div class="quake-item">
            <div class="quake-dot"></div>
            <div class="quake-body">
              <div class="quake-time">2022年11月06日10时52分</div>
              <div class="quake-desc">
                中国地震台网正式测定：在辽宁省海城市（北纬40.70度，东经122.74度）发生2.0级地震，震源深度10公里。
              </div>
            </div>
          </div>
          <div class="quake-item">
            <div class="quake-dot"></div>
            <div class="quake-body">
              <div class="quake-time">2022年11月13日21时16分</div>
              <div class="quake-desc">
                中国地震台网正式测定：在辽宁省海城市（北纬40.67度，东经122.68度）发生2.0级地震，震源深度10公里。
              </div>
            </div>
          </div>
          <div class="quake-item">
            <div class="quake-dot"></div>
            <div class="quake-body">
              <div class="quake-time">2022年12月02日21时27分</div>
              <div class="quake-desc">
                中国地震台网正式测定：在辽宁省海城市（北纬40.69度，东经122.73度）发生2.4级地震，震源深度12公里。
              </div>
            </div>
          </div>
          <div class="quake-item">
            <div class="quake-dot"></div>
            <div class="quake-body">
              <div class="quake-time">2022年12月10日16时18分</div>
              <div class="quake-desc">
                中国地震台网正式测定：在辽宁省海城市（北纬40.70度，东经122.68度）发生2.7级地震，震源深度10公里。
              </div>
            </div>
          </div>
          <div class="quake-item">
            <div class="quake-dot"></div>
            <div class="quake-body">
              <div class="quake-time">2022年12月29日20时22分</div>
              <div class="quake-desc">
                中国地震台网正式测定：在辽宁省海城市（北纬40.69度，东经122.71度）发生2.8级地震，震源深度9公里。
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section class="panel panel--right">
        <div class="panel-title">近七天气象灾害预报</div>
        <div class="forecast">
          <div class="forecast-card">
            <div class="forecast-head">鞍山市发布雷雨大风预警</div>
            <div class="forecast-body">
              <div class="forecast-text">
                预计21日夜间23时，鞍山市将出现雷雨大风天气，局地伴有短时强降水、冰雹等强对流天气。
              </div>
              <div class="forecast-steps">
                <div class="forecast-step">1. 政府及相关部门做好防风防雷准备工作。</div>
                <div class="forecast-step">2. 相关水域水上作业和过往船舶采取措施回港避风。</div>
                <div class="forecast-step">3. 关好门窗，加固搭建物，妥善安置室外物品。</div>
                <div class="forecast-step">4. 做好防御冰雹、雷电等灾害的应急工作。</div>
              </div>
            </div>
          </div>

          <div class="forecast-card">
            <div class="forecast-head">台安县发布雷雨大风预警</div>
            <div class="forecast-body">
              <div class="forecast-text">
                预计21日夜间32时，台安县将出现雷雨大风天气，局地伴有短时强降水、冰雹等强对流天气。
              </div>
              <div class="forecast-steps">
                <div class="forecast-step">1. 政府及相关部门做好防风防雷准备工作。</div>
                <div class="forecast-step">2. 相关水域水上作业和过往船舶采取措施回港避风。</div>
                <div class="forecast-step">3. 关好门窗，加固搭建物，妥善安置室外物品。</div>
                <div class="forecast-step">4. 做好防御冰雹、雷电等灾害的应急工作。</div>
              </div>
            </div>
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

const activeHazard = ref<'eq' | 'geo' | 'fire' | 'met' | 'flood'>('geo')
const areaOptions = ['铁东区', '铁西区', '立山区', '高新区', '风景区', '台安县', '海城市', '岫岩县']
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
</script>

<style scoped>
.center-shell {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 140px 1fr;
  gap: 26px;
  min-height: 0;
}

.hazard-tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 48px;
  align-items: center;
}

.hazard-tab {
  height: 92px;
  width: 440px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(16, 66, 130, 0.65), rgba(6, 18, 48, 0.4)), rgba(6, 18, 48, 0.38);
  box-shadow:
    inset 0 0 26px rgba(54, 232, 255, 0.08),
    0 0 22px rgba(0, 130, 255, 0.12);
  display: grid;
  grid-template-columns: 90px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 0 26px;
  cursor: pointer;
  color: rgba(240, 251, 255, 0.92);
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
}

.hazard-tab::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    rgba(54, 232, 255, 0),
    rgba(54, 232, 255, 0.7),
    rgba(54, 232, 255, 0)
  );
  opacity: 0.35;
}

.hazard-tab--active {
  border-color: rgba(120, 255, 190, 0.35);
  background:
    linear-gradient(180deg, rgba(30, 160, 130, 0.62), rgba(6, 18, 48, 0.35)), rgba(6, 18, 48, 0.38);
}

.hazard-icon {
  width: 66px;
  height: 66px;
  border-radius: 18px;
  border: 1px solid rgba(120, 220, 255, 0.26);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.26), rgba(6, 18, 48, 0.18));
  box-shadow: 0 0 16px rgba(45, 216, 255, 0.12);
  justify-self: center;
}

.hazard-name {
  font-size: 26px;
  font-weight: 900;
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}

.hazard-num {
  font-size: 34px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  text-shadow: 0 0 14px rgba(45, 216, 255, 0.22);
}

.main {
  min-height: 0;
  display: grid;
  grid-template-columns: 700px minmax(1px, 1fr) 700px;
  gap: 60px;
}

.panel {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 92px 28px 26px;
  color: rgba(214, 238, 255, 0.86);
  box-sizing: border-box;
  min-height: 0;
}

.panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  pointer-events: none;
}

.panel-title {
  position: absolute;
  left: 28px;
  top: 18px;
  height: 54px;
  display: inline-flex;
  align-items: center;
  font-size: 40px;
  font-style: italic;
  transform: skewX(-10deg);
  font-weight: 800;
  letter-spacing: 2px;
  color: #f8fbff;
  text-shadow:
    -2px -2px 3px rgba(255, 255, 255, 0.7),
    2px 2px 4px rgba(0, 20, 60, 0.5),
    0 0 6px #90c4ff,
    0 0 14px #3b8fff,
    0 0 24px #0f58d1;
}

.map-box {
  position: absolute;
  inset: 0;
  z-index: 2;
}

.panel--map {
  padding: 0;
  position: relative;
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

.map-caption {
  position: absolute;
  left: 50%;
  top: 26px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 420px;
  height: 74px;
  font-size: 36px;
  letter-spacing: 6px;
  color: rgba(214, 238, 255, 0.9);
  background-size: 100% 100%;
  z-index: 3;
}

.panel--left .panel-title,
.panel--right .panel-title {
  left: 34px;
  top: 20px;
}

.panel--left {
  padding: 92px 34px 34px;
  transform: translateX(48px) perspective(1800px) rotateY(14deg);
  transform-origin: right center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform;
  height: 75%;
  align-self: center;
}

.quake-list {
  margin-top: 8px;
  height: 100%;
  min-height: 0;
  display: grid;
  gap: 18px;
  grid-auto-rows: 1fr;
  overflow: hidden;
}

.quake-item {
  min-height: 0;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.58);
  border-radius: 14px;
  padding: 10px 16px 10px 22px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 12px;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(0);
  overflow: hidden;
  box-shadow:
    inset 0 0 24px rgba(54, 232, 255, 0.08),
    0 10px 26px rgba(0, 10, 40, 0.35);
  will-change: transform;
  animation: cardTiltLeft 6.5s ease-in-out infinite;
}

.quake-item::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0));
  opacity: 0.6;
  pointer-events: none;
  transform: translateZ(1px);
}

.quake-item:hover {
  animation-play-state: paused;
  transform: translateZ(14px);
  border-color: rgba(120, 255, 240, 0.22);
  box-shadow:
    inset 0 0 28px rgba(54, 232, 255, 0.12),
    0 14px 34px rgba(0, 10, 40, 0.45);
}

.quake-item::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 18px;
  bottom: 18px;
  width: 2px;
  background: rgba(54, 232, 255, 0.12);
}

.quake-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: rgba(54, 232, 255, 0.95);
  box-shadow: 0 0 12px rgba(45, 216, 255, 0.25);
  margin-top: 6px;
  z-index: 1;
}

.quake-body {
  min-width: 0;
  display: grid;
  gap: 10px;
}

.quake-time {
  font-size: 18px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
}

.quake-desc {
  font-size: 14px;
  line-height: 1.45;
  color: rgba(214, 238, 255, 0.78);
  display: -webkit-box;
  --webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.panel--right {
  padding: 92px 34px 34px;
  transform: translateX(-48px) perspective(1800px) rotateY(-14deg);
  transform-origin: left center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform;
  height: 75%;
  align-self: center;
}

.forecast {
  margin-top: 8px;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
}

.forecast-card {
  min-height: 0;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.5);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(0);
  box-shadow:
    inset 0 0 24px rgba(54, 232, 255, 0.08),
    0 10px 26px rgba(0, 10, 40, 0.35);
  will-change: transform;
  animation: cardTiltRight 6.5s ease-in-out infinite;
}

.forecast-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(225deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0));
  opacity: 0.55;
  pointer-events: none;
  transform: translateZ(1px);
}

.forecast-card:hover {
  animation-play-state: paused;
  transform: translateZ(14px);
  border-color: rgba(120, 255, 240, 0.22);
  box-shadow:
    inset 0 0 28px rgba(54, 232, 255, 0.12),
    0 14px 34px rgba(0, 10, 40, 0.45);
}

@keyframes cardTiltLeft {
  0%,
  100% {
    transform: translateZ(0);
  }
  50% {
    transform: translateZ(12px);
  }
}

@keyframes cardTiltRight {
  0%,
  100% {
    transform: translateZ(0);
  }
  50% {
    transform: translateZ(12px);
  }
}
.forecast-head {
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 18px;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgba(30, 20, 0, 0.9);
  background: rgba(255, 206, 74, 0.9);
  border-bottom: 1px solid rgba(255, 206, 74, 0.35);
}

.forecast-body {
  flex: 1;
  min-height: 0;
  padding: 10px 14px 12px;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
  box-sizing: border-box;
}

.forecast-text {
  font-size: 14px;
  line-height: 1.45;
  color: rgba(214, 238, 255, 0.78);
  display: -webkit-box;
  --webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.forecast-steps {
  min-height: 0;
  display: grid;
  gap: 8px;
}

.forecast-step {
  font-size: 14px;
  line-height: 1.4;
  color: rgba(214, 238, 255, 0.82);
  padding-left: 14px;
  position: relative;
}

.forecast-step:nth-child(n + 3) {
  display: none;
}

.forecast-step::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: rgba(54, 232, 255, 0.9);
  box-shadow: 0 0 10px rgba(45, 216, 255, 0.2);
  position: absolute;
  left: 0;
  top: 10px;
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

.event-table {
  margin-top: 10px;
  display: grid;
  gap: 12px;
}

.event-row {
  height: 64px;
  display: grid;
  grid-template-columns: 130px 1fr 120px;
  align-items: center;
  padding: 0 16px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.58);
  border-radius: 12px;
  box-sizing: border-box;
  gap: 14px;
  font-size: 20px;
}

.event-row span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.event-row--head {
  background: rgba(20, 30, 75, 0.55);
  color: rgba(234, 240, 255, 0.95);
  font-weight: 700;
}

.st {
  justify-self: end;
  font-weight: 800;
}

.st--run {
  color: rgba(255, 190, 94, 0.95);
  text-shadow: 0 0 10px rgba(255, 169, 60, 0.18);
}

.st--done {
  color: rgba(92, 255, 178, 0.95);
  text-shadow: 0 0 10px rgba(34, 255, 154, 0.16);
}
</style>
