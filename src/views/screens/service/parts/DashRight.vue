<template>
  <aside class="right">
    <div class="col">
      <section class="panel panel--gas">
        <div class="panel-head">
          <div class="panel-title">燃气</div>
          <select v-model="dateGas" class="panel-date-select">
            <option v-for="item in gasDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="panel-tabs">
          <button
            v-for="tab in gasTabs"
            :key="tab.type"
            type="button"
            class="tab"
            :class="{ 'tab--active': tab.type === activeGasTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="handleGasTabClick(tab.type)"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="gas-stage">
          <div class="gas-gauge">
            <EChart :key="`gas-${activeGasTab}-${dateGas}`" :option="gasOption" />
          </div>
          <div class="gas-icon"></div>
          <div
            v-for="item in gasMetrics"
            :key="item.label"
            class="gas-metric"
            :class="`gas-metric--${item.pos}`"
          >
            <div class="gas-metric-label">{{ item.label }}</div>
            <div class="gas-metric-value">
              <span class="gas-metric-num">{{ item.value }}</span>
              <span class="gas-metric-unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="panel panel--tower">
        <div class="panel-head">
          <div class="panel-title">通信铁塔建设情况</div>
          <select v-model="dateTower" class="panel-date-select" @change="fetchTowerData">
            <option v-for="item in towerDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="tower-kpi">
          <span class="tower-kpi-label">全市通信铁塔数量</span>
          <span class="tower-kpi-value">{{ towerTotal }}</span>
          <span class="tower-kpi-unit">个</span>
        </div>
        <div class="tower-body">
          <div class="tower-chart">
            <EChart :key="`tower-${dateTower}`" :option="towerOption" />
          </div>
          <div class="tower-legend">
            <div v-for="item in towerLegend" :key="item.label" class="tower-legend-row">
              <div class="tower-legend-label">{{ item.label }}</div>
              <div class="tower-legend-value">
                <span class="tower-legend-num">{{ item.num }}</span>
                <span class="tower-legend-unit">个</span>
              </div>
              <div class="tower-legend-rate">{{ item.rate }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="col">
      <section class="panel panel--water">
        <div class="panel-head">
          <div class="panel-title">用水</div>
          <select v-model="dateWater" class="panel-date-select">
            <option v-for="item in waterDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="water-filter">
          <select
            v-model="activeWaterType"
            class="panel-date-select water-type-select"
            @change="fetchWaterData"
          >
            <option v-for="item in waterTypes" :key="item.type" :value="item.type">
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="water-chart">
          <EChart :key="`water-${activeWaterType}-${dateWater}`" :option="waterOption" />
        </div>
      </section>

      <section class="panel panel--heat">
        <div class="panel-head">
          <div class="panel-title">供暖情况</div>
          <select v-model="dateHeat" class="panel-date-select" @change="fetchHeatData">
            <option v-for="item in heatDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="panel-tabs panel-tabs--center">
          <button
            v-for="tab in heatTabs"
            :key="tab.type"
            type="button"
            class="tab"
            :class="{ 'tab--active': tab.type === activeHeatTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="handleHeatTabClick(tab.type)"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="heat-list">
          <div v-for="row in heatList" :key="row.label" class="heat-row">
            <span class="heat-icon"></span>
            <span class="heat-label">{{ row.label }}</span>
            <span class="heat-value">{{ row.value }}</span>
            <span class="heat-unit">{{ row.unit }}</span>
          </div>
        </div>
      </section>
    </div>

    <div class="col">
      <section class="panel panel--red">
        <div class="panel-head red-panel-head">
          <div class="panel-title">红十字会</div>
          <select v-model="dateRed" class="panel-date-select" @change="fetchRedData">
            <option v-for="item in redDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="red-inner">
          <div class="red-top-item">
            <div class="red-top-icon"></div>
            <div class="red-top-label">{{ redTopItems[0].label }}</div>
            <div class="red-top-val">
              {{ redTopItems[0].value }}
              <span>{{ redTopItems[0].unit }}</span>
            </div>
          </div>
          <div class="red-top-item">
            <div class="red-top-icon"></div>
            <div class="red-top-label">{{ redTopItems[1].label }}</div>
            <div class="red-top-val">
              {{ redTopItems[1].value }}
              <span>{{ redTopItems[1].unit }}</span>
            </div>
          </div>

          <div class="red-card-wrap">
            <div v-for="card in redCards" :key="card.key" class="red-card">
              <div class="red-card-icon"></div>
              <div class="red-card-name">{{ card.label }}</div>
              <div class="red-card-num">
                {{ card.value }}
                <span>{{ card.unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="panel--aed">
        <div class="panel-head panel-head--center">
          <div class="panel-title">AED分布图</div>
        </div>
        <div class="aed-chart">
          <EChart :key="`aed-${aedList.length}`" :option="aedOption" />
        </div>
      </section>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import {
  getNaturalgas,
  getWaterboard,
  getCruciformsociety,
  getStationbuild,
  getHeatboard,
  getAedcondition
} from '@/api/service'
import EChart from '@/components/echarts/EChart.vue'
import tabBgUrl from '@/assets/img/tabBg.png'

// ============================================================
// 燃气（接口版）
// ============================================================
const gasTabs = [
  { type: 1, label: '煤气' },
  { type: 2, label: '天然气' }
] as const

const activeGasTab = ref<1 | 2>(1)

const gasDateOptions = ref<string[]>(['2022年统计数据', '2024至2025', '2025年'])
const dateGas = ref<string>('2025年')

const gasSummary = ref<Record<string, any>>({})

const handleGasTabClick = async (type: 1 | 2) => {
  if (activeGasTab.value === type) return
  activeGasTab.value = type
  await fetchGasData()
}

const fetchGasData = async () => {
  try {
    const res: any = await getNaturalgas({
      type: activeGasTab.value,
      souseDate: dateGas.value
    })
    const data = res?.dataList ?? []
    gasSummary.value = data[0] ?? {}

    const options: string[] = res?.summary?.timeOptions ?? []
    if (options.length) {
      gasDateOptions.value = options
      if (!options.includes(dateGas.value)) {
        dateGas.value = res?.summary?.souseDate ?? options[0]
      }
    }
  } catch (e) {
    console.error('燃气数据查询失败', e)
    gasSummary.value = {}
  }
}

watch(dateGas, () => {
  fetchGasData()
})

const gasMetrics = computed(() => {
  const s = gasSummary.value
  return [
    { pos: 'lt', label: '家庭用户', value: s.familyNum ?? '-', unit: '户' },
    { pos: 'rt', label: '供气总量', value: s.gasTotal ?? '-', unit: '万立方米' },
    { pos: 'lm', label: '用气人口', value: s.gasPopu ?? '-', unit: '万人' },
    { pos: 'rm', label: '家庭用量', value: s.familyNum ?? '-', unit: '万立方米' },
    { pos: 'lb', label: '管道长度', value: s.pipelineLength ?? '-', unit: '公里' },
    { pos: 'rb', label: '用户户数', value: s.houseNum ?? '-', unit: '户' }
  ]
})

const gasOption = computed(() => {
  const value = Number(gasSummary.value.gaugeValue) || 0
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'gauge',
        startAngle: 210,
        endAngle: -30,
        radius: '88%',
        center: ['50%', '52%'],
        progress: {
          show: true,
          width: 14,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: 'rgba(51, 213, 255, 0.18)' },
                { offset: 1, color: 'rgba(51, 213, 255, 0.95)' }
              ]
            }
          }
        },
        axisLine: { lineStyle: { width: 14, color: [[1, 'rgba(89, 194, 255, 0.12)']] } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        pointer: { show: false },
        detail: { show: false },
        data: [{ value }]
      },
      {
        type: 'pie',
        radius: ['76%', '78%'],
        center: ['50%', '52%'],
        silent: true,
        label: { show: false },
        data: [{ value: 100, itemStyle: { color: 'rgba(54, 232, 255, 0.12)' } }]
      },
      {
        type: 'pie',
        radius: ['64%', '66%'],
        center: ['50%', '52%'],
        silent: true,
        label: { show: false },
        data: [
          {
            value: 100,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: 'rgba(255, 226, 74, 0.15)' },
                  { offset: 1, color: 'rgba(255, 226, 74, 0.42)' }
                ]
              }
            }
          }
        ]
      }
    ]
  }
})

