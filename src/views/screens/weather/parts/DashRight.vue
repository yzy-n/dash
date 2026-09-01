<template>
  <div class="right-wrap">
    <section class="action-panel">
      <div class="action-head">
        <div class="action-title">专项整治行动</div>
      </div>

      <div class="action-body">
        <div class="action-node-col action-node-col--left">
          <div v-for="node in actionNodesLeft" :key="node" class="action-node">
            <div class="action-node-base"></div>
            <div class="action-node-pill">{{ node }}</div>
          </div>
        </div>

        <div class="action-core">
          <div class="action-holo">
            <div class="action-holo-glow"></div>
            <div class="action-holo-ring"></div>
            <div class="action-holo-beam"></div>
            <div class="action-holo-base">
              <div class="action-holo-base-ring action-holo-base-ring--a"></div>
              <div class="action-holo-base-ring action-holo-base-ring--b"></div>
              <div class="action-holo-base-ring action-holo-base-ring--c"></div>
            </div>
            <div class="action-holo-text">
              <div class="action-holo-main">专项</div>
              <div class="action-holo-sub">整治行动</div>
            </div>
          </div>
        </div>

        <div class="action-node-col action-node-col--right">
          <div v-for="node in actionNodesRight" :key="node" class="action-node">
            <div class="action-node-base"></div>
            <div class="action-node-pill">{{ node }}</div>
          </div>
        </div>
      </div>

      <div class="action-bottom">
        <div class="action-stats">
          <div v-for="item in installStats" :key="item.label" class="action-stat">
            <div class="action-stat-label">{{ item.label }}</div>
            <div class="action-stat-value">
              <span class="action-stat-num">{{ item.value }}</span>
              <span class="action-stat-unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>

        <div class="action-table">
          <div class="action-tabs">
            <button
              v-for="tab in actionTabs"
              :key="tab"
              type="button"
              class="action-tab"
              :class="{ 'action-tab--active': tab === activeActionTab }"
              @click="activeActionTab = tab"
            >
              {{ tab }}
            </button>
          </div>
          <div class="action-table-title">安装完成情况排名</div>
          <div class="action-table-head action-table-row">
            <span>区县</span>
            <span>综合排名</span>
            <span>非经济用户安装率</span>
          </div>
          <div v-for="row in actionRankRows" :key="row.name" class="action-table-row">
            <span>{{ row.name }}</span>
            <span>{{ row.rank }}</span>
            <span>{{ row.rate }}</span>
          </div>
        </div>
      </div>
    </section>

    <div class="side-wrap">
      <section class="panel panel--result">
        <div class="panel-head">
          <div class="panel-title">灾后建设成效</div>
        </div>
        <div class="result-grid">
          <div v-for="item in resultMetrics" :key="item.label" class="result-card">
            <div class="result-top">
              <div class="result-pedestal"></div>
              <div class="result-icon" :class="`result-icon--${item.kind}`">
                <svg viewBox="0 0 64 64" aria-hidden="true">
                  <path :d="item.iconPath" />
                </svg>
              </div>
            </div>
            <div class="result-value">
              <span class="result-num">{{ item.value }}</span>
              <span class="result-unit">{{ item.unit }}</span>
            </div>
            <div class="result-label">{{ item.label }}</div>
          </div>
        </div>
      </section>

      <section class="panel panel--forest">
        <div class="panel-head panel-head--split">
          <div class="panel-title-wrap">
            <div class="panel-title">森林防火能力</div>
            <div class="panel-subtitle">单位：家</div>
          </div>
          <div class="legend">
            <div v-for="item in legendItems" :key="item.name" class="legend-item">
              <span class="legend-dot" :style="{ background: item.color }"></span>
              <span class="legend-name">{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="forest-chart">
          <EChart :option="forestOption" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

const actionNodesLeft = ['城镇燃气', '电动自行车', '大型商业综合体']
const actionNodesRight = ['建筑施工', '危险化学品', '非煤矿山']

const actionTabs = ['自助网', '报警器', '设备']
const activeActionTab = ref<(typeof actionTabs)[number]>(actionTabs[0])

const installStats = computed(() => {
  const map = {
    自助网: [
      { label: '应安装数量', value: '50.72', unit: '万户' },
      { label: '安装数量', value: '45.02', unit: '万户' },
      { label: '安装率', value: '88.77', unit: '%' }
    ],
    报警器: [
      { label: '应安装数量', value: '14.30', unit: '万户' },
      { label: '安装数量', value: '12.86', unit: '万户' },
      { label: '安装率', value: '89.93', unit: '%' }
    ],
    设备: [
      { label: '应安装数量', value: '8.60', unit: '万户' },
      { label: '安装数量', value: '7.92', unit: '万户' },
      { label: '安装率', value: '92.09', unit: '%' }
    ]
  } as const
  return map[activeActionTab.value]
})

const actionRankRows = computed(() => {
  const map = {
    自助网: [
      { name: '海城市', rank: '第十名', rate: '79.53%' },
      { name: '台安县', rank: '第一名', rate: '100.00%' },
      { name: '铁东区', rank: '第二名', rate: '100.00%' },
      { name: '铁西区', rank: '第三名', rate: '100.00%' },
      { name: '立山区', rank: '第四名', rate: '100.00%' }
    ],
    报警器: [
      { name: '铁西区', rank: '第一名', rate: '100.00%' },
      { name: '铁东区', rank: '第二名', rate: '99.32%' },
      { name: '立山区', rank: '第三名', rate: '98.60%' },
      { name: '台安县', rank: '第四名', rate: '96.40%' },
      { name: '海城市', rank: '第九名', rate: '82.15%' }
    ],
    设备: [
      { name: '立山区', rank: '第一名', rate: '100.00%' },
      { name: '铁西区', rank: '第二名', rate: '99.10%' },
      { name: '铁东区', rank: '第三名', rate: '98.25%' },
      { name: '台安县', rank: '第五名', rate: '93.70%' },
      { name: '海城市', rank: '第八名', rate: '86.45%' }
    ]
  } as const
  return map[activeActionTab.value]
})

const resultMetrics = [
  {
    kind: 'people',
    label: '临时救助人次',
    value: '6839',
    unit: '人',
    iconPath:
      'M32 34c7.2 0 13-5.8 13-13S39.2 8 32 8 19 13.8 19 21s5.8 13 13 13zm0 6c-10.5 0-19 6.7-19 15v1h38v-1c0-8.3-8.5-15-19-15z'
  },
  {
    kind: 'money',
    label: '发放临时救助金',
    value: '393',
    unit: '万元',
    iconPath: 'M14 18h36v28H14V18zm4 6v16h28V24H18zm7 4h14v4H25v-4zM22 50h20v4H22v-4z'
  },
  {
    kind: 'fund',
    label: '国补专项救助金',
    value: '62.16',
    unit: '万元',
    iconPath:
      'M32 10l20 10v12c0 12.2-8.5 22.8-20 26-11.5-3.2-20-13.8-20-26V20l20-10zm0 10a8 8 0 100 16 8 8 0 000-16zm-10 30h20v4H22v-4z'
  }
]

const legendItems = [
  { name: '高', color: '#ffb84a' },
  { name: '中高', color: '#ffe24a' },
  { name: '中', color: '#40f3b8' },
  { name: '中低', color: '#33d5ff' },
  { name: '低', color: '#7c5cff' }
]

const forestOption = computed(() => {
  const districts = ['海城市', '台安县', '岫岩县', '铁东区', '铁西区', '立山区']
  const seriesData = {
    高: [12, 10, 2, 4, 1, 0],
    中高: [7, 0, 0, 2, 2, 0],
    中: [0, 10, 10, 6, 0, 1],
    中低: [0, 0, 12, 0, 8, 5],
    低: [0, 0, 0, 0, 0, 2]
  }

  const makeGradient = (color: string) => ({
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      { offset: 0, color: 'rgba(255,255,255,0.18)' },
      { offset: 1, color }
    ]
  })

  const colors: Record<string, string> = {
    高: '#ffb84a',
    中高: '#ffe24a',
    中: '#40f3b8',
    中低: '#33d5ff',
    低: '#7c5cff'
  }

  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 140, right: 40, top: 34, bottom: 28 },
    xAxis: {
      type: 'value',
      max: 30,
      splitNumber: 6,
      axisLabel: { color: 'rgba(214, 238, 255, 0.55)', fontSize: 14 },
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.14)' } }
    },
    yAxis: {
      type: 'category',
      data: districts,
      axisLabel: { color: 'rgba(214, 238, 255, 0.86)', fontSize: 18 },
      axisTick: { show: false },
      axisLine: { show: false }
    },
    series: legendItems.map((legend) => ({
      name: legend.name,
      type: 'bar',
      stack: 'total',
      barWidth: 22,
      data: (seriesData as any)[legend.name] ?? [],
      itemStyle: {
        borderRadius: legend.name === '低' ? [0, 12, 12, 0] : 0,
        color: makeGradient(colors[legend.name])
      }
    }))
  }
})
</script>

