<template>
  <div class="left-wrap">
    <!-- 左上 水环境质量 -->
    <section class="panel panel--command">
      <div class="panel-title">水环境质量</div>
      <div class="water-wrap">
        <div class="water-left">
          <div class="sub-title">全省水质排名</div>
          <div class="rank-table">
            <div class="rank-header">
              <span>地区</span>
              <span>水质同比（月）</span>
            </div>
            <div class="rank-row">
              <span class="rank-num">4</span>
              <span>鞍山</span>
              <span class="rate up">1.8 % ⬆</span>
            </div>
            <div class="rank-row">
              <span class="rank-num">5</span>
              <span>阜新</span>
              <span class="rate down">-0.1 % ⬇</span>
            </div>
            <div class="rank-row">
              <span class="rank-num">6</span>
              <span>抚顺</span>
              <span class="rate down">-0.82 % ⬇</span>
            </div>
            <div class="rank-row">
              <span class="rank-num">7</span>
              <span>铁岭</span>
              <span class="rate down">-5.63 % ⬇</span>
            </div>
            <div class="rank-row">
              <span class="rank-num">8</span>
              <span>辽阳</span>
              <span class="rate down">-7.58 % ⬇</span>
            </div>
          </div>
        </div>
        <div class="water-right">
          <div class="sub-title">水质等级</div>
          <div class="chart-water">
            <EChart :option="waterPieOption" />
          </div>
        </div>
      </div>
    </section>
    <!-- 右上 大气达标数据信息 -->
    <section class="panel panel--rescue">
      <div class="panel-title">大气达标数据信息</div>
      <div class="air-wrap">
        <!-- 增加class给echarts容器固定高度 -->
        <div class="air-chart-box">
          <EChart :option="airComboOption" />
        </div>
      </div>
    </section>
    <!-- 左下 废水污染物监测 -->
    <section class="panel panel--places">
      <div class="panel-title">废水污染物监测</div>
      <div class="waste-wrap">
        <div class="waste-btn-more">更多</div>
        <div class="waste-layout">
          <div class="waste-col">
            <div class="waste-item">海城市感王镇广禄印花厂</div>
            <div class="waste-item">鞍钢实业集团有限冶金资源再生</div>
            <div class="waste-item">中唯炼焦技术国家工程研究中心</div>
          </div>
          <div class="waste-circle-box">
            <!-- 中间科技圆环占位 -->
            <div class="tech-circle"></div>
          </div>
          <div class="waste-col">
            <div class="waste-item">鞍山清朗水务有限公司</div>
            <div class="waste-item">海城市感王镇鸿威水洗厂</div>
            <div class="waste-item">海城市汇丰生物质发电有限公司</div>
          </div>
        </div>
      </div>
    </section>
    <!-- 右下 废气污染物监测 -->
    <section class="panel panel--fund">
      <div class="panel-title">废气污染物监测</div>
      <div class="waste-gas-wrap">
        <div class="waste-btn-more">更多</div>
        <div class="gas-layout">
          <div class="gas-col">
            <div class="gas-item">海城市环菱镁制品制造有限…</div>
            <div class="gas-item">海城市海英高级耐火材料有…</div>
            <div class="gas-item">海城市兴邦镁镁厂</div>
          </div>
          <div class="gas-circle-box">
            <div class="gas-sphere"></div>
          </div>
          <div class="gas-col">
            <div class="gas-item">后英集团海城市兴海耐火材…</div>
            <div class="gas-item">鞍山冀东水泥有限责任公司</div>
            <div class="gas-item">海城市博圣化工有限公司</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
