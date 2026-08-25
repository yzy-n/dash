<template>
  <main class="center">
    <section class="panel panel--map">
      <div class="map-head">
        <div class="map-title">城市设施水平</div>
      </div>

      <div class="map-stage">
        <div class="metrics metrics--left">
          <div class="metrics-stack metrics-stack--outer">
            <div v-for="item in leftOuterMetrics" :key="item.label" class="metric-card">
              <div class="metric-label">{{ item.label }}</div>
              <div class="metric-rows">
                <div class="metric-row">
                  <span class="metric-city">鞍山</span>
                  <span class="metric-val">{{ item.anshan }}</span>
                  <span
                    v-if="item.anshanTrend"
                    class="metric-trend"
                    :class="`metric-trend--${item.anshanTrend}`"
                  ></span>
                </div>
                <div class="metric-row">
                  <span class="metric-city">辽宁</span>
                  <span class="metric-val">{{ item.liaoning }}</span>
                  <span
                    v-if="item.liaoningTrend"
                    class="metric-trend"
                    :class="`metric-trend--${item.liaoningTrend}`"
                  ></span>
                </div>
              </div>
              <span class="metric-connector"></span>
            </div>
          </div>

          <div class="metrics-stack metrics-stack--inner">
            <div
              v-for="item in leftInnerMetrics"
              :key="item.label"
              class="metric-card metric-card--inner"
            >
              <div class="metric-label">{{ item.label }}</div>
              <div class="metric-rows">
                <div class="metric-row">
                  <span class="metric-city">鞍山</span>
                  <span class="metric-val">{{ item.anshan }}</span>
                  <span
                    v-if="item.anshanTrend"
                    class="metric-trend"
                    :class="`metric-trend--${item.anshanTrend}`"
                  ></span>
                </div>
                <div class="metric-row">
                  <span class="metric-city">辽宁</span>
                  <span class="metric-val">{{ item.liaoning }}</span>
                  <span
                    v-if="item.liaoningTrend"
                    class="metric-trend"
                    :class="`metric-trend--${item.liaoningTrend}`"
                  ></span>
                </div>
              </div>
              <span class="metric-connector"></span>
            </div>
          </div>
        </div>

        <div class="holo">
          <div class="holo-glow"></div>
          <div class="holo-scan"></div>
          <div class="holo-ring holo-ring--outer"></div>
          <div class="holo-ring holo-ring--dash"></div>
          <div class="holo-ticks"></div>
          <div class="holo-core">
            <div class="holo-icon"></div>
          </div>
          <div class="holo-base">
            <div class="holo-base-ring holo-base-ring--a"></div>
            <div class="holo-base-ring holo-base-ring--b"></div>
            <div class="holo-base-ring holo-base-ring--c"></div>
          </div>
        </div>

        <div class="metrics metrics--right">
          <div class="metrics-stack metrics-stack--outer">
            <div v-for="item in rightOuterMetrics" :key="item.label" class="metric-card">
              <div class="metric-label">{{ item.label }}</div>
              <div class="metric-rows">
                <div class="metric-row">
                  <span class="metric-city">鞍山</span>
                  <span class="metric-val">{{ item.anshan }}</span>
                  <span
                    v-if="item.anshanTrend"
                    class="metric-trend"
                    :class="`metric-trend--${item.anshanTrend}`"
                  ></span>
                </div>
                <div class="metric-row">
                  <span class="metric-city">辽宁</span>
                  <span class="metric-val">{{ item.liaoning }}</span>
                  <span
                    v-if="item.liaoningTrend"
                    class="metric-trend"
                    :class="`metric-trend--${item.liaoningTrend}`"
                  ></span>
                </div>
              </div>
              <span class="metric-connector"></span>
            </div>
          </div>

          <div class="metrics-stack metrics-stack--inner">
            <div
              v-for="item in rightInnerMetrics"
              :key="item.label"
              class="metric-card metric-card--inner"
            >
              <div class="metric-label">{{ item.label }}</div>
              <div class="metric-rows">
                <div class="metric-row">
                  <span class="metric-city">鞍山</span>
                  <span class="metric-val">{{ item.anshan }}</span>
                  <span
                    v-if="item.anshanTrend"
                    class="metric-trend"
                    :class="`metric-trend--${item.anshanTrend}`"
                  ></span>
                </div>
                <div class="metric-row">
                  <span class="metric-city">辽宁</span>
                  <span class="metric-val">{{ item.liaoning }}</span>
                  <span
                    v-if="item.liaoningTrend"
                    class="metric-trend"
                    :class="`metric-trend--${item.liaoningTrend}`"
                  ></span>
                </div>
              </div>
              <span class="metric-connector"></span>
            </div>
          </div>
        </div>

        <div class="map-ground"></div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
