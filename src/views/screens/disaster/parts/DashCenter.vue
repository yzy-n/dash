<template>
  <div class="center-shell">
    <div class="hazard-tabs">
      <button
        v-for="item in hazardTabs"
        :key="item.key"
        type="button"
        class="hazard-tab"
        :class="{ 'hazard-tab--active': activeHazard === item.key }"
        @click="activeHazard = item.key as HazardKey"
      >
        <span class="hazard-icon" :class="`hazard-icon--${item.icon}`"></span>
        <span class="hazard-name">{{ item.name }}</span>
        <span class="hazard-num">{{ item.num }}</span>
      </button>
    </div>

    <div class="main">
      <section class="panel panel--left">
        <div class="panel-title">地震灾害</div>
        <div class="quake-list">
          <div class="quake-item">
            <div class="quake-dot"></div>
            <div class="quake-body">
              <div class="quake-time">2022年11月06日10时52分</div>
              <div class="quake-desc">
                中国地震台网正式测定：在辽宁省海城市（北纬40.70度，东经122.74度）发生2.0级地震，震源深度10公里。
              </div>
            </div>
          </div>
          <div class="quake-item">
            <div class="quake-dot"></div>
            <div class="quake-body">
              <div class="quake-time">2022年11月13日21时16分</div>
              <div class="quake-desc">
                中国地震台网正式测定：在辽宁省海城市（北纬40.67度，东经122.68度）发生2.0级地震，震源深度10公里。
              </div>
            </div>
          </div>
          <div class="quake-item">
            <div class="quake-dot"></div>
            <div class="quake-body">
              <div class="quake-time">2022年12月02日21时27分</div>
              <div class="quake-desc">
                中国地震台网正式测定：在辽宁省海城市（北纬40.69度，东经122.73度）发生2.4级地震，震源深度12公里。
              </div>
            </div>
          </div>
          <div class="quake-item">
            <div class="quake-dot"></div>
            <div class="quake-body">
              <div class="quake-time">2022年12月10日16时18分</div>
              <div class="quake-desc">
                中国地震台网正式测定：在辽宁省海城市（北纬40.70度，东经122.68度）发生2.7级地震，震源深度10公里。
              </div>
            </div>
          </div>
          <div class="quake-item">
            <div class="quake-dot"></div>
            <div class="quake-body">
              <div class="quake-time">2022年12月29日20时22分</div>
              <div class="quake-desc">
                中国地震台网正式测定：在辽宁省海城市（北纬40.69度，东经122.71度）发生2.8级地震，震源深度9公里。
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="panel panel--map">
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

      <section class="panel panel--right">
        <div class="panel-title">近七天气象灾害预报</div>
        <div class="forecast">
          <div
            class="forecast-card"
            v-for="(item, idx) in warningList"
            :key="`${item.title}-${idx}`"
          >
            <div class="forecast-head">{{ item.title }}</div>
            <div class="forecast-body">
              <div class="forecast-text">{{ item.text }}</div>
              <div class="forecast-steps">
                <div
                  class="forecast-step"
                  v-for="(step, si) in item.steps"
                  :key="si"
                >
                  {{ step }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import CityMapChart from '../charts/CityMapChart.vue'
import type { GridInfoRow } from '../types'
import { getReliefStats, getDamageWarning } from '@/api/disaster'

/* =========================================================
   顶部五个灾害 Tab（接口驱动）
   ========================================================= */
type HazardKey = 'eq' | 'geo' | 'fire' | 'met' | 'flood'

type ReliefStatRow = {
  type: string
  label: string
  cnt: number
}

const HAZARD_BASE = [
  { key: 'eq' as const, icon: 'eq', type: '1' },
  { key: 'geo' as const, icon: 'geo', type: '2' },
  { key: 'fire' as const, icon: 'fire', type: '3' },
  { key: 'met' as const, icon: 'met', type: '4' },
  { key: 'flood' as const, icon: 'flood', type: '5' }
]

const activeHazard = ref<HazardKey>('geo')
const areaOptions = ['铁东区', '铁西区', '立山区', '高新区', '风景区', '台安县', '海城市', '岫岩县']
const selectedAreaName = ref('铁西区')

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

const reliefStats = ref<ReliefStatRow[]>([])

const fetchReliefStats = async () => {
  try {
    const res: any = await getReliefStats()
    console.log('[reliefstats] res=', res)

    const list = pickList(res)
    reliefStats.value = list.map((it: any) => ({
      type: String(it?.type ?? ''),
      label: String(it?.label ?? ''),
      cnt: toNum(it?.cnt)
    }))
  } catch (e) {
    console.error('灾害统计查询失败', e)
    reliefStats.value = []
  }
}

const FALLBACK_NAME: Record<string, string> = {
  '1': '地震灾害',
  '2': '地质灾害',
  '3': '森林火灾',
  '4': '气象灾害',
  '5': '汛情灾害'
}

const hazardTabs = computed(() => {
  return HAZARD_BASE.map((base) => {
    const found = reliefStats.value.find((s) => s.type === base.type)
    return {
      key: base.key,
      icon: base.icon,
      name: found?.label || FALLBACK_NAME[base.type] || '',
      num: found?.cnt ?? 0
    }
  })
})

/* =========================================================
   气象灾害预警（接口驱动）
   - 接口：/disaster/bigscreen/damagewarning
   - 返回：{ data: { datalist: [{ title, subtitle, snapshot,
             content, warningStartTime, warningEndTime }] } }
   - 只取前 2 条；把 snapshot / content 拆成正文 + 步骤
   ========================================================= */
type WarningRow = {
  title: string
  text: string
  steps: string[]
}

const warningList = ref<WarningRow[]>([])

/** 兜底数据（接口失败/空时展示） */
const defaultWarnings: WarningRow[] = [
  {
    title: '鞍山市发布雷雨大风预警',
    text: '预计21日夜间23时，鞍山市将出现雷雨大风天气，局地伴有短时强降水、冰雹等强对流天气。',
    steps: [
      '政府及相关部门做好防风防雷准备工作。',
      '相关水域水上作业和过往船舶采取措施回港避风。',
      '关好门窗，加固搭建物，妥善安置室外物品。',
      '做好防御冰雹、雷电等灾害的应急工作。'
    ]
  },
  {
    title: '台安县发布雷雨大风预警',
    text: '预计21日夜间32时，台安县将出现雷雨大风天气，局地伴有短时强降水、冰雹等强对流天气。',
    steps: [
      '政府及相关部门做好防风防雷准备工作。',
      '相关水域水上作业和过往船舶采取措施回港避风。',
      '关好门窗，加固搭建物，妥善安置室外物品。',
      '做好防御冰雹、雷电等灾害的应急工作。'
    ]
  }
]

/** 清洗正文里的 \r\n / \n，去掉末尾空格 */
const normalizeText = (v: any) =>
  String(v ?? '')
    .replace(/\\r\\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()

/**
 * 把 content 拆成「正文 + 步骤列表」
 * content 里常见形式：
 *   1、xxx；2、xxx；3、xxx；4、xxx；
 *   1.xxx；2.xxx；3.xxx
 *   1. xxx 2. xxx 3. xxx
 * 这里统一按「数字+、/.+空格」切分。
 */
const parseContent = (raw: string): { text: string; steps: string[] } => {
  const content = normalizeText(raw)
  if (!content) return { text: '', steps: [] }

  // 用正则在「数字 + 顿号/点/空格」的位置切分
  const parts = content
    .split(/(?:\d+[、.．]\s*)/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  if (parts.length >= 2) {
    return { text: '', steps: parts }
  }

  return { text: content, steps: [] }
}

const fetchWarnings = async () => {
  try {
    const res: any = await getDamageWarning()
    console.log('[damagewarning] res=', res)

    const list = pickList(res)
    if (!list.length) {
      warningList.value = defaultWarnings
      return
    }

    warningList.value = list.slice(0, 2).map((it: any) => {
      const title = String(it?.title ?? '').trim()
      const snapshot = normalizeText(it?.snapshot)
      const { text, steps } = parseContent(it?.content)

      // 正文优先用 content 拆出来的 text；没有就用 snapshot
      const finalText = text || snapshot

      return {
        title: title || '灾害预警',
        text: finalText,
        steps
      }
    })
  } catch (e) {
    console.error('气象灾害预警查询失败', e)
    warningList.value = defaultWarnings
  }
}

onMounted(() => {
  fetchReliefStats()
  fetchWarnings()
})
</script>

<style scoped>
/* 样式保持与上一版一致，仅新增 steps 的兜底排版 */
.center-shell {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 140px 1fr;
  gap: 26px;
  min-height: 0;
}

.hazard-tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 48px;
  align-items: center;
}

.hazard-tab {
  height: 92px;
  width: 440px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(16, 66, 130, 0.65), rgba(6, 18, 48, 0.4)), rgba(6, 18, 48, 0.38);
  box-shadow:
    inset 0 0 26px rgba(54, 232, 255, 0.08),
    0 0 22px rgba(0, 130, 255, 0.12);
  display: grid;
  grid-template-columns: 90px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 0 26px;
  cursor: pointer;
  color: rgba(240, 251, 255, 0.92);
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
}

.hazard-tab::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    rgba(54, 232, 255, 0),
    rgba(54, 232, 255, 0.7),
    rgba(54, 232, 255, 0)
  );
  opacity: 0.35;
}

