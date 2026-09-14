<template>
  <aside class="left">
    <!-- 1 还利于民 -->
    <section class="panel panel--electric">
      <div class="panel-head">
        <div class="panel-title">还利于民</div>
        <div class="total-text">总额：<span class="num">341,049.2万元</span></div>
      </div>
      <div class="capacity-body">
        <div class="capacity-chart">
          <EChart :option="benefitBarOption" />
        </div>
      </div>
    </section>
    <!-- 2 受理单位参与度 -->
    <section class="panel panel--capacity">
      <div class="panel-head">
        <div class="panel-title">受理单位参与度</div>
      </div>
      <div class="capacity-body">
        <div class="capacity-chart">
          <EChart :option="acceptUnitTrendOption" />
        </div>
      </div>
    </section>
    <!--3 部门办理量排行 -->
    <section class="panel panel--pop-state">
      <div class="panel-head">
        <div class="panel-title">部门办理量排行</div>
      </div>
      <div class="capacity-body">
        <div class="rank-list">
          <div v-for="(item, idx) in depthVTop" :key="idx" class="rank-item">
            <div class="rank-index">{{ item.no }}</div>
            <div class="rank-name">{{ item.name }}</div>
            <div class="rank-value">
              {{ item.count }}件 <span class="rate">{{ item.rate }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--4 预警问题 -->
    <section class="panel panel--pile">
      <div class="panel-head">
        <div class="panel-title">预警问题</div>
      </div>
      <div class="capacity-body">
        <div class="capacity-chart">
          <EChart :option="warnRingOption" />
        </div>
      </div>
    </section>
    <!--5 小件质量 -->
    <section class="panel panel--resume">
      <div class="panel-head">
        <div class="panel-title">小件质量</div>
      </div>
      <div class="capacity-body">
        <div class="quality-list">
          <div v-for="(item, idx) in handlingQualityList" :key="idx" class="quality-item">
            <div class="q-event">{{ item.eventName }}</div>
            <div class="q-unit">{{ item.dutyUnit }}</div>
            <div class="q-star">★×{{ item.star }}</div>
          </div>
        </div>
      </div>
    </section>
    <!--6 监管情况 -->
    <section class="panel panel--steel">
      <div class="panel-head">
        <div class="panel-title">监管情况</div>
        <div class="panel-tabs panel-tabs--center">
          <button
            v-for="tab in socialAssistTabs"
            :key="tab"
            type="button"
            class="tab"
            :class="{ 'tab--active': tab === activeAssistTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="activeAssistTab = tab"
          >
            {{ tab }}
          </button>
        </div>
      </div>
      <div class="capacity-body">
        <div class="supervise-list">
          <div class="supervise-header">
            <div class="sv-col">序号</div>
            <div class="sv-col">地区</div>
            <div class="sv-col">交办量</div>
            <div class="sv-col">办结量</div>
            <div class="sv-col">办结率</div>
            <div class="sv-col">满意率</div>
          </div>
          <div v-for="(item, idx) in superviseList" :key="idx" class="supervise-row">
            <div class="sv-col">{{ item.no }}</div>
            <div class="sv-col">{{ item.area }}</div>
            <div class="sv-col">{{ item.assignNum }}</div>
            <div class="sv-col">{{ item.finishNum }}</div>
            <div class="sv-col">{{ item.finishRate }}</div>
            <div class="sv-col">{{ item.satisfactionRate }}</div>
          </div>
        </div>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import tabBgUrl from '@/assets/img/tabBg.png'
import {
  getRepaymentPeople,
  getAcceptanceDeptParticipation,
  getDepthVTop,
  getEarlyWarningProblems,
  getHandlingQuality
} from '@/api/ask'
const repaymentPeople = ref([])
const getRepaymentPeopleList = async () => {
  const res = await getRepaymentPeople()
  repaymentPeople.value = res.dataList
    .map((item) => ({
      name: item.deptName,
      value: item.money
    }))
    .slice(0, 10)
}
const acceptUnitTrend = ref([])
const getAcceptanceDeptParticipationList = async () => {
  const res = await getAcceptanceDeptParticipation()
  acceptUnitTrend.value = res.dataList.map((item) => ({
    date: item.date,
    value: item.num
  }))
}
const depthVTop = ref([])
const getDepthVTopList = async () => {
  const res = await getDepthVTop()
  depthVTop.value = res.dataList
    .map((item) => ({
      no: item.index,
      name: item.deptName,
      count: item.num,
      rate: item.ratio
    }))
    .slice(0, 10)
}
const warnRingOptionList = ref([])
const getWarnWarningProblemsList = async () => {
  const res = await getEarlyWarningProblems()
  warnRingOptionList.value = res.dataList
    .map((item) => ({
      name: item.type,
      value: item.num,
      percent: item.proportion
    }))
    .slice(0, 10)
}
const handlingQualityList = ref([])
const getHandlingQualityList = async () => {
  const res = await getHandlingQuality()
  handlingQualityList.value = res.dataList
    .map((item) => ({
      eventName: item.appealName,
      dutyUnit: item.appealDept,
      star: item.starRating
    }))
    .slice(0, 10)
}
onMounted(() => {
  getRepaymentPeopleList()
  getAcceptanceDeptParticipationList()
  getDepthVTopList()
  getWarnWarningProblemsList()
  getHandlingQualityList()
})
const socialAssistTabs = ['质量监管', '超期监管']
const activeAssistTab = ref<(typeof socialAssistTabs)[number]>('质量监管')

//监管情况
const superviseList = [
  {
    no: 2,
    area: '台安县',
    assignNum: 9279,
    finishNum: 8818,
    finishRate: '95.03%',
    satisfactionRate: '93.49%'
  },
  {
    no: 3,
    area: '岫岩县',
    assignNum: 8190,
    finishNum: 7840,
    finishRate: '95.73%',
    satisfactionRate: '96.21%'
  },
  {
    no: 4,
    area: '铁东区',
    assignNum: 73719,
    finishNum: 71614,
    finishRate: '97.14%',
    satisfactionRate: '92.12%'
  },
  {
    no: 5,
    area: '铁西区',
    assignNum: 35204,
    finishNum: 34177,
    finishRate: '97.08%',
    satisfactionRate: '95.39%'
  },
  {
    no: 6,
    area: '立山区',
    assignNum: 30101,
    finishNum: 28957,
    finishRate: '96.20%',
    satisfactionRate: '93.83%'
  },
  {
    no: 7,
    area: '千山区',
    assignNum: 5196,
    finishNum: 4966,
    finishRate: '95.57%',
    satisfactionRate: '91.95%'
  }
]

//还利于民柱状图
const benefitBarOption = computed(() => {
  const source = repaymentPeople.value
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 50, right: 20, top: 40, bottom: 120 },
    dataset: {
      source
    },
    xAxis: {
      type: 'category',
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 20, rotate: 38 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位：万元',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 20 },
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 20 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '金额',
        type: 'bar',
        barWidth: 40,
        encode: { x: 'name', y: 'value' },
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#40c8ff' },
              { offset: 1, color: 'rgba(34,110,255,0.4)' }
            ]
          }
        }
      }
    ]
  }
})

