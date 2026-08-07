<template>
  <div class="center-wrap">
    <section class="panel panel--map">
      <div class="panel-title">灾情态势</div>
      <div class="map-box">
        <EChart :option="mapOption" />
      </div>
    </section>

    <div class="side">
      <section class="panel panel--weather">
        <div class="panel-title">气象预警</div>
        <div class="weather-list">
          <div class="weather-row">
            <span class="tag tag--orange">橙色</span>
            <span class="txt">暴雨</span>
            <span class="time">06:20</span>
          </div>
          <div class="weather-row">
            <span class="tag tag--yellow">黄色</span>
            <span class="txt">大风</span>
            <span class="time">07:10</span>
          </div>
          <div class="weather-row">
            <span class="tag tag--blue">蓝色</span>
            <span class="txt">雷电</span>
            <span class="time">08:05</span>
          </div>
          <div class="weather-row">
            <span class="tag tag--blue">蓝色</span>
            <span class="txt">道路结冰</span>
            <span class="time">09:30</span>
          </div>
        </div>
      </section>

      <section class="panel panel--event">
        <div class="panel-title">处置动态</div>
        <div class="event-table">
          <div class="event-row event-row--head">
            <span>时间</span>
            <span>事件</span>
            <span>状态</span>
          </div>
          <div class="event-row">
            <span>{{ eventRows[0].time }}</span>
            <span>{{ eventRows[0].name }}</span>
            <span class="st st--run">{{ eventRows[0].status }}</span>
          </div>
          <div class="event-row">
            <span>{{ eventRows[1].time }}</span>
            <span>{{ eventRows[1].name }}</span>
            <span class="st st--run">{{ eventRows[1].status }}</span>
          </div>
          <div class="event-row">
            <span>{{ eventRows[2].time }}</span>
            <span>{{ eventRows[2].name }}</span>
            <span class="st st--done">{{ eventRows[2].status }}</span>
          </div>
          <div class="event-row">
            <span>{{ eventRows[3].time }}</span>
            <span>{{ eventRows[3].name }}</span>
            <span class="st st--done">{{ eventRows[3].status }}</span>
          </div>
          <div class="event-row">
            <span>{{ eventRows[4].time }}</span>
            <span>{{ eventRows[4].name }}</span>
            <span class="st st--run">{{ eventRows[4].status }}</span>
          </div>
        </div>
      </section>
    </div>

    <section class="panel panel--bottom">
      <div class="panel-title">重点区域</div>
      <div class="bottom-grid">
        <div class="bottom-item">
          <div class="b-label">海城市</div>
          <div class="b-value">18</div>
          <div class="b-unit">预警</div>
        </div>
        <div class="bottom-item">
          <div class="b-label">台安县</div>
          <div class="b-value">9</div>
          <div class="b-unit">预警</div>
        </div>
        <div class="bottom-item">
          <div class="b-label">岫岩县</div>
          <div class="b-value">12</div>
          <div class="b-unit">预警</div>
        </div>
        <div class="bottom-item">
          <div class="b-label">铁东区</div>
          <div class="b-value">6</div>
          <div class="b-unit">预警</div>
        </div>
        <div class="bottom-item">
          <div class="b-label">铁西区</div>
          <div class="b-value">5</div>
          <div class="b-unit">预警</div>
        </div>
        <div class="bottom-item">
          <div class="b-label">立山区</div>
          <div class="b-value">4</div>
          <div class="b-unit">预警</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import EChart from '@/components/echarts/EChart.vue'

const mapReady = ref(false)
const ANSHAN_GEO_URL = 'https://geo.datav.aliyun.com/areas_v3/bound/210300_full.json'

const REGION_COORDS: Record<string, [number, number]> = {
  台安县: [122.42, 41.26],
  海城市: [122.73, 40.87],
  岫岩满族自治县: [123.27, 40.28],
  铁东区: [123.18, 41.12],
  铁西区: [122.95, 41.12],
  立山区: [123.03, 41.15]
}

const mapPoints = [
  { name: '海城市', value: 18 },
  { name: '台安县', value: 9 },
  { name: '岫岩满族自治县', value: 12 },
  { name: '铁东区', value: 6 },
  { name: '铁西区', value: 5 },
  { name: '立山区', value: 4 }
]

const eventRows = [
  { time: '09:12', name: '沿河低洼积水', status: '处置中' },
  { time: '08:46', name: '山区道路结冰', status: '处置中' },
  { time: '08:10', name: '临河护栏破损', status: '已完成' },
  { time: '07:35', name: '老旧小区消防隐患', status: '已完成' },
  { time: '06:58', name: '地质灾害点巡查', status: '处置中' }
]

onMounted(async () => {
  try {
    const res = await fetch(ANSHAN_GEO_URL)
    if (!res.ok) return
    const geoJson = await res.json()
    echarts.registerMap('anshan', geoJson)
    mapReady.value = true
  } catch {
    mapReady.value = false
  }
})

