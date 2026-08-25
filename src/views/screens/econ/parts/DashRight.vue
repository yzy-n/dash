<template>
  <aside class="right">
    <div class="col">
      <section class="panel panel--gas">
        <div class="panel-head">
          <div class="panel-title">燃气</div>
          <div class="panel-date">2022年统计数据</div>
        </div>
        <div class="panel-tabs">
          <button
            v-for="tab in gasTabs"
            :key="tab"
            type="button"
            class="tab"
            :class="{ 'tab--active': tab === activeGasTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="activeGasTab = tab"
          >
            {{ tab }}
          </button>
        </div>
        <div class="gas-stage">
          <div class="gas-gauge">
            <EChart :option="gasOption" />
          </div>
          <div class="gas-icon"></div>
          <div
            v-for="item in gasMetrics"
            :key="item.label"
            class="gas-metric"
            :class="`gas-metric--${item.pos}`"
          >
            <div class="gas-metric-label">{{ item.label }}</div>
            <div class="gas-metric-value">
              <span class="gas-metric-num">{{ item.value }}</span>
              <span class="gas-metric-unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="panel panel--tower">
        <div class="panel-head">
          <div class="panel-title">通信铁塔建设情况</div>
          <div class="panel-date">2022年统计数据</div>
        </div>
        <div class="tower-kpi">
          <span class="tower-kpi-label">全市通信铁塔数量</span>
          <span class="tower-kpi-value">{{ towerTotal }}</span>
          <span class="tower-kpi-unit">个</span>
        </div>
        <div class="tower-body">
          <div class="tower-chart">
            <EChart :option="towerOption" />
          </div>
          <div class="tower-legend">
            <div v-for="item in towerLegend" :key="item.label" class="tower-legend-row">
              <div class="tower-legend-label">{{ item.label }}</div>
              <div class="tower-legend-value">
                <span class="tower-legend-num">{{ item.value }}</span>
                <span class="tower-legend-unit">{{ item.unit }}</span>
              </div>
              <div class="tower-legend-rate">{{ item.rate }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="col">
      <section class="panel panel--water">
        <div class="panel-head">
          <div class="panel-title">用水</div>
          <div class="panel-date">2022年统计数据</div>
        </div>
        <div class="water-filter">
          <select v-model="activeWaterType" class="water-select">
            <option v-for="item in waterTypes" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <div class="water-chart">
          <EChart :option="waterOption" />
        </div>
      </section>

      <section class="panel panel--heat">
        <div class="panel-head">
          <div class="panel-title">供暖情况</div>
          <div class="panel-date">2022年统计数据</div>
        </div>
        <div class="panel-tabs panel-tabs--center">
          <button
            v-for="tab in heatTabs"
            :key="tab"
            type="button"
            class="tab"
            :class="{ 'tab--active': tab === activeHeatTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="activeHeatTab = tab"
          >
            {{ tab }}
          </button>
        </div>
        <div class="heat-list">
          <div v-for="row in heatRows" :key="row.label" class="heat-row">
            <span class="heat-icon"></span>
            <span class="heat-label">{{ row.label }}</span>
            <span class="heat-value">{{ row.value }}</span>
            <span class="heat-unit">{{ row.unit }}</span>
          </div>
        </div>
      </section>
    </div>

    <div class="col">
      <!-- 红十字会：高度由内容撑开，不抢占剩余高度 -->
      <section class="panel panel--red">
        <div class="panel-head red-panel-head">
          <div class="panel-title">红十字会</div>
          <div class="panel-date">2022年统计数据</div>
        </div>
        <div class="red-inner">
          <!-- 顶部两行 -->
          <div class="red-top-item">
            <div class="red-top-icon"></div>
            <div class="red-top-label">造血干细胞捐献</div>
            <div class="red-top-val">8485 <span>人</span></div>
          </div>
          <div class="red-top-item">
            <div class="red-top-icon"></div>
            <div class="red-top-label">捐献造血干细胞实际捐献</div>
            <div class="red-top-val">28 <span>例</span></div>
          </div>

          <!-- 5个模块卡片 -->
          <div class="red-card-wrap">
            <div class="red-card">
              <div class="red-card-icon"></div>
              <div class="red-card-name">遗体捐献</div>
              <div class="red-card-num">61 <span>例</span></div>
            </div>
            <div class="red-card">
              <div class="red-card-icon"></div>
              <div class="red-card-name">眼组织捐献</div>
              <div class="red-card-num">24 <span>例</span></div>
            </div>
            <div class="red-card">
              <div class="red-card-icon"></div>
              <div class="red-card-name">器官捐献</div>
              <div class="red-card-num">15 <span>例</span></div>
            </div>
            <div class="red-card">
              <div class="red-card-icon"></div>
              <div class="red-card-name">肝脏捐献</div>
              <div class="red-card-num">15 <span>个</span></div>
            </div>
            <div class="red-card">
              <div class="red-card-icon"></div>
              <div class="red-card-name">肾脏捐献</div>
              <div class="red-card-num">30 <span>个</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- AED占剩下全部高度 -->
      <section class="panel--aed">
        <div class="panel-head panel-head--center">
          <div class="panel-title">AED分布图</div>
        </div>
        <div class="aed-chart">
          <EChart :option="aedOption" />
        </div>
      </section>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import tabBgUrl from '@/assets/img/tabBg.png'

const gasTabs = ['煤气', '天然气', '液化石油气']
const activeGasTab = ref<(typeof gasTabs)[number]>(gasTabs[0])

const gasMetrics = computed(() => {
  const map = {
    煤气: [
      { pos: 'lt', label: '家庭用户', value: '738000', unit: '户' },
      { pos: 'rt', label: '供气总量', value: '13743', unit: '万立方米' },
      { pos: 'lm', label: '用气人口', value: '136.3', unit: '万人' },
      { pos: 'rm', label: '家庭用量', value: '9124', unit: '万立方米' },
      { pos: 'lb', label: '管道长度', value: '2033', unit: '公里' },
      { pos: 'rb', label: '用户户数', value: '745763', unit: '户' }
    ],
    天然气: [
      { pos: 'lt', label: '家庭用户', value: '812000', unit: '户' },
      { pos: 'rt', label: '供气总量', value: '15240', unit: '万立方米' },
      { pos: 'lm', label: '用气人口', value: '152.1', unit: '万人' },
      { pos: 'rm', label: '家庭用量', value: '10230', unit: '万立方米' },
      { pos: 'lb', label: '管道长度', value: '2360', unit: '公里' },
      { pos: 'rb', label: '用户户数', value: '801340', unit: '户' }
    ],
    液化石油气: [
      { pos: 'lt', label: '家庭用户', value: '398000', unit: '户' },
      { pos: 'rt', label: '供气总量', value: '6240', unit: '万立方米' },
      { pos: 'lm', label: '用气人口', value: '86.6', unit: '万人' },
      { pos: 'rm', label: '家庭用量', value: '4312', unit: '万立方米' },
      { pos: 'lb', label: '管道长度', value: '980', unit: '公里' },
      { pos: 'rb', label: '用户户数', value: '402115', unit: '户' }
    ]
  } as const
  return map[activeGasTab.value]
})

const gasOption = computed(() => {
  const value = activeGasTab.value === '煤气' ? 68 : activeGasTab.value === '天然气' ? 72 : 55
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'gauge',
        startAngle: 210,
        endAngle: -30,
        radius: '88%',
        center: ['50%', '52%'],
        progress: {
          show: true,
          width: 14,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: 'rgba(51, 213, 255, 0.18)' },
                { offset: 1, color: 'rgba(51, 213, 255, 0.95)' }
              ]
            }
          }
        },
        axisLine: { lineStyle: { width: 14, color: [[1, 'rgba(89, 194, 255, 0.12)']] } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        pointer: { show: false },
        detail: { show: false },
        data: [{ value }]
      },
      {
        type: 'pie',
        radius: ['76%', '78%'],
        center: ['50%', '52%'],
        silent: true,
        label: { show: false },
        data: [{ value: 100, itemStyle: { color: 'rgba(54, 232, 255, 0.12)' } }]
      },
      {
        type: 'pie',
        radius: ['64%', '66%'],
        center: ['50%', '52%'],
        silent: true,
        label: { show: false },
        data: [
          {
            value: 100,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: 'rgba(255, 226, 74, 0.15)' },
                  { offset: 1, color: 'rgba(255, 226, 74, 0.42)' }
                ]
              }
            }
          }
        ]
      }
    ]
  }
})

