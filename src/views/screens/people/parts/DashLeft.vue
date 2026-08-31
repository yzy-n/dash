<template>
  <aside class="left">
    <section class="panel panel--electric">
      <div class="panel-head">
        <div class="panel-title">进5年人口总数</div>
        <select v-model="dateElectric" class="panel-date">
          <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="capacity-body">
        <div class="capacity-chart">
          <Five />
        </div>
      </div>
    </section>

    <section class="panel panel--capacity">
      <div class="panel-head">
        <div class="panel-title">城乡人口比例</div>
        <select v-model="dateCapacity" class="panel-date">
          <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="capacity-body">
        <div class="pop-metrics">
          <div
            v-for="item in popMetrics"
            :key="item.key"
            class="pop-metric"
            :class="`pop-metric--${item.tone}`"
          >
            <div class="pop-metric-label">{{ item.label }}</div>
            <div class="pop-metric-value">
              <span class="num">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
            <div class="pop-metric-icon"></div>
          </div>
        </div>
        <div class="capacity-chart">
          <County />
        </div>
      </div>
    </section>

    <section class="panel panel--pop-state">
      <div class="panel-head">
        <div class="panel-title">城乡人口情况</div>
        <select v-model="dateInvest" class="panel-date">
          <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="pop-state-body">
        <div class="pop-side pop-side--left">
          <div class="pop-side-total">
            <div class="pop-side-total-label">增加合计</div>
            <div class="pop-side-total-value">
              <span class="num">{{ popIncreaseTotal }}</span>
              <span class="unit">人</span>
            </div>
          </div>
          <div class="pop-side-list">
            <div v-for="row in popIncreaseRows" :key="row.label" class="pop-side-row">
              <div class="pop-side-row-label">{{ row.label }}</div>
              <div class="pop-side-row-value">
                <span class="num">{{ row.value }}</span>
                <span class="unit">人</span>
              </div>
            </div>
          </div>
        </div>

        <div class="pop-center">
          <div class="pop-center-stage">
            <div class="pop-center-ring"></div>
            <div class="pop-center-doc"></div>
          </div>
        </div>

        <div class="pop-side pop-side--right">
          <div class="pop-side-total">
            <div class="pop-side-total-label">减少合计</div>
            <div class="pop-side-total-value">
              <span class="num">{{ popDecreaseTotal }}</span>
              <span class="unit">人</span>
            </div>
          </div>
          <div class="pop-side-list">
            <div v-for="row in popDecreaseRows" :key="row.label" class="pop-side-row">
              <div class="pop-side-row-label">{{ row.label }}</div>
              <div class="pop-side-row-value">
                <span class="num">{{ row.value }}</span>
                <span class="unit">人</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="panel panel--pile">
      <div class="panel-head">
        <div class="panel-title">全市人口总数</div>
        <select v-model="dateElectric" class="panel-date">
          <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="capacity-chart">
        <Total :x-axis-data="xData" :data1="houseData" :data2="peopleData" />
      </div>
    </section>

    <section class="panel panel--resume">
      <div class="panel-head">
        <div class="panel-title">人口密度</div>
        <select v-model="dateInvest" class="panel-date">
          <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="capacity-chart">
        <Map :data="MapData" />
      </div>
    </section>

    <section class="panel panel--steel">
      <div class="panel-head">
        <div class="panel-title">户规模</div>
        <select v-model="dateSteel" class="panel-date">
          <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="capacity-chart">
        <Scale />
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import tabBgUrl from '@/assets/img/tabBg.png'
import Five from '../charts/five.vue'
import County from '../charts/county.vue'
import Total from '../charts/total.vue'
import Map from '../charts/map.vue'
import Scale from '../charts/scale.vue'
const electricTabs = ['地区', '行业', '园区']
const dateOptions = ['2023-05', '2023-04', '2022年统计数据']
const gdpDateOptions = ['2022.01-12', '2021.01-12', '2020.01-12']
//截图原始数据
const xData = ['海城市', '台安县', '岫岩县', '铁东区', '铁西区', '立山区', '千山区']
//总户数 万户
const houseData = [34, 13.8, 15.3, 19.8, 14.4, 20.3, 3.2]
//总人数 万人
const peopleData = [104, 33, 48, 50, 31, 47, 10]
const MapData = [
  { name: '海城市', value: 410 },
  { name: '台安县', value: 256 },
  { name: '岫岩满族自治县', value: 110 },
  { name: '铁东区', value: 3654 },
  { name: '铁西区', value: 2103 },
  { name: '立山区', value: 2552 },
  { name: '千山区', value: 567 }
]
const dateElectric = ref(dateOptions[0])
const dateCapacity = ref(dateOptions[0])
const dateInvest = ref(dateOptions[1])
const datePile = ref(dateOptions[2])
const dateProject = ref(dateOptions[0])
const dateEnergy = ref(dateOptions[0])
const dateSteel = ref('')
// 模拟截图里表格数据
const steelTableData = ref([
  { id: 1, category: '工字钢', spec: '25A', price: 4150, lastWeekPrice: 4150, change: 0 },
  { id: 2, category: '槽钢', spec: '16#', price: 4400, lastWeekPrice: 4340, change: -60 },
  { id: 3, category: '槽钢', spec: '25#', price: 4150, lastWeekPrice: 4150, change: 0 },
  { id: 4, category: '角钢', spec: '50*5', price: 4350, lastWeekPrice: 4290, change: -60 },
  { id: 5, category: '角钢', spec: '160*10', price: 4110, lastWeekPrice: 4110, change: 0 }
])

