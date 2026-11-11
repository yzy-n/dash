<template>
  <div class="right-wrap">
    <section class="panel panel--dev">
      <div class="panel-head">
        <div class="panel-title">发展党员</div>
        <div class="panel-tabs">
          <span
            v-for="tab in recruitTabs"
            :key="tab.value"
            class="tab"
            :class="{ 'tab--active': tab.value === activeRecruitType }"
            @click="handleRecruitTabClick(tab.value)"
          >
            {{ tab.label }}
          </span>
        </div>
      </div>

      <div class="table">
        <div class="table-head">
          <span class="c1">{{ currentRecruitTab.columnTitle }}</span>
          <span class="c2">人数</span>
          <span class="c3">占比</span>
        </div>

        <div
          v-for="(item, index) in recruitList"
          :key="`${activeRecruitType}-${item.label}-${index}`"
          class="table-row"
        >
          <span class="c1">{{ item.label }}</span>
          <span class="c2">{{ item.value }}</span>
          <span class="c3">{{ item.rate }}</span>
        </div>

        <div v-if="recruitLoading" class="table-empty">加载中…</div>
        <div v-else-if="!recruitList.length" class="table-empty">暂无数据</div>
      </div>
    </section>

    <!-- ==================== 原人才政策位置：现在放群团组织 ==================== -->
    <section class="panel panel--talent">
      <div class="panel-head">
        <div class="panel-title">群团组织</div>
        <div class="panel-tabs">
          <span
            v-for="tab in massTabs"
            :key="tab.value"
            class="tab"
            :class="{ 'tab--active': tab.value === activeMassType }"
            @click="handleMassTabClick(tab.value)"
          >
            {{ tab.label }}
          </span>
        </div>
      </div>

      <div class="mass-list">
        <div
          v-for="(item, index) in massList"
          :key="`${activeMassType}-${item.label}-${index}`"
          class="mass-row"
        >
          <div class="mass-left">
            <span
              class="mass-badge"
              :class="index % 2 === 0 ? 'mass-badge--a' : 'mass-badge--b'"
            ></span>
            <div class="mass-name">{{ item.label }}</div>
          </div>
          <div class="mass-right">
            <span class="mass-num">{{ item.value }}</span>
            <span class="mass-unit">{{ item.unit }}</span>
          </div>
        </div>

        <div v-if="massLoading" class="mass-empty">加载中…</div>
        <div v-else-if="!massList.length" class="mass-empty">暂无数据</div>
      </div>
    </section>

    <!-- ==================== 原群团组织位置：现在放人才政策 ==================== -->
    <section class="panel panel--mass">
      <div class="panel-head">
        <div class="panel-title">人才政策</div>
        <div class="panel-tabs">
          <span
            v-for="tab in talentTabs"
            :key="tab.value"
            class="tab"
            :class="{ 'tab--active': tab.value === activeTalentType }"
            @click="handleTalentTabClick(tab.value)"
          >
            {{ tab.label }}
          </span>
        </div>
        <div class="panel-total panel-total--talent">
          <span class="total-dot"></span>
          <span class="total-label">合计：</span>
          <span class="total-value">{{ sumValues(talentList) }}</span>
        </div>
      </div>

      <!-- 上方：曲面参数 3D 饼图 -->
      <div class="talent-body">
        <EChart class="donut" :option="talentOption" />
      </div>

      <!-- 下方：自定义图例列表 -->
      <div class="talent-legend-list">
        <div
          v-for="(item, index) in talentLegendData"
          :key="`legend-${item.label}-${index}`"
          class="legend-row"
        >
          <span class="legend-mark" :style="{ background: item.color }"></span>
          <span class="legend-label">{{ item.label }}</span>
          <span class="legend-value">{{ item.rawValue }}</span>
          <span class="legend-rate">{{ item.rate }}</span>
        </div>
      </div>
    </section>

    <!-- ==================== 党员服务中心分布（接口驱动） ==================== -->
    <section class="panel panel--service">
      <div class="panel-head">
        <div class="panel-title panel-title--service">党员服务中心分布</div>
        <div class="panel-total">
          <span class="total-label">合计</span>
          <span class="total-value" style="margin-left: 100px">{{ serviceTotal }}</span>
          <span>个</span>
        </div>
      </div>

      <div class="service-list">
        <div
          v-for="(item, index) in serviceList"
          :key="`service-${item.label}-${index}`"
          class="service-row"
        >
          <span class="service-dot"></span>
          <span class="service-label">{{ item.label }}</span>
          <span class="service-value">{{ item.value }}</span>
          <span
            class="service-track"
            :style="{ '--fillx': getFillX(item.value, serviceList) }"
          ></span>
        </div>

        <div v-if="serviceLoading" class="service-empty">加载中…</div>
        <div v-else-if="!serviceList.length" class="service-empty">暂无数据</div>
      </div>
    </section>

    <!-- ==================== 志愿服务（接口驱动） ==================== -->
    <section class="panel panel--vol">
      <div class="panel-head">
        <div class="panel-title">志愿服务</div>
        <div class="panel-tabs">
          <span
            v-for="tab in volTabs"
            :key="tab.value"
            class="tab"
            :class="{ 'tab--active': tab.value === activeVolType }"
            @click="handleVolTabClick(tab.value)"
          >
            {{ tab.label }}
          </span>
        </div>
      </div>

      <div class="vol-meta">
        <div class="vol-unit">单位：{{ currentVolTab.unit }}</div>
        <div class="vol-total">
          <span class="total-dot"></span>
          <span class="total-label">合计：</span>
          <span class="total-value">{{ sumValues(volRows) }}</span>
          <span class="total-suffix">{{ currentVolTab.unit }}</span>
        </div>
      </div>

      <div class="vol-body">
        <EChart class="vol-chart" :option="volOption" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

