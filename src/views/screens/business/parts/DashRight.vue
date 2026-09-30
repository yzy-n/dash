<template>
  <div class="container">
    <!-- 第一行：年度热门事项 | 辽事通平台 | 好差评主动评价率 -->
    <div class="row row-top">
      <!-- 年度热门事项排行榜（接口驱动 + 滚动） -->
      <section class="panel panel--rank">
        <div class="panel-head">
          <div class="panel-title">年度热门事项排行榜</div>
        </div>
        <div class="panel-body">
          <div class="rank-table">
            <div class="rank-table-head">
              <span>序号</span>
              <span>事项名称</span>
              <span>数量</span>
            </div>
            <div class="rank-table-body">
              <div class="rank-table-row" v-for="(item, idx) in hotRankList" :key="idx">
                <span class="r-index"> <i class="r-index-bar"></i>{{ item.no }} </span>
                <span class="r-name" :title="item.name">{{ item.name }}</span>
                <span class="r-val">{{ item.count }}</span>
              </div>

              <div v-if="hotRankLoading" class="rank-empty">加载中…</div>
              <div v-else-if="!hotRankList.length" class="rank-empty">暂无数据</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 辽事通平台（接口驱动） -->
      <section class="panel panel--liaost">
        <div class="panel-head">
          <div class="panel-title">辽事通平台</div>
        </div>
        <div class="panel-body liaost-wrap">
          <div
            v-for="(item, idx) in liaoshitongList"
            :key="`${item.key}-${idx}`"
            class="liaost-item"
          >
            <div class="liaost-icon"></div>
            <div class="liaost-label">{{ item.label }}:</div>
            <div class="liaost-num">{{ item.displayValue }}</div>
          </div>

          <div v-if="liaoshitongLoading" class="liaost-empty">加载中…</div>
          <div v-else-if="!liaoshitongList.length" class="liaost-empty">暂无数据</div>
        </div>
      </section>

      <!-- 好差评主动评价率（接口驱动） -->
      <section class="panel panel--rate">
        <div class="panel-head">
          <div class="panel-title">好差评主动评价率</div>
        </div>
        <div class="panel-body">
          <div class="rate-table">
            <div class="rate-table-head">
              <span>地区</span>
              <span>评价总数</span>
              <span>主动评价率</span>
              <span>事项覆盖度</span>
              <span>部门覆盖度</span>
            </div>
            <div class="rate-table-row" v-for="(item, idx) in rateTableData" :key="idx">
              <span class="r-area">{{ item.area }}</span>
              <span>{{ item.total }}</span>
              <span>{{ item.activeRate }}</span>
              <span>{{ item.itemCover }}</span>
              <span>{{ item.deptCover }}</span>
            </div>

            <div v-if="rateLoading" class="rate-empty">加载中…</div>
            <div v-else-if="!rateTableData.length" class="rate-empty">暂无数据</div>
          </div>
        </div>
      </section>
    </div>

    <!-- 第二行：流程再造（接口驱动） | 电子证照电子印章（接口驱动） -->
    <div class="row row-bottom">
      <section class="panel panel--rebuild">
        <div class="panel-head">
          <div class="panel-title">流程再造</div>
          <div class="rebuild-tabs">
            <div
              v-for="tab in rebuildTabs"
              :key="tab"
              class="rebuild-tab"
              :class="{ 'rebuild-tab--active': tab === activeRebuildTab }"
              @click="activeRebuildTab = tab"
            >
              {{ tab }}
            </div>
          </div>
        </div>
        <div class="panel-body chart-body">
          <EChart :option="rebuildBarOption" />
        </div>
      </section>
      <section class="panel panel--cert">
        <div class="panel-head">
          <div class="panel-title">电子证照 <span class="sub">电子印章</span></div>
        </div>
        <div class="panel-body cert-wrap">
          <div class="cert-left">
            <div class="cert-card">
              <div class="cert-icon"></div>
              <div class="cert-text">全市电子证照种类数</div>
              <div class="cert-big-num">
                {{ licenseSummary.sealNumCity }}<span class="cert-unit">种</span>
              </div>
            </div>
            <div class="cert-card">
              <div class="cert-icon"></div>
              <div class="cert-text">市直电子证照制证部门数</div>
              <div class="cert-big-num">
                {{ licenseSummary.deptNum }}<span class="cert-unit">个</span>
              </div>
              <div class="cert-small-text">
                市直各部门制作电子证照种类数
                <span class="cert-small-num">{{ licenseSummary.makeNum }}种</span>
              </div>
            </div>
          </div>
          <div class="cert-right">
            <div class="chart-desc">各地区电子证照制证</div>
            <div class="chart-desc-sub">电子证照制证数·平均值</div>
            <EChart :option="certBarOption" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import { getMatterTop, getLiaoshitong, getEvaluation, getProcess, getLicense } from '@/api/business'

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
   1. 年度热门事项排行榜（接口驱动）
   ========================================================= */

