<script setup lang="ts">
import { ref } from 'vue'

// 标签切换
const parkingTab = ref<'ratio' | 'plan'>('ratio')

// 道路封闭预警数据
const roadCloseList = [
  { roadName: '真理街', section: '真理', time: '05/04-05/11' },
  { roadName: '东工人街', section: '人街与石东街交叉口-东工人街与石东街', time: '04/17-04/21' },
  { roadName: '大石街', section: '大石街德馨医院门前-大石街', time: '04/10-04/14' },
  { roadName: '湖南街', section: '南8西-湖南街嘉宝家园湖南8西', time: '04/10-04/14' }
]

// 拥堵分析数据
const congestionList = [
  { pos: '第九中学', level: '轻度拥堵', start: '2023-04-08 17:32', end: '2023-04-08 17:42' },
  { pos: '联营公司', level: '轻度拥堵', start: '2023-04-08 17:32', end: '2023-04-08 17:42' },
  { pos: '曙光路南口', level: '轻度拥堵', start: '2023-04-08 17:32', end: '2023-04-08 17:42' }
]
</script>

<template>
  <div class="traffic-wrapper">
    <!-- 左上：城区停车场现状分析 -->
    <div class="panel panel-parking">
      <div class="panel-title">城区停车场现状分析</div>
      <!-- Tab切换 -->
      <div class="tabs">
        <button
          class="tab"
          :class="{ 'tab--active': parkingTab === 'ratio' }"
          @click="parkingTab = 'ratio'"
        >
          停车位比例
        </button>
        <button
          class="tab"
          :class="{ 'tab--active': parkingTab === 'plan' }"
          @click="parkingTab = 'plan'"
        >
          停车位规划
        </button>
      </div>
      <!-- 柱状图区域 -->
      <div class="chart-box">
        <div class="chart-tip">单位：万个</div>
        <!-- 模拟柱状图区域，可替换ECharts -->
        <div class="bar-chart-demo">
          <div class="bar-item">
            <div class="bar" style="height: 180px"></div>
            <span class="bar-label">总计</span>
          </div>
          <div class="bar-item">
            <div class="bar" style="height: 160px"></div>
            <span class="bar-label">配建停车位(住宅类)</span>
          </div>
          <div class="bar-item">
            <div class="bar" style="height: 80px"></div>
            <span class="bar-label">配建停车位(非住宅类)</span>
          </div>
          <div class="bar-item">
            <div class="bar" style="height: 40px"></div>
            <span class="bar-label">路内停车位</span>
          </div>
          <div class="bar-item">
            <div class="bar" style="height: 20px"></div>
            <span class="bar-label">路外公共停车位</span>
            <div class="hover-tip">路外公共停车位<br />数量 : 0.2</div>
          </div>
        </div>
      </div>
      <!-- 需求进度条 -->
      <div class="demand-wrap">
        <div class="demand-title">需求</div>
        <div class="progress-item">
          <div class="progress-label">
            <span>理想水平(1.2车位/车)</span>
            <span>38.8 %</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill green" style="width: 38.8%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>2025年目标(0.6车位/车)</span>
            <span>77.6 %</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill blue" style="width: 77.6%"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右上：本年度道路封闭预警 -->
    <div class="panel panel-road">
      <div class="panel-title">本年度道路封闭预警</div>
      <!-- 顶部统计 -->
      <div class="stat-row">
        <div class="stat-item">未开始 <span class="num red">249</span>处</div>
        <div class="stat-item">进行中 <span class="num orange">125</span>处</div>
        <div class="stat-item">已完成 <span class="num green">110</span>处</div>
      </div>
      <!-- 道路表格 -->
      <div class="table-wrap">
        <div class="table-row head">
          <span>道路名称</span>
          <span>封闭路段</span>
          <span>起止时间</span>
        </div>
        <div class="table-row" v-for="item in roadCloseList" :key="item.roadName">
          <span>{{ item.roadName }}</span>
          <span>{{ item.section }}</span>
          <span>{{ item.time }}</span>
        </div>
      </div>
    </div>

    <!-- 左下：拥堵分析 -->
    <div class="panel panel-congestion">
      <div class="panel-title">拥堵分析</div>
      <div class="sub-tab">拥堵分析统计</div>
      <!-- 拥堵统计 -->
      <div class="stat-row">
        <div class="stat-item">严重拥堵 <span class="num red">30</span>处</div>
        <div class="stat-item">中度拥堵 <span class="num orange">15</span>处</div>
        <div class="stat-item">轻度拥堵 <span class="num yellow">22</span>处</div>
      </div>
      <!-- 拥堵列表 -->
      <div class="congest-list">
        <div class="congest-item" v-for="item in congestionList" :key="item.pos">
          <span>拥堵位置：{{ item.pos }}</span>
          <span
            >拥堵级别：<span class="light-yellow">{{ item.level }}</span></span
          >
          <span>开始时间：{{ item.start }}</span>
          <span>预计缓解时间：{{ item.end }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 全局外层容器布局 2行2列网格 */
.traffic-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 24px;
  padding: 16px;
  box-sizing: border-box;
}

