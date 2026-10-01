<template>
  <aside class="right">
    <div class="col">
      <section class="panel market-panel">
        <div class="panel-head">
          <div class="panel-title">各地区市场主体</div>
          <select
            v-model="dateMarket"
            class="panel-date"
            @change="fetchMarketData"
          >
            <option v-for="item in marketDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <!-- 5个指标卡片 -->
        <div class="market-metrics-wrap">
          <div class="metric-item">
            <div class="metric-label">总计</div>
            <div class="metric-value">
              {{ marketTotals.total }} <span class="unit">户</span>
            </div>
          </div>
          <div class="metric-item">
            <div class="metric-label">内资企业</div>
            <div class="metric-value">
              {{ marketTotals.domestic }} <span class="unit">户</span>
            </div>
          </div>
          <div class="metric-item">
            <div class="metric-label">个体工商户</div>
            <div class="metric-value">
              {{ marketTotals.individual }} <span class="unit">户</span>
            </div>
          </div>
          <div class="metric-item">
            <div class="metric-label">农民专业合作社</div>
            <div class="metric-value">
              {{ marketTotals.cooperative }} <span class="unit">户</span>
            </div>
          </div>
          <div class="metric-item">
            <div class="metric-label">外资企业</div>
            <div class="metric-value">
              {{ marketTotals.overseas }} <span class="unit">户</span>
            </div>
          </div>
        </div>
        <!-- 柱状图区域 -->
        <div class="chart-wrap">
          <EChart :option="barOption" />
        </div>
      </section>

      <!-- 价格监测（接口驱动） -->
      <section class="panel panel--tower">
        <div class="panel-head">
          <div class="panel-title">价格监测</div>
          <select
            v-model="datePrice"
            class="panel-date"
            @change="fetchPriceData"
          >
            <option v-for="item in priceDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="panel-tabs panel-tabs--center">
          <button
            v-for="tab in priceTabList"
            :key="tab"
            type="button"
            class="tab"
            :class="{ 'tab--active': tab === activePriceTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="switchPriceTab(tab)"
          >
            {{ tab }}
          </button>
        </div>
        <div class="price-table-wrap">
          <div class="price-table-header">
            <div class="price-cell">品种</div>
            <div class="price-cell">上周平均价格(元)</div>
            <div class="price-cell">本周平均价格(元)</div>
            <div class="price-cell">环比增长(元)</div>
          </div>
          <div class="price-table-body">
            <div
              v-for="(row, idx) in priceTableData"
              :key="`${row.name}-${idx}`"
              class="price-table-row"
            >
              <div class="price-cell">{{ row.name }}</div>
              <div class="price-cell">{{ row.lastWeek }}</div>
              <div class="price-cell">{{ row.thisWeek }}</div>
              <div
                class="price-cell"
                :class="{
                  'price-up': row.diff > 0,
                  'price-down': row.diff < 0,
                  'price-zero': row.diff === 0
                }"
              >
                {{ row.diff > 0 ? '+' : '' }}{{ row.diff }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="col">
      <section class="panel panel--water">
        <div class="panel-head">
          <div class="panel-title">消费品总额增速</div>
          <select
            v-model="dateWater"
            class="panel-date"
            @change="fetchWaterData"
          >
            <option v-for="item in waterDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="water-chart">
          <productChart :data="waterData" />
        </div>
      </section>

      <!-- 建筑业增值增速（接口驱动） -->
      <section class="panel panel--heat">
        <div class="panel-head">
          <div class="panel-title">建筑业增值增速</div>
          <select
            v-model="dateHeat"
            class="panel-date"
            @change="fetchHeatData"
          >
            <option v-for="item in heatDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="panel-tabs panel-tabs--center">
          <button
            v-for="tab in heatTabs"
            :key="tab"
            type="button"
            class="tab"
            :class="{ 'tab--active': tab === activeHeatTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="activeHeatTab = tab"
          >
            {{ tab }}
          </button>
        </div>
        <div class="heat-chart">
          <plusChart :data="heatData" />
        </div>
      </section>
    </div>

    <div class="col">
      <section class="panel panel--red">
        <div class="panel-head red-panel-head">
          <div class="panel-title">数字经济与服务</div>
          <select
            v-model="dateRed"
            class="panel-date"
            @change="fetchRedData"
          >
            <option v-for="item in redDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="red-inner">
          <div class="red-top-item">
            <div class="red-top-icon"></div>
            <div class="red-top-label">互联网和相关服务情况</div>
            <div class="red-top-val">
              {{ internetService.taking }} 亿元<span>{{ internetService.speed }}%</span>
            </div>
          </div>
          <div class="red-top-item">
            <div class="red-top-icon"></div>
            <div class="red-top-label">软件和信息技术服务业情况</div>
            <div class="red-top-val">
              {{ softwareService.taking }} 亿元<span>{{ softwareService.speed }}%</span>
            </div>
          </div>
          <div class="chart-wrap">
            <serviceChart :option="serviceBarOption" />
          </div>
        </div>
      </section>

      <!-- 商品房交易情况（接口驱动） -->
      <section class="panel panel--aed">
        <div class="panel-head red-panel-head">
          <div class="panel-title">商品房交易情况</div>
          <select
            v-model="dateHouse"
            class="panel-date"
            @change="fetchHouseData"
          >
            <option v-for="item in houseDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="panel-tabs panel-tabs--center">
          <button
            v-for="tab in houseTabs"
            :key="tab"
            type="button"
            class="tab"
            :class="{ 'tab--active': tab === activeHouseTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="switchHouseTab(tab)"
          >
            {{ tab }}
          </button>
        </div>
        <div class="aed-chart">
          <houseChart :data="houseData" :tabKey="activeHouseTab" />
        </div>
      </section>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import productChart from '@/views/screens/econ/charts/product.vue'
import plusChart from '@/views/screens/econ/charts/plus.vue'
import houseChart from '@/views/screens/econ/charts/house.vue'
import serviceChart from '@/views/screens/econ/charts/service.vue'
import tabBgUrl from '@/assets/img/tabBg.png'
import {
  getEachRegion,
  getAmountGrowth,
  getRentabilityAnalyseIndustry,
  getPrice,
  getConstruction,
  getCondo
} from '@/api/econ'

/* =========================================================
   各地区市场主体（接口驱动）
   ========================================================= */
const marketDateOptions = ref<string[]>([
  '1',
  '2022.01~12',
  '2023.01~02',
  '2023.01~03',
  '2023.01~07',
  '2023.01~08',
  '2023.01~09',
  '2023.10',
  '2023.11',
  '20231121',
  '2023.12',
  '2023.1~9',
  '2024.04',
  '2024.11',
  '2025年6月'
])
const dateMarket = ref('2025年6月')

type MarketRow = {
  area: string
  domestic: number
  individual: number
  cooperative: number
  overseas: number
}

const marketList = ref<MarketRow[]>([])
const marketLoading = ref(false)

/** 兼容多种解包层级 */
const pickList = (res: any): any[] => {
  const body = res?.data ?? res
  if (Array.isArray(body?.datalist)) return body.datalist
  if (Array.isArray(body?.dataList)) return body.dataList
  if (Array.isArray(body?.data?.datalist)) return body.data.datalist
  if (Array.isArray(body?.data?.dataList)) return body.data.dataList
  return []
}

const toNum = (v: any) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

const fetchMarketData = async () => {
  marketLoading.value = true
  try {
    const res: any = await getEachRegion(dateMarket.value)
    console.log('[eachregion] souseDate=', dateMarket.value, 'res=', res)

    const list = pickList(res)
    marketList.value = list.map((it: any) => ({
      area: String(it?.departmentName ?? ''),
      domestic: toNum(it?.domesticEnterprise),
      individual: toNum(it?.individualBusiness),
      cooperative: toNum(it?.professionalCooperative),
      overseas: toNum(it?.overseasFundedEnterprise)
    }))
  } catch (e) {
    console.error('各地区市场主体查询失败', e)
    marketList.value = []
  } finally {
    marketLoading.value = false
  }
}

const marketTotals = computed(() => {
  const list = marketList.value
  const domestic = list.reduce((s, r) => s + r.domestic, 0)
  const individual = list.reduce((s, r) => s + r.individual, 0)
  const cooperative = list.reduce((s, r) => s + r.cooperative, 0)
  const overseas = list.reduce((s, r) => s + r.overseas, 0)
  const total = domestic + individual + cooperative + overseas
  return {
    total: String(total),
    domestic: String(domestic),
    individual: String(individual),
    cooperative: String(cooperative),
    overseas: String(overseas)
  }
})

const barOption = computed(() => {
  const names = marketList.value.map((r) => r.area)
  const values = marketList.value.map((r) => r.domestic)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(4,24,48,0.85)',
      borderColor: '#26c9dd',
      textStyle: { color: '#fff' },
      formatter: (params: any) =>
        `${params[0].axisValue}<br/>内资企业：${params[0].value}户`
    },
    grid: {
      left: '8%',
      right: '4%',
      top: '12%',
      bottom: '22%'
    },
    xAxis: {
      type: 'category',
      data: names,
      axisLine: { lineStyle: { color: '#287892' } },
      axisLabel: {
        color: '#82d8e8',
        rotate: 40,
        fontSize: 36
      }
    },
    yAxis: {
      name: '单位：户',
      nameTextStyle: { color: '#82d8e8' },
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(38,201,221,0.15)' } },
      axisLine: { show: false },
      axisLabel: { color: '#82d8e8', fontSize: 30 }
    },
    series: [
      {
        name: '内资企业',
        type: 'bar',
        barWidth: '40%',
        data: values,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#26e2dd' },
              { offset: 1, color: '#086c94' }
            ]
          }
        }
      }
    ]
  }
})

