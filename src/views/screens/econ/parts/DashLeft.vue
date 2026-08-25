<template>
  <aside class="left">
    <section class="panel panel--electric">
      <div class="panel-head">
        <div class="panel-title">地区生产总值增速</div>
        <select v-model="dateElectric" class="panel-date">
          <option v-for="item in gdpDateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="gdp-wrap">
        <div class="gdp-block">
          <div class="gdp-block-head">
            <div class="gdp-block-title">GDP增速同比</div>
            <div class="gdp-block-unit">单位：%</div>
          </div>
          <div class="gdp-block-chart">
            <EChart :option="gdpLineOption" />
          </div>
        </div>
        <div class="gdp-block gdp-block--bottom">
          <div class="gdp-block-head">
            <div class="gdp-block-title">各地区生产总值</div>
            <div class="gdp-block-legend">生产总值・同比增长</div>
          </div>
          <div class="gdp-block-chart">
            <EChart :option="regionGdpOption" />
          </div>
        </div>
      </div>
    </section>

    <section class="panel panel--capacity">
      <div class="panel-head">
        <div class="panel-title">三次产业分析</div>
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
        <div class="capacity-chart">
          <PieRing />
        </div>
      </div>
    </section>

    <section class="panel panel--resume">
      <div class="panel-head">
        <div class="panel-title">固定资产投资增速</div>
        <select v-model="dateInvest" class="panel-date">
          <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="panel-tabs">
        <button
          v-for="tab in investTabs"
          :key="tab"
          type="button"
          class="tab"
          :class="{ 'tab--active': tab === activeInvestTab }"
          :style="{ backgroundImage: `url(${tabBgUrl})` }"
          @click="activeInvestTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div class="resume-invest-body">
        <div class="resume-invest-chart">
          <EChart :option="investOption" />
        </div>
        <div class="four-reform-wrap">
          <div class="four-reform-title">工业“四改”投资完成情况</div>
          <div class="four-reform-list">
            <div class="four-reform-item" v-for="item in fourReformMetrics" :key="item.label">
              <div class="four-reform-label">{{ item.label }}</div>
              <div class="four-reform-value">
                <span class="num">{{ item.value }}</span>
                <span class="unit">{{ item.unit }}</span>
              </div>
            </div>
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
import PieRing from '../charts/PieRing.vue'

const dateOptions = ['2023-05', '2023-04', '2022年统计数据']
const gdpDateOptions = ['2022.01-12', '2021.01-12', '2020.01-12']

const dateElectric = ref(gdpDateOptions[0])
const dateCapacity = ref(dateOptions[0])
const dateInvest = ref(dateOptions[1])
const datePile = ref(dateOptions[2])
const dateProject = ref(dateOptions[0])
const dateEnergy = ref(dateOptions[0])

const gdpLineOption = computed(() => {
  const x = ['2022年1季度', '2022年2季度', '2022年3季度', '2022年4季度']
  const national = [3.1, 2.4, 2.8, 2.8]
  const liaoning = [2.1, 1.2, 1.8, 1.8]
  const anshan = [0.5, -0.5, 0.5, 0.5]
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)', fontSize: 14 }
    },
    legend: {
      top: 10,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.72)', fontSize: 14 }
    },
    grid: { left: 60, right: 24, top: 54, bottom: 34 },
    xAxis: {
      type: 'category',
      data: x,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 12 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '全国',
        type: 'line',
        data: national,
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 3, color: 'rgba(255, 226, 74, 0.95)' }
      },
      {
        name: '辽宁',
        type: 'line',
        data: liaoning,
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 3, color: 'rgba(64, 243, 184, 0.95)' }
      },
      {
        name: '鞍山',
        type: 'line',
        data: anshan,
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 3, color: 'rgba(51, 213, 255, 0.95)' }
      }
    ]
  }
})