<style scoped>
.right-wrap {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: 26px;
  min-height: 0;
}

.side-wrap {
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.action-panel {
  min-height: 0;
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 86px 28px 26px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  box-sizing: border-box;
}

.action-panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}

.action-head {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 86px;
  padding: 0 26px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.action-title {
  height: 54px;
  display: inline-flex;
  align-items: center;
  font-size: 44px;
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
}

.action-body {
  height: 54%;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1.4fr 1fr;
  gap: 28px;
  align-items: center;
}

.action-node-col {
  display: grid;
  gap: 26px;
}

.action-node {
  display: grid;
  justify-items: center;
  gap: 10px;
}

.action-node-pill {
  width: 420px;
  height: 72px;
  border-radius: 18px;
  border: 1px solid rgba(94, 197, 255, 0.16);
  background: rgba(6, 18, 48, 0.32);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.86);
  letter-spacing: 2px;
  box-shadow: inset 0 0 24px rgba(54, 232, 255, 0.06);
}

.action-node-base {
  width: 110px;
  height: 26px;
  border-radius: 999px;
  border: 1px solid rgba(54, 232, 255, 0.22);
  background: radial-gradient(circle at 50% 40%, rgba(54, 232, 255, 0.22), rgba(6, 18, 48, 0));
  box-shadow: 0 0 20px rgba(54, 232, 255, 0.14);
}