type MetricRow = {
  label: string
  anshan: string
  liaoning: string
  anshanTrend?: 'up' | 'down'
  liaoningTrend?: 'up' | 'down'
}

const leftOuterMetrics: MetricRow[] = [
  {
    label: '人均日生活用水量（升）',
    anshan: '123.46',
    liaoning: '153.41',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  },
  {
    label: '供水普及率（%）',
    anshan: '99.85',
    liaoning: '97.59',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  },
  {
    label: '公共排水普及率（%）',
    anshan: '99.85',
    liaoning: '96.28',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  },
  {
    label: '燃气普及率（%）',
    anshan: '99.11',
    liaoning: '95.88',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  },
  {
    label: '排水管道密度（公里/平方公里）',
    anshan: '5.66',
    liaoning: '7.11',
    anshanTrend: 'down',
    liaoningTrend: 'up'
  },
  {
    label: '污水处理率（%）',
    anshan: '96.54',
    liaoning: '98.46',
    anshanTrend: 'down',
    liaoningTrend: 'up'
  }
]

const leftInnerMetrics: MetricRow[] = [
  {
    label: '人口密度（人/平方公里）',
    anshan: '2115.24',
    liaoning: '1781.44',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  },
  {
    label: '供水管道密度（公里/平方公里）',
    anshan: '17.14',
    liaoning: '12.19',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  },
  {
    label: '建成区路网密度（公里/平方公里）',
    anshan: '7.63',
    liaoning: '7.43',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  }
]

const rightOuterMetrics: MetricRow[] = [
  {
    label: '人均城市道路面积（平方米）',
    anshan: '21.01',
    liaoning: '22.03',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  },
  {
    label: '人均公园绿地面积（平方米）',
    anshan: '12.93',
    liaoning: '13.28',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  },
  {
    label: '建成区绿地率（%）',
    anshan: '35.66',
    liaoning: '35.55',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  },
  {
    label: '建成区绿化覆盖率（%）',
    anshan: '36.92',
    liaoning: '38.04',
    anshanTrend: 'down',
    liaoningTrend: 'up'
  },
  {
    label: '生活垃圾处理率（%）',
    anshan: '100',
    liaoning: '99.35',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  },
  {
    label: '生活垃圾无害化处理率（%）',
    anshan: '100',
    liaoning: '98.69',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  }
]

const rightInnerMetrics: MetricRow[] = [
  {
    label: '建成区道路面积率（%）',
    anshan: '14.78',
    liaoning: '13.9',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  },
  {
    label: '污水处理厂集中处理率（%）',
    anshan: '95.81',
    liaoning: '97.95',
    anshanTrend: 'down',
    liaoningTrend: 'up'
  },
  {
    label: '公园绿地服务半径覆盖率（%）',
    anshan: '76.28',
    liaoning: '77.91',
    anshanTrend: 'up',
    liaoningTrend: 'down'
  }
]
</script>

<style scoped>
.center {
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 0;
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

.panel--map {
  flex: 1;
  min-height: 0;
}

.map-head {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.map-title {
  height: 70px;
  padding: 0 88px;
  border-radius: 16px;
  border: 1px solid rgba(54, 232, 255, 0.3);
  background: linear-gradient(180deg, rgba(0, 160, 255, 0.18), rgba(6, 18, 48, 0.2));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 44px;
  font-weight: 900;
  letter-spacing: 6px;
  color: rgba(240, 251, 255, 0.95);
  text-shadow: 0 0 18px rgba(45, 216, 255, 0.22);
  clip-path: polygon(
    18px 0,
    calc(100% - 18px) 0,
    100% 50%,
    calc(100% - 18px) 100%,
    18px 100%,
    0 50%
  );
  box-shadow:
    inset 0 0 30px rgba(54, 232, 255, 0.1),
    0 0 26px rgba(54, 232, 255, 0.14);
  position: relative;
}

.map-title::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(54, 232, 255, 0.18);
  clip-path: polygon(
    14px 0,
    calc(100% - 14px) 0,
    100% 50%,
    calc(100% - 14px) 100%,
    14px 100%,
    0 50%
  );
  pointer-events: none;
}

.map-stage {
  position: absolute;
  inset: 0;
  padding: 140px 54px 54px;
  display: grid;
  grid-template-columns: 1100px 1fr 1100px;
  gap: 44px;
  align-items: center;
  box-sizing: border-box;
}

.metrics {
  position: relative;
  display: block;
  --metric-card-h: 170px;
  --metric-gap: 18px;
  min-height: 0;
  z-index: 2;
}

.metrics--left {
  display: block;
}

.metrics--right {
  display: block;
}

.metrics-stack {
  display: flex;
  flex-direction: column;
  gap: var(--metric-gap);
  min-height: 0;
}

.metrics-stack--outer {
  width: 760px;
  position: relative;
  z-index: 1;
}

.metrics--right .metrics-stack--outer {
  margin-left: auto;
}

.metrics-stack--inner {
  position: absolute;
  top: 0;
  width: 620px;
  height: calc(var(--metric-card-h) * 6 + var(--metric-gap) * 5);
  z-index: 2;
}

.metrics--left .metrics-stack--inner {
  right: -320px;
}

.metrics--right .metrics-stack--inner {
  left: -320px;
}

.metrics-stack--inner .metric-card {
  position: absolute;
  height: var(--metric-card-h);
}

.metrics--left .metrics-stack--inner .metric-card {
  width: 620px;
  right: 0;
}

.metrics--right .metrics-stack--inner .metric-card {
  width: 620px;
  left: 0;
}

.metrics-stack--inner .metric-card:nth-child(1) {
  top: calc((var(--metric-card-h) + var(--metric-gap)) * 0.5);
}

.metrics-stack--inner .metric-card:nth-child(2) {
  top: calc((var(--metric-card-h) + var(--metric-gap)) * 2.5);
}

.metrics-stack--inner .metric-card:nth-child(3) {
  top: calc((var(--metric-card-h) + var(--metric-gap)) * 4.5);
}

.metric-card {
  width: 100%;
  min-height: 0;
  height: var(--metric-card-h);
  border-radius: 14px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background:
    linear-gradient(45deg, rgba(54, 232, 255, 0.08), rgba(54, 232, 255, 0) 42%),
    linear-gradient(180deg, rgba(16, 66, 130, 0.18), rgba(6, 18, 48, 0.45));
  padding: 14px 16px;
  box-sizing: border-box;
  display: grid;
  gap: 12px;
  position: relative;
  overflow: hidden;
}

.metric-card::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}