const waterTypes = ['综合生产能力', '城区合计']
const activeWaterType = ref<(typeof waterTypes)[number]>(waterTypes[0])

const waterOption = computed(() => {
  const x = ['城区合计', '海城市', '台安县', '岫岩县']
  const y = activeWaterType.value === '综合生产能力' ? [55, 10, 3, 2] : [36, 12, 4, 3]
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 70, right: 26, top: 26, bottom: 30 },
    xAxis: {
      type: 'category',
      data: x,
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        type: 'bar',
        data: y,
        barWidth: 22,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(51, 213, 255, 0.95)' },
              { offset: 1, color: 'rgba(51, 213, 255, 0.12)' }
            ]
          }
        }
      }
    ]
  }
})

const towerTotal = '4710'
const towerLegend = [
  { label: '地面站', value: '2564', unit: '个', rate: '54.44%' },
  { label: '楼面站', value: '1674', unit: '个', rate: '35.54%' },
  { label: 'H杆', value: '472', unit: '个', rate: '10.02%' }
]

const towerOption = computed(() => {
  const data = [
    { name: '地面站', value: 2564 },
    { name: '楼面站', value: 1674 },
    { name: 'H杆', value: 472 }
  ]
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'pie',
        radius: ['40%', '72%'],
        center: ['45%', '56%'],
        label: { show: false },
        itemStyle: { borderWidth: 2, borderColor: 'rgba(2, 10, 30, 0.9)' },
        data
      }
    ],
    color: ['#33d5ff', '#40f3b8', '#ffe24a']
  }
})

