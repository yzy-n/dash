<template>
  <aside class="right">
    <div class="col">
      <section class="panel market-panel">
        <div class="panel-head">
          <div class="panel-title">教育水平</div>
          <select v-model="dateCapacity" class="panel-date">
            <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <!-- 柱状图区域 -->
        <div class="water-chart">
          <pie3dChart :data="pieData" :innerRadius="0.6" :minThickness="0.15" :maxThickness="3" />
        </div>
      </section>
      <!-- ========== 价格监测：替换为表格+tab，移除原ECharts tower-chart ========== -->
      <section class="panel panel--tower">
        <div class="panel-head">
          <div class="panel-title">价格监测</div>
          <select v-model="dateElectric" class="panel-date">
            <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <!-- 【修复】价格监测tab统一使用全局tab class，和供暖样式对齐，删除错误price-tab-active -->
        <div class="panel-tabs panel-tabs--center">
          <button
            v-for="tab in priceTabList"
            :key="tab"
            type="button"
            class="tab"
            :class="{ 'tab--active': tab === activePriceTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="activePriceTab = tab"
          >
            {{ tab }}
          </button>
        </div>
        <div class="price-table-wrap">
          <div class="price-table-header">
            <div class="price-cell">品种</div>
            <div class="price-cell">上周平均价格(元)</div>
            <div class="price-cell">本周平均价格(元)</div>
            <div class="price-cell">环比增长(元)</div>
          </div>
          <div class="price-table-body">
            <div v-for="row in priceTableData" :key="row.name" class="price-table-row">
              <div class="price-cell">{{ row.name }}</div>
              <div class="price-cell">{{ row.lastWeek }}</div>
              <div class="price-cell">{{ row.thisWeek }}</div>
              <div
                class="price-cell"
                :class="{
                  'price-up': row.diff > 0,
                  'price-down': row.diff < 0,
                  'price-zero': row.diff === 0
                }"
              >
                {{ row.diff > 0 ? '+' : '' }}{{ row.diff }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="col">
      <section class="panel panel--water">
        <div class="panel-head">
          <div class="panel-title">消费品总额增速</div>
          <select v-model="dateWater" class="panel-date">
            <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <div class="water-chart">
          <productChart :data="waterData" />
        </div>
      </section>
      <section class="panel panel--heat">
        <div class="panel-head">
          <div class="panel-title">建筑业增值增速</div>
          <select v-model="dateHeat" class="panel-date">
            <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <!-- 【修复】建筑业增值增速 使用 panel-tabs 定位容器，和全局tab统一 -->
        <div class="panel-tabs panel-tabs--center">
          <button
            v-for="tab in heatTabs"
            :key="tab"
            type="button"
            class="tab"
            :class="{ 'tab--active': tab === activeHeatTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="activeHeatTab = tab"
          >
            {{ tab }}
          </button>
        </div>
        <div class="heat-chart">
          <plusChart :data="heatData" />
        </div>
      </section>
    </div>
    <div class="col">
      <!-- 红十字会：高度由内容撑开，不抢占剩余高度 -->
      <section class="panel panel--red">
        <div class="panel-head red-panel-head">
          <div class="panel-title">数字经济与服务</div>
          <select v-model="dateRed" class="panel-date">
            <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <div class="red-inner">
          <!-- 顶部两行 -->
          <div class="red-top-item">
            <div class="red-top-icon"></div>
            <div class="red-top-label">互联网和相关服务情况</div>
            <div class="red-top-val">1.0 亿元<span>11.8%</span></div>
          </div>
          <div class="red-top-item">
            <div class="red-top-icon"></div>
            <div class="red-top-label">软件和信息技术服务业情况</div>
            <div class="red-top-val">1.4 亿元<span>11.4%</span></div>
          </div>
          <div class="chart-wrap">
            <serviceChart :option="barOption" />
          </div>
        </div>
      </section>
      <!-- AED占剩下全部高度 【新增商品房交易tab切换，和建筑业完全同样式】 -->
      <section class="panel panel--aed">
        <div class="panel-head red-panel-head">
          <div class="panel-title">商品房交易情况</div>
          <select v-model="dateRed" class="panel-date">
            <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <!-- 商品房tab 复用全局panel-tabs样式 -->
        <div class="panel-tabs panel-tabs--center">
          <button
            v-for="tab in houseTabs"
            :key="tab"
            type="button"
            class="tab"
            :class="{ 'tab--active': tab === activeHouseTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="activeHouseTab = tab"
          >
            {{ tab }}
          </button>
        </div>
        <div class="aed-chart">
          <houseChart :data="houseData" :tabKey="activeHouseTab" />
        </div>
      </section>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import productChart from '@/views/screens/econ/charts/product.vue'
import plusChart from '@/views/screens/econ/charts/plus.vue'
import houseChart from '@/views/screens/econ/charts/house.vue'
import pie3dChart from '@/views/screens/people/charts/3d.vue'
import tabBgUrl from '@/assets/img/tabBg.png'

const dateOptions = ['2023-05', '2023-04', '2022年统计数据']
const dateCapacity = ref(dateOptions[0])
const dateElectric = ref(dateOptions[0])
const dateWater = ref(dateOptions[0])
const dateRed = ref(dateOptions[0])
const dateHeat = ref(dateOptions[0])
const houseTabs = ['新房', '二手房']
const activeHouseTab = ref<(typeof houseTabs)[number]>(houseTabs[0])
const pieData = [
  { name: '小学', value: 160675, percent: '37.28%' },
  { name: '幼儿园', value: 83449, percent: '19.36%' },
  { name: '特殊教育', value: 862, percent: '0.20%' },
  { name: '普通高等', value: 42332, percent: '9.82%' },
  { name: '调整后中等职业', value: 4857, percent: '1.13%' },
  { name: '普通中学', value: 135908, percent: '31.53%' },
  { name: '职业中学', value: 2943, percent: '0.68%' }
]
const gasMetrics = computed(() => {
  const map = {
    煤气: [
      { pos: 'lt', label: '家庭用户', value: '738000', unit: '户' },
      { pos: 'rt', label: '供气总量', value: '13743', unit: '万立方米' },
      { pos: 'lm', label: '用气人口', value: '136.3', unit: '万人' },
      { pos: 'rm', label: '家庭用量', value: '9124', unit: '万立方米' },
      { pos: 'lb', label: '管道长度', value: '2033', unit: '公里' },
      { pos: 'rb', label: '用户户数', value: '745763', unit: '户' }
    ],
    天然气: [
      { pos: 'lt', label: '家庭用户', value: '812000', unit: '户' },
      { pos: 'rt', label: '供气总量', value: '15240', unit: '万立方米' },
      { pos: 'lm', label: '用气人口', value: '152.1', unit: '万人' },
      { pos: 'rm', label: '家庭用量', value: '10230', unit: '万立方米' },
      { pos: 'lb', label: '管道长度', value: '2360', unit: '公里' },
      { pos: 'rb', label: '用户户数', value: '801340', unit: '户' }
    ],
    液化石油气: [
      { pos: 'lt', label: '家庭用户', value: '398000', unit: '户' },
      { pos: 'rt', label: '供气总量', value: '6240', unit: '万立方米' },
      { pos: 'lm', label: '用气人口', value: '86.6', unit: '万人' },
      { pos: 'rm', label: '家庭用量', value: '4312', unit: '万立方米' },
      { pos: 'lb', label: '管道长度', value: '980', unit: '公里' },
      { pos: 'rb', label: '用户户数', value: '402115', unit: '户' }
    ]
  } as const
  return map[activeGasTab.value]
})

// 价格监测表格数据
const priceTabList = ref(['农副产品', '蔬菜'])
const activePriceTab = ref('农副产品')
const priceTableData = computed(() => {
  const source: Record<
    string,
    Array<{ name: string; lastWeek: number; thisWeek: number; diff: number }>
  > = {
    农副产品: [
      { name: '鲜羊肉', lastWeek: 37.57, thisWeek: 37.57, diff: 0.0 },
      { name: '鸡蛋', lastWeek: 5.35, thisWeek: 5.43, diff: 0.08 },
      { name: '白条鸡', lastWeek: 8, thisWeek: 8, diff: 0.0 },
      { name: '鲤鱼', lastWeek: 8.3, thisWeek: 8.3, diff: 0.0 },
      { name: '鲫鱼', lastWeek: 12.53, thisWeek: 12.6, diff: 0.07 },
      { name: '草鱼', lastWeek: 9.93, thisWeek: 9.93, diff: 0.0 },
      { name: '带鱼', lastWeek: 14.82, thisWeek: 14.8, diff: -0.02 }
    ],
    蔬菜: [
      { name: '大白菜', lastWeek: 2.12, thisWeek: 2.25, diff: 0.13 },
      { name: '土豆', lastWeek: 1.85, thisWeek: 1.8, diff: -0.05 },
      { name: '黄瓜', lastWeek: 3.4, thisWeek: 3.55, diff: 0.15 },
      { name: '西红柿', lastWeek: 2.88, thisWeek: 2.91, diff: 0.03 },
      { name: '青椒', lastWeek: 4.2, thisWeek: 4.1, diff: -0.1 }
    ]
  }
  return source[activePriceTab.value]
})

// 市场主体柱状图
const barOption = ref<EChartsOption>({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(4,24,48,0.85)',
    borderColor: '#26c9dd',
    textStyle: { color: '#fff' },
    formatter: (params: any) => {
      return `${params[0].axisValue}<br/>内资企业：${params[0].value}户`
    }
  },
  grid: {
    left: '8%',
    right: '4%',
    top: '12%',
    bottom: '22%'
  },
  xAxis: {
    type: 'category',
    data: [
      '海城市',
      '台安县',
      '岫岩县',
      '铁东区',
      '铁西区',
      '立山区',
      '千山区',
      '高新区',
      '经开区',
      '风景区'
    ],
    axisLine: { lineStyle: { color: '#287892' } },
    axisLabel: {
      color: '#82d8e8',
      rotate: 40,
      fontSize: 14
    }
  },
  yAxis: {
    name: '单位：户',
    nameTextStyle: { color: '#82d8e8' },
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(38,201,221,0.15)' } },
    axisLine: { show: false },
    axisLabel: { color: '#82d8e8' }
  },
  series: [
    {
      name: '内资企业',
      type: 'bar',
      barWidth: '40%',
      data: [17200, 4600, 6200, 9800, 6100, 5088, 4300, 1200, 800, 300],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#26e2dd' },
            { offset: 1, color: '#086c94' }
          ]
        }
      }
    }
  ]
})
const gasOption = computed(() => {
  const value = activeGasTab.value === '煤气' ? 68 : activeGasTab.value === '天然气' ? 72 : 55
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'gauge',
        startAngle: 210,
        endAngle: -30,
        radius: '88%',
        center: ['50%', '52%'],
        progress: {
          show: true,
          width: 14,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: 'rgba(51, 213, 255, 0.18)' },
                { offset: 1, color: 'rgba(51, 213, 255, 0.95)' }
              ]
            }
          }
        },
        axisLine: { lineStyle: { width: 14, color: [[1, 'rgba(89, 194, 255, 0.12)']] } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        pointer: { show: false },
        detail: { show: false },
        data: [{ value }]
      },
      {
        type: 'pie',
        radius: ['76%', '78%'],
        center: ['50%', '52%'],
        silent: true,
        label: { show: false },
        data: [{ value: 100, itemStyle: { color: 'rgba(54, 232, 255, 0.12)' } }]
      },
      {
        type: 'pie',
        radius: ['64%', '66%'],
        center: ['50%', '52%'],
        silent: true,
        label: { show: false },
        data: [
          {
            value: 100,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: 'rgba(255, 226, 74, 0.15)' },
                  { offset: 1, color: 'rgba(255, 226, 74, 0.42)' }
                ]
              }
            }
          }
        ]
      }
    ]
  }
})
const waterTypes = ['综合生产能力', '城区合计']
const activeWaterType = ref<(typeof waterTypes)[number]>(waterTypes[0])
const waterOption = computed(() => {
  const x = ['城区合计', '海城市', '台安县', '岫岩县']
  const y = activeWaterType.value === '综合生产能力' ? [55, 10, 3, 2] : [36, 12, 4, 3]
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 70, right: 26, top: 26, bottom: 30 },
    xAxis: {
      type: 'category',
      data: x,
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
        type: 'bar',
        data: y,
        barWidth: 22,
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
              { offset: 1, color: 'rgba(51, 213, 255, 0.12)' }
            ]
          }
        }
      }
    ]
  }
})
const towerTotal = '4710'
const towerLegend = [
  { label: '地面站', value: '2564', unit: '个', rate: '54.44%' },
  { label: '楼面站', value: '1674', unit: '个', rate: '35.54%' },
  { label: 'H杆', value: '472', unit: '个', rate: '10.02%' }
]
const towerOption = computed(() => {
  const data = [
    { name: '地面站', value: 2564 },
    { name: '楼面站', value: 1674 },
    { name: 'H杆', value: 472 }
  ]
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'pie',
        radius: ['40%', '72%'],
        center: ['45%', '56%'],
        label: { show: false },
        itemStyle: { borderWidth: 2, borderColor: 'rgba(2, 10, 30, 0.9)' },
        data
      }
    ],
    color: ['#33d5ff', '#40f3b8', '#ffe24a']
  }
})
const heatTabs = ['增加值', '同比']
const activeHeatTab = ref<(typeof heatTabs)[number]>(heatTabs[0])