/* =========================================================
   价格监测（接口驱动）
   ========================================================= */
const priceDateOptions = ref<string[]>([
  '05.29~06.04',
  '06.05~06.11',
  '06.19~06.25',
  '06.26~07.02',
  '07.03~07.09',
  '07.10~07.16',
  '07.17~07.23',
  '07.24~07.30',
  '08.07~08.13',
  '08.14~08.20',
  '08.21~08.27',
  '08.28~09.03',
  '09.04~09.10',
  '09.11~09.17',
  '09.18~09.24',
  '10.01~10.08',
  '11.11~11.17',
  '11.25~12.1',
  '11.4~11.10',
  '12.2~12.8',
  '2023.04.10~04.16',
  '2023.04.24~04.30',
  '2023.05.08~05.14',
  '2023.05.15~21',
  '2023.05.22~28',
  '2023.10.09~10.15',
  '2023.10.16~10.22',
  '2023.10.23~10.29',
  '2023.10.26',
  '2023.10.30~11.05',
  '2023.11.06~11.12',
  '2023.11.13~11.19',
  '2023.11.20~11.26',
  '2023.11.27~12.03',
  '2023.12.04~12.10',
  '2023.12.11~12.17',
  '2023.12.18~12.24',
  '2023.12.25~12.31',
  '2024.01.01~01.07',
  '2024.01.08~01.14',
  '2024.01.15~1.21',
  '2024.01.22~01.28',
  '2024.01.29~02.04',
  '2024.02.05~02.10',
  '2024.02.12~02.18',
  '2024.02.19~02.25',
  '2024.02.26~03.03',
  '2024.06.03-06.09',
  '2024.06.10-06.16',
  '2024.08.19~08.25',
  '2024.10.14~10.20',
  '2024.10.21~10.27',
  '2024.10. 28~11.3',
  '2024.10.7~10.13',
  '2024.11.18~11.24',
  '2024.1.13~1.19',
  '2024.12.16~12.22',
  '2024.12.23~12.29',
  '2024.12.8~12.15',
  '2024.3.11~3.17',
  '2024.3.18~3.24',
  '2024.3.25~3.31',
  '2024.3.3~3.10',
  '2024.4.1~4.7',
  '2024.4.15~4.21',
  '2024.4.22~4.28',
  '2024.4.29~5.5',
  '2024.4.8~4.14',
  '2024.5.13~5.19',
  '2024.5.20~5.26',
  '2024.5.27~6.02',
  '2024.5.6~5.12',
  '2024.6.17-6.23',
  '2024.6.24-6.30',
  '2024.7.15~7.21',
  '2024.7.1~7.7',
  '2024.7.22~7.28',
  '2024.7.29~8.4',
  '2024.7.8~7.14',
  '2024.8.04~8.11',
  '2024.8.12~8.18',
  '2024.8.26~9.1',
  '2024.9.16~9.22',
  '2024.9.23-9.29',
  '2024.9.2~9.8',
  '2024.9.30~10.6',
  '2024.9.9~9.15',
  '2025.10.13~10.19',
  '2025.10.20~10.26',
  '2025.10.27~11.2',
  '2025.10.6~10.12',
  '2025.11.10~11.16',
  '2025.11.17~11.23',
  '2025.11.24~11.30',
  '2025.11.3~11.9',
  '2025.1.20~1.26',
  '2025.12.1~12.7',
  '2025.12.15~12.31',
  '2025.12.22~12.28',
  '2025.12.29~1.4',
  '2025.1.27~2.2',
  '2025.12.8~12.14',
  '2025.1.6~1.12',
  '2025.2.10~2.16',
  '2025.2.17~2.23',
  '2025.2.24~3.2',
  '2025.2.3~2.9',
  '2025.3.10~3.16',
  '2025.3.17~3.23',
  '2025.3.24~3.30',
  '2025.3.31~4.6',
  '2025.3.3~3.9',
  '2025.4.14~4.20',
  '2025.4.21~4.27',
  '2025.4.28~5.4',
  '2025.4.7~4.13',
  '2025.5.12~5.18',
  '2025.5.19~5.25',
  '2025.5.26~6.1',
  '2025.5.5~5.11',
  '2025.6.16~6.22',
  '2025.6.23~6.29',
  '2025.6.2~6.8',
  '2025.6.30~7.6',
  '2025.6.9~6.15',
  '2025.7.14~7.20',
  '2025.7.21~7.27',
  '2025.7.28~8.3',
  '2025.7.7~7.13',
  '2025.8.11~8.17',
  '2025.8.18~8.24',
  '2025.8.25~8.31',
  '2025.8.4~8.10',
  '2025.9.15~9.21',
  '2025.9.1~9.7',
  '2025.9.22~9.28',
  '2025.9.29~10.5',
  '2025.9.8~9.14',
  '2026.03.16~03.22',
  '2026.03.23~03.29',
  '2026.1.12~1.18',
  '2026.1.19~1.25',
  '2026.1.26~2.1',
  '2026.1.5~1.11',
  '2026.2.16~2.22',
  '2026.2.2~2.8',
  '2026.2.23~3.1',
  '2026.2.9~2.15',
  '2026.3.2~3.8',
  '2026.3.30~4.5',
  '2026.3.9~3.15',
  '2026.4.13~4.19',
  '2026.4.20~4.26',
  '2026.4.27~5.3',
  '2026.4.6~4.12',
  '2026.5.11~5.17',
  '2026.5.18~5.24',
  '2026.5.25~5.31',
  '2026.5.4~5.10'
])
const datePrice = ref('2026.5.4~5.10')

