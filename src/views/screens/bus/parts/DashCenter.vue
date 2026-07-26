<template>
  <div class="map-wrap">
    <div class="side side--left">
      <div class="side-head">
        <div class="tabs tabs--sm">
          <button
            type="button"
            class="tab"
            :class="{ 'tab--active': leftTab === 'bus' }"
            @click="leftTab = 'bus'"
          >
            公交查询
          </button>
          <button
            type="button"
            class="tab"
            :class="{ 'tab--active': leftTab === 'jam' }"
            @click="leftTab = 'jam'"
          >
            拥堵预警
          </button>
        </div>
      </div>
      <div class="side-search">
        <div class="side-search-box">
          <span class="side-search-text">搜索线路/站点</span>
        </div>
      </div>
      <div class="side-body" v-if="leftTab === 'bus'">
        <div class="line-list">
          <button
            v-for="l in lines"
            :key="l.id"
            type="button"
            class="line-item"
            :class="{ 'line-item--active': l.id === activeLineId }"
            @click="activeLineId = l.id"
          >
            {{ l.code }}
          </button>
        </div>
        <div class="line-detail">
          <div class="line-detail-head">
            <div class="line-detail-title">{{ activeLine?.code || '-' }}路</div>
          </div>
          <div class="station-list">
            <div v-for="(s, idx) in stationsToShow" :key="s" class="station-item">
              <span class="station-dot" :class="{ 'station-dot--active': idx === 0 }"></span>
              <span class="station-name">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="side-body" v-else>
        <div class="jam-box">
          <div class="jam-title">拥堵预警</div>
          <div class="jam-row" v-for="item in jamList" :key="item.name">
            <span class="jam-dot"></span>
            <span class="jam-name">{{ item.name }}</span>
            <span class="jam-level" :class="`jam-level--${item.level}`">{{ item.levelText }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="side side--right">
      <div class="side-title">
        {{ activeLine?.code || '-' }}A路正在运行 {{ (props.buses || []).length }} 辆公交车
      </div>
      <div class="side-actions">
        <div class="tabs tabs--sm">
          <button
            type="button"
            class="tab"
            :class="{ 'tab--active': direction === 'up' }"
            @click="direction = 'up'"
          >
            上行
          </button>
          <button
            type="button"
            class="tab"
            :class="{ 'tab--active': direction === 'down' }"
            @click="direction = 'down'"
          >
            下行
          </button>
        </div>
      </div>
      <div class="side-card">
        <div class="side-kv">
          <span class="k">首末站</span>
          <span class="v">{{ activeLine?.terminal || '-' }}</span>
        </div>
        <div class="side-kv">
          <span class="k">首末班时间</span>
          <span class="v">{{ activeLine?.time || '-' }}</span>
        </div>
        <div class="side-kv">
          <span class="k">站点数</span>
          <span class="v">{{ activeLine?.stations?.length || 0 }}（个）</span>
        </div>
      </div>

      <div class="side-card side-card--list">
        <div class="side-kv side-kv--head">
          <span class="k">途经站点</span>
        </div>
        <div class="side-list">
          <div v-for="s in stationsToShow" :key="s" class="side-list-row">
            <span class="side-list-dot"></span>
            <span class="side-list-name">{{ s }}</span>
          </div>
        </div>
      </div>
    </div>

    <div ref="mapContainer" class="amap-box"></div>
    <div v-if="geoLoadError" class="map-hint">鞍山 GeoJSON 未加载（./geo/anshan.geojson）</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type LineItem = {
  id: string
  code: string
  terminal: string
  time: string
  stations: string[]
}

const props = withDefaults(
  defineProps<{
    buses?: Array<{ id: string | number; lng: number; lat: number; label?: string }>
    routePath?: Array<[number, number]>
  }>(),
  {
    buses: () => [],
    routePath: () => []
  }
)

const mapContainer = ref<HTMLDivElement | null>(null)
let map: any = null
let busMarkersLayer: any = null
let routePolyline: any = null
let routeGlow: any = null
let anshanLayer: any = null
const geoLoadError = ref(false)
const anshanGeoUrl = `${import.meta.env.BASE_URL}geo/anshan.geojson`

const leftTab = ref<'bus' | 'jam'>('bus')
const direction = ref<'up' | 'down'>('up')

const lines = ref<LineItem[]>([
  {
    id: '105',
    code: '105',
    terminal: '虹桥北 - 名甲小学',
    time: '05:00 - 19:00',
    stations: ['虹桥北', '双塔台', '新兴路联建', '大红旗', '名甲小学']
  },
  {
    id: '118',
    code: '118',
    terminal: '虹桥北 - 双塔台',
    time: '05:10 - 18:50',
    stations: ['虹桥北', '双塔台', '大红旗', '虹桥北']
  },
  {
    id: '11A',
    code: '11A',
    terminal: '新兴路联建 - 大红旗',
    time: '05:05 - 19:00',
    stations: ['新兴路联建', '大红旗', '铁东广场', '职教城', '北工人街与石东路', '东工人街']
  }
])
const activeLineId = ref('11A')
const activeLine = computed(() => lines.value.find((l) => l.id === activeLineId.value))
const stationsToShow = computed(() => {
  const s = activeLine.value?.stations || []
  return direction.value === 'up' ? s : [...s].reverse()
})

const routePathToShow = computed(() => {
  const p = props.routePath || []
  return direction.value === 'up' ? p : [...p].reverse()
})

const jamList = ref([
  { name: '东工人街', level: 'orange', levelText: '中度拥堵' },
  { name: '大石街', level: 'yellow', levelText: '轻度拥堵' },
  { name: '湖南街', level: 'yellow', levelText: '轻度拥堵' }
])

const busIconHtml = `<svg class="bus-marker__svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="rgba(255,255,255,0.95)" d="M7 4h10a2 2 0 0 1 2 2v11a1 1 0 0 1-1 1h-1.1a2 2 0 0 1-3.8 0H10.9a2 2 0 0 1-3.8 0H6a1 1 0 0 1-1-1V6a2 2 0 0 1 2-2Zm0 3v5h10V7H7Zm1.5 10.5a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Zm7 0a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z"/></svg>`
const busIcon = L.divIcon({
  className: 'bus-marker',
  html: busIconHtml,
  iconSize: [22, 22],
  iconAnchor: [11, 11]
})

const loadAnshanGeo = async () => {
  if (!map || anshanLayer) return
  try {
    const res = await fetch(anshanGeoUrl)
    if (!res.ok) {
      geoLoadError.value = true
      return
    }
    const geojson = await res.json()
    const features = geojson?.features
    if (!Array.isArray(features) || features.length === 0) {
      geoLoadError.value = true
      return
    }
    anshanLayer = L.geoJSON(geojson, {
      style: () => ({
        color: 'rgba(235, 248, 255, 0.88)',
        weight: 1.2,
        opacity: 0.82,
        fillColor: 'rgba(0, 160, 255, 0.12)',
        fillOpacity: 0.14,
        className: 'anshan-geo'
      })
    }).addTo(map)
    map.fitBounds(anshanLayer.getBounds(), { padding: [60, 60] })
  } catch (e) {
    geoLoadError.value = true
  }
}

// 初始化地图
const initMap = async () => {
  // 强制等待DOM完全渲染
  await nextTick()
  if (!mapContainer.value) {
    console.error('地图容器DOM不存在')
    return
  }
  // 已有地图实例直接返回，不重复创建
  if (map) return

  map = L.map(mapContainer.value!, {
    zoomControl: false,
    attributionControl: false,
    preferCanvas: true
  }).setView([41.12, 122.99], 11)

  busMarkersLayer = L.layerGroup().addTo(map)
  await loadAnshanGeo()
  map.invalidateSize()
  window.setTimeout(() => map?.invalidateSize(), 200)
}

// 渲染公交点位
const renderBusMarkers = () => {
  if (!map || !busMarkersLayer) return
  busMarkersLayer.clearLayers()
  props.buses.forEach((item) => {
    const marker = L.marker([item.lat, item.lng], { icon: busIcon, keyboard: false })
    if (item.label) marker.bindTooltip(item.label, { direction: 'top', opacity: 0.9 })
    marker.addTo(busMarkersLayer!)
  })
}

// 绘制线路
const renderRouteLine = () => {
  if (!map || routePathToShow.value.length === 0) return
  if (routePolyline) routePolyline.remove()
  if (routeGlow) routeGlow.remove()

  const latLngs = routePathToShow.value.map(([lng, lat]) => [lat, lng])
  routeGlow = L.polyline(latLngs, {
    color: 'rgba(0, 234, 255, 0.55)',
    weight: 14,
    opacity: 0.22,
    lineCap: 'round',
    lineJoin: 'round',
    className: 'bus-route bus-route--glow'
  }).addTo(map)
  routePolyline = L.polyline(latLngs, {
    color: 'rgba(0, 234, 255, 0.95)',
    weight: 6,
    opacity: 0.92,
    lineCap: 'round',
    lineJoin: 'round',
    className: 'bus-route'
  }).addTo(map)

  map.fitBounds(routePolyline.getBounds(), { padding: [30, 30] })
}

watch(() => props.buses, renderBusMarkers, { deep: true })
watch([() => props.routePath, direction], renderRouteLine, { deep: true })

onMounted(async () => {
  await initMap()
  renderBusMarkers()
  renderRouteLine()
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style scoped>
.map-wrap {
  width: 100%;
  height: 100%;
  min-height: 600px;
  position: relative;
  overflow: hidden;
  border-radius: 18px;
}

.map-wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 4;
  background:
    linear-gradient(180deg, rgba(0, 200, 255, 0.22), rgba(0, 0, 0, 0) 24%),
    radial-gradient(circle at 50% 10%, rgba(0, 210, 255, 0.18), rgba(0, 0, 0, 0) 56%),
    radial-gradient(circle at 50% 100%, rgba(0, 120, 255, 0.18), rgba(0, 0, 0, 0) 62%),
    radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.78));
}