const aedOption = computed(() => {
  const points = [
    [26, 70],
    [34, 62],
    [42, 58],
    [56, 64],
    [62, 52],
    [48, 46],
    [38, 44],
    [30, 40],
    [70, 38],
    [78, 44],
    [68, 58],
    [58, 72],
    [40, 76],
    [22, 56],
    [82, 62]
  ]
  return {
    backgroundColor: 'transparent',
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    xAxis: { show: false, min: 0, max: 100 },
    yAxis: { show: false, min: 0, max: 100 },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'cartesian2d',
        data: points.map((p) => ({ value: [p[0], p[1]] })),
        symbol: 'pin',
        symbolSize: 34,
        itemStyle: { color: '#ff3b3b' },
        label: {
          show: true,
          formatter: 'AED',
          color: '#fff',
          fontSize: 12,
          fontWeight: 900,
          offset: [0, -6]
        }
      }
    ]
  }
})
</script>

<style scoped>
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
  font-style: italic;
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
/* ========== 仅市场主体模块新增样式，不污染其他panel ========== */
.market-panel {
  flex: 1;
  min-height: 0;
}
.market-metrics-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 14px;
  margin-bottom: 20px;
}
/* 第4、5个卡片，第二行居中摆放 */
.market-metrics-wrap .metric-item:nth-child(4) {
  grid-column: 1 / 2;
}
.market-metrics-wrap .metric-item:nth-child(5) {
  grid-column: 2 / 3;
}
.metric-item {
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: linear-gradient(90deg, rgba(14, 70, 134, 0.7), rgba(8, 42, 84, 0.5));
  border: 1px solid rgba(38, 201, 221, 0.35);
  border-radius: 4px;
  position: relative;
}
.metric-item::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-top: 2px solid #ffdd66;
  border-left: 2px solid #ffdd66;
}
.metric-item::after {
  content: '';
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  width: 6px;
  height: 6px;
  border-top: 2px solid #ffdd66;
  border-left: 2px solid #ffdd66;
}
.metric-label {
  font-size: 22px;
  color: #c6ecf8;
}
.metric-value {
  font-size: 26px;
  color: #ffffff;
  font-weight: bold;
}
.metric-value .unit {
  font-size: 20px;
  color: #82d8e8;
  margin-left: 4px;
}
.chart-wrap {
  width: 100%;
  height: calc(100% - 180px);
}
/* ====================== 价格监测表格样式 ====================== */
.panel--tower {
  flex: 1;
  min-height: 0;
  padding-top: 86px;
}
.price-tab-wrap {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 16px;
}
.price-tab {
  min-width: 160px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 22px;
  font-weight: 900;
  color: rgba(120, 190, 240, 0.6);
  background: rgba(10, 40, 80, 0.35);
  border: 1px solid rgba(84, 188, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
}
.price-tab-active {
  color: #ffffff;
  border-color: rgba(60, 200, 255, 0.6);
  box-shadow: 0 0 14px rgba(51, 216, 255, 0.25);
  text-shadow: 0 0 8px rgba(70, 200, 255, 0.4);
}
.price-table-wrap {
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(84, 188, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
}
.price-table-header {
  display: grid;
  grid-template-columns: 1fr 1.4fr 1.4fr 1fr;
  background: linear-gradient(90deg, rgba(12, 70, 130, 0.7), rgba(8, 45, 90, 0.6));
}
.price-table-body {
  flex: 1;
  overflow-y: auto;
}
.price-table-row {
  display: grid;
  grid-template-columns: 1fr 1.4fr 1.4fr 1fr;
  border-bottom: 1px solid rgba(84, 188, 255, 0.12);
}
.price-cell {
  padding: 12px 10px;
  font-size: 20px;
  color: #e6f4ff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.price-up {
  color: #ff5555;
  text-shadow: 0 0 6px rgba(255, 60, 60, 0.35);
}
.price-down {
  color: #42e870;
  text-shadow: 0 0 6px rgba(40, 230, 90, 0.35);
}
.price-zero {
  color: #e6f4ff;
}
/* ========================================================= */
/* 红十字头部：标题左，日期右 */
.red-panel-head {
  justify-content: space-between;
}
.panel-head--center {
  justify-content: center;
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
  border: none;
  outline: none;
  height: 42px;
  min-width: 170px;
  padding: 0 20px;
  border-radius: 999px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  color: rgba(214, 238, 255, 0.38);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  cursor: pointer;
  opacity: 0.55;
  filter: grayscale(1) brightness(0.75);
  box-shadow:
    inset 0 0 0 1px rgba(86, 208, 255, 0.12),
    0 0 0 rgba(54, 232, 255, 0);
  transition:
    opacity 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease,
    color 160ms ease;
}
.tab--active {
  color: rgba(240, 251, 255, 0.96);
  text-shadow:
    0 0 12px rgba(54, 232, 255, 0.35),
    0 0 20px rgba(54, 232, 255, 0.18);
  opacity: 1;
  filter: none;
  transform: translateY(-1px);
  box-shadow:
    inset 0 0 0 1px rgba(86, 208, 255, 0.38),
    0 0 16px rgba(54, 232, 255, 0.22);
}
.panel--gas {
  flex: 1;
  min-height: 0;
}
.gas-stage {
  position: absolute;
  inset: 0;
  padding: 128px 26px 26px;
  box-sizing: border-box;
}
.gas-gauge {
  position: absolute;
  left: 50%;
  top: 56%;
  width: 540px;
  height: 540px;
  transform: translate(-50%, -50%);
}
.gas-icon {
  position: absolute;
  left: 50%;
  top: 56%;
  width: 140px;
  height: 140px;
  transform: translate(-50%, -50%);
  border-radius: 70px;
  border: 1px solid rgba(84, 188, 255, 0.18);
  background: radial-gradient(circle at 50% 40%, rgba(54, 232, 255, 0.26), rgba(6, 18, 48, 0.25));
  box-shadow: 0 0 26px rgba(54, 232, 255, 0.14);
}
.gas-metric {
  position: absolute;
  width: 360px;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.32);
  padding: 14px 16px 12px;
  box-sizing: border-box;
  display: grid;
  gap: 10px;
}
.gas-metric-label {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.78);
}
.gas-metric-value {
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
}
.gas-metric-num {
  font-size: 24px;
  font-weight: 900;
  color: rgba(255, 226, 74, 0.95);
  text-shadow: 0 0 14px rgba(255, 226, 74, 0.18);
}
.gas-metric-unit {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}
.gas-metric--lt {
  left: 40px;
  top: 140px;
}
.gas-metric--rt {
  right: 40px;
  top: 140px;
}
.gas-metric--lm {
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
}
.gas-metric--rm {
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
}
.gas-metric--lb {
  left: 40px;
  bottom: 46px;
}
.gas-metric--rb {
  right: 40px;
  bottom: 46px;
}
.tower-kpi {
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(214, 238, 255, 0.78);
}
.tower-kpi-value {
  font-size: 26px;
  color: rgba(255, 226, 74, 0.95);
  text-shadow: 0 0 12px rgba(255, 226, 74, 0.18);
}
.tower-kpi-unit {
  color: rgba(214, 238, 255, 0.62);
}
.tower-body {
  height: calc(100% - 54px);
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 14px;
  align-items: center;
}
.tower-chart {
  height: 100%;
  min-height: 0;
}
.tower-legend {
  display: grid;
  gap: 12px;
}
.tower-legend-row {
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.32);
  padding: 14px 14px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: baseline;
}
.tower-legend-label {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.78);
}
.tower-legend-value {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
}
.tower-legend-num {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}
.tower-legend-unit {
  font-size: 16px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}