const popMetrics = [
  { key: 'total', label: '总人口数量', value: '333.44', unit: '万人', tone: 'gold' },
  { key: 'urban', label: '城镇总人口数', value: '178.71', unit: '万人', tone: 'cyan' },
  { key: 'rural', label: '农村总人口数', value: '154.73', unit: '万人', tone: 'blue' }
]

const popIncreaseTotal = '18065'
const popDecreaseTotal = '30920'
const popIncreaseRows = [
  { label: '出生人数', value: '6655' },
  { label: '退出规模', value: '913' },
  { label: '回归人数', value: '5' }
]
const popDecreaseRows = [
  { label: '死亡人数', value: '17926' },
  { label: '脱现役人数', value: '230' },
  { label: '出县人数', value: '31' },
  { label: '城镇人口迁出', value: '12624' },
  { label: '其它人数', value: '109' }
]

const capacityTabs = ['全社会用电容量', '全行业实际用电容量']
const activeCapacityTab = ref<(typeof capacityTabs)[number]>(capacityTabs[0])
const capacityMetrics = computed(() => {
  const map = {
    全社会用电容量: [
      { label: '第三产业', value: '408.46', unit: '万千瓦' },
      { label: '同比', value: '3.95', unit: '%' },
      { label: '环比', value: '1.24', unit: '%' }
    ],
    全行业实际用电容量: [
      { label: '第二产业', value: '962.25', unit: '万千瓦' },
      { label: '同比', value: '4.89', unit: '%' },
      { label: '环比', value: '1.31', unit: '%' }
    ]
  } as const
  return map[activeCapacityTab.value]
})
const capacityRingOption = computed(() => {
  const rings =
    activeCapacityTab.value === '全行业实际用电容量'
      ? [
          { name: '城市居民用电量', value: 48.9, color: '#33d5ff' },
          { name: '第一产业', value: 12.1, color: '#ffe24a' },
          { name: '第二产业', value: 66.5, color: '#40f3b8' },
          { name: '第三产业', value: 35.8, color: '#ffb84a' }
        ]
      : [
          { name: '城市居民用电量', value: 42.6, color: '#33d5ff' },
          { name: '第一产业', value: 10.8, color: '#ffe24a' },
          { name: '第二产业', value: 58.4, color: '#40f3b8' },
          { name: '第三产业', value: 32.3, color: '#ffb84a' }
        ]
  const makeRing = (item: (typeof rings)[number], idx: number) => {
    const outer = 78 - idx * 14
    const inner = outer - 8
    return {
      type: 'pie',
      radius: [`${inner}%`, `${outer}%`],
      center: ['58%', '56%'],
      silent: true,
      label: {
        show: true,
        position: 'outside',
        formatter: `${item.name}\n{v|${item.value}}`,
        rich: { v: { color: 'rgba(240, 251, 255, 0.92)', fontSize: 14, fontWeight: 800 } },
        color: 'rgba(214, 238, 255, 0.7)',
        fontSize: 12
      },
      labelLine: { length: 10, length2: 10, lineStyle: { color: 'rgba(120, 220, 255, 0.18)' } },
      data: [
        { value: item.value, name: item.name, itemStyle: { color: item.color } },
        {
          value: 100 - item.value,
          name: '',
          itemStyle: { color: 'rgba(89, 194, 255, 0.08)' },
          label: { show: false },
          labelLine: { show: false }
        }
      ]
    }
  }
  return { backgroundColor: 'transparent', tooltip: { show: false }, series: rings.map(makeRing) }
})

