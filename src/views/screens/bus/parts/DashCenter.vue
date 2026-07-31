<script setup lang="ts">
import BusMap from './busMap.vue'
import type { BusScreenData } from '../types'

defineProps<{
  data: BusScreenData
}>()
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
          >
            <span>{{ item.name }}</span>
            <span>{{ item.start }}</span>
            <span>{{ item.end }}</span>
          </div>
        </div>

        <div class="map-box">
          <div class="map-caption">鞍山市</div>
          <div class="map-chart"><BusMap /></div>
        </div>

        <div class="station-panel">
          <div class="title">
            {{ data.routes.find((item) => item.id === data.activeRouteId)?.name || '-' }}
          </div>

          <div v-for="station in data.stations" :key="station.name" class="station-item">
            ● {{ station.name }}
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
  width: 320px;
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
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 12px;
  color: #e8f7ff;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 2px;
  border: 1px solid rgba(84, 188, 255, 0.18);
  background: rgba(8, 36, 88, 0.46);
  border-radius: 12px;
}

.station-item {
  color: #ccefff;
  height: 52px;
  display: flex;
  align-items: center;
  border-left: 2px solid #00c3ff;
  padding-left: 20px;
}
</style>
