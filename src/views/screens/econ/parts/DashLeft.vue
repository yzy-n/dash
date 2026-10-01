<template>
  <aside class="left">
    <section class="panel panel--electric">
      <div class="panel-head">
        <div class="panel-title">地区生产总值增速</div>
        <select v-model="dateGdp" class="panel-date" @change="fetchGdpData">
          <option v-for="item in gdpDateOptions" :key="item" :value="item">
            {{ item }}
          </option>
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

    <!-- ==================== 三次产业分析（接口驱动） ==================== -->
    <section class="panel panel--capacity">
      <div class="panel-head">
        <div class="panel-title">三次产业分析</div>
        <select v-model="dateCapacity" class="panel-date" @change="fetchCapacityData">
          <option v-for="item in capacityDateOptions" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="capacity-body">
        <div class="capacity-chart">
          <PieRing :data="capacityData" />
        </div>
      </div>
    </section>

    <!-- ==================== 固定资产投资增速（接口驱动） ==================== -->
    <section class="panel panel--resume">
      <div class="panel-head">
        <div class="panel-title">固定资产投资增速</div>
        <select v-model="currentInvestDate" class="panel-date" @change="fetchInvestData">
          <option v-for="item in currentInvestDateOptions" :key="item" :value="item">
            {{ item }}
          </option>
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
          @click="handleInvestTabClick(tab)"
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

    <!-- ==================== 规模以上工业增项（接口驱动） ==================== -->
    <section class="panel panel--pile">
      <div class="panel-head">
        <div class="panel-title">规模以上工业增项</div>
        <select v-model="currentPileDate" class="panel-date" @change="fetchPileData">
          <option v-for="item in currentPileDateOptions" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="panel-tabs">
        <button
          v-for="tab in electricTabs"
          :key="tab"
          type="button"
          class="tab"
          :class="{ 'tab--active': tab === activePileTab }"
          :style="{ backgroundImage: `url(${tabBgUrl})` }"
          @click="handlePileTabClick(tab)"
        >
          {{ tab }}
        </button>
      </div>
      <div class="pile-body">
        <div class="metric-list"></div>
        <div class="pile-chart">
          <Line :data="pileData" />
        </div>
      </div>
    </section>

    <!-- ==================== 规模以上工业效益（接口驱动） ==================== -->
    <section class="panel panel--resume">
      <div class="panel-head">
        <div class="panel-title">规模以上工业效益</div>
        <select v-model="dateBenefit" class="panel-date" @change="fetchBenefitData">
          <option v-for="item in benefitDateOptions" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="four-reform-wrap">
        <div class="four-reform-list">
          <div class="four-reform-item" v-for="item in fourReformMetrics2" :key="item.label">
            <div class="four-reform-label">{{ item.label }}</div>
            <div class="four-reform-value">
              <span class="num">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="resume-invest-body">
        <div class="resume-invest-chart">
          <EChart :option="investOption2" />
        </div>
      </div>
    </section>

    <!-- ==================== 钢价走势（接口驱动） ==================== -->
    <section class="panel panel--steel">
      <div class="panel-head">
        <div class="panel-title">钢价走势</div>
        <select v-model="dateSteel" class="panel-date" @change="fetchSteelData">
          <option v-for="item in steelDateOptions" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="steel-body">
        <div class="steel-header-row">
          <div class="col">品种</div>
          <div class="col">规格</div>
          <div class="col">价格(元)</div>
          <div class="col">上周价格(元)</div>
          <div class="col">环比增长(元)</div>
        </div>

        <div class="steel-row-wrap" v-for="row in steelTableData" :key="row.id">
          <span class="arrow arrow-left"></span>
          <div class="steel-data-row">
            <div class="col">{{ row.category }}</div>
            <div class="col">{{ row.spec }}</div>
            <div class="col">{{ row.price }}</div>
            <div class="col">{{ row.lastWeekPrice }}</div>
            <div class="col" :class="{ 'text-down': row.change < 0 }">
              {{ row.change }}
            </div>
          </div>
          <span class="arrow arrow-right"></span>
        </div>

        <div v-if="steelLoading" class="steel-empty">加载中…</div>
        <div v-else-if="!steelTableData.length" class="steel-empty">暂无数据</div>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import tabBgUrl from '@/assets/img/tabBg.png'
