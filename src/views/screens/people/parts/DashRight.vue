<template>
  <aside class="right">
    <div class="col">
      <section class="panel market-panel">
        <div class="panel-head">
          <div class="panel-title">教育水平</div>
          <select v-model="dateCapacity" class="panel-date" @change="fetchEduLevel">
            <option v-for="item in eduLevelDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="water-chart">
          <pie3dChart :data="pieData" :innerRadius="0.6" :minThickness="0.15" :maxThickness="3" />
        </div>
      </section>

      <section class="panel panel--tower">
        <div class="panel-head">
          <div class="panel-title">自然变动情况</div>
          <select v-model="dateElectric" class="panel-date" @change="fetchNaturalChange">
            <option v-for="item in naturalDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="nature-wrap">
          <div class="nature-col nature-col-left">
            <div class="nature-item">
              <div class="nature-label">年平均人口</div>
              <div class="nature-value">
                {{ naturalData.avgPopuNum }}<span class="nature-unit">万人</span>
              </div>
            </div>
            <div class="nature-item">
              <div class="nature-label">出生人口</div>
              <div class="nature-value">
                {{ naturalData.birthPopuNum }}<span class="nature-unit">人</span>
              </div>
            </div>
            <div class="nature-item">
              <div class="nature-label">出生率</div>
              <div class="nature-value">
                {{ naturalData.birthPopuRate }}<span class="nature-unit">‰</span>
              </div>
            </div>
          </div>
          <div class="nature-col nature-col-center">
            <div class="nature-hex-icon"></div>
            <div class="nature-hex-icon"></div>
            <div class="nature-hex-icon"></div>
          </div>
          <div class="nature-col nature-col-right">
            <div class="nature-item">
              <div class="nature-label">自然增长率</div>
              <div class="nature-value">
                {{ naturalData.naturalIncreaseRate }}<span class="nature-unit">‰</span>
              </div>
            </div>
            <div class="nature-item">
              <div class="nature-label">死亡人口</div>
              <div class="nature-value">
                {{ naturalData.deathPopuNum }}<span class="nature-unit">人</span>
              </div>
            </div>
            <div class="nature-item">
              <div class="nature-label">死亡率</div>
              <div class="nature-value">
                {{ naturalData.deathPopuRate }}<span class="nature-unit">‰</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="col">
      <section class="panel panel--water">
        <div class="panel-head">
          <div class="panel-title">基本养老保险情况</div>
          <select v-model="dateWater" class="panel-date" @change="fetchBaseEndIns">
            <option v-for="item in pensionDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="water-chart">
          <div class="pension-summary">
            <div class="pension-city">全市合计</div>
            <div class="pension-metric">
              <div class="pension-icon pension-icon--worker"></div>
              <div class="pension-meta">
                <div class="pension-label">参保职工人数</div>
                <div class="pension-value">
                  <span class="num">{{ pensionSummary.worker }}</span
                  ><span class="unit">万人</span>
                </div>
              </div>
            </div>
            <div class="pension-metric">
              <div class="pension-icon pension-icon--retire"></div>
              <div class="pension-meta">
                <div class="pension-label">参保离退休人数</div>
                <div class="pension-value">
                  <span class="num">{{ pensionSummary.retire }}</span
                  ><span class="unit">万人</span>
                </div>
              </div>
            </div>
          </div>
          <div class="pension-chart">
            <pensionChart :data="pensionRows" />
          </div>
        </div>
      </section>

      <section class="panel panel--heat">
        <div class="panel-head">
          <div class="panel-title">婚姻情况</div>
          <select v-model="dateHeat" class="panel-date" @change="fetchMaritalStatus">
            <option v-for="item in marryDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="heat-chart">
          <marryChart :data="marryData" />
        </div>
      </section>
    </div>

    <div class="col">
      <section class="panel panel--red">
        <div class="panel-head red-panel-head">
          <div class="panel-title">残疾人信息</div>
          <select v-model="dateRed" class="panel-date" @change="fetchHandicapData">
            <option v-for="item in disabledDateOptions" :key="item" :value="item">
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
            :class="{ 'tab--active': tab === activeDisabledTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="handleDisabledTabClick(tab)"
          >
            {{ tab }}
          </button>
        </div>
        <div class="aed-chart">
          <roseChart :data="houseData" :tabKey="activeDisabledTab" />
        </div>
      </section>

      <section class="panel panel--aed">
        <div class="panel-head red-panel-head">
          <div class="panel-title">社会救助情况</div>
          <select v-model="dateAssist" class="panel-date" @change="fetchSingleData">
            <option v-for="item in assistDateOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="panel-tabs panel-tabs--center">
          <button
            v-for="tab in socialAssistTabs"
            :key="tab"
            type="button"
            class="tab"
            :class="{ 'tab--active': tab === activeAssistTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="handleAssistTabClick(tab)"
          >
            {{ tab }}
          </button>
        </div>
        <div class="aed-chart social-assist-wrap">
          <div class="assist-card">
            <div class="assist-icon assist-icon‑city"></div>
            <div class="assist‑label">城市居民<br />最低生活保障人数</div>
            <div class="assist‑num">
              {{ assistData.cityNum }}<span class="assist‑unit">人</span>
            </div>
          </div>
          <div class="assist-card">
            <div class="assist-icon assist-icon‑rural"></div>
            <div class="assist‑label">农村居民<br />最低生活保障人数</div>
            <div class="assist‑num">
              {{ assistData.ruralNum }}<span class="assist‑unit">人</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import pie3dChart from '@/views/screens/people/charts/3d.vue'