.metric-label {
  font-size: 20px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.86);
  letter-spacing: 2px;
  padding-left: 14px;
  position: relative;
}

.metric-label::before {
  content: '';
  width: 6px;
  height: 18px;
  border-radius: 999px;
  background: rgba(54, 232, 255, 0.35);
  box-shadow: 0 0 12px rgba(54, 232, 255, 0.16);
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.metric-rows {
  display: grid;
  gap: 8px;
  padding-left: 14px;
  padding-right: 6px;
}

.metric-row {
  display: grid;
  grid-template-columns: 72px 1fr 26px;
  align-items: center;
  gap: 10px;
}

.metric-city {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.62);
}

.metric-val {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.94);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.16);
}

.metric-trend {
  width: 0;
  height: 0;
  justify-self: end;
  opacity: 0.95;
}

.metric-trend--up {
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 10px solid rgba(92, 255, 178, 0.95);
  filter: drop-shadow(0 0 8px rgba(92, 255, 178, 0.2));
}

.metric-trend--down {
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 10px solid rgba(255, 120, 120, 0.95);
  filter: drop-shadow(0 0 8px rgba(255, 120, 120, 0.2));
}

.metric-connector {
  position: absolute;
  top: 50%;
  width: 70px;
  height: 1px;
  transform: translateY(-50%);
  background: linear-gradient(
    90deg,
    rgba(54, 232, 255, 0),
    rgba(54, 232, 255, 0.28),
    rgba(54, 232, 255, 0.12)
  );
  opacity: 0.8;
  pointer-events: none;
}

.metric-connector::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  transform: translateY(-50%);
  background: rgba(54, 232, 255, 0.95);
  box-shadow: 0 0 16px rgba(54, 232, 255, 0.18);
}

.metrics--left .metric-connector {
  right: -70px;
}

.metrics--left .metric-connector::after {
  right: 0;
}

.metrics--right .metric-connector {
  left: -70px;
  background: linear-gradient(
    90deg,
    rgba(54, 232, 255, 0.12),
    rgba(54, 232, 255, 0.28),
    rgba(54, 232, 255, 0)
  );
}

.metrics--right .metric-connector::after {
  left: 0;
}

.metric-card--inner .metric-connector {
  width: 44px;
}

.metrics--left .metric-card--inner .metric-connector {
  right: -44px;
}

.metrics--right .metric-card--inner .metric-connector {
  left: -44px;
}

.holo {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  place-items: center;
  z-index: 2;
}

.holo-glow {
  position: absolute;
  width: 1320px;
  height: 1320px;
  border-radius: 999px;
  background: radial-gradient(
    circle at 50% 40%,
    rgba(54, 232, 255, 0.26),
    rgba(54, 232, 255, 0.08) 45%,
    rgba(6, 18, 48, 0) 72%
  );
  filter: blur(14px);
  opacity: 0.6;
  animation: holoGlow 3.6s ease-in-out infinite;
}

