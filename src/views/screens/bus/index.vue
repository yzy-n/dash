<template>
  <div class="shell" :class="{ 'shell--dev': isDev }">
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
          <div class="brand">城 市 交 通</div>
          <div class="header-side header-side-right">
            <span class="header-chip3">北京时间</span>
            <span class="header-chip4">{{ hmsText }}</span>
          </div>
        </header>

        <section class="body">
          <DashLeft :data="busData" />
          <DashCenter :data="busData" />
          <DashRight :data="busData" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

import bgUrl from '@/assets/img/bg.jpg'
import DashCenter from './parts/DashCenter.vue'
import DashLeft from './parts/DashLeft.vue'
import DashRight from './parts/DashRight.vue'
import { createEmptyBusData, type BusScreenData } from './types'
import {
  getCityTrafficCongestion,
  getCityTrafficParking,
  getCityTrafficPublicTransport,
  getCityTrafficVehicle,
  getCityTrafficRoadWarning
} from '@/api/citytraffic'

const designWidth = 11520
const designHeight = 2160

const isFile = typeof window !== 'undefined' && window.location.protocol === 'file:'
const isDev = import.meta.env.DEV || isFile
const busData = reactive<BusScreenData>(createEmptyBusData())

const preferPublishedRows = (rows: any[]) => {
  const published = rows.filter(
    (item) => item && typeof item === 'object' && item.dataStatus === 'PUBLISHED'
  )
  return published.length ? published : rows
}

const toNumber = (value: any) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[%,$，\s]/g, ''))
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

const toStringValue = (value: any) => {
  if (value === null || value === undefined) return ''
  return String(value)
}

const toEllipsis = (value: any, maxLen: number) => {
  const text = toStringValue(value).trim()
  if (!text) return ''
  if (text.length <= maxLen) return text
  return `${text.slice(0, maxLen)}…`
}

const splitSection = (section: string) => {
  const text = section.trim()
  if (!text) return { startPoint: '', endPoint: '' }
  const parts = text.split(/\s*(?:-|—|~|～|至|到)\s*/).filter(Boolean)
  if (parts.length >= 2) {
    return { startPoint: parts[0], endPoint: parts.slice(1).join('-') }
  }
  return { startPoint: text, endPoint: '' }
}

const parseRoadDate = (value: any) => {
  if (!value) return undefined
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value

  if (Array.isArray(value) && value.length >= 3) {
    const [y, m, d, hh = 0, mm = 0, ss = 0] = value.map((v) => Number(v))
    if (!y || !m || !d) return undefined
    const date = new Date(y, m - 1, d, hh || 0, mm || 0, ss || 0)
    return Number.isNaN(date.getTime()) ? undefined : date
  }

  if (typeof value === 'number') {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? undefined : date
  }

  if (typeof value === 'string') {
    const raw = value.trim()
    if (!raw) return undefined
    const [datePart, timePart] = raw.split(/[T\s]/)
    const parts = datePart.split(/[-/.]/).filter(Boolean)
    if (parts.length >= 3) {
      const y = Number(parts[0])
      const m = Number(parts[1])
      const d = Number(parts[2])
      if (!y || !m || !d) return undefined
      let hh = 0
      let mm = 0
      let ss = 0
      if (timePart) {
        const t = timePart.split(':')
        hh = Number(t[0] || 0) || 0
        mm = Number(t[1] || 0) || 0
        ss = Number((t[2] || '0').split('.')[0]) || 0
      }
      const date = new Date(y, m - 1, d, hh, mm, ss)
      return Number.isNaN(date.getTime()) ? undefined : date
    }

    const date = new Date(raw)
    return Number.isNaN(date.getTime()) ? undefined : date
  }

  return undefined
}

const formatRoadDate = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const applyParkingSummary = (summary: any) => {
  const parkingScales = preferPublishedRows(
    Array.isArray(summary?.parkingScales) ? summary.parkingScales : []
  )
  const parkingSpaces = preferPublishedRows(
    Array.isArray(summary?.parkingSpaces) ? summary.parkingSpaces : []
  )

  const scaleRows = parkingScales
    .map((item: any) => {
      const label = item?.label ? String(item.label) : ''
      const value = toNumber(item?.num)
      if (!label || value === undefined) return null
      return { label, value }
    })
    .filter(Boolean) as Array<{ label: string; value: number }>

  if (scaleRows.length) {
    const total = scaleRows.reduce((sum, item) => sum + item.value, 0)
    busData.parkingRatioXData = ['总计', ...scaleRows.map((item) => item.label)]
    busData.parkingRatioYData = [Number(total.toFixed(1)), ...scaleRows.map((item) => item.value)]
  }

  const planRows = parkingSpaces
    .map((item: any) => {
      const label = item?.areaName ? String(item.areaName) : ''
      const value = toNumber(item?.num)
      if (!label || value === undefined) return null
      return { label, value }
    })
    .filter(Boolean) as Array<{ label: string; value: number }>

  if (planRows.length) {
    busData.parkingPlanXData = planRows.map((item) => item.label)
    busData.parkingPlanYData = planRows.map((item) => item.value)
  }
}