import pensionChart from '@/views/screens/people/charts/pension.vue'
import roseChart from '@/views/screens/people/charts/rose.vue'
import marryChart from '@/views/screens/people/charts/marry.vue'
import tabBgUrl from '@/assets/img/tabBg.png'
// ⭐ 引入接口
import {
  getEduLevel,
  getBaseEndIns,
  getHandicapType,
  getHandicapAge,
  getHandicapSex,
  getHandicapInhabitant,
  getNaturalChange,
  getMaritalStatus,
  getSingleData
} from '@/api/people'

// ============================================================
// ⭐ 教育水平
// ============================================================
const eduLevelDateOptions = ['2022年统计数据', '2023年统计年鉴', '2024年统计年鉴', '2025测试']
const dateCapacity = ref<string>('2025测试')
const pieData = ref<Array<{ name: string; value: number }>>([])

const fetchEduLevel = async () => {
  try {
    const res: any = await getEduLevel(dateCapacity.value)
    console.log('[edulevel] res=', res)
    const list: any[] = res?.data?.dataList ?? res?.dataList ?? []
    pieData.value = list.map((item) => ({
      name: item.label ?? '',
      value: Number(item.studentNum ?? 0)
    }))
  } catch (e) {
    console.error('教育水平查询失败', e)
    pieData.value = []
  }
}

// ============================================================
// ⭐ 自然变动情况
// ============================================================
const naturalDateOptions = ['2022年统计数据']
const dateElectric = ref<string>('2022年统计数据')

const naturalData = ref({
  avgPopuNum: 0,
  birthPopuNum: 0,
  birthPopuRate: 0,
  deathPopuNum: 0,
  deathPopuRate: 0,
  naturalIncreaseRate: 0
})

const fetchNaturalChange = async () => {
  try {
    const res: any = await getNaturalChange(dateElectric.value)
    const row = res?.data?.dataList?.[0] ?? res?.dataList?.[0] ?? {}
    naturalData.value = {
      avgPopuNum: Number(row.avgPopuNum ?? 0),
      birthPopuNum: Number(row.birthPopuNum ?? 0),
      birthPopuRate: Number(row.birthPopuRate ?? 0),
      deathPopuNum: Number(row.deathPopuNum ?? 0),
      deathPopuRate: Number(row.deathPopuRate ?? 0),
      naturalIncreaseRate: Number(row.naturalIncreaseRate ?? 0)
    }
  } catch (e) {
    console.error('自然变动情况查询失败', e)
  }
}

