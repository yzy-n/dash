<template>
  <div class="right-wrap">
    <div class="grid-2x2">
      <!-- 环保专项资金（接口驱动） -->
      <section class="panel panel--fund">
        <div class="panel-head">
          <div class="panel-title">环保专项资金</div>
          <select v-model="dateFund" class="fund-date" @change="fetchFund">
            <option v-for="item in fundDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
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

      <!-- 生态行政处罚情况（接口驱动） -->
      <section class="panel panel--punish">
        <div class="panel-head">
          <div class="panel-title">生态行政处罚情况</div>
          <div class="panel-subtitle">2022年6月至今</div>
        </div>
        <div class="punish-table-wrap">
          <div class="punish-table-head">
            <span>企业名称</span>
            <span>法人</span>
            <span>环境违法行为</span>
            <span>罚款金额</span>
          </div>
          <div class="punish-table-body">
            <div
              class="punish-row"
              v-for="(item, idx) in punishList"
              :key="`${item.company}-${idx}`"
            >
              <span class="c-company">{{ item.company }}</span>
              <span class="c-person">{{ item.person }}</span>
              <span class="c-desc" :title="item.breakTheLaw">{{ item.breakTheLaw }}</span>
              <span class="c-money">{{ item.money }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 12369环保举报（接口驱动） -->
      <section class="panel panel--report">
        <div class="panel-head">
          <div class="panel-title">12369环保举报</div>
          <div class="panel-subtitle">2023年2月至今</div>
        </div>
        <div class="report-list">
          <div
            class="report-item"
            v-for="(item, idx) in reportList"
            :key="`${item.target}-${idx}`"
          >
            <div class="r-row">
              <span class="r-label">举报类型：</span>
              <span>{{ item.type }}</span>
              <span class="r-label">举报对象：</span>
              <span>{{ item.target }}</span>
              <span class="r-label">举报方式：</span>
              <span>{{ item.method }}</span>
            </div>
            <div class="r-row">
              <span class="r-label">污染描述：</span>
              <span class="r-desc">{{ item.desc }}</span>
              <span class="tag-handled">{{ item.result }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 企业超标排放情况（接口驱动） -->
      <section class="panel panel--over">
        <div class="panel-head">
          <div class="panel-title">企业超标排放情况</div>
          <div class="panel-subtitle">2022年6月至今</div>
        </div>
        <div class="over-grid">
          <div
            class="over-card"
            v-for="(item, idx) in overList"
            :key="`${item.name}-${idx}`"
          >
            <div class="over-line">
              <span>企业名称：</span>{{ item.name }}
            </div>
            <div class="over-line">
              <span>监控点位名称：</span>{{ item.point }}
            </div>
            <div class="over-line">
              <span>检测时间：</span>{{ item.time }}
            </div>
            <div class="over-line">
              <span>监控状态：</span>
              <span
                class="tag-status"
                :class="item.status === '达标' ? 'is-ok' : 'is-bad'"
              >{{ item.status }}</span>
            </div>
            <div class="over-line">
              <span>超标污染物：</span>{{ item.pollutant }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import {
  getCreditRepair,
  getEnvProMoney,
  getReport,
  getPolluteInfoExt
} from '@/api/weather'

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

const buildFundGraphOption = (rootId: string, nodes: FundGraphNode[], links: FundGraphLink[]) => {
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
        zoom: 1.16,
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [0, 12],
        force: {
          repulsion: 1500,
          edgeLength: 220,
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
        }
      }
    ]
  }
}

/* =========================================================
   通用：多层解包
   ========================================================= */
const pickList = (res: any): any[] => {
  const body = res?.data ?? res
  if (Array.isArray(body?.datalist)) return body.datalist
  if (Array.isArray(body?.dataList)) return body.dataList
  if (Array.isArray(body?.data?.datalist)) return body.data.datalist
  if (Array.isArray(body?.data?.dataList)) return body.data.dataList
  return []
}

/* =========================================================
   环保专项资金（接口驱动）
   ========================================================= */
const fundDateOptions = ref<string[]>(['2022年全年', '2023年度'])
const dateFund = ref('2023年度')

const fundRawList = ref<any[]>([])

const fmtMoney = (v: any) => {
  const n = Number(v)
  return Number.isFinite(n) ? n.toFixed(2) : '0.00'
}

const fundPalette = ['#ffbc40', '#7cf2ff', '#79ffa8', '#8b5cff', '#39d5ff', '#ff7cd1']