import EChart from '@/components/echarts/EChart.vue'
import 'echarts-gl'
import type { PartyRightData } from '../data'
import {
  getRecruitPartyMembers,
  getTalentPolicy,
  getOrganizaSituation,
  getIdealService,
  getServiceCentre
} from '@/api/party'

const props = defineProps<{
  data: PartyRightData
}>()

const pickNumber = (value: unknown) => {
  if (value === null || value === undefined) return undefined
  const match = String(value).match(/-?\d+(?:\.\d+)?/)
  if (!match) return undefined
  const num = Number(match[0])
  return Number.isFinite(num) ? num : undefined
}

const sumValues = (rows: unknown) => {
  const list = Array.isArray(rows) ? rows : []
  const nums = list
    .map((item: any) => pickNumber(item?.value))
    .filter((n): n is number => typeof n === 'number' && Number.isFinite(n))
  if (!nums.length) return ''
  const sum = nums.reduce((a, b) => a + b, 0)
  return String(sum)
}

const getFillX = (value: unknown, rows: unknown) => {
  const list = Array.isArray(rows) ? rows : []
  const nums = list
    .map((item: any) => pickNumber(item?.value))
    .filter((n): n is number => typeof n === 'number' && Number.isFinite(n))
  const max = nums.length ? Math.max(...nums) : 0
  const cur = pickNumber(value) ?? 0
  if (!max) return '0'
  const scale = Math.max(0, Math.min(1, cur / max))
  return scale.toFixed(4)
}

const talentPalette = ['#ffe04b', '#ff8b39', '#16d2ff', '#ff4d6d', '#8a5cff']

// ==========================================
// 核心：基于参考代码的 3D 曲面饼图实现
// ==========================================

const getHeight3D = (series: any[], height: number) => {
  series.sort((a, b) => {
    return b.pieData.value - a.pieData.value
  })
  return (height * 25) / series[0].pieData.value
}

const getParametricEquation = (
  startRatio: number,
  endRatio: number,
  isSelected: boolean,
  isHovered: boolean,
  k: number,
  h: number
) => {
  let midRatio = (startRatio + endRatio) / 2
  let startRadian = startRatio * Math.PI * 2
  let endRadian = endRatio * Math.PI * 2
  let midRadian = midRatio * Math.PI * 2

  if (startRatio === 0 && endRatio === 1) {
    isSelected = true
  }

  k = typeof k !== 'undefined' ? k : 1 / 3

  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0

  let hoverRate = isHovered ? 1.05 : 1

  return {
    u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
    v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
    x: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    y: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    z: function (u: number, v: number) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u)
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
    }
  }
}