// 固定资产投资
const investTabs = ['地区', '行业', '园区']
const activeInvestTab = ref<string>(investTabs[0])
const investDistrictX = [
  '海城市',
  '台安县',
  '岫岩县',
  '铁东区',
  '铁西区',
  '立山区',
  '千山区',
  '高新区',
  '经开区',
  '凤城区'
]
const investDistrictY = [25.8, 42.3, 11.6, 20, 25.8, 14.4, 39.8, 71, 148, -57.8]
const investOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 60, right: 24, top: 24, bottom: 80 },
    xAxis: {
      type: 'category',
      data: investDistrictX,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 12, rotate: 40 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位：%',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        type: 'bar',
        barWidth: 24,
        data: investDistrictY,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#54e8ff' },
              { offset: 1, color: '#1966ff' }
            ]
          }
        },
        markLine: { silent: true, data: [{ yAxis: 0 }], lineStyle: { color: '#ff4444', width: 2 } }
      }
    ]
  }
})
const investDistrictX2 = [
  '钢铁行业',
  '菱镁行业',
  '建材行业',
  '装备制造',
  '化工行业',
  '消费品',
  '电子信息',
  '铁矿行业',
  '工业辅助'
]
const investOption2 = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 60, right: 24, top: 24, bottom: 80 },
    xAxis: {
      type: 'category',
      data: investDistrictX2,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 12, rotate: 40 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位：%',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        type: 'bar',
        barWidth: 50,
        data: investDistrictY,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#54e8ff' },
              { offset: 1, color: '#1966ff' }
            ]
          }
        },
        markLine: { silent: true, data: [{ yAxis: 0 }], lineStyle: { color: '#ff4444', width: 2 } }
      }
    ]
  }
})
const fourReformMetrics = computed(() => [
  { label: '累计完成投资', value: '7.07', unit: '亿元' },
  { label: '较去年同期增长', value: '2.9', unit: '%' },
  { label: '占工业投资比重', value: '48.5', unit: '%' },
  { label: '较去年同期提升', value: '1.2', unit: '%' }
])
const fourReformMetrics2 = computed(() => [
  { label: '营业收入', value: '3014', unit: '亿元' },
  { label: '税金总额', value: '83', unit: '亿元' },
  { label: '平均用工人数', value: '149580', unit: '人' },
  { label: '利润总额', value: '161', unit: '亿元' }
])
const pileOption = computed(() => {
  const districts = ['海城市', '岫岩县', '台安县', '铁东区', '铁西区', '立山区', '千山区', '高新区']
  const privateVals = [14, 65, 6, 18, 9, 10, 4, 7]
  const publicVals = [8, 12, 3, 10, 6, 7, 3, 5]
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 70, right: 26, top: 26, bottom: 34 },
    legend: {
      bottom: 6,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 12 }
    },
    xAxis: {
      type: 'category',
      data: districts,
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '商用充电站',
        type: 'bar',
        data: publicVals,
        barWidth: 10,
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
              { offset: 1, color: 'rgba(51, 213, 255, 0.15)' }
            ]
          }
        }
      },
      {
        name: '民用充电站',
        type: 'bar',
        data: privateVals,
        barWidth: 10,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 226, 74, 0.95)' },
              { offset: 1, color: 'rgba(255, 226, 74, 0.15)' }
            ]
          }
        }
      }
    ]
  }
})

