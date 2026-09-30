<template>
  <aside class="left">
    <!-- 1 网上申报率|事项覆盖度（接口驱动） -->
    <section class="panel panel--electric">
      <div class="panel-head">
        <div class="panel-title">申报率|覆盖度</div>
      </div>
      <div class="capacity-body">
        <div class="rate-wrap">
          <div
            v-for="(item, index) in declarationList"
            :key="`${item.key}-${index}`"
            class="rate-item"
          >
            <div class="rate-icon-block">
              <div class="icon-bg" :class="iconClasses[index % iconClasses.length]"></div>
            </div>
            <div class="rate-text">
              <div class="rate-label">{{ item.label }}</div>
              <div class="rate-val-row">
                <span class="val-num">{{ item.value }}</span>
              </div>
              <div v-if="item.standard" class="rate-std">
                {{ item.label }}标准 <span class="std-num">{{ item.standard }}</span>
              </div>
            </div>
          </div>

          <div v-if="declarationLoading" class="rate-empty">加载中…</div>
          <div v-else-if="!declarationList.length" class="rate-empty">暂无数据</div>
        </div>
      </div>
    </section>

    <!-- 2 事项年度累计办理量（接口驱动） -->
    <section class="panel panel--capacity">
      <div class="panel-head">
        <div class="panel-title">事项年度办理量</div>
      </div>
      <div class="capacity-body">
        <div class="table-wrap">
          <div class="table-header">
            <div class="tc-col">序号</div>
            <div class="tc-col">地区</div>
            <div class="tc-col">事项数</div>
            <div class="tc-col">实办事项数</div>
            <div class="tc-col">办理量</div>
          </div>
          <div v-for="(item, idx) in handleTotalList" :key="idx" class="table-row">
            <div class="tc-col">{{ item.no }}</div>
            <div class="tc-col">{{ item.area }}</div>
            <div class="tc-col">{{ item.itemCount }}</div>
            <div class="tc-col">{{ item.realItem }}</div>
            <div class="tc-col">{{ item.handleNum }}</div>
          </div>

          <div v-if="handleTotalLoading" class="table-empty">加载中…</div>
          <div v-else-if="!handleTotalList.length" class="table-empty">暂无数据</div>
        </div>
      </div>
    </section>

    <!-- 3 通办事项（接口驱动） -->
    <section class="panel panel--pop-state">
      <div class="panel-head">
        <div class="panel-title">通办事项</div>
        <div class="work-stat">
          市本级通办事项:<span class="num">{{ generalSummary.generalTotal }}</span
          >&nbsp;&nbsp;市本级办件数量:<span class="num">{{ generalSummary.fileTotal }}</span>
        </div>
      </div>
      <div class="capacity-body">
        <div class="capacity-chart">
          <EChart :option="tongBanOption" />
        </div>
      </div>
    </section>

    <!-- 4 平均办理时间（接口驱动） -->
    <section class="panel panel--pile">
      <div class="panel-head">
        <div class="panel-title">平均办理时间</div>
        <div class="work-stat">
          <span class="sort-btn">升序</span>
          <span class="sort-btn">降序</span>
        </div>
      </div>
      <div class="capacity-body">
        <div class="table-wrap">
          <div class="table-header">
            <div class="tc-col">序号</div>
            <div class="tc-col">地区</div>
            <div class="tc-col">事项名称</div>
            <div class="tc-col">办理时限</div>
            <div class="tc-col">平均办理时间</div>
          </div>
          <div v-for="(item, idx) in avgTimeList" :key="idx" class="table-row">
            <div class="tc-col">{{ item.no }}</div>
            <div class="tc-col">{{ item.area }}</div>
            <div class="tc-col tc-col--name">
              <el-tooltip
                :content="item.itemName"
                placement="top"
                effect="dark"
                :show-after="150"
                :disabled="!item.itemName"
              >
                <span class="tc-col__text">{{ item.itemName }}</span>
              </el-tooltip>
            </div>
            <div class="tc-col">{{ item.limitDay }}</div>
            <div class="tc-col">{{ item.avgDay }}</div>
          </div>

          <div v-if="avgTimeLoading" class="table-empty">加载中…</div>
          <div v-else-if="!avgTimeList.length" class="table-empty">暂无数据</div>
        </div>
      </div>
    </section>

    <!-- 5 一件事一次办（接口驱动） -->
    <section class="panel panel--resume">
      <div class="panel-head">
        <div class="panel-title">一件事一次办</div>
      </div>
      <div class="capacity-body">
        <div class="table-wrap">
          <div class="table-header">
            <div class="tc-col">序号</div>
            <div class="tc-col">地区</div>
            <div class="tc-col">一件事数量</div>
            <div class="tc-col">实办件种类</div>
            <div class="tc-col">实办件数量</div>
          </div>
          <div v-for="(item, idx) in oneThingList" :key="idx" class="table-row">
            <div class="tc-col">{{ item.no }}</div>
            <div class="tc-col">{{ item.area }}</div>
            <div class="tc-col">{{ item.oneThingCount }}</div>
            <div class="tc-col">{{ item.realType }}</div>
            <div class="tc-col">{{ item.realNum }}</div>
          </div>

          <div v-if="oneThingLoading" class="table-empty">加载中…</div>
          <div v-else-if="!oneThingList.length" class="table-empty">暂无数据</div>
        </div>
      </div>
    </section>

    <!-- 6 超期办件（接口驱动） -->
    <section class="panel panel--steel">
      <div class="panel-head">
        <div class="panel-title">超期办件</div>
      </div>
      <div class="capacity-body">
        <div class="capacity-chart">
          <EChart :option="overDateOption" />
        </div>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import {
  getDeclaration,
  getGrandTotal,
  getGeneralAtters,
  getAverageProcessingTime,
  getOneThing,
  getOverdue
} from '@/api/business'

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
   1. 申报率 / 覆盖度（接口驱动）
   ========================================================= */