const regionGdpOption = computed(() => {
  const names = ['海城市', '台安县', '岫岩县', '铁东区', '铁西区', '立山区', '千山区', '高新区']
  const gdp = [520, 260, 180, 140, 220, 160, 200, 120]
  const yoy = [2.3, 1.6, 0.8, 1.2, 2.0, 1.4, 1.8, 0.9]
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)', fontSize: 14 }
    },
    grid: { left: 52, right: 44, top: 18, bottom: 46 },
    xAxis: {
      type: 'category',
      data: names,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 12, rotate: 30 },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } }
    },
    yAxis: [
      {
        type: 'value',
        name: '单位：亿元',
        nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12, padding: [0, 0, 0, 8] },
        axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
        splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      {
        type: 'value',
        name: '单位：%',
        nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12, padding: [0, 8, 0, 0] },
        axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false }
      }
    ],
    series: [
      {
        name: '生产总值',
        type: 'bar',
        yAxisIndex: 0,
        data: gdp,
        barWidth: 14,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(51, 213, 255, 0.85)' },
              { offset: 1, color: 'rgba(51, 213, 255, 0.12)' }
            ]
          }
        }
      },
      {
        name: '同比增长',
        type: 'line',
        yAxisIndex: 1,
        data: yoy,
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 3, color: 'rgba(255, 184, 74, 0.92)' }
      }
    ]
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
        rich: { v: { color: 'rgba(240, 251, 255, 0.92)', fontSize: 14, fontWeight: 800 } },
        color: 'rgba(214, 238, 255, 0.7)',
        fontSize: 12
      },
      labelLine: { length: 10, length2: 10, lineStyle: { color: 'rgba(120, 220, 255, 0.18)' } },
      data: [
        { value: item.value, name: item.name, itemStyle: { color: item.color } },
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
  return { backgroundColor: 'transparent', tooltip: { show: false }, series: rings.map(makeRing) }
})

// 固定资产投资
const investTabs = ['地区', '行业', '园区']
const activeInvestTab = ref<string>(investTabs[0])
const investDistrictX = [
  '海城市',
  '台安县',
  '岫岩县',
  '铁东区',
  '铁西区',
  '立山区',
  '千山区',
  '高新区',
  '经开区',
  '凤城区'
]
const investDistrictY = [25.8, 42.3, 11.6, 20, 25.8, 14.4, 39.8, 71, 148, -57.8]
const investOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 60, right: 24, top: 24, bottom: 80 },
    xAxis: {
      type: 'category',
      data: investDistrictX,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 12, rotate: 40 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位：%',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        type: 'bar',
        barWidth: 24,
        data: investDistrictY,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#54e8ff' },
              { offset: 1, color: '#1966ff' }
            ]
          }
        },
        markLine: { silent: true, data: [{ yAxis: 0 }], lineStyle: { color: '#ff4444', width: 2 } }
      }
    ]
  }
})

const fourReformMetrics = computed(() => [
  { label: '累计完成投资', value: '7.07', unit: '亿元' },
  { label: '较去年同期增长', value: '2.9', unit: '%' },
  { label: '占工业投资比重', value: '48.5', unit: '%' },
  { label: '较去年同期提升', value: '1.2', unit: '%' }
])

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
        barWidth: 18,
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
.capacity-body {
  height: 100%;
  min-height: 0;
}
.capacity-chart {
  height: 100%;
  min-height: 0;
}
.gdp-wrap {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: 1.12fr 1fr;
  gap: 16px;
}
.gdp-block {
  min-height: 0;
  display: grid;
  grid-template-rows: 34px 1fr;
  gap: 10px;
}
.gdp-block-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 0;
}
.gdp-block-title {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgba(124, 242, 255, 0.95);
  text-shadow: 0 0 12px rgba(54, 232, 255, 0.16);
}
.gdp-block-unit,
.gdp-block-legend {
  font-size: 14px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.6);
  letter-spacing: 1px;
}
.gdp-block--bottom .gdp-block-title {
  color: rgba(124, 242, 255, 0.9);
}
.gdp-block-chart {
  min-height: 0;
}
.resume-invest-body {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 14px;
  margin-top: 50px;
}
.resume-invest-chart {
  min-height: 0;
}
.four-reform-wrap {
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  padding: 14px 18px;
}
.four-reform-title {
  text-align: center;
  font-size: 20px;
  font-weight: 900;
  color: #40f3b8;
  letter-spacing: 2px;
  margin-bottom: 12px;
}
.four-reform-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.four-reform-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  border-radius: 8px;
  background: rgba(10, 30, 65, 0.35);
}
.four-reform-label {
  font-size: 17px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.75);
}
.four-reform-value {
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.four-reform-value .num {
  font-size: 24px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.95);
  text-shadow: 0 0 10px rgba(54, 232, 255, 0.16);
}
.four-reform-value .unit {
  font-size: 15px;
  color: rgba(214, 238, 255, 0.6);
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
