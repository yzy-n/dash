<template>
  <div class="left-wrap">
    <section class="panel panel--command">
      <div class="panel-title">指挥体系</div>
      <div class="tabs">
        <button
          v-for="item in commandTabs"
          :key="item.key"
          type="button"
          class="tab"
          :class="{ 'tab--active': activeCommandTab === item.key }"
          :style="{ backgroundImage: `url(${tabBgUrl})` }"
          @click="activeCommandTab = item.key"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="command-flow">
        <div class="command-layer command-layer--top">
          <div class="flow-node flow-node--left">
            <span class="flow-icon flow-icon--bell"></span>
            <div class="flow-text">
              <div class="flow-name">检测预警</div>
              <div class="flow-sub">应急预警响应</div>
            </div>
          </div>
          <div class="flow-node flow-node--mid">
            <span class="flow-icon flow-icon--cloud"></span>
            <div class="flow-text">
              <div class="flow-name">预警信息</div>
              <div class="flow-sub">发布预警指令</div>
            </div>
          </div>
          <div class="flow-node flow-node--right">
            <span class="flow-icon flow-icon--doc"></span>
            <div class="flow-text">
              <div class="flow-name">应急处置</div>
              <div class="flow-sub">协同联动处置</div>
            </div>
          </div>
        </div>
        <div class="command-layer command-layer--bottom">
          <div class="flow-pill flow-pill--a">市应急指挥中心</div>
          <div class="flow-pill flow-pill--b">应急救援队伍</div>
          <div class="flow-pill flow-pill--c">应急物资库</div>
          <div class="flow-pill flow-pill--d">社会力量</div>
          <div class="flow-pill flow-pill--e">医疗保障</div>
          <div class="flow-pill flow-pill--f">交通保障</div>
          <div class="flow-pill flow-pill--g">通信保障</div>
        </div>
      </div>
    </section>

    <section class="panel panel--rescue">
      <div class="panel-title">应急救援</div>
      <div class="rescue-grid">
        <div class="rescue-team">
          <div class="team-grid">
            <div class="team-panel">
              <div class="team-panel-head">
                <div class="team-panel-title">应急救援队伍</div>
              </div>
              <div class="team-stats">
                <div class="stat-row">
                  <span class="stat-icon stat-icon--a"></span>
                  <span class="stat-label">应急救援队伍</span>
                  <span class="stat-value">{{ rescueTeam.fieldCnt }}</span>
                  <span class="stat-unit">个</span>
                </div>
                <div class="stat-row">
                  <span class="stat-icon stat-icon--b"></span>
                  <span class="stat-label">队伍总数</span>
                  <span class="stat-value">{{ rescueTeam.teamCnt }}</span>
                  <span class="stat-unit">支</span>
                </div>
                <div class="stat-row">
                  <span class="stat-icon stat-icon--c"></span>
                  <span class="stat-label">人员总数</span>
                  <span class="stat-value">{{ rescueTeam.peopleCnt }}</span>
                  <span class="stat-unit">人</span>
                </div>
              </div>
              <div class="team-tag">医疗卫生</div>
              <div class="team-list">
                <div class="team-row">鞍山市矿山救护大队</div>
                <div class="team-row">鞍山市红十字医疗救援队</div>
                <div class="team-row">鞍山市应急管理局综合救援队</div>
                <div class="team-row">鞍山市消防救援支队</div>
              </div>
            </div>

            <div class="team-panel">
              <div class="team-panel-head">
                <div class="team-panel-title">公益救援队伍</div>
              </div>
              <div class="team-stats">
                <div class="stat-row">
                  <span class="stat-icon stat-icon--a"></span>
                  <span class="stat-label">公益救援队伍</span>
                  <span class="stat-value">{{ publicTeam.fieldCnt }}</span>
                  <span class="stat-unit">个</span>
                </div>
                <div class="stat-row">
                  <span class="stat-icon stat-icon--b"></span>
                  <span class="stat-label">队伍总数</span>
                  <span class="stat-value">{{ publicTeam.teamCnt }}</span>
                  <span class="stat-unit">支</span>
                </div>
                <div class="stat-row">
                  <span class="stat-icon stat-icon--c"></span>
                  <span class="stat-label">人员总数</span>
                  <span class="stat-value">{{ publicTeam.peopleCnt }}</span>
                  <span class="stat-unit">人</span>
                </div>
              </div>
              <div class="team-tag">医疗卫生</div>
              <div class="team-list">
                <div class="team-row">鞍山市红十字医疗救援队</div>
                <div class="team-row">鞍山市红十字救护救援队</div>
                <div class="team-row team-row--empty"></div>
                <div class="team-row team-row--empty"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="rescue-material">
          <div class="material-head">
            <div class="material-title">应急救援物资</div>
            <div class="tabs tabs--mini">
              <button
                v-for="item in materialTabs"
                :key="item.key"
                type="button"
                class="tab"
                :class="{ 'tab--active': activeMaterialTab === item.key }"
                :style="{ backgroundImage: `url(${tabBgUrl})` }"
                @click="switchMaterialTab(item.key)"
              >
                {{ item.label }}
              </button>
            </div>
          </div>
          <div class="material-table">
            <div class="material-row material-row--head">
              <span>物资名称</span>
              <span class="material-row-qty">物资数量</span>
            </div>
            <div
              class="material-row"
              v-for="(item, idx) in materialList"
              :key="`${item.name}-${idx}`"
            >
              <span class="material-name" :title="item.name">{{ item.name }}</span>
              <span class="material-row-qty">
                <strong>{{ item.num }}</strong><em>{{ item.unit }}</em>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="panel panel--places">
      <div class="panel-title">应急场所</div>
      <div class="places-body">
        <div class="places-map">
          <svg class="places-svg" viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M125 48 L168 35 L222 46 L254 30 L292 46 L322 82 L356 106 L390 146 L409 186 L386 218 L356 252 L332 288 L294 304 L262 330 L228 322 L200 300 L172 292 L142 260 L118 228 L96 200 L84 160 L96 126 L112 98 Z"
              fill="rgba(124,242,255,0.18)"
              stroke="rgba(124,242,255,0.65)"
              stroke-width="3"
            />
            <path
              d="M160 112 L196 96 L232 116 L260 98 L290 116 L316 150 L294 182 L268 208 L236 196 L210 170 L180 166 L150 140 Z"
              fill="rgba(0,160,255,0.12)"
              stroke="rgba(54,232,255,0.32)"
              stroke-width="2"
            />
          </svg>
          <div
            v-for="marker in cityMarkers"
            :key="marker.city"
            class="place-marker"
            :style="{ left: marker.x + '%', top: marker.y + '%' }"
            :title="`${marker.city}：${marker.count} 个应急场所`"
          >
            <span></span>
            <em class="place-marker-label">{{ marker.city }}</em>
          </div>
        </div>
      </div>
    </section>

    <section class="panel panel--fund">
      <div class="panel-title">资金保障</div>
      <div class="fund-body">
        <div class="fund-split">
          <div class="fund-box">
            <div class="fund-box-title">收入</div>
            <div class="fund-box-chart">
              <EChart :option="fundIncomeOption" />
            </div>
          </div>
          <div class="fund-box">
            <div class="fund-box-title">支出</div>
            <div class="fund-box-chart">
              <EChart :option="fundExpenseOption" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import tabBgUrl from '@/assets/img/tabBg.png'