.map-wrap::after {
  content: '';
  position: absolute;
  inset: 14px;
  pointer-events: none;
  z-index: 5;
  border: 1px solid rgba(120, 220, 255, 0.12);
  box-shadow:
    inset 0 0 90px rgba(30, 140, 255, 0.16),
    0 0 50px rgba(0, 100, 255, 0.18);
}

.amap-box {
  width: 100%;
  height: 100%;
  min-height: 600px;
  background:
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.02) 0,
      rgba(255, 255, 255, 0.02) 1px,
      transparent 1px,
      transparent 42px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.02) 0,
      rgba(255, 255, 255, 0.02) 1px,
      transparent 1px,
      transparent 42px
    ),
    radial-gradient(circle at 20% 45%, rgba(120, 220, 255, 0.14), rgba(0, 0, 0, 0) 58%),
    radial-gradient(circle at 62% 38%, rgba(0, 180, 255, 0.12), rgba(0, 0, 0, 0) 60%),
    radial-gradient(circle at 48% 58%, rgba(235, 248, 255, 0.08), rgba(0, 0, 0, 0) 64%),
    radial-gradient(circle at 50% 70%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.62)), #02040a;
}

:deep(.leaflet-pane),
:deep(.leaflet-tile-pane),
:deep(.leaflet-map-pane),
:deep(.leaflet-overlay-pane),
:deep(.leaflet-marker-pane),
:deep(.leaflet-shadow-pane),
:deep(.leaflet-tooltip-pane),
:deep(.leaflet-popup-pane) {
  z-index: 1;
}

