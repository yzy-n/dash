<template>
  <aside class="left">
    <section class="panel panel--electric">
      <div class="panel-head">
        <div class="panel-title">用电情况</div>
        <select v-model="dateElectric" class="panel-date">
          <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="panel-tabs">
        <button
          v-for="tab in electricTabs"
          :key="tab"
          type="button"
          class="tab"
          :class="{ 'tab--active': tab === activeElectricTab }"
          :style="{ backgroundImage: `url(${tabBgUrl})` }"
          @click="activeElectricTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div class="pile-body">
        <div class="metric-list">
          <div v-for="item in electricMetrics" :key="item.label" class="metric-row">
            <span class="metric-label">{{ item.label }}</span>
            <span class="metric-num">{{ item.value }}</span>
            <span class="metric-unit">{{ item.unit }}</span>
          </div>
        </div>
        <div class="electric-chart">
          <EChart :option="electricPieOption" />
        </div>
      </div>
    </section>

    <section class="panel panel--capacity">
      <div class="panel-head">
        <div class="panel-title">用电容量情况</div>
        <select v-model="dateCapacity" class="panel-date">
          <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="panel-tabs">
        <button
          v-for="tab in capacityTabs"
          :key="tab"
          type="button"
          class="tab"
          :class="{ 'tab--active': tab === activeCapacityTab }"
          :style="{ backgroundImage: `url(${tabBgUrl})` }"
          @click="activeCapacityTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div class="capacity-body">
        <div class="metric-list">
          <div v-for="item in capacityMetrics" :key="item.label" class="metric-row">
            <span class="metric-label">{{ item.label }}</span>
            <span class="metric-num">{{ item.value }}</span>
            <span class="metric-unit">{{ item.unit }}</span>
          </div>
        </div>
        <div class="capacity-chart">
          <EChart :option="capacityRingOption" />
        </div>
      </div>
    </section>

    <section class="panel panel--resume">
      <div class="panel-head">
        <div class="panel-title">企业复工复产情况</div>
        <select v-model="dateResume" class="panel-date">
          <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="resume-filter">
        <select v-model="resumeIndustry" class="resume-select">
          <option v-for="item in resumeIndustryOptions" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="resume-body">
        <div class="resume-card">
          <div class="resume-row">
            <span class="resume-name">复工率</span>
            <span class="resume-rate">{{ resumeWorkRate }}%</span>
          </div>
          <div class="resume-bar">
            <div class="resume-bar-fill" :style="{ width: `${resumeWorkRate}%` }"></div>
          </div>
          <div class="resume-desc">
            复工率=企业日用电量超过基准用电量20%的用户数/有企业用电企业总数（基准值：2021年4月的日平均电量）
          </div>
        </div>
        <div class="resume-card">
          <div class="resume-row">
            <span class="resume-name">复产率</span>
            <span class="resume-rate">{{ resumeProdRate }}%</span>
          </div>
          <div class="resume-bar resume-bar--yellow">
            <div class="resume-bar-fill" :style="{ width: `${resumeProdRate}%` }"></div>
          </div>
          <div class="resume-desc">
            复产率=企业日用电量超过基准用电量70%的用户数/有企业用电企业总数（基准值：2021年4月的日平均电量）
          </div>
        </div>
      </div>
    </section>

    <section class="panel panel--pile">
      <div class="panel-head">
        <div class="panel-title">充电桩建设情况</div>
        <select v-model="datePile" class="panel-date">
          <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="pile-body">
        <div class="pile-top">
          <div class="pile-top-left">
            <div class="pile-top-left-row">
              <div class="pile-top-left-label">现有商用充电站/桩</div>
              <div class="pile-top-left-value">
                <span class="pile-num pile-num--cyan">60</span>
                <span class="pile-unit">站</span>
                <span class="pile-split">/</span>
                <span class="pile-num">217</span>
                <span class="pile-unit">个</span>
              </div>
            </div>
            <div class="pile-top-left-row">
              <div class="pile-top-left-label">现有民用充电桩</div>
              <div class="pile-top-left-value">
                <span class="pile-num pile-num--yellow">2611</span>
                <span class="pile-unit">个</span>
              </div>
            </div>
          </div>

          <div class="pile-top-right">
            <div class="pile-top-right-row">
              <div class="pile-top-right-name">
                <div class="pile-top-right-sub">本年累计</div>
                <div class="pile-top-right-main">商用充电量</div>
              </div>
              <div class="pile-top-right-metrics">
                <div class="pile-top-right-val">
                  <span class="pile-num">340.94</span>
                  <span class="pile-unit">万千瓦时</span>
                </div>
                <div class="pile-top-right-yoy">
                  <span class="pile-top-right-yoy-label">同比:</span>
                  <span class="pile-num pile-num--cyan">32.06</span>
                  <span class="pile-unit">%</span>
                </div>
              </div>
            </div>
            <div class="pile-top-right-row">
              <div class="pile-top-right-name">
                <div class="pile-top-right-sub">本年累计</div>
                <div class="pile-top-right-main">民用充电量</div>
              </div>
              <div class="pile-top-right-metrics">
                <div class="pile-top-right-val">
                  <span class="pile-num">287.77</span>
                  <span class="pile-unit">万千瓦时</span>
                </div>
                <div class="pile-top-right-yoy">
                  <span class="pile-top-right-yoy-label">同比:</span>
                  <span class="pile-num pile-num--yellow">142.89</span>
                  <span class="pile-unit">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pile-chart">
          <EChart :option="pileOption" />
        </div>
      </div>
    </section>

    <section class="panel panel--project">
      <div class="panel-head">
        <div class="panel-title">重点项目报装情况</div>
        <select v-model="dateProject" class="panel-date">
          <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="panel-tabs panel-tabs--center">
        <button
          v-for="tab in projectTabs"
          :key="tab"
          type="button"
          class="tab"
          :class="{ 'tab--active': tab === activeProjectTab }"
          :style="{ backgroundImage: `url(${tabBgUrl})` }"
          @click="activeProjectTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div class="project-body">
        <div class="project-kpi project-kpi--bar">
          <span class="project-kpi-icon"></span>
          <span class="project-kpi-label">有用电需求项目：</span>
          <span class="project-kpi-value">{{ projectTotal }}</span>
          <span class="project-kpi-unit">个</span>
        </div>
        <div class="project-stage">
          <div class="project-base"></div>
          <div class="project-ring project-ring--a"></div>
          <div class="project-ring project-ring--b"></div>
          <ProjectPie3D :done="projectDone" :todo="projectTodo" />
        </div>
        <div class="project-table">
          <div class="project-table-row">
            <span class="project-dot project-dot--done"></span>
            <span class="project-name">已报装</span>
            <div class="project-stat">
              <div class="project-stat-label">数量</div>
              <div class="project-stat-value">
                {{ projectDone }}
                <span class="project-stat-unit">个</span>
              </div>
            </div>
            <div class="project-stat">
              <div class="project-stat-label">占比</div>
              <div class="project-stat-value">
                {{ projectDoneRate }}
                <span class="project-stat-unit">%</span>
              </div>
            </div>
          </div>
          <div class="project-table-row">
            <span class="project-dot project-dot--todo"></span>
            <span class="project-name">待报装</span>
            <div class="project-stat">
              <div class="project-stat-label">数量</div>
              <div class="project-stat-value">
                {{ projectTodo }}
                <span class="project-stat-unit">个</span>
              </div>
            </div>
            <div class="project-stat">
              <div class="project-stat-label">占比</div>
              <div class="project-stat-value">
                {{ projectTodoRate }}
                <span class="project-stat-unit">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="panel panel--energy">
      <div class="panel-head">
        <div class="panel-title">能源装机情况</div>
        <select v-model="dateEnergy" class="panel-date">
          <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="panel-tabs panel-tabs--right">
        <button
          v-for="tab in energyTabs"
          :key="tab"
          type="button"
          class="tab"
          :class="{ 'tab--active': tab === activeEnergyTab }"
          :style="{ backgroundImage: `url(${tabBgUrl})` }"
          @click="activeEnergyTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div class="energy-body">
        <div class="energy-kpi">
          <span class="energy-kpi-label">能源总发电量</span>
          <span class="energy-kpi-value">{{ energyTotal }}</span>
          <span class="energy-kpi-unit">万千瓦时</span>
        </div>
        <div class="energy-chart">
          <EChart :option="energyOption" />
        </div>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import tabBgUrl from '@/assets/img/tabBg.png'
