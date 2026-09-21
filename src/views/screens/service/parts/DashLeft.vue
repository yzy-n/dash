<template>
  <aside class="left">
    <section class="panel panel--electric">
      <div class="panel-head">
        <div class="panel-title">用电情况</div>
        <select v-model="dateElectric" class="panel-date">
          <option v-for="item in electricDateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="panel-tabs">
        <button
          v-for="tab in electricTabs"
          :key="tab.type"
          type="button"
          class="tab"
          :class="{ 'tab--active': tab.type === activeElectricTab }"
          :style="{ backgroundImage: `url(${tabBgUrl})` }"
          @click="handleElectricTabClick(tab.type)"
        >
          {{ tab.label }}
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
          <EChart
            :key="`electric-${activeElectricTab}-${dateElectric}`"
            :option="electricPieOption"
          />
        </div>
      </div>
    </section>

    <section class="panel panel--capacity">
      <div class="panel-head">
        <div class="panel-title">用电容量情况</div>
        <select v-model="dateCapacity" class="panel-date">
          <option v-for="item in capacityDateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="panel-tabs">
        <button
          v-for="tab in capacityTabs"
          :key="tab.type"
          type="button"
          class="tab"
          :class="{ 'tab--active': tab.type === activeCapacityTab }"
          :style="{ backgroundImage: `url(${tabBgUrl})` }"
          @click="handleCapacityTabClick(tab.type)"
        >
          {{ tab.label }}
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
          <EChart
            :key="`capacity-${activeCapacityTab}-${dateCapacity}`"
            :option="capacityRingOption"
          />
        </div>
      </div>
    </section>

    <section class="panel panel--resume">
      <div class="panel-head">
        <div class="panel-title">企业复工复产情况</div>
        <select v-model="dateResume" class="panel-date">
          <option v-for="item in resumeDateOptions" :key="item" :value="item">{{ item }}</option>
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
          <option v-for="item in pileDateOptions" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="pile-body">
        <div class="pile-top">
          <div class="pile-top-left">
            <div class="pile-top-left-row">
              <div class="pile-top-left-label">现有商用充电站/桩</div>
              <div class="pile-top-left-value">
                <span class="pile-num pile-num--cyan">{{
                  pileSummary.commercialStation ?? '-'
                }}</span>
                <span class="pile-unit">站</span>
                <span class="pile-split">/</span>
                <span class="pile-num">{{ pileSummary.commercialPile ?? '-' }}</span>
                <span class="pile-unit">个</span>
              </div>
            </div>
            <div class="pile-top-left-row">
              <div class="pile-top-left-label">现有民用充电桩</div>
              <div class="pile-top-left-value">
                <span class="pile-num pile-num--yellow">{{ pileSummary.civilPile ?? '-' }}</span>
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
                  <span class="pile-num">{{ pileSummary.commercialPower ?? '-' }}</span>
                  <span class="pile-unit">万千瓦时</span>
                </div>
                <div class="pile-top-right-yoy">
                  <span class="pile-top-right-yoy-label">同比:</span>
                  <span class="pile-num pile-num--cyan">{{
                    pileSummary.commercialYoy ?? '-'
                  }}</span>
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
                  <span class="pile-num">{{ pileSummary.civilPower ?? '-' }}</span>
                  <span class="pile-unit">万千瓦时</span>
                </div>
                <div class="pile-top-right-yoy">
                  <span class="pile-top-right-yoy-label">同比:</span>
                  <span class="pile-num pile-num--yellow">{{ pileSummary.civilYoy ?? '-' }}</span>
                  <span class="pile-unit">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pile-chart">
          <EChart :key="`pile-${datePile}`" :option="pileOption" />
        </div>
      </div>
    </section>

    <section class="panel panel--project">
      <div class="panel-head">
        <div class="panel-title">重点项目报装情况</div>
        <select v-model="dateProject" class="panel-date">
          <option v-for="item in projectDateOptions" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="panel-tabs panel-tabs--center">
        <button
          v-for="tab in projectTabs"
          :key="tab.type"
          type="button"
          class="tab"
          :class="{ 'tab--active': tab.type === activeProjectTab }"
          :style="{ backgroundImage: `url(${tabBgUrl})` }"
          @click="handleProjectTabClick(tab.type)"
        >
          {{ tab.label }}
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
          <div class="project-chart-wrap">
            <ProjectPie3D
              :key="`project-${activeProjectTab}-${dateProject}-${projectRenderKey}`"
              :items="projectPieItems"
            />
          </div>
        </div>

        <div class="project-table">
          <div v-for="(item, idx) in projectPieItems" :key="item.name" class="project-table-row">
            <span
              class="project-dot"
              :class="idx === 0 ? 'project-dot--done' : 'project-dot--todo'"
            ></span>
            <span class="project-name">{{ item.name }}</span>
            <div class="project-stat">
              <div class="project-stat-label">数量</div>
              <div class="project-stat-value">
                {{ item.value }}
                <span class="project-stat-unit">个</span>
              </div>
            </div>
            <div class="project-stat">
              <div class="project-stat-label">占比</div>
              <div class="project-stat-value">
                {{ projectPieTotal ? Math.round((item.value / projectPieTotal) * 100) : 0 }}
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
          <option v-for="item in energyDateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="panel-tabs panel-tabs--right">
        <button
          v-for="tab in energyTabs"
          :key="tab.type"
          type="button"
          class="tab"
          :class="{ 'tab--active': tab.type === activeEnergyTab }"
          :style="{ backgroundImage: `url(${tabBgUrl})` }"
          @click="handleEnergyTabClick(tab.type)"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="energy-body">
        <div class="energy-kpi">
          <span class="energy-kpi-label">{{ energyKpiLabel }}</span>
          <span class="energy-kpi-value">{{ energyTotal }}</span>
          <span class="energy-kpi-unit">{{ energyKpiUnit }}</span>
        </div>
        <div class="energy-chart">
          <EChart :key="`energy-${activeEnergyTab}-${dateEnergy}`" :option="energyOption" />
        </div>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import tabBgUrl from '@/assets/img/tabBg.png'