// ============================================================
// ⭐ 基本养老保险
// ============================================================
const pensionDateOptions = ['2022年统计数据', '2023年统计年鉴', '2024年统计年鉴']
const dateWater = ref<string>('2024年统计年鉴')
const pensionRows = ref<Array<{ name: string; worker: number; retire: number }>>([])

const fetchBaseEndIns = async () => {
  try {
    const res: any = await getBaseEndIns(dateWater.value)
    const list: any[] = res?.data?.dataList ?? res?.dataList ?? []
    pensionRows.value = list.map((item) => ({
      name: item.areaName ?? '',
      worker: Number(item.labourNum ?? 0),
      retire: Number(item.retireNum ?? 0)
    }))
  } catch (e) {
    console.error('基本养老保险查询失败', e)
    pensionRows.value = []
  }
}

const pensionSummary = computed(() => {
  const worker = pensionRows.value.reduce((s, r) => s + (Number(r.worker) || 0), 0)
  const retire = pensionRows.value.reduce((s, r) => s + (Number(r.retire) || 0), 0)
  return {
    worker: worker.toFixed(2),
    retire: retire.toFixed(2)
  }
})

// ============================================================
// ⭐ 婚姻情况
// ============================================================
const marryDateOptions = ['2021', '2020', '2019', '2018', '2017']
const dateHeat = ref<string>('2021')

const marryData = ref({
  firstNum: 0,
  againNum: 0,
  remarryNum: 0,
  divorceNum: 0,
  divorceRate: 0
})

const fetchMaritalStatus = async () => {
  try {
    const res: any = await getMaritalStatus(dateHeat.value)
    const row = res?.data?.dataList?.[0] ?? res?.dataList?.[0] ?? {}
    marryData.value = {
      firstNum: Number(row.firstNum ?? 0),
      againNum: Number(row.againNum ?? 0),
      remarryNum: Number(row.remarryNum ?? 0),
      divorceNum: Number(row.divorceNum ?? 0),
      divorceRate: Number(row.divorceRate ?? 0)
    }
  } catch (e) {
    console.error('婚姻情况查询失败', e)
  }
}

// ============================================================
// ⭐ 残疾人信息
// ============================================================
const disabledDateOptions = ['2023-05']
const dateRed = ref<string>('2023-05')

const houseTabs = ['类型统计', '年龄段统计', '性别统计', '户口统计'] as const
const activeDisabledTab = ref<(typeof houseTabs)[number]>(houseTabs[0])
const houseData = ref<Array<{ name: string; value: number }>>([])

const fetchHandicapData = async () => {
  const date = dateRed.value
  const tab = activeDisabledTab.value
  try {
    let list: any[] = []
    if (tab === '类型统计') {
      const res: any = await getHandicapType(date)
      list = res?.data?.dataList ?? res?.dataList ?? []
      houseData.value = list.map((item) => ({
        name: item.type ?? '',
        value: Number(item.num ?? 0)
      }))
    } else if (tab === '年龄段统计') {
      const res: any = await getHandicapAge(date)
      list = res?.data?.dataList ?? res?.dataList ?? []
      houseData.value = list.map((item) => ({
        name: item.agePart ?? '',
        value: Number(item.num ?? 0)
      }))
    } else if (tab === '性别统计') {
      const res: any = await getHandicapSex(date)
      list = res?.data?.dataList ?? res?.dataList ?? []
      let menTotal = 0
      let womenTotal = 0
      list.forEach((item) => {
        menTotal += Number(item.men ?? 0)
        womenTotal += Number(item.women ?? 0)
      })
      houseData.value = [
        { name: '男性', value: menTotal },
        { name: '女性', value: womenTotal }
      ]
    } else if (tab === '户口统计') {
      const res: any = await getHandicapInhabitant(date)
      list = res?.data?.dataList ?? res?.dataList ?? []
      let farmTotal = 0
      let nonFarmTotal = 0
      list.forEach((item) => {
        farmTotal += Number(item.farm ?? 0)
        nonFarmTotal += Number(item.nonFarm ?? 0)
      })
      houseData.value = [
        { name: '农业户口', value: farmTotal },
        { name: '非农业户口', value: nonFarmTotal }
      ]
    }
  } catch (e) {
    console.error('残疾人信息查询失败', e)
    houseData.value = []
  }
}