const mapOption = computed(() => {
  if (!mapReady.value) return {}
  const points = mapPoints
    .map((p) => {
      const coord = REGION_COORDS[p.name]
      if (!coord) return null
      return { name: p.name, value: [coord[0], coord[1], p.value] }
    })
    .filter(Boolean) as any[]

  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    geo: {
      map: 'anshan',
      roam: false,
      zoom: 1.12,
      itemStyle: {
        areaColor: 'rgba(20, 140, 220, 0.45)',
        borderColor: 'rgba(140, 245, 255, 0.32)',
        borderWidth: 2,
        shadowBlur: 30,
        shadowColor: 'rgba(0, 160, 255, 0.18)'
      },
      emphasis: {
        itemStyle: { areaColor: 'rgba(80, 200, 255, 0.65)' }
      },
      label: { show: false }
    },
    series: [
      {
        type: 'map',
        map: 'anshan',
        geoIndex: 0,
        data: []
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: points,
        symbolSize: (val: any) => Math.max(10, Math.min(26, val[2] * 1.2)),
        showEffectOn: 'render',
        rippleEffect: { brushType: 'stroke', scale: 2.8 },
        label: {
          show: true,
          formatter: (p: any) => `${p.name}\n${p.value[2]}`,
          color: 'rgba(240, 251, 255, 0.95)',
          fontSize: 14,
          fontWeight: 700
        },
        itemStyle: {
          color: '#39d5ff',
          shadowBlur: 18,
          shadowColor: 'rgba(45, 216, 255, 0.35)'
        },
        zlevel: 2
      }
    ]
  }
})
</script>

<style scoped>
.center-wrap {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1100px;
  grid-template-rows: 1fr 420px;
  gap: 26px;
  min-height: 0;
}

.panel {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 92px 28px 26px;
  background:
    linear-gradient(180deg, rgba(6, 27, 72, 0.6), rgba(4, 16, 44, 0.6)),
    url('@/assets/img/leftBg.png');
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
}

.panel--map {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.map-box {
  position: absolute;
  left: 28px;
  right: 28px;
  top: 92px;
  bottom: 28px;
}

.side {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  gap: 26px;
  min-height: 0;
}

.panel--weather,
.panel--event {
  flex: 1;
}

.panel--bottom {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
}

.weather-list {
  margin-top: 10px;
  display: grid;
  gap: 16px;
}

.weather-row {
  height: 64px;
  display: grid;
  grid-template-columns: 120px 1fr 110px;
  align-items: center;
  padding: 0 16px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.58);
  border-radius: 12px;
  box-sizing: border-box;
}

.tag {
  height: 36px;
  line-height: 36px;
  border-radius: 18px;
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  color: rgba(240, 251, 255, 0.96);
}

.tag--orange {
  background: rgba(255, 148, 64, 0.8);
}

.tag--yellow {
  background: rgba(255, 206, 74, 0.75);
  color: rgba(30, 20, 0, 0.86);
}

.tag--blue {
  background: rgba(57, 213, 255, 0.55);
}

.txt {
  font-size: 22px;
  font-weight: 700;
}

.time {
  text-align: right;
  font-size: 20px;
  color: rgba(214, 238, 255, 0.72);
}

.event-table {
  margin-top: 10px;
  display: grid;
  gap: 12px;
}

.event-row {
  height: 64px;
  display: grid;
  grid-template-columns: 130px 1fr 120px;
  align-items: center;
  padding: 0 16px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.58);
  border-radius: 12px;
  box-sizing: border-box;
  gap: 14px;
  font-size: 20px;
}

.event-row span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.event-row--head {
  background: rgba(20, 30, 75, 0.55);
  color: rgba(234, 240, 255, 0.95);
  font-weight: 700;
}

.st {
  justify-self: end;
  font-weight: 800;
}

.st--run {
  color: rgba(255, 190, 94, 0.95);
  text-shadow: 0 0 10px rgba(255, 169, 60, 0.18);
}

.st--done {
  color: rgba(92, 255, 178, 0.95);
  text-shadow: 0 0 10px rgba(34, 255, 154, 0.16);
}

.bottom-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 18px;
}

.bottom-item {
  height: 260px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background:
    linear-gradient(135deg, rgba(150, 245, 255, 0.14) 0 22%, transparent 22% 100%),
    rgba(6, 18, 48, 0.48);
  border-radius: 14px;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 12px;
}

.b-label {
  font-size: 20px;
  color: rgba(214, 238, 255, 0.82);
}

.b-value {
  font-size: 54px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  text-shadow: 0 0 16px rgba(45, 216, 255, 0.18);
}

.b-unit {
  font-size: 20px;
  color: rgba(214, 238, 255, 0.72);
}
</style>