const heatTabs = ['供暖能力', '供暖组织']
const activeHeatTab = ref<(typeof heatTabs)[number]>(heatTabs[0])

const heatRows = computed(() => {
  const map = {
    供暖能力: [
      { label: '供热能力', value: '4466', unit: '兆瓦' },
      { label: '集中供热面积', value: '8160', unit: '万平方米' },
      { label: '供热总量', value: '4125', unit: '万吉焦' },
      { label: '一级管网', value: '815', unit: '公里' },
      { label: '二级管网', value: '3586', unit: '公里' }
    ],
    供暖组织: [
      { label: '供热单位', value: '68', unit: '家' },
      { label: '热源点', value: '12', unit: '处' },
      { label: '换热站', value: '156', unit: '座' },
      { label: '一级管网', value: '815', unit: '公里' },
      { label: '二级管网', value: '3586', unit: '公里' }
    ]
  } as const
  return map[activeHeatTab.value]
})

const redTopRows = [
  { label: '造血干细胞捐献', value: '8485', unit: '人' },
  { label: '捐献造血干细胞实际捐献', value: '28', unit: '例' }
]

const redCards = [
  { label: '遗体捐献', value: '61', unit: '例' },
  { label: '眼组织捐献', value: '24', unit: '例' },
  { label: '器官捐献', value: '15', unit: '例' },
  { label: '肝脏捐献', value: '15', unit: '个' },
  { label: '肾脏捐献', value: '30', unit: '个' }
]

const aedOption = computed(() => {
  const points = [
    [26, 70],
    [34, 62],
    [42, 58],
    [56, 64],
    [62, 52],
    [48, 46],
    [38, 44],
    [30, 40],
    [70, 38],
    [78, 44],
    [68, 58],
    [58, 72],
    [40, 76],
    [22, 56],
    [82, 62]
  ]
  return {
    backgroundColor: 'transparent',
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    xAxis: { show: false, min: 0, max: 100 },
    yAxis: { show: false, min: 0, max: 100 },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'cartesian2d',
        data: points.map((p) => ({ value: [p[0], p[1]] })),
        symbol: 'pin',
        symbolSize: 34,
        itemStyle: { color: '#ff3b3b' },
        label: {
          show: true,
          formatter: 'AED',
          color: '#fff',
          fontSize: 12,
          fontWeight: 900,
          offset: [0, -6]
        }
      }
    ]
  }
})
</script>

<style scoped>
.right {
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
}

.col {
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.panel {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 72px 26px 22px;
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
}

.panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}

