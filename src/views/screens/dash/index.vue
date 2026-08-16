<template>
  <div class="shell shell--scrollable">
    <div class="viewport" :style="{ width: `${designWidth}px`, height: `${designHeight}px` }">
      <div
        class="screen"
        :style="{
          width: `${designWidth}px`,
          height: `${designHeight}px`,
          backgroundImage: `url(${bgUrl})`
        }"
      >
        <header class="header">
          <div class="header-side header-side-left">
            <span class="header-chip">{{ timeText }}</span>
            <span class="header-chip2">{{ weekText }}</span>
          </div>
          <div class="brand">城 市 管 理</div>
          <div class="header-side header-side-right">
            <span class="header-chip3">北京时间</span>
            <span class="header-chip4">{{ hmsText }}</span>
          </div>
        </header>

        <section class="body">
          <DashLeft
            :data="dashData"
            @greenland-metric-change="handleGreenlandMetricTypeChange"
            @greenland-trend-change="handleGreenlandTrendTypeChange"
            @sanitation-type-change="handleSanitationTypeChange"
          />
          <DashCenter :data="dashData" @area-change="handleAreaChange" />
          <DashRight :data="dashData" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

import {
  getCityBigscreenAppealList,
  getCityBigscreenCaseStatistics,
  getCityBigscreenCaseStatisticsByArea,
  getCityBigscreenComponentDistribution,
  getCityBigscreenEnergy,
  getCityBigscreenFull,
  getCityBigscreenGreenland,
  getCityBigscreenGreenland2,
  getCityBigscreenGrid,
  getCityBigscreenLandArea,
  getCityBigscreenLawCase,
  getCityBigscreenPark,
  getCityBigscreenSanitation
} from '@/api'
import bgUrl from '@/assets/img/bg.jpg'
import DashCenter from './parts/DashCenter.vue'
import DashLeft from './parts/DashLeft.vue'
import DashRight from './parts/DashRight.vue'
import {
  createEmptyDashData,
  type DashScreenData,
  type LineSeries,
  type NamedValue,
  type RankRow,
  type SideStat,
  type TimeBarMetric
} from './types'

const designWidth = 11520
const designHeight = 2160

const dashData = reactive<DashScreenData>(createEmptyDashData())
const dashError = ref('')
const selectedAreaName = ref('铁西区')

type UnknownRecord = Record<string, unknown>

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const toNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[%,$，\s]/g, ''))
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

const toStringValue = (value: unknown) => {
  if (value === null || value === undefined) return ''
  return String(value)
}

const getDataList = (source: unknown) => {
  return isRecord(source) && Array.isArray(source.dataList) ? source.dataList : []
}

const preferPublishedRows = (rows: unknown[]) => {
  const published = rows.filter((item) => isRecord(item) && item.dataStatus === 'PUBLISHED')
  return published.length ? published : rows
}

const buildTimeMetric = (source: unknown, fallbackName: string, unit?: string): TimeBarMetric => {
  const rows = Array.isArray(source) ? source : []
  const validRows = rows
    .filter((item) => isRecord(item))
    .map((item) => ({
      year: toStringValue(item.year || item.date || item.month || item.name || item.xAxis),
      value: toNumber(item.num || item.value || item.count || item.area || item.data)
    }))
    .filter((item) => item.year && item.value !== undefined)

  if (!validRows.length) {
    return {
      name: fallbackName,
      years: [],
      data: [],
      unit
    }
  }

  return {
    name: fallbackName,
    years: validRows.map((item) => item.year),
    data: validRows.map((item) => item.value ?? 0),
    unit
  }
}

const buildGreenlandMetric = (source: unknown, fallbackName: string, unit?: string) => {
  if (Array.isArray(source)) return buildTimeMetric(source, fallbackName, unit)
  if (isRecord(source)) {
    const years = Array.isArray(source.years)
      ? source.years
      : Array.isArray(source.xAxis)
        ? source.xAxis
        : Array.isArray(source.dateList)
          ? source.dateList
          : []
    const values = Array.isArray(source.values)
      ? source.values
      : Array.isArray(source.data)
        ? source.data
        : Array.isArray(source.countList)
          ? source.countList
          : []
    if (years.length && values.length && years.length === values.length) {
      return {
        name: toStringValue(source.name || source.title) || fallbackName,
        years: years.map((item) => String(item)),
        data: values.map((item) => toNumber(item) ?? 0),
        unit: toStringValue(source.unit) || unit
      }
    }
  }
  return {
    name: fallbackName,
    years: [],
    data: [],
    unit
  }
}