//受理单位参与度 面积折线图
const acceptUnitTrendOption = computed(() => {
  const source = acceptUnitTrend.value
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 50, right: 20, top: 60, bottom: 60 },
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
      name: '单位：个',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 20 },
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 20 },
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
              { offset: 0, color: 'rgba(54, 160, 255,0.42)' },
              { offset: 1, color: 'rgba(54, 160, 255,0.02)' }
            ]
          }
        },
        lineStyle: { color: '#44b8ff', width: 2 },
        itemStyle: { color: '#44b8ff' },
        encode: { x: 'date', y: 'value' }
      }
    ]
  }
})

//预警问题 环形图
const warnRingOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      textStyle: { color: 'rgba(240,251,255,0.9)' }
    },
    legend: { show: false },
    series: [
      {
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['50%', '52%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#061230',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          color: 'rgba(214,238,255,0.8)',
          fontSize: 11
        },
        data: warnRingOptionList.value
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
.panel-title .tip {
  font-size: 16px;
  font-weight: normal;
  margin-left: 8px;
  transform: skewX(10deg);
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
  z-index: 3;
  pointer-events: auto;
}
.panel-tabs--center {
  justify-content: center;
}
.tab {
  height: 56px;
  min-width: 280px;
  padding: 0 38px;
  border: none;
  outline: none;
  background-color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  color: rgba(214, 238, 255, 0.52);
  font-size: 28px;
  font-weight: 700;
  line-height: 56px;
  text-align: center;
  cursor: pointer;
  opacity: 0.72;
  filter: saturate(0.85);
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
  font-style: italic;
  color: #ffffff;
  text-shadow:
    0 0 6px #fff,
    0 0 12px #7cf,
    0 0 24px #0cf,
    0 0 40px #00a8ff;
  letter-spacing: 2px;
}
.tab--active {
  color: #eaf4ff;
  opacity: 1;
  filter: drop-shadow(0 0 10px rgba(54, 232, 255, 0.28));
  text-shadow: 0 0 10px rgba(54, 232, 255, 0.28);
}
.total-text {
  font-size: 18px;
  color: rgba(214, 238, 255, 0.75);
}
.total-text .num {
  color: #36e8ff;
}
.sub-title {
  font-size: 20px;
  margin-left: 12px;
  transform: skewX(10deg);
  color: #76c8ff;
}
.tab-wrap {
  display: flex;
  gap: 16px;
  margin-right: 20px;
}
.tab {
  font-size: 17px;
  color: rgba(214, 238, 255, 0.45);
}
.tab.active {
  color: #36e8ff;
  text-shadow: 0 0 8px rgba(54, 232, 255, 0.3);
}
.capacity-body {
  height: 100%;
  min-height: 0;
}
.capacity-chart {
  height: 100%;
  min-height: 0;
}

/*部门办理排行*/
.rank-list {
  height: 100%;
  overflow-y: auto;
  display: grid;
  gap: 10px;
  align-content: flex-start;
}
.rank-item {
  display: grid;
  grid-template-columns: 40px 1fr 180px;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid rgba(89, 194, 255, 0.14);
  border-radius: 10px;
  background: rgba(6, 18, 48, 0.3);
  margin-top: 20px;
}
.rank-index {
  font-size: 30px;
  color: rgba(214, 238, 255, 0.65);
}
.rank-name {
  font-size: 20px;
  color: rgba(214, 238, 255, 0.82);
}
.rank-value {
  font-size: 20px;
  color: #36e8ff;
  text-align: right;
}
.rank-value .rate {
  margin-left: 6px;
  color: rgba(214, 238, 255, 0.65);
}

/*小件质量列表*/
.quality-list {
  height: 100%;
  overflow-y: auto;
  display: grid;
  gap: 10px;
  align-content: flex-start;
}
.quality-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid rgba(89, 194, 255, 0.14);
  border-radius: 10px;
  background: rgba(6, 18, 48, 0.3);
  margin-top: 20px;
}
.q-event {
  font-size: 26px;
  color: rgba(214, 238, 255, 0.82);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.q-unit {
  font-size: 26px;
  color: rgba(214, 238, 255, 0.65);
  padding: 0 8px;
}
.q-star {
  font-size: 26px;
  color: #ffd740;
  font-weight: bold;
  text-align: right;
}

/*监管情况表格*/
.supervise-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 120px;
}
.supervise-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 10px 12px;
  background: rgba(14, 40, 85, 0.4);
  border-radius: 8px 8px 0 0;
}
.supervise-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(89, 194, 255, 0.12);
  margin-top: 20px;
}
.sv-col {
  font-size: 30px;
  color: rgba(214, 238, 255, 0.78);
  text-align: center;
}
.supervise-header .sv-col {
  color: #54e8ff;
  font-weight: bold;
}
</style>