.panel-title {
  font-size: 34px;
  font-style: italic;
  transform: skewX(-10deg);
  font-weight: 800;
  letter-spacing: 2px;
  margin-left: 26px;
  margin-top: -10px;
  color: #f8fbff;
  text-shadow:
    -2px -2px 3px rgba(255, 255, 255, 0.7),
    2px 2px 4px rgba(0, 20, 60, 0.5),
    0 0 6px #90c4ff,
    0 0 14px #3b8fff,
    0 0 24px #0f58d1;
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
  z-index: 2;
}
/* 红十字头部：标题左，日期右 */
.red-panel-head {
  justify-content: space-between;
}

.panel-head--center {
  justify-content: center;
}

.panel-date {
  height: 36px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(78, 184, 255, 0.22);
  background: rgba(5, 26, 66, 0.45);
  color: rgba(209, 234, 255, 0.86);
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.panel-tabs {
  position: absolute;
  left: 26px;
  right: 26px;
  top: 100px;
  height: 42px;
  display: flex;
  justify-content: center;
  gap: 14px;
}

.panel-tabs--center {
  justify-content: center;
}

.tab {
  border: none;
  outline: none;
  height: 42px;
  min-width: 170px;
  padding: 0 20px;
  border-radius: 999px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  color: rgba(214, 238, 255, 0.76);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  cursor: pointer;
}

.tab--active {
  color: rgba(240, 251, 255, 0.96);
  text-shadow: 0 0 12px rgba(54, 232, 255, 0.22);
}

.panel--gas {
  flex: 1;
  min-height: 0;
}

.gas-stage {
  position: absolute;
  inset: 0;
  padding: 128px 26px 26px;
  box-sizing: border-box;
}

.gas-gauge {
  position: absolute;
  left: 50%;
  top: 56%;
  width: 540px;
  height: 540px;
  transform: translate(-50%, -50%);
}

.gas-icon {
  position: absolute;
  left: 50%;
  top: 56%;
  width: 140px;
  height: 140px;
  transform: translate(-50%, -50%);
  border-radius: 70px;
  border: 1px solid rgba(84, 188, 255, 0.18);
  background: radial-gradient(circle at 50% 40%, rgba(54, 232, 255, 0.26), rgba(6, 18, 48, 0.25));
  box-shadow: 0 0 26px rgba(54, 232, 255, 0.14);
}

.gas-metric {
  position: absolute;
  width: 360px;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.32);
  padding: 14px 16px 12px;
  box-sizing: border-box;
  display: grid;
  gap: 10px;
}

.gas-metric-label {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.78);
}

.gas-metric-value {
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
}

.gas-metric-num {
  font-size: 24px;
  font-weight: 900;
  color: rgba(255, 226, 74, 0.95);
  text-shadow: 0 0 14px rgba(255, 226, 74, 0.18);
}

.gas-metric-unit {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}

.gas-metric--lt {
  left: 40px;
  top: 140px;
}

.gas-metric--rt {
  right: 40px;
  top: 140px;
}

.gas-metric--lm {
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
}

.gas-metric--rm {
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
}

.gas-metric--lb {
  left: 40px;
  bottom: 46px;
}

.gas-metric--rb {
  right: 40px;
  bottom: 46px;
}

.panel--tower {
  flex: 1;
  min-height: 0;
}

.tower-kpi {
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(214, 238, 255, 0.78);
}

.tower-kpi-value {
  font-size: 26px;
  color: rgba(255, 226, 74, 0.95);
  text-shadow: 0 0 12px rgba(255, 226, 74, 0.18);
}

.tower-kpi-unit {
  color: rgba(214, 238, 255, 0.62);
}

.tower-body {
  height: calc(100% - 54px);
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 14px;
  align-items: center;
}

.tower-chart {
  height: 100%;
  min-height: 0;
}

.tower-legend {
  display: grid;
  gap: 12px;
}

.tower-legend-row {
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.32);
  padding: 14px 14px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: baseline;
}

.tower-legend-label {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.78);
}

.tower-legend-value {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
}

.tower-legend-num {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}

.tower-legend-unit {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}

.tower-legend-rate {
  font-size: 18px;
  font-weight: 900;
  color: rgba(255, 226, 74, 0.9);
  text-shadow: 0 0 12px rgba(255, 226, 74, 0.14);
}

