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

import {
  getCityTrafficCongestion,
  getCityTrafficGoodsShip,
  getCityTrafficParking,
  getCityTrafficPassengerShip,
  getCityTrafficPublicTransport,
  getCityTrafficRoadOverview,
  getCityTrafficVehicle
} from '@/api'
import bgUrl from '@/assets/img/bg.jpg'
import DashCenter from './parts/DashCenter.vue'
import DashLeft from './parts/DashLeft.vue'
import DashRight from './parts/DashRight.vue'
import { createEmptyBusData, type BusScreenData } from './types'

const designWidth = 11520
const designHeight = 2160

const isFile = typeof window !== 'undefined' && window.location.protocol === 'file:'
const isDev = import.meta.env.DEV || isFile
const busData = reactive<BusScreenData>(createEmptyBusData())

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

const preferPublishedRows = (rows: unknown[]) => {
  const published = rows.filter((item) => isRecord(item) && item.dataStatus === 'PUBLISHED')
  return published.length ? published : rows
}

const sortByYear = <T extends { year: string }>(rows: T[]) =>
  [...rows].sort((a, b) => Number(a.year) - Number(b.year))

const applyBusDefaults = () => {
  Object.assign(busData, {
    parkingRatioXData: [
      '总计',
      '配建停车位(住宅类)',
      '配建停车位(非住宅类)',
      '路内停车位',
      '路外公共停车位'
    ],
    parkingRatioYData: [19, 17, 9, 4, 0.2],
    parkingPlanXData: ['铁东区', '铁西区', '立山区', '千山区', '高新区', '经开区'],
    parkingPlanYData: [1917, 763, 4449, 492, 2351, 202],
    publicTransportXAxis: ['2022-09', '2022-10', '2022-11', '2022-12', '2023-01', '2023-02'],
    publicTransportPassengerData: [980, 861.9, 620, 600, 380, 790],
    publicTransportTaxiNumData: [9120, 9117, 9119, 9118, 9112, 9110],
    vehicleInfoXAxis: ['拖拉机', '挂车', '摩托车', '汽车'],
    vehicleInfoPrivateData: [0, 0, 0, 0],
    vehicleInfoTotalData: [27179, 32333, 103183, 735438],
    goodsShipSeries: {
      type1: {
        xData: ['2022-09', '2022-10', '2022-11', '2022-12', '2023-01', '2023-02'],
        provinceNumData: [1020, 930, 880.2, 820, 650, 800],
        provinceGrowthData: [0, -12, 3.4, -8, -22, 26],
        cityNumData: [1420, 1140, 1491, 1450, 940, 1060],
        cityGrowthData: [-10, -28, -6, 13, -16, 29]
      },
      type2: {
        xData: ['2022-09', '2022-10', '2022-11', '2022-12', '2023-01', '2023-02'],
        provinceNumData: [896.5, 930, 910, 960, 1020, 1100],
        provinceGrowthData: [-13, -8, -3, 6, 9, 12],
        cityNumData: [1343, 1410, 1390, 1500, 1620, 1710],
        cityGrowthData: [-7.5, -4, 2, 8, 12, 15]
      }
    },
    passengerShipSeries: {
      type1: {
        xData: ['2022-09', '2022-10', '2022-11', '2022-12', '2023-01', '2023-02'],
        provinceNumData: [82, 78.2, 16, 60, 74, 80],
        provinceGrowthData: [-22, -35.2, -52, -48, -32, -18],
        cityNumData: [132, 81, 14, 61, 104, 122],
        cityGrowthData: [-36, -60, -72, -68, -45, -34]
      },
      type2: {
        xData: ['2022-09', '2022-10', '2022-11', '2022-12', '2023-01', '2023-02'],
        provinceNumData: [91.3, 97, 88, 94, 102, 110],
        provinceGrowthData: [-28, -18.3, -16, -10, -6, 4],
        cityNumData: [142, 146, 130, 139, 152, 160],
        cityGrowthData: [-37.8, -35.4, -20, -12, -8, 6]
      }
    },
    parkingDemandIdeal: 38.8,
    parkingDemandTarget: 77.6,
    roadCloseSummary: {
      pending: 249,
      processing: 125,
      finished: 110
    },
    roadCloseList: [
      { roadName: '真理街', section: '真理', time: '05/04-05/11' },
      {
        roadName: '东工人街',
        section: '人街与石东街交叉口-东工人街与石东街',
        time: '04/17-04/21'
      },
      { roadName: '大石街', section: '大石街德馨医院门前-大石街', time: '04/10-04/14' },
      { roadName: '湖南街', section: '南8西-湖南街嘉宝家园湖南8西', time: '04/10-04/14' }
    ],
    congestionSummary: {
      severe: 30,
      moderate: 15,
      light: 22
    },
    congestionList: [
      {
        pos: '第九中学',
        level: '轻度拥堵',
        start: '2023-04-08 17:32',
        end: '2023-04-08 17:42'
      },
      {
        pos: '联营公司',
        level: '轻度拥堵',
        start: '2023-04-08 17:32',
        end: '2023-04-08 17:42'
      },
      {
        pos: '曙光路南口',
        level: '轻度拥堵',
        start: '2023-04-08 17:32',
        end: '2023-04-08 17:42'
      }
    ],
    routes: [
      { id: 11, name: '11A路线', start: '虹桥北', end: '东工人街' },
      { id: 105, name: '105路线', start: '虹桥北', end: '名甲小学' },
      { id: 118, name: '118路线', start: '虹桥北', end: '双塔台' }
    ],
    activeRouteId: 11,
    stations: [
      { name: '虹桥北' },
      { name: '双塔台' },
      { name: '新兴路联建' },
      { name: '大红旗' },
      { name: '铁东广场' },
      { name: '职教城' },
      { name: '东工人街' }
    ]
  })
}

