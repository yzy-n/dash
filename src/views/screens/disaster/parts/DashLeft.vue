<template>
  <div class="left-wrap">
    <section class="panel panel--resource">
      <div class="panel-title">应急资源</div>
      <div class="resource-grid">
        <div class="resource-item">
          <span class="resource-icon resource-icon--a"></span>
          <div class="resource-label">{{ resourceStats[0].label }}</div>
          <div class="resource-value">{{ resourceStats[0].value }}</div>
        </div>
        <div class="resource-item">
          <span class="resource-icon resource-icon--b"></span>
          <div class="resource-label">{{ resourceStats[1].label }}</div>
          <div class="resource-value">{{ resourceStats[1].value }}</div>
        </div>
        <div class="resource-item">
          <span class="resource-icon resource-icon--c"></span>
          <div class="resource-label">{{ resourceStats[2].label }}</div>
          <div class="resource-value">{{ resourceStats[2].value }}</div>
        </div>
        <div class="resource-item">
          <span class="resource-icon resource-icon--d"></span>
          <div class="resource-label">{{ resourceStats[3].label }}</div>
          <div class="resource-value">{{ resourceStats[3].value }}</div>
        </div>
        <div class="resource-item">
          <span class="resource-icon resource-icon--e"></span>
          <div class="resource-label">{{ resourceStats[4].label }}</div>
          <div class="resource-value">{{ resourceStats[4].value }}</div>
        </div>
        <div class="resource-item">
          <span class="resource-icon resource-icon--f"></span>
          <div class="resource-label">{{ resourceStats[5].label }}</div>
          <div class="resource-value">{{ resourceStats[5].value }}</div>
        </div>
      </div>
    </section>

    <section class="panel panel--risk">
      <div class="panel-title">风险隐患</div>
      <div class="table">
        <div class="table-row table-row--head">
          <span>点位</span>
          <span>类型</span>
          <span>等级</span>
        </div>
        <div class="table-row">
          <span>{{ riskRows[0].name }}</span>
          <span>{{ riskRows[0].type }}</span>
          <span class="lvl lvl--high">{{ riskRows[0].level }}</span>
        </div>
        <div class="table-row">
          <span>{{ riskRows[1].name }}</span>
          <span>{{ riskRows[1].type }}</span>
          <span class="lvl lvl--mid">{{ riskRows[1].level }}</span>
        </div>
        <div class="table-row">
          <span>{{ riskRows[2].name }}</span>
          <span>{{ riskRows[2].type }}</span>
          <span class="lvl lvl--mid">{{ riskRows[2].level }}</span>
        </div>
        <div class="table-row">
          <span>{{ riskRows[3].name }}</span>
          <span>{{ riskRows[3].type }}</span>
          <span class="lvl lvl--low">{{ riskRows[3].level }}</span>
        </div>
        <div class="table-row">
          <span>{{ riskRows[4].name }}</span>
          <span>{{ riskRows[4].type }}</span>
          <span class="lvl lvl--low">{{ riskRows[4].level }}</span>
        </div>
      </div>
    </section>

    <section class="panel panel--trend">
      <div class="panel-title">监测预警</div>
      <div class="trend-body">
        <div class="trend-left">
          <EChart :option="typeOption" />
        </div>
        <div class="trend-right">
          <EChart :option="trendOption" />
        </div>
      </div>
      <div class="trend-foot">
        <div class="foot-item">
          <div class="foot-label">今日预警</div>
          <div class="foot-value">18</div>
        </div>
        <div class="foot-item">
          <div class="foot-label">处置中</div>
          <div class="foot-value">6</div>
        </div>
        <div class="foot-item">
          <div class="foot-label">已闭环</div>
          <div class="foot-value">52</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

const resourceStats = [
  { label: '应急队伍', value: '128' },
  { label: '物资仓库', value: '36' },
  { label: '避难场所', value: '52' },
  { label: '监测点位', value: '214' },
  { label: '应急车辆', value: '76' },
  { label: '专家库', value: '43' }
]

const riskRows = [
  { name: '西部山体滑坡点', type: '地质灾害', level: '高' },
  { name: '沿河低洼易涝区', type: '内涝', level: '中' },
  { name: '化工园区', type: '危化品', level: '中' },
  { name: '老旧小区燃气', type: '消防', level: '低' },
  { name: '山区道路结冰', type: '道路', level: '低' }
]

const typeOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'pie',
        radius: ['58%', '78%'],
        center: ['50%', '50%'],
        silent: true,
        itemStyle: { borderColor: 'rgba(0,0,0,0)', borderWidth: 0 },
        label: {
          show: true,
          color: 'rgba(214, 238, 255, 0.86)',
          fontSize: 18,
          formatter: (p: any) => `${p.name}\n${p.percent.toFixed(0)}%`
        },
        labelLine: { length: 10, length2: 14, lineStyle: { color: 'rgba(120, 220, 255, 0.25)' } },
        data: [
          { name: '地质', value: 22, itemStyle: { color: '#39d5ff' } },
          { name: '内涝', value: 18, itemStyle: { color: '#ffd36b' } },
          { name: '消防', value: 14, itemStyle: { color: '#ff8f5a' } },
          { name: '危化', value: 10, itemStyle: { color: '#ff5a7a' } }
        ]
      }
    ]
  }
})

const trendOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 42, right: 18, top: 26, bottom: 36 },
    xAxis: {
      type: 'category',
      data: ['海城', '台安', '岫岩', '铁东', '铁西', '立山'],
      axisLabel: { color: 'rgba(214, 238, 255, 0.72)', fontSize: 14 },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.18)' } }
    },
    yAxis: {
      type: 'value',
      splitNumber: 4,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 14 },
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } }
    },
    series: [
      {
        type: 'bar',
        barWidth: 18,
        data: [36, 21, 18, 12, 10, 9],
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(150, 245, 255, 0.95)' },
              { offset: 1, color: 'rgba(0, 160, 255, 0.55)' }
            ]
          }
        }
      }
    ]
  }
})
</script>

<style scoped>
.left-wrap {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 26px;
  box-sizing: border-box;
}

.panel {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 92px 28px 26px;
  background:
    linear-gradient(180deg, rgba(6, 27, 72, 0.6), rgba(4, 16, 44, 0.6)),
    url('@/assets/img/leftBg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  border: 1px solid rgba(84, 188, 255, 0.24);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  color: rgba(214, 238, 255, 0.86);
  box-sizing: border-box;
}

.panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}

.panel-title {
  position: absolute;
  left: 28px;
  top: 18px;
  height: 54px;
  display: inline-flex;
  align-items: center;
  font-size: 40px;
  font-style: italic;
  transform: skewX(-10deg);
  font-weight: 800;
  letter-spacing: 2px;
  color: #f8fbff;
  text-shadow:
    -2px -2px 3px rgba(255, 255, 255, 0.7),
    2px 2px 4px rgba(0, 20, 60, 0.5),
    0 0 6px #90c4ff,
    0 0 14px #3b8fff,
    0 0 24px #0f58d1;
}

.panel--trend {
  grid-column: 1 / 3;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 10px;
}

.resource-item {
  height: 170px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.48);
  border-radius: 14px;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 10px;
}

.resource-icon {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  border: 1px solid rgba(120, 220, 255, 0.35);
  background: radial-gradient(circle, rgba(120, 220, 255, 0.22), rgba(6, 18, 48, 0.2));
  box-shadow: 0 0 16px rgba(45, 216, 255, 0.12);
}

.resource-label {
  font-size: 22px;
  color: rgba(214, 238, 255, 0.86);
}

.resource-value {
  font-size: 38px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  text-shadow: 0 0 14px rgba(45, 216, 255, 0.2);
}

.table {
  margin-top: 16px;
  display: grid;
  gap: 12px;
}

.table-row {
  display: grid;
  grid-template-columns: 1.3fr 1fr 0.6fr;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.58);
  border-radius: 10px;
  font-size: 20px;
}

.table-row--head {
  background: rgba(20, 30, 75, 0.55);
  color: rgba(234, 240, 255, 0.95);
  font-weight: 700;
}

.table-row span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lvl {
  justify-self: end;
  font-weight: 800;
}

.lvl--high {
  color: rgba(255, 120, 120, 0.95);
  text-shadow: 0 0 10px rgba(255, 70, 90, 0.18);
}

.lvl--mid {
  color: rgba(255, 190, 94, 0.95);
  text-shadow: 0 0 10px rgba(255, 169, 60, 0.18);
}

.lvl--low {
  color: rgba(92, 255, 178, 0.95);
  text-shadow: 0 0 10px rgba(34, 255, 154, 0.16);
}

.trend-body {
  margin-top: 6px;
  height: 620px;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 20px;
}

.trend-left,
.trend-right {
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  border-radius: 14px;
  overflow: hidden;
}

.trend-foot {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.foot-item {
  height: 96px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  border-radius: 14px;
  padding: 16px 18px;
  box-sizing: border-box;
  display: grid;
  align-content: center;
  row-gap: 10px;
}

.foot-label {
  font-size: 18px;
  color: rgba(214, 238, 255, 0.72);
}

.foot-value {
  font-size: 34px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
}
</style>
