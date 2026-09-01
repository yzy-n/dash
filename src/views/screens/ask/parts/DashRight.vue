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
          <div v-for="(item, idx) in deptRankList" :key="idx" class="rank-item">
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
          <div v-for="(item, idx) in qualityList" :key="idx" class="quality-item">
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
import { computed, ref } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import tabBgUrl from '@/assets/img/tabBg.png'
const socialAssistTabs = ['质量监管', '超期监管']
const activeAssistTab = ref<(typeof socialAssistTabs)[number]>('质量监管')
// 部门办理量排行
const deptRankList = [
  { no: 1, name: '鞍山市交通运输局', count: 2117, rate: '11.17%' },
  { no: 2, name: '鞍山市交通运输集团有限公司', count: 1318, rate: '6.96%' },
  { no: 3, name: '鞍山市公安局交管支队', count: 1216, rate: '6.42%' },
  { no: 4, name: '鞍山市东房房产管修有限公司', count: 1177, rate: '6.21%' },
  { no: 5, name: '鞍山华润燃气有限公司', count: 1110, rate: '5.86%' },
  { no: 6, name: '鞍山市邮政管理局', count: 911, rate: '4.81%' },
  { no: 7, name: '鞍山市医疗保障事务服务中心', count: 790, rate: '4.17%' }
]

//小件质量高星件统计
const qualityList = [
  { eventName: '铁西区鞍山小潘君子兰...', dutyUnit: '鞍山市铁西区市场监管管', star: 5 },
  { eventName: '海城市巨伦广场5层江苏...', dutyUnit: '鞍山海城市人社局', star: 5 },
  { eventName: '铁西区某米线餐饮业食...', dutyUnit: '鞍山市铁西区市场监管管', star: 5 },
  { eventName: '台安县物资大市场下水...', dutyUnit: '鞍山台安县八角台街道办.', star: 5 },
  { eventName: '台安县西佛镇小红旗村...', dutyUnit: '鞍山台安县西佛镇政府', star: 5 },
  { eventName: '铁西区三街口的某陶瓷...', dutyUnit: '鞍山市铁西区市场监管管', star: 5 }
]

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
    xAxis: {
      type: 'category',
      data: [
        '鞍山市公安局',
        '鞍山市财政局',
        '鞍山市人社局',
        '鞍山市住建局',
        '鞍山市市场监管局',
        '鞍山市交通运输...',
        '鞍山市文旅广电局',
        '鞍山市税务局',
        '鞍山市铁东区人民法院',
        '鞍山市铁西区人民法院'
      ],
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
        data: [285, 38.8, 32, 26, 22, 18, 15, 12, 9, 7],
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
        data: [434, 452, 470, 460, 475, 452, 453, 461, 432, 424, 442, 467, 375]
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
        data: [
          { value: 467, name: '物业维修服务不到位、不及时', percent: '38.59%' },
          { value: 283, name: '商铺办公电话', percent: '23.39%' },
          { value: 227, name: '自来水供应', percent: '18.76%' },
          { value: 131, name: '健康诉求', percent: '10.83%' },
          { value: 43, name: '隔离要求', percent: '3.55%' },
          { value: 60, name: '其他', percent: '4.88%' }
        ]
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
  border: none;
  outline: none;
  height: 42px;
  min-width: 170px;
  padding: 0 20px;
  border-radius: 999px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  color: rgba(214, 238, 255, 0.38);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  cursor: pointer;
  opacity: 0.55;
  filter: grayscale(1) brightness(0.75);
  box-shadow:
    inset 0 0 0 1px rgba(86, 208, 255, 0.12),
    0 0 0 rgba(54, 232, 255, 0);
  transition:
    opacity 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease,
    color 160ms ease;
}
.tab--active {
  color: rgba(240, 251, 255, 0.96);
  text-shadow:
    0 0 12px rgba(54, 232, 255, 0.35),
    0 0 20px rgba(54, 232, 255, 0.18);
  opacity: 1;
  filter: none;
  transform: translateY(-1px);
  box-shadow:
    inset 0 0 0 1px rgba(86, 208, 255, 0.38),
    0 0 16px rgba(54, 232, 255, 0.22);
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
  margin-top: 60px;
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