const loadParking = async () => {
  const res: any = await getCityTrafficParking()
  applyParkingSummary(res?.summary ?? {})
}

const sortByLabel = <T extends { label: string }>(rows: T[]) =>
  [...rows].sort((a, b) => a.label.localeCompare(b.label))

const applyPublicTransportSummary = (rawPayload: any) => {
  const payload = rawPayload?.data ?? rawPayload
  const summary = payload?.summary ?? payload?.data?.summary ?? payload
  const taxiRows = preferPublishedRows(
    Array.isArray(summary?.taxi)
      ? summary.taxi
      : Array.isArray(summary?.dataList)
        ? summary.dataList
        : []
  )

  const normalizedTaxiRows = sortByLabel(
    taxiRows
      .map((item: any) => {
        const label = toStringValue(item?.month ?? item?.label ?? item?.time ?? item?.date)
        if (!label) return null
        return {
          label,
          taxiNum: toNumber(item?.taxiNum ?? item?.taxiCount ?? item?.num ?? item?.count) ?? 0,
          passengerVolume:
            toNumber(item?.passengerVolume ?? item?.passengerNum ?? item?.volume) ?? 0
        }
      })
      .filter(Boolean) as Array<{ label: string; taxiNum: number; passengerVolume: number }>
  )

  busData.publicTransportXAxis = normalizedTaxiRows.map((item) => item.label)
  busData.publicTransportPassengerData = normalizedTaxiRows.map((item) => item.passengerVolume)
  busData.publicTransportTaxiNumData = normalizedTaxiRows.map((item) => item.taxiNum)
}

const loadPublicTransport = async () => {
  const res: any = await getCityTrafficPublicTransport()
  applyPublicTransportSummary(res)
}

const applyVehicleSummary = (rawPayload: any) => {
  const payload = rawPayload?.data ?? rawPayload
  const summary = payload?.summary ?? payload?.data?.summary ?? {}
  const groups = summary?.groups ?? summary?.data?.groups

  const groupRows = Array.isArray(groups)
    ? groups
    : groups && typeof groups === 'object'
      ? Object.values(groups)
      : []

  const fallbackRows = Array.isArray(payload?.dataList) ? payload.dataList : []
  const sourceRows = (groupRows.length ? groupRows : fallbackRows) as any[]
  const rows = preferPublishedRows(Array.isArray(sourceRows) ? sourceRows : [])

  const normalizedRows = rows
    .map((item: any) => {
      const oneLevel = toStringValue(item?.oneLevel)
      if (!oneLevel) return null

      return {
        oneLevel,
        total: toNumber(item?.total) ?? 0,
        privateNum: toNumber(item?.privateNum) ?? 0
      }
    })
    .filter(Boolean) as Array<{ oneLevel: string; total: number; privateNum: number }>

  const preferredOrder = ['拖拉机', '挂车', '摩托车', '汽车']
  const orderMap = new Map(preferredOrder.map((name, idx) => [name, idx]))

  const sortedRows = [...normalizedRows].sort((a, b) => {
    const aOrder = orderMap.get(a.oneLevel)
    const bOrder = orderMap.get(b.oneLevel)
    if (aOrder !== undefined || bOrder !== undefined) {
      return (aOrder ?? 999) - (bOrder ?? 999)
    }
    return a.total - b.total
  })

  busData.vehicleInfoXAxis = sortedRows.map((item) => item.oneLevel)
  busData.vehicleInfoPrivateData = sortedRows.map((item) => item.privateNum)
  busData.vehicleInfoTotalData = sortedRows.map((item) => item.total)
}

const loadVehicle = async () => {
  const res: any = await getCityTrafficVehicle()
  applyVehicleSummary(res)
}