.action-core {
  display: grid;
  place-items: center;
}

.action-holo {
  width: 560px;
  height: 560px;
  border-radius: 999px;
  position: relative;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 50% 40%, rgba(54, 232, 255, 0.18), rgba(6, 18, 48, 0));
  filter: drop-shadow(0 0 18px rgba(54, 232, 255, 0.16));
}

.action-holo-glow {
  position: absolute;
  inset: -40px;
  border-radius: 999px;
  background: radial-gradient(
    circle at 50% 40%,
    rgba(54, 232, 255, 0.35),
    rgba(54, 232, 255, 0.08) 42%,
    rgba(6, 18, 48, 0) 70%
  );
  filter: blur(10px);
  opacity: 0.55;
  animation: holoGlow 3.6s ease-in-out infinite;
  pointer-events: none;
}

.action-holo-ring {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 2px solid rgba(54, 232, 255, 0.22);
  box-shadow:
    inset 0 0 60px rgba(54, 232, 255, 0.12),
    0 0 60px rgba(54, 232, 255, 0.14);
  animation: holoRing 4.8s ease-in-out infinite;
}

.action-holo-ring::before {
  content: '';
  position: absolute;
  inset: 22px;
  border-radius: 999px;
  border: 2px solid rgba(54, 232, 255, 0.14);
  opacity: 0.9;
}

.action-holo-ring::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: conic-gradient(
    from 0deg,
    rgba(54, 232, 255, 0),
    rgba(54, 232, 255, 0.26),
    rgba(54, 232, 255, 0)
  );
  mask: radial-gradient(circle, transparent 66%, #000 68%);
  opacity: 0.55;
  animation: holoSpin 6s linear infinite;
  pointer-events: none;
}

.action-holo-beam {
  position: absolute;
  left: 50%;
  top: 54%;
  width: 160px;
  height: 220px;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    rgba(54, 232, 255, 0.18),
    rgba(54, 232, 255, 0.08),
    rgba(54, 232, 255, 0)
  );
  filter: blur(0.2px);
  opacity: 0.65;
  clip-path: polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%);
  animation: holoBeam 3.6s ease-in-out infinite;
  pointer-events: none;
}

.action-holo-base {
  position: absolute;
  left: 50%;
  bottom: -26px;
  width: 720px;
  height: 280px;
  transform: translateX(-50%);
  pointer-events: none;
}