:deep(.leaflet-container) {
  background: transparent;
}

:deep(.leaflet-control-container) {
  display: none;
}

:deep(.leaflet-overlay-pane svg) {
  filter: drop-shadow(0 0 10px rgba(0, 220, 255, 0.22));
}

:deep(path.anshan-geo) {
  filter: drop-shadow(0 0 10px rgba(0, 200, 255, 0.28))
    drop-shadow(0 0 16px rgba(0, 110, 255, 0.14));
}

:deep(path.bus-route) {
  filter: drop-shadow(0 0 14px rgba(0, 234, 255, 0.28))
    drop-shadow(0 0 28px rgba(0, 120, 255, 0.18));
}

:deep(.bus-marker) {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: linear-gradient(180deg, rgba(75, 255, 188, 0.92), rgba(12, 180, 110, 0.92));
  border: 1px solid rgba(190, 255, 230, 0.55);
  box-shadow:
    0 0 12px rgba(45, 255, 190, 0.28),
    inset 0 0 10px rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.bus-marker__svg) {
  width: 15px;
  height: 15px;
  display: block;
  filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.25));
}

.map-hint {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 14px;
  border: 1px solid rgba(78, 184, 255, 0.3);
  background: rgba(5, 26, 66, 0.65);
  box-shadow: inset 0 0 20px rgba(36, 152, 255, 0.18);
  color: rgba(209, 234, 255, 0.9);
  font-size: 16px;
  letter-spacing: 1px;
  pointer-events: none;
  z-index: 6;
}