const priceTabList = ref(['农副产品', '蔬菜'])
const activePriceTab = ref('农副产品')
const priceGoodsTypeMap: Record<string, string> = {
  农副产品: '1',
  蔬菜: '2'
}

type PriceRow = {
  name: string
  lastWeek: number
  thisWeek: number
  diff: number
}
const priceTableData = ref<PriceRow[]>([])
const priceLoading = ref(false)

const pickPriceList = (res: any): any[] => {
  const body = res?.data ?? res
  if (Array.isArray(body?.datalist)) return body.datalist
  if (Array.isArray(body?.dataList)) return body.dataList
  if (Array.isArray(body?.data?.datalist)) return body.data.datalist
  if (Array.isArray(body?.data?.dataList)) return body.data.dataList
  return []
}

const fetchPriceData = async () => {
  priceLoading.value = true
  try {
    const goodsType = priceGoodsTypeMap[activePriceTab.value] ?? '1'
    const res: any = await getPrice(datePrice.value, goodsType)
    console.log(
      '[price] souseDate=', datePrice.value,
      'goodsType=', goodsType,
      'res=', res
    )

    const list = pickPriceList(res)
    priceTableData.value = list.map((it: any) => ({
      name: String(it?.goodsT ?? it?.goods ?? ''),
      lastWeek: toNum(it?.yesterdayPrice),
      thisWeek: toNum(it?.todayPrice),
      diff: toNum(it?.changeD)
    }))
  } catch (e) {
    console.error('价格监测查询失败', e)
    priceTableData.value = []
  } finally {
    priceLoading.value = false
  }
}

