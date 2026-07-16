<script setup lang="ts">
import { ref } from 'vue'
import BusMap from './busMap.vue'
// 顶部KPI数据
const centerKpis = [
  { label: '立案数', value: '559315' },
  { label: '结案数', value: '559297' },
  { label: '结案率', value: '99.99%' }
]
// 公交线路模拟数据
const routes = [
  { id: 105, name: '105', start: '虹桥北', end: '名甲小学' },
  { id: 118, name: '118', start: '虹桥北', end: '双楼台' },
  { id: 11, name: '11A', start: '新兴商贸城', end: '大红旗' },
  { id: 17, name: '17', start: '眼前山矿', end: '站前' },
  { id: 18, name: '18', start: '孙青', end: '虹桥北' },
  { id: 2, name: '2', start: '职教城', end: '师范学院' },
  { id: 237, name: '237C', start: '长岭子', end: '站前' },
  { id: 25, name: '25E', start: '职教城', end: '欧华小区' },
  { id: 29, name: '29E', start: '职教城', end: '站前' },
  { id: 30, name: '30', start: '新一中', end: '站前' }
]
// 站点数据
const stations = [
  { name: '新兴商贸城', isStart: true },
  { name: '民生东路', isStart: false },
  { name: '站前街', isStart: false },
  { name: '虹桥北', isStart: false },
  { name: '五一路立交桥南', isStart: false },
  { name: '全派商场', isStart: true }
]

const activeRouteId = ref<number>(11)

const busPoints = ref<Array<{ id: string | number; lng: number; lat: number; label?: string }>>([])
const activeRoutePath = ref<Array<[number, number]>>([])
</script>

<template>
  <main class="center">
    <!-- 顶部KPI卡片 -->
    <div class="center-kpi">
      <div v-for="item in centerKpis" :key="item.label" class="kpi-card">
        <div class="kpi-label">{{ item.label }}</div>
        <div class="kpi-value">{{ item.value }}</div>
      </div>
    </div>

    <div class="panel center-map">
      <!-- 顶部按钮栏 -->
      <div class="map-top-buttons">
        <div class="btn-group">
          <div class="top-btn active">公交查询</div>
          <div class="top-btn">拥堵预览</div>
        </div>
        <div class="map-right-top">
          <div class="route-head-text">11A路正在运行12辆公交车</div>
          <div class="tab-buttons">
            <div class="tab-btn active">上行</div>
            <div class="tab-btn">下行</div>
          </div>
        </div>
      </div>

      <!-- 三栏主体：线路列表 + 地图 + 站点面板 -->
      <div class="center-map-grid">
        <div class="map-bg">
          <div class="map-chart">
            <BusMap :buses="busPoints" :route-path="activeRoutePath" />
          </div>
        </div>
        <!-- 左侧线路列表 -->
        <div class="route-list">
          <div class="route-table-head">
            <span>线路</span>
            <span>首末站</span>
          </div>
          <div
            class="route-item"
            v-for="item in routes"
            :key="item.id"
            :class="{ active: item.id === activeRouteId }"
            @click="activeRouteId = item.id"
          >
            <span class="route-id">{{ item.name }}</span>
            <span class="route-station">{{ item.start }} ⇋ {{ item.end }}</span>
          </div>
        </div>

        <!-- 右侧站点面板 -->
        <div class="station-panel">
          <div class="station-title">11A路线</div>
          <div class="station-base-info">
            <div class="info-row">
              <span>首末站:</span>
              <span>新兴商贸城 ⇋ 大红旗</span>
            </div>
            <div class="info-row">
              <span>首末班时间:</span>
              <span>05:05 — 19:00</span>
            </div>
            <div class="info-row">
              <span>站点（26个）:</span>
            </div>
          </div>
          <div class="station-list">
            <div
              v-for="station in stations"
              :key="station.name"
              class="station-item"
              :class="{ start: station.isStart }"
            >
              <span class="dot"></span>
              <span class="station-name">{{ station.name }}</span>
            </div>
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

/* 顶部KPI */
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

/* 外层面板通用 */
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
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 顶部按钮栏 */
.map-top-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-btn {
  padding: 10px 32px;
  font-size: 26px;
  color: #b8e9ff;
  border: 1px solid rgba(90, 200, 255, 0.25);
  border-radius: 8px;
  background: rgba(0, 80, 160, 0.2);
}
.top-btn.active {
  background: linear-gradient(90deg, #0088dd, #00aaff);
  box-shadow: 0 0 12px rgba(0, 160, 255, 0.5);
}
.tab-buttons {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  justify-content: flex-end;
}
.tab-btn {
  padding: 8px 28px;
  font-size: 24px;
  color: #b8e9ff;
  border: 1px solid rgba(90, 200, 255, 0.25);
  border-radius: 8px;
  background: rgba(0, 80, 160, 0.2);
}
.tab-btn.active {
  background: linear-gradient(90deg, #0088dd, #00aaff);
  box-shadow: 0 0 12px rgba(0, 160, 255, 0.5);
}
.map-right-top {
  text-align: right;
}
.route-head-text {
  font-size: 32px;
  color: #e0f4ff;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 180, 255, 0.4);
}

/* 三栏主体布局：左180px | 中间自适应 | 右320px */
.center-map-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 180px 1fr 320px;
  gap: 26px;
  min-height: 600px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.map-bg {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(90, 200, 255, 0.15);
}

/* 左侧线路列表 */
.route-list {
  grid-column: 1;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(90, 200, 255, 0.18);
  background: rgba(0, 20, 60, 0.4);
  border-radius: 12px;
  overflow: hidden;
}
.route-table-head {
  display: grid;
  grid-template-columns: 60px 1fr;
  height: 64px;
  align-items: center;
  padding: 0 16px;
  font-size: 26px;
  color: #fff;
  background: rgba(0, 120, 220, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.route-item {
  height: 72px;
  display: grid;
  grid-template-columns: 60px 1fr;
  align-items: center;
  padding: 0 16px;
  color: #b8e9ff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 24px;
}
.route-item.active {
  background: rgba(61, 145, 255, 0.35);
  border-left: 5px solid #3fd5ff;
}
.route-id {
  font-weight: bold;
}

.map-chart {
  width: 100%;
  height: 100%;
}

/* 右侧站点面板 */
.station-panel {
  grid-column: 3;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(90, 200, 255, 0.18);
  background: rgba(0, 20, 60, 0.4);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.station-title {
  font-size: 36px;
  color: #fff;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 12px;
}
.info-row {
  font-size: 24px;
  color: #ccefff;
  line-height: 2;
}
.info-row span:first-child {
  color: #80d8ff;
}
.station-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.station-item {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 24px;
  color: #ccefff;
}
.station-item .dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #00c3ff;
}
.station-item.start .dot {
  background: #00c3ff;
  box-shadow: 0 0 8px #00c3ff;
}
</style>