import ProjectPie3D from '../charts/ProjectPie3D.vue'
import {
  getPowervolume,
  getPowertype,
  getReturnwork,
  getChargeboard,
  getReportboard,
  getInstalledcapacity
} from '@/api/service'

// 用电情况
const electricDateOptions = [
  '2023-03',
  '2023-04',
  '2023-05',
  '2023-06',
  '2023-07',
  '2023-08',
  '2023-09',
  '2023-10',
  '2023-11',
  '2023-12',
  '2024'
]
const dateElectric = ref(electricDateOptions[0])

// 用电容量情况
const capacityDateOptions = [
  '2023-03',
  '2023-04',
  '2023-05',
  '2023-06',
  '2023-07',
  '2023-08',
  '2023-09',
  '2023-10',
  '2023-11',
  '2023-12',
  '2024'
]
const dateCapacity = ref(capacityDateOptions[0])

// 企业复工复产情况
const resumeDateOptions = [
  '2023-03',
  '2023-04',
  '2023-05',
  '2023-06',
  '2023-07',
  '2023-08',
  '2023-09',
  '2023-10',
  '2023-11',
  '2023-12',
  '2024'
]
const dateResume = ref(resumeDateOptions[1])

// 充电桩建设情况（接口返回 timeOptions 会覆盖）
const pileDateOptions = ref<string[]>(['2022年统计数据'])
const datePile = ref<string>('2022年统计数据')

// 重点项目报装情况（接口返回 timeOptions 会覆盖）
const projectDateOptions = ref<string[]>([
  '2023-07',
  '2023-08',
  '2023-09',
  '2023-10',
  '2023-11',
  '2023-12'
])
const dateProject = ref<string>(projectDateOptions.value[0])