.hazard-tab--active {
  border-color: rgba(120, 255, 190, 0.35);
  background:
    linear-gradient(180deg, rgba(30, 160, 130, 0.62), rgba(6, 18, 48, 0.35)), rgba(6, 18, 48, 0.38);
}

.hazard-icon {
  width: 66px;
  height: 66px;
  border-radius: 18px;
  border: 1px solid rgba(120, 220, 255, 0.26);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.26), rgba(6, 18, 48, 0.18));
  box-shadow: 0 0 16px rgba(45, 216, 255, 0.12);
  justify-self: center;
}

.hazard-name {
  font-size: 26px;
  font-weight: 900;
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}

.hazard-num {
  font-size: 34px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  text-shadow: 0 0 14px rgba(45, 216, 255, 0.22);
}

.main {
  min-height: 0;
  display: grid;
  grid-template-columns: 700px minmax(1px, 1fr) 700px;
  gap: 60px;
}

.panel {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 92px 28px 26px;
  color: rgba(214, 238, 255, 0.86);
  box-sizing: border-box;
  min-height: 0;
}

.panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  pointer-events: none;
}

.panel-title {
  position: absolute;
  left: 28px;
  top: 18px;
  height: 54px;
  display: inline-flex;
  align-items: center;
  font-size: 40px;
  transform: skewX(-10deg);
  font-weight: 800;
  letter-spacing: 2px;
  color: #f8fbff;
  text-shadow:
    -2px -2px 3px rgba(255, 255, 255, 0.7),
    2px 2px 4px rgba(0, 20, 60, 0.5),
    0 0 6px #90c4ff,
    0 0 14px #3b8fff,
    0 0 24px #0f58d1;
}

