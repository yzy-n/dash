<template>
  <aside class="left">
    <!-- 1 最新诉求 -->
    <section class="panel panel--electric">
      <div class="panel-head">
        <div class="panel-title">最新诉求</div>
      </div>
      <div class="capacity-body">
        <div class="demand-list">
          <!--表头 -->
          <div class="demand-header">
            <div class="dh-col">事件名称</div>
            <div class="dh-col">诉求时间</div>
          </div>
          <div v-for="(item, idx) in latestDemandList" :key="idx" class="demand-item">
            <div class="dh-col demand-name">{{ item.name }}</div>
            <div class="dh-col demand-time">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </section>
    <!-- 2 近12月诉求量趋势 -->
    <section class="panel panel--capacity">
      <div class="panel-head">
        <div class="panel-title">近12月诉求量趋势</div>
      </div>
      <div class="capacity-body">
        <div class="capacity-chart">
          <EChart :option="demandTrendOption" />
        </div>
      </div>
    </section>
    <!--3 年度诉求数量分析 -->
    <section class="panel panel--pop-state">
      <div class="panel-head">
        <div class="panel-title">年度诉求数量分析</div>
      </div>
      <div class="capacity-body">
        <div class="capacity-chart">
          <EChart :option="yearDemandBarOption" />
        </div>
      </div>
    </section>
    <!--4 诉求类型分析 -->
    <section class="panel panel--pile">
      <div class="panel-head">
        <div class="panel-title">诉求类型分析</div>
      </div>
      <div class="capacity-body">
        <div class="demand-type-wrap">
          <div v-for="(item, idx) in demandTypeList" :key="idx" class="demand-type-item">
            <div class="demand-type-icon">
              <div class="icon-circle"></div>
            </div>
            <div class="demand-type-percent">{{ item.percent }}</div>
            <div class="demand-type-label">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </section>
    <!--5 渠道来源 -->
    <section class="panel panel--resume">
      <div class="panel-head">
        <div class="panel-title">渠道来源</div>
      </div>
      <div class="capacity-body">
        <div class="channel-list">
          <div v-for="(item, idx) in channelSourceList" :key="idx" class="channel-item">
            <div class="channel-index">{{ item.no }}</div>
            <div class="channel-name">{{ item.name }}</div>
            <div class="channel-count">{{ item.count }}</div>
          </div>
        </div>
      </div>
    </section>
    <!--6 近12月疑难工单 -->
    <section class="panel panel--steel">
      <div class="panel-head">
        <div class="panel-title">近12月疑难工单</div>
        <div class="work-stat">
          处理中:<span class="num">4473</span>件 已办结:<span class="num">8</span>件
        </div>
      </div>
      <div class="capacity-body">
        <div class="hard-work-list">
          <div class="hard-work-header">
            <div class="hw-col">诉求时间</div>
            <div class="hw-col">事件名称</div>
          </div>
          <div v-for="(item, idx) in hardWorkOrderList" :key="idx" class="hard-work-row">
            <div class="hw-col">{{ item.time }}</div>
            <div class="hw-col">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </section>
  </aside>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import {
  getAskList,
  getDemandTypeList as getDemandTypeListApi,
  getYearTrendList as getYearTrendListApi,
  getAppealTypeAnalysisList as getAppealTypeAnalysisListApi,
  getChannelSourceList as getChannelSourceListApi,
  getHardWorkOrderList as getHardWorkOrderListApi
} from '@/api/ask'
// 最新诉求列表
const latestDemandList = ref([])
onMounted(() => {
  getLatestDemandList()
  fetchDemandTrend()
  fetchYearTrend()
  fetchDemandTypeList()
  fetchChannelSourceList()
  fetchHardWorkOrderList()
})
const getLatestDemandList = () => {
  getAskList().then((res) => {
    latestDemandList.value = res.dataList.map((item) => ({
      name: item.appealName,
      time: item.appealTime
    }))
    console.log(latestDemandList.value)
  })
}
//诉求类型分析
const demandTypeList = ref([])
const fetchDemandTypeList = () => {
  getAppealTypeAnalysisListApi().then((res: any) => {
    demandTypeList.value = res.dataList.map((item) => ({
      label: item.typeName,
      percent: item.ratio
    }))
  })
}
//渠道来源
const channelSourceList = ref([])
const fetchChannelSourceList = () => {
  getChannelSourceListApi().then((res: any) => {
    channelSourceList.value = res.dataList.map((item) => ({
      no: item.channelNo,
      name: item.channelName,
      count: item.num
    }))
  })
}
//疑难工单
const hardWorkOrderList = ref([])
const fetchHardWorkOrderList = () => {
  getHardWorkOrderListApi().then((res: any) => {
    hardWorkOrderList.value = res.dataList.map((item) => ({
      time: item.appealTime,
      name: item.appealName
    }))
  })
}