const switchPriceTab = (tab: string) => {
  if (activePriceTab.value === tab) return
  activePriceTab.value = tab
  fetchPriceData()
}

/* =========================================================
   消费品总额增速（接口驱动）
   ========================================================= */
const waterDateOptions = ref<string[]>([
  '1',
  '2022.01~12',
  '2023.01~03',
  '2023.01-12',
  '2023.06',
  '2023.09',
  '2024.01-06',
  '2024.01-09',
  '2024.01-12',
  '2024.1-3'
])
const dateWater = ref('2024.1-3')
const waterData = ref<any[]>([])
const waterLoading = ref(false)

const fetchWaterData = async () => {
  waterLoading.value = true
  try {
    const res: any = await getAmountGrowth(dateWater.value)
    console.log('[amountgrowth] souseDate=', dateWater.value, 'res=', res)

    const body = res?.data ?? res

    const opts = body?.summary?.timeOptions
    if (Array.isArray(opts) && opts.length) {
      waterDateOptions.value = opts
    }
    const souseDate = body?.summary?.souseDate
    if (souseDate && souseDate !== dateWater.value) {
      dateWater.value = souseDate
    }

    const list = body?.dataList
    waterData.value = Array.isArray(list) ? list : []
  } catch (e) {
    console.error('消费品总额增速查询失败', e)
    waterData.value = []
  } finally {
    waterLoading.value = false
  }
}

