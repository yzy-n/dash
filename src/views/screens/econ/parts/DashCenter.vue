<template>
  <div class="dash-center">
    <div class="wrap">
      <!-- 背景空间线框 -->
      <div class="space-grid"></div>

      <!-- 地图 -->
      <div ref="mapRef" class="anshan-map"></div>

      <!-- CPI 中心圆环：消费价格指数（接口驱动） -->
      <div class="cpi-item">
        <div class="time">{{ cpiData.quarter }}</div>
        <div class="label">消费价格指数</div>
        <div class="value">{{ cpiData.amount }}</div>
      </div>

      <!-- 右侧主指标卡片：全市进出口总额（接口驱动） -->
      <div class="main-card">
        <div class="main-card-time">{{ volumeForeignTrade.quarter }}</div>
        <div class="main-card-label">全市进出口总额</div>
        <div class="main-card-num">
          {{ volumeForeignTrade.amount }} <span class="unit">亿元</span>
        </div>
        <div class="main-card-rate">{{ volumeForeignTrade.yearOnYearGrowth }}%↑</div>
      </div>

      <!-- 预算收入（接口驱动） -->
      <div class="bubble b1">
        <div class="time">{{ fiscalRevenue.quarter }}</div>
        <div class="label">预算收入</div>
        <div class="num">
          {{ fiscalRevenue.amount }} <span class="unit">亿元</span>
        </div>
        <div
          class="rate"
          :class="{ red: Number(fiscalRevenue.yearOnYearGrowth) < 0 }"
        >
          {{ fiscalRevenue.yearOnYearGrowth }}%{{
            Number(fiscalRevenue.yearOnYearGrowth) < 0 ? '↓' : '↑'
          }}
        </div>
      </div>

      <!-- 税收收入（接口驱动） -->
      <div class="bubble b2">
        <div class="time">{{ taxRevenue.quarter }}</div>
        <div class="label">税收收入</div>
        <div class="num">
          {{ taxRevenue.amount }} <span class="unit">亿元</span>
        </div>
        <div
          class="rate"
          :class="{ red: Number(taxRevenue.yearOnYearGrowth) < 0 }"
        >
          {{ taxRevenue.yearOnYearGrowth }}%{{ Number(taxRevenue.yearOnYearGrowth) < 0 ? '↓' : '↑' }}
        </div>
      </div>

      <!-- GDP（接口驱动） -->
      <div class="bubble b3">
        <div class="time">{{ gdpData.quarter }}</div>
        <div class="label">GDP</div>
        <div class="num">
          {{ gdpData.amount }} <span class="unit">亿元</span>
        </div>
        <div
          class="rate"
          :class="{ red: Number(gdpData.yearOnYearGrowth) < 0 }"
        >
          {{ gdpData.yearOnYearGrowth }}%{{ Number(gdpData.yearOnYearGrowth) < 0 ? '↓' : '↑' }}
        </div>
      </div>

      <!-- 右侧小气泡：城市 / 农村居民人均收入（接口驱动） -->
      <div class="bubble b4">
        <div class="time">{{ urbanIncome.quarter }}</div>
        <div class="label">城市居民人均收入情况</div>
        <div class="num">
          {{ urbanIncome.amount }} <span class="unit">元</span>
        </div>
        <div class="rate red">{{ urbanIncome.yearOnYearGrowth }}%↑</div>
      </div>

      <div class="bubble b5">
        <div class="time">{{ ruralIncome.quarter }}</div>
        <div class="label">农村居民人均收入情况</div>
        <div class="num">
          {{ ruralIncome.amount }} <span class="unit">元</span>
        </div>
        <div class="rate red">{{ ruralIncome.yearOnYearGrowth }}%↑</div>
      </div>

      <!-- 底部光晕 -->
      <div class="base-ring"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'
import {
  getVolumeForeignTrade,
  getResidentIncome,
  getHouseholdConsumption,
  getGdp,
  getFiscalTaxRevenue,
  getFiscalRevenue
} from '@/api/econ'

const mapRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null
const techTexture = ref<HTMLCanvasElement | null>(null)

/* =========================================================
   通用：兼容多种解包层级
   ========================================================= */
const pickList = (res: any): any[] => {
  const body = res?.data ?? res
  if (Array.isArray(body?.datalist)) return body.datalist
  if (Array.isArray(body?.dataList)) return body.dataList
  if (Array.isArray(body?.data?.datalist)) return body.data.datalist
  if (Array.isArray(body?.data?.dataList)) return body.data.dataList
  return []
}

/* =========================================================
   1. 消费价格指数（CPI）—— 接口驱动
   ========================================================= */