const demandTrendList = ref<Array<{ date?: string; num?: number }>>([])

const fetchDemandTrend = () => {
  getDemandTypeListApi().then((res: any) => {
    demandTrendList.value = res.dataList
  })
}
//近12月诉求量趋势 折线面积图
const demandTrendOption = computed(() => {
  const rows = demandTrendList.value
  const normalized = rows
    .map((item) => {
      const date = String(item?.date ?? '').trim()
      const num = Number(item?.num)
      if (!date) return null
      return { date, num: Number.isFinite(num) ? num : 0 }
    })
    .filter(Boolean) as Array<{ date: string; num: number }>

  normalized.sort((a, b) => a.date.localeCompare(b.date))

  const source = normalized.length
    ? normalized
    : [
        { date: '2022-04', num: 124000 },
        { date: '2022-05', num: 134000 },
        { date: '2022-06', num: 110000 },
        { date: '2022-07', num: 109210 },
        { date: '2022-08', num: 122000 },
        { date: '2022-09', num: 172010 },
        { date: '2022-10', num: 150000 },
        { date: '2022-11', num: 90000 },
        { date: '2022-12', num: 70000 },
        { date: '2023-01', num: 53132 },
        { date: '2023-02', num: 50186 },
        { date: '2023-03', num: 62000 }
      ]

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 50, right: 20, top: 30, bottom: 60 },
    dataset: {
      source
    },
    xAxis: {
      type: 'category',
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 20, rotate: 35 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位：件',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '数量',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(54, 232, 255,0.45)' },
              { offset: 1, color: 'rgba(54, 232, 255,0.03)' }
            ]
          }
        },
        lineStyle: { color: '#36e8ff', width: 2 },
        itemStyle: { color: '#36e8ff' },
        encode: { x: 'date', y: 'num' }
      }
    ]
  }
})
//年度诉求数量分析 横向柱状
const yearTrendList = ref([])
const fetchYearTrend = () => {
  getYearTrendListApi().then((res: any) => {
    yearTrendList.value = res.dataList.map((item) => ({
      name: item.year,
      value: item.num
    }))
  })
}
const yearDemandBarOption = computed(() => {
  const source = yearTrendList.value
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      textStyle: { color: 'rgba(240,251,255,0.9)' }
    },
    grid: { left: 90, right: 30, top: 20, bottom: 40 },
    dataset: {
      source
    },
    xAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214,238,255,0.55)', fontSize: 20 },
      splitLine: { lineStyle: { color: 'rgba(120,220,255,0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'category',
      axisLabel: { color: 'rgba(214,238,255,0.75)', fontSize: 20 },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        type: 'bar',
        barWidth: 50,
        encode: { x: 'value', y: 'name' },
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: 'rgba(24,130,255,0.2)' },
              { offset: 1, color: 'rgba(54, 232, 255,0.95)' }
            ]
          }
        }
      }
    ]
  }
})
</script>
<style scoped>
.left {
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 26px;
}
.panel {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 118px 26px 22px;
  background:
    linear-gradient(180deg, rgba(6, 27, 72, 0.6), rgba(4, 16, 44, 0.6)),
    url('@/assets/img/leftBg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  border: 1px solid rgba(84, 188, 255, 0.22);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  box-sizing: border-box;
  min-height: 0;
}
.panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}
.panel-head {
  position: absolute;
  left: 26px;
  right: 26px;
  top: 18px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.panel-title {
  height: 54px;
  display: inline-flex;
  align-items: center;
  font-size: 34px;
  font-style: italic;
  transform: skewX(-10deg);
  font-weight: 800;
  margin-top: -15px;
  margin-left: 35px;
  letter-spacing: 2px;
  color: #f8fbff;
  text-shadow:
    -2px -2px 3px rgba(255, 255, 255, 0.7),
    2px 2px 4px rgba(0, 20, 60, 0.5),
    0 0 6px #90c4ff,
    0 0 14px #3b8fff,
    0 0 24px #0f58d1;
}
.work-stat {
  font-size: 18px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.75);
}
.work-stat .num {
  color: #36e8ff;
  text-shadow: 0 0 8px rgba(54, 232, 255, 0.2);
}
.capacity-body {
  height: 100%;
  min-height: 0;
}
.capacity-chart {
  height: 100%;
  min-height: 0;
}
/*最新诉求列表 参照截图样式，带表头，双列布局*/
.demand-list {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.demand-header {
  display: grid;
  grid-template-columns: 1fr 220px;
  padding: 10px 14px;
  background: rgba(14, 40, 85, 0.4);
  border-radius: 8px 8px 0 0;
}
.demand-item {
  display: grid;
  grid-template-columns: 1fr 220px;
  align-items: center;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.3);
  margin-top: 30px;
}
.dh-col {
  font-size: 30px;
  color: rgba(214, 238, 255, 0.78);
}
.demand-header .dh-col {
  color: #54e8ff;
  font-weight: bold;
}
.demand-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 12px;
}
.demand-time {
  color: #ffdd44;
  font-weight: bold;
  text-align: right;
}

