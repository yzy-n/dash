<script setup lang="ts">
import { ref } from 'vue'

import tabBgUrl from '@/assets/img/tabBg.png'
import CityGreeningChart from '../charts/CityGreeningChart.vue'
import LandUseAreaChart from '../charts/LandUseAreaChart.vue'
import PopulationDensityLineChart from '../charts/PopulationDensityLineChart.vue'
import SanitationSweepChart from '../charts/SanitationSweepChart.vue'
import StreetLightGaugeChart from '../charts/StreetLightGaugeChart.vue'

type GreeningTabKey = 'cover' | 'garden' | 'park'

const greeningTabs: Array<{ key: GreeningTabKey; label: string }> = [
  { key: 'cover', label: '绿化覆盖面积' },
  { key: 'garden', label: '园林绿地面积' },
  { key: 'park', label: '公园占地面积' }
]
const greeningTabs2: Array<{ key: GreeningTabKey; label: string }> = [
  { key: 'cover', label: '人均绿地面积' },
  { key: 'garden', label: '建成区绿地面积' }
]
const greeningTabs3: Array<{ key: GreeningTabKey; label: string }> = [
  { key: 'cover', label: '清扫道路面积' },
  { key: 'garden', label: '生活垃圾清运量' },
  { key: 'park', label: '公厕数' }
]
const greeningTabs4: Array<{ key: GreeningTabKey; label: string }> = [
  { key: 'cover', label: '十佳口袋公园' },
  { key: 'garden', label: '修建中口袋公园' }
]
const activeGreeningTab = ref<GreeningTabKey>('cover')

const pocketParks = [
  { rank: 1, district: '铁东区', name: '悠然园' },
  { rank: 2, district: '立山区', name: '大观园' },
  { rank: 3, district: '铁西区', name: '青风园' },
  { rank: 4, district: '海城市', name: '曦光园' },
  { rank: 5, district: '台安县', name: '清韵园' }
]
</script>

<template>
  <aside class="left">
    <div class="col col-left">
      <div class="panel panel--full">
        <div class="section">
          <div class="panel-head">
            <div class="panel-title">城市绿化</div>
          </div>
          <div class="tabs">
            <button
              v-for="item in greeningTabs"
              :key="item.key"
              type="button"
              class="tab"
              :class="{ 'tab--active': activeGreeningTab === item.key }"
              :style="{ backgroundImage: `url(${tabBgUrl})` }"
              @click="activeGreeningTab = item.key"
            >
              {{ item.label }}
            </button>
          </div>
          <div class="panel-chart"><CityGreeningChart :metric="activeGreeningTab" /></div>
        </div>

        <div class="section section--bottom">
          <div class="tabs">
            <button
              v-for="item in greeningTabs2"
              :key="item.key"
              type="button"
              class="tab"
              :class="{ 'tab--active': activeGreeningTab === item.key }"
              :style="{ backgroundImage: `url(${tabBgUrl})` }"
              @click="activeGreeningTab = item.key"
            >
              {{ item.label }}
            </button>
          </div>
          <div class="panel-chart"><PopulationDensityLineChart /></div>
        </div>
      </div>
    </div>

    <div class="col">
      <div class="panel">
        <div class="panel-title">环卫清扫</div>
        <div class="tabs">
          <button
            v-for="item in greeningTabs3"
            :key="item.key"
            type="button"
            class="tab"
            :class="{ 'tab--active': activeGreeningTab === item.key }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="activeGreeningTab = item.key"
          >
            {{ item.label }}
          </button>
        </div>
        <div class="panel-chart"><SanitationSweepChart /></div>
      </div>

      <div class="panel">
        <div class="panel-title">路灯照明</div>
        <div class="panel-chart"><StreetLightGaugeChart /></div>
      </div>
    </div>

    <div class="col">
      <div class="panel">
        <div class="panel-title">城市现状建设用地面积</div>
        <div class="panel-chart"><LandUseAreaChart /></div>
      </div>

      <div class="panel">
        <div class="panel-title">口袋公园</div>
        <div class="tabs">
          <button
            v-for="item in greeningTabs4"
            :key="item.key"
            type="button"
            class="tab"
            :class="{ 'tab--active': activeGreeningTab === item.key }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="activeGreeningTab = item.key"
          >
            {{ item.label }}
          </button>
        </div>
        <div class="table table--3">
          <div class="table-row head">
            <span>排名</span>
            <span>地区</span>
            <span>公园名称</span>
          </div>
          <div class="table-row" v-for="item in pocketParks" :key="item.rank">
            <span>{{ item.rank }}</span>
            <span>{{ item.district }}</span>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.left {
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 26px;
}

.col {
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.col:not(.col-left) .panel {
  flex: 1;
}

.panel {
  position: relative;
  border: 1px solid rgba(84, 188, 255, 0.24);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  overflow: hidden;
  border-radius: 18px;
  padding: 26px 28px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background:
    linear-gradient(180deg, rgba(6, 27, 72, 0.6), rgba(4, 16, 44, 0.6)),
    url('@/assets/img/leftBg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}

.panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}

.panel--full {
  flex: 1;
  background-size: 100% auto;
  background-position: top center;
}

.section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.section--bottom {
  margin-top: 20px;
  padding-top: 22px;
  border-top: 1px solid rgba(94, 197, 255, 0.16);
}

.panel-title {
  height: 42px;
  display: inline-flex;
  align-items: center;
  font-size: 40px;
  line-height: 2px;
  margin-top: -15px;
  margin-left: 30px;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', sans-serif;
  font-style: italic;
  transform: skewX(-10deg);
  font-weight: bold;
  letter-spacing: 2px;
  color: #f8fbff;
  text-shadow:
    -2px -2px 3px rgba(255, 255, 255, 0.7),
    2px 2px 4px rgba(0, 20, 60, 0.5),
    0 0 6px #90c4ff,
    0 0 14px #3b8fff,
    0 0 24px #0f58d1;
}

.panel-head {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 6px;
}

.tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 22px;
  margin: 55px 0 20px;
}

.tab {
  height: 56px;
  min-width: 280px;
  padding: 0 38px;
  border: none;
  outline: none;
  background-color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  color: rgba(214, 238, 255, 0.52);
  font-size: 28px;
  font-weight: 700;
  line-height: 56px;
  text-align: center;
  cursor: pointer;
  opacity: 0.72;
  filter: saturate(0.85);
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
  font-style: italic;
  color: #ffffff;
  text-shadow:
    0 0 6px #fff,
    0 0 12px #7cf,
    0 0 24px #0cf,
    0 0 40px #00a8ff;
  letter-spacing: 2px;
}

.tab--active {
  color: #eaf4ff;
  opacity: 1;
  filter: drop-shadow(0 0 10px rgba(54, 232, 255, 0.28));
  text-shadow: 0 0 10px rgba(54, 232, 255, 0.28);
}

.panel-chart {
  flex: 1;
  min-height: 0;
}

.table {
  flex: 1;
  min-height: 0;
  display: grid;
  gap: 12px;
  font-size: 16px;
  color: rgba(214, 238, 255, 0.84);
}

.table-row {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 1.2fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: rgba(6, 18, 48, 0.58);
  border: 1px solid rgba(89, 194, 255, 0.12);
}

.table-row.head {
  background: rgba(20, 30, 75, 0.55);
  color: rgba(234, 240, 255, 0.95);
  font-weight: 700;
}

.table-row span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table--3 .table-row {
  grid-template-columns: 0.6fr 1fr 1.6fr;
}
</style>