.side {
  position: absolute;
  top: 78px;
  bottom: 72px;
  width: 980px;
  z-index: 6;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(78, 184, 255, 0.22);
  background:
    linear-gradient(180deg, rgba(6, 27, 72, 0.72), rgba(2, 10, 26, 0.68)),
    radial-gradient(circle at 50% 10%, rgba(0, 200, 255, 0.12), rgba(0, 0, 0, 0));
  box-shadow:
    inset 0 0 70px rgba(34, 121, 255, 0.12),
    0 0 60px rgba(0, 60, 140, 0.22);
  border-radius: 18px;
  overflow: hidden;
}

.side--left {
  left: 64px;
}

.side--right {
  right: 64px;
  padding: 24px 26px;
}

.side-head {
  padding: 16px 18px 12px;
  display: flex;
}

.tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 18px;
  margin: 6px 0 18px;
}

.tabs--sm {
  justify-content: flex-start;
  gap: 14px;
  margin: 0;
}

.tab {
  height: 64px;
  min-width: 300px;
  padding: 0 26px;
  border: none;
  outline: none;
  background: url('@/assets/img/tabBg.png') no-repeat center;
  background-size: 100% 100%;
  background-color: transparent;
  appearance: none;
  color: #ffffff;
  font-size: 32px;
  font-weight: 700;
  line-height: 64px;
  text-align: center;
  cursor: pointer;
  opacity: 0.72;
  filter: saturate(0.85);
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
  font-style: italic;
  letter-spacing: 2px;
  text-shadow:
    0 0 6px #fff,
    0 0 12px #7cf,
    0 0 24px #0cf,
    0 0 40px #00a8ff;
}

.tabs--sm .tab {
  height: 44px;
  min-width: 140px;
  padding: 0 18px;
  font-size: 18px;
  line-height: 44px;
  letter-spacing: 1px;
}

.tab--active {
  color: #eaf4ff;
  opacity: 1;
  filter: drop-shadow(0 0 10px rgba(54, 232, 255, 0.28));
}

.side-search {
  padding: 0 18px 14px;
}

.side-search-box {
  height: 44px;
  border: 1px solid rgba(78, 184, 255, 0.22);
  background: rgba(4, 16, 44, 0.48);
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0 14px;
}

.side-search-text {
  color: rgba(214, 238, 255, 0.42);
  font-size: 16px;
  letter-spacing: 1px;
}

.side-body {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 170px 1fr;
  border-top: 1px solid rgba(78, 184, 255, 0.14);
}

.jam-box {
  grid-column: 1 / -1;
  min-height: 0;
  padding: 14px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
}

.jam-title {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border: 1px solid rgba(78, 184, 255, 0.16);
  background: rgba(4, 16, 44, 0.38);
  border-radius: 12px;
  color: rgba(240, 251, 255, 0.95);
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 700;
}

.jam-row {
  display: grid;
  grid-template-columns: 16px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid rgba(78, 184, 255, 0.12);
  background: rgba(4, 16, 44, 0.28);
  border-radius: 12px;
}