/* ========== 诉求类型分析 完全对齐截图，占满容器高度 ========== */
.demand-type-wrap {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.demand-type-item {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid rgba(70, 160, 255, 0.25);
  border-radius: 10px;
  background: rgba(8, 22, 52, 0.45);
  position: relative;
  /*四角小点模拟大屏边框效果*/
}
.demand-type-item::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 6px;
  width: 4px;
  height: 4px;
  background: #82c8ff;
  border-radius: 50%;
}
.demand-type-item::after {
  content: '';
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 4px;
  height: 4px;
  background: #82c8ff;
  border-radius: 50%;
}
.demand-type-item .demand-type-icon {
  position: relative;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/*模拟截图里面的双层圆环底座*/
.demand-type-item .icon-circle {
  width: 72px;
  height: 72px;
  border: 1px solid rgba(100, 190, 255, 0.35);
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 12px rgba(40, 140, 255, 0.15);
}
.demand-type-item .icon-circle::before {
  content: '';
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(100, 190, 255, 0.22);
  border-radius: 50%;
}
.demand-type-item .icon-circle::after {
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  background: rgba(160, 220, 255, 0.65);
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #72d0ff;
}
/*百分比金色大字，和截图一致*/
.demand-type-percent {
  font-size: 42px;
  font-weight: bold;
  color: #ffd454;
  text-shadow: 0 0 10px rgba(255, 200, 60, 0.35);
}
/*底部白色标签*/
.demand-type-label {
  font-size: 26px;
  font-weight: bold;
  color: #ffffff;
}

/*渠道来源列表*/
.channel-list {
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  display: grid;
  gap: 10px;
  align-content: flex-start;
}
.channel-item {
  display: grid;
  grid-template-columns: 40px 1fr 120px;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid rgba(89, 194, 255, 0.14);
  border-radius: 10px;
  background: rgba(6, 18, 48, 0.3);
  margin-top: 20px;
}
.channel-index {
  font-size: 30px;
  color: rgba(214, 238, 255, 0.65);
}
.channel-name {
  font-size: 30px;
  color: rgba(214, 238, 255, 0.82);
}
.channel-count {
  font-size: 30px;
  color: #36e8ff;
  text-align: right;
}
/*疑难工单*/
.hard-work-list {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.hard-work-header {
  display: grid;
  grid-template-columns: 200px 1fr;
  padding: 10px 12px;
  background: rgba(14, 40, 85, 0.4);
  border-radius: 8px 8px 0 0;
}
.hard-work-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(89, 194, 255, 0.12);
  margin-top: 20px;
}
.hw-col {
  font-size: 30px;
  color: rgba(214, 238, 255, 0.78);
}
.hard-work-header .hw-col {
  color: #54e8ff;
  font-weight: bold;
}
</style>