// ============================================================
// 用水（接口版）
// ============================================================
const waterDateOptions = ref<string[]>(['2022年统计数据'])
const dateWater = ref<string>('2022年统计数据')

const waterTypes = [
  { type: 1, label: '综合生产能力' },
  { type: 2, label: '供水能力' },
  { type: 3, label: '城区合计' }
]
const activeWaterType = ref<number>(waterTypes[0].type)

const waterList = ref<Array<{ areaName: string; num: string; typeName: string }>>([])

const fetchWaterData = async () => {
  try {
    const res: any = await getWaterboard({
      type: activeWaterType.value,
      souseDate: dateWater.value
    })

    waterList.value = res?.dataList ?? []

    const options: string[] = res?.summary?.timeOptions ?? []
    if (options.length) {
      waterDateOptions.value = options
      if (!options.includes(dateWater.value)) {
        dateWater.value = res?.summary?.souseDate ?? options[0]
      }
    }
  } catch (e) {
    console.error('用水数据查询失败', e)
    waterList.value = []
  }
}

watch(dateWater, () => {
  fetchWaterData()
})

const waterOption = computed(() => {
  const list = waterList.value
  const x = list.map((i) => i.areaName)
  const y = list.map((i) => Number(i.num) || 0)

  return {
    backgroundColor: 'transparent',
    tooltip: { show: true },
    grid: { left: 90, right: 26, top: 46, bottom: 30 },
    xAxis: {
      type: 'category',
      data: x,
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 24 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 24 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        type: 'bar',
        data: y,
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
              { offset: 1, color: 'rgba(51, 213, 255, 0.12)' }
            ]
          }
        },
        label: {
          show: true,
          position: 'top',
          color: 'rgba(240, 251, 255, 0.92)',
          fontSize: 22,
          fontWeight: 900
        }
      }
    ]
  }
})