/* =========================================================
   建筑业增值增速（接口驱动）
   ========================================================= */
type HeatRow = { year: string; addedValue: number; speed: number }

const heatDateOptions = ref<string[]>([
  '1',
  '2022.01~12',
  '2023.01~03',
  '2023.01~06',
  '2023.01~09',
  '2023.01～09',
  '2023.01-12',
  '2024.01-06',
  '2024.01-09',
  '2024.01-12',
  '2024.03',
  '2024.1-3',
  '2025.01-03'
])
const dateHeat = ref('2025.01-03')
const heatSourceData = ref<HeatRow[]>([])
const heatLoading = ref(false)

const heatTabs = ['增加值', '同比']
const activeHeatTab = ref<(typeof heatTabs)[number]>(heatTabs[0])

const fetchHeatData = async () => {
  heatLoading.value = true
  try {
    const res: any = await getConstruction(dateHeat.value)
    console.log('[construction] souseDate=', dateHeat.value, 'res=', res)

    const body = res?.data ?? res

    const opts = body?.summary?.timeOptions
    if (Array.isArray(opts) && opts.length) {
      heatDateOptions.value = opts
    }
    const souseDate = body?.summary?.souseDate
    if (souseDate && souseDate !== dateHeat.value) {
      dateHeat.value = souseDate
    }

    const list = body?.dataList
    heatSourceData.value = Array.isArray(list)
      ? list.map((it: any) => ({
          year: String(it?.year ?? ''),
          addedValue: toNum(it?.addedValue),
          speed: toNum(it?.speed)
        }))
      : []
  } catch (e) {
    console.error('建筑业增值增速查询失败', e)
    heatSourceData.value = []
  } finally {
    heatLoading.value = false
  }
}

const heatData = computed(() => {
  const isSpeed = activeHeatTab.value === '同比'
  return heatSourceData.value.map((r) => ({
    name: r.year,
    value: isSpeed ? r.speed : r.addedValue
  }))
})

/* =========================================================
   数字经济与服务（接口驱动）
   ========================================================= */
type RedRow = { industry: string; taking: number; speed: number }