const projectTabs = ['项目报装情况', '已报装项目详情']
const activeProjectTab = ref<(typeof projectTabs)[number]>(projectTabs[0])
const projectTotal = computed(() => (activeProjectTab.value === '项目报装情况' ? 35 : 35))
const projectDone = computed(() => (activeProjectTab.value === '项目报装情况' ? 25 : 25))
const projectTodo = computed(() => (activeProjectTab.value === '项目报装情况' ? 10 : 10))
const projectDoneRate = computed(() => Math.round((projectDone.value / projectTotal.value) * 100))
const projectTodoRate = computed(() => 100 - projectDoneRate.value)

const energyTabs = ['能源发电量', '能源分布情况']
const activeEnergyTab = ref<(typeof energyTabs)[number]>(energyTabs[0])
const energyTotal = computed(() => (activeEnergyTab.value === '能源发电量' ? '618032' : '618032'))
const energyOption = computed(() => {
  const categories = ['火电', '水电', '风电', '太阳能', '生物质']
  const values =
    activeEnergyTab.value === '能源分布情况' ? [55, 12, 20, 6, 7] : [558130, 714, 20114, 2697, 1269]
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 80, right: 26, top: 16, bottom: 18 },
    xAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: 'rgba(214, 238, 255, 0.8)', fontSize: 14 },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        type: 'bar',
        data: values,
        barWidth: 18,
        itemStyle: {
          borderRadius: [0, 10, 10, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: 'rgba(255, 120, 120, 0.25)' },
              { offset: 1, color: 'rgba(255, 120, 120, 0.95)' }
            ]
          }
        }
      }
    ]
  }
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
  font-style: italic;
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
.panel-tabs--right {
  justify-content: center;
}
.tab {
  border: none;
  outline: none;
  height: 42px;
  min-width: 220px;
  padding: 0 20px;
  border-radius: 999px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  color: rgba(214, 238, 255, 0.76);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  cursor: pointer;
}
.tab--active {
  color: rgba(240, 251, 255, 0.96);
  text-shadow: 0 0 12px rgba(54, 232, 255, 0.22);
}
.capacity-body {
  height: 100%;
  min-height: 0;
}
.panel--capacity .capacity-body {
  display: grid;
  grid-template-rows: 92px 1fr;
  gap: 18px;
}
.capacity-chart {
  height: 100%;
  min-height: 0;
}
.panel--pop-state {
  padding-top: 86px;
}
.pop-state-body {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(320px, 360px) minmax(1px, 1fr) minmax(320px, 360px);
  align-items: center;
  gap: 18px;
}
.pop-side {
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: 54px 1fr;
  gap: 14px;
}
.pop-side-total {
  position: relative;
  height: 54px;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.22);
  background: linear-gradient(90deg, rgba(16, 66, 130, 0.25), rgba(6, 18, 48, 0.42));
  box-shadow:
    inset 0 0 20px rgba(54, 232, 255, 0.08),
    0 0 18px rgba(0, 130, 255, 0.1);
  padding: 10px 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}
.pop-side-total::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}
.pop-side-total-label {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgba(214, 238, 255, 0.9);
  z-index: 1;
}
.pop-side-total-value {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  z-index: 1;
}
.pop-side-total-value .num {
  font-size: 26px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.95);
  text-shadow: 0 0 12px rgba(54, 232, 255, 0.18);
}
.pop-side-total-value .unit {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.65);
}
.pop-side-list {
  min-height: 0;
  display: grid;
  height: 100%;
  gap: 12px;
  align-content: stretch;
}
.pop-side--left .pop-side-list {
  grid-template-rows: repeat(3, minmax(44px, 1fr));
  gap: 18px;
}
.pop-side--right .pop-side-list {
  grid-template-rows: repeat(5, minmax(44px, 1fr));
  gap: 10px;
}
.pop-side-row {
  position: relative;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.16);
  background: rgba(6, 18, 48, 0.34);
  box-shadow: inset 0 0 18px rgba(54, 232, 255, 0.06);
  padding: 0 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}