type HotRankRow = {
  no: number
  name: string
  count: number
}

const hotRankList = ref<HotRankRow[]>([])
const hotRankLoading = ref(false)

const fetchHotRank = async () => {
  hotRankLoading.value = true
  try {
    const res: any = await getMatterTop()
    console.log('[mattertop] res=', res)

    const list = pickList(res)
    const sorted = [...list].sort((a: any, b: any) => Number(a?.sort ?? 0) - Number(b?.sort ?? 0))

    hotRankList.value = sorted.map((it: any) => ({
      no: Number(it?.sort ?? 0),
      name: String(it?.matterName ?? ''),
      count: Number(it?.handleNum ?? 0)
    }))
  } catch (e) {
    console.error('年度热门事项查询失败', e)
    hotRankList.value = []
  } finally {
    hotRankLoading.value = false
  }
}

/* =========================================================
   2. 辽事通平台（接口驱动）
   ========================================================= */

type LiaoshitongItem = {
  key: string
  label: string
  displayValue: string
}

const liaoshitongList = ref<LiaoshitongItem[]>([])
const liaoshitongLoading = ref(false)

const formatValue = (key: string, value: string) => {
  if (key.toLowerCase().includes('rate')) {
    return `${value}%`
  }
  return value
}

const fetchLiaoshitong = async () => {
  liaoshitongLoading.value = true
  try {
    const res: any = await getLiaoshitong()
    console.log('[liaoshitong] res=', res)

    const list = pickList(res)
    liaoshitongList.value = list.map((it: any) => {
      const key = String(it?.key ?? '')
      const rawValue = String(it?.value ?? '')
      return {
        key,
        label: String(it?.label ?? ''),
        displayValue: formatValue(key, rawValue)
      }
    })
  } catch (e) {
    console.error('辽事通平台查询失败', e)
    liaoshitongList.value = []
  } finally {
    liaoshitongLoading.value = false
  }
}

/* =========================================================
   3. 好差评主动评价率（接口驱动）
   ========================================================= */

type RateRow = {
  area: string
  total: number
  activeRate: string
  itemCover: string
  deptCover: string
}

const rateTableData = ref<RateRow[]>([])
const rateLoading = ref(false)

const toPercentText = (v: any) => {
  const s = String(v ?? '').trim()
  if (!s) return ''
  if (s.includes('%')) return s
  return `${s} %`
}

const fetchEvaluation = async () => {
  rateLoading.value = true
  try {
    const res: any = await getEvaluation()
    console.log('[evaluation] res=', res)

    const list = pickList(res)
    rateTableData.value = list.map((it: any) => ({
      area: String(it?.cityName ?? ''),
      total: Number(it?.evaluationNum ?? 0),
      activeRate: toPercentText(it?.evaluate),
      itemCover: toPercentText(it?.cover),
      deptCover: toPercentText(it?.department)
    }))
  } catch (e) {
    console.error('好差评主动评价率查询失败', e)
    rateTableData.value = []
  } finally {
    rateLoading.value = false
  }
}

/* =========================================================
   4. 流程再造（接口驱动 + Tab 切换）
   ========================================================= */

type RebuildRow = {
  area: string
  timeLimitNum: number
  envNum: number
  reductionNum: number
  runSpeedNum: number
}

const rebuildTabs = ['减时限', '减环节', '减材料', '减跑动'] as const
type RebuildTab = (typeof rebuildTabs)[number]

const activeRebuildTab = ref<RebuildTab>('减时限')

const rebuildList = ref<RebuildRow[]>([])
const rebuildLoading = ref(false)

const REBUILD_FIELD_MAP: Record<RebuildTab, keyof Omit<RebuildRow, 'area'>> = {
  减时限: 'timeLimitNum',
  减环节: 'envNum',
  减材料: 'reductionNum',
  减跑动: 'runSpeedNum'
}

const REBUILD_AXIS_NAME: Record<RebuildTab, string> = {
  减时限: '减时限',
  减环节: '减环节',
  减材料: '减材料',
  减跑动: '减跑动'
}

const fetchRebuild = async () => {
  rebuildLoading.value = true
  try {
    const res: any = await getProcess()
    console.log('[process] res=', res)

    const list = pickList(res)
    rebuildList.value = list.map((it: any) => ({
      area: String(it?.cityName ?? ''),
      timeLimitNum: Number(it?.timeLimitNum ?? 0),
      envNum: Number(it?.envNum ?? 0),
      reductionNum: Number(it?.reductionNum ?? 0),
      runSpeedNum: Number(it?.runSpeedNum ?? 0)
    }))
  } catch (e) {
    console.error('流程再造查询失败', e)
    rebuildList.value = []
  } finally {
    rebuildLoading.value = false
  }
}