const buildTrend = (source: unknown) => {
  const trendSource = isRecord(source)
    ? (isRecord(source.trend) && source.trend) ||
      (isRecord(source.lineChart) && source.lineChart) ||
      (isRecord(source.line) && source.line) ||
      source
    : source
  const xSource =
    isRecord(trendSource) &&
    (trendSource.x ||
      trendSource.xAxis ||
      trendSource.years ||
      trendSource.dates ||
      trendSource.months)
  const x = Array.isArray(xSource) ? xSource.map((item) => String(item)) : []
  const rawSeries =
    isRecord(trendSource) && (trendSource.series || trendSource.lines || trendSource.lineList)
  const series: LineSeries[] = Array.isArray(rawSeries)
    ? rawSeries
        .map((item) => {
          if (!isRecord(item)) return null
          const name = toStringValue(item.name || item.label || item.type)
          const data = item.data || item.values || item.list
          if (!name || !Array.isArray(data)) return null
          return {
            name,
            data: data.map((value) => toNumber(value) ?? 0)
          }
        })
        .filter((item): item is LineSeries => Boolean(item))
    : []

  return { x, series }
}

const buildKpis = (source: unknown) => {
  const summary = isRecord(source) && isRecord(source.summary) ? source.summary : undefined
  const standCase =
    summary?.standCase ||
    (isRecord(source) && (source.standCase || source.caseNum || source.fileCount))
  const closeCase =
    summary?.closeCase ||
    (isRecord(source) && (source.closeCase || source.closeCount || source.finishCount))
  const closeRate =
    summary?.closeRate || (isRecord(source) && (source.closeRate || source.finishRate))

  return [
    { label: '立案数', value: toNumber(standCase) ?? toStringValue(standCase) },
    { label: '结案数', value: toNumber(closeCase) ?? toStringValue(closeCase) },
    {
      label: '结案率',
      value:
        typeof closeRate === 'string' && closeRate.includes('%')
          ? closeRate
          : closeRate !== undefined && closeRate !== ''
            ? `${toStringValue(closeRate)}%`
            : ''
    }
  ]
}

const hasKpiValue = (list: DashScreenData['centerKpis']) =>
  list.some((item) => String(item.value).trim() !== '')

const buildSideStats = (source: unknown) => {
  const root = isRecord(source) ? source : undefined
  const payload = (root && isRecord(root.data) ? root.data : root) as UnknownRecord | undefined
  const summary =
    (payload && isRecord(payload.summary) ? payload.summary : undefined) ||
    (payload && isRecord((payload as any).data) && isRecord((payload as any).data.summary)
      ? ((payload as any).data.summary as UnknownRecord)
      : undefined) ||
    (root && isRecord(root.summary) ? root.summary : undefined)

  const container = (summary || payload || root || {}) as UnknownRecord

  const parseRows = (rows: unknown[]): SideStat[] =>
    rows
      .map((item) => {
        if (!isRecord(item)) return null
        const name = toStringValue(item.name || item.label || item.title)
        if (!name) return null
        return {
          name,
          year: toNumber(item.year || item.current || item.thisYear || item.yearNum) ?? 0,
          last: toNumber(item.last || item.lastMonth || item.month || item.lastNum) ?? 0
        }
      })
      .filter((item): item is SideStat => Boolean(item))

  const leftRows =
    container.left ||
    (container as any).leftList ||
    (container as any).leftRows ||
    (container as any).leftData ||
    (container as any).centerSideLeft
  const rightRows =
    container.right ||
    (container as any).rightList ||
    (container as any).rightRows ||
    (container as any).rightData ||
    (container as any).centerSideRight

  return {
    left: parseRows(Array.isArray(leftRows) ? leftRows : []),
    right: parseRows(Array.isArray(rightRows) ? rightRows : [])
  }
}