.pop-side-row::after {
  content: '';
  position: absolute;
  left: -30%;
  top: -120%;
  width: 160%;
  height: 220%;
  background: linear-gradient(
    45deg,
    rgba(54, 232, 255, 0),
    rgba(54, 232, 255, 0.1),
    rgba(54, 232, 255, 0)
  );
  transform: rotate(12deg);
  opacity: 0.12;
  pointer-events: none;
}
.pop-side-row-label {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.78);
  z-index: 1;
}
.pop-side-row-value {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  z-index: 1;
}
.pop-side-row-value .num {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.95);
}
.pop-side-row-value .unit {
  font-size: 14px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.6);
}
.pop-center {
  min-height: 0;
  height: 100%;
  display: grid;
  place-items: center;
}
.pop-center-stage {
  width: min(360px, 100%);
  height: 100%;
  min-height: 0;
  position: relative;
  display: grid;
  place-items: center;
}
.pop-center-ring {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 999px;
  border: 1px solid rgba(89, 194, 255, 0.16);
  background:
    radial-gradient(circle at 50% 50%, rgba(54, 232, 255, 0.12), rgba(6, 18, 48, 0) 62%),
    radial-gradient(circle at 50% 50%, rgba(54, 232, 255, 0.06), rgba(6, 18, 48, 0) 76%);
  box-shadow:
    inset 0 0 30px rgba(54, 232, 255, 0.08),
    0 0 26px rgba(0, 130, 255, 0.12);
}
.pop-center-doc {
  width: 164px;
  height: 128px;
  position: relative;
  transform: translateY(12px);
}
.pop-center-doc::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 140px;
  height: 100px;
  transform: translate(-50%, -50%) skewX(-10deg);
  border-radius: 10px;
  border: 1px solid rgba(86, 208, 255, 0.28);
  background: linear-gradient(180deg, rgba(54, 232, 255, 0.22), rgba(6, 18, 48, 0.2));
  box-shadow:
    inset 0 0 18px rgba(54, 232, 255, 0.1),
    0 0 22px rgba(54, 232, 255, 0.12);
}
.pop-center-doc::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 110px;
  height: 72px;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background: repeating-linear-gradient(
    180deg,
    rgba(214, 238, 255, 0) 0,
    rgba(214, 238, 255, 0) 10px,
    rgba(214, 238, 255, 0.35) 10px,
    rgba(214, 238, 255, 0.35) 12px
  );
  opacity: 0.55;
}
.pop-center-arrow {
  position: absolute;
  top: 50%;
  width: 46px;
  height: 46px;
  transform: translateY(-50%);
  border-radius: 999px;
  border: 1px solid rgba(89, 194, 255, 0.18);
  background: rgba(6, 18, 48, 0.35);
  box-shadow: inset 0 0 18px rgba(54, 232, 255, 0.08);
}
.pop-center-arrow::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 16px;
  height: 16px;
  transform: translate(-50%, -50%);
  border-left: 3px solid rgba(214, 238, 255, 0.7);
  border-bottom: 3px solid rgba(214, 238, 255, 0.7);
}
.pop-center-arrow--left {
  left: 28px;
}
.pop-center-arrow--left::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.pop-center-arrow--right {
  right: 28px;
}
.pop-center-arrow--right::before {
  transform: translate(-50%, -50%) rotate(-135deg);
}
.pop-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  min-height: 0;
}
.pop-metric {
  position: relative;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.18);
  background: linear-gradient(90deg, rgba(16, 66, 130, 0.22), rgba(6, 18, 48, 0.48));
  box-shadow:
    inset 0 0 26px rgba(54, 232, 255, 0.08),
    0 0 18px rgba(0, 130, 255, 0.1);
  padding: 14px 16px;
  display: grid;
  grid-template-columns: 1fr 76px;
  grid-template-rows: 26px 1fr;
  gap: 6px 10px;
  box-sizing: border-box;
  overflow: hidden;
  min-height: 0;
}
.pop-metric::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}
.pop-metric::after {
  content: '';
  position: absolute;
  left: -25%;
  top: -60%;
  width: 160%;
  height: 160%;
  background: linear-gradient(
    45deg,
    rgba(54, 232, 255, 0),
    rgba(54, 232, 255, 0.1),
    rgba(54, 232, 255, 0)
  );
  transform: rotate(10deg);
  opacity: 0.25;
  pointer-events: none;
}
.pop-metric-label {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgba(214, 238, 255, 0.82);
  z-index: 1;
}
.pop-metric-value {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  z-index: 1;
}
.pop-metric-value .num {
  font-size: 34px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.95);
  text-shadow: 0 0 12px rgba(54, 232, 255, 0.2);
}
.pop-metric-value .unit {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.65);
}
.pop-metric-icon {
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  align-self: center;
  justify-self: center;
  width: 62px;
  height: 62px;
  border-radius: 999px;
  border: 1px solid rgba(86, 208, 255, 0.28);
  box-shadow: 0 0 18px rgba(54, 232, 255, 0.14);
  background: radial-gradient(circle at 40% 35%, rgba(54, 232, 255, 0.24), rgba(6, 18, 48, 0.22));
  position: relative;
  z-index: 1;
}
.pop-metric-icon::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 34px;
  height: 34px;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  opacity: 0.9;
}
.pop-metric--gold .pop-metric-icon {
  border-color: rgba(255, 226, 74, 0.35);
  box-shadow: 0 0 20px rgba(255, 226, 74, 0.16);
  background: radial-gradient(circle at 40% 35%, rgba(255, 226, 74, 0.22), rgba(6, 18, 48, 0.22));
}
.pop-metric--gold .pop-metric-icon::before {
  background: linear-gradient(180deg, rgba(255, 226, 74, 0.95), rgba(255, 226, 74, 0.2));
  clip-path: polygon(
    10% 90%,
    10% 45%,
    28% 45%,
    28% 90%,
    42% 90%,
    42% 30%,
    60% 30%,
    60% 90%,
    74% 90%,
    74% 20%,
    92% 20%,
    92% 90%
  );
}
.pop-metric--cyan .pop-metric-icon::before {
  background: linear-gradient(180deg, rgba(54, 232, 255, 0.95), rgba(54, 232, 255, 0.22));
  clip-path: polygon(
    18% 86%,
    18% 52%,
    50% 30%,
    82% 52%,
    82% 86%,
    62% 86%,
    62% 58%,
    38% 58%,
    38% 86%
  );
}
.pop-metric--blue .pop-metric-icon::before {
  background: linear-gradient(180deg, rgba(68, 160, 255, 0.95), rgba(68, 160, 255, 0.22));
  clip-path: polygon(
    18% 86%,
    18% 56%,
    50% 30%,
    82% 56%,
    82% 86%,
    66% 86%,
    66% 66%,
    34% 66%,
    34% 86%
  );
}
.gdp-wrap {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: 1.12fr 1fr;
  gap: 16px;
}
.gdp-block {
  min-height: 0;
  display: grid;
  grid-template-rows: 34px 1fr;
  gap: 10px;
}
.gdp-block-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 0;
}
.gdp-block-title {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgba(124, 242, 255, 0.95);
  text-shadow: 0 0 12px rgba(54, 232, 255, 0.16);
}
.gdp-block-unit,
.gdp-block-legend {
  font-size: 14px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.6);
  letter-spacing: 1px;
}
.gdp-block--bottom .gdp-block-title {
  color: rgba(124, 242, 255, 0.9);
}
.gdp-block-chart {
  min-height: 0;
}
.resume-invest-body {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 14px;
  margin-top: 50px;
}
.resume-invest-chart {
  min-height: 0;
}
.four-reform-wrap {
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  padding: 14px 18px;
}
.four-reform-title {
  text-align: center;
  font-size: 20px;
  font-weight: 900;
  color: #40f3b8;
  letter-spacing: 2px;
  margin-bottom: 12px;
}
.four-reform-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.four-reform-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  border-radius: 8px;
  background: rgba(10, 30, 65, 0.35);
}
.four-reform-label {
  font-size: 17px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.75);
}
.four-reform-value {
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.four-reform-value .num {
  font-size: 24px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.95);
  text-shadow: 0 0 10px rgba(54, 232, 255, 0.16);
}
.four-reform-value .unit {
  font-size: 15px;
  color: rgba(214, 238, 255, 0.6);
}
.pile-body {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: 140px 1fr;
  gap: 14px;
}
.pile-top {
  display: grid;
  grid-template-columns: 520px 1fr;
  gap: 14px;
  min-height: 0;
}
.pile-top-left,
.pile-top-right {
  position: relative;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: linear-gradient(180deg, rgba(16, 66, 130, 0.22), rgba(6, 18, 48, 0.48));
  box-shadow:
    inset 0 0 26px rgba(54, 232, 255, 0.08),
    0 0 18px rgba(0, 130, 255, 0.1);
  box-sizing: border-box;
  min-height: 0;
  overflow: hidden;
}
.pile-top-left::before,
.pile-top-right::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}
.pile-top-left::after,
.pile-top-right::after {
  content: '';
  position: absolute;
  left: -20%;
  top: -40%;
  width: 160%;
  height: 120%;
  background: linear-gradient(
    45deg,
    rgba(54, 232, 255, 0),
    rgba(54, 232, 255, 0.08),
    rgba(54, 232, 255, 0)
  );
  transform: rotate(8deg);
  opacity: 0.35;
  pointer-events: none;
}
.pile-top-left {
  padding: 6px 16px;
  display: grid;
}
.pile-top-left-row {
  height: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
}
.pile-top-left-row + .pile-top-left-row {
  border-top: 1px solid rgba(89, 194, 255, 0.12);
  box-shadow: inset 0 1px 0 rgba(54, 232, 255, 0.08);
}
.pile-top-left-label {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.86);
  letter-spacing: 2px;
}
.pile-top-left-value {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
}
.pile-top-right {
  padding: 6px 16px;
  display: grid;
}
.pile-top-right-row {
  height: 58px;
  display: grid;
  grid-template-columns: 220px 1fr;
  align-items: center;
  gap: 14px;
  position: relative;
  padding: 0 6px;
  box-sizing: border-box;
}
.pile-top-right-row + .pile-top-right-row {
  border-top: 1px solid rgba(89, 194, 255, 0.12);
  box-shadow: inset 0 1px 0 rgba(54, 232, 255, 0.08);
}
.pile-top-right-row::before {
  content: '';
  width: 4px;
  height: 18px;
  border-radius: 999px;
  background: rgba(54, 232, 255, 0.35);
  box-shadow: 0 0 12px rgba(54, 232, 255, 0.16);
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.pile-top-right-name {
  display: grid;
  gap: 4px;
}
.pile-top-right-sub {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
  letter-spacing: 1px;
}
.pile-top-right-main {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.82);
  letter-spacing: 2px;
}
.pile-top-right-metrics {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.pile-top-right-val,
.pile-top-right-yoy {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
}
.pile-top-right-yoy-label {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}
.pile-top-left .pile-num {
  font-size: 28px;
}
.pile-top-right .pile-num {
  font-size: 22px;
}
.pile-num {
  font-size: 24px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.95);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}