const sortByLabel = <T extends { label: string }>(rows: T[]) =>
  [...rows].sort((a, b) => a.label.localeCompare(b.label))

const loadParking = async () => {
  const payload = await getCityTrafficParking<UnknownRecord>()
  const summary = isRecord(payload.summary) ? payload.summary : undefined
  const parkingScales = preferPublishedRows(
    Array.isArray(summary?.parkingScales) ? summary.parkingScales : []
  )
  const parkingSpaces = preferPublishedRows(
    Array.isArray(summary?.parkingSpaces) ? summary.parkingSpaces : []
  )

  const scaleRows = parkingScales
    .map((item) => {
      if (!isRecord(item)) return null
      const label = toStringValue(item.label)
      const value = toNumber(item.num)
      if (!label || value === undefined) return null
      return { label, value }
    })
    .filter((item): item is { label: string; value: number } => Boolean(item))

  if (!scaleRows.length) return

  const total = scaleRows.reduce((sum, item) => sum + item.value, 0)
  busData.parkingRatioXData = ['总计', ...scaleRows.map((item) => item.label)]
  busData.parkingRatioYData = [Number(total.toFixed(1)), ...scaleRows.map((item) => item.value)]

  const planRows = parkingSpaces
    .map((item) => {
      if (!isRecord(item)) return null
      const label = toStringValue(item.areaName)
      const value = toNumber(item.num)
      if (!label || value === undefined) return null
      return { label, value }
    })
    .filter((item): item is { label: string; value: number } => Boolean(item))

  if (planRows.length) {
    busData.parkingPlanXData = planRows.map((item) => item.label)
    busData.parkingPlanYData = planRows.map((item) => item.value)
  }
}

const loadPublicTransport = async () => {
  const payload = await getCityTrafficPublicTransport<UnknownRecord>()
  const summary = isRecord(payload.summary) ? payload.summary : undefined
  const taxiRows = preferPublishedRows(Array.isArray(summary?.taxi) ? summary.taxi : [])

  const normalizedTaxiRows = sortByLabel(
    taxiRows
      .map((item) => {
        if (!isRecord(item)) return null
        const label = toStringValue(item.month)
        if (!label) return null
        return {
          label,
          taxiNum: toNumber(item.taxiNum) ?? 0,
          passengerVolume: toNumber(item.passengerVolume) ?? 0
        }
      })
      .filter((item): item is { label: string; taxiNum: number; passengerVolume: number } =>
        Boolean(item)
      )
  )

  if (!normalizedTaxiRows.length) return

  busData.publicTransportXAxis = normalizedTaxiRows.map((item) => item.label)
  busData.publicTransportPassengerData = normalizedTaxiRows.map((item) => item.passengerVolume)
  busData.publicTransportTaxiNumData = normalizedTaxiRows.map((item) => item.taxiNum)
}

