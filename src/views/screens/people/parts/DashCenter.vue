<template>
  <div class="dash-center">
    <div class="wrap">
      <div class="space-grid"></div>
      <div class="top-metrics">
        <div class="top-metric">
          <div class="top-metric-label">总人口数</div>
          <div class="top-metric-value">
            <span class="num">{{ activeMetrics.totalPop }}</span>
            <span class="unit">万人</span>
          </div>
        </div>
        <div class="top-metric">
          <div class="top-metric-label">总户数</div>
          <div class="top-metric-value">
            <span class="num">{{ activeMetrics.households }}</span>
            <span class="unit">万户</span>
          </div>
        </div>
        <div class="top-metric">
          <div class="top-metric-label">机械增减人数</div>
          <div class="top-metric-value top-metric-value--small">
            <span class="num">{{ activeMetrics.mechanicalChange }}</span>
            <span class="unit">万人</span>
          </div>
        </div>
      </div>
      <div class="map-stage">
        <PeopleMap
          class="anshan-map"
          :data="mapSeriesData"
          :activeName="activeRegion === '全市' ? undefined : activeRegion"
          @region-change="handleRegionChange"
        />
        <div class="map-base-ring"></div>
        <div class="map-select-wrap">
          <el-select
            v-model="activeRegion"
            popper-class="map-select-popper"
            @change="handleSelectChange"
          >
            <el-option v-for="item in regionList" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
      </div>
      <section class="corner-panel corner-panel--lt">
        <div class="corner-title">性别构成</div>
        <div class="corner-chart">
          <EChart :option="genderOption" />
        </div>
      </section>
      <section class="corner-panel corner-panel--rt">
        <div class="corner-title">年龄构成</div>
        <div class="corner-chart">
          <EChart :option="ageOption" />
        </div>
      </section>
      <section class="corner-panel corner-panel--lb">
        <div class="corner-title">计划生育</div>
        <div class="corner-chart">
          <EChart :option="birthOption" />
        </div>
      </section>
      <section class="corner-panel corner-panel--rb">
        <div class="corner-title">机械变动情况</div>
        <div class="corner-chart">
          <EChart :option="moveOption" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import PeopleMap from '../charts/center.vue'
import { ElSelect, ElOption } from 'element-plus'
import { getSexStructure, getFamilyPlanning, getAgeStructure, getMobileChanges } from '@/api/people'

type RegionKey =
  '全市' | '海城市' | '台安县' | '岫岩满族自治县' | '铁东区' | '铁西区' | '立山区' | '千山区'

const REGION_ALIAS: Record<string, RegionKey> = {
  岫岩县: '岫岩满族自治县',
  岫岩满族自治县: '岫岩满族自治县',
  海城市: '海城市',
  台安县: '台安县',
  铁东区: '铁东区',
  铁西区: '铁西区',
  立山区: '立山区',
  千山区: '千山区'
}

const REGION_API_NAME: Record<RegionKey, string> = {
  全市: '鞍山市',
  海城市: '海城市',
  台安县: '台安县',
  岫岩满族自治县: '岫岩满族自治县',
  铁东区: '铁东区',
  铁西区: '铁西区',
  立山区: '立山区',
  千山区: '千山区'
}

const regionList: RegionKey[] = [
  '全市',
  '海城市',
  '台安县',
  '岫岩满族自治县',
  '铁东区',
  '铁西区',
  '立山区',
  '千山区'
]

// 只保留 topMetrics 的静态数据
const regionData: Record<
  RegionKey,
  {
    totalPop: string
    households: string
    mechanicalChange: string
    mapValue: number
  }
> = {
  全市: { totalPop: '333.44', households: '121.41', mechanicalChange: '-1.12', mapValue: 1260 },
  海城市: { totalPop: '92.10', households: '33.20', mechanicalChange: '-0.22', mapValue: 410 },
  台安县: { totalPop: '33.50', households: '12.30', mechanicalChange: '-0.10', mapValue: 256 },
  岫岩满族自治县: {
    totalPop: '50.20',
    households: '18.10',
    mechanicalChange: '-0.18',
    mapValue: 110
  },
  铁东区: { totalPop: '62.40', households: '22.30', mechanicalChange: '-0.12', mapValue: 3654 },
  铁西区: { totalPop: '58.10', households: '20.60', mechanicalChange: '-0.09', mapValue: 2103 },
  立山区: { totalPop: '46.20', households: '16.40', mechanicalChange: '-0.08', mapValue: 2552 },
  千山区: { totalPop: '42.70', households: '15.10', mechanicalChange: '-0.07', mapValue: 567 }
}

const activeRegion = ref<RegionKey>('全市')
const activeRegionLabel = computed(() => activeRegion.value)
const activeMetrics = computed(() => regionData[activeRegion.value])
const mapSeriesData = computed(() =>
  regionList.filter((n) => n !== '全市').map((name) => ({ name, value: regionData[name].mapValue }))
)