// 能源装机情况（接口返回 timeOptions 会覆盖）
const energyDateOptions = ref<string[]>([
  '2023-07',
  '2023-08',
  '2023-09',
  '2023-10',
  '2023-11',
  '2023-12',
  '2024'
])
const dateEnergy = ref<string>(energyDateOptions.value[0])

// ============================================================
// 用电情况（接口版）
// ============================================================
const electricTabs = [
  { type: 1, label: '全社会用电量' },
  { type: 2, label: '全行业实际用电量' }
] as const

const activeElectricTab = ref<1 | 2>(1)
const electricList = ref<any[]>([])
const electricSummary = ref<Record<string, any>>({})

const handleElectricTabClick = async (type: 1 | 2) => {
  if (activeElectricTab.value === type) return
  activeElectricTab.value = type
  await fetchElectricData(type)
}

const fetchElectricData = async (type: 1 | 2) => {
  try {
    const res = await getPowervolume({ type, date: dateElectric.value })
    electricList.value = res?.dataList ?? []
    electricSummary.value = res?.summary ?? {}
  } catch (e) {
    console.error('用电情况查询失败', e)
  }
}

watch(dateElectric, () => {
  fetchElectricData(activeElectricTab.value)
})

const electricMetrics = computed(() => {
  const s = electricSummary.value
  const list = electricList.value
  const total = Number(s?.totalPower) || 0
  const avgYoy =
    list.length > 0
      ? (list.reduce((acc, item) => acc + (Number(item.yoy) || 0), 0) / list.length).toFixed(2)
      : '0'
  const avgRing =
    list.length > 0
      ? (list.reduce((acc, item) => acc + (Number(item.ringRatio) || 0), 0) / list.length).toFixed(
          2
        )
      : '0'

  return [
    { label: '用电量', value: total ? total.toFixed(2) : '-', unit: '万千瓦时' },
    { label: '占比', value: '100.00', unit: '%' },
    { label: '同比', value: avgYoy, unit: '%' },
    { label: '环比', value: avgRing, unit: '%' }
  ]
})

const electricPieOption = computed(() => {
  const data = electricList.value.map((item: any) => ({
    name: item.label,
    value: Number(item.capacityNum) || 0
  }))

  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    legend: {
      bottom: 10,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 28 }
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

// ============================================================
// 用电容量情况（接口版）
// ============================================================
const capacityTabs = [
  { type: 1, label: '全社会用电容量' },
  { type: 2, label: '全行业实际用电容量' }
] as const

const activeCapacityTab = ref<1 | 2>(1)
const capacityList = ref<any[]>([])
const capacitySummary = ref<Record<string, any>>({})

const handleCapacityTabClick = async (type: 1 | 2) => {
  if (activeCapacityTab.value === type) return
  activeCapacityTab.value = type
  await fetchCapacityData(type)
}

const fetchCapacityData = async (type: 1 | 2) => {
  try {
    const res = await getPowertype({ type, date: dateCapacity.value })
    capacityList.value = res?.dataList ?? []
    capacitySummary.value = res?.summary ?? {}
  } catch (e) {
    console.error('用电容量查询失败', e)
  }
}

watch(dateCapacity, () => {
  fetchCapacityData(activeCapacityTab.value)
})

const capacityMetrics = computed(() => {
  const s = capacitySummary.value
  const list = capacityList.value
  const totalVolume = Number(s?.totalVolume) || 0
  const totalNum = Number(s?.totalNum) || 0

  return [
    { label: '用电容量', value: totalVolume ? totalVolume.toFixed(2) : '-', unit: '万千瓦' },
    { label: '总数量', value: totalNum ? String(totalNum) : '-', unit: '个' },
    { label: '类型数', value: String(list.length || 0), unit: '类' }
  ]
})

const capacityRingOption = computed(() => {
  const list = capacityList.value
  const colors = ['#33d5ff', '#ffe24a', '#40f3b8', '#ffb84a', '#8b5cff']
  const total = list.reduce((acc: number, item: any) => acc + (Number(item.volume) || 0), 0)

  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    legend: {
      orient: 'vertical',
      right: 6,
      top: 'middle',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 14,
      icon: 'circle',
      data: list.map((item: any, idx: number) => ({
        name: item.label,
        itemStyle: { color: colors[idx % colors.length] }
      })),
      formatter: (name: string) => {
        const item = list.find((i: any) => i.label === name)
        return `{n|${name}}  {v|${item?.volume ?? ''}}`
      },
      textStyle: {
        rich: {
          n: { color: 'rgba(214, 238, 255, 0.82)', fontSize: 13, verticalAlign: 'middle' },
          v: { color: '#fff', fontSize: 13, fontWeight: 800, verticalAlign: 'middle' }
        }
      }
    },
    series: list.map((item: any, idx: number) => {
      const outer = 82 - idx * 15
      const inner = outer - 12
      const val = Number(item.volume) || 0
      const rest = Math.max(total - val, 0)
      return {
        type: 'pie',
        radius: [`${inner}%`, `${outer}%`],
        center: ['36%', '50%'],
        startAngle: 90,
        silent: true,
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: val, name: item.label, itemStyle: { color: colors[idx % colors.length] } },
          {
            value: rest,
            name: '',
            itemStyle: { color: 'rgba(89, 194, 255, 0.08)' },
            label: { show: false }
          }
        ]
      }
    })
  }
})

