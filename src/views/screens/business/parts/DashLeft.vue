<template>
  <aside class="left">
    <!-- 1 网上申报率|事项覆盖度 复刻截图布局 -->
    <section class="panel panel--electric">
      <div class="panel-head">
        <div class="panel-title">申报率|覆盖度</div>
      </div>
      <div class="capacity-body">
        <div class="rate-wrap">
          <div class="rate-item">
            <div class="rate-icon-block">
              <div class="icon-bg icon-doc"></div>
            </div>
            <div class="rate-text">
              <div class="rate-label">依申请网上申报率</div>
              <div class="rate-val-row">
                <span class="val-num">82.09%</span>
                <span class="arrow red">↗</span>
              </div>
              <div class="rate-std">依申请网上申报率标准 <span class="std-num">56.24%</span></div>
            </div>
          </div>
          <div class="rate-item">
            <div class="rate-icon-block">
              <div class="icon-bg icon-file"></div>
            </div>
            <div class="rate-text">
              <div class="rate-label">依申请事项覆盖度</div>
              <div class="rate-val-row">
                <span class="val-num">4.75%</span>
                <span class="arrow green">↘</span>
              </div>
              <div class="rate-std">依申请事项覆盖度标准 <span class="std-num">14.88%</span></div>
            </div>
          </div>
          <div class="rate-item">
            <div class="rate-icon-block">
              <div class="icon-bg icon-house"></div>
            </div>
            <div class="rate-text">
              <div class="rate-label">公共服务网上申报率</div>
              <div class="rate-val-row">
                <span class="val-num">83.87%</span>
                <span class="arrow red">↗</span>
              </div>
              <div class="rate-std">公共服务网上申报率标准 <span class="std-num">70.49%</span></div>
            </div>
          </div>
          <div class="rate-item">
            <div class="rate-icon-block">
              <div class="icon-bg icon-book"></div>
            </div>
            <div class="rate-text">
              <div class="rate-label">公共服务事项覆盖度</div>
              <div class="rate-val-row">
                <span class="val-num">2.71%</span>
                <span class="arrow green">↘</span>
              </div>
              <div class="rate-std">公共服务事项覆盖度标准 <span class="std-num">17.66%</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 2 事项年度累计办理量 -->
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
        </div>
      </div>
    </section>
    <!--3 通办事项 -->
    <section class="panel panel--pop-state">
      <div class="panel-head">
        <div class="panel-title">通办事项</div>
        <div class="work-stat">
          市本级通办事项:<span class="num">104</span>&nbsp;&nbsp;市本级办件数量:<span class="num"
            >146817</span
          >
        </div>
      </div>
      <div class="capacity-body">
        <div class="capacity-chart">
          <EChart :option="tongBanOption" />
        </div>
      </div>
    </section>
    <!--4 平均办理时间 -->
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
            <div class="tc-col">{{ item.itemName }}</div>
            <div class="tc-col">{{ item.limitDay }}</div>
            <div class="tc-col">{{ item.avgDay }}</div>
          </div>
        </div>
      </div>
    </section>
    <!--5 一件事一次办 -->
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
        </div>
      </div>
    </section>
    <!--6 超期办件 -->
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
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
// 事项年度累计办理量
const handleTotalList = [
  { no: 2, area: '海城市', itemCount: 987, realItem: 75, handleNum: 3930 },
  { no: 3, area: '台安县', itemCount: 1940, realItem: 57, handleNum: 3194 },
  { no: 4, area: '岫岩县', itemCount: 1686, realItem: 46, handleNum: 446 },
  { no: 5, area: '铁东区', itemCount: 776, realItem: 22, handleNum: 551 },
  { no: 6, area: '铁西区', itemCount: 603, realItem: 15, handleNum: 123 },
  { no: 7, area: '立山区', itemCount: 1027, realItem: 24, handleNum: 113 }
]
//平均办理时间
const avgTimeList = [
  { no: 2, area: '鞍山市', itemName: '对职业病诊断争议的鉴定', limitDay: '40天', avgDay: '2天' },
  { no: 3, area: '鞍山市', itemName: '认定', limitDay: '40天', avgDay: '7.5天' },
  { no: 4, area: '鞍山市', itemName: '社会保障卡申领', limitDay: '30天', avgDay: '<1天' },
  { no: 5, area: '鞍山市', itemName: '药品投诉举报受理服务', limitDay: '30天', avgDay: '<1天' },
  { no: 6, area: '鞍山市', itemName: '申领', limitDay: '30天', avgDay: '<1天' },
  { no: 7, area: '鞍山市', itemName: '人民调解申请', limitDay: '30天', avgDay: '<1天' }
]
//一件事一次办
const oneThingList = [
  { no: 2, area: '海城市', oneThingCount: 536, realType: 16, realNum: 627 },
  { no: 3, area: '台安县', oneThingCount: 561, realType: 4, realNum: 56 },
  { no: 4, area: '岫岩县', oneThingCount: 594, realType: 3, realNum: 24 },
  { no: 5, area: '铁东区', oneThingCount: 412, realType: 6, realNum: 8 },
  { no: 6, area: '铁西区', oneThingCount: 397, realType: 1, realNum: 13 },
  { no: 7, area: '立山区', oneThingCount: 429, realType: 7, realNum: 11 }
]
//通办事项柱状图
const tongBanOption = computed(() => {
  const areaData = [
    '海城市',
    '台安县',
    '岫岩县',
    '铁东区',
    '铁西区',
    '立山区',
    '千山区',
    '高新区',
    '经开区'
  ]
  const tongBanData = [104, 12, 26, 8, 5, 6, 3, 2, 1]
  const banJianData = [146817, 412, 352, 122, 94, 76, 43, 22, 18]
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
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', rotate: 35, fontSize: 24 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 24 },
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
//超期办件 双Y轴柱状+折线
const overDateOption = computed(() => {
  const areaData = [
    '市本级',
    '海城市',
    '台安县',
    '岫岩县',
    '铁东区',
    '铁西区',
    '立山区',
    '千山区',
    '高新区',
    '经开区'
  ]
  const overNum = [5800, 2100, 705, 320, 210, 120, 90, 60, 30, 22]
  const overRate = [62, 26, 6.85, 12, 8, 5, 3, 2, 1, 0.5]
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
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', rotate: 35, fontSize: 24 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: '超期办件数量',
        axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 24 },
        splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      {
        type: 'value',
        name: '超期办件占比(%)',
        position: 'right',
        axisLabel: { color: '#ffd454' },
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
        itemStyle: { color: '#ffd454' },
        lineStyle: { color: '#ffd454' },
        data: overRate
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
/*简易模拟截图内图标占位，你后续可以替换成真实svg图片*/
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
  font-size: 24px;
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
  font-size: 22px;
  color: rgba(214, 238, 255, 0.58);
}
.std-num {
  color: #36e8ff;
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
  grid-template-columns: 1fr 1fr 400px 1fr 1fr;
  padding: 10px 14px;
  background: rgba(14, 40, 85, 0.4);
  border-radius: 8px 8px 0 0;
}
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 400px 1fr 1fr;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.3);
  margin-top: 20px;
}
.tc-col {
  font-size: 24px;
  color: rgba(214, 238, 255, 0.78);
}
.table-header .tc-col {
  color: #54e8ff;
  font-weight: bold;
}
.sort-btn {
  padding: 4px 12px;
  border: 1px solid rgba(84, 188, 255, 0.25);
  border-radius: 6px;
  margin-left: 8px;
  color: rgba(214, 238, 255, 0.75);
}
</style>