.map-box {
  position: absolute;
  inset: 0;
  z-index: 2;
}

.panel--map {
  padding: 0;
  position: relative;
}

.panel--map::before {
  inset: 0;
  border-color: rgba(94, 197, 255, 0.1);
}

.map-stage {
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 0;
}

.panel--left .panel-title,
.panel--right .panel-title {
  left: 34px;
  top: 20px;
}

.panel--left {
  padding: 92px 34px 34px;
  transform: translateX(48px) perspective(1800px) rotateY(14deg);
  transform-origin: right center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform;
  height: 75%;
  align-self: center;
}

.quake-list {
  margin-top: 8px;
  height: 100%;
  min-height: 0;
  display: grid;
  gap: 18px;
  grid-auto-rows: 1fr;
  overflow: hidden;
}

.quake-item {
  min-height: 0;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.58);
  border-radius: 14px;
  padding: 10px 16px 10px 22px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 12px;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(0);
  overflow: hidden;
  box-shadow:
    inset 0 0 24px rgba(54, 232, 255, 0.08),
    0 10px 26px rgba(0, 10, 40, 0.35);
  will-change: transform;
  animation: cardTiltLeft 6.5s ease-in-out infinite;
}

.quake-item::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0));
  opacity: 0.6;
  pointer-events: none;
  transform: translateZ(1px);
}