const loadPassengerShip = async () => {
  const payload = await getCityTrafficPassengerShip<UnknownRecord>()
  const rows = preferPublishedRows(Array.isArray(payload.dataList) ? payload.dataList : [])

  const normalizedRows = rows
    .map((item) => {
      if (!isRecord(item)) return null
      const type = toStringValue(item.type)
      const month = toStringValue(item.month)
      if (!type || !month) return null

      return {
        type,
        month,
        provinceNum: toNumber(item.provinceNum) ?? 0,
        provinceGrowth: toNumber(item.provinceGrowth) ?? 0,
        cityNum: toNumber(item.cityNum) ?? 0,
        cityGrowth: toNumber(item.cityGrowth) ?? 0
      }
    })
    .filter(
      (
        item
      ): item is {
        type: string
        month: string
        provinceNum: number
        provinceGrowth: number
        cityNum: number
        cityGrowth: number
      } => Boolean(item)
    )

  const buildPassengerShipSeries = (type: string) => {
    const currentRows = sortByLabel(
      normalizedRows
        .filter((item) => item.type === type)
        .map(({ month, ...rest }) => ({
          label: month,
          ...rest
        }))
    )

    if (!currentRows.length) return null

    return {
      xData: currentRows.map((item) => item.label),
      provinceNumData: currentRows.map((item) => item.provinceNum),
      provinceGrowthData: currentRows.map((item) => item.provinceGrowth),
      cityNumData: currentRows.map((item) => item.cityNum),
      cityGrowthData: currentRows.map((item) => item.cityGrowth)
    }
  }

  const type1Series = buildPassengerShipSeries('1')
  const type2Series = buildPassengerShipSeries('2')

  if (type1Series) busData.passengerShipSeries.type1 = type1Series
  if (type2Series) busData.passengerShipSeries.type2 = type2Series
}

const loadGoodsShip = async () => {
  const payload = await getCityTrafficGoodsShip<UnknownRecord>()
  const rows = preferPublishedRows(Array.isArray(payload.dataList) ? payload.dataList : [])

  const normalizedRows = rows
    .map((item) => {
      if (!isRecord(item)) return null
      const type = toStringValue(item.type)
      const month = toStringValue(item.month)
      if (!type || !month) return null

      return {
        type,
        month,
        provinceNum: toNumber(item.provinceNum) ?? 0,
        provinceGrowth: toNumber(item.provinceGrowth) ?? 0,
        cityNum: toNumber(item.cityNum) ?? 0,
        cityGrowth: toNumber(item.cityGrowth) ?? 0
      }
    })
    .filter(
      (
        item
      ): item is {
        type: string
        month: string
        provinceNum: number
        provinceGrowth: number
        cityNum: number
        cityGrowth: number
      } => Boolean(item)
    )

  const buildGoodsShipSeries = (type: string) => {
    const currentRows = sortByLabel(
      normalizedRows
        .filter((item) => item.type === type)
        .map(({ month, ...rest }) => ({
          label: month,
          ...rest
        }))
    )

    if (!currentRows.length) return null

    return {
      xData: currentRows.map((item) => item.label),
      provinceNumData: currentRows.map((item) => item.provinceNum),
      provinceGrowthData: currentRows.map((item) => item.provinceGrowth),
      cityNumData: currentRows.map((item) => item.cityNum),
      cityGrowthData: currentRows.map((item) => item.cityGrowth)
    }
  }

  const type1Series = buildGoodsShipSeries('1')
  const type2Series = buildGoodsShipSeries('2')

  if (type1Series) busData.goodsShipSeries.type1 = type1Series
  if (type2Series) busData.goodsShipSeries.type2 = type2Series
}

const loadCongestion = async () => {
  const payload = await getCityTrafficCongestion<UnknownRecord>()
  console.log('[citytraffic congestion]', payload)

  if (typeof window !== 'undefined') {
    ;(window as Window & { __BUS_CONGESTION_PAYLOAD__?: unknown }).__BUS_CONGESTION_PAYLOAD__ =
      payload
  }
}