.action-holo-base-ring {
  position: absolute;
  left: 50%;
  top: 110px;
  border-radius: 999px;
  transform: translateX(-50%) perspective(900px) rotateX(72deg);
  box-shadow:
    0 0 28px rgba(54, 232, 255, 0.12),
    inset 0 0 22px rgba(54, 232, 255, 0.12);
  opacity: 0.85;
}

.action-holo-base-ring--a {
  width: 620px;
  height: 220px;
  border: 2px solid rgba(54, 232, 255, 0.22);
  animation: basePulse 3.6s ease-in-out infinite;
}

.action-holo-base-ring--b {
  width: 520px;
  height: 190px;
  border: 2px solid rgba(54, 232, 255, 0.14);
  top: 120px;
  opacity: 0.7;
  animation: basePulse 3.6s ease-in-out infinite 0.5s;
}

.action-holo-base-ring--c {
  width: 420px;
  height: 160px;
  border: 2px solid rgba(54, 232, 255, 0.1);
  top: 132px;
  opacity: 0.55;
  animation: basePulse 3.6s ease-in-out infinite 1s;
}

.action-holo-text {
  position: relative;
  z-index: 1;
  text-align: center;
  color: rgba(240, 251, 255, 0.95);
  text-shadow: 0 0 20px rgba(54, 232, 255, 0.26);
}

.action-holo-main {
  font-size: 64px;
  font-weight: 900;
  letter-spacing: 10px;
}

.action-holo-sub {
  margin-top: 10px;
  font-size: 44px;
  font-weight: 900;
  letter-spacing: 8px;
}

@keyframes holoGlow {
  0%,
  100% {
    opacity: 0.42;
    transform: scale(0.98);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.02);
  }
}

@keyframes holoRing {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.18);
  }
}

@keyframes holoSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes holoBeam {
  0%,
  100% {
    opacity: 0.52;
  }
  50% {
    opacity: 0.82;
  }
}

@keyframes basePulse {
  0%,
  100% {
    opacity: 0.55;
    transform: translateX(-50%) perspective(900px) rotateX(72deg) scale(0.98);
  }
  50% {
    opacity: 0.95;
    transform: translateX(-50%) perspective(900px) rotateX(72deg) scale(1.03);
  }
}

.action-bottom {
  margin-top: 28px;
  height: calc(46% - 28px);
  min-height: 0;
  display: grid;
  grid-template-columns: 520px 1fr;
  gap: 22px;
}

.action-stats {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 18px;
  min-height: 0;
}

.action-stat {
  border-radius: 14px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.46);
  padding: 18px 18px;
  box-sizing: border-box;
  display: grid;
  align-content: center;
  gap: 10px;
}

.action-stat-label {
  font-size: 20px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.78);
}

.action-stat-value {
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
}

.action-stat-num {
  font-size: 44px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  text-shadow: 0 0 14px rgba(45, 216, 255, 0.22);
}

.action-stat-unit {
  font-size: 18px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.72);
}

.action-table {
  min-height: 0;
  border-radius: 14px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.32);
  overflow: hidden;
  padding: 18px 18px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.action-tabs {
  display: flex;
  gap: 14px;
  justify-content: center;
  margin-bottom: 14px;
}