// ============================================================
// 通信铁塔（接口版）
// ============================================================
const towerDateOptions = ref<string[]>(['2022年统计数据'])
const dateTower = ref<string>('2022年统计数据')

const towerTotal = ref<string>('-')
const towerLegend = ref<Array<{ label: string; num: string; rate: string }>>([])

const fetchTowerData = async () => {
  try {
    const res: any = await getStationbuild({
      souseDate: dateTower.value
    })

    const list: Array<{ label: string; num: string; rate: string }> = res?.dataList ?? []
    towerLegend.value = list
    towerTotal.value = res?.summary?.totalNum ?? '-'

    const options: string[] = res?.summary?.timeOptions ?? []
    if (options.length) {
      towerDateOptions.value = options
      if (!options.includes(dateTower.value)) {
        dateTower.value = res?.summary?.souseDate ?? options[0]
      }
    }
  } catch (e) {
    console.error('通信铁塔数据查询失败', e)
    towerLegend.value = []
    towerTotal.value = '-'
  }
}

const towerOption = computed(() => {
  const data = towerLegend.value.map((item) => ({
    name: item.label,
    value: Number(item.num) || 0
  }))
  return {
    backgroundColor: 'transparent',
    tooltip: { show: true },
    series: [
      {
        type: 'pie',
        radius: ['40%', '72%'],
        center: ['45%', '56%'],
        label: { show: false },
        itemStyle: { borderWidth: 2, borderColor: 'rgba(2, 10, 30, 0.9)' },
        data
      }
    ],
    color: ['#33d5ff', '#40f3b8', '#ffe24a']
  }
})

// ============================================================
// 供暖（接口版）
// ============================================================
const heatDateOptions = ref<string[]>(['2022年统计数据'])
const dateHeat = ref<string>('2022年统计数据')