const redDateOptions = ref<string[]>([
  '1',
  '2022.01~12',
  '2023.01~02',
  '2023.01~03',
  '2023.01~04',
  '2023.01~05',
  '2023.01~06',
  '2023.01~07',
  '2023.01~08',
  '2023.01~10',
  '2023.01-12',
  '2023-01~2023-11',
  '2024.01-03',
  '2024.01-04',
  '2024.01-05',
  '2024.01-06',
  '2024.01-07',
  '2024.01-08',
  '2024.01-10',
  '2024.01-11',
  '2024.01-12',
  '2024.1-2',
  '2025.01-02',
  '2025.01-04'
])
const dateRed = ref('2025.01-04')
const redData = ref<RedRow[]>([])
const redLoading = ref(false)

const fetchRedData = async () => {
  redLoading.value = true
  try {
    const res: any = await getRentabilityAnalyseIndustry(dateRed.value)
    console.log('[rentabilityanalyseindustry] souseDate=', dateRed.value, 'res=', res)

    const body = res?.data ?? res

    const opts = body?.summary?.timeOptions
    if (Array.isArray(opts) && opts.length) {
      redDateOptions.value = opts
    }
    const souseDate = body?.summary?.souseDate
    if (souseDate && souseDate !== dateRed.value) {
      dateRed.value = souseDate
    }

    const list = body?.dataList
    redData.value = Array.isArray(list)
      ? list.map((it: any) => ({
          industry: String(it?.industry ?? ''),
          taking: toNum(it?.taking),
          speed: toNum(it?.speed)
        }))
      : []
  } catch (e) {
    console.error('数字经济与服务查询失败', e)
    redData.value = []
  } finally {
    redLoading.value = false
  }
}

const findRedByKeyword = (keywords: string[]): RedRow => {
  const hit = redData.value.find((r) => keywords.some((k) => r.industry.includes(k)))
  return hit ?? { industry: '', taking: 0, speed: 0 }
}

const internetService = computed(() => findRedByKeyword(['互联网']))
const softwareService = computed(() => findRedByKeyword(['软件']))

const serviceBarOption = computed(() => {
  const names = redData.value.map((r) => r.industry)
  const values = redData.value.map((r) => r.taking)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(4,24,48,0.85)',
      borderColor: '#26c9dd',
      textStyle: { color: '#fff' },
      formatter: (params: any) => {
        const p = params[0]
        const row = redData.value[p.dataIndex]
        return `${p.name}<br/>营业收入：${row?.taking ?? 0} 亿元<br/>增速：${row?.speed ?? 0} %`
      }
    },
    grid: {
      left: '3%',
      right: '6%',
      top: '6%',
      bottom: '4%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: '单位：亿元',
      nameTextStyle: { color: '#82d8e8' },
      splitLine: { lineStyle: { color: 'rgba(38,201,221,0.15)' } },
      axisLine: { show: false },
      axisLabel: { color: '#82d8e8', fontSize: 22 }
    },
    yAxis: {
      type: 'category',
      data: names,
      axisLine: { lineStyle: { color: '#287892' } },
      axisLabel: { color: '#82d8e8', fontSize: 22 }
    },
    series: [
      {
        name: '营业收入',
        type: 'bar',
        barWidth: '50%',
        data: values,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#086c94' },
              { offset: 1, color: '#26e2dd' }
            ]
          }
        }
      }
    ]
  }
})

/* =========================================================
   商品房交易情况（接口驱动）
   - 接口：/economicoperation/bigscreen/condo?souseDate=xxx&type=1|2
   - 返回：{ data: { moduleName, datalist: [{ departmentName, type,
             internalLevel, yoyGrowth }] } }
   - Tab：新房 → type=1；二手房 → type=2
   ========================================================= */
type HouseRow = {
  area: string
  internalLevel: number
  yoyGrowth: number
  type: string
}