import {
  getEmergencyRescue,
  getRescueMaterials,
  getEmergencySite,
  getFinancialGuarantee
} from '@/api/disaster'

type FundGraphNode = {
  id: string
  label: string
  valueText: string
  size: number
  color: string
}

type FundGraphLink = {
  source: string
  target: string
}

const commandTabs = [
  { key: 'warning', label: '发布预警' },
  { key: 'response', label: '应急响应' },
  { key: 'monitor', label: '监测处置' }
]
const activeCommandTab = ref('warning')

/* =========================================================
   物资 tab
   ========================================================= */
const materialTabs = [
  { key: 'relief', label: '救灾物资', type: '1' },
  { key: 'medical', label: '医疗防疫物资', type: '2' }
]
const activeMaterialTab = ref('relief')

const activeMaterialType = computed(
  () => materialTabs.find((t) => t.key === activeMaterialTab.value)?.type ?? '1'
)

/* =========================================================
   通用解包
   ========================================================= */
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

/* =========================================================
   应急救援队伍 / 公益救援队伍
   ========================================================= */
type RescueTeamRow = {
  type: string
  label: string
  fieldCnt: number
  teamCnt: number
  peopleCnt: number
}

const rescueTeamList = ref<RescueTeamRow[]>([])

const fetchRescueTeam = async () => {
  try {
    const res: any = await getEmergencyRescue()
    console.log('[emergencyrescue] res=', res)

    const list = pickList(res)
    rescueTeamList.value = list.map((it: any) => ({
      type: String(it?.type ?? ''),
      label: String(it?.label ?? ''),
      fieldCnt: toNum(it?.fieldCnt),
      teamCnt: toNum(it?.teamCnt),
      peopleCnt: toNum(it?.peopleCnt)
    }))
  } catch (e) {
    console.error('应急救援队伍查询失败', e)
    rescueTeamList.value = []
  }
}

