<template>
  <div class="center-shell">
    <div class="main">
      <!-- 左侧面板：双公示（接口驱动） -->
      <section class="panel panel--left">
        <div class="panel-title">双公示</div>
        <div class="left-block-wrap">
          <div class="left-stat-list">
            <div
              v-for="(item, index) in announcementList"
              :key="`${item.key}-${index}`"
              class="left-stat-item"
            >
              <div class="left-stat-icon"></div>
              <div class="left-stat-name">{{ item.label }}</div>
              <div class="left-stat-val">
                {{ item.value }}<span class="unit">{{ item.unit }}</span>
              </div>
            </div>

            <div v-if="announcementLoading" class="left-stat-empty">加载中…</div>
            <div v-else-if="!announcementList.length" class="left-stat-empty">暂无数据</div>
          </div>
        </div>
      </section>

      <section class="panel panel--map">
        <!--地图上方悬浮小卡片：三个指标改为接口驱动（用 summary 的值）-->
        <div class="map-top-cards">
          <div class="map-card-group"></div>
          <div class="map-card-group map-card-group--center">
            <div class="map-card">
              <div class="map-card-label">本年办件量</div>
              <div class="map-card-num">{{ fileSummary.yearTotal }}件</div>
            </div>
            <div class="map-card">
              <div class="map-card-label">本月办件量</div>
              <div class="map-card-num">{{ fileSummary.moonTotal }}件</div>
            </div>
            <div class="map-card">
              <div class="map-card-label">今日办件量</div>
              <div class="map-card-num">{{ fileSummary.dayTotal }}件</div>
            </div>
          </div>
          <div class="map-card-group"></div>
        </div>
        <div class="map-stage">
          <div class="map-box">
            <CityMapChart :rows="gridInfoRows" :active-name="selectedAreaName" />
          </div>
          <div class="map-base">
            <div class="map-ring map-ring--a"></div>
            <div class="map-ring map-ring--b"></div>
            <div class="map-ring map-ring--c"></div>
          </div>
        </div>
      </section>

      <!-- 右侧面板：各地区各类办件数量统计（接口驱动） -->
      <section class="panel panel--right">
        <div class="panel-title">各地区各类办件数量统计</div>
        <div class="right-block-wrap">
          <div class="region-table">
            <div class="region-table-head">
              <span>地区</span>
              <span>办件数</span>
              <span>即办件数</span>
              <span>承诺件数</span>
            </div>
            <div class="region-table-row" v-for="(item, idx) in regionTableData" :key="idx">
              <span>{{ item.area }}</span>
              <span>{{ item.total }}</span>
              <span>{{ item.immediate }}</span>
              <span>{{ item.promise }}</span>
            </div>

            <div v-if="regionLoading" class="region-empty">加载中…</div>
            <div v-else-if="!regionTableData.length" class="region-empty">暂无数据</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CityMapChart from '../charts/CityMapChart.vue'
import type { GridInfoRow } from '../types'
import { getAnnouncement, getFileCity, getFile } from '@/api/business'

const selectedAreaName = ref('铁东区')
const gridInfoRows: GridInfoRow[] = [
  { name: '铁东区', town: 0, village: 0, grid: 12 },
  { name: '铁西区', town: 0, village: 0, grid: 16 },
  { name: '立山区', town: 0, village: 0, grid: 10 },
  { name: '高新区', town: 0, village: 0, grid: 8 },
  { name: '风景区', town: 0, village: 0, grid: 6 },
  { name: '台安县', town: 0, village: 0, grid: 9 },
  { name: '海城市', town: 0, village: 0, grid: 14 },
  { name: '岫岩县', town: 0, village: 0, grid: 7 }
]

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

/* =========================================================
   1. 双公示（接口驱动）
   ========================================================= */

type AnnouncementItem = {
  key: string
  label: string
  value: string
  unit: string
}

const getUnitByKey = (key: string) => {
  if (key.toLowerCase().includes('blacklist')) return '家'
  return '条'
}

const announcementList = ref<AnnouncementItem[]>([])
const announcementLoading = ref(false)

const fetchAnnouncement = async () => {
  announcementLoading.value = true
  try {
    const res: any = await getAnnouncement()
    console.log('[announcement] res=', res)

    const list = pickList(res)
    announcementList.value = list.map((it: any) => {
      const key = String(it?.key ?? '')
      return {
        key,
        label: String(it?.label ?? ''),
        value: String(it?.value ?? ''),
        unit: getUnitByKey(key)
      }
    })
  } catch (e) {
    console.error('双公示查询失败', e)
    announcementList.value = []
  } finally {
    announcementLoading.value = false
  }
}

/* =========================================================
   2. 地图上方悬浮卡片：本年 / 本月 / 今日办件量（接口驱动）
   - 接口：/businessenvironment/bigscreen/file
   - summary: { yearTotal, moonTotal, dayTotal }
   ========================================================= */

type FileSummary = {
  yearTotal: string
  moonTotal: string
  dayTotal: string
}

const fileSummary = ref<FileSummary>({
  yearTotal: '0',
  moonTotal: '0',
  dayTotal: '0'
})

const fetchFile = async () => {
  try {
    const res: any = await getFile()
    console.log('[file] res=', res)

    const summary = pickSummary(res)
    fileSummary.value = {
      yearTotal: String(summary?.yearTotal ?? '0'),
      moonTotal: String(summary?.moonTotal ?? '0'),
      dayTotal: String(summary?.dayTotal ?? '0')
    }
  } catch (e) {
    console.error('办件量查询失败', e)
    fileSummary.value = { yearTotal: '0', moonTotal: '0', dayTotal: '0' }
  }
}