// ============================================================
// 企业复工复产情况
// ============================================================
const resumeIndustryOptions = ['工业', '服务业', '商贸业']
const resumeIndustry = ref<(typeof resumeIndustryOptions)[number]>('工业')

const resumeWorkRate = computed(() =>
  resumeIndustry.value === '工业' ? 76.03 : resumeIndustry.value === '服务业' ? 68.4 : 62.8
)
const resumeProdRate = computed(() =>
  resumeIndustry.value === '工业' ? 54.9 : resumeIndustry.value === '服务业' ? 48.3 : 52.1
)

// ============================================================
// 充电桩建设情况
// ============================================================
const pileSummary = ref<Record<string, any>>({})
const pileList = ref<any[]>([])

const fetchPileData = async () => {
  try {
    const res: any = await getChargeboard({ souseDate: datePile.value })
    const data = res?.data ?? res ?? {}

    pileSummary.value = data.summary ?? {}
    pileList.value = data.dataList ?? []

    const options: string[] = data.summary?.timeOptions ?? []
    if (options.length) {
      pileDateOptions.value = options
      if (!options.includes(datePile.value)) {
        datePile.value = data.summary?.souseDate ?? options[0]
      }
    }
  } catch (e) {
    console.error('充电桩建设情况查询失败', e)
    pileSummary.value = {}
    pileList.value = []
  }
}

watch(datePile, () => {
  fetchPileData()
})