const rescueTeam = computed<RescueTeamRow>(() => {
  const found = rescueTeamList.value.find((r) => r.type === '1')
  return (
    found ?? { type: '1', label: '应急救援队伍', fieldCnt: 13, teamCnt: 47, peopleCnt: 3122 }
  )
})

const publicTeam = computed<RescueTeamRow>(() => {
  const found = rescueTeamList.value.find((r) => r.type === '2')
  return found ?? { type: '2', label: '公益救援队伍', fieldCnt: 6, teamCnt: 6, peopleCnt: 110 }
})

/* =========================================================
   应急救援物资
   ========================================================= */
type MaterialRow = {
  name: string
  num: number
  unit: string
}

const materialList = ref<MaterialRow[]>([])

const defaultMaterials: MaterialRow[] = [
  { name: '救灾帐篷', num: 2, unit: '顶' },
  { name: '折叠床', num: 756, unit: '张' },
  { name: '棉被', num: 4, unit: '套' },
  { name: '棉褥', num: 5904, unit: '条' },
  { name: '棉裤', num: 4054, unit: '条' },
  { name: '毛巾被', num: 1940, unit: '条' }
]

const fetchMaterials = async () => {
  try {
    const res: any = await getRescueMaterials(activeMaterialType.value)
    console.log('[rescuematerials] type=', activeMaterialType.value, 'res=', res)

    const list = pickList(res)
    if (!list.length) {
      materialList.value = defaultMaterials
      return
    }

    materialList.value = list.map((it: any) => ({
      name: String(it?.itemName ?? ''),
      num: toNum(it?.num),
      unit: String(it?.unit ?? '')
    }))
  } catch (e) {
    console.error('应急救援物资查询失败', e)
    materialList.value = defaultMaterials
  }
}

const switchMaterialTab = (key: string) => {
  if (activeMaterialTab.value === key) return
  activeMaterialTab.value = key
  fetchMaterials()
}

/* =========================================================
   应急场所
   ========================================================= */
type SiteRow = {
  type: string
  name: string
  city: string
  address: string
  lng: number
  lat: number
}

const CITY_POSITION: Record<string, { x: number; y: number }> = {
  台安县: { x: 22, y: 20 },
  岫岩县: { x: 72, y: 78 },
  海城市: { x: 38, y: 60 },
  铁西区: { x: 30, y: 36 },
  铁东区: { x: 46, y: 40 },
  立山区: { x: 44, y: 26 },
  千山区: { x: 56, y: 50 },
  高新区: { x: 60, y: 30 },
  经开区: { x: 20, y: 42 },
  风景区: { x: 70, y: 38 }
}

const siteList = ref<SiteRow[]>([])