.jam-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(0, 234, 255, 0.35);
  box-shadow: 0 0 10px rgba(0, 234, 255, 0.22);
}

.jam-name {
  color: rgba(214, 238, 255, 0.78);
  font-size: 16px;
  letter-spacing: 0.5px;
}

.jam-level {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 14px;
  letter-spacing: 1px;
  border: 1px solid rgba(78, 184, 255, 0.14);
  background: rgba(4, 16, 44, 0.38);
  color: rgba(214, 238, 255, 0.75);
}

.jam-level--yellow {
  color: rgba(255, 221, 120, 0.95);
  border-color: rgba(255, 221, 120, 0.28);
  box-shadow: 0 0 14px rgba(255, 221, 120, 0.1);
}

.jam-level--orange {
  color: rgba(255, 160, 80, 0.95);
  border-color: rgba(255, 160, 80, 0.28);
  box-shadow: 0 0 14px rgba(255, 160, 80, 0.1);
}

.line-list {
  min-height: 0;
  border-right: 1px solid rgba(78, 184, 255, 0.14);
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.line-item {
  height: 44px;
  border: 1px solid rgba(78, 184, 255, 0.18);
  background: rgba(4, 16, 44, 0.42);
  color: rgba(214, 238, 255, 0.76);
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.line-item--active {
  background: rgba(10, 70, 160, 0.55);
  color: rgba(240, 251, 255, 0.95);
  box-shadow: inset 0 0 18px rgba(0, 220, 255, 0.18);
}

.line-detail {
  min-height: 0;
  padding: 14px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.line-detail-head {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border: 1px solid rgba(78, 184, 255, 0.16);
  background: rgba(4, 16, 44, 0.38);
  border-radius: 12px;
}

.line-detail-title {
  color: rgba(240, 251, 255, 0.95);
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 700;
}

.station-list {
  flex: 1;
  min-height: 0;
  padding: 8px 6px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
}

.station-item {
  display: grid;
  grid-template-columns: 18px 1fr;
  align-items: center;
  gap: 10px;
}

.station-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 234, 255, 0.35);
  box-shadow: 0 0 10px rgba(0, 234, 255, 0.22);
}

.station-dot--active {
  background: rgba(45, 255, 190, 0.9);
  box-shadow: 0 0 14px rgba(45, 255, 190, 0.32);
}

.station-name {
  color: rgba(214, 238, 255, 0.78);
  font-size: 16px;
  letter-spacing: 0.5px;
}

.side-title {
  color: rgba(240, 251, 255, 0.95);
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 700;
  padding: 4px 0 10px;
}

.side-actions {
  display: flex;
  padding-bottom: 16px;
}

.side-card {
  border: 1px solid rgba(78, 184, 255, 0.16);
  background: rgba(4, 16, 44, 0.38);
  border-radius: 14px;
  padding: 14px 14px 12px;
  box-shadow: inset 0 0 30px rgba(34, 121, 255, 0.08);
}

.side-card--list {
  margin-top: 14px;
  padding: 12px 14px 10px;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.side-kv {
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(78, 184, 255, 0.1);
}

.side-kv:last-child {
  border-bottom: none;
}

.side-kv--head {
  grid-template-columns: 1fr;
  border-bottom: 1px solid rgba(78, 184, 255, 0.14);
  padding: 6px 0 10px;
}

.k {
  color: rgba(214, 238, 255, 0.56);
  font-size: 14px;
  letter-spacing: 1px;
}

.v {
  color: rgba(240, 251, 255, 0.9);
  font-size: 14px;
  letter-spacing: 0.5px;
}

.side-list {
  flex: 1;
  min-height: 0;
  padding-top: 10px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.side-list-row {
  display: grid;
  grid-template-columns: 16px 1fr;
  align-items: center;
  gap: 10px;
}

.side-list-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(0, 234, 255, 0.35);
  box-shadow: 0 0 10px rgba(0, 234, 255, 0.22);
}

.side-list-name {
  color: rgba(214, 238, 255, 0.72);
  font-size: 14px;
  letter-spacing: 0.5px;
}
</style>