// 水质等级环形图
const waterPieOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    color: ['#36e8ff', '#ffdd40', '#ffa040', '#ff6848', '#ff3c48'],
    tooltip: { show: true },
    series: [
      {
        type: 'pie',
        radius: ['54%', '76%'],
        center: ['50%', '54%'],
        data: [
          { name: 'Ⅰ类', value: 12 },
          { name: 'Ⅱ类', value: 28 },
          { name: 'Ⅲ类', value: 35 },
          { name: 'Ⅳ类', value: 15 },
          { name: 'Ⅴ类', value: 7 },
          { name: '劣Ⅴ类', value: 3 }
        ],
        label: { show: false },
        itemStyle: {
          borderRadius: 4,
          borderWidth: 2,
          borderColor: 'rgba(2, 10, 30, 0.92)'
        }
      }
    ]
  }
})
// 大气达标 混合图表 柱状+折线双轴
const airComboOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 18, 48, 0.92)',
      borderColor: 'rgba(84, 188, 255, 0.22)',
      borderWidth: 1,
      textStyle: { color: 'rgba(240, 251, 255, 0.92)' }
    },
    legend: {
      right: 10,
      top: 6,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: 'rgba(214, 238, 255, 0.72)', fontSize: 12, fontWeight: 800 },
      data: ['达标天数', '达标天数比例']
    },
    grid: { left: 54, right: 54, top: 44, bottom: 46 },
    xAxis: {
      type: 'category',
      data: ['2022-11', '2022-12', '2023-01', '2023-02'],
      axisLine: { lineStyle: { color: 'rgba(84,188,255,0.2)' } },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(214, 238, 255, 0.7)', fontSize: 12, fontWeight: 800 }
    },
    yAxis: [
      {
        name: '单位：天',
        type: 'value',
        max: 30,
        axisLine: { show: false },
        splitLine: { lineStyle: { color: 'rgba(84,188,255,0.12)' } },
        axisLabel: { color: 'rgba(214, 238, 255, 0.65)', fontSize: 12, fontWeight: 800 },
        nameTextStyle: {
          color: 'rgba(214, 238, 255, 0.55)',
          fontSize: 12,
          fontWeight: 800,
          padding: [0, 0, 0, 10]
        }
      },
      {
        name: '单位：%',
        type: 'value',
        max: 100,
        position: 'right',
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { color: 'rgba(214, 238, 255, 0.65)', fontSize: 12, fontWeight: 800 },
        nameTextStyle: {
          color: 'rgba(214, 238, 255, 0.55)',
          fontSize: 12,
          fontWeight: 800,
          padding: [0, 10, 0, 0]
        }
      }
    ],
    series: [
      {
        name: '达标天数',
        type: 'bar',
        yAxisIndex: 0,
        data: [27, 30, 28, 21],
        barWidth: 26,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(206, 255, 106, 0.98)' },
              { offset: 1, color: 'rgba(82, 214, 106, 0.88)' }
            ]
          },
          borderRadius: [8, 8, 0, 0],
          shadowBlur: 18,
          shadowColor: 'rgba(140, 255, 160, 0.16)'
        }
      },
      {
        name: '达标天数比例',
        type: 'line',
        yAxisIndex: 1,
        data: [83, 90, 84, 75],
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: { color: 'rgba(255, 214, 88, 0.95)', width: 3 },
        itemStyle: { color: 'rgba(255, 214, 88, 0.95)' }
      }
    ]
  }
})
</script>
<style scoped>
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
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 1px solid rgba(84, 188, 255, 0.24);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  color: rgba(214, 238, 255, 0.86);
  box-sizing: border-box;
  background:
    linear-gradient(180deg, rgba(7, 22, 60, 0.62), rgba(5, 16, 44, 0.4)),
    radial-gradient(ellipse at 50% 0%, rgba(54, 232, 255, 0.08), transparent 55%);
}
.panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}
.panel::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent, rgba(54, 232, 255, 0.12), transparent),
    radial-gradient(circle at 10% 10%, rgba(54, 232, 255, 0.08), transparent 40%);
  opacity: 0.8;
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
  font-style: italic;
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
  z-index: 2;
}
.panel-title::after {
  content: '';
  position: absolute;
  left: -10px;
  bottom: -10px;
  width: 560px;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(54, 232, 255, 0),
    rgba(54, 232, 255, 0.55),
    rgba(54, 232, 255, 0)
  );
  box-shadow: 0 0 18px rgba(54, 232, 255, 0.22);
  transform: skewX(10deg);
}
.sub-title {
  font-size: 24px;
  font-weight: 800;
  color: #f8fbff;
  margin-bottom: 14px;
}
/* 左上水环境 */
.water-wrap {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 20px;
}
.water-left,
.water-right {
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.rank-table {
  border: 1px solid rgba(89, 194, 255, 0.12);
  border-radius: 12px;
  background: rgba(6, 18, 48, 0.4);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.rank-header {
  display: grid;
  grid-template-columns: 48px 1fr 120px;
  padding: 12px 14px;
  background: rgba(20, 30, 75, 0.55);
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.rank-row {
  display: grid;
  grid-template-columns: 48px 1fr 120px;
  padding: 14px;
  border-bottom: 1px solid rgba(89, 194, 255, 0.1);
  align-items: center;
  font-size: 20px;
}
.rank-num {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(240, 251, 255, 0.92);
  background: rgba(20, 110, 190, 0.52);
  border: 1px solid rgba(84, 188, 255, 0.28);
  box-shadow: inset 0 0 18px rgba(54, 232, 255, 0.12);
}
.rate.up {
  color: #ff6c6c;
}
.rate.down {
  color: #79ffa8;
}
.chart-water {
  position: relative;
  flex: 1;
  min-height: 0;
  margin-top: 8px;
  border-radius: 14px;
  border: 1px solid rgba(84, 188, 255, 0.14);
  background: rgba(6, 18, 48, 0.22);
  overflow: hidden;
}
.chart-water::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 62%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 80px;
  border-radius: 999px;
  background: radial-gradient(ellipse, rgba(54, 232, 255, 0.22), transparent 70%);
  filter: blur(1px);
  pointer-events: none;
}
.chart-water::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  width: 320px;
  height: 90px;
  border-radius: 50%;
  border-top: 2px solid rgba(84, 188, 255, 0.22);
  background: radial-gradient(ellipse, rgba(54, 232, 255, 0.12), transparent 72%);
  pointer-events: none;
}
/*右上大气*/
.air-wrap {
  flex: 1;
  min-height: 0;
  display: flex;
}
.air-chart-box {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  border: 1px solid rgba(84, 188, 255, 0.14);
  background: rgba(6, 18, 48, 0.22);
  overflow: hidden;
}

/* ========== 废水污染物监测 修复占满宽高 ========== */
.waste-wrap {
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
}
.waste-btn-more {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  border: 1px solid rgba(84, 188, 255, 0.24);
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 20px;
  background: rgba(6, 18, 48, 0.28);
  color: rgba(214, 238, 255, 0.82);
}
.waste-layout {
  width: 100%;
  flex: 1;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 140px 1fr;
  gap: 12px;
  align-items: stretch;
}
.waste-col {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 14px;
  min-height: 0;
}
.waste-circle-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.waste-item {
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid rgba(89, 194, 255, 0.15);
  background: rgba(6, 18, 48, 0.4);
  border-radius: 8px;
  padding: 14px 14px;
  font-size: 30px;
  color: rgba(214, 238, 255, 0.86);
  box-shadow: inset 0 0 20px rgba(54, 232, 255, 0.08);
  position: relative;
  overflow: hidden;
}
.waste-item::after {
  content: '';
  position: absolute;
  left: -20%;
  top: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(54, 232, 255, 0.12), transparent);
  transform: skewX(-16deg);
  opacity: 0.8;
}
.tech-circle {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(54, 232, 255, 0.2), rgba(6, 18, 48, 0.1));
  border: 2px solid rgba(54, 232, 255, 0.35);
  box-shadow: 0 0 24px rgba(54, 232, 255, 0.15);
  position: relative;
}
.tech-circle::before {
  content: '';
  position: absolute;
  inset: -22px;
  border-radius: 50%;
  border: 2px solid rgba(54, 232, 255, 0.18);
  box-shadow: inset 0 0 30px rgba(54, 232, 255, 0.1);
}
.tech-circle::after {
  content: '';
  position: absolute;
  inset: 18px;
  border-radius: 50%;
  border: 2px dashed rgba(214, 238, 255, 0.35);
  opacity: 0.55;
}