const fetchSites = async () => {
  try {
    const res: any = await getEmergencySite()
    console.log('[emergencysite] res=', res)

    const list = pickList(res)
    const seen = new Set<string>()
    const valid: SiteRow[] = []

    for (const it of list) {
      const lng = Number(it?.longitude)
      const lat = Number(it?.latitude)
      const city = String(it?.cityName ?? '')

      if (!CITY_POSITION[city]) continue
      if (!Number.isFinite(lng) || !Number.isFinite(lat)) continue
      if (lng < 121 || lng > 125 || lat < 39 || lat > 43) continue

      const name = String(it?.name ?? '')
      const address = String(it?.address ?? '')
      const key = `${city}-${name}-${lng}-${lat}`
      if (seen.has(key)) continue
      seen.add(key)

      valid.push({
        type: String(it?.countyName ?? ''),
        name,
        city,
        address,
        lng,
        lat
      })

      if (valid.length >= 10) break
    }

    siteList.value = valid
  } catch (e) {
    console.error('应急场所查询失败', e)
    siteList.value = []
  }
}

const cityMarkers = computed(() => {
  const map = new Map<string, { city: string; count: number; x: number; y: number }>()

  for (const s of siteList.value) {
    const pos = CITY_POSITION[s.city]
    if (!pos) continue

    if (!map.has(s.city)) {
      map.set(s.city, { city: s.city, count: 0, x: pos.x, y: pos.y })
    }
    map.get(s.city)!.count += 1
  }

  return Array.from(map.values())
})

/* =========================================================
   资金保障（接口驱动）
   - 接口：/disaster/bigscreen/financialguarantee
   - 返回：{ data: { datalist: [{ oneMoney, twoMoney, threeMoney,
             fourMoney, fiveMoney, total, type, souseDate }] } }
   - type=1 收入 / type=2 支出
   - 字段映射（按后端返回 + 原来静态图语义推得）：
       支出：oneMoney=合计；twoMoney=工程抢险；threeMoney=个人救助；
             fourMoney=救灾物资采购；fiveMoney=应急专项
       收入（接口暂未返回）：沿用静态兜底
   ========================================================= */
type FundRow = {
  type: string
  oneMoney: number
  twoMoney: number
  threeMoney: number
  fourMoney: number
  fiveMoney: number
  total: number
}

const fundList = ref<FundRow[]>([])

const fmtMoney = (v: number) => {
  const n = Number(v)
  return Number.isFinite(n) ? n.toFixed(2) : '0.00'
}

const fetchFund = async () => {
  try {
    const res: any = await getFinancialGuarantee()
    console.log('[financialguarantee] res=', res)

    const list = pickList(res)
    fundList.value = list.map((it: any) => ({
      type: String(it?.type ?? ''),
      oneMoney: toNum(it?.oneMoney),
      twoMoney: toNum(it?.twoMoney),
      threeMoney: toNum(it?.threeMoney),
      fourMoney: toNum(it?.fourMoney),
      fiveMoney: toNum(it?.fiveMoney),
      total: toNum(it?.total)
    }))
  } catch (e) {
    console.error('资金保障查询失败', e)
    fundList.value = []
  }
}

/* =========================================================
   资金保障图：把 graph option 构造抽成工具
   ========================================================= */
const buildFundGraphOption = (
  rootId: string,
  nodes: FundGraphNode[],
  links: FundGraphLink[]
) => {
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: false,
        silent: true,
        draggable: false,
        center: ['50%', '50%'],
        zoom: 1.2,
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [0, 12],
        force: {
          repulsion: 1600,
          edgeLength: 240,
          gravity: 0.06,
          layoutAnimation: false
        },
        data: nodes.map((item) => {
          const isRoot = item.id === rootId
          return {
            id: item.id,
            name: `${item.label}\n${item.valueText}`,
            symbol: 'circle',
            symbolSize: item.size,
            itemStyle: {
              color: {
                type: 'radial',
                x: 0.35,
                y: 0.35,
                r: 0.9,
                colorStops: [
                  { offset: 0, color: 'rgba(255, 255, 255, 0.08)' },
                  { offset: 1, color: 'rgba(6, 18, 48, 0.78)' }
                ]
              },
              borderColor: item.color,
              borderWidth: isRoot ? 3 : 2,
              shadowBlur: 22,
              shadowColor: 'rgba(54, 232, 255, 0.16)'
            },
            label: {
              show: true,
              position: 'inside',
              color: 'rgba(240, 251, 255, 0.96)',
              fontWeight: isRoot ? 900 : 800,
              fontSize: isRoot ? 26 : 20,
              lineHeight: isRoot ? 28 : 24
            }
          }
        }),
        links,
        lineStyle: {
          color: 'rgba(54, 232, 255, 0.38)',
          width: 3,
          curveness: 0.22
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: { width: 4 }
        }
      }
    ]
  }
}