import PieRing from '../charts/PieRing.vue'
import Line from '../charts/line.vue'
import {
  getSteelPrice,
  getNationwide,
  getGrossRegional,
  getIndustrialAnalysis,
  getEconomicIndicatorsDName,
  getFixedInvestments,
  getParkProperty,
  getFourChanges,
  getEconomicIndicatorsIndustry,
  getEconomicIndicatorsPark,
  getEconomicBenefit
} from '@/api/econ'

/* =========================================================
   基础常量
   ========================================================= */
const electricTabs = ['地区', '行业', '园区']
const dateOptions = ['2023-05', '2023-04', '2022年统计数据']

const DEFAULT_GDP_YEARS = ['2025', '2024', '2023', '2022']
const gdpDateOptions = ref<string[]>([...DEFAULT_GDP_YEARS])
const dateGdp = ref('2024')

const capacityDateOptions = [
  '1',
  '2022.01~12',
  '2023.01~03',
  '2023.01~06',
  '2023.01~09',
  '2023.1-12',
  '2023.12',
  '2024.01-06',
  '2024.01-09',
  '2024.01-12',
  '2024.1-3',
  '2025.01-03',
  '222'
]
const dateCapacity = ref('222')

const investDateOptions = [
  '1',
  '2022.01~12',
  '2023.01~02',
  '2023.01~03',
  '2023.01~04',
  '2023.01~05',
  '2023.01~06',
  '2023.01~07',
  '2023.01~08',
  '2023.01~09',
  '2023.01~10',
  '2023.01~11',
  '2023.1-12',
  '2023.12',
  '2024.01~02',
  '2024.01-03',
  '2024.01-04',
  '2024.01-05',
  '2024.01-06',
  '2024.01-07',
  '2024.01-08',
  '2024.01-09',
  '2024.01-10',
  '2024.01-11',
  '2024.01-12',
  '2025.01-02',
  '2025.01-03',
  '2025.01-04',
  '2025.01-06',
  '2025.01-2025.02'
]
const dateInvestFixed = ref('2025.01-2025.02')

const parkDateOptions = ['1', '2022.01~12', '2023.01~06', '2023.1-9']
const dateInvestPark = ref('2023.1-9')

const pileDistrictDateOptions = [
  '1',
  '2022.01~12',
  '2023.01~02',
  '2023.01~03',
  '2023.01~04',
  '2023.01~05',
  '2023.01~06',
  '2023.01~07',
  '2023.01~08',
  '2023.01~09',
  '2023.01-10',
  '2023.01~10',
  '2023.01~11',
  '2023.1-12',
  '2024.01~02',
  '2024.01-04',
  '2024.01-05',
  '2024.01-06',
  '2024.01-07',
  '2024.01-08',
  '2024.01-09',
  '2024.01-10',
  '2024.01-11',
  '2024.01-12',
  '2024.1-3',
  '2025.01-02',
  '2025.01-03',
  '2025.01-04',
  '2025.01-06',
  '2025.01-2025.02'
]
const datePileDistrict = ref('2025.01-2025.02')

const pileIndustryDateOptions = [
  '1',
  '2022.01~12',
  '2023.01~02',
  '2023.01~03',
  '2023.01~04',
  '2023.01~05',
  '2023.01~06',
  '2023.01~07',
  '2023.01~08',
  '2023.01~09',
  '2023.01~10',
  '2023.01~11',
  '2023-1~2023-12',
  '2024.01~02'
]
const datePileIndustry = ref('2024.01~02')

const pileParkDateOptions = ['1', '2022.01~12', '2023.01~06', '2023.01~11']
const datePilePark = ref('2023.01~11')

// ⭐ 规模以上工业效益卡片专属时间下拉
const benefitDateOptions = ref<string[]>([
  '1',
  '2022.01~12',
  '2023.01~02',
  '2023.01~03',
  '2023.01~05',
  '2023.01~06',
  '2023.01~07',
  '2023.01~08',
  '2023.01~10',
  '2023-01~2023-11',
  '2023.1-12'
])
const dateBenefit = ref('2023.1-12')

