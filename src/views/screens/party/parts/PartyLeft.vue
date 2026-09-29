<template>
  <div class="left-wrap">
    <h3 class="org-title" :style="getPointStyle(layout.orgTitle)">{{ data.orgTitle }}</h3>
    <div class="org-total" :style="getPointStyle(layout.orgTotal)">
      合计：<strong>{{ data.orgTotal }}</strong> 个
    </div>

    <button
      type="button"
      class="chip"
      :class="{ 'chip--active': orgTab === 'city' }"
      :style="getRectStyle(layout.cityTab)"
      @click="switchOrgTab('city')"
    >
      全市
    </button>
    <button
      type="button"
      class="chip"
      :class="{ 'chip--active': orgTab === 'district' }"
      :style="getRectStyle(layout.districtTab)"
      @click="switchOrgTab('district')"
    >
      地区
    </button>

    <!-- 列表滚动容器：一屏 5 条，超出滚动 -->
    <div ref="orgListEl" class="org-list" :style="getRectStyle(layout.orgList)">
      <div
        v-for="(item, index) in orgList"
        :key="`${orgTab}-${item.label}-${index}`"
        class="org-item"
      >
        {{ item.label }}
        <span v-if="item.value" class="org-item__value">{{ item.value }}</span>
      </div>

      <div v-if="!orgList.length" class="org-empty">
        {{ loading ? '加载中…' : '暂无数据' }}
      </div>
    </div>

    <h3 class="stars-title" :style="getPointStyle(layout.starsTitle)">{{ data.starsTitle }}</h3>
    <button
      type="button"
      class="chip2"
      :class="{ 'chip--active': starsTab === 'city' }"
      :style="getRectStyle(layout.starsCityTab)"
      @click="switchStarsTab('city')"
    >
      全市
    </button>
    <button
      type="button"
      class="chip2"
      :class="{ 'chip--active': starsTab === 'district' }"
      :style="getRectStyle(layout.starsDistrictTab)"
      @click="switchStarsTab('district')"
    >
      地区
    </button>
    <div class="stars-total" :style="getPointStyle(layout.starsTotal)">
      合计：<strong>{{ starsTotal }}</strong> 个
    </div>

    <div
      v-for="(item, index) in starRows"
      :key="`${starsTab}-${item.label}`"
      class="star-row"
      :style="getStarRowStyle(index)"
    >
      <div class="star-dot"></div>
      <div class="star-icons">
        <span v-for="n in item.stars" :key="n" class="star">★</span>
      </div>
      <div class="star-info">
        <span class="star-label">{{ item.label }}</span>
        <span class="star-value">{{ item.value }}</span>
        <span class="star-rate">{{ item.rate }}</span>
      </div>
    </div>

    <div class="panel-structure">
      <div class="panel-structure__inner">
        <PartyStructure :data="data.structurePanel" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PartyStructure from './PartyStructure.vue'
import type { PartyLeftData } from '../data'
import {
  getExcellentBranch,
  getExcellentBranchInfo,
  getStarBranch,
  getStarBranchInfo
} from '@/api/party'
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps<{
  data: PartyLeftData
}>()

type Point = {
  left: number
  top: number
}

type Rect = Point & {
  width: number
  height: number
}

type OrgTab = 'city' | 'district'
type StarsTab = 'city' | 'district'

type OrgRow = {
  label: string
  value?: string
}

type StarRow = {
  label: string
  value: string
  rate: string
  stars: number
}

// 列表尺寸常量：单条高度 + 行间距 → 决定容器高度
const ORG_ITEM_HEIGHT = 84
const ORG_ITEM_GAP = 40
const ORG_ITEM_PADDING_TOP = 30
const ORG_VISIBLE_COUNT = 5

// 容器高度 = 顶部内边距 + 5 条高度 + 4 个间距
// = 30 + 5 * 84 + 4 * 40 = 610
const ORG_LIST_HEIGHT =
  ORG_ITEM_PADDING_TOP +
  ORG_VISIBLE_COUNT * ORG_ITEM_HEIGHT +
  (ORG_VISIBLE_COUNT - 1) * ORG_ITEM_GAP