const loadVehicle = async () => {
  const payload = await getCityTrafficVehicle<UnknownRecord>()
  const rows = preferPublishedRows(Array.isArray(payload.dataList) ? payload.dataList : [])

  const normalizedRows = rows
    .map((item) => {
      if (!isRecord(item)) return null
      const oneLevel = toStringValue(item.oneLevel)
      const twoLevel = toStringValue(item.twoLevel)
      const threeLevel = toStringValue(item.threeLevel)
      if (!oneLevel) return null

      return {
        oneLevel,
        twoLevel,
        threeLevel,
        total: toNumber(item.total) ?? 0,
        privateNum: toNumber(item.privateNum) ?? 0
      }
    })
    .filter(
      (
        item
      ): item is {
        oneLevel: string
        twoLevel: string
        threeLevel: string
        total: number
        privateNum: number
      } => Boolean(item)
    )

  const topLevelRows = normalizedRows.filter(
    (item) => item.oneLevel === item.twoLevel && item.twoLevel === item.threeLevel
  )

  if (!topLevelRows.length) return

  const sortedRows = [...topLevelRows].sort((a, b) => a.total - b.total)
  busData.vehicleInfoXAxis = sortedRows.map((item) => item.oneLevel)
  busData.vehicleInfoPrivateData = sortedRows.map((item) => item.privateNum)
  busData.vehicleInfoTotalData = sortedRows.map((item) => item.total)
}

const loadRoadOverview = async () => {
  const payload = await getCityTrafficRoadOverview<UnknownRecord>()
  const summary = isRecord(payload.summary) ? payload.summary : undefined
  const roadOverviews = preferPublishedRows(
    Array.isArray(summary?.roadOverviews) ? summary.roadOverviews : []
  )
  const overview = roadOverviews.find((item) => isRecord(item))

  if (overview && isRecord(overview)) {
    busData.roadOverviewSummary = {
      roadLength: toNumber(overview.roadLength) ?? 0,
      roadArea: toNumber(overview.roadArea) ?? 0,
      footwalkArea: toNumber(overview.footwalkArea) ?? 0,
      viaductNum: toNumber(overview.viaductNum) ?? 0,
      bridgeNum: toNumber(overview.bridgeNum) ?? 0,
      roadRate: toNumber(overview.roadRate) ?? 0
    }
  }

  const roadChanges = preferPublishedRows(
    Array.isArray(summary?.roadChanges) ? summary.roadChanges : []
  )

  const normalizedChanges = roadChanges
    .map((item) => {
      if (!isRecord(item)) return null
      const type = toStringValue(item.type)
      const year = toStringValue(item.year)
      if (!type || !year) return null

      return {
        type,
        year,
        countryRoadLength: toNumber(item.countryRoadLength) ?? 0,
        countryRoadRate: toNumber(item.countryRoadRate) ?? 0,
        provinceRoadLength: toNumber(item.provinceRoadLength) ?? 0,
        provinceRoadRate: toNumber(item.provinceRoadRate) ?? 0,
        cityRoadLength: toNumber(item.cityRoadLength) ?? 0,
        cityRoadRate: toNumber(item.cityRoadRate) ?? 0
      }
    })
    .filter(
      (
        item
      ): item is {
        type: string
        year: string
        countryRoadLength: number
        countryRoadRate: number
        provinceRoadLength: number
        provinceRoadRate: number
        cityRoadLength: number
        cityRoadRate: number
      } => Boolean(item)
    )

  busData.roadChangeSeries = {
    type1: sortByYear(
      normalizedChanges.filter((item) => item.type === '1').map(({ type, ...rest }) => rest)
    ),
    type2: sortByYear(
      normalizedChanges.filter((item) => item.type === '2').map(({ type, ...rest }) => rest)
    )
  }
}

const loadBusScreen = async () => {
  Object.assign(busData, createEmptyBusData())
  applyBusDefaults()
  await Promise.allSettled([
    loadParking(),
    loadCongestion(),
    loadPublicTransport(),
    loadPassengerShip(),
    loadGoodsShip(),
    loadVehicle(),
    loadRoadOverview()
  ])
}

const now = ref(new Date())

let timer: number | undefined

onMounted(() => {
  loadBusScreen()
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