const loadCaseStatisticsByArea = async (areaName: string) => {
  const payload = await getCityBigscreenCaseStatisticsByArea<UnknownRecord>({ areaName })
  const root = isRecord(payload) ? payload : ({} as UnknownRecord)
  const summary =
    (isRecord(root.summary) && root.summary) ||
    ((isRecord((root as any).data) && isRecord((root as any).data.summary) && (root as any).data.summary) as
      | UnknownRecord
      | undefined)

  const latestSource =
    (summary && (summary.latestData || (summary as any).latestList || (summary as any).latest)) || []
  const previousSource =
    (summary && (summary.previousData || (summary as any).previousList || (summary as any).previous)) || []

  const latestRows = preferPublishedRows(Array.isArray(latestSource) ? latestSource : []).filter((item) =>
    isRecord(item)
  )
  const previousRows = preferPublishedRows(
    Array.isArray(previousSource) ? previousSource : []
  ).filter((item) => isRecord(item))

  const getName = (item: UnknownRecord) => toStringValue(item.label || item.name || item.title)
  const getValue = (item: UnknownRecord) =>
    toNumber(item.standCase ?? item.closeCase ?? item.value ?? item.num ?? item.count)

  const previousMap = new Map<string, UnknownRecord>()
  previousRows.forEach((row) => {
    const name = getName(row)
    if (!name) return
    previousMap.set(name, row)
  })

  const stats: SideStat[] = []
  latestRows.forEach((row) => {
    const name = getName(row)
    if (!name) return
    const prev = previousMap.get(name)
    stats.push({
      name,
      year: getValue(row) ?? 0,
      last: prev ? getValue(prev) ?? 0 : 0
    })
    previousMap.delete(name)
  })

  previousMap.forEach((row, name) => {
    stats.push({
      name,
      year: 0,
      last: getValue(row) ?? 0
    })
  })

  const half = Math.ceil(stats.length / 2)
  dashData.centerSideLeft = stats.slice(0, half)
  dashData.centerSideRight = stats.slice(half)
}

const formatDate = (value: unknown) => {
  if (typeof value === 'number') {
    const date = new Date(value)
    if (!Number.isNaN(date.getTime())) {
      const pad = (n: number) => String(n).padStart(2, '0')
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
    }
  }
  return toStringValue(value)
}

const greenlandTypeToMetricKey = (type: 1 | 2 | 3 | 4 | 5) => {
  if (type === 2 || type === 5) return 'garden'
  if (type === 3) return 'park'
  return 'cover'
}

const loadGreenlandMetric = async (type: 1 | 2 | 3 = 1) => {
  const payload = await getCityBigscreenGreenland2<UnknownRecord>({ type })
  const summary = isRecord(payload.summary) ? payload.summary : undefined
  const listSource =
    (summary && Array.isArray(summary.list) && summary.list) ||
    (summary && Array.isArray((summary as any).dataList) && (summary as any).dataList) ||
    getDataList(payload)
  const key = greenlandTypeToMetricKey(type)
  const rows = preferPublishedRows(Array.isArray(listSource) ? listSource : []).filter(
    (item) => isRecord(item) && toStringValue(item.type) === String(type)
  )
  const nameMap: Record<string, string> = {
    cover: '绿化覆盖面积',
    garden: '园林绿地面积',
    park: '公园占地面积'
  }
  dashData.greeningMetrics[key] = buildTimeMetric(rows, nameMap[key])
}

const loadGreenlandTrend = async (type: 1 | 2 = 1) => {
  const payload = await getCityBigscreenGreenland<UnknownRecord>({ type })
  const key = greenlandTypeToMetricKey(type)
  const summary = isRecord(payload.summary) ? payload.summary : undefined
  const listSource =
    (summary && Array.isArray(summary.list) && summary.list) ||
    (summary && Array.isArray((summary as any).dataList) && (summary as any).dataList) ||
    getDataList(payload)
  const rows = preferPublishedRows(Array.isArray(listSource) ? listSource : [])
    .filter((item) => isRecord(item) && toStringValue(item.type) === String(type))
    .filter((item) => toStringValue(item.year))
    .sort((a, b) => String(a.year).localeCompare(String(b.year)))

  const x = rows.map((item) => String(item.year))
  const y = rows.map((item) => toNumber(item.area ?? item.num ?? item.value) ?? 0)
  const seriesName =
    type === 1
      ? '人均绿地面积'
      : type === 2
        ? '建成区绿地面积'
        : dashData.greeningMetrics[key]?.name || ''

  dashData.greenlandTrend = {
    x,
    series: [
      {
        name: seriesName,
        data: y,
        color: '#36e8ff'
      }
    ]
  }
}