.pile-num--cyan {
  color: rgba(51, 213, 255, 0.95);
  text-shadow: 0 0 12px rgba(51, 213, 255, 0.18);
}
.pile-num--yellow {
  color: rgba(255, 226, 74, 0.95);
  text-shadow: 0 0 12px rgba(255, 226, 74, 0.18);
}
.pile-unit {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}
.pile-split {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.42);
}
.pile-chart {
  min-height: 0;
}
.project-body {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  margin-top: 50px;
}
.project-kpi {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: rgba(214, 238, 255, 0.82);
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 2px;
}
.project-kpi--bar {
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.32);
  box-sizing: border-box;
}
.project-kpi-icon {
  width: 30px;

  height: 30px;
  border-radius: 10px;
  border: 1px solid rgba(54, 232, 255, 0.18);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.2), rgba(6, 18, 48, 0.15));
}

.project-kpi-value {
  font-size: 26px;
  color: rgba(240, 251, 255, 0.95);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}

.project-stage {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 0;
  margin-top: -180px;
}

.project-base {
  position: absolute;
  width: 620px;
  height: 180px;
  border-radius: 999px;
  border: 1px solid rgba(54, 232, 255, 0.14);
  background: radial-gradient(circle at 50% 40%, rgba(54, 232, 255, 0.16), rgba(6, 18, 48, 0));
  transform: perspective(900px) rotateX(72deg) translateY(28px);
  box-shadow: 0 0 34px rgba(54, 232, 255, 0.12);
}