/* =========================================================
   3. 各地区各类办件数量统计（接口驱动）
   ========================================================= */

type RegionRow = {
  area: string
  total: number
  immediate: number
  promise: number
}

const regionTableData = ref<RegionRow[]>([])
const regionLoading = ref(false)

const fetchFileCity = async () => {
  regionLoading.value = true
  try {
    const res: any = await getFileCity()
    console.log('[filecity] res=', res)

    const list = pickList(res)
    regionTableData.value = list.map((it: any) => ({
      area: String(it?.cityName ?? ''),
      total: Number(it?.fileNum ?? 0),
      immediate: Number(it?.instantServiceNum ?? 0),
      promise: Number(it?.promiseNum ?? 0)
    }))
  } catch (e) {
    console.error('各地区各类办件查询失败', e)
    regionTableData.value = []
  } finally {
    regionLoading.value = false
  }
}

/* =========================================================
   初始化
   ========================================================= */

onMounted(() => {
  fetchAnnouncement()
  fetchFile()
  fetchFileCity()
})
</script>

<style scoped>
.center-shell {
  width: 100%;
  height: 100%;
  min-height: 0;
}
.main {
  min-height: 0;
  display: grid;
  grid-template-columns: 520px minmax(1px, 1fr) 520px;
  grid-template-rows: minmax(1px, 1fr);
  gap: 20px;
  width: 100%;
  height: 100%;
}
.panel {
  position: relative;
  overflow: hidden;
  color: rgba(214, 238, 255, 0.86);
  box-sizing: border-box;
  min-height: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.panel-title {
  position: absolute;
  left: 24px;
  top: 32px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  font-size: 26px;
  transform: skewX(-12deg);
  font-weight: 700;
  letter-spacing: 1px;
  color: #ffffff;
  z-index: 2;
}
.panel--map {
  padding: 0;
  position: relative;
  background: transparent;
  border: none;
}
.map-stage {
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 0;
}
.map-box {
  position: absolute;
  inset: 0;
  z-index: 2;
}

/* =========地图上方悬浮卡片========= */
.map-top-cards {
  position: absolute;
  top: 24px;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
}
.map-card-group {
  display: grid;
  gap: 12px;
}
.map-card-group--center {
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: center;
}
.map-card {
  min-width: 240px;
  padding: 8px 14px;
  background: rgba(8, 24, 60, 0.65);
  border: 1px solid rgba(80, 170, 255, 0.25);
  border-radius: 6px;
}
.map-card-label {
  font-size: 16px;
  color: #82c8ff;
  text-align: center;
}
.map-card-num {
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  text-align: center;
}

/* ----------------左侧双公示面板---------------- */
.panel--left {
  padding: 70px 24px 24px;
  transform: perspective(1600px) rotateY(16deg);
  transform-origin: right center;
  backface-visibility: hidden;
  background: linear-gradient(180deg, rgba(14, 42, 92, 0.6), rgba(8, 22, 54, 0.45));
  border: 1px solid rgba(74, 174, 255, 0.24);
  clip-path: polygon(0 0, 100px 0, 100% 30px, 100% 100%, 0 calc(100% - 30px));
}
.left-block-wrap {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: hidden;
  margin-top: 40px;
}
.left-stat-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.left-stat-item {
  display: grid;
  grid-template-columns: 48px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: rgba(12, 32, 68, 0.48);
  border: 1px solid rgba(78, 172, 255, 0.22);
  border-radius: 8px;
}
.left-stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid rgba(80, 180, 255, 0.24);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.2), transparent);
}
.left-stat-name {
  font-size: 34px;
  color: #e2f2ff;
}
.left-stat-val {
  font-size: 34px;
  font-weight: bold;
  color: #ffdd66;
}
.unit {
  font-size: 34px;
  margin-left: 4px;
  color: #82c8ff;
}

.left-stat-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  font-size: 26px;
  color: rgba(214, 238, 255, 0.5);
}

/* ----------------右侧表格面板---------------- */
.panel--right {
  padding: 70px 24px 24px;
  transform: perspective(1600px) rotateY(-16deg);
  transform-origin: left center;
  backface-visibility: hidden;
  background: linear-gradient(180deg, rgba(14, 42, 92, 0.6), rgba(8, 22, 54, 0.45));
  border: 1px solid rgba(74, 174, 255, 0.24);
  clip-path: polygon(100px 0, 100% 0, 100% calc(100% - 30px), 0 100%, 0 30px);
}
.right-block-wrap {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 40px;
}
.region-table {
  border: 1px solid rgba(80, 170, 255, 0.18);
  border-radius: 8px;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
}
.region-table-head {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 10px 12px;
  background: rgba(14, 40, 85, 0.5);
  font-size: 26px;
  color: #82c8ff;
  font-weight: 500;
}
.region-table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 9px 12px;
  font-size: 26px;
  color: rgba(214, 238, 255, 0.82);
  border-bottom: 1px solid rgba(84, 188, 255, 0.1);
}
.region-table-row:last-child {
  border-bottom: none;
}

.region-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  font-size: 26px;
  color: rgba(214, 238, 255, 0.5);
}

.map-base {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 60px;
  height: 220px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.map-ring {
  position: absolute;
  border-radius: 999px;
  border: 2px solid rgba(54, 232, 255, 0.18);
}
.map-ring--a {
  width: 460px;
  height: 460px;
}
.map-ring--b {
  width: 370px;
  height: 370px;
}
.map-ring--c {
  width: 280px;
  height: 280px;
}
</style>