const dateElectric = ref(dateOptions[0])
const dateInvest = ref(dateOptions[1])

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

const pickSummary = (res: any): Record<string, any> => {
  const body = res?.data ?? res
  if (body?.summary && typeof body.summary === 'object') return body.summary
  if (body?.data?.summary && typeof body.data.summary === 'object') return body.data.summary
  return {}
}

const toNum = (v: any) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

/* =========================================================
   1. GDP 增速同比（接口驱动）
   ========================================================= */

type GdpGrowthRow = {
  quarter: string
  internalLevel: number
  liaoningLevel: number
  anshanLevel: number
}

const gdpGrowthList = ref<GdpGrowthRow[]>([])
const gdpLoading = ref(false)

const fetchGdpGrowth = async () => {
  try {
    const res: any = await getNationwide(dateGdp.value)
    console.log('[nationwide] year=', dateGdp.value, 'res=', res)

    const list = pickList(res)
    gdpGrowthList.value = list.map((it: any) => ({
      quarter: String(it?.quarter ?? ''),
      internalLevel: toNum(it?.internalLevel),
      liaoningLevel: toNum(it?.liaoningLevel),
      anshanLevel: toNum(it?.anshanLevel)
    }))

    const summary = pickSummary(res)
    const timeOptions = summary?.timeOptions
    if (Array.isArray(timeOptions) && timeOptions.length) {
      const opts = timeOptions.map((t: any) => String(t))
      gdpDateOptions.value = opts
      if (!opts.includes(dateGdp.value)) {
        dateGdp.value = opts[0]
      }
    }
  } catch (e) {
    console.error('GDP 增速查询失败', e)
    gdpGrowthList.value = []
  }
}

/* =========================================================
   2. 各地区生产总值（接口驱动）
   ========================================================= */

type RegionGdpRow = {
  area: string
  gdp: number
  yoy: number
}

const regionGdpList = ref<RegionGdpRow[]>([])

const fetchRegionGdp = async () => {
  try {
    const res: any = await getGrossRegional(dateGdp.value)
    console.log('[grossregional] year=', dateGdp.value, 'res=', res)

    const list = pickList(res)
    regionGdpList.value = list.map((it: any) => ({
      area: String(it?.departmentName ?? ''),
      gdp: toNum(it?.grossPro),
      yoy: toNum(it?.yoy)
    }))
  } catch (e) {
    console.error('各地区生产总值查询失败', e)
    regionGdpList.value = []
  }
}

const fetchGdpData = async () => {
  gdpLoading.value = true
  try {
    await Promise.all([fetchGdpGrowth(), fetchRegionGdp()])
  } finally {
    gdpLoading.value = false
  }
}

/* =========================================================
   GDP 增速同比 - 三条折线
   ========================================================= */

const gdpLineOption = computed(() => {
  const x = gdpGrowthList.value.map((r) => r.quarter)
  const national = gdpGrowthList.value.map((r) => r.internalLevel)
  const liaoning = gdpGrowthList.value.map((r) => r.liaoningLevel)
  const anshan = gdpGrowthList.value.map((r) => r.anshanLevel)

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
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 24 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 24 },
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

/* =========================================================
   各地区生产总值 - 柱状 + 折线（双 Y 轴）
   ========================================================= */

const regionGdpOption = computed(() => {
  const names = regionGdpList.value.map((r) => r.area)
  const gdp = regionGdpList.value.map((r) => r.gdp)
  const yoy = regionGdpList.value.map((r) => r.yoy)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)', fontSize: 24 }
    },
    grid: { left: 82, right: 84, top: 48, bottom: 66 },
    xAxis: {
      type: 'category',
      data: names,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 24, rotate: 30 },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } }
    },
    yAxis: [
      {
        type: 'value',
        name: '单位：亿元',
        nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 24, padding: [0, 0, 0, 8] },
        axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 24 },
        splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      {
        type: 'value',
        name: '单位：%',
        nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 24, padding: [0, 8, 0, 0] },
        axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 24 },
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

/* =========================================================
   3. 三次产业分析（接口驱动）
   ========================================================= */

type PieItem = {
  name: string
  value: number
  rate: number
}

const capacityData = ref<PieItem[]>([])
const capacityLoading = ref(false)