const heatTabs = [
  { type: 1, label: '供暖能力' },
  { type: 2, label: '供暖组织' }
] as const

const activeHeatTab = ref<1 | 2>(1)

const heatList = ref<Array<{ label: string; value: string; unit: string }>>([])

const handleHeatTabClick = async (type: 1 | 2) => {
  if (activeHeatTab.value === type) return
  activeHeatTab.value = type
  await fetchHeatData()
}

const fetchHeatData = async () => {
  try {
    const res: any = await getHeatboard({
      type: activeHeatTab.value,
      souseDate: dateHeat.value
    })

    heatList.value = res?.dataList ?? []

    const options: string[] = res?.summary?.timeOptions ?? []
    if (options.length) {
      heatDateOptions.value = options
      if (!options.includes(dateHeat.value)) {
        dateHeat.value = res?.summary?.souseDate ?? options[0]
      }
    }
  } catch (e) {
    console.error('供暖数据查询失败', e)
    heatList.value = []
  }
}

watch(dateHeat, () => {
  fetchHeatData()
})

// ============================================================
// 红十字会（接口版）
// ============================================================
const redDateOptions = ref<string[]>(['2022年统计数据', '2023年度'])
const dateRed = ref<string>('2022年统计数据')

const redMap = ref<Record<string, string>>({})

const fetchRedData = async () => {
  try {
    const res: any = await getCruciformsociety({
      souseDate: dateRed.value
    })

    const list: Array<{ key: string; label: string; value: string }> = res?.dataList ?? []

    const map: Record<string, string> = {}
    list.forEach((item) => {
      if (item?.key) map[item.key] = item.value
    })
    redMap.value = map

    const options: string[] = res?.summary?.timeOptions ?? []
    if (options.length) {
      redDateOptions.value = options
      if (!options.includes(dateRed.value)) {
        dateRed.value = res?.summary?.souseDate ?? options[0]
      }
    }
  } catch (e) {
    console.error('红十字会数据查询失败', e)
    redMap.value = {}
  }
}

const redTopItems = computed(() => {
  const m = redMap.value
  return [
    { key: 'stemCellsNum', label: '造血干细胞捐献', value: m.stemCellsNum ?? '-', unit: '人' },
    {
      key: 'stemCellsCases',
      label: '捐献造血干细胞实际捐献',
      value: m.stemCellsCases ?? '-',
      unit: '例'
    }
  ]
})

const redCards = computed(() => {
  const m = redMap.value
  return [
    { key: 'remainsCases', label: '遗体捐献', value: m.remainsCases ?? '-', unit: '例' },
    {
      key: 'ocularTissueCases',
      label: '眼组织捐献',
      value: m.ocularTissueCases ?? '-',
      unit: '例'
    },
    { key: 'organCases', label: '器官捐献', value: m.organCases ?? '-', unit: '例' },
    { key: 'heparNum', label: '肝脏捐献', value: m.heparNum ?? '-', unit: '个' },
    { key: 'kidneyNum', label: '肾脏捐献', value: m.kidneyNum ?? '-', unit: '个' }
  ]
})

// ============================================================
// AED（接口版）
// ============================================================
type AedItem = {
  putPlace: string
  putTime: string
  contacts: string
  phone: string
  status: string
  lng: number
  lat: number
}

const aedList = ref<AedItem[]>([])

// 归一化经纬度：确保第一个是经度（~122-124），第二个是纬度（~40-42）
function normalizeLngLat(lng: number, lat: number): [number, number] {
  // 鞍山经度大约 122-124，纬度大约 40-42
  // 如果 lng 落在 40-42 且 lat 落在 122-124，说明写反了，交换
  if (lng > 40 && lng < 42 && lat > 122 && lat < 124) {
    return [lat, lng]
  }
  return [lng, lat]
}