const layout = {
  orgTitle: { left: 172, top: 190 },
  orgTotal: { left: 1018, top: 200 },
  cityTab: { left: 308, top: 286, width: 296, height: 46 },
  districtTab: { left: 692, top: 286, width: 296, height: 46 },
  orgList: { left: 126, top: 386, width: 1028, height: ORG_LIST_HEIGHT },
  starsTitle: { left: 34, top: 1156 },
  starsCityTab: { left: 96, top: 1266, width: 190, height: 44 },
  starsDistrictTab: { left: 382, top: 1266, width: 190, height: 44 },
  starsTotal: { left: 266, top: 1350 },
  starRows: { left: 26, top: 1450, width: 1048, height: 58, stepY: 92 }
} as const

const getPointStyle = (point: Point) => ({
  left: `${point.left}px`,
  top: `${point.top}px`,
  fontStyle: 'italic'
})

const getRectStyle = (rect: Rect) => ({
  left: `${rect.left}px`,
  top: `${rect.top}px`,
  width: `${rect.width}px`,
  height: `${rect.height}px`
})

const getStarRowStyle = (index: number) =>
  getRectStyle({
    left: layout.starRows.left,
    top: layout.starRows.top + index * layout.starRows.stepY,
    width: layout.starRows.width,
    height: layout.starRows.height
  })

/**
 * 兼容两种返回结构：
 * 1) { code, msg, data: { moduleName, dataList } }
 * 2) { moduleName, dataList }
 */
const pickList = (res: any): any[] => {
  const body = res?.data ?? res
  if (Array.isArray(body?.dataList)) return body.dataList
  if (Array.isArray(body?.data?.dataList)) return body.data.dataList
  return []
}

/* ============ 先进基层党组织 Tab ============ */

const orgTab = ref<OrgTab>('city')
const orgList = ref<OrgRow[]>([])
const orgListEl = ref<HTMLElement | null>(null)
const loading = ref(false)

const orgCache: Record<OrgTab, OrgRow[] | null> = {
  city: null,
  district: null
}

const loadCity = async () => {
  loading.value = true
  try {
    const list = pickList(await getExcellentBranch())
    const rows: OrgRow[] = list.map((it: any) => ({
      label: it.branchName || it.companyName || ''
    }))
    orgCache.city = rows
    orgList.value = rows
  } catch (err) {
    console.error('[getExcellentBranch] 请求失败', err)
    orgList.value = []
  } finally {
    loading.value = false
  }
}

const loadDistrict = async () => {
  loading.value = true
  try {
    const list = pickList(await getExcellentBranchInfo())
    const rows: OrgRow[] = list.map((it: any) => ({
      label: it.areaName || '',
      value: it.num ? `${it.num}个` : ''
    }))
    orgCache.district = rows
    orgList.value = rows
  } catch (err) {
    console.error('[getExcellentBranchInfo] 请求失败', err)
    orgList.value = []
  } finally {
    loading.value = false
  }
}

const switchOrgTab = async (tab: OrgTab) => {
  if (orgTab.value === tab) return
  orgTab.value = tab

  if (orgCache[tab]) {
    orgList.value = orgCache[tab]!
  } else {
    await (tab === 'city' ? loadCity() : loadDistrict())
  }

  // 切换后滚动回顶部
  await nextTick()
  orgListEl.value?.scrollTo({ top: 0 })
}

/* ============ 星级党支部 Tab ============ */

const starsTab = ref<StarsTab>('city')
const starRows = ref<StarRow[]>([])
const starsTotal = ref<string>(props.data?.starsTotal ?? '0')
const starsLoading = ref(false)

const starsCache: Record<StarsTab, { rows: StarRow[]; total: string } | null> = {
  city: null,
  district: null
}

/**
 * 全市：单条记录，含 oneTotal / twoTotal / threeTotal / total / xRate
 * → 直接映射成 3 行
 */