const fetchCapacityData = async () => {
  capacityLoading.value = true
  try {
    const res: any = await getIndustrialAnalysis(dateCapacity.value)
    console.log('[industrialanalysis] souseDate=', dateCapacity.value, 'res=', res)

    const list = pickList(res)
    const row = list[0]
    if (row) {
      capacityData.value = [
        {
          name: '第一产业',
          value: toNum(row.onePrimaryIndustry),
          rate: toNum(row.onePrimaryProportion)
        },
        {
          name: '第二产业',
          value: toNum(row.twoPrimaryIndustry),
          rate: toNum(row.twoPrimaryProportion)
        },
        {
          name: '第三产业',
          value: toNum(row.threePrimaryIndustry),
          rate: toNum(row.threePrimaryProportion)
        }
      ]
    } else {
      capacityData.value = []
    }
  } catch (e) {
    console.error('三次产业分析查询失败', e)
    capacityData.value = []
  } finally {
    capacityLoading.value = false
  }
}

/* =========================================================
   4. 固定资产投资增速（接口驱动）
   ========================================================= */

const investTabs = ['地区', '行业', '园区']
type InvestTab = (typeof investTabs)[number]

const activeInvestTab = ref<InvestTab>('地区')

type InvestRow = {
  area: string
  value: number
}

const investDistrictList = ref<InvestRow[]>([])
const investIndustryList = ref<InvestRow[]>([])
const investParkList = ref<InvestRow[]>([])
const investLoading = ref(false)

const currentInvestDateOptions = computed<string[]>(() => {
  if (activeInvestTab.value === '园区') return parkDateOptions
  return investDateOptions
})

const currentInvestDate = computed<string>({
  get: () =>
    activeInvestTab.value === '园区' ? dateInvestPark.value : dateInvestFixed.value,
  set: (v: string) => {
    if (activeInvestTab.value === '园区') dateInvestPark.value = v
    else dateInvestFixed.value = v
  }
})

const fetchInvestData = async () => {
  investLoading.value = true
  try {
    if (activeInvestTab.value === '地区') {
      const res: any = await getEconomicIndicatorsDName(dateInvestFixed.value)
      console.log('[economicindicatorsdname] souseDate=', dateInvestFixed.value, 'res=', res)

      const list = pickList(res)
      investDistrictList.value = list.map((it: any) => ({
        area: String(it?.departmentName ?? ''),
        value: toNum(it?.yearOnYearGrowth)
      }))
    } else if (activeInvestTab.value === '行业') {
      const res: any = await getFixedInvestments(dateInvestFixed.value)
      console.log('[fixedinvestments] souseDate=', dateInvestFixed.value, 'res=', res)

      const list = pickList(res)
      investIndustryList.value = list.map((it: any) => ({
        area: String(it?.industry ?? ''),
        value: toNum(it?.yearOnYearGrowth)
      }))
    } else {
      const res: any = await getParkProperty(dateInvestPark.value)
      console.log('[parkproperty] souseDate=', dateInvestPark.value, 'res=', res)

      const list = pickList(res)
      investParkList.value = list.map((it: any) => ({
        area: String(it?.parkName ?? ''),
        value: toNum(it?.yearOnYearGrowth)
      }))
    }
  } catch (e) {
    console.error('固定资产投资增速查询失败', e)
  } finally {
    investLoading.value = false
  }
}

const handleInvestTabClick = async (tab: InvestTab) => {
  if (activeInvestTab.value === tab) return
  activeInvestTab.value = tab
  await fetchInvestData()
}

const currentInvestList = computed<InvestRow[]>(() => {
  if (activeInvestTab.value === '地区') return investDistrictList.value
  if (activeInvestTab.value === '行业') return investIndustryList.value
  return investParkList.value
})