import ProjectPie3D from '../charts/ProjectPie3D.vue'

const dateOptions = ['2023-05', '2023-04', '2022年统计数据']
const dateElectric = ref(dateOptions[0])
const dateCapacity = ref(dateOptions[0])
const dateResume = ref(dateOptions[1])
const datePile = ref(dateOptions[2])
const dateProject = ref(dateOptions[0])
const dateEnergy = ref(dateOptions[0])

const electricTabs = ['全社会用电量', '全行业实际用电量']
const activeElectricTab = ref<(typeof electricTabs)[number]>(electricTabs[0])

const electricMetrics = computed(() => {
  const map = {
    全社会用电量: [
      { label: '用电量', value: '19331.06', unit: '万千瓦时' },
      { label: '占比', value: '9.64', unit: '%' },
      { label: '同比', value: '33.03', unit: '%' },
      { label: '环比', value: '7.27', unit: '%' }
    ],
    全行业实际用电量: [
      { label: '用电量', value: '20677.03', unit: '万千瓦时' },
      { label: '占比', value: '10.31', unit: '%' },
      { label: '同比', value: '28.15', unit: '%' },
      { label: '环比', value: '5.92', unit: '%' }
    ]
  } as const
  return map[activeElectricTab.value]
})

const electricPieOption = computed(() => {
  const data =
    activeElectricTab.value === '全行业实际用电量'
      ? [
          { name: '城市居民用电量', value: 38 },
          { name: '第一产业', value: 10 },
          { name: '第二产业', value: 32 },
          { name: '第三产业', value: 20 }
        ]
      : [
          { name: '城市居民用电量', value: 40 },
          { name: '第一产业', value: 9 },
          { name: '第二产业', value: 31 },
          { name: '第三产业', value: 20 }
        ]

  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    legend: {
      bottom: 10,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 12 }
    },
    series: [
      {
        type: 'pie',
        radius: ['44%', '78%'],
        center: ['54%', '50%'],
        label: { show: false },
        itemStyle: { borderWidth: 2, borderColor: 'rgba(2, 10, 30, 0.92)' },
        data
      }
    ],
    color: ['#37d5ff', '#ffe24a', '#ffb84a', '#7c5cff']
  }
})