const buildFundFromApi = (item: any) => {
  if (!item) return null

  const details: any[] = Array.isArray(item?.detailList) ? [...item.detailList] : []
  if (!details.length) return null

  details.sort((a, b) => (Number(a?.sort) || 0) - (Number(b?.sort) || 0))

  const nodes: FundGraphNode[] = [
    {
      id: 't',
      label: String(item?.total?.name ?? '合计'),
      valueText: `${fmtMoney(item?.total?.value)} 万元`,
      size: 140,
      color: '#36e8ff'
    },
    ...details.map((d: any, i: number) => ({
      id: `d${i}`,
      label: String(d?.name ?? ''),
      valueText: `${fmtMoney(d?.value)} 万元`,
      size: 96,
      color: fundPalette[i % fundPalette.length]
    }))
  ]

  const links: FundGraphLink[] = details.map((_: any, i: number) => ({
    source: 't',
    target: `d${i}`
  }))

  return buildFundGraphOption('t', nodes, links)
}

const buildStaticIncome = () => {
  const nodes: FundGraphNode[] = [
    { id: 't', label: '收入合计', valueText: '7364.07 万元', size: 140, color: '#36e8ff' },
    { id: 'b', label: '财政拨款收入', valueText: '6584.13 万元', size: 96, color: '#ffbc40' },
    { id: 'b2', label: '预算管理非税', valueText: '779.94 万元', size: 92, color: '#7cf2ff' },
    { id: 'b3', label: '政府性基金', valueText: '0.00 万元', size: 88, color: '#79ffa8' },
    { id: 'b4', label: '其他非税', valueText: '0.00 万元', size: 88, color: '#8b5cff' },
    { id: 'b5', label: '专户管理非税', valueText: '0.00 万元', size: 88, color: '#39d5ff' }
  ]
  const links: FundGraphLink[] = [
    { source: 't', target: 'b' },
    { source: 't', target: 'b2' },
    { source: 't', target: 'b3' },
    { source: 't', target: 'b4' },
    { source: 't', target: 'b5' }
  ]
  return buildFundGraphOption('t', nodes, links)
}

const buildStaticExpense = () => {
  const nodes: FundGraphNode[] = [
    { id: 't', label: '支出合计', valueText: '7364.07 万元', size: 140, color: '#36e8ff' },
    { id: 'a', label: '节能环保', valueText: '5723.36 万元', size: 96, color: '#7cf2ff' },
    { id: 'd', label: '社保就业', valueText: '844.37 万元', size: 90, color: '#79ffa8' },
    { id: 'e', label: '住房保障', valueText: '796.34 万元', size: 90, color: '#ffbc40' }
  ]
  const links: FundGraphLink[] = [
    { source: 't', target: 'a' },
    { source: 't', target: 'd' },
    { source: 't', target: 'e' }
  ]
  return buildFundGraphOption('t', nodes, links)
}

const fetchFund = async () => {
  try {
    const res: any = await getCreditRepair(dateFund.value)
    console.log('[creditrepair] souseDate=', dateFund.value, 'res=', res)
    fundRawList.value = pickList(res)
  } catch (e) {
    console.error('环保专项资金查询失败', e)
    fundRawList.value = []
  }
}

const fundIncomeOption = computed(() => {
  const item = fundRawList.value.find((x: any) => String(x?.type ?? '') === '收入')
  return buildFundFromApi(item) ?? buildStaticIncome()
})

const fundExpenseOption = computed(() => {
  const item = fundRawList.value.find((x: any) => String(x?.type ?? '') === '支出')
  return buildFundFromApi(item) ?? buildStaticExpense()
})

/* =========================================================
   生态行政处罚情况（接口驱动）
   ========================================================= */
type PunishRow = {
  company: string
  person: string
  breakTheLaw: string
  money: string
}

const punishList = ref<PunishRow[]>([])

const defaultPunish: PunishRow[] = [
  {
    company: '鞍山盛盟煤气化有限公司',
    person: '宁友吉',
    breakTheLaw:
      '焦炉烟囱排放口排放的二氧化硫排放浓度均值为733.0mg/m3，超过《炼焦化学工业污染物排放标准》...',
    money: '20万元'
  },
  {
    company: '鞍钢金属结构有限公司',
    person: '项士平',
    breakTheLaw:
      '我局于2022年6月2日对鞍钢金属结构有限公司脱硫灰贮存场进行现场检查，发现你公司脱硫灰...',
    money: '20万元'
  }
]