const investOption = computed(() => {
  const names = currentInvestList.value.map((r) => r.area)
  const values = currentInvestList.value.map((r) => r.value)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 60, right: 24, top: 64, bottom: 80 },
    xAxis: {
      type: 'category',
      data: names,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 28, rotate: 40 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位：%',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 28 },
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 28 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        type: 'bar',
        barWidth: 24,
        data: values,
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

/* =========================================================
   5. 规模以上工业增项（接口驱动）
   ========================================================= */

type PileRow = {
  name: string
  value: number
}

const activePileTab = ref<string>(electricTabs[0])
const pileData = ref<PileRow[]>([])
const pileLoading = ref(false)

const currentPileDateOptions = computed<string[]>(() => {
  if (activePileTab.value === '行业') return pileIndustryDateOptions
  if (activePileTab.value === '园区') return pileParkDateOptions
  return pileDistrictDateOptions
})

const currentPileDate = computed<string>({
  get: () => {
    if (activePileTab.value === '行业') return datePileIndustry.value
    if (activePileTab.value === '园区') return datePilePark.value
    return datePileDistrict.value
  },
  set: (v: string) => {
    if (activePileTab.value === '行业') datePileIndustry.value = v
    else if (activePileTab.value === '园区') datePilePark.value = v
    else datePileDistrict.value = v
  }
})

const fetchPileData = async () => {
  pileLoading.value = true
  try {
    if (activePileTab.value === '地区') {
      const res: any = await getEconomicIndicatorsDName(datePileDistrict.value)
      console.log('[pile-economicindicatorsdname] souseDate=', datePileDistrict.value, 'res=', res)

      const list = pickList(res)
      pileData.value = list.map((it: any) => ({
        name: String(it?.departmentName ?? ''),
        value: toNum(it?.yearOnYearGrowth)
      }))
    } else if (activePileTab.value === '行业') {
      const res: any = await getEconomicIndicatorsIndustry(datePileIndustry.value)
      console.log(
        '[pile-economicindicatorsindustry] souseDate=',
        datePileIndustry.value,
        'res=',
        res
      )

      const list = pickList(res)
      pileData.value = list.map((it: any) => ({
        name: String(it?.industry ?? ''),
        value: toNum(it?.yearOnYearGrowth)
      }))
    } else {
      const res: any = await getEconomicIndicatorsPark(datePilePark.value)
      console.log(
        '[pile-economicindicatorspark] souseDate=',
        datePilePark.value,
        'res=',
        res
      )

      const list = pickList(res)
      pileData.value = list.map((it: any) => ({
        name: String(it?.parkName ?? ''),
        value: toNum(it?.yearOnYearGrowth)
      }))
    }
  } catch (e) {
    console.error('规模以上工业增项查询失败', e)
    pileData.value = []
  } finally {
    pileLoading.value = false
  }
}

const handlePileTabClick = async (tab: string) => {
  if (activePileTab.value === tab) return
  activePileTab.value = tab
  await fetchPileData()
}

/* =========================================================
   6. 工业“四改”投资完成情况（接口驱动）
   ========================================================= */

type FourChangeMetrics = {
  amount: string
  yearOnYearGrowth: string
  accountingGrowth: string
  periodLastYear: string
}

const FOUR_CHANGES_DATE = '2024.01-03'

const fourChangesData = ref<FourChangeMetrics>({
  amount: '0',
  yearOnYearGrowth: '0',
  accountingGrowth: '0',
  periodLastYear: '0'
})

const fetchFourChanges = async () => {
  try {
    const res: any = await getFourChanges(FOUR_CHANGES_DATE)
    console.log('[fourchanges] souseDate=', FOUR_CHANGES_DATE, 'res=', res)

    const list = pickList(res)
    const row = list[0]
    if (row) {
      fourChangesData.value = {
        amount: String(row.amount ?? '0'),
        yearOnYearGrowth: String(row.yearOnYearGrowth ?? '0'),
        accountingGrowth: String(row.accountingGrowth ?? '0'),
        periodLastYear: String(row.periodLastYear ?? '0')
      }
    }
  } catch (e) {
    console.error('工业“四改”投资完成情况查询失败', e)
  }
}

const fourReformMetrics = computed(() => [
  { label: '累计完成投资', value: fourChangesData.value.amount, unit: '亿元' },
  { label: '较去年同期增长', value: fourChangesData.value.yearOnYearGrowth, unit: '%' },
  { label: '占工业投资比重', value: fourChangesData.value.accountingGrowth, unit: '%' },
  { label: '较去年同期提升', value: fourChangesData.value.periodLastYear, unit: '%' }
])

/* =========================================================
   7. 规模以上工业效益（接口驱动）
   - 接口：/economicoperation/bigscreen/economicbenefit?souseDate=xxx
   - dataList: 每个行业一条 { industry, taking, averageNumber, amount, profit }
   - summary.totals: { income, workers, tax, profit } → 4 个指标卡片
   - summary.timeOptions / souseDate: 时间下拉
   ========================================================= */

type BenefitRow = {
  industry: string
  taking: number
  averageNumber: number
  amount: number
  profit: number
}

type BenefitTotals = {
  income: string
  workers: string
  tax: string
  profit: string
}

const benefitList = ref<BenefitRow[]>([])
const benefitTotals = ref<BenefitTotals>({
  income: '0',
  workers: '0',
  tax: '0',
  profit: '0'
})
const benefitLoading = ref(false)

const fetchBenefitData = async () => {
  benefitLoading.value = true
  try {
    const res: any = await getEconomicBenefit(dateBenefit.value)
    console.log('[economicbenefit] souseDate=', dateBenefit.value, 'res=', res)

    const list = pickList(res)
    benefitList.value = list.map((it: any) => ({
      industry: String(it?.industry ?? ''),
      taking: toNum(it?.taking),
      averageNumber: toNum(it?.averageNumber),
      amount: toNum(it?.amount),
      profit: toNum(it?.profit)
    }))

    // summary.totals + timeOptions
    const summary = pickSummary(res)
    const totals = summary?.totals ?? {}
    benefitTotals.value = {
      income: String(totals?.income ?? '0'),
      workers: String(totals?.workers ?? '0'),
      tax: String(totals?.tax ?? '0'),
      profit: String(totals?.profit ?? '0')
    }

    // ⭐ 用接口返回的 timeOptions 覆盖本地时间下拉
    const timeOptions = summary?.timeOptions
    if (Array.isArray(timeOptions) && timeOptions.length) {
      const opts = timeOptions.map((t: any) => String(t))
      benefitDateOptions.value = opts
      const souseDate = String(summary?.souseDate ?? '')
      if (souseDate && opts.includes(souseDate)) {
        dateBenefit.value = souseDate
      } else if (!opts.includes(dateBenefit.value)) {
        dateBenefit.value = opts[0]
      }
    }
  } catch (e) {
    console.error('规模以上工业效益查询失败', e)
    benefitList.value = []
  } finally {
    benefitLoading.value = false
  }
}

// 顶部 4 个指标卡片：营业收入 / 税金总额 / 平均用工人数 / 利润总额
const fourReformMetrics2 = computed(() => [
  { label: '营业收入', value: benefitTotals.value.income, unit: '亿元' },
  { label: '税金总额', value: benefitTotals.value.tax, unit: '亿元' },
  { label: '平均用工人数', value: benefitTotals.value.workers, unit: '人' },
  { label: '利润总额', value: benefitTotals.value.profit, unit: '亿元' }
])

// 图表：9 个行业 × 4 个指标（多系列柱状图）
const investOption2 = computed(() => {
  const names = benefitList.value.map((r) => r.industry)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    legend: {
      top: 8,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.72)', fontSize: 20 }
    },
    grid: { left: 60, right: 24, top: 90, bottom: 300 },
    xAxis: {
      type: 'category',
      data: names,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 26, rotate: 40 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位：亿元',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 26 },
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 26 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '营业收入',
        type: 'bar',
        barWidth: 10,
        data: benefitList.value.map((r) => r.taking),
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
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
        }
      },
      {
        name: '税金总额',
        type: 'bar',
        barWidth: 10,
        data: benefitList.value.map((r) => r.amount),
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#36e8bc' },
              { offset: 1, color: 'rgba(22,160,120,0.4)' }
            ]
          }
        }
      },
      {
        name: '利润总额',
        type: 'bar',
        barWidth: 10,
        data: benefitList.value.map((r) => r.profit),
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#ffd058' },
              { offset: 1, color: 'rgba(255,150,20,0.4)' }
            ]
          }
        }
      }
    ]
  }
})