const loadSanitationMetric = async (type: 1 | 2 | 3 = 1) => {
  const payload = await getCityBigscreenSanitation<UnknownRecord>({ type })
  const key = greenlandTypeToMetricKey(type)
  const rows = preferPublishedRows(getDataList(payload)).filter(
    (item) => isRecord(item) && (!item.type || toStringValue(item.type) === String(type))
  )
  const nameMap: Record<string, { name: string; unit?: string }> = {
    cover: { name: '清扫道路面积', unit: '万平方米' },
    garden: { name: '生活垃圾清运量', unit: '吨' },
    park: { name: '公厕数', unit: '座' }
  }
  dashData.sanitationMetrics[key] = buildTimeMetric(rows, nameMap[key].name, nameMap[key].unit)
}

const loadPark = async () => {
  const payload = await getCityBigscreenPark<UnknownRecord>()
  const summary = isRecord(payload.summary) ? payload.summary : undefined
  const rankings = summary?.rankings
  const buildings = summary?.buildings

  const mapRankRows = (rows: unknown[], isBuilding = false): RankRow[] =>
    preferPublishedRows(rows)
      .map((item, index) => {
        if (!isRecord(item)) return null
        const district = toStringValue(item.areaName || item.district || item.area)
        const name = isBuilding
          ? toStringValue(item.seat || item.location || item.address)
          : toStringValue(item.parkName || item.name || item.title)
        if (!district || !name) return null
        return {
          rank: toNumber(item.ranking || item.rank || item.sort) ?? index + 1,
          district,
          name
        }
      })
      .filter((item): item is RankRow => Boolean(item))

  dashData.pocketParks = Array.isArray(rankings) ? mapRankRows(rankings) : []
  dashData.pocketParkConstruction = Array.isArray(buildings) ? mapRankRows(buildings, true) : []
}

const loadLandArea = async () => {
  const payload = await getCityBigscreenLandArea<UnknownRecord>()
  dashData.landAreaData = preferPublishedRows(getDataList(payload))
    .map((item) => {
      if (!isRecord(item)) return null
      const name = toStringValue(item.label)
      const value = toNumber(item.area)
      const total = toNumber(item.planArea)
      if (!name || value === undefined) return null
      return { name, value, total }
    })
    .filter((item): item is NamedValue => Boolean(item))
}

const loadEnergy = async () => {
  const payload = await getCityBigscreenEnergy<UnknownRecord>({ limit: 1 })
  const summary = isRecord(payload.summary) ? payload.summary : undefined
  const listSource =
    (summary && Array.isArray(summary.list) && summary.list) ||
    (summary && Array.isArray((summary as any).dataList) && (summary as any).dataList) ||
    getDataList(payload)
  const rows = preferPublishedRows(Array.isArray(listSource) ? listSource : []).filter((item) =>
    isRecord(item)
  )
  const latest = rows[0] ?? rows[rows.length - 1]

  if (!latest || !isRecord(latest)) {
    dashData.energyItems = []
    return
  }

  const mapping = [
    { key: 'length', label: '安装路灯道路长度', color: '#2563eb' },
    { key: 'lamp', label: '道路照明灯盏数', color: '#caa822' },
    { key: 'powerAmount', label: '城市照明装灯总功率', color: '#10b98c' },
    { key: 'powerRate', label: '城市照明总用电量', color: '#6c42d8' }
  ]

  dashData.energyItems = mapping
    .map((item) => {
      const value = toNumber((latest as any)[item.key])
      if (value === undefined) return null
      return { name: item.label, value, color: item.color }
    })
    .filter((item): item is DashScreenData['energyItems'][number] => Boolean(item))
}

const loadGrid = async () => {
  const payload = await getCityBigscreenGrid<UnknownRecord>()
  const rows = preferPublishedRows(getDataList(payload))
  const grouped = new Map<
    string,
    { streets: Set<string>; communities: Set<string>; grid: number }
  >()

  rows.forEach((item) => {
    if (!isRecord(item)) return
    const areaName = toStringValue(item.areaName)
    if (!areaName) return
    if (!grouped.has(areaName)) {
      grouped.set(areaName, { streets: new Set(), communities: new Set(), grid: 0 })
    }
    const bucket = grouped.get(areaName)!
    const streetName = toStringValue(item.streetName)
    const communityName = toStringValue(item.communityName)
    if (streetName) bucket.streets.add(streetName)
    if (communityName) bucket.communities.add(communityName)
    bucket.grid += toNumber(item.gridNum) ?? 0
  })

  dashData.gridInfoRows = Array.from(grouped.entries()).map(([name, bucket]) => ({
    name,
    town: bucket.streets.size,
    village: bucket.communities.size,
    grid: bucket.grid
  }))
}