.project-ring {
  position: absolute;
  left: 50%;
  top: 58%;
  border-radius: 999px;
  transform: translate(-50%, -50%) perspective(900px) rotateX(72deg);
  pointer-events: none;
}

.project-ring--a {
  width: 700px;
  height: 250px;
  border: 2px solid rgba(54, 232, 255, 0.14);
  box-shadow: 0 0 34px rgba(54, 232, 255, 0.12);
}

.project-ring--b {
  width: 560px;
  height: 210px;
  border: 2px solid rgba(54, 232, 255, 0.1);
  opacity: 0.75;
}

.project-table {
  border-radius: 12px;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  overflow: hidden;
  min-height: 0;
  margin-top: -180px;
  margin-bottom: 20px;
}

.project-table-row {
  height: 64px;
  display: grid;
  grid-template-columns: 22px 140px 1fr 1fr;
  align-items: center;
  padding: 0 14px;
  box-sizing: border-box;
  border-top: 1px solid rgba(89, 194, 255, 0.12);
}

.project-table-row:first-child {
  border-top: none;
}

.project-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  box-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}

.project-dot--done {
  background: rgba(51, 213, 255, 0.95);
}

.project-dot--todo {
  background: rgba(255, 226, 74, 0.95);
  box-shadow: 0 0 12px rgba(255, 226, 74, 0.18);
}