const pileOption = computed(() => {
  const districts = pileList.value.map((i: any) => i.areaName ?? '')
  const commercialVals = pileList.value.map((i: any) => Number(i.commercialStation) || 0)
  const civilVals = pileList.value.map((i: any) => Number(i.civilPile) || 0)

  return {
    backgroundColor: 'transparent',
    tooltip: { show: true },
    grid: { left: 70, right: 26, top: 26, bottom: 94 },
    legend: {
      bottom: 6,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 28 }
    },
    xAxis: {
      type: 'category',
      data: districts,
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 28 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 28 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '商用充电站',
        type: 'bar',
        data: commercialVals,
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
              { offset: 0, color: 'rgba(51, 213, 255, 0.95)' },
              { offset: 1, color: 'rgba(51, 213, 255, 0.15)' }
            ]
          }
        }
      },
      {
        name: '民用充电桩',
        type: 'bar',
        data: civilVals,
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

// ============================================================
// 重点项目报装情况
// ============================================================
const projectTabs = [
  { type: 1, label: '项目报装情况' },
  { type: 2, label: '已报装项目详情' }
] as const

const activeProjectTab = ref<1 | 2>(1)
const projectSummary = ref<Record<string, any>>({})
const projectList = ref<any[]>([])
const projectRenderKey = ref(0)

const handleProjectTabClick = async (type: 1 | 2) => {
  if (activeProjectTab.value === type) return
  activeProjectTab.value = type
  await fetchProjectData()
}

const fetchProjectData = async () => {
  try {
    const res: any = await getReportboard({
      type: activeProjectTab.value,
      souseDate: dateProject.value
    })
    const data = res?.data ?? res ?? {}
    projectSummary.value = data.summary ?? {}
    projectList.value = data.dataList ?? []

    const options: string[] = data.summary?.timeOptions ?? []
    if (options.length) {
      projectDateOptions.value = options
      if (!options.includes(dateProject.value)) {
        dateProject.value = data.summary?.souseDate ?? options[0]
      }
    }

    await nextTick()
    projectRenderKey.value++
  } catch (e) {
    console.error('重点项目报装情况查询失败', e)
    projectSummary.value = {}
    projectList.value = []
  }
}

watch(dateProject, () => {
  fetchProjectData()
})

const projectDone = computed(() => Number(projectSummary.value['已报装']) || 0)
const projectTodo = computed(() => Number(projectSummary.value['待报装']) || 0)
const projectTotal = computed(() => projectDone.value + projectTodo.value)

const projectPieItems = computed<Array<{ name: string; value: number }>>(() => {
  if (activeProjectTab.value === 1) {
    return [
      { name: '已报装', value: projectDone.value },
      { name: '待报装', value: projectTodo.value }
    ]
  }
  const map: Record<string, number> = {}
  projectList.value.forEach((item: any) => {
    const key = item.speed || '其他'
    map[key] = (map[key] || 0) + 1
  })
  return Object.entries(map).map(([name, value]) => ({ name, value }))
})

const projectPieTotal = computed(() =>
  projectPieItems.value.reduce((acc, item) => acc + item.value, 0)
)

// ============================================================
// 能源装机情况（接口版）
// ============================================================
const energyTabs = [
  { type: 1, label: '能源发电量' },
  { type: 2, label: '能源分布情况' }
] as const

const activeEnergyTab = ref<1 | 2>(1)
const energyList = ref<any[]>([])
const energySummary = ref<Record<string, any>>({})

const handleEnergyTabClick = async (type: 1 | 2) => {
  if (activeEnergyTab.value === type) return
  activeEnergyTab.value = type
  await fetchEnergyData(type)
}

const fetchEnergyData = async (type: 1 | 2) => {
  try {
    const res: any = await getInstalledcapacity({
      type,
      souseDate: dateEnergy.value
    })
    console.log('[energy] type=', type, 'res=', res)
    const data = res?.data ?? res ?? {}

    energyList.value = data.dataList ?? []
    energySummary.value = data.summary ?? {}
    console.log('[energy] dataList=', energyList.value, 'summary=', energySummary.value)

    const options: string[] = data.summary?.timeOptions ?? []
    if (options.length) {
      energyDateOptions.value = options
      if (!options.includes(dateEnergy.value)) {
        dateEnergy.value = data.summary?.souseDate ?? options[0]
      }
    }
  } catch (e) {
    console.error('能源装机情况查询失败', e)
    energyList.value = []
    energySummary.value = {}
  }
}

watch(dateEnergy, () => {
  fetchEnergyData(activeEnergyTab.value)
})

// KPI 显示：type=1 总装机量，type=2 项目总数
const energyKpiLabel = computed(() =>
  activeEnergyTab.value === 1 ? '能源总发电量' : '能源项目总数'
)
const energyKpiUnit = computed(() => (activeEnergyTab.value === 1 ? '万千瓦时' : '个'))

const energyTotal = computed(() => {
  if (activeEnergyTab.value === 2) {
    // type=2 显示项目总数
    const s = energySummary.value
    const total = Number(s?.totalNum) || 0
    return total ? String(total) : String(energyList.value.length || 0)
  }
  // type=1 显示总装机量
  const s = energySummary.value
  const total = Number(s?.totalNum) || Number(s?.totalPower) || 0
  return total ? String(total) : '-'
})

const energyOption = computed(() => {
  let categories: string[] = []
  let values: number[] = []

  if (activeEnergyTab.value === 1) {
    // type=1：{ label, num }
    categories = energyList.value.map((i: any) => i.label ?? '')
    values = energyList.value.map((i: any) => Number(i.num) || 0)
  } else {
    // type=2：{ sendPowerType, place, deviceVolume, ... }
    // 按发电类型统计数量
    const map: Record<string, number> = {}
    energyList.value.forEach((item: any) => {
      const raw = item.sendPowerType || '其他'
      // "风电、陆上风电" → 取"风电"
      const key = raw.split('、')[0].trim() || '其他'
      map[key] = (map[key] || 0) + 1
    })
    categories = Object.keys(map)
    values = Object.values(map)
  }

  // 若 type=1 的最大值 ≤ 100，视为百分比
  const maxVal = values.length ? Math.max(...values) : 0
  const isPercent = activeEnergyTab.value === 1 && maxVal > 0 && maxVal <= 100

  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 120, right: 66, top: 16, bottom: 68 },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(214, 238, 255, 0.55)',
        fontSize: 28,
        formatter: isPercent ? '{value}%' : '{value}'
      },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: 'rgba(214, 238, 255, 0.8)', fontSize: 28 },
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