// ============================================================
// ⭐ 性别构成（接口版）
// ============================================================
const SEX_STRUCTURE_DATE = '2024年统计年鉴'
const genderData = ref<{ male: number; female: number }>({ male: 0, female: 0 })

const fetchSexStructure = async () => {
  try {
    const res: any = await getSexStructure({
      area: REGION_API_NAME[activeRegion.value],
      souseDate: SEX_STRUCTURE_DATE
    })
    const row = res?.data?.dataList?.[0] ?? res?.dataList?.[0] ?? {}
    genderData.value = {
      male: Number(row.men ?? 0),
      female: Number(row.women ?? 0)
    }
  } catch (e) {
    console.error('性别构成查询失败', e)
    genderData.value = { male: 0, female: 0 }
  }
}

// ============================================================
// ⭐ 年龄构成（接口版）
// ============================================================
const AGE_STRUCTURE_DATE = '2024年统计年鉴'
const ageData = ref({
  firstStage: 0,
  secondStage: 0,
  thirdStage: 0,
  fourthStage: 0
})

const fetchAgeStructure = async () => {
  try {
    const res: any = await getAgeStructure({
      area: REGION_API_NAME[activeRegion.value],
      souseDate: AGE_STRUCTURE_DATE
    })
    const row = res?.data?.dataList?.[0] ?? res?.dataList?.[0] ?? {}
    ageData.value = {
      firstStage: Number(row.firstStage ?? 0),
      secondStage: Number(row.secondStage ?? 0),
      thirdStage: Number(row.thirdStage ?? 0),
      fourthStage: Number(row.fourthStage ?? 0)
    }
  } catch (e) {
    console.error('年龄构成查询失败', e)
  }
}

// ============================================================
// ⭐ 计划生育（接口版）
// ============================================================
const FAMILY_PLANNING_DATE = '2024年统计年鉴'
const familyPlanning = ref({
  oneChildBoys: 0,
  oneChildGirls: 0,
  twoChildBoys: 0,
  twoChildGirls: 0,
  threeChildBoys: 0,
  threeChildGirls: 0,
  manyChildBoys: 0,
  manyChildGirls: 0
})

const fetchFamilyPlanning = async () => {
  try {
    const res: any = await getFamilyPlanning({
      area: REGION_API_NAME[activeRegion.value],
      souseDate: FAMILY_PLANNING_DATE
    })
    const row = res?.data?.dataList?.[0] ?? res?.dataList?.[0] ?? {}
    familyPlanning.value = {
      oneChildBoys: Number(row.oneChildBoys ?? 0),
      oneChildGirls: Number(row.oneChildGirls ?? 0),
      twoChildBoys: Number(row.twoChildBoys ?? 0),
      twoChildGirls: Number(row.twoChildGirls ?? 0),
      threeChildBoys: Number(row.threeChildBoys ?? 0),
      threeChildGirls: Number(row.threeChildGirls ?? 0),
      manyChildBoys: Number(row.manyChildBoys ?? 0),
      manyChildGirls: Number(row.manyChildGirls ?? 0)
    }
  } catch (e) {
    console.error('计划生育查询失败', e)
  }
}

// ============================================================
// ⭐ 机械变动（接口版）
// ============================================================
const MOBILE_CHANGES_DATE = '2024年统计年鉴'
const mobileData = ref({
  inProvinceMigra: 0,
  outProvinceMigra: 0,
  moveInProvince: 0,
  moveOutProvince: 0,
  fluctuateNum: 0
})

const fetchMobileChanges = async () => {
  try {
    const res: any = await getMobileChanges({
      area: REGION_API_NAME[activeRegion.value],
      souseDate: MOBILE_CHANGES_DATE
    })
    console.log('[mobilechanges] res=', res)
    const row = res?.data?.dataList?.[0] ?? res?.dataList?.[0] ?? {}
    mobileData.value = {
      inProvinceMigra: Number(row.inProvinceMigra ?? 0),
      outProvinceMigra: Number(row.outProvinceMigra ?? 0),
      moveInProvince: Number(row.moveInProvince ?? 0),
      moveOutProvince: Number(row.moveOutProvince ?? 0),
      fluctuateNum: Number(row.fluctuateNum ?? 0)
    }
  } catch (e) {
    console.error('机械变动查询失败', e)
  }
}

// ⭐ 区域变化时同时重新请求
watch(activeRegion, () => {
  fetchSexStructure()
  fetchAgeStructure()
  fetchFamilyPlanning()
  fetchMobileChanges()
})

onMounted(() => {
  fetchSexStructure()
  fetchAgeStructure()
  fetchFamilyPlanning()
  fetchMobileChanges()
})