const fetchAedData = async () => {
  try {
    const res: any = await getAedcondition()
    console.log('[aed] res=', res)

    const list: AedItem[] = res?.dataList ?? []

    // 归一化经纬度
    aedList.value = list.map((item) => {
      const [lng, lat] = normalizeLngLat(Number(item.lng), Number(item.lat))
      return { ...item, lng, lat }
    })
    console.log('[aed] normalized list=', aedList.value)
  } catch (e) {
    console.error('AED数据查询失败', e)
    aedList.value = []
  }
}

const aedOption = computed(() => {
  const points = aedList.value.map((item) => ({
    value: [item.lng, item.lat],
    name: item.putPlace,
    putTime: item.putTime,
    contacts: item.contacts,
    phone: item.phone,
    status: item.status
  }))

  return {
    backgroundColor: 'transparent',
    grid: { left: 30, right: 30, top: 20, bottom: 20 },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(6, 27, 72, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.4)',
      borderWidth: 1,
      textStyle: { color: '#eaf4ff', fontSize: 14 },
      formatter: (params: any) => {
        const d = params.data
        if (!d) return ''
        return `
          <div style="font-weight:900;margin-bottom:6px;">${d.name}</div>
          <div>联系人：${d.contacts}</div>
          <div>电话：${d.phone}</div>
          <div>投放时间：${d.putTime}</div>
          <div>状态：${d.status}</div>
        `
      }
    },
    xAxis: {
      type: 'value',
      min: 122.5,
      max: 123.3,
      show: false
    },
    yAxis: {
      type: 'value',
      min: 40.8,
      max: 41.3,
      show: false
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'cartesian2d',
        data: points,
        symbolSize: 12,
        itemStyle: {
          color: '#ff3b3b',
          shadowBlur: 14,
          shadowColor: 'rgba(255, 59, 59, 0.6)'
        },
        emphasis: {
          scale: 1.8
        }
      }
    ]
  }
})

// ============================================================
// 生命周期
// ============================================================
onMounted(() => {
  fetchGasData()
  fetchWaterData()
  fetchTowerData()
  fetchHeatData()
  fetchRedData()
  fetchAedData()
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

.panel-date-select {
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

.panel-date-select option {
  background-color: #0a1f4a;
  color: rgba(214, 238, 255, 0.92);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
}

.panel-date-select option:checked {
  background: linear-gradient(0deg, #1a4d8c 0%, #1a4d8c 100%);
  color: #fff;
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

.panel--gas {
  flex: 1;
  min-height: 0;
}

.gas-stage {
  position: absolute;
  inset: 0;
  padding: 128px 26px 26px;
  box-sizing: border-box;
}

.gas-gauge {
  position: absolute;
  left: 50%;
  top: 56%;
  width: 540px;
  height: 540px;
  transform: translate(-50%, -50%);
}

.gas-icon {
  position: absolute;
  left: 50%;
  top: 56%;
  width: 140px;
  height: 140px;
  transform: translate(-50%, -50%);
  border-radius: 70px;
  border: 1px solid rgba(84, 188, 255, 0.18);
  background: radial-gradient(circle at 50% 40%, rgba(54, 232, 255, 0.26), rgba(6, 18, 48, 0.25));
  box-shadow: 0 0 26px rgba(54, 232, 255, 0.14);
}

.gas-metric {
  position: absolute;
  width: 300px;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.32);
  padding: 14px 16px 12px;
  box-sizing: border-box;
  display: grid;
  gap: 14px;
}

.gas-metric-label {
  font-size: 28px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.78);
}

.gas-metric-value {
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
}

.gas-metric-num {
  font-size: 28px;
  font-weight: 900;
  color: rgba(255, 226, 74, 0.95);
  text-shadow: 0 0 14px rgba(255, 226, 74, 0.18);
}

.gas-metric-unit {
  font-size: 24px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}

.gas-metric--lt {
  left: 40px;
  top: 180px;
}
.gas-metric--rt {
  right: 40px;
  top: 180px;
}
.gas-metric--lm {
  left: 40px;
  top: 54%;
  transform: translateY(-50%);
}
.gas-metric--rm {
  right: 40px;
  top: 54%;
  transform: translateY(-50%);
}
.gas-metric--lb {
  left: 40px;
  bottom: 80px;
}
.gas-metric--rb {
  right: 40px;
  bottom: 80px;
}

.panel--tower {
  flex: 1;
  min-height: 0;
}

.tower-kpi {
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 36px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(214, 238, 255, 0.78);
}

.tower-kpi-value {
  font-size: 36px;
  color: rgba(255, 226, 74, 0.95);
  text-shadow: 0 0 12px rgba(255, 226, 74, 0.18);
}

.tower-kpi-unit {
  color: rgba(214, 238, 255, 0.62);
}

.tower-body {
  height: calc(100% - 54px);
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 14px;
  align-items: center;
}

.tower-chart {
  height: 100%;
  min-height: 0;
}

.tower-legend {
  display: grid;
  gap: 12px;
}

.tower-legend-row {
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.32);
  padding: 14px 14px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: baseline;
}

.tower-legend-label {
  font-size: 28px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.78);
}

.tower-legend-value {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
}

.tower-legend-num {
  font-size: 28px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}

.tower-legend-unit {
  font-size: 24px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}

.tower-legend-rate {
  font-size: 18px;
  font-weight: 900;
  color: rgba(255, 226, 74, 0.9);
  text-shadow: 0 0 12px rgba(255, 226, 74, 0.14);
}

.panel--water {
  flex: 1;
  min-height: 0;
}

.water-filter {
  position: absolute;
  top: 78px;
  right: 26px;
  z-index: 2;
}

.water-chart {
  height: 100%;
  min-height: 0;
}

.panel--heat {
  flex: 1;
  min-height: 0;
}

.heat-list {
  height: 100%;
  min-height: 0;
  display: grid;
  gap: 6px;
  margin-top: 90px;
  padding-bottom: 160px;
  box-sizing: border-box;
}

.heat-row {
  height: 92px;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.34);
  display: grid;
  grid-template-columns: 42px 1fr auto auto;
  gap: 14px;
  align-items: center;
  padding: 0 14px;
  box-sizing: border-box;
  color: rgba(214, 238, 255, 0.82);
  font-size: 18px;
  font-weight: 900;
}