.tower-legend-rate {
  font-size: 18px;
  font-weight: 900;
  color: rgba(255, 226, 74, 0.9);
  text-shadow: 0 0 12px rgba(255, 226, 74, 0.14);
}
.panel--water {
  flex: 1;
  min-height: 0;
}
.water-filter {
  position: absolute;
  top: 78px;
  right: 26px;
  width: 360px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  background: rgba(6, 18, 48, 0.34);
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
  z-index: 2;
}
.water-select {
  width: 100%;
  height: 100%;
  appearance: none;
  border: none;
  outline: none;
  background: transparent;
  color: rgba(240, 251, 255, 0.92);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  cursor: pointer;
}
.water-chart {
  height: 100%;
  min-height: 0;
}
.panel--heat {
  flex: 1;
  min-height: 0;
}
.heat-chart {
  height: 100%;
  min-height: 0;
}
.heat-row {
  height: 92px;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.34);
  display: grid;
  grid-template-columns: 42px 1fr auto auto;
  gap: 14px;
  align-items: center;
  padding: 0 14px;
  box-sizing: border-box;
  color: rgba(214, 238, 255, 0.82);
  font-size: 18px;
  font-weight: 900;
}
.heat-icon {
  width: 28px;
  height: 28px;
  border-radius: 10px;
  border: 1px solid rgba(54, 232, 255, 0.18);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.2), rgba(6, 18, 48, 0.15));
}
.heat-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.heat-value {
  font-size: 22px;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.18);
}
.heat-unit {
  color: rgba(214, 238, 255, 0.62);
}
.panel--red {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.red-inner {
  flex: 1;
  min-height: 0;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
}
.red-top-item {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 54px 1fr auto;
  align-items: center;
  height: 74px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(18, 72, 140, 0.32), rgba(6, 18, 48, 0.18));
  box-shadow:
    inset 0 0 26px rgba(54, 232, 255, 0.06),
    0 0 20px rgba(0, 90, 210, 0.08);
  padding: 0 18px 0 14px;
  position: relative;
  overflow: hidden;
}
.red-top-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 96px;
  height: 100%;
  background: linear-gradient(90deg, rgba(54, 232, 255, 0.16), rgba(54, 232, 255, 0));
  clip-path: polygon(0 0, 82% 0, 62% 100%, 0 100%);
}
.red-top-item::after {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(84, 188, 255, 0.12);
  pointer-events: none;
}
.red-top-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  background: radial-gradient(circle at 35% 35%, rgba(54, 232, 255, 0.32), rgba(6, 18, 48, 0.18));
  box-shadow: 0 0 14px rgba(54, 232, 255, 0.12);
  z-index: 1;
  justify-self: center;
}
.red-top-label {
  min-width: 0;
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.92);
  letter-spacing: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.red-top-val {
  display: inline-flex;
  align-items: baseline;
  gap: 22px;
  font-size: 30px;
  font-weight: 900;
  color: rgba(255, 226, 74, 0.95);
  text-shadow: 0 0 14px rgba(255, 226, 74, 0.12);
}
.red-top-val span {
  font-size: 22px;
  font-weight: 900;
  color: rgba(124, 242, 255, 0.9);
  text-shadow: 0 0 12px rgba(54, 232, 255, 0.14);
  margin-left: 0;
}
.red-top-rate {
  font-size: 20px;
  color: #fff;
  margin-left: 4px;
}
.red-card-wrap {
  flex: 1;
  min-height: 0;
}
.red-card-wrap {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  align-content: stretch;
}
.red-card {
  position: relative;
  min-height: 140px;
  border: 1px solid rgba(80, 160, 255, 0.3);
  border-radius: 10px;
  background: rgba(12, 30, 60, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 24px;
}
.red-card-icon {
  position: absolute;
  top: -14px;
  width: 48px;
  height: 48px;
}
.red-card-name {
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin-bottom: 12px;
}
.red-card-num {
  font-size: 34px;
  color: #f9e784;
}
.red-card-num span {
  font-size: 18px;
  color: #fff;
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
</style>