const houseDateOptions = ref<string[]>([
  '1',
  '20180101-20181231',
  '2022.01~12',
  '2023.01~02',
  '2023.01~03',
  '2023.01~04',
  '2023.01~05',
  '2023.01~06',
  '2023.01~07',
  '2023.01~08',
  '2023.01-10',
  '2023.01~10',
  '2023.01~11',
  '2023.01-12',
  '2023.08',
  '2024.01~02',
  '2024.01-04',
  '2024.01-06',
  '2024.01-07',
  '2024.01-08',
  '2024.01-09',
  '2024.01-10',
  '2024.01-11',
  '2024.01-12',
  '2024.1-3',
  '2024.1-5',
  '2025.01-02',
  '2025.01-03',
  '2025.01-04',
  '2025-06-23'
])
const dateHouse = ref('2025.01-04')

const houseTabs = ['新房', '二手房']
const activeHouseTab = ref<(typeof houseTabs)[number]>(houseTabs[0])
const houseTypeMap: Record<string, string> = {
  新房: '1',
  二手房: '2'
}

const houseData = ref<HouseRow[]>([])
const houseLoading = ref(false)

const fetchHouseData = async () => {
  houseLoading.value = true
  try {
    const type = houseTypeMap[activeHouseTab.value] ?? '1'
    const res: any = await getCondo(dateHouse.value, type)
    console.log('[condo] souseDate=', dateHouse.value, 'type=', type, 'res=', res)

    const body = res?.data ?? res

    const opts = body?.summary?.timeOptions
    if (Array.isArray(opts) && opts.length) {
      houseDateOptions.value = opts
    }
    const souseDate = body?.summary?.souseDate
    if (souseDate && souseDate !== dateHouse.value) {
      dateHouse.value = souseDate
    }

    // 注意：字段名是 datalist（小写 L）
    const list = pickList(res)
    houseData.value = list.map((it: any) => ({
      area: String(it?.departmentName ?? ''),
      internalLevel: toNum(it?.internalLevel),
      yoyGrowth: toNum(it?.yoyGrowth),
      type: String(it?.type ?? type)
    }))
  } catch (e) {
    console.error('商品房交易情况查询失败', e)
    houseData.value = []
  } finally {
    houseLoading.value = false
  }
}

const switchHouseTab = (tab: string) => {
  if (activeHouseTab.value === tab) return
  activeHouseTab.value = tab
  fetchHouseData()
}

/* =========================================================
   初始化
   ========================================================= */
onMounted(() => {
  fetchMarketData()
  fetchPriceData()
  fetchWaterData()
  fetchHeatData()
  fetchRedData()
  fetchHouseData()
})
</script>