const applyRoadWarningSummary = (rawPayload: any) => {
  const payload = rawPayload?.data ?? rawPayload
  const summary = payload?.summary ?? payload?.data?.summary ?? payload
  const summaryList =
    summary?.list ??
    summary?.dataList ??
    summary?.roadWarnings ??
    summary?.roadWarningList ??
    summary?.roadCloseList ??
    []

  const rows = preferPublishedRows(Array.isArray(summaryList) ? summaryList : [])

  const mappedRows = rows
    .map((item: any) => {
      const roadName = toEllipsis(item?.roadName ?? item?.name ?? item?.road, 10)
      if (!roadName) return null
      const section = toEllipsis(
        item?.section ?? item?.roadSection ?? item?.closeSection ?? item?.range ?? '',
        20
      )
      const startPoint = toEllipsis(
        item?.startPoint ?? item?.beginPoint ?? item?.from ?? item?.startName ?? '',
        12
      )
      const endPoint = toEllipsis(
        item?.endPoint ?? item?.finishPoint ?? item?.to ?? item?.endName ?? '',
        12
      )
      const normalizedPoints =
        startPoint || endPoint ? { startPoint, endPoint } : splitSection(section)
      const startRaw = item?.startTime ?? item?.start ?? item?.beginTime
      const endRaw = item?.endTime ?? item?.end ?? item?.finishTime
      const startDate = parseRoadDate(startRaw)
      const endDate = parseRoadDate(endRaw)
      const startText = startDate ? formatRoadDate(startDate) : toStringValue(startRaw)
      const endText = endDate ? formatRoadDate(endDate) : toStringValue(endRaw)
      const time =
        startText && endText
          ? `${startText}-${endText}`
          : toStringValue((item?.time ?? item?.timeRange ?? startText) || endText)

      return {
        roadName,
        section,
        startPoint: normalizedPoints.startPoint,
        endPoint: normalizedPoints.endPoint,
        startTime: startText,
        endTime: endText,
        time,
        __status: toStringValue(item?.roadStatus ?? item?.status ?? item?.state ?? item?.roadState),
        __startDate: startDate,
        __endDate: endDate
      }
    })
    .filter(Boolean) as Array<{
    __startDate: Date | undefined
    __endDate: Date | undefined
    startPoint: string
    endPoint: string
    roadName: string
    section: string
    startTime: string
    endTime: string
    time: string
    __status: string
  }>

  busData.roadCloseList = mappedRows.map(({ __status, __startDate, __endDate, ...rest }) => rest)

  const current = new Date()
  busData.roadCloseSummary = mappedRows.reduce(
    (acc, row) => {
      const startDate = row.__startDate
      const endDate = row.__endDate

      if (startDate && endDate) {
        if (current < startDate) acc.pending += 1
        else if (current > endDate) acc.finished += 1
        else acc.processing += 1
        return acc
      }

      if (startDate) {
        if (current < startDate) acc.pending += 1
        else acc.processing += 1
        return acc
      }

      if (endDate) {
        if (current > endDate) acc.finished += 1
        else acc.processing += 1
        return acc
      }

      acc.pending += 1
      return acc
    },
    { pending: 0, processing: 0, finished: 0 }
  )
}

const loadRoadWarning = async () => {
  const res: any = await getCityTrafficRoadWarning()
  applyRoadWarningSummary(res)
}

const applyCongestionSummary = (rawPayload: any) => {
  const payload = rawPayload?.data ?? rawPayload
  const summary = payload?.summary ?? payload?.data?.summary ?? payload
  const roadWarnings = preferPublishedRows(
    Array.isArray(summary?.roadWarnings) ? summary.roadWarnings : []
  )

  const mappedRows = roadWarnings
    .map((item: any) => {
      const pos = toEllipsis(
        item?.roadName ?? item?.pos ?? item?.position ?? item?.road ?? item?.name,
        12
      )
      if (!pos) return null

      const roadStatus = toStringValue(item?.roadStatus ?? item?.status ?? item?.grade)
      const level =
        roadStatus === '3'
          ? '严重拥堵'
          : roadStatus === '2'
            ? '中度拥堵'
            : roadStatus === '1'
              ? '轻度拥堵'
              : toStringValue(item?.level ?? item?.congestionLevel ?? roadStatus)

      const startDate = parseRoadDate(
        item?.startTime ?? item?.start ?? item?.beginTime ?? item?.startAt
      )
      const endDate = parseRoadDate(
        item?.endTime ?? item?.end ?? item?.finishTime ?? item?.relieveTime ?? item?.estimateEndTime
      )
      const start = startDate
        ? formatRoadDate(startDate)
        : toStringValue(item?.startTime ?? item?.start ?? '')
      const end = endDate
        ? formatRoadDate(endDate)
        : toStringValue(item?.endTime ?? item?.end ?? '')

      return { pos, level, start, end }
    })
    .filter(Boolean) as Array<{ pos: string; level: string; start: string; end: string }>

  busData.congestionList = mappedRows

  const computed = roadWarnings.reduce(
    (acc, item: any) => {
      const status = toStringValue(item?.roadStatus ?? item?.status ?? item?.grade)
      if (status === '3') acc.severe += 1
      else if (status === '2') acc.moderate += 1
      else acc.light += 1
      return acc
    },
    { severe: 0, moderate: 0, light: 0 }
  )

  busData.congestionSummary = computed
}

const loadCongestion = async () => {
  const res: any = await getCityTrafficCongestion()
  applyCongestionSummary(res)
}

const now = ref(new Date())

let timer: number | undefined

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
  loadParking()
  loadPublicTransport()
  loadVehicle()
  loadRoadWarning()
  loadCongestion()
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

.shell--dev {
  display: block;
  overflow: auto;
  padding: 24px;
  box-sizing: border-box;
}

.shell--dev .viewport {
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