const getPie3DOption = (rows: any[]) => {
  const data = rows
    .map((item: any, idx: number) => ({
      name: item?.label ?? '',
      value: item?.value ?? 0, // 使用合并后的 value
      raw: item?.rawValue ?? '', // 使用合并后的 rawValue
      itemStyle: { color: talentPalette[idx % talentPalette.length] }
    }))
    .filter((d: any) => d.value > 0)

  if (!data.length) return {}

  let series: any[] = []
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  let k = 1 / 3 // 空心占比

  data.sort((a: any, b: any) => b.value - a.value)

  for (let i = 0; i < data.length; i++) {
    sumValue += data[i].value
    let seriesItem = {
      name: data[i].name,
      type: 'surface',
      parametric: true,
      wireframe: { show: false },
      pieData: data[i],
      pieStatus: { selected: false, hovered: false, k: k },
      itemStyle: data[i].itemStyle
    }
    series.push(seriesItem)
  }

  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value
    series[i].pieData.startRatio = startValue / sumValue
    series[i].pieData.endRatio = endValue / sumValue
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    )
    startValue = endValue
  }

  let boxHeight = getHeight3D(series, 25)

  const option: any = {
    backgroundColor: 'transparent',
    tooltip: {
      show: true,
      backgroundColor: 'rgba(20, 10, 10, 0.85)',
      borderColor: 'rgba(255, 210, 120, 0.8)',
      borderWidth: 1,
      padding: 0,
      textStyle: { color: '#fff' },
      extraCssText: 'box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6); border-radius: 8px;',
      formatter: (params: any) => {
        if (params.seriesName === 'pie2d' || params.seriesName === 'mouseoutSeries') return ''

        const seriesItem = option.series[params.seriesIndex]
        if (!seriesItem || !seriesItem.pieData) return ''

        const pieData = seriesItem.pieData
        const bfb = ((pieData.endRatio - pieData.startRatio) * 100).toFixed(2)

        return `
          <div style="padding: 8px 16px;">
            <div style="font-size: 22px; font-weight: bold; color: #ffe04b; margin-bottom: 10px;">${pieData.name}</div>
            <div style="font-size: 18px; color: #fff; display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="color: rgba(255,255,255,0.7); margin-right: 32px;">数量：</span>
              <span style="font-weight: bold; color: #ff8b39;">${pieData.raw}</span>
            </div>
            <div style="font-size: 18px; color: #fff; display: flex; justify-content: space-between; align-items: center;">
              <span style="color: rgba(255,255,255,0.7); margin-right: 32px;">占比：</span>
              <span style="font-weight: bold; color: #16d2ff;">${bfb}%</span>
            </div>
          </div>
        `
      }
    },
    xAxis3D: { min: -1, max: 1 },
    yAxis3D: { min: -1, max: 1 },
    zAxis3D: { min: -1, max: 1 },
    grid3D: {
      show: false,
      boxHeight: boxHeight,
      left: -60, // 微调偏移居中
      top: -40,
      viewControl: {
        alpha: 30, // 倾斜角度
        beta: 40, // 旋转角度
        distance: 220, // 镜头距离
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: false
      },
      light: {
        main: { intensity: 1.5, shadow: false },
        ambient: { intensity: 0.8 }
      }
    },
    series: series
  }

  // 添加一个透明的 2D 饼图，主要用于占据空间，辅助定位
  option.series.push({
    name: 'pie2d',
    type: 'pie',
    label: { show: false },
    labelLine: { show: false },
    startAngle: -25,
    clockwise: false,
    radius: ['65%', '65%'],
    center: ['50%', '50%'],
    data: data,
    itemStyle: { opacity: 0 }
  })

  return option
}

const pickList = (res: any): any[] => {
  const body = res?.data ?? res
  if (Array.isArray(body?.datalist)) return body.datalist
  if (Array.isArray(body?.dataList)) return body.dataList
  if (Array.isArray(body?.data?.datalist)) return body.data.datalist
  if (Array.isArray(body?.data?.dataList)) return body.data.dataList
  return []
}

/* =========================================================
   1. 人才政策 Tab
   ========================================================= */
type TalentType = '1' | '2'
type TalentRow = { label: string; value: string }

const talentTabs: Array<{ label: string; value: TalentType }> = [
  { label: '人才总量', value: '1' },
  { label: '认定高层次人才数量', value: '2' }
]

const activeTalentType = ref<TalentType>('1')
const talentList = ref<TalentRow[]>([])
const talentLoading = ref(false)

const talentCache: Record<TalentType, TalentRow[] | null> = {
  '1': null,
  '2': null
}

const fetchTalentData = async (type: TalentType = activeTalentType.value) => {
  talentLoading.value = true
  try {
    const res: any = await getTalentPolicy(type)
    const list = pickList(res)
    const sorted = [...list].sort((a: any, b: any) => Number(a?.sort ?? 0) - Number(b?.sort ?? 0))
    const rows: TalentRow[] = sorted.map((it: any) => ({
      label: it?.name ?? '',
      value: String(it?.num ?? 0)
    }))

    talentCache[type] = rows
    talentList.value = rows
  } catch (e) {
    console.error('人才政策查询失败', e)
    talentList.value = []
  } finally {
    talentLoading.value = false
  }
}

const handleTalentTabClick = async (type: TalentType) => {
  if (activeTalentType.value === type) return
  activeTalentType.value = type

  const cached = talentCache[type]
  if (cached) {
    talentList.value = cached
    return
  }
  await fetchTalentData(type)
}

// 合并同名数据
const mergedTalentList = computed(() => {
  const map = new Map<string, { label: string; value: number; rawValue: string }>()

  talentList.value.forEach((item) => {
    const val = pickNumber(item.value) ?? 0
    if (val <= 0) return

    if (map.has(item.label)) {
      const existing = map.get(item.label)!
      existing.value += val
      existing.rawValue = String(existing.value)
    } else {
      map.set(item.label, {
        label: item.label,
        value: val,
        rawValue: String(val)
      })
    }
  })

  return Array.from(map.values())
})

const talentOption = computed(() => getPie3DOption(mergedTalentList.value))

