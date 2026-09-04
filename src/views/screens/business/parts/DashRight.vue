<template>
  <div class="container">
    <!-- 第一行：年度热门事项 | 辽事通平台 | 好差评主动评价率 -->
    <div class="row row-top">
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
            <!-- 外层不再用1fr拉伸，行高度由内容决定 -->
            <div class="rank-table-body">
              <div class="rank-table-row" v-for="(item, idx) in hotRankData" :key="idx">
                <span class="r-index"> <i class="r-index-bar"></i>{{ item.no }} </span>
                <span class="r-name">{{ item.name }}</span>
                <span class="r-val">{{ item.count }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="panel panel--liaost">
        <div class="panel-head">
          <div class="panel-title">辽事通平台</div>
        </div>
        <div class="panel-body liaost-wrap">
          <div class="liaost-item">
            <div class="liaost-icon"></div>
            <div class="liaost-label">接入事项数:</div>
            <div class="liaost-num">132</div>
          </div>
          <div class="liaost-item">
            <div class="liaost-icon"></div>
            <div class="liaost-label">用户活跃度:</div>
            <div class="liaost-num">1.54%</div>
          </div>
          <div class="liaost-item">
            <div class="liaost-icon"></div>
            <div class="liaost-label">事项使用率:</div>
            <div class="liaost-num">10.35%</div>
          </div>
        </div>
      </section>
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
          </div>
        </div>
      </section>
    </div>
    <!--第二行：流程再造 | 电子证照电子印章 -->
    <div class="row row-bottom">
      <section class="panel panel--rebuild">
        <div class="panel-head">
          <div class="panel-title">流程再造</div>
          <div class="rebuild-tabs">
            <div class="rebuild-tab">减时限</div>
            <div class="rebuild-tab">减环节</div>
            <div class="rebuild-tab">减材料</div>
            <div class="rebuild-tab">减跑动</div>
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
              <div class="cert-big-num">216<span class="cert-unit">种</span></div>
            </div>
            <div class="cert-card">
              <div class="cert-icon"></div>
              <div class="cert-text">市直电子证照制证部门数</div>
              <div class="cert-big-num">20<span class="cert-unit">个</span></div>
              <div class="cert-small-text">
                市直各部门制作电子证照种类数 <span class="cert-small-num">152种</span>
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
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
// 年度热门事项排行榜
const hotRankData = [
  { no: 1, name: '存量房转让合同网签办理', count: 6716 },
  { no: 2, name: '住房公积金汇缴', count: 5609 },
  { no: 3, name: '参保单位参保信息查询', count: 3331 },
  { no: 4, name: '房屋等建筑物、构筑物所有权登记', count: 2472 },
  { no: 5, name: '抵押权登记--转移登记', count: 2420 },
  { no: 6, name: '基本医疗保险参保和变更登记', count: 2258 }
]
// 好差评主动评价率表格
const rateTableData = [
  { area: '台安县', total: 4494, activeRate: '93.09 %', itemCover: '3.75 %', deptCover: '38.24 %' },
  { area: '岫岩县', total: 587, activeRate: '92.75 %', itemCover: '1.25 %', deptCover: '18.92 %' },
  { area: '铁西区', total: 237, activeRate: '85.71 %', itemCover: '1.38 %', deptCover: '12.5 %' },
  { area: '铁东区', total: 455, activeRate: '81.6 %', itemCover: '1.13 %', deptCover: '19.23 %' },
  { area: '海城市', total: 4650, activeRate: '78.69 %', itemCover: '3.51 %', deptCover: '31.43 %' },
  { area: '立山区', total: 108, activeRate: '68.57 %', itemCover: '1.59 %', deptCover: '29.63 %' },
  { area: '经开区', total: 12, activeRate: '66.67 %', itemCover: '0.58 %', deptCover: '25 %' }
]
//流程再造柱状图
const rebuildBarOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 40, right: 20, top: 30, bottom: 60 },
    xAxis: {
      type: 'category',
      data: ['市本级', '海城市', '台安县', '铁东区', '铁西区', '立山区', '千山区', '高新区'],
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 14, rotate: 35 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '时限压缩比例',
      nameTextStyle: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 14 },
      max: 100,
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 14 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '时限压缩比例',
        type: 'bar',
        barWidth: 24,
        data: [78.8, 84.54, 76.46, 84.22, 87.97, 83.51, 83.09, 79.74],
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
//电子证照柱状图
const certBarOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.9)' }
    },
    grid: { left: 30, right: 20, top: 40, bottom: 60 },
    xAxis: {
      type: 'category',
      data: ['海城市', '台安县', '岫岩县', '铁东区', '铁西区', '立山区', '千山区'],
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 13 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.16)' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      max: 60,
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 13 },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '制证数',
        type: 'bar',
        barWidth: 22,
        data: [49, 54, 52, 35, 29, 43, 39],
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
        data: [43, 43, 43, 43, 43, 43, 43],
        lineStyle: { color: '#fde82c', width: 2 }
      }
    ]
  }
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
/* 年度热门事项排行榜修复 */
.rank-table {
  background-color: #071430;
  border-radius: 4px;
  overflow: hidden;
}
.rank-table-head {
  display: grid;
  grid-template-columns: 64px 1fr 100px;
  padding: 12px 14px;
  gap: 20px;
  background: linear-gradient(90deg, #0f3477, #154294);
  font-size: 30px;
  color: #a6d8ff;
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
  margin-top: 20px;
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
}
.r-val {
  text-align: right;
  color: #ffffff;
}
/*辽事通平台 */
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
/*好差评主动评价率表格 */
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
/*流程再造 */
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
}
.chart-body {
  height: 100%;
}
/*电子证照 */
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
  font-size: 16px;
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
  font-size: 16px;
  color: #82c8ff;
}
.cert-small-text {
  font-size: 14px;
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