// ============================================================
// 交互
// ============================================================
const handleRegionChange = (name: string) => {
  const hit = REGION_ALIAS[name]
  if (hit) activeRegion.value = hit
}
const handleSelectChange = (val: RegionKey) => {
  activeRegion.value = val
}

// ============================================================
// 图表 option
// ============================================================
const genderOption = computed(() => {
  const d = genderData.value
  const total = d.male + d.female
  const maleRate = total ? Math.round((d.male / total) * 10000) / 100 : 0
  const femaleRate = total ? Math.round((d.female / total) * 10000) / 100 : 0
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 154, right: 118, top: 18, bottom: 18 },
    xAxis: { type: 'value', show: false },
    yAxis: {
      type: 'category',
      data: ['男性', '女性'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(214, 238, 255, 0.75)', fontSize: 36, fontWeight: 800 }
    },
    series: [
      {
        type: 'bar',
        data: [
          {
            value: d.male,
            itemStyle: { color: '#63d8ff' },
            label: {
              show: true,
              position: 'right',
              formatter: `${d.male}万  ${maleRate}%`,
              color: 'rgba(240, 251, 255, 0.9)',
              fontWeight: 800
            }
          },
          {
            value: d.female,
            itemStyle: { color: '#ffe24a' },
            label: {
              show: true,
              position: 'right',
              formatter: `${d.female}万  ${femaleRate}%`,
              color: 'rgba(240, 251, 255, 0.9)',
              fontWeight: 800
            }
          }
        ],
        barWidth: 50,
        itemStyle: { borderRadius: 10 }
      }
    ]
  }
})

const ageOption = computed(() => {
  const d = ageData.value
  const list = [
    { name: '0-17岁', value: d.firstStage, color: '#63d8ff' },
    { name: '18-34岁', value: d.secondStage, color: '#ffe24a' },
    { name: '35-59岁', value: d.thirdStage, color: '#40f3b8' },
    { name: '60岁以上', value: d.fourthStage, color: '#ff9aa2' }
  ]
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'funnel',
        left: '18%',
        top: '10%',
        width: '64%',
        height: '80%',
        sort: 'descending',
        gap: 3,
        label: {
          show: true,
          color: 'rgba(240, 251, 255, 0.88)',
          fontSize: 26,
          formatter: '{b}  {c}'
        },
        labelLine: { show: false },
        itemStyle: { borderColor: 'rgba(2, 10, 30, 0.9)', borderWidth: 1 },
        data: list.map((i) => ({ name: i.name, value: i.value, itemStyle: { color: i.color } }))
      }
    ]
  }
})

const birthOption = computed(() => {
  const d = familyPlanning.value
  const categories = ['一孩', '二孩', '三孩', '多孩']
  const boys = [d.oneChildBoys, d.twoChildBoys, d.threeChildBoys, d.manyChildBoys]
  const girls = [d.oneChildGirls, d.twoChildGirls, d.threeChildGirls, d.manyChildGirls]

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    legend: {
      top: 0,
      right: 10,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.75)', fontSize: 22 }
    },
    grid: { left: 70, right: 18, top: 46, bottom: 30 },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: 'rgba(214, 238, 255, 0.75)', fontSize: 24 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.18)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 22 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '男',
        type: 'bar',
        data: boys,
        barWidth: 26,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#63d8ff' },
              { offset: 1, color: 'rgba(99, 216, 255, 0.3)' }
            ]
          }
        }
      },
      {
        name: '女',
        type: 'bar',
        data: girls,
        barWidth: 26,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#ffe24a' },
              { offset: 1, color: 'rgba(255, 226, 74, 0.3)' }
            ]
          }
        }
      }
    ]
  }
})

// ⭐ 机械变动：读接口数据
const moveOption = computed(() => {
  const d = mobileData.value
  const x = ['省内迁入', '省内迁出', '省外迁入', '省外迁出']
  const y = [d.moveInProvince, d.moveOutProvince, d.inProvinceMigra, d.outProvinceMigra]
  const colors = ['#40f3b8', '#ffe24a', '#63d8ff', '#ff7a7a']

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 90, right: 18, top: 22, bottom: 62 },
    xAxis: {
      type: 'category',
      data: x,
      axisLabel: { color: 'rgba(214, 238, 255, 0.75)', fontSize: 24, rotate: 18 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.18)' } },
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
        data: y.map((v, idx) => ({ value: v, itemStyle: { color: colors[idx] } })),
        barWidth: 46,
        itemStyle: { borderRadius: [10, 10, 0, 0] },
        label: {
          show: true,
          position: 'top',
          color: 'rgba(240, 251, 255, 0.9)',
          fontSize: 20,
          fontWeight: 800
        }
      }
    ]
  }
})
</script>