const talentLegendData = computed(() => {
  const list = mergedTalentList.value.map((item, idx) => ({
    ...item,
    color: talentPalette[idx % talentPalette.length]
  }))

  const sum = list.reduce((acc, cur) => acc + cur.value, 0)

  return list.map((d: any) => ({
    ...d,
    rate: sum ? `${((d.value / sum) * 100).toFixed(2)}%` : ''
  }))
})

/* =========================================================
   2. 群团组织 Tab
   ========================================================= */
type MassType = 1 | 2 | 3
type MassRow = { label: string; value: string; unit: string }

const massTabs: Array<{ label: string; value: MassType }> = [
  { label: '工会', value: 3 },
  { label: '共青团', value: 1 },
  { label: '妇联', value: 2 }
]

const activeMassType = ref<MassType>(3)
const massList = ref<MassRow[]>([])
const massLoading = ref(false)

const massCache: Record<MassType, MassRow[] | null> = { 1: null, 2: null, 3: null }

const fetchMassData = async (type: MassType = activeMassType.value) => {
  massLoading.value = true
  try {
    const res: any = await getOrganizaSituation(String(type))
    const list = pickList(res)
    const rows: MassRow[] = list.map((it: any) => ({
      label: it?.label ?? '',
      value: String(it?.value ?? ''),
      unit: it?.unit ?? ''
    }))

    massCache[type] = rows
    massList.value = rows
  } catch (e) {
    console.error('群团组织查询失败', e)
    massList.value = []
  } finally {
    massLoading.value = false
  }
}

const handleMassTabClick = async (type: MassType) => {
  if (activeMassType.value === type) return
  activeMassType.value = type

  const cached = massCache[type]
  if (cached) {
    massList.value = cached
    return
  }
  await fetchMassData(type)
}

/* =========================================================
   3. 党员服务中心分布
   ========================================================= */
type ServiceRow = { label: string; value: string }

const serviceList = ref<ServiceRow[]>([])
const serviceTotal = ref<string>('0')
const serviceLoading = ref(false)

const fetchServiceData = async () => {
  serviceLoading.value = true
  try {
    const res: any = await getServiceCentre()
    const list = pickList(res)
    const rows: ServiceRow[] = list.map((it: any) => ({
      label: String(it?.areaName ?? ''),
      value: String(it?.num ?? '0')
    }))

    serviceList.value = rows
    const total = rows.reduce((s, r) => s + (Number(r.value) || 0), 0)
    serviceTotal.value = String(total)
  } catch (e) {
    console.error('党员服务中心分布查询失败', e)
    serviceList.value = []
    serviceTotal.value = '0'
  } finally {
    serviceLoading.value = false
  }
}

/* =========================================================
   4. 志愿服务 Tab
   ========================================================= */
type VolType = 'volunteer' | 'team' | 'activity'
type VolRow = { label: string; value: string }
type VolRawItem = { areaName: string; num: string; organiza: string; activity: string }

const volTabs: Array<{ label: string; value: VolType; unit: string }> = [
  { label: '志愿者', value: 'volunteer', unit: '人' },
  { label: '志愿服务队伍', value: 'team', unit: '支' },
  { label: '志愿服务活动', value: 'activity', unit: '场' }
]

const activeVolType = ref<VolType>('volunteer')
const volRaw = ref<VolRawItem[]>([])
const volLoading = ref(false)

const currentVolTab = computed(
  () => volTabs.find((t) => t.value === activeVolType.value) || volTabs[0]
)

const fetchVolData = async () => {
  volLoading.value = true
  try {
    const res: any = await getIdealService()
    const list = pickList(res)
    volRaw.value = list.map((it: any) => ({
      areaName: it?.areaName ?? '',
      num: String(it?.num ?? '0'),
      organiza: String(it?.organiza ?? '0'),
      activity: String(it?.activity ?? '0')
    }))
  } catch (e) {
    console.error('志愿服务查询失败', e)
    volRaw.value = []
  } finally {
    volLoading.value = false
  }
}

const volRows = computed<VolRow[]>(() => {
  const key: keyof VolRawItem =
    activeVolType.value === 'volunteer'
      ? 'num'
      : activeVolType.value === 'team'
        ? 'organiza'
        : 'activity'

  return volRaw.value.map((it) => ({
    label: it.areaName,
    value: it[key]
  }))
})

const handleVolTabClick = (type: VolType) => {
  activeVolType.value = type
}

const calcAxisStep = (maxValue: number) => {
  if (!maxValue) return 1
  const targetTicks = 5
  const raw = maxValue / targetTicks
  const exp = Math.floor(Math.log10(raw))
  const base = Math.pow(10, exp)
  const f = raw / base
  const nf = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10
  return nf * base
}

