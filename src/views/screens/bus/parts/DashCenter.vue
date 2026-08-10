<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'

import BusMap from './busMap.vue'
import type { BusRouteRow, BusScreenData } from '../types'

const props = defineProps<{
  data: BusScreenData
}>()

const data = toRef(props, 'data')

const emit = defineEmits<{
  (e: 'route-change', route: BusRouteRow): void
}>()

const routeName = computed(
  () => data.value.routes.find((item) => item.id === data.value.activeRouteId)?.name || '-'
)

const upStations = computed(() => data.value.stations.filter((item) => item.direction === 'up'))
const downStations = computed(() => data.value.stations.filter((item) => item.direction === 'down'))
const hasBothDirection = computed(
  () => upStations.value.length > 0 && downStations.value.length > 0
)

const directionTab = ref<'up' | 'down'>('up')

watch(
  () => [upStations.value.length, downStations.value.length] as const,
  ([upLen, downLen]) => {
    if (!upLen && downLen) directionTab.value = 'down'
    if (!downLen && upLen) directionTab.value = 'up'
  },
  { immediate: true }
)

const selectedDirection = computed(() => {
  if (directionTab.value === 'up' && upStations.value.length) return 'up'
  if (directionTab.value === 'down' && downStations.value.length) return 'down'
  return upStations.value.length ? 'up' : 'down'
})

const currentStations = computed(() =>
  selectedDirection.value === 'down' ? downStations.value : upStations.value
)

const mapStations = computed(() => {
  if (hasBothDirection.value) return currentStations.value
  return data.value.stations
})

const firstLastStationText = computed(() => {
  const list = currentStations.value
  if (!list.length) return '-'
  const start = list[0]?.name || '-'
  const end = list[list.length - 1]?.name || '-'
  return `${start} → ${end}`
})

const firstLastTimeText = computed(() => '-')
</script>