const loadComponentDistribution = async () => {
  const payload = await getCityBigscreenComponentDistribution<UnknownRecord>()
  dashData.componentDistribution = preferPublishedRows(getDataList(payload))
    .map((item) => {
      if (!isRecord(item)) return null
      const name = toStringValue(item.itemType || item.type || item.name || item.label) || ''
      const value = toNumber(item.num || item.value || item.count)
      if (!name || value === undefined) return null
      return { name, value }
    })
    .filter((item): item is NamedValue => Boolean(item))
}

const loadCaseStatistics = async () => {
  const payload = await getCityBigscreenCaseStatistics<UnknownRecord>()
  dashData.centerKpis = buildKpis(payload)
}

const loadAppealList = async () => {
  const payload = await getCityBigscreenAppealList<UnknownRecord>({ pageNo: 1, pageSize: 20 })
  const summary = isRecord(payload.summary) ? payload.summary : undefined
  const listSource =
    (summary && Array.isArray(summary.list) && summary.list) ||
    (summary && Array.isArray((summary as any).dataList) && (summary as any).dataList) ||
    getDataList(payload)

  dashData.appealEvents = (Array.isArray(listSource) ? listSource : [])
    .map((item) => {
      if (!isRecord(item)) return null
      const date = formatDate(
        item.processingtime ||
          item.processingTime ||
          item.processTime ||
          item.date ||
          item.time ||
          item.createTime ||
          item.occurTime
      )
      const name = toStringValue(item.name || item.title || item.eventName || item.appealName)
      if (!date && !name) return null
      return {
        date,
        name,
        dep: toStringValue(
          item.handlingDepartment ||
            item.department ||
            item.deptName ||
            item.handleDept ||
            item.organName
        ),
        score:
          toStringValue(
            item.handleEvaluate ||
              item.handleResult ||
              item.evaluate ||
              item.score ||
              item.satisfaction ||
              item.status
          ) || '-'
      }
    })
    .filter((item): item is DashScreenData['appealEvents'][number] => Boolean(item))
}

const loadLawCase = async () => {
  const payload = await getCityBigscreenLawCase<UnknownRecord>()
  const rows = preferPublishedRows(getDataList(payload))
    .filter((item) => isRecord(item) && toStringValue(item.dateMonth))
    .sort((a, b) => String(a.dateMonth).localeCompare(String(b.dateMonth)))

  dashData.caseCount = {
    x: rows.map((item) => String(item.dateMonth)),
    y: rows.map((item) => toNumber(item.appearNum) ?? 0)
  }

  const latest = rows[rows.length - 1]
  dashData.caseRing = latest
    ? [
        { name: '上报数', value: toNumber(latest.appearNum) ?? 0, color: '#ffdd22' },
        { name: '立案数', value: toNumber(latest.registerNum) ?? 0, color: '#0078ff' },
        { name: '派遣数', value: toNumber(latest.sendNum) ?? 0, color: '#00ccff' },
        { name: '处置数', value: toNumber(latest.disposeNum) ?? 0, color: '#26e8ee' },
        { name: '结案数', value: toNumber(latest.windNum) ?? 0, color: '#ff8822' },
        { name: '核查数', value: toNumber(latest.checkNum) ?? 0, color: '#ff2222' }
      ]
    : []
}

const loadFull = async () => {
  const payload = await getCityBigscreenFull<UnknownRecord>()
  const kpis = buildKpis(payload)
  if (hasKpiValue(kpis)) {
    dashData.centerKpis = kpis
  }
  if (!selectedAreaName.value) {
    const sideStats = buildSideStats(payload)
    dashData.centerSideLeft = sideStats.left
    dashData.centerSideRight = sideStats.right
  }
}

const loadDashScreen = async () => {
  Object.assign(dashData, createEmptyDashData())
  dashError.value = ''

  const results = await Promise.allSettled([
    loadGreenlandMetric(1),
    loadGreenlandTrend(1),
    loadSanitationMetric(1),
    loadPark(),
    loadLandArea(),
    loadEnergy(),
    loadGrid(),
    loadComponentDistribution(),
    loadCaseStatistics(),
    loadCaseStatisticsByArea(selectedAreaName.value),
    loadAppealList(),
    loadLawCase(),
    loadFull()
  ])

  if (results.every((item) => item.status === 'rejected')) {
    dashError.value = '大屏接口暂不可用，当前暂无数据'
  }
}

