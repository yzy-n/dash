<template>
  <div class="center-shell">
    <div class="main">
      <!-- 左侧面板：诉求统计+热线数据+热点问题 -->
      <section class="panel panel--left">
        <div class="panel-title">诉求统计</div>
        <div class="left-block-wrap">
          <!-- 时间筛选标签 -->
          <div class="time-tabs">
            <div class="time-tab time-tab--active">本年</div>
            <div class="time-tab">本月</div>
            <div class="time-tab">本周</div>
            <div class="time-tab">本日</div>
          </div>
          <!-- 诉求统计指标 -->
          <div class="stat-grid">
            <div class="stat-item">
              <div class="stat-icon stat-icon--user"></div>
              <div class="stat-text">诉求人数</div>
              <div class="stat-val">114024人</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon stat-icon--doc"></div>
              <div class="stat-text">已受理数量</div>
              <div class="stat-val">201471件</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon stat-icon--process"></div>
              <div class="stat-text">办理中数量</div>
              <div class="stat-val">4142件</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon stat-icon--finish"></div>
              <div class="stat-text">已办结数量</div>
              <div class="stat-val">197501件</div>
            </div>
          </div>
          <div class="sub-title">热线数据</div>
          <div class="time-tabs">
            <div class="time-tab">年</div>
            <div class="time-tab">季</div>
            <div class="time-tab">月</div>
            <div class="time-tab">周</div>
            <div class="time-tab time-tab--active">日</div>
          </div>
          <div class="stat-grid stat-grid--col2">
            <div class="stat-item">
              <div class="stat-icon stat-icon--callin"></div>
              <div class="stat-text">呼入量</div>
              <div class="stat-val">185414个</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon stat-icon--pickup"></div>
              <div class="stat-text">接通量</div>
              <div class="stat-val">182992个</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon stat-icon--rate1"></div>
              <div class="stat-text">接通率</div>
              <div class="stat-val">98.69%</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon stat-icon--rate2"></div>
              <div class="stat-text">直接答复率</div>
              <div class="stat-val">80.27%</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon stat-icon--eval"></div>
              <div class="stat-text">评价率</div>
              <div class="stat-val">39.83%</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon stat-icon--good"></div>
              <div class="stat-text">好评率</div>
              <div class="stat-val">98.2%</div>
            </div>
          </div>
          <div class="sub-title">热点问题</div>
          <div class="hot-table">
            <div class="hot-table-head">
              <span>时间</span>
              <span>热点数量(今)</span>
              <span>热点问题(今)</span>
              <span>热点问题(前)</span>
              <span>热点数量(前)</span>
            </div>
            <div class="hot-table-row">
              <span>年</span>
              <span>11960</span>
              <span>故障维修</span>
              <span>隔离要求</span>
              <span>433586</span>
            </div>
            <div class="hot-table-row">
              <span>季</span>
              <span>2763</span>
              <span>参保缴费</span>
              <span>供暖报修</span>
              <span>16300</span>
            </div>
            <div class="hot-table-row">
              <span>月</span>
              <span>598</span>
              <span>物业维修服务</span>
              <span>参保缴费</span>
              <span>2374</span>
            </div>
            <div class="hot-table-row">
              <span>周</span>
              <span>567</span>
              <span>物业维修服务</span>
              <span>物业维修服务</span>
              <span>112</span>
            </div>
          </div>
        </div>
      </section>
      <section class="panel panel--map">
        <!--地图上方悬浮小卡片 -->
        <div class="map-top-cards">
          <div class="map-card-group">
            <div class="map-card">
              <div class="map-card-label">当日受理量</div>
              <div class="map-card-num">600</div>
            </div>
            <div class="map-card">
              <div class="map-card-label"></div>
              <div class="map-card-num">231</div>
            </div>
          </div>
          <div class="map-card-group map-card-group--center">
            <div class="map-card map-card--big">
              <div class="map-card-label">诉求总量</div>
              <div class="map-card-num">3394204</div>
            </div>
            <div class="map-card map-card--mid">
              <div class="map-card-label">铁东区</div>
              <div class="map-card-num">1037667</div>
            </div>
          </div>
          <div class="map-card-group">
            <div class="map-card">
              <div class="map-card-label">当日办结量</div>
              <div class="map-card-num">492</div>
            </div>
            <div class="map-card">
              <div class="map-card-label"></div>
              <div class="map-card-num">192</div>
            </div>
          </div>
        </div>
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
      <!--右侧面板：效能分析 + 回访情况 完整还原截图 -->
      <section class="panel panel--right">
        <div class="panel-title">效能分析</div>
        <div class="right-block-wrap">
          <!--效能分析列表 -->
          <div class="effect-wrap">
            <div class="effect-item">
              <div class="effect-icon">%</div>
              <div class="effect-name">满意率</div>
              <div class="effect-value">93.25%</div>
            </div>
            <div class="effect-item">
              <div class="effect-icon">💬</div>
              <div class="effect-name">办结率</div>
              <div class="effect-value">84.55%</div>
            </div>
            <div class="effect-item">
              <div class="effect-icon">💓</div>
              <div class="effect-name">有效回访率</div>
              <div class="effect-value">99.71%</div>
            </div>
            <div class="effect-item">
              <div class="effect-icon">☺</div>
              <div class="effect-name">即时分转率</div>
              <div class="effect-value">83.43%</div>
            </div>
            <div class="effect-item">
              <div class="effect-icon">📞</div>
              <div class="effect-name">办件时长</div>
              <div class="effect-value">5.36天</div>
            </div>
          </div>

          <div class="sub-title">回访情况</div>
          <!--上方4个环形指标卡片 -->
          <div class="visit-top-cards">
            <div class="visit-card">
              <div class="visit-circle">
                <div class="visit-num">27490件</div>
              </div>
              <div class="visit-text">满意</div>
            </div>
            <div class="visit-card">
              <div class="visit-circle">
                <div class="visit-num">5196件</div>
              </div>
              <div class="visit-text">理解</div>
            </div>
            <div class="visit-card">
              <div class="visit-circle">
                <div class="visit-num">2428件</div>
              </div>
              <div class="visit-text">不满意</div>
            </div>
            <div class="visit-card">
              <div class="visit-circle">
                <div class="visit-num">2379件</div>
              </div>
              <div class="visit-text">其他</div>
            </div>
          </div>
          <div class="sub-title sub-small">综合满意率占比</div>
          <!-- 甜甜圈饼图 -->
          <div class="pie-chart-wrap">
            <PieChart />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip, Legend } from 'echarts/components'