const fmtFine = (v: any) => {
  const n = Number(v)
  if (!Number.isFinite(n) || n === 0) {
    return String(v ?? '')
  }
  const wan = n / 10000
  const text = Number.isInteger(wan) ? String(wan) : wan.toFixed(2)
  return `${text}万元`
}

const fetchPunish = async () => {
  try {
    const res: any = await getEnvProMoney()
    console.log('[envpromoney] res=', res)

    const list = pickList(res)
    if (!list.length) {
      punishList.value = defaultPunish
      return
    }

    punishList.value = list.map((it: any) => ({
      company: String(it?.companyName ?? ''),
      person: String(it?.juridicalPerson ?? ''),
      // 接口字段名为 breaktheLaw（小写 t），本地字段名为 breakTheLaw
      breakTheLaw: String(it?.breaktheLaw ?? ''),
      money: fmtFine(it?.money)
    }))
  } catch (e) {
    console.error('生态行政处罚情况查询失败', e)
    punishList.value = defaultPunish
  }
}

/* =========================================================
   12369环保举报（接口驱动）
   ========================================================= */
type ReportRow = {
  type: string
  target: string
  method: string
  desc: string
  result: string
  createTime: string
}

const reportList = ref<ReportRow[]>([])

const defaultReport: ReportRow[] = [
  {
    type: '大气污染',
    target: '海城市王石镇',
    method: '微信投诉',
    desc: '在居民区印染服装，味道刺鼻，影响健康，影响生活！',
    result: '已处理',
    createTime: ''
  }
]

const fetchReport = async () => {
  try {
    const res: any = await getReport()
    console.log('[report] res=', res)

    const list = pickList(res)
    if (!list.length) {
      reportList.value = defaultReport
      return
    }

    reportList.value = list.map((it: any) => ({
      type: String(it?.reportType ?? ''),
      target: String(it?.reportObject ?? ''),
      method: String(it?.reportWay ?? ''),
      desc: String(it?.desc ?? ''),
      result: String(it?.result ?? '已处理'),
      createTime: String(it?.createTime ?? '')
    }))
  } catch (e) {
    console.error('12369环保举报查询失败', e)
    reportList.value = defaultReport
  }
}

/* =========================================================
   企业超标排放情况（接口驱动）
   - 接口：/weatherenvironment/bigscreen/polluteinfoext?pollutantname=氮氧化物
   - 返回：{ data: { dataList: [{ entname, monname, datetime,
             pollutantname, avgsc, avgzc, stdvalue, isok,
             overnum, status, dataType }] } }
   - 展示：
       企业名称     = entname
       监控点位名称 = monname
       检测时间     = datetime
       监控状态     = isok（达标/超标）
       超标污染物   = pollutantname
   ========================================================= */
type OverRow = {
  name: string
  point: string
  time: string
  status: string
  pollutant: string
}

const overList = ref<OverRow[]>([])

/** 兜底数据（接口失败/空时展示） */
const defaultOver: OverRow[] = [
  {
    name: '海城市美菱氧化镁厂',
    point: '1拖12轻烧窑3号',
    time: '2023-03-18 23:00:00',
    status: '达标',
    pollutant: '氮氧化物'
  },
  {
    name: '海城市宽祥矿产品制造有限公司',
    point: '海城市宽祥矿产品制造有限公...',
    time: '2023-03-18 23:00:00',
    status: '达标',
    pollutant: '氮氧化物'
  },
  {
    name: '海城市光大高纯镁砂有限责任公司',
    point: '海城市光大高纯镁砂有限责任...',
    time: '2023-03-18 23:00:00',
    status: '达标',
    pollutant: '氮氧化物'
  },
  {
    name: '海城市瑞益耐火材料制造有限公司',
    point: '海城市瑞益耐火材料制造有限...',
    time: '2023-03-18 23:00:00',
    status: '达标',
    pollutant: '氮氧化物'
  }
]

const fetchOver = async () => {
  try {
    const res: any = await getPolluteInfoExt('氮氧化物')
    console.log('[polluteinfoext] pollutantname=氮氧化物 res=', res)

    const list = pickList(res)
    if (!list.length) {
      overList.value = defaultOver
      return
    }

    overList.value = list.slice(0, 4).map((it: any) => ({
      name: String(it?.entname ?? ''),
      point: String(it?.monname ?? ''),
      time: String(it?.datetime ?? ''),
      status: String(it?.isok ?? ''),
      pollutant: String(it?.pollutantname ?? '')
    }))
  } catch (e) {
    console.error('企业超标排放情况查询失败', e)
    overList.value = defaultOver
  }
}