/* ========== 废气污染物监测 修复占满宽高 ========== */
.waste-gas-wrap {
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
}
.gas-layout {
  width: 100%;
  flex: 1;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 140px 1fr;
  gap: 12px;
  align-items: stretch;
}
.gas-col {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 14px;
  min-height: 0;
}
.gas-circle-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.gas-item {
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid rgba(89, 194, 255, 0.15);
  background: rgba(6, 18, 48, 0.4);
  border-radius: 8px;
  padding: 14px 14px;
  font-size: 30px;
  color: rgba(214, 238, 255, 0.86);
  box-shadow: inset 0 0 20px rgba(54, 232, 255, 0.08);
  position: relative;
  overflow: hidden;
}
.gas-item::after {
  content: '';
  position: absolute;
  left: -20%;
  top: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(54, 232, 255, 0.12), transparent);
  transform: skewX(-16deg);
  opacity: 0.8;
}
.gas-sphere {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, rgba(124, 242, 255, 0.42), rgba(6, 18, 48, 0.18) 62%),
    radial-gradient(circle at 70% 80%, rgba(54, 232, 255, 0.18), transparent 55%);
  box-shadow: 0 0 30px rgba(54, 232, 255, 0.2);
  border: 1px solid rgba(84, 188, 255, 0.22);
  position: relative;
  overflow: hidden;
}
.gas-sphere::before {
  content: '';
  position: absolute;
  inset: -26px;
  border-radius: 50%;
  border: 2px solid rgba(54, 232, 255, 0.16);
  box-shadow: inset 0 0 40px rgba(54, 232, 255, 0.12);
}
.gas-sphere::after {
  content: '';
  position: absolute;
  left: 18px;
  top: 22px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(240, 251, 255, 0.38), transparent 70%);
}
</style>