<template>
  <main class="center">
    <div class="panel center-map">
      <div class="center-map-grid">
        <div class="route-list">
          <div
            v-for="item in data.routes"
            :key="item.id"
            class="route-item"
            :class="{ active: item.id === data.activeRouteId }"
            @click="emit('route-change', item)"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.start }}</span>
            <span>{{ item.end }}</span>
          </div>
          <div v-if="!data.routes.length" class="route-item">
            <span>暂无数据</span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div class="map-box">
          <div class="map-caption">鞍山市</div>
          <div class="map-chart"><BusMap :stations="mapStations" /></div>
        </div>

        <div class="station-panel">
          <div class="station-head">
            <span class="station-head-name">{{ routeName }}</span>
            <span style="font-size: 22px; margin-left: 12px">正在运行</span>
            <span class="station-head-num">{{ data.activeBusRunningCount }}</span>
            <span style="font-size: 22px">辆公交车</span>
          </div>

          <div v-if="hasBothDirection" class="station-tabs">
            <button
              type="button"
              class="station-tab"
              :class="{ 'station-tab--active': selectedDirection === 'up' }"
              @click="directionTab = 'up'"
            >
              上行
            </button>
            <button
              type="button"
              class="station-tab"
              :class="{ 'station-tab--active': selectedDirection === 'down' }"
              @click="directionTab = 'down'"
            >
              下行
            </button>
          </div>

          <div class="station-card">
            <template v-if="currentStations.length">
              <div class="station-meta">
                <div class="meta-row">
                  <span class="meta-label">首末站:</span>
                  <span class="meta-value">{{ firstLastStationText }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">首末班时间:</span>
                  <span class="meta-value">{{ firstLastTimeText }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">站点（{{ currentStations.length }}个）:</span>
                </div>
              </div>

              <div class="station-list">
                <div v-for="station in currentStations" :key="station.name" class="station-node">
                  <span class="node-dot"></span>
                  <span class="node-name">{{ station.name }}</span>
                </div>
              </div>
            </template>
            <div v-else class="station-empty">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.center {
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.center-kpi {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  height: 150px;
}

.kpi-card {
  position: relative;
  border: 1px solid rgba(84, 188, 255, 0.24);
  background: linear-gradient(180deg, rgba(6, 27, 72, 0.72), rgba(4, 16, 44, 0.72));
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  border-radius: 16px;
  padding: 20px 22px;
  display: grid;
  align-content: center;
}

.kpi-card::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}

.kpi-label {
  font-size: 28px;
  text-align: center;
  color: rgba(214, 238, 255, 0.75);
}

.kpi-value {
  padding-top: 10px;
  text-align: center;
  font-size: 50px;
  font-weight: 800;
  color: #ffe27a;
  text-shadow: 0 0 18px rgba(255, 226, 122, 0.24);
}

.panel {
  position: relative;
  border: 1px solid rgba(84, 188, 255, 0.24);
  background: linear-gradient(180deg, rgba(6, 27, 72, 0.72), rgba(4, 16, 44, 0.72));
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  overflow: hidden;
  border-radius: 18px;
  padding: 26px 28px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}

.center-map {
  flex: 1;
  min-height: 0;
}

.center-map-grid {
  flex: 1;
  min-height: 0;
  position: relative;
}

.route-list,
.station-panel {
  position: absolute;
  top: 24px;
  bottom: 24px;
  z-index: 3;
  width: 420px;
  padding: 18px 20px;
  border: 1px solid rgba(84, 188, 255, 0.18);
  background: linear-gradient(180deg, rgba(6, 27, 72, 0.72), rgba(4, 16, 44, 0.66));
  box-shadow:
    inset 0 0 30px rgba(34, 121, 255, 0.08),
    0 0 24px rgba(0, 45, 111, 0.16);
  border-radius: 16px;
  backdrop-filter: blur(4px);
  overflow: auto;
}

.route-list {
  left: 24px;
}

.station-panel {
  right: 24px;
}

.route-item {
  height: 72px;
  display: grid;
  grid-template-columns:
    120px
    1fr
    1fr;
  align-items: center;
  color: #b8e9ff;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
}

.route-item.active {
  background: rgba(61, 145, 255, 0.35);

  border-left: 5px solid #3fd5ff;
}
.map-box {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.map-caption {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 280px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  letter-spacing: 6px;
  color: rgba(214, 238, 255, 0.9);
  background: linear-gradient(180deg, rgba(6, 27, 72, 0.78), rgba(4, 16, 44, 0.6));
  border: 1px solid rgba(84, 188, 255, 0.22);
  border-radius: 16px;
  box-shadow:
    inset 0 0 20px rgba(34, 121, 255, 0.1),
    0 0 24px rgba(0, 45, 111, 0.16);
  margin: 0 auto;
}

.map-chart {
  width: 100%;
  height: 100%;
}

.title {
  display: none;
}

.station-panel {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.station-head {
  height: 58px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 18px;
  font-size: 28px;
  font-weight: 800;
  color: rgba(240, 252, 255, 0.95);
  letter-spacing: 1px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  background: rgba(8, 36, 88, 0.46);
  border-radius: 14px;
  box-shadow: inset 0 0 18px rgba(34, 121, 255, 0.12);
}

.station-head-name {
  flex: 0 0 auto;
}

.station-head-num {
  color: rgba(255, 205, 140, 0.98);
  text-shadow: 0 0 14px rgba(255, 188, 64, 0.22);
}

.station-tabs {
  display: flex;
  justify-content: center;
  gap: 18px;
}

.station-tab {
  width: 120px;
  height: 44px;
  border: 1px solid rgba(84, 188, 255, 0.18);
  border-radius: 999px;
  background: rgba(6, 27, 72, 0.65);
  color: rgba(214, 238, 255, 0.75);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  box-shadow: inset 0 0 20px rgba(34, 121, 255, 0.1);
}

.station-tab--active {
  color: #eaf4ff;
  background: radial-gradient(circle at 30% 30%, rgba(84, 188, 255, 0.35), rgba(6, 27, 72, 0.62));
  border-color: rgba(124, 242, 255, 0.42);
  box-shadow:
    inset 0 0 26px rgba(54, 232, 255, 0.18),
    0 0 14px rgba(54, 232, 255, 0.14);
}

.station-card {
  flex: 1;
  min-height: 0;
  border: 1px solid rgba(84, 188, 255, 0.18);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(6, 27, 72, 0.68), rgba(4, 16, 44, 0.62));
  box-shadow:
    inset 0 0 30px rgba(34, 121, 255, 0.08),
    0 0 24px rgba(0, 45, 111, 0.14);
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.station-meta {
  display: grid;
  gap: 10px;
  color: rgba(214, 238, 255, 0.82);
  font-size: 22px;
}

.meta-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px;
  align-items: center;
}

.meta-label {
  color: rgba(214, 238, 255, 0.72);
  width: 220px;
}

.meta-value {
  color: rgba(234, 244, 255, 0.95);
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.station-list {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 8px 0 4px;
  position: relative;
}

.station-list::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: rgba(54, 232, 255, 0.35);
}

.station-node {
  position: relative;
  min-height: 46px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  color: rgba(224, 246, 255, 0.92);
  font-size: 22px;
}

.node-dot {
  position: absolute;
  left: 4px;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: rgba(54, 232, 255, 0.9);
  box-shadow: 0 0 12px rgba(54, 232, 255, 0.22);
  border: 2px solid rgba(255, 255, 255, 0.7);
}

.node-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.station-empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(214, 238, 255, 0.7);
  font-size: 24px;
}
</style>