const capacityTabs = ['全社会用电容量', '全行业实际用电容量']
const activeCapacityTab = ref<(typeof capacityTabs)[number]>(capacityTabs[0])

const capacityMetrics = computed(() => {
  const map = {
    全社会用电容量: [
      { label: '第三产业', value: '408.46', unit: '万千瓦' },
      { label: '同比', value: '3.95', unit: '%' },
      { label: '环比', value: '1.24', unit: '%' }
    ],
    全行业实际用电容量: [
      { label: '第二产业', value: '962.25', unit: '万千瓦' },
      { label: '同比', value: '4.89', unit: '%' },
      { label: '环比', value: '1.31', unit: '%' }
    ]
  } as const
  return map[activeCapacityTab.value]
})

const capacityRingOption = computed(() => {
  const rings =
    activeCapacityTab.value === '全行业实际用电容量'
      ? [
          { name: '城市居民用电量', value: 48.9, color: '#33d5ff' },
          { name: '第一产业', value: 12.1, color: '#ffe24a' },
          { name: '第二产业', value: 66.5, color: '#40f3b8' },
          { name: '第三产业', value: 35.8, color: '#ffb84a' }
        ]
      : [
          { name: '城市居民用电量', value: 42.6, color: '#33d5ff' },
          { name: '第一产业', value: 10.8, color: '#ffe24a' },
          { name: '第二产业', value: 58.4, color: '#40f3b8' },
          { name: '第三产业', value: 32.3, color: '#ffb84a' }
        ]

  const makeRing = (item: (typeof rings)[number], idx: number) => {
    const outer = 78 - idx * 14
    const inner = outer - 8
    return {
      type: 'pie',
      radius: [`${inner}%`, `${outer}%`],
      center: ['58%', '56%'],
      silent: true,
      label: {
        show: true,
        position: 'outside',
        formatter: `${item.name}\n{v|${item.value}}`,
        rich: {
          v: { color: 'rgba(240, 251, 255, 0.92)', fontSize: 14, fontWeight: 800 }
        },
        color: 'rgba(214, 238, 255, 0.7)',
        fontSize: 12
      },
      labelLine: { length: 10, length2: 10, lineStyle: { color: 'rgba(120, 220, 255, 0.18)' } },
      data: [
        {
          value: item.value,
          name: item.name,
          itemStyle: { color: item.color }
        },
        {
          value: 100 - item.value,
          name: '',
          itemStyle: { color: 'rgba(89, 194, 255, 0.08)' },
          label: { show: false },
          labelLine: { show: false }
        }
      ]
    }
  }

  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: rings.map(makeRing)
  }
})