const HOUSEHOLD_CONSUMPTION_DATE = '2026.04-2026.04'

type CpiData = {
  amount: string
  yearOnYearGrowth: string
  quarter: string
}

const cpiData = ref<CpiData>({
  amount: '0',
  yearOnYearGrowth: '0',
  quarter: HOUSEHOLD_CONSUMPTION_DATE
})

const fetchHouseholdConsumption = async () => {
  try {
    const res: any = await getHouseholdConsumption(HOUSEHOLD_CONSUMPTION_DATE)
    console.log('[householdconsumption] souseDate=', HOUSEHOLD_CONSUMPTION_DATE, 'res=', res)

    const list = pickList(res)
    const row = list[0]
    if (row) {
      cpiData.value = {
        amount: String(row.amount ?? '0'),
        yearOnYearGrowth: String(row.yearOnYearGrowth ?? '0'),
        quarter: String(row.quarter ?? HOUSEHOLD_CONSUMPTION_DATE)
      }
    }
  } catch (e) {
    console.error('消费价格指数查询失败', e)
  }
}

/* =========================================================
   2. 全市进出口总额 —— 接口驱动
   ========================================================= */

const VOLUME_FOREIGN_TRADE_DATE = '2023年1月-9月'

type VolumeForeignTrade = {
  amount: string
  yearOnYearGrowth: string
  quarter: string
}

const volumeForeignTrade = ref<VolumeForeignTrade>({
  amount: '0',
  yearOnYearGrowth: '0',
  quarter: VOLUME_FOREIGN_TRADE_DATE
})

const fetchVolumeForeignTrade = async () => {
  try {
    const res: any = await getVolumeForeignTrade(VOLUME_FOREIGN_TRADE_DATE)
    console.log('[volumeforeigntrade] souseDate=', VOLUME_FOREIGN_TRADE_DATE, 'res=', res)

    const list = pickList(res)
    const row = list[0]
    if (row) {
      volumeForeignTrade.value = {
        amount: String(row.amount ?? '0'),
        yearOnYearGrowth: String(row.yearOnYearGrowth ?? '0'),
        quarter: String(row.quarter ?? VOLUME_FOREIGN_TRADE_DATE)
      }
    }
  } catch (e) {
    console.error('全市进出口总额查询失败', e)
  }
}

/* =========================================================
   3. 城乡居民人均收入情况 —— 接口驱动
   ========================================================= */

const RESIDENT_INCOME_DATE = '2026.01-2026.03'

type ResidentIncome = {
  amount: string
  yearOnYearGrowth: string
  quarter: string
}

const urbanIncome = ref<ResidentIncome>({
  amount: '0',
  yearOnYearGrowth: '0',
  quarter: RESIDENT_INCOME_DATE
})

const ruralIncome = ref<ResidentIncome>({
  amount: '0',
  yearOnYearGrowth: '0',
  quarter: RESIDENT_INCOME_DATE
})

const fetchResidentIncome = async () => {
  try {
    const res: any = await getResidentIncome(RESIDENT_INCOME_DATE)
    console.log('[residentincome] souseDate=', RESIDENT_INCOME_DATE, 'res=', res)

    const list = pickList(res)

    const toItem = (row: any): ResidentIncome => ({
      amount: String(row?.amount ?? '0'),
      yearOnYearGrowth: String(row?.yearOnYearGrowth ?? '0'),
      quarter: String(row?.quarter ?? RESIDENT_INCOME_DATE)
    })

    const urbanRow = list.find((it: any) => String(it?.type) === '1')
    const ruralRow = list.find((it: any) => String(it?.type) === '2')

    if (urbanRow) urbanIncome.value = toItem(urbanRow)
    if (ruralRow) ruralIncome.value = toItem(ruralRow)
  } catch (e) {
    console.error('居民人均收入查询失败', e)
  }
}

/* =========================================================
   4. GDP —— 接口驱动
   ========================================================= */

type GdpData = {
  amount: string
  yearOnYearGrowth: string
  quarter: string
}

const gdpData = ref<GdpData>({
  amount: '0',
  yearOnYearGrowth: '0',
  quarter: ''
})

const fetchGdp = async () => {
  try {
    const res: any = await getGdp()
    console.log('[gdp] res=', res)

    const list = pickList(res)
    const row = list[0]
    if (row) {
      gdpData.value = {
        amount: String(row.amount ?? '0'),
        yearOnYearGrowth: String(row.yearOnYearGrowth ?? '0'),
        quarter: String(row.quarter ?? '')
      }
    }
  } catch (e) {
    console.error('GDP 查询失败', e)
  }
}