/* =========================================================
   8. 钢价走势（接口驱动）
   ========================================================= */

const steelDateOptions = [
  '2023.02',
  '2023.03',
  '2023.03.21',
  '2023.03.22',
  '2023.03.27',
  '2023.04.20',
  '2023.05.05',
  '2023.05.18',
  '2023.05.26',
  '2023.06.02',
  '2023.06.09',
  '2023.06.16',
  '2023.06.21',
  '2023.06.29',
  '2023.07.07',
  '2023.07.14',
  '2023.07.21',
  '2023.07.28',
  '2023.08',
  '2023.08.04',
  '2023.08.11',
  '2023.08.18',
  '2023.08.25',
  '2023.09.01',
  '2023.09.08',
  '2023.09.15',
  '2023.09.21',
  '2023.09.26',
  '2023.10.09',
  '2023.10.17',
  '2023.11.29',
  '2024.03.13',
  '2024.05',
  '2024.07',
  '2024.12',
  '2025.06'
]

const dateSteel = ref('2025.06')
const steelLoading = ref(false)

type SteelRow = {
  id: number
  category: string
  spec: string
  price: number
  lastWeekPrice: number
  change: number
}

const steelTableData = ref<SteelRow[]>([])

const fetchSteelData = async () => {
  steelLoading.value = true
  try {
    const res: any = await getSteelPrice(dateSteel.value)
    console.log('[steelprice] souseDate=', dateSteel.value, 'res=', res)

    const list = pickList(res)
    steelTableData.value = list.map((it: any, idx: number) => {
      const price = Number(it?.price ?? 0)
      const change = Number(it?.amountIncrease ?? 0)
      return {
        id: idx + 1,
        category: String(it?.type ?? ''),
        spec: String(it?.specification ?? ''),
        price,
        lastWeekPrice: price - change,
        change
      }
    })
  } catch (e) {
    console.error('钢价走势查询失败', e)
    steelTableData.value = []
  } finally {
    steelLoading.value = false
  }
}