.action-tab {
  border: none;
  outline: none;
  min-width: 140px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(84, 188, 255, 0.18);
  background: rgba(6, 18, 48, 0.34);
  color: rgba(214, 238, 255, 0.78);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-tab--active {
  color: rgba(240, 251, 255, 0.96);
  border-color: rgba(54, 232, 255, 0.42);
  background: radial-gradient(circle at 30% 30%, rgba(54, 232, 255, 0.2), rgba(6, 18, 48, 0.45));
  box-shadow:
    inset 0 0 18px rgba(54, 232, 255, 0.12),
    0 0 14px rgba(54, 232, 255, 0.12);
}

.action-table-title {
  text-align: center;
  font-size: 26px;
  font-weight: 900;
  letter-spacing: 3px;
  color: rgba(240, 251, 255, 0.9);
  margin-bottom: 12px;
}

.action-table-row {
  height: 54px;
  display: grid;
  grid-template-columns: 1.1fr 1fr 1.4fr;
  align-items: center;
  padding: 0 16px;
  border-top: 1px solid rgba(89, 194, 255, 0.12);
  color: rgba(214, 238, 255, 0.82);
  font-size: 18px;
  box-sizing: border-box;
}

.action-table-head {
  border-top: none;
  background: rgba(20, 30, 75, 0.42);
  color: rgba(234, 240, 255, 0.95);
  font-weight: 900;
}

.panel {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 82px 28px 26px;
  /* background:
    linear-gradient(180deg, rgba(6, 27, 72, 0.6), rgba(4, 16, 44, 0.6)),
    url('@/assets/img/leftBg.png'); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  border: 1px solid rgba(84, 188, 255, 0.24);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  color: rgba(214, 238, 255, 0.86);
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

.panel-head--split {
  gap: 18px;
}

.panel-title {
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
  position: relative;
  z-index: 1;
}

.panel-title-wrap {
  display: grid;
  gap: 6px;
  position: relative;
  z-index: 1;
}

.panel-subtitle {
  font-size: 16px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.62);
}

.panel--result {
  height: 520px;
}

.panel--forest {
  flex: 1;
}

.result-grid {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  padding-top: 10px;
}

.result-card {
  position: relative;
  border: 1px solid rgba(89, 194, 255, 0.14);
  background: rgba(4, 16, 44, 0.46);
  border-radius: 16px;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 12px;
  box-shadow:
    inset 0 0 26px rgba(54, 232, 255, 0.08),
    0 10px 22px rgba(0, 12, 40, 0.35);
}

.result-card::before {
  content: '';
  position: absolute;
  inset: 10px;
  border-radius: 12px;
  border: 1px solid rgba(94, 197, 255, 0.1);
  pointer-events: none;
}

.result-card::after {
  content: '';
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  height: 64px;
  background: radial-gradient(circle at 50% 50%, rgba(54, 232, 255, 0.18), rgba(54, 232, 255, 0));
  opacity: 0.55;
  pointer-events: none;
}

.result-top {
  position: relative;
  width: 100%;
  height: 86px;
  display: grid;
  place-items: center;
}

.result-pedestal {
  position: absolute;
  width: 140px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(54, 232, 255, 0.18);
  background: radial-gradient(circle at 50% 40%, rgba(54, 232, 255, 0.18), rgba(6, 18, 48, 0.1));
  box-shadow:
    inset 0 0 18px rgba(54, 232, 255, 0.08),
    0 0 18px rgba(54, 232, 255, 0.12);
  transform: translateY(18px);
}

.result-icon {
  width: 66px;
  height: 66px;
  border-radius: 18px;
  border: 1px solid rgba(120, 220, 255, 0.26);
  display: grid;
  place-items: center;
  box-shadow: 0 0 20px rgba(45, 216, 255, 0.12);
  position: relative;
  z-index: 1;
}

.result-icon svg {
  width: 40px;
  height: 40px;
  fill: rgba(240, 251, 255, 0.92);
  filter: drop-shadow(0 0 10px rgba(54, 232, 255, 0.22));
}

.result-icon--people {
  background: radial-gradient(circle at 30% 30%, rgba(54, 232, 255, 0.28), rgba(6, 18, 48, 0.18));
}

.result-icon--money {
  background: radial-gradient(circle at 30% 30%, rgba(255, 206, 74, 0.32), rgba(6, 18, 48, 0.18));
  border-color: rgba(255, 206, 74, 0.26);
}

.result-icon--fund {
  background: radial-gradient(circle at 30% 30%, rgba(124, 242, 255, 0.28), rgba(6, 18, 48, 0.18));
}

.result-value {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  position: relative;
  z-index: 1;
}

.result-num {
  font-size: 44px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  text-shadow: 0 0 14px rgba(45, 216, 255, 0.22);
}

.result-unit {
  font-size: 18px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.72);
}

.result-label {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 1px;
  color: rgba(214, 238, 255, 0.78);
  position: relative;
  z-index: 1;
}

.legend {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
  position: relative;
  z-index: 1;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.72);
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(45, 216, 255, 0.15);
}

.forest-chart {
  position: absolute;
  left: 10px;
  right: 10px;
  top: 92px;
  bottom: 18px;
}
</style>