const volOption = computed(() => {
  const rows = volRows.value
  const data = rows
    .map((item: any) => ({
      name: String(item?.label ?? ''),
      value: pickNumber(item?.value) ?? 0
    }))
    .filter((d: any) => d.name)

  const maxValue = data.reduce((m: number, d: any) => Math.max(m, d.value), 0)
  const step = calcAxisStep(maxValue)
  const maxAxis = maxValue ? Math.ceil(maxValue / step) * step : step * 5

  return {
    backgroundColor: 'transparent',
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      borderWidth: 0,
      backgroundColor: 'rgba(0,0,0,0.65)',
      textStyle: { color: '#fff', fontSize: 40 }
    },
    grid: { left: 106, right: 26, top: 36, bottom: 66, containLabel: false },
    xAxis: {
      type: 'category',
      data: data.map((d: any) => d.name),
      axisLabel: { color: 'rgba(255, 238, 206, 0.86)', fontSize: 30, interval: 0, margin: 16 },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: 'rgba(255, 210, 140, 0.35)' } }
    },
    yAxis: {
      type: 'value',
      max: maxAxis,
      interval: step,
      splitNumber: 5,
      axisLabel: { color: 'rgba(255, 238, 206, 0.78)', fontSize: 30 },
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: true, lineStyle: { color: 'rgba(255, 210, 140, 0.18)' } }
    },
    series: [
      {
        type: 'bar',
        data: data.map((d: any) => d.value),
        barWidth: 46,
        barMinHeight: 6,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 235, 160, 0.95)' },
              { offset: 0.35, color: 'rgba(255, 190, 70, 0.92)' },
              { offset: 1, color: 'rgba(255, 120, 0, 0.72)' }
            ]
          }
        }
      }
    ]
  }
})

/* =========================================================
   5. 发展党员 Tab
   ========================================================= */
type RecruitType = 1 | 2
type RecruitRow = { label: string; value: string; rate: string }

const recruitTabs: Array<{ label: string; columnTitle: string; value: RecruitType }> = [
  { label: '学历构成', columnTitle: '学历', value: 1 },
  { label: '年龄构成', columnTitle: '年龄', value: 2 }
]

const activeRecruitType = ref<RecruitType>(1)
const recruitList = ref<RecruitRow[]>([])
const recruitLoading = ref(false)

const recruitCache: Record<RecruitType, RecruitRow[] | null> = { 1: null, 2: null }

const currentRecruitTab = computed(
  () => recruitTabs.find((t) => t.value === activeRecruitType.value) || recruitTabs[0]
)

const fetchRecruitData = async (type: RecruitType = activeRecruitType.value) => {
  recruitLoading.value = true
  try {
    const res: any = await getRecruitPartyMembers(String(type))
    const list = pickList(res)
    const rows: RecruitRow[] = list.map((it: any) => ({
      label: it.label ?? '',
      value: String(it.value ?? ''),
      rate: it.rate ?? ''
    }))

    recruitCache[type] = rows
    recruitList.value = rows
  } catch (e) {
    console.error('发展党员查询失败', e)
    recruitList.value = []
  } finally {
    recruitLoading.value = false
  }
}

const handleRecruitTabClick = async (type: RecruitType) => {
  if (activeRecruitType.value === type) return
  activeRecruitType.value = type

  const cached = recruitCache[type]
  if (cached) {
    recruitList.value = cached
    return
  }
  await fetchRecruitData(type)
}

/* =========================================================
   初始化
   ========================================================= */
onMounted(() => {
  fetchRecruitData(1)
  fetchTalentData('1')
  fetchMassData(3)
  fetchServiceData()
  fetchVolData()
})
</script>

<style scoped>
.right-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  color: rgba(255, 238, 206, 0.92);
}

.panel {
  position: absolute;
  box-sizing: border-box;
  overflow: visible;
}

.panel--dev {
  left: 180px;
  top: 180px;
  width: 1000px;
  height: 950px;
  overflow: hidden;
}

.panel--dev .panel-head {
  height: 88px;
  padding: 14px 18px 0;
}

.panel--dev .panel-title {
  height: 56px;
  line-height: 56px;
  padding: 0 26px;
  font-size: 60px;
  letter-spacing: 2px;
}

.panel--dev .panel-tabs {
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  top: 120px;
}

.panel--dev .tab {
  min-width: 280px;
  height: 60px;
  line-height: 60px;
  font-size: 40px;
  border-radius: 30px;
  cursor: pointer;
}

.panel--dev .table {
  left: 18px;
  right: 18px;
  top: 200px;
  bottom: 22px;
  padding: 14px 14px 18px;
  box-sizing: border-box;
  overflow-y: auto;
}

.panel--dev .table::-webkit-scrollbar {
  width: 8px;
}

.panel--dev .table::-webkit-scrollbar-thumb {
  background: rgba(255, 200, 130, 0.4);
  border-radius: 4px;
}

.panel--dev .table-head {
  height: 64px;
  padding: 0 18px;
  background: transparent;
  border-bottom: 1px solid rgba(255, 200, 130, 0.2);
  font-size: 40px;
  color: rgba(255, 238, 206, 0.9);
}