const resumeIndustryOptions = ['工业', '服务业', '商贸业']
const resumeIndustry = ref<(typeof resumeIndustryOptions)[number]>('工业')

const resumeWorkRate = computed(() =>
  resumeIndustry.value === '工业' ? 76.03 : resumeIndustry.value === '服务业' ? 68.4 : 62.8
)
const resumeProdRate = computed(() =>
  resumeIndustry.value === '工业' ? 54.9 : resumeIndustry.value === '服务业' ? 48.3 : 52.1
)

const pileOption = computed(() => {
  const districts = ['海城市', '岫岩县', '台安县', '铁东区', '铁西区', '立山区', '千山区', '高新区']
  const privateVals = [14, 65, 6, 18, 9, 10, 4, 7]
  const publicVals = [8, 12, 3, 10, 6, 7, 3, 5]

  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 70, right: 26, top: 26, bottom: 34 },
    legend: {
      bottom: 6,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 12 }
    },
    xAxis: {
      type: 'category',
      data: districts,
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
        name: '商用充电站',
        type: 'bar',
        data: publicVals,
        barWidth: 10,
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
              { offset: 1, color: 'rgba(51, 213, 255, 0.15)' }
            ]
          }
        }
      },
      {
        name: '民用充电站',
        type: 'bar',
        data: privateVals,
        barWidth: 50,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 226, 74, 0.95)' },
              { offset: 1, color: 'rgba(255, 226, 74, 0.15)' }
            ]
          }
        }
      }
    ]
  }
})

const projectTabs = ['项目报装情况', '已报装项目详情']
const activeProjectTab = ref<(typeof projectTabs)[number]>(projectTabs[0])

const projectTotal = computed(() => (activeProjectTab.value === '项目报装情况' ? 35 : 35))
const projectDone = computed(() => (activeProjectTab.value === '项目报装情况' ? 25 : 25))
const projectTodo = computed(() => (activeProjectTab.value === '项目报装情况' ? 10 : 10))
const projectDoneRate = computed(() => Math.round((projectDone.value / projectTotal.value) * 100))
const projectTodoRate = computed(() => 100 - projectDoneRate.value)

const energyTabs = ['能源发电量', '能源分布情况']
const activeEnergyTab = ref<(typeof energyTabs)[number]>(energyTabs[0])

const energyTotal = computed(() => (activeEnergyTab.value === '能源发电量' ? '618032' : '618032'))

const energyOption = computed(() => {
  const categories = ['火电', '水电', '风电', '太阳能', '生物质']
  const values =
    activeEnergyTab.value === '能源分布情况' ? [55, 12, 20, 6, 7] : [558130, 714, 20114, 2697, 1269]

  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 80, right: 26, top: 16, bottom: 18 },
    xAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: 'rgba(214, 238, 255, 0.8)', fontSize: 14 },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        type: 'bar',
        data: values,
        barWidth: 50,
        itemStyle: {
          borderRadius: [0, 10, 10, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: 'rgba(255, 120, 120, 0.25)' },
              { offset: 1, color: 'rgba(255, 120, 120, 0.95)' }
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
  appearance: none;
  outline: none;
  cursor: pointer;
  font: inherit;
  text-align: center;
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

.panel-tabs--right {
  justify-content: center;
}

.tab {
  border: none;
  outline: none;
  height: 42px;
  min-width: 220px;
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

.metric-list {
  display: grid;
  gap: 12px;
}

.metric-row {
  height: 56px;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding: 0 14px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  border-radius: 12px;
  box-sizing: border-box;
}

.metric-label {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.78);
}

.metric-num {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.16);
}