type DeclarationItem = {
  key: string
  label: string
  value: string
  standard: string
}

const iconClasses = ['icon-doc', 'icon-file', 'icon-house', 'icon-book']

const declarationList = ref<DeclarationItem[]>([])
const declarationLoading = ref(false)

const fetchDeclaration = async () => {
  declarationLoading.value = true
  try {
    const res: any = await getDeclaration()
    console.log('[declaration] res=', res)

    const list = pickList(res)
    const summary = pickSummary(res)

    declarationList.value = list.map((it: any) => {
      const key = String(it?.key ?? '')
      const standardKey = `${key}Level`
      const standard = summary?.[standardKey]
      return {
        key,
        label: String(it?.label ?? ''),
        value: String(it?.value ?? ''),
        standard: standard === undefined || standard === null ? '' : String(standard)
      }
    })
  } catch (e) {
    console.error('申报率查询失败', e)
    declarationList.value = []
  } finally {
    declarationLoading.value = false
  }
}

/* =========================================================
   2. 事项年度累计办理量（接口驱动）
   ========================================================= */

type GrandTotalRow = {
  no: number
  area: string
  itemCount: number
  realItem: number
  handleNum: number
}

const handleTotalList = ref<GrandTotalRow[]>([])
const handleTotalLoading = ref(false)

const fetchGrandTotal = async () => {
  handleTotalLoading.value = true
  try {
    const res: any = await getGrandTotal()
    console.log('[grandtotal] res=', res)

    const list = pickList(res)
    const filtered = list.filter((it: any) => {
      const name = String(it?.cityName ?? '').trim()
      return name && !/^\d+$/.test(name)
    })

    handleTotalList.value = filtered.map((it: any, idx: number) => ({
      no: idx + 1,
      area: String(it?.cityName ?? ''),
      itemCount: Number(it?.matterNum ?? 0),
      realItem: Number(it?.candoNum ?? 0),
      handleNum: Number(it?.fileNum ?? 0)
    }))
  } catch (e) {
    console.error('事项年度办理量查询失败', e)
    handleTotalList.value = []
  } finally {
    handleTotalLoading.value = false
  }
}

/* =========================================================
   3. 通办事项（接口驱动）
   ========================================================= */

type GeneralRow = {
  area: string
  general: number
  fileNum: number
}

const generalList = ref<GeneralRow[]>([])
const generalSummary = ref<{ generalTotal: string; fileTotal: string }>({
  generalTotal: '0',
  fileTotal: '0'
})
const generalLoading = ref(false)

const fetchGeneralAtters = async () => {
  generalLoading.value = true
  try {
    const res: any = await getGeneralAtters()
    console.log('[generalatters] res=', res)

    const list = pickList(res)
    generalList.value = list.map((it: any) => ({
      area: String(it?.cityName ?? ''),
      general: Number(it?.general ?? 0),
      fileNum: Number(it?.fileNum ?? 0)
    }))

    const summary = pickSummary(res)
    generalSummary.value = {
      generalTotal: String(summary?.generalTotal ?? '0'),
      fileTotal: String(summary?.fileTotal ?? '0')
    }
  } catch (e) {
    console.error('通办事项查询失败', e)
    generalList.value = []
    generalSummary.value = { generalTotal: '0', fileTotal: '0' }
  } finally {
    generalLoading.value = false
  }
}