const loadStarsCity = async () => {
  starsLoading.value = true
  try {
    const list = pickList(await getStarBranchInfo())
    const row = list[0] || {}
    const total = Number(row.total ?? 0)

    const rows: StarRow[] = [
      {
        label: '三星党支部总数',
        value: `${row.threeTotal ?? 0}个`,
        rate: row.threeRate || '0%',
        stars: 3
      },
      {
        label: '二星党支部总数',
        value: `${row.twoTotal ?? 0}个`,
        rate: row.twoRate || '0%',
        stars: 2
      },
      {
        label: '一星党支部总数',
        value: `${row.oneTotal ?? 0}个`,
        rate: row.oneRate || '0%',
        stars: 1
      }
    ]

    starsCache.city = { rows, total: String(total) }
    starRows.value = rows
    starsTotal.value = String(total)
  } catch (err) {
    console.error('[getStarBranchInfo] 请求失败', err)
    starRows.value = []
    starsTotal.value = '0'
  } finally {
    starsLoading.value = false
  }
}

/**
 * 地区：多条记录，每条含 oneNum / twoNum / threeNum
 * → 汇总各星级数量，再重新计算占比
 */
const loadStarsDistrict = async () => {
  starsLoading.value = true
  try {
    const list = pickList(await getStarBranch())

    let oneSum = 0
    let twoSum = 0
    let threeSum = 0

    list.forEach((it: any) => {
      oneSum += Number(it.oneNum ?? 0)
      twoSum += Number(it.twoNum ?? 0)
      threeSum += Number(it.threeNum ?? 0)
    })

    const total = oneSum + twoSum + threeSum
    const pct = (n: number) => (total > 0 ? `${((n / total) * 100).toFixed(2)}%` : '0%')

    const rows: StarRow[] = [
      { label: '三星党支部总数', value: `${threeSum}个`, rate: pct(threeSum), stars: 3 },
      { label: '二星党支部总数', value: `${twoSum}个`, rate: pct(twoSum), stars: 2 },
      { label: '一星党支部总数', value: `${oneSum}个`, rate: pct(oneSum), stars: 1 }
    ]

    starsCache.district = { rows, total: String(total) }
    starRows.value = rows
    starsTotal.value = String(total)
  } catch (err) {
    console.error('[getStarBranch] 请求失败', err)
    starRows.value = []
    starsTotal.value = '0'
  } finally {
    starsLoading.value = false
  }
}

const switchStarsTab = async (tab: StarsTab) => {
  if (starsTab.value === tab) return
  starsTab.value = tab

  const cached = starsCache[tab]
  if (cached) {
    starRows.value = cached.rows
    starsTotal.value = cached.total
    return
  }
  await (tab === 'city' ? loadStarsCity() : loadStarsDistrict())
}

/* ============ 初始化 ============ */

onMounted(() => {
  loadCity()
  loadStarsCity()
})
</script>

<style scoped>
.left-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  color: #ffe4a5;
}

.org-title {
  position: absolute;
  margin: 0;
  font-weight: 700;
  letter-spacing: 2px;
  color: #ffefc8;
  text-shadow: 0 0 8px rgba(255, 196, 112, 0.16);
  font-size: 40px;
}

.stars-title {
  position: absolute;
  margin: 0;
  font-weight: 700;
  letter-spacing: 2px;
  color: #ffefc8;
  text-shadow: 0 0 8px rgba(255, 196, 112, 0.16);
  margin-top: 10px;
  margin-left: 130px;
  font-size: 40px;
}

.org-total {
  position: absolute;
  font-size: 30px;
  color: #ffbf58;
  white-space: nowrap;
}

.stars-total {
  position: absolute;
  font-size: 30px;
  margin-left: 250px;
  margin-top: 50px;
  color: #ffbf58;
  white-space: nowrap;
}

.org-total strong,
.stars-total strong {
  margin: 0 6px;
  font-size: 28px;
  color: #ffd465;
}

/* ---------- Tab 按钮 ---------- */

.chip,
.chip2 {
  position: absolute;
  border: none;
  border-radius: 22px;
  color: #fff1cb;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(180deg, rgba(255, 201, 93, 0.52), rgba(255, 145, 31, 0.18));
  box-shadow:
    inset 0 1px 0 rgba(255, 241, 190, 0.42),
    inset 0 0 0 1px rgba(255, 211, 122, 0.34),
    0 0 10px rgba(255, 170, 52, 0.1);
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    filter 0.2s ease;
}

.chip2 {
  margin-left: 300px;
  margin-top: 30px;
}