/* =========================================================
   其余 Tab / 静态指标
   ========================================================= */

const capacityTabs = ['全社会用电容量', '全行业实际用电容量']
const activeCapacityTab = ref<(typeof capacityTabs)[number]>(capacityTabs[0])

/* =========================================================
   初始化
   ========================================================= */

onMounted(() => {
  fetchGdpData()
  fetchCapacityData()
  fetchInvestData()
  fetchPileData()
  fetchFourChanges()
  fetchBenefitData()
  fetchSteelData()
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
  transform: skewX(-10deg);
  font-weight: 800;
  margin-top: -15px;
  margin-left: 20px;
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
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgba(124, 242, 255, 0.95);
  text-shadow: 0 0 12px rgba(54, 232, 255, 0.16);
}
.gdp-block-unit,
.gdp-block-legend {
  font-size: 24px;
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
  margin-bottom: 90px;
}
.four-reform-title {
  text-align: center;
  font-size: 24px;
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
  font-size: 28px;
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
  font-size: 28px;
  color: rgba(214, 238, 255, 0.6);
}
.pile-body {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: 140px 1fr;
  gap: 14px;
}
.pile-chart {
  min-height: 0;
}
.steel-body {
  width: 100%;
}
.steel-header-row {
  display: flex;
  width: 100%;
  background: #0b306b;
}
.steel-header-row .col {
  flex: 1;
  text-align: center;
  font-size: 34px;
  color: #fff;
  padding: 12px 4px;
  text-shadow: 0 0 8px #2178dd;
}
.steel-row-wrap {
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 40px;
}
.arrow {
  width: 14px;
  height: 18px;
  color: #ffcc44;
  font-size: 20px;
  text-shadow: 0 0 6px #ffbc2c;
}
.arrow-left::before {
  content: '◆';
}
.arrow-right::before {
  content: '◆';
}
.steel-data-row {
  flex: 1;
  display: flex;
  background: linear-gradient(90deg, #0c3370, #15448c, #0c3370);
}
.steel-data-row .col {
  flex: 1;
  text-align: center;
  font-size: 34px;
  color: #ffffff;
  padding: 16px 4px;
  text-shadow: 0 0 6px #247ddd;
}
.text-down {
  color: #39f25c;
  text-shadow: 0 0 8px #23d848;
}
.steel-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-size: 28px;
  color: rgba(214, 238, 255, 0.6);
}
</style>