/* 面板通用样式 与你左侧大屏视觉统一 */
.panel {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  padding: 90px 30px 30px;
  background: url('@/assets/img/leftBg.png') no-repeat center center;
  background-size: 100% 100%;
  border: 1px solid rgba(90, 200, 255, 0.18);
  color: rgba(214, 238, 255, 0.84);
  display: flex;
  flex-direction: column;
}

.panel-parking {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}
.panel-road {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}
.panel-congestion {
  grid-row: 2 / 3;
  grid-column: 1 / 3;
}

/* 面板标题 复用你原有样式 */
.panel-title {
  position: absolute;
  top: 0px;
  left: 2px;
  height: 76px;
  min-width: 430px;
  padding: 0 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', sans-serif;
  font-style: italic;
  font-weight: 700;
  letter-spacing: 2px;
  color: rgba(240, 251, 255, 0.96);
  text-shadow:
    0 0 8px rgba(120, 220, 255, 0.85),
    0 0 18px rgba(0, 164, 255, 0.55);
}

/* Tab标签样式 完全复用左侧 */
.tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 18px;
  margin: 6px 0 18px;
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
.tab--active {
  color: #eaf4ff;
  opacity: 1;
  filter: drop-shadow(0 0 10px rgba(54, 232, 255, 0.28));
}

/* 柱状图模拟区域（实际替换ECharts容器） */
.chart-box {
  flex: 1;
  position: relative;
}
.chart-tip {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;
  color: rgba(214, 238, 255, 0.6);
}
.bar-chart-demo {
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding-top: 30px;
  box-sizing: border-box;
}
.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 60px;
  position: relative;
}
.bar {
  width: 36px;
  background: linear-gradient(to top, #ffaa00, #fff266);
  border-radius: 4px 4px 0 0;
}
.bar-label {
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
}
.hover-tip {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(6, 18, 48, 0.9);
  border: 1px solid rgba(89, 194, 255, 0.12);
  padding: 6px 10px;
  font-size: 14px;
  white-space: nowrap;
}

/* 需求进度条 */
.demand-wrap {
  margin-top: 20px;
}
.demand-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
  border-left: 4px solid #00a8ff;
  padding-left: 10px;
}
.progress-item {
  margin-bottom: 14px;
}
.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 6px;
}
.progress-bar {
  width: 100%;
  height: 24px;
  background: rgba(0, 30, 70, 0.6);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(90, 200, 255, 0.15);
}
.progress-fill {
  height: 100%;
  transition: width 0.6s ease;
}
.progress-fill.green {
  background: linear-gradient(90deg, #00b894, #00e0b0);
}
.progress-fill.blue {
  background: linear-gradient(90deg, #0099dd, #36e8ff);
}

/* 顶部统计行 */
.stat-row {
  display: flex;
  gap: 60px;
  margin-bottom: 20px;
  font-size: 24px;
}
.num {
  font-size: 28px;
  font-weight: bold;
  margin-left: 6px;
}
.num.red {
  color: #ff4444;
  text-shadow: 0 0 8px #ff444480;
}
.num.orange {
  color: #ff9922;
  text-shadow: 0 0 8px #ff992280;
}
.num.green {
  color: #33dd77;
  text-shadow: 0 0 8px #33dd7780;
}
.num.yellow {
  color: #ffdd22;
  text-shadow: 0 0 8px #ffdd2280;
}

/* 表格通用 */
.table-wrap {
  flex: 1;
  display: grid;
  gap: 10px;
}
.table-row {
  display: grid;
  grid-template-columns: 1fr 1.6fr 0.8fr;
  align-items: center;
  padding: 12px 14px;
  background: rgba(6, 18, 48, 0.58);
  border: 1px solid rgba(89, 194, 255, 0.12);
  font-size: 18px;
}
.table-row.head {
  background: rgba(20, 30, 75, 0.55);
  font-weight: bold;
  color: rgba(234, 240, 255, 0.95);
}

/* 拥堵分析 */
.sub-tab {
  font-size: 22px;
  margin-bottom: 12px;
  padding-left: 10px;
  border-left: 4px solid #00a8ff;
}
.congest-list {
  flex: 1;
  display: grid;
  gap: 10px;
}
.congest-item {
  display: flex;
  gap: 30px;
  padding: 12px 14px;
  background: rgba(6, 18, 48, 0.58);
  border: 1px solid rgba(89, 194, 255, 0.12);
  font-size: 18px;
}
.light-yellow {
  color: #ffdd22;
  font-weight: bold;
}
</style>