.holo-ring {
  position: absolute;
  border-radius: 999px;
}

.holo-ring--outer {
  width: 1020px;
  height: 1020px;
  border: 2px solid rgba(54, 232, 255, 0.14);
  box-shadow:
    inset 0 0 80px rgba(54, 232, 255, 0.1),
    0 0 80px rgba(54, 232, 255, 0.12);
}

.holo-ring--dash {
  width: 860px;
  height: 860px;
  border: 2px dashed rgba(54, 232, 255, 0.22);
  opacity: 0.7;
  animation: dashSpin 10s linear infinite;
}

.holo-scan {
  position: absolute;
  width: 920px;
  height: 920px;
  border-radius: 999px;
  background: conic-gradient(
    rgba(54, 232, 255, 0) 0deg,
    rgba(54, 232, 255, 0.18) 32deg,
    rgba(54, 232, 255, 0) 68deg,
    rgba(54, 232, 255, 0) 360deg
  );
  filter: blur(1px);
  opacity: 0.55;
  animation: scanSpin 6.2s linear infinite;
}

.holo-ticks {
  position: absolute;
  width: 900px;
  height: 900px;
  border-radius: 999px;
  background: repeating-conic-gradient(
    from 0deg,
    rgba(54, 232, 255, 0.18) 0deg 2deg,
    rgba(54, 232, 255, 0) 2deg 10deg
  );
  mask: radial-gradient(circle, transparent 0 62%, #000 63% 100%);
  opacity: 0.55;
  filter: blur(0.2px);
}

.holo-core {
  position: relative;
  width: 680px;
  height: 680px;
  border-radius: 999px;
  border: 2px solid rgba(54, 232, 255, 0.12);
  background: radial-gradient(circle at 50% 45%, rgba(54, 232, 255, 0.14), rgba(6, 18, 48, 0.06));
  display: grid;
  place-items: center;
  box-shadow: inset 0 0 60px rgba(54, 232, 255, 0.08);
}

.holo-icon {
  width: 240px;
  height: 240px;
  border-radius: 999px;
  border: 1px solid rgba(84, 188, 255, 0.2);
  background: radial-gradient(circle at 50% 40%, rgba(54, 232, 255, 0.2), rgba(6, 18, 48, 0.2));
  box-shadow:
    0 0 28px rgba(54, 232, 255, 0.12),
    inset 0 0 26px rgba(54, 232, 255, 0.08);
  position: relative;
}

.holo-icon::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 64px;
  height: 120px;
  transform: translate(-50%, -50%);
  border-radius: 34px;
  background: radial-gradient(
    circle at 50% 20%,
    rgba(240, 251, 255, 0.92),
    rgba(54, 232, 255, 0.18)
  );
}

.holo-base {
  position: absolute;
  left: 50%;
  bottom: 80px;
  width: 980px;
  height: 360px;
  transform: translateX(-50%);
  pointer-events: none;
}

.holo-base-ring {
  position: absolute;
  left: 50%;
  top: 160px;
  border-radius: 999px;
  transform: translateX(-50%) perspective(900px) rotateX(72deg);
  box-shadow:
    0 0 32px rgba(54, 232, 255, 0.12),
    inset 0 0 28px rgba(54, 232, 255, 0.1);
  opacity: 0.85;
  animation: basePulse 3.6s ease-in-out infinite;
}

.holo-base-ring--a {
  width: 860px;
  height: 310px;
  border: 2px solid rgba(54, 232, 255, 0.2);
}

.holo-base-ring--b {
  width: 720px;
  height: 270px;
  top: 172px;
  border: 2px solid rgba(54, 232, 255, 0.14);
  opacity: 0.68;
  animation-delay: 0.6s;
}

.holo-base-ring--c {
  width: 580px;
  height: 230px;
  top: 186px;
  border: 2px solid rgba(54, 232, 255, 0.1);
  opacity: 0.52;
  animation-delay: 1.2s;
}

.map-ground {
  position: absolute;
  left: 50%;
  bottom: 30px;
  width: 1500px;
  height: 520px;
  transform: translateX(-50%) perspective(1100px) rotateX(72deg);
  transform-origin: center;
  background:
    radial-gradient(circle at 50% 50%, rgba(54, 232, 255, 0.14), rgba(6, 18, 48, 0) 62%),
    radial-gradient(rgba(54, 232, 255, 0.22) 1px, transparent 1px);
  background-size:
    100% 100%,
    18px 18px;
  opacity: 0.65;
  filter: blur(0.2px);
  pointer-events: none;
  z-index: 1;
}

@keyframes holoGlow {
  0%,
  100% {
    opacity: 0.48;
    transform: scale(0.98);
  }
  50% {
    opacity: 0.72;
    transform: scale(1.02);
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

@keyframes scanSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dashSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