// ============================================================
// 生命周期
// ============================================================
onMounted(() => {
  fetchElectricData(activeElectricTab.value)
  fetchCapacityData(activeCapacityTab.value)
  fetchPileData()
  fetchProjectData()
  fetchEnergyData(activeEnergyTab.value)
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
  z-index: 20;
}

.panel-title {
  height: 54px;
  display: inline-flex;
  align-items: center;
  font-size: 34px;
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
  font-size: 32px;
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
  z-index: 30;
  pointer-events: auto;
}

.panel-tabs--center {
  justify-content: center;
}
.panel-tabs--right {
  justify-content: center;
}

.tab {
  position: relative;
  z-index: 31;
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

.metric-list {
  display: grid;
  gap: 12px;
  margin-top: 40px;
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
  font-size: 32px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.78);
}
.metric-num {
  font-size: 32px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.16);
}
.metric-unit {
  font-size: 28px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}

.electric-body,
.capacity-body {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: center;
}

.electric-chart,
.capacity-chart {
  margin-top: 120px;
  height: 80%;
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
  z-index: 20;
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
  font-size: 28px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.9);
}
.resume-rate {
  font-size: 28px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.16);
}

.resume-bar {
  height: 24px;
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
  font-size: 34px;
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
  font-size: 18px;
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

/* ========== 重点项目面板 ========== */
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
  font-size: 28px;
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

.project-chart-wrap {
  position: relative;
  z-index: 1;
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
  pointer-events: none;
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
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  overflow: hidden;
  min-height: 0;
  margin-top: -280px;
  margin-bottom: 80px;
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
  font-size: 28px;
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
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(214, 238, 255, 0.62);
}
.project-stat-value {
  font-size: 28px;
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

/* 统一 select 展开后的选项背景 */
.panel-date option,
.resume-select option {
  background-color: #0a1f4a;
  color: rgba(214, 238, 255, 0.92);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
}

.panel-date option:checked,
.resume-select option:checked {
  background: linear-gradient(0deg, #1a4d8c 0%, #1a4d8c 100%);
  color: #fff;
}
</style>