/* =========================================================
   收入图：接口若返回 type=1 则用接口；否则用静态兜底
   ========================================================= */
const buildStaticIncome = () => {
  const nodes: FundGraphNode[] = [
    { id: 't', label: '收入合计', valueText: '1057.62 万元', size: 180, color: '#36e8ff' },
    { id: 'b', label: '财政专项收入', valueText: '1057.62 万元', size: 124, color: '#ffbc40' },
    { id: 'b2', label: '公共预算收入', valueText: '0 万元', size: 124, color: '#7cf2ff' },
    { id: 'b3', label: '政府性基金收入', valueText: '0 万元', size: 124, color: '#79ffa8' }
  ]
  const links: FundGraphLink[] = [
    { source: 't', target: 'b' },
    { source: 't', target: 'b2' },
    { source: 't', target: 'b3' }
  ]
  return buildFundGraphOption('t', nodes, links)
}

const buildIncomeFromApi = (row: FundRow) => {
  // 收入字段按与支出同样的语义映射
  const nodes: FundGraphNode[] = [
    {
      id: 't',
      label: '收入合计',
      valueText: `${fmtMoney(row.oneMoney)} 万元`,
      size: 180,
      color: '#36e8ff'
    },
    {
      id: 'b',
      label: '财政专项收入',
      valueText: `${fmtMoney(row.twoMoney)} 万元`,
      size: 124,
      color: '#ffbc40'
    },
    {
      id: 'b2',
      label: '公共预算收入',
      valueText: `${fmtMoney(row.threeMoney)} 万元`,
      size: 124,
      color: '#7cf2ff'
    },
    {
      id: 'b3',
      label: '政府性基金收入',
      valueText: `${fmtMoney(row.fourMoney)} 万元`,
      size: 124,
      color: '#79ffa8'
    }
  ]
  const links: FundGraphLink[] = [
    { source: 't', target: 'b' },
    { source: 't', target: 'b2' },
    { source: 't', target: 'b3' }
  ]
  return buildFundGraphOption('t', nodes, links)
}

const fundIncomeOption = computed(() => {
  const row = fundList.value.find((r) => r.type === '1')
  return row ? buildIncomeFromApi(row) : buildStaticIncome()
})

/* =========================================================
   支出图：接口 type=2 时用接口，否则静态兜底
   - oneMoney=合计；twoMoney=工程抢险；threeMoney=个人救助；
     fourMoney=救灾物资采购；fiveMoney=应急专项
   ========================================================= */
const buildStaticExpense = () => {
  const nodes: FundGraphNode[] = [
    { id: 't', label: '支出合计', valueText: '1093.30 万元', size: 180, color: '#36e8ff' },
    { id: 'a', label: '应急专项支出', valueText: '293.67 万元', size: 124, color: '#7cf2ff' },
    { id: 'd', label: '个人救助补贴', valueText: '25.84 万元', size: 124, color: '#79ffa8' },
    { id: 'e', label: '救灾物资采购', valueText: '106.28 万元', size: 124, color: '#8b5cff' },
    { id: 'f', label: '工程抢险支出', valueText: '961.18 万元', size: 124, color: '#39d5ff' }
  ]
  const links: FundGraphLink[] = [
    { source: 't', target: 'a' },
    { source: 't', target: 'd' },
    { source: 't', target: 'e' },
    { source: 't', target: 'f' }
  ]
  return buildFundGraphOption('t', nodes, links)
}