.panel--dev .table-row {
  position: relative;
  height: 74px;
  margin-top: 14px;
  padding: 0 18px;
  border-bottom: none;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 200, 130, 0.22);
  background:
    linear-gradient(135deg, rgba(255, 210, 120, 0.22) 0 18%, transparent 18% 100%),
    linear-gradient(90deg, rgba(120, 30, 20, 0.65), rgba(80, 20, 10, 0.35));
  box-shadow: inset 0 0 0 1px rgba(255, 220, 160, 0.06);
}

.panel--dev .table-row:nth-of-type(even) {
  background:
    linear-gradient(135deg, rgba(255, 210, 120, 0.18) 0 18%, transparent 18% 100%),
    linear-gradient(90deg, rgba(100, 25, 15, 0.6), rgba(70, 15, 10, 0.3));
}

.panel--dev .table-row .c1 {
  font-size: 40px;
  color: rgba(255, 238, 206, 0.92);
}

.panel--dev .table-row .c2,
.panel--dev .table-row .c3 {
  font-size: 40px;
}

.panel--dev .table-empty {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: rgba(255, 238, 206, 0.6);
}

/* ==================== 原人才政策位置：群团组织 ==================== */
.panel--talent {
  left: 1420px;
  top: 180px;
  width: 1000px;
  height: 950px;
  overflow: hidden;
}

.panel--talent .panel-head {
  height: 150px;
  padding: 18px 30px 0;
}

.panel--talent .panel-title {
  height: 56px;
  line-height: 56px;
  padding: 0 26px;
  font-size: 60px;
  margin-left: -50px;
}

.panel--talent .panel-tabs {
  left: 60px;
  top: 120px;
  right: auto;
  gap: 40px;
}

.panel--talent .tab {
  min-width: 250px;
  height: 60px;
  line-height: 60px;
  font-size: 40px;
  border-radius: 30px;
  cursor: pointer;
}

.panel--talent .mass-list {
  position: absolute;
  left: 0;
  right: 20px;
  top: 220px;
  bottom: 20px;
  display: grid;
  align-content: space-evenly;
  gap: 0;
  padding: 0 20px;
  box-sizing: border-box;
}

.panel--talent .mass-row {
  height: 200px;
  display: grid;
  grid-template-columns: 300px 1fr;
  align-items: center;
  column-gap: 30px;
}

.panel--talent .mass-left {
  position: relative;
  height: 200px;
  display: grid;
  align-content: center;
  justify-items: center;
  row-gap: 14px;
}

.panel--talent .mass-badge {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid rgba(255, 200, 130, 0.72);
  background:
    radial-gradient(circle at 40% 30%, rgba(255, 235, 170, 0.52), rgba(120, 10, 10, 0.22)),
    radial-gradient(circle, rgba(255, 220, 140, 0.12), rgba(140, 10, 10, 0.35));
  box-shadow:
    inset 0 0 0 2px rgba(255, 220, 160, 0.08),
    0 0 24px rgba(255, 180, 80, 0.12);
  position: relative;
}

.panel--talent .mass-badge::before {
  content: '';
  position: absolute;
  inset: 24px;
  border-radius: 14px;
  border: 1px solid rgba(255, 220, 160, 0.35);
  background: rgba(255, 220, 140, 0.14);
}

.panel--talent .mass-badge--a::after,
.panel--talent .mass-badge--b::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: rgba(255, 220, 140, 0.88);
  box-shadow: 0 0 10px rgba(255, 210, 120, 0.28);
}

.panel--talent .mass-badge--b::after {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.panel--talent .mass-name {
  width: 280px;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.92);
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.panel--talent .mass-right {
  height: 140px;
  padding: 0 34px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  border: 3px solid rgba(255, 200, 130, 0.62);
  background:
    linear-gradient(135deg, rgba(255, 210, 120, 0.22) 0 18%, transparent 18% 100%),
    linear-gradient(90deg, rgba(120, 30, 20, 0.45), rgba(80, 20, 10, 0.25));
  box-shadow:
    inset 0 0 0 1px rgba(255, 220, 160, 0.06),
    0 0 18px rgba(255, 140, 70, 0.06);
  border-radius: 12px;
}

.panel--talent .mass-num {
  font-size: 80px;
  font-weight: 900;
  color: rgba(255, 220, 140, 0.98);
  letter-spacing: 1px;
}

.panel--talent .mass-unit {
  font-size: 44px;
  font-weight: 800;
  color: rgba(255, 220, 140, 0.9);
  padding-top: 10px;
}

.panel--talent .mass-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-size: 32px;
  color: rgba(255, 238, 206, 0.6);
}

/* ==================== 原群团组织位置：人才政策 ==================== */
.panel--mass {
  left: 2700px;
  top: 180px;
  width: 1000px;
  height: 1930px;
  overflow: hidden;
}

.panel--mass .panel-head {
  height: 150px;
  padding: 14px 18px 0;
}