const rebuildBarOption = computed(() => {
  const field = REBUILD_FIELD_MAP[activeRebuildTab.value]
  const areaData = rebuildList.value.map((r) => r.area)
  const values = rebuildList.value.map((r) => Number(r[field]) || 0)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 120, right: 20, top: 60, bottom: 80 },
    xAxis: {
      type: 'category',
      data: areaData,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 26, rotate: 35 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: REBUILD_AXIS_NAME[activeRebuildTab.value],
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 26 },
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 26 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: REBUILD_AXIS_NAME[activeRebuildTab.value],
        type: 'bar',
        barWidth: 24,
        data: values,
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
      }
    ]
  }
})

/* =========================================================
   5. 电子证照电子印章（接口驱动）
   - 接口：/businessenvironment/bigscreen/license
   - dataList: { cityName, licenseNum, sealNum }
   - summary:  { sealNumCity, makeNum, deptNum, ... }
   - 左侧卡片取 summary：
       全市电子证照种类数      ← sealNumCity
       市直电子证照制证部门数  ← deptNum
       市直各部门制作电子证照种类数 ← makeNum
   - 柱状图：各地区电子证照制证 → x 轴 cityName，柱 = licenseNum，均值线 = 所有 licenseNum 平均
   ========================================================= */

type LicenseRow = {
  area: string
  licenseNum: number
  sealNum: number
}

type LicenseSummary = {
  sealNumCity: string
  makeNum: string
  deptNum: string
}

const licenseList = ref<LicenseRow[]>([])
const licenseSummary = ref<LicenseSummary>({
  sealNumCity: '0',
  makeNum: '0',
  deptNum: '0'
})
const licenseLoading = ref(false)

const fetchLicense = async () => {
  licenseLoading.value = true
  try {
    const res: any = await getLicense()
    console.log('[license] res=', res)

    const list = pickList(res)
    licenseList.value = list.map((it: any) => ({
      area: String(it?.cityName ?? ''),
      licenseNum: Number(it?.licenseNum ?? 0),
      sealNum: Number(it?.sealNum ?? 0)
    }))

    const summary = pickSummary(res)
    licenseSummary.value = {
      sealNumCity: String(summary?.sealNumCity ?? '0'),
      makeNum: String(summary?.makeNum ?? '0'),
      deptNum: String(summary?.deptNum ?? '0')
    }
  } catch (e) {
    console.error('电子证照查询失败', e)
    licenseList.value = []
    licenseSummary.value = { sealNumCity: '0', makeNum: '0', deptNum: '0' }
  } finally {
    licenseLoading.value = false
  }
}

const certBarOption = computed(() => {
  const areaData = licenseList.value.map((r) => r.area)
  const certData = licenseList.value.map((r) => r.licenseNum)

  // 平均值 = 所有地区 licenseNum 的算术平均
  const avg = certData.length ? certData.reduce((s, v) => s + v, 0) / certData.length : 0
  const avgData = certData.map(() => Number(avg.toFixed(2)))

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 90, right: 20, top: 40, bottom: 60 },
    xAxis: {
      type: 'category',
      data: areaData,
      axisLabel: {
        color: 'rgba(214, 238, 255, 0.6)',
        fontSize: 22,
        interval: 0,
        rotate: 30
      },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
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
        name: '制证数',
        type: 'bar',
        barWidth: 22,
        data: certData,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#40c8ff' },
              { offset: 1, color: 'rgba(34,110,255,0.4)' }
            ]
          }
        }
      },
      {
        name: '平均值',
        type: 'line',
        symbol: 'none',
        data: avgData,
        lineStyle: { color: '#fde82c', width: 2 }
      }
    ]
  }
})

/* =========================================================
   初始化
   ========================================================= */

