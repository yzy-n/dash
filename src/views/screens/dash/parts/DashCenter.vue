<script setup lang="ts">
import CityMapChart from '../charts/CityMapChart.vue'
const centerKpis = [
  { label: '立案数', value: '559315' },
  { label: '结案数', value: '559297' },
  { label: '结案率', value: '99.99%' }
]

const centerSideLeft = [
  { name: '安全隐患', year: 0, last: 10961 },
  { name: '便民服务', year: 0, last: 12901 },
  { name: '矛盾纠纷', year: 0, last: 710 },
  { name: '办理记录', year: 0, last: 326 },
  { name: '突发事件', year: 0, last: 297 },
  { name: '两违线索', year: 0, last: 87 },
  { name: '关注重点人群', year: 0, last: 436 }
]

const centerSideRight = [
  { name: '政务服务', year: 0, last: 7776 },
  { name: '平安建设', year: 0, last: 6278 },
  { name: '群防群治', year: 0, last: 403 },
  { name: '苗头态势', year: 0, last: 306 },
  { name: '人居环境', year: 0, last: 79 },
  { name: '应急救援', year: 0, last: 10 },
  { name: '维护和谐卫生', year: 0, last: 31101 }
]
</script>

<template>
  <main class="center">
    <div class="center-kpi">
      <div v-for="item in centerKpis" :key="item.label" class="kpi-card">
        <div class="kpi-label">{{ item.label }}</div>
        <div class="kpi-value">{{ item.value }}</div>
      </div>
    </div>

    <div class="panel center-map">
      <div class="center-map-grid">
        <div class="side-cards">
          <div v-for="item in centerSideLeft" :key="item.name" class="side-card">
            <div class="side-name">{{ item.name }}</div>
            <div class="side-metrics">
              <span class="metric-item">
                <span class="text-label">本年</span>
                <span class="text-num">{{ item.year }}</span>
              </span>
              <span class="metric-item">
                <span class="text-label">上月</span>
                <span class="text-num">{{ item.last }}</span>
              </span>
            </div>
          </div>
        </div>

        <div class="map-box">
          <div class="map-caption">鞍山市</div>
          <div class="map-chart"><CityMapChart /></div>
        </div>

        <div class="side-cards">
          <div v-for="item in centerSideRight" :key="item.name" class="side-card">
            <div class="side-name">{{ item.name }}</div>
            <div class="side-metrics">
              <span class="metric-item">
                <span class="text-label">本年</span>
                <span class="text-num">{{ item.year }}</span>
              </span>
              <span class="metric-item">
                <span class="text-label">上月</span>
                <span class="text-num">{{ item.last }}</span>
              </span>
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
  display: grid;
  grid-template-columns: 1140px 1fr 1140px;
  gap: 26px;
}

.side-cards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  min-height: 0;
}

.side-card {
  border: 1px solid rgba(84, 188, 255, 0.18);
  background: rgba(6, 18, 48, 0.48);
  padding: 18px;
  min-height: 84px;
  display: grid;
  gap: 10px;
}

.side-name {
  font-size: 28px;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
  font-weight: 900;
  color: #e0f2ff;
  letter-spacing: 4px;
  text-shadow:
    0 0 4px #fff,
    0 0 12px #90d8ff,
    0 0 30px #00a6ff;
}

.side-metrics {
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  color: rgba(214, 238, 255, 0.75);
  gap: 60px; /* 两个条目之间间距 */
  align-items: center;
}
.metric-item {
  display: inline-flex;
  align-items: center;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
  font-weight: 900;
  letter-spacing: 3px;
}
/* 汉字 浅白+蓝光发光 */
.text-label {
  color: #d6ecff;
  text-shadow:
    0 0 4px #fff,
    0 0 12px #80c8ff,
    0 0 24px #0099ff;
  margin-right: 16px; /* 文字和数字中间空隙 */
}
/* 数字 金色+暖黄光效 */
.text-num {
  color: #ffdd99;
  text-shadow:
    0 0 4px #fff8cc,
    0 0 12px #ffcc66,
    0 0 24px #ffaa22;
}
.map-box {
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.map-caption {
  width: 400px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  letter-spacing: 6px;
  color: rgba(214, 238, 255, 0.9);
  background: url('@/assets/img/as.png') no-repeat center center;
  background-size: 100% 100%;
  margin: 0 auto;
}

.map-chart {
  flex: 1;
  min-height: 0;
}
</style>