.panel--mass .panel-title {
  height: 56px;
  line-height: 56px;
  padding: 0 26px;
  font-size: 64px;
  margin-left: -50px;
}

.panel--mass .panel-tabs {
  left: 60px;
  top: 150px;
  right: auto;
  gap: 40px;
}

.panel--mass .tab {
  min-width: 250px;
  height: 60px;
  line-height: 60px;
  font-size: 40px;
  border-radius: 30px;
  cursor: pointer;
}

.panel--mass .panel-total--talent {
  position: absolute;
  right: 170px;
  top: 240px;
  height: 56px;
  min-width: 320px;
  padding: 0 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 30px;
  border-radius: 6px;
}

.panel--mass .panel-total--talent .total-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 210, 120, 0.9);
  box-shadow: 0 0 12px rgba(255, 210, 120, 0.18);
}

.panel--mass .panel-total--talent .total-label {
  font-size: 22px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.88);
  white-space: nowrap;
}

.panel--mass .panel-total--talent .total-value {
  font-size: 30px;
  font-weight: 900;
  color: rgba(255, 220, 140, 0.98);
  white-space: nowrap;
}

/* 上方：图表区域 */
.panel--mass .talent-body {
  position: absolute;
  left: 100px;
  right: 100px;
  top: 200px;
  height: 800px;
  overflow: hidden;
}

.panel--mass .donut {
  width: 100%;
  height: 100%;
}

/* 下方：自定义图例列表 */
.panel--mass .talent-legend-list {
  position: absolute;
  left: 60px;
  right: 60px;
  top: 1050px;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 30px;
  overflow-y: auto;
}

.panel--mass .talent-legend-list::-webkit-scrollbar {
  width: 8px;
}

.panel--mass .talent-legend-list::-webkit-scrollbar-thumb {
  background: rgba(255, 200, 130, 0.4);
  border-radius: 4px;
}

.panel--mass .legend-row {
  display: flex;
  align-items: center;
  height: 90px;
  padding: 0 30px;
  background:
    linear-gradient(135deg, rgba(255, 210, 120, 0.18) 0 18%, transparent 18% 100%),
    linear-gradient(90deg, rgba(120, 30, 20, 0.45), rgba(80, 20, 10, 0.25));
  border: 1px solid rgba(255, 200, 130, 0.22);
  border-radius: 10px;
  flex-shrink: 0;
}

.panel--mass .legend-mark {
  width: 24px;
  height: 16px;
  border-radius: 4px;
  margin-right: 30px;
  box-shadow: 0 0 12px rgba(255, 210, 120, 0.2);
}

.panel--mass .legend-label {
  flex: 1;
  font-size: 36px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.92);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.panel--mass .legend-value {
  width: 220px;
  text-align: right;
  font-size: 38px;
  font-weight: 800;
  color: rgba(255, 238, 206, 0.98);
}

.panel--mass .legend-rate {
  width: 180px;
  text-align: right;
  font-size: 36px;
  font-weight: 700;
  color: rgba(255, 220, 140, 0.98);
}

/* ==================== 党员服务中心分布 ==================== */
.panel--service {
  left: 180px;
  top: 1190px;
  width: 1000px;
  height: 950px;
}

.panel--service .panel-head {
  overflow: visible;
}

.panel--service .panel-title {
  font-size: 60px;
  position: relative;
  top: -30px;
  left: -30px;
}

.panel--service .panel-total {
  position: absolute;
  right: 100px;
  top: 126px;
  height: 64px;
  min-width: 380px;
  padding: 0 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  background:
    linear-gradient(135deg, rgba(255, 210, 120, 0.26) 0 16%, transparent 16% 100%),
    linear-gradient(90deg, rgba(120, 30, 20, 0.65), rgba(80, 20, 10, 0.35));
  box-shadow:
    inset 0 0 0 1px rgba(255, 220, 160, 0.06),
    0 0 18px rgba(255, 140, 70, 0.06);
  border-radius: 6px;
}

.panel--service .panel-total .total-label {
  font-size: 28px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.9);
  white-space: nowrap;
}

.panel--service .panel-total .total-value {
  font-size: 44px;
  font-weight: 900;
  color: rgba(255, 220, 140, 0.98);
  white-space: nowrap;
}

.service-list {
  position: absolute;
  left: 26px;
  right: 26px;
  top: 300px;
  bottom: 26px;
  display: grid;
  align-content: start;
  gap: 50px;
}

.service-row {
  position: relative;
  height: 96px;
  padding-left: 30px;
  padding-right: 24px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 180px;
  align-items: center;
}

.service-dot {
  position: absolute;
  left: 0;
  top: 44px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 210, 120, 0.85);
}

.service-label {
  font-size: 40px;
  color: rgba(255, 238, 206, 0.92);
}

.service-value {
  text-align: right;
  font-size: 40px;
  font-weight: 900;
  color: rgba(255, 238, 206, 0.98);
}