/* =========================================================
   5. 税收收入 —— 接口驱动（无参）
   ========================================================= */

type TaxRevenue = {
  amount: string
  yearOnYearGrowth: string
  quarter: string
}

const taxRevenue = ref<TaxRevenue>({
  amount: '0',
  yearOnYearGrowth: '0',
  quarter: ''
})

const fetchTaxRevenue = async () => {
  try {
    const res: any = await getFiscalTaxRevenue()
    console.log('[fiscaltaxrevenue] res=', res)

    const list = pickList(res)
    const row = list[0]
    if (row) {
      taxRevenue.value = {
        amount: String(row.amount ?? '0'),
        yearOnYearGrowth: String(row.yearOnYearGrowth ?? '0'),
        quarter: String(row.quarter ?? '')
      }
    }
  } catch (e) {
    console.error('税收收入查询失败', e)
  }
}

/* =========================================================
   6. 预算收入 —— 接口驱动（无参）
   - 接口：/economicoperation/bigscreen/fiscalrevenue
   - 返回 { amount, yearOnYearGrowth, quarter }
   ========================================================= */

type FiscalRevenue = {
  amount: string
  yearOnYearGrowth: string
  quarter: string
}

const fiscalRevenue = ref<FiscalRevenue>({
  amount: '0',
  yearOnYearGrowth: '0',
  quarter: ''
})

const fetchFiscalRevenue = async () => {
  try {
    const res: any = await getFiscalRevenue()
    console.log('[fiscalrevenue] res=', res)

    const list = pickList(res)
    const row = list[0]
    if (row) {
      fiscalRevenue.value = {
        amount: String(row.amount ?? '0'),
        yearOnYearGrowth: String(row.yearOnYearGrowth ?? '0'),
        quarter: String(row.quarter ?? '')
      }
    }
  } catch (e) {
    console.error('预算收入查询失败', e)
  }
}

/** 生成科技感纹理（网格 + 星点） */
const createTechTexture = () => {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  ctx.fillStyle = 'rgba(5, 25, 70, 0.2)'
  ctx.fillRect(0, 0, size, size)

  ctx.strokeStyle = 'rgba(140, 245, 255, 0.10)'
  ctx.lineWidth = 1
  const step = 32
  for (let x = 0; x <= size; x += step) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, size)
    ctx.stroke()
  }
  for (let y = 0; y <= size; y += step) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(size, y)
    ctx.stroke()
  }

  ctx.strokeStyle = 'rgba(140, 245, 255, 0.08)'
  for (let i = 0; i < 20; i += 1) {
    const y = Math.floor((i / 20) * size)
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(size, y + 18)
    ctx.stroke()
  }

  ctx.fillStyle = 'rgba(220, 255, 255, 0.12)'
  for (let i = 0; i < 2600; i += 1) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = Math.random() * 1.2
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)'
  for (let i = 0; i < 180; i += 1) {
    const x = Math.random() * size
    const y = Math.random() * size
    ctx.fillRect(x, y, 1, 1)
  }

  return canvas
}

onMounted(async () => {
  if (!mapRef.value) return

  // 先请求所有接口数据
  fetchHouseholdConsumption()
  fetchVolumeForeignTrade()
  fetchResidentIncome()
  fetchGdp()
  fetchTaxRevenue()
  fetchFiscalRevenue()

  techTexture.value = createTechTexture()

  const url = `${import.meta.env.BASE_URL}geo/anshan.geojson`
  const anshanGeoJson = await fetch(url).then((res) => res.json())

  echarts.registerMap('anshan', anshanGeoJson)

  chartInstance = echarts.init(mapRef.value)

  const topColor = 'rgba(20, 140, 220, 0.65)'
  const topColorEmphasis = 'rgba(80, 200, 255, 0.85)'
  const detailTexture = techTexture.value as any

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(6, 36, 68, 0.85)',
      borderColor: 'rgba(78, 184, 255, 0.4)',
      textStyle: { color: '#eaf4ff' },
      formatter: (p: any) => `${p?.name ?? ''}`
    },
    geo3D: {
      map: 'anshan',
      regionHeight: 10,
      shading: 'realistic',
      realisticMaterial: {
        detailTexture,
        textureTiling: 1,
        roughness: 0.28,
        metalness: 0.02
      },
      groundPlane: { show: false },
      itemStyle: {
        color: topColor,
        borderColor: 'rgba(255, 160, 40, 0.92)',
        borderWidth: 2,
        opacity: 1
      },
      label: {
        show: true,
        color: 'rgba(240, 252, 255, 0.92)',
        fontSize: 14,
        fontWeight: 'bold',
        textShadowBlur: 10,
        textShadowColor: 'rgba(0, 120, 200, 0.6)'
      },
      emphasis: {
        label: { color: '#ffffff' },
        itemStyle: {
          color: topColorEmphasis,
          borderColor: 'rgba(255, 180, 80, 1)',
          borderWidth: 2.6
        }
      },
      viewControl: {
        projection: 'perspective',
        alpha: 70,
        beta: -18,
        distance: 175,
        minDistance: 80,
        maxDistance: 170,
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0
      },
      light: {
        main: {
          intensity: 1.3,
          alpha: 35,
          beta: 35,
          shadow: true,
          shadowQuality: 'high',
          color: '#e6f7ff'
        },
        ambient: { intensity: 0.35 }
      }
    },
    postEffect: {
      enable: true,
      bloom: { enable: true, bloomIntensity: 0.85 },
      SSAO: { enable: true, radius: 6, intensity: 1 },
      FXAA: { enable: true }
    }
  }

  chartInstance.setOption(option)
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>

