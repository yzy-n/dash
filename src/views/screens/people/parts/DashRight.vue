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
      <!-- ========== 价格监测：替换为【自然变动情况】截图布局，保留外层panel/tab，删除原表格 ========== -->
      <section class="panel panel--tower">
        <div class="panel-head">
          <div class="panel-title">自然变动情况</div>
          <select v-model="dateElectric" class="panel-date">
            <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <div class="nature-wrap">
          <div class="nature-col nature-col-left">
            <div class="nature-item">
              <div class="nature-label">年平均人口</div>
              <div class="nature-value">334.92<span class="nature-unit">万人</span></div>
            </div>
            <div class="nature-item">
              <div class="nature-label">出生人口</div>
              <div class="nature-value">14515<span class="nature-unit">人</span></div>
            </div>
            <div class="nature-item">
              <div class="nature-label">出生率</div>
              <div class="nature-value">4.33<span class="nature-unit">‰</span></div>
            </div>
          </div>
          <!-- 中间六边形图标占位列 -->
          <div class="nature-col nature-col-center">
            <div class="nature-hex-icon"></div>
            <div class="nature-hex-icon"></div>
            <div class="nature-hex-icon"></div>
          </div>
          <div class="nature-col nature-col-right">
            <div class="nature-item">
              <div class="nature-label">自然增长率</div>
              <div class="nature-value">-5.46<span class="nature-unit">‰</span></div>
            </div>
            <div class="nature-item">
              <div class="nature-label">死亡人口</div>
              <div class="nature-value">32779<span class="nature-unit">人</span></div>
            </div>
            <div class="nature-item">
              <div class="nature-label">死亡率</div>
              <div class="nature-value">9.79<span class="nature-unit">‰</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="col">
      <section class="panel panel--water">
        <div class="panel-head">
          <div class="panel-title">基本养老保险情况</div>
          <select v-model="dateWater" class="panel-date">
            <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
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
          <select v-model="dateHeat" class="panel-date">
            <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
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
          <select v-model="dateRed" class="panel-date">
            <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
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
            @click="activeDisabledTab = tab"
          >
            {{ tab }}
          </button>
        </div>
        <div class="aed-chart">
          <roseChart :data="houseData" :tabKey="activeDisabledTab" />
        </div>
      </section>
      <!-- 社会救助情况 -->
      <section class="panel panel--aed">
        <div class="panel-head red-panel-head">
          <div class="panel-title">社会救助情况</div>
          <select v-model="dateRed" class="panel-date">
            <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <!-- tab标签保留：城区合计、海城市、台安县、岫岩县 -->
        <div class="panel-tabs panel-tabs--center">
          <button
            v-for="tab in socialAssistTabs"
            :key="tab"
            type="button"
            class="tab"
            :class="{ 'tab--active': tab === activeAssistTab }"
            :style="{ backgroundImage: `url(${tabBgUrl})` }"
            @click="activeAssistTab = tab"
          >
            {{ tab }}
          </button>
        </div>
        <!-- 替换原来的houseChart，改为双卡片布局 -->
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
import { computed, ref } from 'vue'
import pie3dChart from '@/views/screens/people/charts/3d.vue'
import pensionChart from '@/views/screens/people/charts/pension.vue'
import roseChart from '@/views/screens/people/charts/rose.vue'
import marryChart from '@/views/screens/people/charts/marry.vue'
import tabBgUrl from '@/assets/img/tabBg.png'

const dateOptions = ['2023-05', '2023-04', '2022年统计数据']
const dateCapacity = ref(dateOptions[0])
const dateElectric = ref(dateOptions[0])
const dateWater = ref(dateOptions[0])
const dateRed = ref(dateOptions[0])
const dateHeat = ref(dateOptions[0])

// 社会救助tab
const socialAssistTabs = ['城区合计', '海城市', '台安县', '岫岩县']
const activeAssistTab = ref<(typeof socialAssistTabs)[number]>('城区合计')
// 模拟各地区救助数据，可对接后端替换
const assistSourceData = {
  城区合计: { cityNum: 17996, ruralNum: 2753 },
  海城市: { cityNum: 12400, ruralNum: 8600 },
  台安县: { cityNum: 3200, ruralNum: 4100 },
  岫岩县: { cityNum: 2100, ruralNum: 6800 }
}
const assistData = computed(() => assistSourceData[activeAssistTab.value])

const houseTabs = ['类型统计', '年龄段统计', '性别统计', '户口统计']
const activeDisabledTab = ref<(typeof houseTabs)[number]>(houseTabs[0])
const houseSourceData = {
  类型统计: [
    { name: '视力残疾', value: 35 },
    { name: '听力残疾', value: 20 },
    { name: '言语残疾', value: 10 },
    { name: '肢体残疾', value: 40 },
    { name: '智力残疾', value: 25 },
    { name: '精神残疾', value: 15 }
  ],
  年龄段统计: [
    { name: '0‑18岁', value: 8 },
    { name: '19‑35岁', value: 14 },
    { name: '36‑55岁', value: 28 },
    { name: '56‑70岁', value: 33 },
    { name: '70岁以上', value: 42 }
  ],
  性别统计: [
    { name: '男性', value: 72 },
    { name: '女性', value: 58 }
  ],
  户口统计: [
    { name: '农业户口', value: 66 },
    { name: '非农业户口', value: 64 }
  ]
}
const houseData = computed(() => {
  return houseSourceData[activeDisabledTab.value] || []
})

const pieData = [
  { name: '小学', value: 160675, percent: '37.28%' },
  { name: '幼儿园', value: 83449, percent: '19.36%' },
  { name: '特殊教育', value: 862, percent: '0.20%' },
  { name: '普通高等', value: 42332, percent: '9.82%' },
  { name: '调整后中等职业', value: 4857, percent: '1.13%' },
  { name: '普通中学', value: 135908, percent: '31.53%' },
  { name: '职业中学', value: 2943, percent: '0.68%' }
]

const pensionRows = ref([
  { name: '市本级', worker: 12.95, retire: 17.65 },
  { name: '海城市', worker: 23.6, retire: 12.3 },
  { name: '台安县', worker: 4.5, retire: 2.2 },
  { name: '岫岩县', worker: 7.1, retire: 6.0 },
  { name: '铁东区', worker: 9.8, retire: 4.6 },
  { name: '铁西区', worker: 7.4, retire: 4.2 },
  { name: '立山区', worker: 7.6, retire: 4.1 },
  { name: '千山区', worker: 4.9, retire: 2.6 }
])
const pensionSummary = computed(() => {
  const worker = pensionRows.value.reduce((s, r) => s + (Number(r.worker) || 0), 0)
  const retire = pensionRows.value.reduce((s, r) => s + (Number(r.retire) || 0), 0)
  return {
    worker: worker.toFixed(2),
    retire: retire.toFixed(2)
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
.market-panel {
  flex: 1;
  min-height: 0;
}
/* ========== 自然变动新增样式 ========== */
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
  font-size: 24px;
  color: #cce6ff;
  margin-bottom: 8px;
  background: linear-gradient(90deg, rgba(24, 90, 170, 0.6), rgba(12, 50, 100, 0.4));
  border-radius: 12px;
  padding: 4px 22px;
}
.nature-value {
  font-size: 32px;
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
  font-size: 22px;
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
/* ==========社会救助双卡片新增样式========== */
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
  font-size: 22px;
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
