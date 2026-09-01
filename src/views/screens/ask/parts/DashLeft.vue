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
          <div v-for="item in demandTypeList" :key="item.key" class="demand-type-item">
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
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
// 最新诉求列表
const latestDemandList = [
  { name: '无具体诉求', time: '2023-04-08' },
  { name: '查询工单', time: '2023-04-08' },
  { name: '查询立山区太平自来水维修所电话', time: '2023-04-08' },
  { name: '网络消费售后问题', time: '2023-04-08' },
  { name: '海城市感王镇政府退休职工煤火费发放问题', time: '2023-04-08' },
  { name: '鞍山市滴滴快车物品遗失问题', time: '2023-04-08' }
]
//诉求类型分析
const demandTypeList = [
  { key: 'consult', label: '咨询类', percent: '39.97%' },
  { key: 'complain', label: '投诉类', percent: '59.26%' },
  { key: 'advise', label: '意见建议类', percent: '0.77%' }
]
//渠道来源
const channelSourceList = [
  { no: 1, name: '无具体诉求', count: '1609件' },
  { no: 2, name: '查询工单', count: '1609件' },
  { no: 3, name: '省12345', count: '1609件' },
  { no: 4, name: '辽事通', count: '1395件' },
  { no: 5, name: '政务服务网', count: '1164件' },
  { no: 6, name: 'In12345微信', count: '531件' },
  { no: 7, name: '市民网(市长信箱)', count: '525件' },
  { no: 8, name: '供暖直通车', count: '214件' },
  { no: 9, name: '首长信箱', count: '160件' }
]
//疑难工单
const hardWorkOrderList = [
  { time: '2023-01-10', name: '夜晚噪音扰民' },
  { time: '2023-01-10', name: '海城市析木镇盛世家园金池小区安全通道被害…' },
  { time: '2023-01-11', name: '铁东区南中华路旧改后电线问题' },
  { time: '2023-01-12', name: '海城市王石镇代千村圣源山庄11号楼供暖温度…' },
  { time: '2023-01-12', name: '立山区灵山村宏福小区126栋井盖松动问题' },
  { time: '2023-01-16', name: '【人民网市委书记留言板】临时电缆重大安全…' },
  { time: '2023-01-18', name: '铁西区九道街510栋1单元下水井堵塞问题' }
]
//近12月诉求量趋势 折线面积图
const demandTrendOption = computed(() => {
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
    xAxis: {
      type: 'category',
      data: [
        '2022‑04',
        '2022‑05',
        '2022‑06',
        '2022‑07',
        '2022‑08',
        '2022‑09',
        '2022‑10',
        '2022‑11',
        '2022‑12',
        '2023‑01',
        '2023‑02',
        '2023‑03',
        '2023‑04'
      ],
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
        data: [
          124000, 134000, 110000, 109210, 122000, 172010, 150000, 90000, 70000, 53132, 50186, 62000
        ]
      }
    ]
  }
})
//年度诉求数量分析 横向柱状
const yearDemandBarOption = computed(() => {
  const xData = [38515, 8370, 7525, 70080, 33892, 28264, 4825, 7676, 5399, 538]
  const yData = [
    '海城市',
    '台安县',
    '岫岩县',
    '铁东区',
    '铁西区',
    '立山区',
    '千山区',
    '高新区',
    '经开区',
    '风景区'
  ]
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      textStyle: { color: 'rgba(240,251,255,0.9)' }
    },
    grid: { left: 90, right: 30, top: 20, bottom: 40 },
    xAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214,238,255,0.55)', fontSize: 20 },
      splitLine: { lineStyle: { color: 'rgba(120,220,255,0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'category',
      data: yData,
      axisLabel: { color: 'rgba(214,238,255,0.75)', fontSize: 20 },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        type: 'bar',
        barWidth: 50,
        data: xData,
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