<style scoped>
.dash-center {
  width: 100%;
  height: 100%;
  position: relative;
}

.title {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 44px;
  color: #84d4ff;
  letter-spacing: 8px;
  text-shadow: 0 0 22px rgba(66, 174, 255, 0.45);
  z-index: 10;
}

.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.space-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 110, 220, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 110, 220, 0.06) 1px, transparent 1px);
  background-size: 36px 36px;
  pointer-events: none;
  z-index: 1;
}

.anshan-map {
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  width: 1100px;
  height: 1000px;
  z-index: 5;
  pointer-events: none;
}

.cpi-item {
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
  height: 260px;
  border-radius: 50%;
  border: 2px solid #42b8ff;
  background: radial-gradient(circle, rgba(20, 124, 230, 0.28), transparent 70%);
  box-shadow: 0 0 60px rgba(44, 160, 255, 0.22);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #eaf4ff;
  z-index: 9;
}

.cpi-item .time {
  font-size: 24px;
  color: #94d8ff;
}

.cpi-item .label {
  font-size: 26px;
  margin: 6px 0;
}

.cpi-item .value {
  font-size: 48px;
  font-weight: bold;
  color: #ffff66;
}

.main-card {
  position: absolute;
  top: 50%;
  right: 18%;
  transform: translateY(-50%);
  width: 280px;
  height: 280px;
  border-radius: 50%;
  border: 2px solid #42b8ff;
  background: radial-gradient(circle, rgba(22, 130, 230, 0.32), rgba(8, 30, 70, 0.04));
  box-shadow: 0 0 50px rgba(44, 160, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #eaf4ff;
  z-index: 8;
}

.main-card-time {
  font-size: 24px;
  color: #94d8ff;
}

.main-card-label {
  font-size: 26px;
  text-align: center;
  margin-top: 8px;
}

.main-card-num {
  font-size: 48px;
  color: #ffff55;
  font-weight: bold;
  margin: 8px 0;
}

.main-card-num .unit {
  font-size: 20px;
}

.main-card-rate {
  font-size: 24px;
  color: #4cff70;
}

.bubble {
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  border: 2px solid #42b8ff;
  background: radial-gradient(circle, rgba(22, 130, 230, 0.24), rgba(8, 30, 70, 0.04));
  box-shadow: 0 0 40px rgba(44, 160, 255, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #eaf4ff;
  z-index: 8;
  animation: float 6s ease-in-out infinite;
}

.bubble .time {
  font-size: 28px;
  color: #94d8ff;
}

.bubble .label {
  font-size: 28px;
  text-align: center;
}

.bubble .num {
  font-size: 36px;
  color: #ffff55;
  font-weight: bold;
  margin: 6px 0;
}

.bubble .unit {
  font-size: 20px;
}

.bubble .rate {
  font-size: 24px;
  color: #4cff70;
}

.bubble .rate.red {
  color: #ff5252;
}

.b1 {
  top: 28%;
  left: 16%;
  animation-delay: 0s;
}

.b2 {
  top: 50%;
  left: 12%;
  animation-delay: 0.8s;
}

.b3 {
  top: 72%;
  left: 18%;
  animation-delay: 1.6s;
}

.b4 {
  top: 34%;
  right: 12%;
  animation-delay: 2.4s;
}

.b5 {
  top: 70%;
  right: 16%;
  animation-delay: 3.2s;
}

.base-ring {
  position: absolute;
  bottom: 90px;
  width: 1200px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(30, 160, 255, 0.18), transparent 72%);
  border-top: 3px solid rgba(78, 184, 255, 0.35);
  z-index: 2;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>