const handleDisabledTabClick = (tab: (typeof houseTabs)[number]) => {
  if (activeDisabledTab.value === tab) return
  activeDisabledTab.value = tab
  fetchHandicapData()
}

// ============================================================
// ⭐ 社会救助情况（接口版）
// ============================================================
const socialAssistTabs = ['城区合计', '海城市', '台安县', '岫岩县'] as const
const activeAssistTab = ref<(typeof socialAssistTabs)[number]>(socialAssistTabs[0])

// 时间选项（默认给一个，接口返回 timeOptions 会覆盖）
const assistDateOptions = ref<string[]>(['2024年统计年鉴'])
const dateAssist = ref<string>('2024年统计年鉴')

// 接口返回的原始列表（按 areaName 索引）
const assistList = ref<Array<{ areaName: string; cityNum: number; countyNum: number }>>([])

// 当前 tab 显示的数据
const assistData = computed(() => {
  const target = assistList.value.find((i) => i.areaName === activeAssistTab.value)
  return {
    cityNum: target?.cityNum ?? 0,
    ruralNum: target?.countyNum ?? 0
  }
})

const fetchSingleData = async () => {
  try {
    const res: any = await getSingleData(dateAssist.value)
    console.log('[singledata] res=', res)

    const list: any[] = res?.data?.dataList ?? res?.dataList ?? []
    assistList.value = list.map((item) => ({
      areaName: item.areaName ?? '',
      cityNum: Number(item.cityNum ?? 0),
      countyNum: Number(item.countyNum ?? 0)
    }))

    // 覆盖时间选项
    const options: string[] = res?.data?.summary?.timeOptions ?? res?.summary?.timeOptions ?? []
    if (options.length) {
      assistDateOptions.value = options
      if (!options.includes(dateAssist.value)) {
        dateAssist.value = res?.data?.summary?.souseDate ?? res?.summary?.souseDate ?? options[0]
      }
    }
    console.log('[singledata] assistList=', assistList.value)
  } catch (e) {
    console.error('社会救助情况查询失败', e)
    assistList.value = []
  }
}

// tab 点击（不需要重新请求，因为接口一次性返回全部区域）
const handleAssistTabClick = (tab: (typeof socialAssistTabs)[number]) => {
  activeAssistTab.value = tab
}

onMounted(() => {
  fetchEduLevel()
  fetchNaturalChange()
  fetchBaseEndIns()
  fetchMaritalStatus()
  fetchHandicapData()
  fetchSingleData()
})
</script>