.metric-unit {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}

.electric-body,
.capacity-body {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 16px;
  align-items: center;
}

.electric-chart,
.capacity-chart {
  height: 100%;
  min-height: 0;
}

.resume-filter {
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
}

.resume-select {
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

.resume-body {
  height: 100%;
  min-height: 0;
  display: grid;
  gap: 16px;
  grid-template-rows: 1fr 1fr;
}

.resume-card {
  border-radius: 14px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  padding: 16px 18px;
  box-sizing: border-box;
  display: grid;
  gap: 12px;
}

.resume-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.resume-name {
  font-size: 20px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.9);
}

.resume-rate {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.16);
}

.resume-bar {
  height: 16px;
  border-radius: 999px;
  background: rgba(89, 194, 255, 0.12);
  overflow: hidden;
}

.resume-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(64, 243, 184, 0.18), rgba(64, 243, 184, 0.95));
}

.resume-bar--yellow .resume-bar-fill {
  background: linear-gradient(90deg, rgba(255, 226, 74, 0.2), rgba(255, 226, 74, 0.95));
}

.resume-desc {
  font-size: 16px;
  line-height: 1.5;
  color: rgba(214, 238, 255, 0.68);
}

.pile-body {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: 140px 1fr;
  gap: 14px;
}

.pile-top {
  display: grid;
  grid-template-columns: 520px 1fr;
  gap: 14px;
  min-height: 0;
}

.pile-top-left,
.pile-top-right {
  position: relative;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: linear-gradient(180deg, rgba(16, 66, 130, 0.22), rgba(6, 18, 48, 0.48));
  box-shadow:
    inset 0 0 26px rgba(54, 232, 255, 0.08),
    0 0 18px rgba(0, 130, 255, 0.1);
  box-sizing: border-box;
  min-height: 0;
  overflow: hidden;
}

.pile-top-left::before,
.pile-top-right::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}

.pile-top-left::after,
.pile-top-right::after {
  content: '';
  position: absolute;
  left: -20%;
  top: -40%;
  width: 160%;
  height: 120%;
  background: linear-gradient(
    45deg,
    rgba(54, 232, 255, 0),
    rgba(54, 232, 255, 0.08),
    rgba(54, 232, 255, 0)
  );
  transform: rotate(8deg);
  opacity: 0.35;
  pointer-events: none;
}

.pile-top-left {
  padding: 6px 16px;
  display: grid;
}

.pile-top-left-row {
  height: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
}

.pile-top-left-row + .pile-top-left-row {
  border-top: 1px solid rgba(89, 194, 255, 0.12);
  box-shadow: inset 0 1px 0 rgba(54, 232, 255, 0.08);
}

.pile-top-left-label {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.86);
  letter-spacing: 2px;
}

.pile-top-left-value {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
}

.pile-top-right {
  padding: 6px 16px;
  display: grid;
}

.pile-top-right-row {
  height: 58px;
  display: grid;
  grid-template-columns: 220px 1fr;
  align-items: center;
  gap: 14px;
  position: relative;
  padding: 0 6px;
  box-sizing: border-box;
}

.pile-top-right-row + .pile-top-right-row {
  border-top: 1px solid rgba(89, 194, 255, 0.12);
  box-shadow: inset 0 1px 0 rgba(54, 232, 255, 0.08);
}

.pile-top-right-row::before {
  content: '';
  width: 4px;
  height: 18px;
  border-radius: 999px;
  background: rgba(54, 232, 255, 0.35);
  box-shadow: 0 0 12px rgba(54, 232, 255, 0.16);
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.pile-top-right-name {
  display: grid;
  gap: 4px;
}

.pile-top-right-sub {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
  letter-spacing: 1px;
}

.pile-top-right-main {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.82);
  letter-spacing: 2px;
}