.quake-item:hover {
  animation-play-state: paused;
  transform: translateZ(14px);
  border-color: rgba(120, 255, 240, 0.22);
  box-shadow:
    inset 0 0 28px rgba(54, 232, 255, 0.12),
    0 14px 34px rgba(0, 10, 40, 0.45);
}

.quake-item::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 18px;
  bottom: 18px;
  width: 2px;
  background: rgba(54, 232, 255, 0.12);
}

.quake-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: rgba(54, 232, 255, 0.95);
  box-shadow: 0 0 12px rgba(45, 216, 255, 0.25);
  margin-top: 6px;
  z-index: 1;
}

.quake-body {
  min-width: 0;
  display: grid;
  gap: 10px;
}

.quake-time {
  font-size: 32px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
}

.quake-desc {
  font-size: 30px;
  line-height: 1.45;
  color: rgba(214, 238, 255, 0.78);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.panel--right {
  padding: 92px 34px 34px;
  transform: translateX(-48px) perspective(1800px) rotateY(-14deg);
  transform-origin: left center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform;
  height: 75%;
  align-self: center;
}

.forecast {
  margin-top: 8px;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
}

.forecast-card {
  min-height: 0;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.5);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(0);
  box-shadow:
    inset 0 0 24px rgba(54, 232, 255, 0.08),
    0 10px 26px rgba(0, 10, 40, 0.35);
  will-change: transform;
  animation: cardTiltRight 6.5s ease-in-out infinite;
}

.forecast-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(225deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0));
  opacity: 0.55;
  pointer-events: none;
  transform: translateZ(1px);
}

.forecast-card:hover {
  animation-play-state: paused;
  transform: translateZ(14px);
  border-color: rgba(120, 255, 240, 0.22);
  box-shadow:
    inset 0 0 28px rgba(54, 232, 255, 0.12),
    0 14px 34px rgba(0, 10, 40, 0.45);
}

@keyframes cardTiltLeft {
  0%,
  100% {
    transform: translateZ(0);
  }
  50% {
    transform: translateZ(12px);
  }
}

@keyframes cardTiltRight {
  0%,
  100% {
    transform: translateZ(0);
  }
  50% {
    transform: translateZ(12px);
  }
}

.forecast-head {
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 18px;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgba(30, 20, 0, 0.9);
  background: rgba(255, 206, 74, 0.9);
  border-bottom: 1px solid rgba(255, 206, 74, 0.35);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.forecast-body {
  flex: 1;
  min-height: 0;
  padding: 10px 14px 12px;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
  box-sizing: border-box;
}

.forecast-text {
  font-size: 30px;
  line-height: 1.45;
  color: rgba(214, 238, 255, 0.78);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.forecast-steps {
  min-height: 0;
  display: grid;
  gap: 8px;
  overflow: hidden;
}

.forecast-step {
  font-size: 30px;
  line-height: 1.4;
  color: rgba(214, 238, 255, 0.82);
  padding-left: 14px;
  position: relative;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.forecast-step::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: rgba(54, 232, 255, 0.9);
  box-shadow: 0 0 10px rgba(45, 216, 255, 0.2);
  position: absolute;
  left: 0;
  top: 10px;
}

.map-base {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 80px;
  height: 260px;
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
  box-shadow: 0 0 26px rgba(45, 216, 255, 0.1);
}

.map-ring--a {
  width: 520px;
  height: 520px;
  border-color: rgba(54, 232, 255, 0.18);
}

.map-ring--b {
  width: 420px;
  height: 420px;
  border-color: rgba(54, 232, 255, 0.12);
}

.map-ring--c {
  width: 320px;
  height: 320px;
  border-color: rgba(54, 232, 255, 0.1);
}
</style>