const buildExpenseFromApi = (row: FundRow) => {
  const nodes: FundGraphNode[] = [
    {
      id: 't',
      label: '支出合计',
      valueText: `${fmtMoney(row.oneMoney)} 万元`,
      size: 180,
      color: '#36e8ff'
    },
    {
      id: 'a',
      label: '应急专项支出',
      valueText: `${fmtMoney(row.fiveMoney)} 万元`,
      size: 124,
      color: '#7cf2ff'
    },
    {
      id: 'd',
      label: '个人救助补贴',
      valueText: `${fmtMoney(row.threeMoney)} 万元`,
      size: 124,
      color: '#79ffa8'
    },
    {
      id: 'e',
      label: '救灾物资采购',
      valueText: `${fmtMoney(row.fourMoney)} 万元`,
      size: 124,
      color: '#8b5cff'
    },
    {
      id: 'f',
      label: '工程抢险支出',
      valueText: `${fmtMoney(row.twoMoney)} 万元`,
      size: 124,
      color: '#39d5ff'
    }
  ]
  const links: FundGraphLink[] = [
    { source: 't', target: 'a' },
    { source: 't', target: 'd' },
    { source: 't', target: 'e' },
    { source: 't', target: 'f' }
  ]
  return buildFundGraphOption('t', nodes, links)
}

const fundExpenseOption = computed(() => {
  const row = fundList.value.find((r) => r.type === '2')
  return row ? buildExpenseFromApi(row) : buildStaticExpense()
})

onMounted(() => {
  fetchRescueTeam()
  fetchMaterials()
  fetchSites()
  fetchFund()
})
</script>

<style scoped>
/* 完整样式，与上一版一致，未做改动 */
.left-wrap {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 26px;
  box-sizing: border-box;
}

.panel {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 92px 28px 26px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  border: 1px solid rgba(84, 188, 255, 0.24);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  color: rgba(214, 238, 255, 0.86);
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

.panel--fund {
  display: flex;
  flex-direction: column;
}

.tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 22px;
  margin: 6px 0 18px;
}

.tabs--mini {
  gap: 12px;
  margin: 0;
  width: auto;
  justify-content: flex-end;
}

.tab {
  height: 56px;
  min-width: 200px;
  padding: 0 32px;
  border: none;
  outline: none;
  background-color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  font-size: 22px;
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

.tabs--mini .tab {
  height: 40px;
  min-width: 140px;
  padding: 0 20px;
  font-size: 16px;
  line-height: 40px;
  letter-spacing: 1px;
}

.command-flow {
  margin-top: 18px;
  height: calc(100% - 86px);
  position: relative;
}

.command-layer {
  position: absolute;
  left: 0;
  right: 0;
}

.command-layer--top {
  top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.command-layer--bottom {
  bottom: 14px;
  height: 120px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 48px;
  gap: 12px 14px;
  padding: 0 6px;
  box-sizing: border-box;
}

.flow-node {
  height: 118px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 16px;
  box-sizing: border-box;
}

.flow-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  border: 1px solid rgba(120, 220, 255, 0.25);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.22), rgba(6, 18, 48, 0.18));
  box-shadow: 0 0 16px rgba(45, 216, 255, 0.1);
}

.flow-text {
  min-width: 0;
  display: grid;
  gap: 8px;
}

.flow-name {
  font-size: 32px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  letter-spacing: 2px;
}

.flow-sub {
  font-size: 28px;
  color: rgba(214, 238, 255, 0.72);
}

.flow-pill {
  height: 48px;
  border-radius: 999px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.82);
  letter-spacing: 1px;
  box-sizing: border-box;
}

.rescue-grid {
  margin-top: 10px;
  height: calc(100% - 10px);
  min-height: 0;
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 18px;
}

.rescue-team,
.rescue-material {
  min-height: 0;
}