.pile-top-right-metrics {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.pile-top-right-val,
.pile-top-right-yoy {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
}

.pile-top-right-yoy-label {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}

.pile-top-left .pile-num {
  font-size: 28px;
}

.pile-top-right .pile-num {
  font-size: 22px;
}

.pile-num {
  font-size: 24px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.95);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}

.pile-num--cyan {
  color: rgba(51, 213, 255, 0.95);
  text-shadow: 0 0 12px rgba(51, 213, 255, 0.18);
}

.pile-num--yellow {
  color: rgba(255, 226, 74, 0.95);
  text-shadow: 0 0 12px rgba(255, 226, 74, 0.18);
}

.pile-unit {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}

.pile-split {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.42);
}

.pile-chart {
  min-height: 0;
}

.project-body {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  margin-top: 50px;
}

.project-kpi {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: rgba(214, 238, 255, 0.82);
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 2px;
}

.project-kpi--bar {
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.32);
  box-sizing: border-box;
}

.project-kpi-icon {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid rgba(54, 232, 255, 0.18);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.2), rgba(6, 18, 48, 0.15));
}

.project-kpi-value {
  font-size: 26px;
  color: rgba(240, 251, 255, 0.95);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}

.project-stage {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 0;
  margin-top: -180px;
}

.project-base {
  position: absolute;
  width: 620px;
  height: 180px;
  border-radius: 999px;
  border: 1px solid rgba(54, 232, 255, 0.14);
  background: radial-gradient(circle at 50% 40%, rgba(54, 232, 255, 0.16), rgba(6, 18, 48, 0));
  transform: perspective(900px) rotateX(72deg) translateY(28px);
  box-shadow: 0 0 34px rgba(54, 232, 255, 0.12);
}

.project-ring {
  position: absolute;
  left: 50%;
  top: 58%;
  border-radius: 999px;
  transform: translate(-50%, -50%) perspective(900px) rotateX(72deg);
  pointer-events: none;
}

.project-ring--a {
  width: 700px;
  height: 250px;
  border: 2px solid rgba(54, 232, 255, 0.14);
  box-shadow: 0 0 34px rgba(54, 232, 255, 0.12);
}

.project-ring--b {
  width: 560px;
  height: 210px;
  border: 2px solid rgba(54, 232, 255, 0.1);
  opacity: 0.75;
}

.project-table {
  border-radius: 12px;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  overflow: hidden;
  min-height: 0;
  margin-top: -180px;
  margin-bottom: 20px;
}

.project-table-row {
  height: 64px;
  display: grid;
  grid-template-columns: 22px 140px 1fr 1fr;
  align-items: center;
  padding: 0 14px;
  box-sizing: border-box;
  border-top: 1px solid rgba(89, 194, 255, 0.12);
}

.project-table-row:first-child {
  border-top: none;
}

.project-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  box-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}

.project-dot--done {
  background: rgba(51, 213, 255, 0.95);
}

.project-dot--todo {
  background: rgba(255, 226, 74, 0.95);
  box-shadow: 0 0 12px rgba(255, 226, 74, 0.18);
}

.project-name {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(214, 238, 255, 0.82);
}

.project-stat {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 10px;
}

.project-stat-label {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(214, 238, 255, 0.62);
}

.project-stat-value {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.16);
}

.project-stat-unit {
  margin-left: 6px;
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}

.energy-body {
  height: 100%;
  min-height: 0;
  margin-top: 20px;
  display: grid;
  grid-template-rows: 72px 1fr;
  gap: 10px;
}

.energy-kpi {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 2px;
}

.energy-kpi-label {
  color: rgba(214, 238, 255, 0.78);
}

.energy-kpi-value {
  font-size: 28px;
  color: rgba(255, 226, 74, 0.95);
  text-shadow: 0 0 12px rgba(255, 226, 74, 0.18);
}

.energy-kpi-unit {
  color: rgba(214, 238, 255, 0.62);
}

.energy-chart {
  min-height: 0;
  margin-top: -50px;
}
</style>