.heat-icon {
  width: 28px;
  height: 28px;
  border-radius: 10px;
  border: 1px solid rgba(54, 232, 255, 0.18);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.2), rgba(6, 18, 48, 0.15));
}

.heat-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 34px;
}

.heat-value {
  font-size: 34px;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}

.heat-unit {
  font-size: 24px;
  color: rgba(214, 238, 255, 0.62);
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
  display: flex;
  align-items: center;
  height: 80px;
  border: 1px solid rgba(80, 160, 255, 0.3);
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(20, 80, 160, 0.4), rgba(10, 30, 60, 0.2));
  padding: 0 20px;
  position: relative;
}

.red-top-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  height: 100%;
  background: linear-gradient(90deg, rgba(40, 120, 220, 0.45), transparent);
  clip-path: polygon(0 0, 100% 0, 70% 100%, 0 100%);
}

.red-top-icon {
  width: 40px;
  height: 40px;
  z-index: 1;
  margin-right: 16px;
}

.red-top-label {
  flex: 1;
  font-size: 34px;
  color: #ffffff;
}

.red-top-val {
  font-size: 32px;
  color: #f9e784;
}

.red-top-val span {
  font-size: 24px;
  color: #fff;
  margin-left: 4px;
}

.red-card-wrap {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  align-content: stretch;
}

.red-card {
  position: relative;
  min-height: 140px;
  border: 1px solid rgba(80, 160, 255, 0.3);
  border-radius: 10px;
  background: rgba(12, 30, 60, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 24px;
}

.red-card-icon {
  position: absolute;
  top: -14px;
  width: 48px;
  height: 48px;
}

.red-card-name {
  font-size: 34px;
  color: #fff;
  text-align: center;
  margin-bottom: 12px;
}

.red-card-num {
  font-size: 34px;
  color: #f9e784;
}

.red-card-num span {
  font-size: 24px;
  color: #fff;
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