onMounted(() => {
  fetchFund()
  fetchPunish()
  fetchReport()
  fetchOver()
})
</script>

<style scoped>
.right-wrap {
  width: 100%;
  height: 100%;
  min-height: 0;
}
.grid-2x2 {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 26px;
  min-height: 0;
}
.panel {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 82px 28px 26px;
  border: 1px solid rgba(84, 188, 255, 0.24);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  color: rgba(214, 238, 255, 0.86);
  box-sizing: border-box;
  min-height: 0;
}

.panel--fund {
  display: flex;
  flex-direction: column;
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
  left: 0;
  right: 0;
  top: 0;
  height: 82px;
  padding: 0 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.panel-head::before {
  content: '';
  position: absolute;
  left: 18px;
  right: 18px;
  top: 22px;
  bottom: 16px;
  border-radius: 16px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  background: linear-gradient(180deg, rgba(6, 27, 72, 0.16), rgba(4, 16, 44, 0));
  box-shadow: inset 0 0 26px rgba(54, 232, 255, 0.05);
  pointer-events: none;
}
.panel-head::after {
  content: '';
  position: absolute;
  left: 40px;
  right: 40px;
  bottom: 12px;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(54, 232, 255, 0),
    rgba(54, 232, 255, 0.42),
    rgba(54, 232, 255, 0)
  );
  opacity: 0.65;
  pointer-events: none;
}
.panel-title {
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
  position: relative;
  z-index: 1;
}
.panel-subtitle {
  font-size: 20px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.62);
  position: relative;
  z-index: 1;
}

/* 时间下拉 */
.fund-date {
  height: 36px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(78, 184, 255, 0.22);
  background: rgba(5, 26, 66, 0.45);
  color: rgba(209, 234, 255, 0.86);
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  cursor: pointer;
  outline: none;
}

/* 环保专项资金 */
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

/* ================= 行政处罚表格 ================= */
.punish-table-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
}
.punish-table-head {
  display: grid;
  grid-template-columns: 2fr 0.8fr 3fr 1fr;
  font-weight: 900;
  color: #fff;
  font-size: 30px;
  padding: 10px 8px;
  background: rgba(20, 30, 75, 0.42);
}
.punish-table-body {
  flex: 1;
  overflow-y: auto;
}
.punish-row {
  display: grid;
  grid-template-columns: 2fr 0.8fr 3fr 1fr;
  padding: 12px 8px;
  border-top: 1px solid rgba(89, 194, 255, 0.12);
  font-size: 22px;
  gap: 6px;
  margin-top: 20px;
  align-items: start;
}
.c-company {
  color: rgba(240, 251, 255, 0.96);
  word-break: break-all;
}
.c-person {
  color: rgba(214, 238, 255, 0.86);
  word-break: break-all;
}
.c-desc {
  color: rgba(214, 238, 255, 0.86);
  word-break: break-word;
  white-space: normal;
  line-height: 1.4;
}
.c-money {
  color: #ffdd44;
  font-weight: bold;
}

/* 12369举报 */
.report-list {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 60px;
}
.report-item {
  border: 1px solid rgba(89, 194, 255, 0.14);
  border-radius: 12px;
  padding: 14px;
  background: rgba(4, 16, 44, 0.35);
}
.r-row {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 8px;
  font-size: 30px;
}
.r-label {
  color: #82b8e8;
  white-space: nowrap;
}
.r-desc {
  flex: 1;
  word-break: break-word;
}
.tag-handled {
  margin-left: auto;
  background: #278c47;
  color: #fff;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
}

/* 企业超标排放 */
.over-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  height: 100%;
  margin-top: 30px;
}
.over-card {
  border: 1px solid rgba(89, 194, 255, 0.14);
  border-radius: 12px;
  padding: 14px;
  background: rgba(4, 16, 44, 0.35);
}
.over-line {
  font-size: 30px;
  margin-bottom: 6px;
}
.over-line span {
  color: #82b8e8;
}
/* 监控状态颜色：达标绿色，超标红色 */
.tag-status.is-ok {
  color: #48e08c;
  font-weight: bold;
}
.tag-status.is-bad {
  color: #ff4444;
  font-weight: bold;
}
</style>