<style scoped>
.dash-center {
  width: 100%;
  height: 100%;
  position: relative;
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
.top-metrics {
  position: absolute;
  left: 50%;
  top: 24px;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  width: 1020px;
  z-index: 10;
}
.top-metric {
  height: 64px;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.18);
  background: linear-gradient(90deg, rgba(16, 66, 130, 0.22), rgba(6, 18, 48, 0.45));
  box-shadow: inset 0 0 22px rgba(54, 232, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
.top-metric::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}
.top-metric-label {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.78);
  letter-spacing: 1px;
  z-index: 1;
}
.top-metric-value {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  z-index: 1;
}
.top-metric-value--small .num {
  font-size: 26px;
}
.top-metric-value .num {
  font-size: 30px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.95);
  text-shadow: 0 0 12px rgba(54, 232, 255, 0.18);
}
.top-metric-value .unit {
  font-size: 14px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.55);
}
.map-stage {
  position: absolute;
  left: 50%;
  top: 54%;
  transform: translate(-50%, -50%);
  width: 1800px;
  height: 1280px;
  z-index: 5;
}
.map-select-wrap {
  position: absolute;
  right: 30px;
  top: -120px;
  z-index: 20;
  width: 220px;
}
.anshan-map {
  position: absolute;
  left: 50%;
  top: 34%;
  transform: translate(-50%, -50%);
  width: 2300px;
  height: 1580px;
  z-index: 5;
}
.map-base-ring {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  width: 1200px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(30, 160, 255, 0.18), transparent 72%);
  border-top: 3px solid rgba(78, 184, 255, 0.35);
  z-index: 2;
  pointer-events: none;
}
.corner-panel {
  position: absolute;
  width: 820px;
  height: 820px;
  border-radius: 16px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  background: linear-gradient(180deg, rgba(6, 27, 72, 0.55), rgba(4, 16, 44, 0.55));
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  overflow: hidden;
  padding: 18px 18px 12px;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 36px 1fr;
  gap: 10px;
  z-index: 12;
}
.corner-panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}
.corner-title {
  font-size: 36px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgba(240, 251, 255, 0.9);
  text-shadow: 0 0 10px rgba(54, 232, 255, 0.14);
  display: flex;
  align-items: center;
  z-index: 1;
}
.corner-chart {
  min-height: 0;
  z-index: 1;
}
.corner-panel--lt {
  left: 36px;
  top: 116px;
}
.corner-panel--rt {
  right: 36px;
  top: 116px;
}
.corner-panel--lb {
  left: 36px;
  bottom: 52px;
}
.corner-panel--rb {
  right: 36px;
  bottom: 52px;
}
</style>

<style>
/* 全局覆盖 el-select 样式，与 panel-date 时间下拉保持一致 */
.map-select-wrap .el-select {
  width: 100%;
}
.map-select-wrap .el-select__wrapper {
  height: 36px;
  min-height: 36px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(78, 184, 255, 0.22);
  background: rgba(5, 26, 66, 0.45);
  color: rgba(209, 234, 255, 0.86);
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 1px;
  box-shadow: none !important;
  cursor: pointer;
  transition: border-color 0.2s;
}
.map-select-wrap .el-select__wrapper:hover {
  border-color: rgba(78, 184, 255, 0.5);
}
.map-select-wrap .el-select__wrapper.is-focused {
  box-shadow: none !important;
  border-color: rgba(78, 184, 255, 0.6);
}
.map-select-wrap .el-select__placeholder,
.map-select-wrap .el-select__selected-item {
  color: rgba(209, 234, 255, 0.86) !important;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 1px;
}
.map-select-wrap .el-select__caret {
  color: rgba(209, 234, 255, 0.65);
}

.map-select-popper {
  background: #0a1f4a !important;
  border: 1px solid rgba(78, 184, 255, 0.3) !important;
  border-radius: 8px;
  box-shadow: 0 4px 18px rgba(0, 40, 100, 0.4);
}
.map-select-popper .el-select-dropdown__list {
  padding: 6px 4px;
}
.map-select-popper .el-select-dropdown__item {
  color: rgba(214, 238, 255, 0.9);
  font-size: 15px;
  font-weight: 700;
  border-radius: 6px;
  margin: 2px 4px;
}
.map-select-popper .el-select-dropdown__item.is-hovering {
  background: rgba(30, 90, 180, 0.4);
  color: #fff;
}
.map-select-popper .el-select-dropdown__item.is-selected {
  background: linear-gradient(0deg, #1a4d8c 0%, #1a4d8c 100%);
  color: #fff;
  font-weight: 800;
}
.map-select-popper .el-select-dropdown__empty,
.map-select-popper .el-select-dropdown__loading {
  color: rgba(214, 238, 255, 0.6);
}
</style>