import CityMapChart from '../charts/CityMapChart.vue'
import PieChart from '../charts/pie.vue'
import type { GridInfoRow } from '../types'
const selectedAreaName = ref('铁东区')
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
  min-height: 0;
}
.main {
  min-height: 0;
  display: grid;
  grid-template-columns: 620px minmax(1px, 1fr) 620px;
  grid-template-rows: minmax(1px, 1fr);
  gap: 20px;
  width: 100%;
  height: 100%;
}
.panel {
  position: relative;
  overflow: hidden;
  color: rgba(214, 238, 255, 0.86);
  box-sizing: border-box;
  min-height: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.panel-title {
  position: absolute;
  left: 24px;
  top: 32px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  font-size: 30px;
  transform: skewX(-12deg);
  font-weight: 700;
  letter-spacing: 1px;
  color: #ffffff;
  z-index: 2;
}
.panel--map {
  padding: 0;
  position: relative;
  background: transparent;
  border: none;
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
/* =========地图上方悬浮卡片========= */
.map-top-cards {
  position: absolute;
  top: 24px;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
}
.map-card-group {
  display: grid;
  gap: 12px;
}
.map-card-group--center {
  text-align: center;
}
.map-card {
  min-width: 140px;
  padding: 6px 10px;
  background: rgba(8, 24, 60, 0.65);
  border: 1px solid rgba(80, 170, 255, 0.25);
  border-radius: 6px;
}
.map-card--big {
  min-width: 280px;
  padding: 10px;
}
.map-card--mid {
  margin-top: 10px;
  min-width: 200px;
}
.map-card-label {
  font-size: 15px;
  color: #82c8ff;
  text-align: center;
}
.map-card-num {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  text-align: center;
}
/* 左侧斜切透视面板 */
.panel--left {
  padding: 70px 24px 24px;
  transform: perspective(1600px) rotateY(16deg);
  transform-origin: right center;
  backface-visibility: hidden;
  background: linear-gradient(180deg, rgba(14, 42, 92, 0.6), rgba(8, 22, 54, 0.45));
  border: 1px solid rgba(74, 174, 255, 0.24);
  clip-path: polygon(0 0, 100px 0, 100% 30px, 100% 100%, 0 calc(100% - 30px));
}
.left-block-wrap {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  margin-top: 40px;
}
.time-tabs {
  display: flex;
  gap: 6px;
}
.time-tab {
  padding: 3px 12px;
  font-size: 30px;
  color: rgba(160, 200, 240, 0.7);
  border: 1px solid rgba(84, 188, 255, 0.18);
  border-radius: 4px;
  background: rgba(10, 30, 65, 0.4);
}
.time-tab--active {
  color: #fff;
  border-color: rgba(70, 170, 255, 0.35);
  background: rgba(22, 70, 140, 0.55);
}
.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.stat-grid--col2 {
  grid-template-columns: 1fr 1fr;
}
.stat-item {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 8px;
  align-items: center;
  border: 1px solid rgba(84, 188, 255, 0.15);
  background: rgba(8, 22, 52, 0.45);
  border-radius: 8px;
  padding: 8px 10px;
}
.stat-icon {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid rgba(80, 180, 255, 0.22);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.2), transparent);
}
.stat-text {
  font-size: 15px;
  color: rgba(180, 210, 240, 0.75);
}
.stat-val {
  grid-column: 2;
  font-size: 20px;
  font-weight: bold;
  color: #ffdd66;
}
.sub-title {
  font-size: 20px;
  font-weight: bold;
  color: #e8f4ff;
  margin-top: 4px;
  letter-spacing: 1px;
}
.sub-small {
  font-size: 17px;
  text-align: center;
}
.hot-table {
  border: 1px solid rgba(84, 188, 255, 0.15);
  border-radius: 8px;
  overflow: hidden;
  flex: 1;
  min-height: 120px;
  display: grid;
  grid-template-rows: auto repeat(4, minmax(1px, 1fr));
}
.hot-table-head {
  display: grid;
  grid-template-columns: 50px 130px 1fr 1fr 90px;
  padding: 6px 8px;
  background: rgba(14, 40, 85, 0.45);
  font-size: 20px;
  color: #82c8ff;
  align-items: center;
}
.hot-table-row {
  display: grid;
  grid-template-columns: 50px 90px 1fr 1fr 90px;
  padding: 6px 8px;
  font-size: 24px;
  color: rgba(214, 238, 255, 0.78);
  border-bottom: 1px solid rgba(84, 188, 255, 0.1);
  align-items: center;
}
.hot-table-row:last-child {
  border-bottom: none;
}
/* 右侧斜切透视面板 */
.panel--right {
  padding: 70px 24px 24px;
  transform: perspective(1600px) rotateY(-16deg);
  transform-origin: left center;
  backface-visibility: hidden;
  background: linear-gradient(180deg, rgba(14, 42, 92, 0.6), rgba(8, 22, 54, 0.45));
  border: 1px solid rgba(74, 174, 255, 0.24);
  clip-path: polygon(100px 0, 100% 0, 100% calc(100% - 30px), 0 100%, 0 30px);
}
.right-block-wrap {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  margin-top: 40px;
}
/* 效能分析列表 */
.effect-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.effect-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  background: rgba(20, 50, 100, 0.4);
  border: 1px solid rgba(80, 170, 255, 0.22);
  border-radius: 6px;
}
.effect-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(80, 170, 255, 0.3);
  border-radius: 4px;
  color: #42c8ff;
  font-size: 18px;
  margin-right: 14px;
}
.effect-name {
  flex: 1;
  font-size: 20px;
  color: #e8f4ff;
}
.effect-value {
  font-size: 24px;
  font-weight: bold;
  color: #ffdd66;
}
/* 回访顶部4卡片 */
.visit-top-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.visit-card {
  text-align: center;
}
.visit-circle {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: 2px solid rgba(80, 170, 255, 0.35);
  box-shadow: 0 0 12px rgba(60, 160, 255, 0.2) inset;
  display: flex;
  align-items: center;
  justify-content: center;
}
.visit-num {
  font-size: 15px;
  font-weight: bold;
  color: #ffdd66;
}
.visit-text {
  margin-top: 8px;
  font-size: 16px;
  color: #82c8ff;
}
.pie-chart-wrap {
  width: 100%;
  flex: 1;
  min-height: 240px;
}
.map-base {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 60px;
  height: 220px;
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
}
.map-ring--a {
  width: 460px;
  height: 460px;
}
.map-ring--b {
  width: 370px;
  height: 370px;
}
.map-ring--c {
  width: 280px;
  height: 280px;
}
</style>