const handleGreenlandMetricTypeChange = async (type: 1 | 2 | 3) => {
  try {
    await loadGreenlandMetric(type)
  } catch {}
}

const handleGreenlandTrendTypeChange = async (type: 1 | 2) => {
  try {
    await loadGreenlandTrend(type)
  } catch {}
}

const handleSanitationTypeChange = async (type: 1 | 2 | 3) => {
  try {
    await loadSanitationMetric(type)
  } catch {}
}

const handleAreaChange = async (areaName: string) => {
  selectedAreaName.value = areaName
  try {
    await loadCaseStatisticsByArea(areaName)
  } catch {
    dashData.centerSideLeft = []
    dashData.centerSideRight = []
  }
}

const now = ref(new Date())

let timer: number | undefined

onMounted(() => {
  loadDashScreen()
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})

const timeText = computed(() => {
  const d = now.value
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
})

const weekText = computed(() => {
  const list = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return list[now.value.getDay()]
})

const hmsText = computed(() => {
  const d = now.value
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
})
</script>

<style scoped>
.shell {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #020a1e;
}

.shell--scrollable {
  display: block;
  overflow: auto;
  padding: 24px;
  box-sizing: border-box;
}

.shell--scrollable .viewport {
  margin: 0 auto;
}

.viewport {
  display: block;
  overflow: hidden;
}

.screen {
  box-sizing: border-box;
  padding: 46px 88px 48px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #eaf4ff;
  position: relative;
}

.screen::before {
  content: '';
  position: absolute;
  inset: 22px;
  border: 1px solid rgba(73, 170, 255, 0.12);
  box-shadow: inset 0 0 120px rgba(34, 121, 255, 0.08);
  pointer-events: none;
}

.header {
  height: 146px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
}

.header-side {
  display: flex;
  gap: 16px;
}

.header-side-left {
  justify-content: flex-start;
  margin-top: -100px;
}

.header-side-right {
  justify-content: flex-end;
  margin-top: -100px;
}

.header-chip {
  width: 140px;
  height: 44px;
  padding: 0 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(78, 184, 255, 0.3);
  background: rgba(5, 26, 66, 0.55);
  box-shadow: inset 0 0 20px rgba(36, 152, 255, 0.18);
  font-size: 18px;
  color: rgba(209, 234, 255, 0.88);
}

.header-chip2 {
  width: 140px;
  justify-content: center;
  margin-left: 92px;
  height: 44px;
  padding: 0 40px;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(78, 184, 255, 0.3);
  background: rgba(5, 26, 66, 0.55);
  box-shadow: inset 0 0 20px rgba(36, 152, 255, 0.18);
  font-size: 18px;
  color: rgba(209, 234, 255, 0.88);
}
.header-chip3 {
  width: 140px;
  justify-content: center;
  margin-right: -10px;
  height: 44px;
  padding: 0 40px;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(78, 184, 255, 0.3);
  background: rgba(5, 26, 66, 0.55);
  box-shadow: inset 0 0 20px rgba(36, 152, 255, 0.18);
  font-size: 18px;
  color: rgba(209, 234, 255, 0.88);
}
.header-chip4 {
  width: 140px;
  justify-content: center;
  margin-left: 55px;
  height: 44px;
  padding: 0 40px;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(78, 184, 255, 0.3);
  background: rgba(5, 26, 66, 0.55);
  box-shadow: inset 0 0 20px rgba(36, 152, 255, 0.18);
  font-size: 18px;
  color: rgba(209, 234, 255, 0.88);
}
.brand {
  justify-self: center;
  padding: 0 100px;
  margin-top: -80px;
  height: 66px;
  display: inline-flex;
  align-items: center;
  font-size: 88px;
  letter-spacing: 40px;
  font-weight: 800;
  color: #eef8ff;
  text-shadow: 0 0 20px rgba(57, 170, 255, 0.55);
}

.body {
  height: calc(100% - 146px);
  display: grid;
  grid-template-columns: 3600px 4000px 3600px;
  gap: 72px;
  padding-top: 34px;
}
</style>