const tongBanOption = computed(() => {
  const areaData = generalList.value.map((r) => r.area)
  const tongBanData = generalList.value.map((r) => r.general)
  const banJianData = generalList.value.map((r) => r.fileNum)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 120, right: 30, top: 30, bottom: 160 },
    xAxis: {
      type: 'category',
      data: areaData,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', rotate: 35, fontSize: 34 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 34 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '通办事项',
        type: 'bar',
        data: tongBanData,
        itemStyle: { color: '#86ccff' }
      },
      {
        name: '办件数量',
        type: 'bar',
        data: banJianData,
        itemStyle: { color: '#36e8ff' }
      }
    ]
  }
})

/* =========================================================
   4. 平均办理时间（接口驱动）
   ========================================================= */

type AvgTimeRow = {
  no: number
  area: string
  itemName: string
  limitDay: string
  avgDay: string
}

// 地区编码 → 名称映射（如与实际不符，改这里即可）
const AREA_NAME_MAP: Record<string, string> = {
  '210301': '铁东区',
  '210302': '铁西区',
  '210303': '立山区',
  '210304': '千山区',
  '210311': '千山区',
  '210321': '台安县',
  '210323': '岫岩县',
  '210381': '海城市',
  '210300': '鞍山市',
  '210000': '辽宁省'
}

const getAreaName = (code: string) => AREA_NAME_MAP[code] ?? code

const formatDays = (v: any) => {
  const n = Number(v)
  if (!Number.isFinite(n)) return String(v ?? '')
  if (n < 1) return '<1天'
  return `${n}天`
}

const avgTimeList = ref<AvgTimeRow[]>([])
const avgTimeLoading = ref(false)

const fetchAvgTime = async () => {
  avgTimeLoading.value = true
  try {
    const res: any = await getAverageProcessingTime()
    console.log('[averageprocessingtime] res=', res)

    const list = pickList(res)
    avgTimeList.value = list.map((it: any, idx: number) => {
      const areaCode = String(it?.area ?? '')
      return {
        no: idx + 1,
        area: getAreaName(areaCode),
        itemName: String(it?.matterName ?? ''),
        limitDay: formatDays(it?.timeLimit),
        avgDay: formatDays(it?.averageTime)
      }
    })
  } catch (e) {
    console.error('平均办理时间查询失败', e)
    avgTimeList.value = []
  } finally {
    avgTimeLoading.value = false
  }
}

/* =========================================================
   5. 一件事一次办（接口驱动）
   ========================================================= */

type OneThingRow = {
  no: number
  area: string
  oneThingCount: number
  realType: number
  realNum: number
}

const oneThingList = ref<OneThingRow[]>([])
const oneThingLoading = ref(false)

const fetchOneThing = async () => {
  oneThingLoading.value = true
  try {
    const res: any = await getOneThing()
    console.log('[onething] res=', res)

    const list = pickList(res)
    oneThingList.value = list.map((it: any, idx: number) => ({
      no: idx + 1,
      area: String(it?.areaName ?? ''),
      oneThingCount: Number(it?.oneThingNum ?? 0),
      realType: Number(it?.realityType ?? 0),
      realNum: Number(it?.reality ?? 0)
    }))
  } catch (e) {
    console.error('一件事一次办查询失败', e)
    oneThingList.value = []
  } finally {
    oneThingLoading.value = false
  }
}

/* =========================================================
   6. 超期办件（接口驱动）
   - 接口：/businessenvironment/bigscreen/overdue
   - 返回 { cityName, overdueNum, proportion, total }
   - 映射：
       cityName   → x 轴类目
       overdueNum → 柱状图（超期办件数量）
       proportion → 折线图（超期办件占比）
       total      → 暂不展示
   ========================================================= */

type OverdueRow = {
  area: string
  overdueNum: number
  proportion: number
}

const overdueList = ref<OverdueRow[]>([])
const overdueLoading = ref(false)

const fetchOverdue = async () => {
  overdueLoading.value = true
  try {
    const res: any = await getOverdue()
    console.log('[overdue] res=', res)

    const list = pickList(res)
    overdueList.value = list.map((it: any) => ({
      area: String(it?.cityName ?? ''),
      overdueNum: Number(it?.overdueNum ?? 0),
      proportion: Number(it?.proportion ?? 0)
    }))
  } catch (e) {
    console.error('超期办件查询失败', e)
    overdueList.value = []
  } finally {
    overdueLoading.value = false
  }
}