onMounted(() => {
  fetchHotRank()
  fetchLiaoshitong()
  fetchEvaluation()
  fetchRebuild()
  fetchLicense()
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
}
.row {
  display: grid;
  gap: 20px;
  min-height: 0;
}
.row-top {
  flex: 1;
  grid-template-columns: 1fr 1fr 1fr;
}
.row-bottom {
  flex: 1;
  grid-template-columns: 1fr 1.6fr;
}
.panel {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(84, 188, 255, 0.22);
  background: linear-gradient(180deg, rgba(6, 27, 72, 0.6), rgba(4, 16, 44, 0.6));
  box-sizing: border-box;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.panel-head {
  position: relative;
  padding: 14px 20px;
}
.panel-title {
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 1px;
  text-shadow: 0 0 8px #3b8fff;
}
.panel-title .sub {
  color: #ffdd66;
  margin-left: 8px;
}
.panel-body {
  flex: 1;
  min-height: 0;
  padding: 10px 20px 20px;
  overflow: hidden;
}

/* ================= 年度热门事项排行榜 ================= */
.rank-table {
  background-color: #071430;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.rank-table-head {
  display: grid;
  grid-template-columns: 64px 1fr 100px;
  padding: 12px 14px;
  gap: 20px;
  background: linear-gradient(90deg, #0f3477, #154294);
  font-size: 30px;
  color: #a6d8ff;
  flex: 0 0 auto;
}
.rank-table-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: rgba(80, 170, 255, 0.7) rgba(12, 32, 68, 0.4);
}
.rank-table-body::-webkit-scrollbar {
  width: 8px;
}
.rank-table-body::-webkit-scrollbar-track {
  background: rgba(12, 32, 68, 0.4);
  border-radius: 4px;
}
.rank-table-body::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(80, 170, 255, 0.8), rgba(40, 120, 210, 0.6));
  border-radius: 4px;
}
.rank-table-body::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(100, 190, 255, 0.95), rgba(50, 140, 230, 0.8));
}
.rank-table-row {
  display: grid;
  grid-template-columns: 64px 1fr 100px;
  padding: 13px 14px;
  font-size: 30px;
  gap: 20px;
  color: #e6f2ff;
  border-bottom: 1px solid rgba(70, 140, 220, 0.18);
  align-items: center;
}
.rank-table-row:last-child {
  border-bottom: none;
}
.r-index {
  display: flex;
  align-items: center;
  color: #ffffff;
}
.r-index-bar {
  display: inline-block;
  width: 4px;
  height: 20px;
  background: linear-gradient(180deg, #34b8ff, #0e6fc9);
  margin-right: 10px;
  border-radius: 2px;
}
.r-name {
  color: #e6f2ff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.r-val {
  text-align: right;
  color: #ffffff;
}
.rank-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  font-size: 26px;
  color: rgba(214, 238, 255, 0.55);
}

/* 辽事通平台 */
.liaost-wrap {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 14px;
  place-items: center;
}
.liaost-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.liaost-icon {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  border: 1px solid rgba(80, 170, 255, 0.3);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.2), transparent);
}
.liaost-label {
  font-size: 17px;
  color: #82c8ff;
}
.liaost-num {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
}
.liaost-empty {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: rgba(214, 238, 255, 0.55);
}

/* 好差评主动评价率表格 */
.rate-table {
  height: 100%;
  display: grid;
  border: 1px solid rgba(84, 188, 255, 0.15);
  border-radius: 6px;
  overflow: hidden;
}
.rate-table-head {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: 10px 10px;
  background: rgba(14, 40, 85, 0.45);
  font-size: 30px;
  color: #82c8ff;
}
.rate-table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: 9px 10px;
  font-size: 30px;
  color: rgba(214, 238, 255, 0.78);
  border-bottom: 1px solid rgba(84, 188, 255, 0.1);
  align-items: center;
}
.rate-table-row:last-child {
  border-bottom: none;
}
.r-area {
  color: #70ee70;
}
.rate-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  font-size: 26px;
  color: rgba(214, 238, 255, 0.55);
}

/* 流程再造 */
.rebuild-tabs {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}
.rebuild-tab {
  padding: 4px 14px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  background: rgba(14, 40, 85, 0.4);
  border-radius: 4px;
  color: #82c8ff;
  font-size: 15px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}
.rebuild-tab--active {
  background: linear-gradient(180deg, rgba(54, 232, 188, 0.28), rgba(22, 160, 120, 0.12));
  color: #eafff5;
  box-shadow: 0 0 12px rgba(54, 232, 188, 0.2);
}
.chart-body {
  height: 100%;
}
/* 电子证照 */
.cert-wrap {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 16px;
  height: 100%;
}
.cert-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cert-card {
  flex: 1;
  border: 1px solid rgba(84, 188, 255, 0.22);
  border-radius: 8px;
  background: rgba(10, 30, 65, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
}
.cert-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  border: 1px solid rgba(80, 170, 255, 0.3);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.2), transparent);
  margin-bottom: 8px;
}
.cert-text {
  font-size: 26px;
  color: #82c8ff;
  text-align: center;
}
.cert-big-num {
  font-size: 32px;
  font-weight: bold;
  color: #ffdd66;
  margin: 6px 0;
}
.cert-unit {
  font-size: 26px;
  color: #82c8ff;
}
.cert-small-text {
  font-size: 26px;
  color: #82c8ff;
  margin-top: 4px;
  text-align: center;
}
.cert-small-num {
  color: #ffdd66;
}
.cert-right {
  display: flex;
  flex-direction: column;
}
.chart-desc {
  text-align: right;
  font-size: 16px;
  color: #82c8ff;
}
.chart-desc-sub {
  text-align: right;
  font-size: 14px;
  color: #82c8ff;
  margin-bottom: 6px;
}
</style>