.chip--active {
  color: #fff8dd;
  filter: brightness(1.12);
  box-shadow:
    inset 0 1px 0 rgba(255, 248, 218, 0.65),
    inset 0 0 0 1px rgba(255, 226, 154, 0.6),
    0 0 16px rgba(255, 186, 66, 0.38);
}

/* ---------- 列表滚动容器（一屏 5 条） ---------- */

.org-list {
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding-top: 30px; /* 与原 margin-top: 30px 视觉对齐 */
  padding-right: 12px; /* 给滚动条留空间，避免内容被挤 */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 201, 93, 0.7) rgba(255, 200, 100, 0.06);
}

.org-list::-webkit-scrollbar {
  width: 10px;
}

.org-list::-webkit-scrollbar-track {
  background: rgba(255, 200, 100, 0.06);
  border-radius: 5px;
}

.org-list::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: linear-gradient(180deg, rgba(255, 201, 93, 0.75), rgba(255, 145, 31, 0.55));
  box-shadow: inset 0 0 0 1px rgba(255, 226, 154, 0.45);
}

.org-list::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(255, 220, 130, 0.95), rgba(255, 165, 50, 0.75));
}

.org-list::-webkit-scrollbar-corner {
  background: transparent;
}

/* ---------- 列表项 ---------- */

.org-item {
  position: relative;
  height: 84px;
  line-height: 84px;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: #ffeec8;
  border-radius: 32px;
  background: linear-gradient(180deg, rgba(255, 204, 102, 0.62), rgba(255, 150, 37, 0.18));
  box-shadow:
    inset 0 1px 0 rgba(255, 241, 197, 0.65),
    inset 0 0 0 1px rgba(255, 207, 106, 0.22),
    0 0 10px rgba(255, 164, 54, 0.08);
  margin-bottom: 40px; /* 84 + 40 = 124，与原 stepY 一致 */
}

.org-item:last-child {
  margin-bottom: 0;
}

.org-item__value {
  margin-left: 14px;
  font-size: 24px;
  font-weight: 700;
  color: #ffd465;
}

.org-empty {
  height: 84px;
  line-height: 84px;
  text-align: center;
  font-size: 26px;
  color: rgba(255, 228, 170, 0.6);
}

/* ---------- 星级行 ---------- */

.star-row {
  position: absolute;
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-left: 110px;
  margin-top: 100px;
}

.star-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 18px;
  background:
    radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9), rgba(255, 235, 168, 0.2) 45%),
    radial-gradient(circle at 60% 60%, rgba(255, 188, 82, 0.95), rgba(255, 107, 0, 0.18));
  box-shadow:
    0 0 14px rgba(255, 184, 62, 0.28),
    inset 0 0 0 2px rgba(255, 226, 146, 0.42);
  flex: 0 0 auto;
}

.star-icons {
  display: flex;
  gap: 14px;
  color: #ffd74a;
  text-shadow: 0 0 10px rgba(255, 214, 84, 0.28);
  font-size: 34px;
  width: 140px;
  flex: 0 0 auto;
}

.star {
  line-height: 1;
}

.star-info {
  flex: 1;
  display: flex;
  align-items: center;
  height: 58px;
  padding: 0 26px;
  border-radius: 34px;
  background: linear-gradient(90deg, rgba(255, 206, 120, 0.22), rgba(255, 160, 62, 0.08));
  box-shadow:
    inset 0 0 0 1px rgba(255, 214, 122, 0.18),
    0 0 18px rgba(255, 170, 52, 0.08);
}

.star-label {
  flex: 1;
  color: #ffe4aa;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.star-value {
  width: 220px;
  color: #ffd374;
  font-size: 34px;
  font-weight: 700;
  text-align: right;
  white-space: nowrap;
}

.star-rate {
  width: 180px;
  color: #ffd374;
  font-size: 34px;
  font-weight: 700;
  text-align: right;
  white-space: nowrap;
}

/* ---------- 党员结构缩放容器 ---------- */

.panel-structure {
  position: absolute;
  top: 0;
  left: 1200px;
  width: 2640px;
  height: 2160px;
  overflow: hidden;
}

.panel-structure__inner {
  width: 4080px;
  height: 2160px;
  transform: scale(0.647);
  transform-origin: top left;
}
</style>