<style scoped>
/* 完全保持原样 */
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
.nature-wrap {
  margin-top: 90px;
  height: calc(100% - 90px);
  display: grid;
  grid-template-columns: 1fr 120px 1fr;
  align-items: center;
  gap: 16px;
  padding: 0 12px;
  box-sizing: border-box;
}
.nature-col {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.nature-col-center {
  gap: 40px;
  align-items: center;
}
.nature-hex-icon {
  width: 80px;
  height: 80px;
  border: 1px solid rgba(84, 188, 255, 0.3);
  border-radius: 12px;
  background: rgba(20, 60, 120, 0.25);
}
.nature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nature-label {
  font-size: 34px;
  color: #cce6ff;
  margin-bottom: 8px;
  background: linear-gradient(90deg, rgba(24, 90, 170, 0.6), rgba(12, 50, 100, 0.4));
  border-radius: 12px;
  padding: 4px 22px;
}
.nature-value {
  font-size: 36px;
  color: #ffdd66;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 220, 80, 0.25);
}
.nature-unit {
  font-size: 22px;
  color: #b2e4ff;
  margin-left: 4px;
}
.panel--tower {
  flex: 1;
  min-height: 0;
  padding-top: 86px;
}
.red-panel-head {
  justify-content: space-between;
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
  appearance: none;
  outline: none;
  cursor: pointer;
  font: inherit;
  text-align: center;
}
.panel-date option {
  background-color: #0a1f4a;
  color: rgba(214, 238, 255, 0.92);
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
.pension-summary {
  height: 72px;
  border-radius: 14px;
  border: 1px solid rgba(84, 188, 255, 0.18);
  background: linear-gradient(
    90deg,
    rgba(20, 90, 180, 0.38),
    rgba(6, 18, 48, 0.22) 55%,
    rgba(6, 18, 48, 0.12)
  );
  display: grid;
  grid-template-columns: 220px 1fr 1fr;
  align-items: center;
  overflow: hidden;
  margin-bottom: 12px;
}
.pension-city {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.9);
  background: linear-gradient(135deg, rgba(40, 160, 255, 0.58), rgba(12, 60, 120, 0.18));
  border-right: 1px solid rgba(84, 188, 255, 0.18);
  text-shadow: 0 0 16px rgba(45, 216, 255, 0.2);
}
.pension-metric {
  height: 100%;
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 10px;
  align-items: center;
  padding: 0 14px;
  box-sizing: border-box;
}
.pension-metric + .pension-metric {
  border-left: 1px solid rgba(84, 188, 255, 0.18);
}
.pension-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(84, 188, 255, 0.22);
  background: radial-gradient(circle at 30% 30%, rgba(54, 232, 255, 0.28), rgba(6, 18, 48, 0.06));
  box-shadow: 0 0 22px rgba(45, 216, 255, 0.14);
  position: relative;
}
.pension-icon::after {
  content: '';
  position: absolute;
  inset: 12px;
  border-radius: 50%;
  border: 2px solid rgba(240, 251, 255, 0.65);
  opacity: 0.55;
}
.pension-icon--retire {
  filter: hue-rotate(28deg) saturate(1.15);
}
.pension-label {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.72);
}
.pension-value {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 4px;
}
.pension-value .num {
  font-size: 34px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 14px rgba(45, 216, 255, 0.2);
}
.pension-value .unit {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.6);
}
.pension-chart {
  height: calc(100% - 84px);
  min-height: 0;
}
.water-chart {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
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
  margin-top: 90px;
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
.social-assist-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 24px 16px;
  align-content: center;
}
.assist-card {
  height: 100%;
  min-height: 180px;
  border-radius: 12px;
  border: 1px solid rgba(84, 188, 255, 0.24);
  background: rgba(10, 30, 62, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.assist-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid rgba(84, 188, 255, 0.35);
  background: radial-gradient(circle at 30% 30%, rgba(54, 232, 255, 0.3), rgba(6, 18, 48, 0.1));
  box-shadow: 0 0 24px rgba(54, 232, 255, 0.15);
}
.assist‑label {
  font-size: 36px;
  color: #e6f4ff;
  text-align: center;
  line-height: 1.4;
}
.assist‑num {
  font-size: 42px;
  color: #87e8f5;
  font-weight: bold;
  text-shadow: 0 0 14px rgba(60, 210, 240, 0.25);
}
.assist‑unit {
  font-size: 22px;
  color: #c6ecf8;
  margin-left: 4px;
}
</style>