const overDateOption = computed(() => {
  const areaData = overdueList.value.map((r) => r.area)
  const overNum = overdueList.value.map((r) => r.overdueNum)
  const overRate = overdueList.value.map((r) => r.proportion)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 90, right: 60, top: 30, bottom: 190 },
    xAxis: {
      type: 'category',
      data: areaData,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', rotate: 35, fontSize: 34 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: '超期办件数量',
        axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 34 },
        splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      {
        type: 'value',
        name: '超期办件占比(%)',
        position: 'right',
        axisLabel: { color: '#ffd454', fontSize: 34 },
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false }
      }
    ],
    series: [
      {
        name: '超期办件数量',
        type: 'bar',
        yAxisIndex: 0,
        data: overNum,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#36e8ff' },
              { offset: 1, color: 'rgba(30,140,255,0.2)' }
            ]
          }
        }
      },
      {
        name: '超期办件占比',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        itemStyle: { color: '#ffd454', fontSize: 34 },
        lineStyle: { color: '#ffd454', fontSize: 34 },
        data: overRate
      }
    ]
  }
})

/* =========================================================
   初始化
   ========================================================= */

onMounted(() => {
  fetchDeclaration()
  fetchGrandTotal()
  fetchGeneralAtters()
  fetchAvgTime()
  fetchOneThing()
  fetchOverdue()
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
  margin-left: 35px;
  letter-spacing: 2px;
  color: #f8fbff;
  text-shadow:
    -2px -2px 3px rgba(255, 255, 255, 0.7),
    2px 2px 4px rgba(0, 20, 60, 0.5),
    0 0 6px #90c4ff,
    0 0 14px #3b8fff,
    0 0 24px #0f58d1;
}
.work-stat {
  font-size: 18px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.75);
}
.work-stat .num {
  color: #36e8ff;
  text-shadow: 0 0 8px rgba(54, 232, 255, 0.2);
}
.capacity-body {
  height: 100%;
  min-height: 0;
  margin-top: 60px;
}
.capacity-chart {
  height: 100%;
  min-height: 0;
}

/*====网上申报率|事项覆盖度 截图样式 2行2列布局====*/
.rate-wrap {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  margin-top: -60px;
}
.rate-item {
  display: flex;
  align-items: center;
  gap: 16px;
}
.rate-icon-block {
  flex-shrink: 0;
}
.icon-bg {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(60, 180, 255, 0.35) 0%,
    rgba(20, 90, 180, 0.1) 70%,
    transparent 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 22px rgba(40, 160, 255, 0.25);
  position: relative;
}
.icon-doc::before {
  content: '📄';
  font-size: 42px;
  color: #72d8ff;
}
.icon-file::before {
  content: '📃';
  font-size: 42px;
  color: #72d8ff;
}
.icon-house::before {
  content: '🏛';
  font-size: 42px;
  color: #72d8ff;
}
.icon-book::before {
  content: '📖';
  font-size: 42px;
  color: #72d8ff;
}

.rate-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.rate-label {
  font-size: 30px;
  color: rgba(214, 238, 255, 0.72);
}
.rate-val-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.val-num {
  font-size: 36px;
  color: #36e8ff;
  font-weight: bold;
}
.arrow.red {
  color: #ff4444;
  font-size: 30px;
}
.arrow.green {
  color: #32e978;
  font-size: 30px;
}
.rate-std {
  font-size: 30px;
  color: rgba(214, 238, 255, 0.58);
}
.std-num {
  color: #36e8ff;
}

.rate-empty {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-size: 28px;
  color: rgba(214, 238, 255, 0.6);
}

/*====通用表格样式====*/
.table-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.table-header {
  display: grid;
  grid-template-columns: 80px 1fr 400px 1fr 1fr;
  padding: 10px 14px;
  background: rgba(14, 40, 85, 0.4);
  border-radius: 8px 8px 0 0;
}
.table-row {
  display: grid;
  grid-template-columns: 80px 1fr 400px 1fr 1fr;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.3);
  margin-top: 20px;
}
.tc-col {
  font-size: 34px;
  color: rgba(214, 238, 255, 0.78);
}
.table-header .tc-col {
  color: #54e8ff;
  font-weight: bold;
}

/* ⭐ 事项名称列：不换行 + 溢出省略 + 鼠标悬浮 el-tooltip 显示全文 */
.tc-col--name {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tc-col--name .tc-col__text {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
}

.sort-btn {
  padding: 4px 12px;
  border: 1px solid rgba(84, 188, 255, 0.25);
  border-radius: 6px;
  margin-left: 8px;
  color: rgba(214, 238, 255, 0.75);
}

.table-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-size: 28px;
  color: rgba(214, 238, 255, 0.6);
}
</style>
