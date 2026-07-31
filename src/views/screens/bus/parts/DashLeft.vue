<script setup lang="ts">
import { computed, ref } from 'vue'
import ParkingBarChart from '../charts/ParkingBarChart.vue'
import ProgressBarChart from '../charts/ProgressBarChart.vue'
import type { BusScreenData } from '../types'

const parkingTab = ref<'ratio' | 'plan'>('ratio')
const props = defineProps<{
  data: BusScreenData
}>()

const currentParkingChart = computed(() => {
  if (parkingTab.value === 'plan') {
    return {
      xData: props.data.parkingPlanXData,
      yData: props.data.parkingPlanYData,
      unit: '个'
    }
  }

  return {
    xData: props.data.parkingRatioXData,
    yData: props.data.parkingRatioYData,
    unit: '万个'
  }
})
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
        <ParkingBarChart
          :x-data="currentParkingChart.xData"
          :y-data="currentParkingChart.yData"
          :unit="currentParkingChart.unit"
        />
      </div>
      <!-- 需求进度条 -->
      <!-- 需求模块区域 -->
      <div class="demand-wrap">
        <!-- 左侧竖排文字需求 -->
        <div class="demand-title">需求</div>
        <div class="progress-list">
          <!-- 理想水平 -->
          <div class="progress-item">
            <div class="progress-text">
              <div>理想水平</div>
              <div>(1.2车位/车)</div>
            </div>
            <div class="progress-bar">
              <ProgressBarChart :percent="data.parkingDemandIdeal" color-type="green" />
            </div>
            <div class="progress-percent">{{ data.parkingDemandIdeal }} %</div>
          </div>
          <!-- 2025目标 -->
          <div class="progress-item">
            <div class="progress-text">
              <div>2025年目标</div>
              <div>(0.6车位/车)</div>
            </div>
            <div class="progress-bar">
              <ProgressBarChart :percent="data.parkingDemandTarget" color-type="blue" />
            </div>
            <div class="progress-percent">{{ data.parkingDemandTarget }} %</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右上：本年度道路封闭预警 -->
    <div class="panel panel-road">
      <div class="panel-title">本年度道路封闭预警</div>
      <!-- 顶部统计 -->
      <div class="stat-row">
        <div class="stat-item">
          未开始 <span class="num red">{{ data.roadCloseSummary.pending }}</span
          >处
        </div>
        <div class="stat-item">
          进行中 <span class="num orange">{{ data.roadCloseSummary.processing }}</span
          >处
        </div>
        <div class="stat-item">
          已完成 <span class="num green">{{ data.roadCloseSummary.finished }}</span
          >处
        </div>
      </div>
      <!-- 道路表格 -->
      <div class="table-wrap">
        <div class="table-row head">
          <span>道路名称</span>
          <span>封闭路段</span>
          <span>起止时间</span>
        </div>
        <div class="table-row" v-for="item in data.roadCloseList" :key="item.roadName">
          <span>{{ item.roadName }}</span>
          <span>{{ item.section }}</span>
          <span>{{ item.time }}</span>
        </div>
      </div>
    </div>

    <!-- 左下：拥堵分析 -->
    <div class="panel panel-congestion">
      <div class="panel-title">拥堵分析</div>
      <!-- 拥堵统计 -->
      <div class="stat-row">
        <div class="stat-item">
          严重拥堵 <span class="num red">{{ data.congestionSummary.severe }}</span
          >处
        </div>
        <div class="stat-item">
          中度拥堵 <span class="num orange">{{ data.congestionSummary.moderate }}</span
          >处
        </div>
        <div class="stat-item">
          轻度拥堵 <span class="num yellow">{{ data.congestionSummary.light }}</span
          >处
        </div>
      </div>
      <!-- 拥堵列表 -->
      <div class="congest-list">
        <div class="congest-item" v-for="item in data.congestionList" :key="item.pos">
          <div class="warning-light-icon">🚨</div>
          <span>· 拥堵位置：{{ item.pos }}</span>
          <span
            >· 拥堵级别：<span class="level-tag">{{ item.level }}</span></span
          >
          <span>· 开始时间：{{ item.start }}</span>
          <span>· 预计缓解时间：{{ item.end }}</span>
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
/* 需求外层横向容器 */
.demand-wrap {
  display: flex;
  align-items: center;
  gap: 26px;
  margin-top: 24px;
}

/* 左侧竖排大字 需求 */
.demand-title {
  height: 252px;
  line-height: 252px;
  margin-left: 20px;
  font-size: 52px;
  border-left: 14px solid #00a8ff;
  font-weight: bold;
  color: rgba(236, 242, 255, 0.96);
  letter-spacing: 6px;
  text-shadow: 0 0 14px rgba(0, 162, 255, 0.65);
  flex-shrink: 0;
}

/* 右侧两行进度列表 */
.progress-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 42px;
}

/* 单行三栏布局：文字 + 进度条 + 百分比 */
.progress-item {
  display: grid;
  grid-template-columns: 230px 1fr 130px;
  align-items: center;
  gap: 24px;
}

/* 左侧两行描述文字 */
.progress-text {
  font-size: 38px;
  color: rgba(234, 240, 255, 0.93);
  line-height: 1.45;
}

/* 进度条容器，高度交给子组件控制 */
.progress-bar {
  width: 97%;
  height: 26px;
  margin-top: -73px;
  margin-right: -20px;
}

/* 右侧百分比发光文字 */
.progress-percent {
  width: 120px;
  font-size: 33px;
  font-weight: bold;
  color: #46e2f1;
  text-shadow: 0 0 14px rgba(70, 226, 241, 0.65);
  text-align: center;
  margin-right: 20px;
}

/* 顶部统计行 */
.stat-row {
  display: flex;
  gap: 60px;
  margin-bottom: 20px;
  font-size: 34px;
  /* 新增居中 */
  justify-content: center;
  width: 100%;
  margin-top: 80px;
  margin-bottom: 60px;
}
.num {
  font-size: 48px;
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
/* 拥堵分析列表容器 */
.congest-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px; /* 缩小行间距，原来12px→8px */
}

/* 单行布局：压缩图标列宽度，放大字体 */
.congest-item {
  display: grid;
  grid-template-columns: 48px 1fr 1fr 1fr 1fr; /* 图标列60→48px缩小 */
  align-items: center;
  padding: 62px 16px; /* 缩小上下内边距 */
  background: rgba(4, 22, 60, 0.55);
  border: 1px solid rgba(80, 180, 255, 0.16);
  font-size: 32px; /* 文字放大 26→32px */
  color: rgba(220, 240, 255, 0.9);
  gap: 10px; /* 列之间间距缩小 */
}

/* 缩小CSS警灯尺寸 */
.warning-light-icon {
  width: 46px;
  height: 46px;
  margin: 0 auto;
  position: relative;
  filter: drop-shadow(0 0 8px rgba(255, 50, 50, 0.7));
}

/* 高亮文字同步放大 */
.level-tag {
  font-weight: bold;
  font-size: 34px;
  color: #ffdd22;
  text-shadow: 0 0 8px rgba(255, 220, 34, 0.5);
}
</style>