<style scoped>
.right {
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
}
.col {
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
}
.panel {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 72px 26px 22px;
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
}
.panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}
.panel-title {
  font-size: 34px;
  transform: skewX(-10deg);
  font-weight: 800;
  letter-spacing: 2px;
  margin-left: 26px;
  margin-top: -10px;
  color: #f8fbff;
  text-shadow:
    -2px -2px 3px rgba(255, 255, 255, 0.7),
    2px 2px 4px rgba(0, 20, 60, 0.5),
    0 0 6px #90c4ff,
    0 0 14px #3b8fff,
    0 0 24px #0f58d1;
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
  z-index: 2;
}
.market-panel {
  flex: 1;
  min-height: 0;
}
.market-metrics-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 14px;
  margin-bottom: 20px;
  margin-top: 40px;
}
.market-metrics-wrap .metric-item:nth-child(4) {
  grid-column: 1 / 2;
}
.market-metrics-wrap .metric-item:nth-child(5) {
  grid-column: 2 / 3;
}
.metric-item {
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: linear-gradient(90deg, rgba(14, 70, 134, 0.7), rgba(8, 42, 84, 0.5));
  border: 1px solid rgba(38, 201, 221, 0.35);
  border-radius: 4px;
  position: relative;
}
.metric-item::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-top: 2px solid #ffdd66;
  border-left: 2px solid #ffdd66;
}
.metric-item::after {
  content: '';
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  width: 6px;
  height: 6px;
  border-top: 2px solid #ffdd66;
  border-left: 2px solid #ffdd66;
}
.metric-label {
  font-size: 26px;
  color: #c6ecf8;
}
.metric-value {
  font-size: 30px;
  color: #ffffff;
  font-weight: bold;
}
.metric-value .unit {
  font-size: 20px;
  color: #82d8e8;
  margin-left: 4px;
}
.chart-wrap {
  width: 100%;
  height: calc(100% - 180px);
}
.panel--tower {
  flex: 1;
  min-height: 0;
  padding-top: 86px;
}
.price-table-wrap {
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
  margin-top: 150px;
  flex-direction: column;
  border: 1px solid rgba(84, 188, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
}
.price-table-header {
  display: grid;
  grid-template-columns: 1fr 1.4fr 1.4fr 1fr;
  background: linear-gradient(90deg, rgba(12, 70, 130, 0.7), rgba(8, 45, 90, 0.6));
}
.price-table-body {
  flex: 1;
  overflow-y: auto;
}
.price-table-row {
  display: grid;
  grid-template-columns: 1fr 1.4fr 1.4fr 1fr;
  border-bottom: 1px solid rgba(84, 188, 255, 0.12);
}
.price-cell {
  padding: 12px 10px;
  font-size: 30px;
  color: #e6f4ff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.price-up {
  color: #ff5555;
  text-shadow: 0 0 6px rgba(255, 60, 60, 0.35);
}
.price-down {
  color: #42e870;
  text-shadow: 0 0 6px rgba(40, 230, 90, 0.35);
}
.price-zero {
  color: #e6f4ff;
}
.red-panel-head {
  justify-content: space-between;
}
.panel-head--center {
  justify-content: center;
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
.panel--water {
  flex: 1;
  min-height: 0;
}
.water-chart {
  height: 100%;
  min-height: 0;
}
.panel--heat {
  flex: 1;
  min-height: 0;
}
.heat-chart {
  height: 100%;
  min-height: 0;
}
.panel--red {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.red-inner {
  flex: 1;
  min-height: 0;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
}
.red-top-item {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 54px 1fr auto;
  align-items: center;
  height: 74px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(18, 72, 140, 0.32), rgba(6, 18, 48, 0.18));
  box-shadow:
    inset 0 0 26px rgba(54, 232, 255, 0.06),
    0 0 20px rgba(0, 90, 210, 0.08);
  padding: 0 18px 0 14px;
  position: relative;
  overflow: hidden;
}
.red-top-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 96px;
  height: 100%;
  background: linear-gradient(90deg, rgba(54, 232, 255, 0.16), rgba(54, 232, 255, 0));
  clip-path: polygon(0 0, 82% 0, 62% 100%, 0 100%);
}
.red-top-item::after {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(84, 188, 255, 0.12);
  pointer-events: none;
}
.red-top-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  background: radial-gradient(circle at 35% 35%, rgba(54, 232, 255, 0.32), rgba(6, 18, 48, 0.18));
  box-shadow: 0 0 14px rgba(54, 232, 255, 0.12);
  z-index: 1;
  justify-self: center;
}
.red-top-label {
  min-width: 0;
  font-size: 34px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.92);
  letter-spacing: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.red-top-val {
  display: inline-flex;
  align-items: baseline;
  gap: 22px;
  font-size: 36px;
  font-weight: 900;
  color: rgba(255, 226, 74, 0.95);
  text-shadow: 0 0 14px rgba(255, 226, 74, 0.12);
}
.red-top-val span {
  font-size: 26px;
  font-weight: 900;
  color: rgba(124, 242, 255, 0.9);
  text-shadow: 0 0 12px rgba(54, 232, 255, 0.14);
  margin-left: 0;
}
.panel--aed {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 72px 26px 22px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  box-sizing: border-box;
}
.aed-chart {
  flex: 1;
  min-height: 0;
  position: relative;
  background:
    radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.06), rgba(6, 18, 48, 0.6)),
    repeating-linear-gradient(
      0deg,
      rgba(120, 220, 255, 0.06),
      rgba(120, 220, 255, 0.06) 1px,
      transparent 1px,
      transparent 24px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(120, 220, 255, 0.06),
      rgba(120, 220, 255, 0.06) 1px,
      transparent 1px,
      transparent 24px
    );
  border-radius: 12px;
  overflow: hidden;
}
</style>