.team-grid {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.team-panel {
  min-height: 0;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.team-panel-head {
  height: 54px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(20, 30, 75, 0.55);
  border-bottom: 1px solid rgba(89, 194, 255, 0.12);
  box-sizing: border-box;
}

.team-panel-title {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  letter-spacing: 2px;
}

.team-stats {
  padding: 14px 16px 10px;
  display: grid;
  gap: 10px;
  box-sizing: border-box;
}

.stat-row {
  display: grid;
  grid-template-columns: 26px 1fr auto auto;
  gap: 10px;
  align-items: center;
  font-size: 26px;
  color: rgba(214, 238, 255, 0.78);
}

.stat-icon {
  width: 20px;
  height: 20px;
  border-radius: 999px;
  border: 1px solid rgba(120, 220, 255, 0.28);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.28), rgba(6, 18, 48, 0.2));
  box-shadow: 0 0 10px rgba(54, 232, 255, 0.12);
}

.stat-value {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.16);
}

.stat-unit {
  color: rgba(214, 238, 255, 0.7);
}

.team-tag {
  width: 112px;
  height: 32px;
  margin: 2px auto 12px;
  border-radius: 999px;
  border: 1px solid rgba(54, 232, 255, 0.35);
  background: rgba(54, 232, 255, 0.12);
  color: rgba(240, 251, 255, 0.92);
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-list {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  border-top: 1px solid rgba(89, 194, 255, 0.12);
}

.team-row {
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 26px;
  color: rgba(214, 238, 255, 0.82);
  border-bottom: 1px solid rgba(89, 194, 255, 0.1);
  box-sizing: border-box;
}

.team-row--empty {
  opacity: 0;
}

.rescue-material {
  min-height: 0;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.material-head {
  height: 54px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(20, 30, 75, 0.55);
  border-bottom: 1px solid rgba(89, 194, 255, 0.12);
  box-sizing: border-box;
  flex: 0 0 auto;
}

.material-title {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  letter-spacing: 2px;
}

.material-table {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

.material-row {
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  align-items: center;
  padding: 0 16px;
  height: 56px;
  border-bottom: 1px solid rgba(89, 194, 255, 0.1);
  color: rgba(214, 238, 255, 0.82);
  font-size: 26px;
  box-sizing: border-box;
}

.material-row--head {
  position: sticky;
  top: 0;
  z-index: 1;
  height: 56px;
  background: rgba(20, 30, 75, 0.85);
  color: rgba(234, 240, 255, 0.95);
  font-weight: 800;
}

.material-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.material-row-qty {
  justify-self: end;
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  white-space: nowrap;
}

.material-row-qty strong {
  font-size: 22px;
  font-weight: 900;
  color: rgba(124, 242, 255, 0.95);
}

.material-row-qty em {
  font-style: normal;
  color: rgba(214, 238, 255, 0.65);
}

.places-body {
  margin-top: 10px;
  height: calc(100% - 10px);
  display: grid;
}

.places-map {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  border-radius: 14px;
  overflow: hidden;
}

.places-svg {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 78%;
  height: 78%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 18px rgba(54, 232, 255, 0.12));
}

.place-marker {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background: rgba(54, 232, 255, 0.95);
  box-shadow: 0 0 16px rgba(54, 232, 255, 0.18);
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.15s ease;
}

.place-marker:hover {
  transform: translate(-50%, -50%) scale(1.3);
}

.place-marker span {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  background: rgba(6, 18, 48, 0.85);
}

.place-marker-label {
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translate(-50%, -100%);
  font-style: normal;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #eaf7ff;
  white-space: nowrap;
  text-shadow:
    0 0 6px rgba(54, 232, 255, 0.7),
    0 0 12px rgba(54, 232, 255, 0.4);
  pointer-events: none;
  user-select: none;
}

.fund-body {
  margin-top: 10px;
  flex: 1;
  min-height: 0;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  border-radius: 14px;
  overflow: hidden;
  padding: 14px;
  box-sizing: border-box;
  display: flex;
}

.fund-split {
  flex: 1;
  min-height: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.fund-box {
  min-height: 0;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.36);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.fund-box-title {
  height: 46px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(240, 251, 255, 0.96);
  background: rgba(20, 30, 75, 0.42);
  border-bottom: 1px solid rgba(89, 194, 255, 0.12);
}

.fund-box-chart {
  flex: 1;
  min-height: 0;
}
</style>