.service-track {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 10px;
  height: 22px;
  border: 2px solid rgba(255, 200, 130, 0.62);
  background: rgba(120, 10, 10, 0.18);
  box-shadow:
    inset 0 0 0 2px rgba(255, 220, 160, 0.08),
    0 0 18px rgba(255, 140, 70, 0.06);
  box-sizing: border-box;
}

.service-track::after {
  content: '';
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 5px;
  height: 10px;
  background: linear-gradient(90deg, rgba(255, 210, 120, 0.85), rgba(255, 120, 0, 0.55));
  transform: scaleX(var(--fillx, 0));
  transform-origin: left;
}

.service-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 96px;
  font-size: 28px;
  color: rgba(255, 238, 206, 0.6);
}

/* ==================== 志愿服务 ==================== */
.panel--vol {
  left: 1460px;
  top: 1160px;
  width: 1000px;
  height: 950px;
}

.panel--vol .panel-title {
  height: 56px;
  line-height: 56px;
  padding: 0 26px;
  font-size: 60px;
  margin-left: -60px;
}

.panel--vol .panel-tabs {
  top: 120px;
  right: 126px;
  gap: 28px;
}

.panel--vol .tab {
  min-width: 250px;
  height: 60px;
  line-height: 60px;
  font-size: 40px;
  border-radius: 30px;
  cursor: pointer;
}

.panel--vol .vol-meta {
  position: absolute;
  left: 26px;
  right: 26px;
  top: 186px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel--vol .vol-unit {
  font-size: 18px;
  color: rgba(255, 238, 206, 0.82);
}

.panel--vol .vol-total {
  height: 56px;
  min-width: 360px;
  padding: 0 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 14px;
  background:
    linear-gradient(135deg, rgba(255, 210, 120, 0.26) 0 16%, transparent 16% 100%),
    linear-gradient(90deg, rgba(120, 30, 20, 0.65), rgba(80, 20, 10, 0.35));
  box-shadow:
    inset 0 0 0 1px rgba(255, 220, 160, 0.06),
    0 0 18px rgba(255, 140, 70, 0.06);
  border-radius: 6px;
}

.panel--vol .vol-total .total-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 220, 140, 0.88);
  box-shadow: 0 0 10px rgba(255, 210, 120, 0.28);
}

.panel--vol .vol-total .total-label {
  font-size: 22px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.9);
  white-space: nowrap;
}

.panel--vol .vol-total .total-value {
  font-size: 28px;
  font-weight: 900;
  color: rgba(255, 220, 140, 0.98);
  white-space: nowrap;
}

.panel--vol .vol-total .total-suffix {
  font-size: 22px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.86);
  white-space: nowrap;
}

.panel--vol .vol-body {
  position: absolute;
  left: 26px;
  right: 26px;
  top: 268px;
  bottom: 26px;
}

.panel--vol .vol-chart {
  width: 100%;
  height: 100%;
}

/* ==================== 公共 ==================== */
.panel-head {
  position: relative;
  height: 92px;
  padding: 16px 20px;
  box-sizing: border-box;
}

.panel-title {
  height: 52px;
  line-height: 52px;
  padding: 0 18px;
  display: inline-block;
  font-size: 60px;
  font-weight: 800;
  color: rgba(255, 238, 206, 0.98);
  letter-spacing: 2px;
}

.panel-total {
  position: absolute;
  right: 20px;
  top: 26px;
  font-size: 22px;
  color: rgba(255, 238, 206, 0.88);
}

.panel-tabs {
  position: absolute;
  right: 20px;
  top: 18px;
  display: flex;
  gap: 120px;
  align-items: center;
}

.tab {
  min-width: 160px;
  height: 44px;
  line-height: 44px;
  padding: 0 16px;
  box-sizing: border-box;
  text-align: center;
  font-size: 22px;
  color: rgba(255, 238, 206, 0.9);
  border-radius: 22px;
  border: 2px solid rgba(255, 200, 130, 0.55);
  background: rgba(120, 10, 10, 0.22);
}

.tab--active {
  background: radial-gradient(circle at 50% 30%, rgba(255, 220, 140, 0.52), rgba(120, 30, 20, 0.4));
  box-shadow: 0 0 16px rgba(255, 210, 120, 0.12);
}

.table {
  position: absolute;
  left: 26px;
  right: 26px;
  top: 116px;
  bottom: 26px;
}

.table-head,
.table-row {
  display: grid;
  grid-template-columns: 1fr 180px 180px;
  align-items: center;
  height: 96px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(255, 200, 130, 0.18);
}

.table-head {
  height: 80px;
  font-size: 24px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.9);
  background: rgba(120, 10, 10, 0.14);
}

.table-row {
  font-size: 28px;
  color: rgba(255, 238, 206, 0.96);
}

.table-row .c2,
.table-row .c3 {
  text-align: right;
  font-weight: 800;
  color: rgba(255, 238, 206, 0.98);
}
</style>