.panel--water {
  flex: 1;
  min-height: 0;
}

.water-filter {
  position: absolute;
  top: 78px;
  right: 26px;
  width: 360px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  background: rgba(6, 18, 48, 0.34);
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
  z-index: 2;
}

.water-select {
  width: 100%;
  height: 100%;
  appearance: none;
  border: none;
  outline: none;
  background: transparent;
  color: rgba(240, 251, 255, 0.92);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  cursor: pointer;
}

.water-chart {
  height: 100%;
  min-height: 0;
}

.panel--heat {
  flex: 1;
  min-height: 0;
}

.heat-list {
  height: 100%;
  min-height: 0;
  display: grid;
  gap: 6px;
  margin-top: 90px;
  /* 删除 margin-bottom:160px; 这个在这里无效 */
  padding-bottom: 160px; /* ✅ 使用padding代替margin，实现底部留白 */
  box-sizing: border-box; /* 必须加上，padding不会撑大高度 */
}

.heat-row {
  height: 92px;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.34);
  display: grid;
  grid-template-columns: 42px 1fr auto auto;
  gap: 14px;
  align-items: center;
  padding: 0 14px;
  box-sizing: border-box;
  color: rgba(214, 238, 255, 0.82);
  font-size: 18px;
  font-weight: 900;
}

.heat-icon {
  width: 28px;
  height: 28px;
  border-radius: 10px;
  border: 1px solid rgba(54, 232, 255, 0.18);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.2), rgba(6, 18, 48, 0.15));
}

.heat-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.heat-value {
  font-size: 22px;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}

.heat-unit {
  color: rgba(214, 238, 255, 0.62);
}

.panel--red {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.red-inner {
  flex: 1;
  min-height: 0;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
}

/* 顶部两行条目 */
.red-top-item {
  flex-shrink: 0; /* 禁止压缩 */
  display: flex;
  align-items: center;
  height: 80px;
  border: 1px solid rgba(80, 160, 255, 0.3);
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(20, 80, 160, 0.4), rgba(10, 30, 60, 0.2));
  padding: 0 20px;
  position: relative;
}
.red-top-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  height: 100%;
  background: linear-gradient(90deg, rgba(40, 120, 220, 0.45), transparent);
  clip-path: polygon(0 0, 100% 0, 70% 100%, 0 100%);
}
.red-top-icon {
  width: 40px;
  height: 40px;
  z-index: 1;
  margin-right: 16px;
}
.red-top-label {
  flex: 1;
  font-size: 22px;
  color: #ffffff;
}
.red-top-val {
  font-size: 32px;
  color: #f9e784;
}
.red-top-val span {
  font-size: 20px;
  color: #fff;
  margin-left: 4px;
}

.red-card-wrap {
  flex: 1; /* ✅ 关键，把剩下全部高度给这个容器 */
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  align-content: stretch;
}
.red-card {
  position: relative;
  /* 不要写固定height，用min-height，卡片自身高度由内容决定 */
  min-height: 140px;
  border: 1px solid rgba(80, 160, 255, 0.3);
  border-radius: 10px;
  background: rgba(12, 30, 60, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 24px;
}
.red-card-icon {
  position: absolute;
  top: -14px;
  width: 48px;
  height: 48px;
}
.red-card-name {
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin-bottom: 12px;
}
.red-card-num {
  font-size: 34px;
  color: #f9e784;
}
.red-card-num span {
  font-size: 18px;
  color: #fff;
}

/* AED面板占剩下全部高度 */
.panel--aed {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 72px 26px 22px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  box-sizing: border-box;
}

.aed-chart {
  flex: 1;
  min-height: 0;
  position: relative;
  background:
    radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.06), rgba(6, 18, 48, 0.6)),
    repeating-linear-gradient(
      0deg,
      rgba(120, 220, 255, 0.06),
      rgba(120, 220, 255, 0.06) 1px,
      transparent 1px,
      transparent 24px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(120, 220, 255, 0.06),
      rgba(120, 220, 255, 0.06) 1px,
      transparent 1px,
      transparent 24px
    );
  border-radius: 12px;
  overflow: hidden;
}
</style>