.project-name {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(214, 238, 255, 0.82);
}

.project-stat {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 10px;
}

.project-stat-label {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(214, 238, 255, 0.62);
}

.project-stat-value {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.16);
}

.project-stat-unit {
  margin-left: 6px;
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}

.energy-body {
  height: 100%;
  min-height: 0;
  margin-top: 20px;
  display: grid;
  grid-template-rows: 72px 1fr;
  gap: 10px;
}

.energy-kpi {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 2px;
}

.energy-kpi-label {
  color: rgba(214, 238, 255, 0.78);
}

.energy-kpi-value {
  font-size: 28px;
  color: rgba(255, 226, 74, 0.95);
  text-shadow: 0 0 12px rgba(255, 226, 74, 0.18);
}

.energy-kpi-unit {
  color: rgba(214, 238, 255, 0.62);
}

.energy-chart {
  min-height: 0;
  margin-top: -50px;
}

.steel-body {
  width: 100%;
}

/* 表头行 */
.steel-header-row {
  display: flex;
  width: 100%;
  background: #0b306b;
}
.steel-header-row .col {
  flex: 1;
  text-align: center;
  font-size: 24px;
  color: #fff;
  padding: 12px 4px;
  text-shadow: 0 0 8px #2178dd;
}

/* 数据行容器，放左右箭头 */
.steel-row-wrap {
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 40px;
}
.arrow {
  width: 14px;
  height: 18px;
  color: #ffcc44;
  font-size: 20px;
  text-shadow: 0 0 6px #ffbc2c;
}
.arrow-left::before {
  content: '◆';
}
.arrow-right::before {
  content: '◆';
}

.steel-data-row {
  flex: 1;
  display: flex;
  background: linear-gradient(90deg, #0c3370, #15448c, #0c3370);
}
.steel-data-row .col {
  flex: 1;
  text-align: center;
  font-size: 24px;
  color: #ffffff;
  padding: 16px 4px;
  text-shadow: 0 0 6px #247ddd;
}
.text-down {
  color: #39f25c;
  text-shadow: 0 0 8px #23d848;
}
</style>
