<template>
  <div class="dash-center">
    <div class="wrap">
      <div class="space-grid"></div>

      <div class="top-metrics">
        <div class="top-metric">
          <div class="top-metric-label">总人口数</div>
          <div class="top-metric-value">
            <span class="num">{{ activeMetrics.totalPop }}</span>
            <span class="unit">万人</span>
          </div>
        </div>
        <div class="top-metric">
          <div class="top-metric-label">总户数</div>
          <div class="top-metric-value">
            <span class="num">{{ activeMetrics.households }}</span>
            <span class="unit">万户</span>
          </div>
        </div>
        <div class="top-metric">
          <div class="top-metric-label">机械增减人数</div>
          <div class="top-metric-value top-metric-value--small">
            <span class="num">{{ activeMetrics.mechanicalChange }}</span>
            <span class="unit">万人</span>
          </div>
        </div>
      </div>

      <div class="map-stage">
        <PeopleMap
          class="anshan-map"
          :data="mapSeriesData"
          :activeName="activeRegion === '全市' ? undefined : activeRegion"
          @region-change="handleRegionChange"
        />
        <div class="map-base-ring"></div>
      </div>

      <section class="corner-panel corner-panel--lt">
        <div class="corner-title">性别构成</div>
        <div class="corner-chart">
          <EChart :option="genderOption" />
        </div>
      </section>

      <section class="corner-panel corner-panel--rt">
        <div class="corner-title">年龄构成</div>
        <div class="corner-chart">
          <EChart :option="ageOption" />
        </div>
      </section>

      <section class="corner-panel corner-panel--lb">
        <div class="corner-title">计划生育</div>
        <div class="corner-chart">
          <EChart :option="birthOption" />
        </div>
      </section>

      <section class="corner-panel corner-panel--rb">
        <div class="corner-title">机械变动情况</div>
        <div class="corner-chart">
          <EChart :option="moveOption" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import EChart from '@/components/echarts/EChart.vue'
import PeopleMap from '../charts/center.vue'

type RegionKey =
  '全市' | '海城市' | '台安县' | '岫岩满族自治县' | '铁东区' | '铁西区' | '立山区' | '千山区'

const REGION_ALIAS: Record<string, RegionKey> = {
  岫岩县: '岫岩满族自治县',
  岫岩满族自治县: '岫岩满族自治县',
  海城市: '海城市',
  台安县: '台安县',
  铁东区: '铁东区',
  铁西区: '铁西区',
  立山区: '立山区',
  千山区: '千山区'
}

const regionList: RegionKey[] = [
  '全市',
  '海城市',
  '台安县',
  '岫岩满族自治县',
  '铁东区',
  '铁西区',
  '立山区',
  '千山区'
]

const regionData: Record<
  RegionKey,
  {
    totalPop: string
    households: string
    mechanicalChange: string
    male: number
    female: number
    age: Array<{ label: string; value: number; color: string }>
    births: Array<{ label: string; value: number; color: string }>
    moves: Array<{ label: string; value: number; color: string }>
    mapValue: number
  }
> = {
  全市: {
    totalPop: '333.44',
    households: '121.41',
    mechanicalChange: '-1.12',
    male: 166.6,
    female: 166.84,
    age: [
      { label: '0-17岁', value: 41.47, color: '#63d8ff' },
      { label: '18-34岁', value: 59.75, color: '#ffe24a' },
      { label: '35-59岁', value: 139.89, color: '#40f3b8' },
      { label: '60岁以上', value: 92.33, color: '#ff9aa2' }
    ],
    births: [
      { label: '出生', value: 3736, color: '#40f3b8' },
      { label: '死亡', value: 3820, color: '#ffe24a' },
      { label: '迁入', value: 1976, color: '#63d8ff' },
      { label: '迁出', value: 1951, color: '#ff7a7a' }
    ],
    moves: [
      { label: '工作调动', value: -1871, color: '#4a88ff' },
      { label: '就学迁入', value: -1333, color: '#40f3b8' },
      { label: '外出务工', value: 894, color: '#ffe24a' },
      { label: '省外迁入', value: 602, color: '#ff7a7a' }
    ],
    mapValue: 1260
  },
  海城市: {
    totalPop: '92.10',
    households: '33.20',
    mechanicalChange: '-0.22',
    male: 45.7,
    female: 46.4,
    age: [
      { label: '0-17岁', value: 10.4, color: '#63d8ff' },
      { label: '18-34岁', value: 16.9, color: '#ffe24a' },
      { label: '35-59岁', value: 38.1, color: '#40f3b8' },
      { label: '60岁以上', value: 26.7, color: '#ff9aa2' }
    ],
    births: [
      { label: '出生', value: 980, color: '#40f3b8' },
      { label: '死亡', value: 1110, color: '#ffe24a' },
      { label: '迁入', value: 620, color: '#63d8ff' },
      { label: '迁出', value: 690, color: '#ff7a7a' }
    ],
    moves: [
      { label: '工作调动', value: -420, color: '#4a88ff' },
      { label: '就学迁入', value: -310, color: '#40f3b8' },
      { label: '外出务工', value: 220, color: '#ffe24a' },
      { label: '省外迁入', value: 140, color: '#ff7a7a' }
    ],
    mapValue: 410
  },
  台安县: {
    totalPop: '33.50',
    households: '12.30',
    mechanicalChange: '-0.10',
    male: 16.6,
    female: 16.9,
    age: [
      { label: '0-17岁', value: 4.5, color: '#63d8ff' },
      { label: '18-34岁', value: 6.7, color: '#ffe24a' },
      { label: '35-59岁', value: 14.2, color: '#40f3b8' },
      { label: '60岁以上', value: 8.1, color: '#ff9aa2' }
    ],
    births: [
      { label: '出生', value: 380, color: '#40f3b8' },
      { label: '死亡', value: 420, color: '#ffe24a' },
      { label: '迁入', value: 220, color: '#63d8ff' },
      { label: '迁出', value: 260, color: '#ff7a7a' }
    ],
    moves: [
      { label: '工作调动', value: -180, color: '#4a88ff' },
      { label: '就学迁入', value: -120, color: '#40f3b8' },
      { label: '外出务工', value: 96, color: '#ffe24a' },
      { label: '省外迁入', value: 68, color: '#ff7a7a' }
    ],
    mapValue: 256
  },
  岫岩满族自治县: {
    totalPop: '50.20',
    households: '18.10',
    mechanicalChange: '-0.18',
    male: 24.8,
    female: 25.4,
    age: [
      { label: '0-17岁', value: 6.6, color: '#63d8ff' },
      { label: '18-34岁', value: 9.0, color: '#ffe24a' },
      { label: '35-59岁', value: 21.0, color: '#40f3b8' },
      { label: '60岁以上', value: 13.6, color: '#ff9aa2' }
    ],
    births: [
      { label: '出生', value: 520, color: '#40f3b8' },
      { label: '死亡', value: 680, color: '#ffe24a' },
      { label: '迁入', value: 260, color: '#63d8ff' },
      { label: '迁出', value: 480, color: '#ff7a7a' }
    ],
    moves: [
      { label: '工作调动', value: -320, color: '#4a88ff' },
      { label: '就学迁入', value: -210, color: '#40f3b8' },
      { label: '外出务工', value: 160, color: '#ffe24a' },
      { label: '省外迁入', value: 90, color: '#ff7a7a' }
    ],
    mapValue: 110
  },
  铁东区: {
    totalPop: '62.40',
    households: '22.30',
    mechanicalChange: '-0.12',
    male: 31.0,
    female: 31.4,
    age: [
      { label: '0-17岁', value: 7.7, color: '#63d8ff' },
      { label: '18-34岁', value: 11.8, color: '#ffe24a' },
      { label: '35-59岁', value: 26.1, color: '#40f3b8' },
      { label: '60岁以上', value: 16.8, color: '#ff9aa2' }
    ],
    births: [
      { label: '出生', value: 820, color: '#40f3b8' },
      { label: '死亡', value: 780, color: '#ffe24a' },
      { label: '迁入', value: 440, color: '#63d8ff' },
      { label: '迁出', value: 520, color: '#ff7a7a' }
    ],
    moves: [
      { label: '工作调动', value: -480, color: '#4a88ff' },
      { label: '就学迁入', value: -300, color: '#40f3b8' },
      { label: '外出务工', value: 220, color: '#ffe24a' },
      { label: '省外迁入', value: 160, color: '#ff7a7a' }
    ],
    mapValue: 3654
  },
  铁西区: {
    totalPop: '58.10',
    households: '20.60',
    mechanicalChange: '-0.09',
    male: 28.7,
    female: 29.4,
    age: [
      { label: '0-17岁', value: 7.0, color: '#63d8ff' },
      { label: '18-34岁', value: 11.0, color: '#ffe24a' },
      { label: '35-59岁', value: 24.5, color: '#40f3b8' },
      { label: '60岁以上', value: 15.6, color: '#ff9aa2' }
    ],
    births: [
      { label: '出生', value: 760, color: '#40f3b8' },
      { label: '死亡', value: 730, color: '#ffe24a' },
      { label: '迁入', value: 410, color: '#63d8ff' },
      { label: '迁出', value: 480, color: '#ff7a7a' }
    ],
    moves: [
      { label: '工作调动', value: -460, color: '#4a88ff' },
      { label: '就学迁入', value: -280, color: '#40f3b8' },
      { label: '外出务工', value: 200, color: '#ffe24a' },
      { label: '省外迁入', value: 140, color: '#ff7a7a' }
    ],
    mapValue: 2103
  },
  立山区: {
    totalPop: '46.20',
    households: '16.40',
    mechanicalChange: '-0.08',
    male: 22.8,
    female: 23.4,
    age: [
      { label: '0-17岁', value: 5.8, color: '#63d8ff' },
      { label: '18-34岁', value: 8.4, color: '#ffe24a' },
      { label: '35-59岁', value: 19.5, color: '#40f3b8' },
      { label: '60岁以上', value: 12.5, color: '#ff9aa2' }
    ],
    births: [
      { label: '出生', value: 540, color: '#40f3b8' },
      { label: '死亡', value: 610, color: '#ffe24a' },
      { label: '迁入', value: 300, color: '#63d8ff' },
      { label: '迁出', value: 360, color: '#ff7a7a' }
    ],
    moves: [
      { label: '工作调动', value: -360, color: '#4a88ff' },
      { label: '就学迁入', value: -220, color: '#40f3b8' },
      { label: '外出务工', value: 150, color: '#ffe24a' },
      { label: '省外迁入', value: 100, color: '#ff7a7a' }
    ],
    mapValue: 2552
  },
  千山区: {
    totalPop: '42.70',
    households: '15.10',
    mechanicalChange: '-0.07',
    male: 21.0,
    female: 21.7,
    age: [
      { label: '0-17岁', value: 5.2, color: '#63d8ff' },
      { label: '18-34岁', value: 7.9, color: '#ffe24a' },
      { label: '35-59岁', value: 18.0, color: '#40f3b8' },
      { label: '60岁以上', value: 11.6, color: '#ff9aa2' }
    ],
    births: [
      { label: '出生', value: 510, color: '#40f3b8' },
      { label: '死亡', value: 560, color: '#ffe24a' },
      { label: '迁入', value: 280, color: '#63d8ff' },
      { label: '迁出', value: 320, color: '#ff7a7a' }
    ],
    moves: [
      { label: '工作调动', value: -320, color: '#4a88ff' },
      { label: '就学迁入', value: -200, color: '#40f3b8' },
      { label: '外出务工', value: 140, color: '#ffe24a' },
      { label: '省外迁入', value: 90, color: '#ff7a7a' }
    ],
    mapValue: 567
  }
}

const activeRegion = ref<RegionKey>('全市')
const activeRegionLabel = computed(() => activeRegion.value)
const activeMetrics = computed(() => regionData[activeRegion.value])

const mapSeriesData = computed(() =>
  regionList.filter((n) => n !== '全市').map((name) => ({ name, value: regionData[name].mapValue }))
)

const handleRegionChange = (name: string) => {
  const hit = REGION_ALIAS[name]
  if (hit) activeRegion.value = hit
}

const genderOption = computed(() => {
  const d = activeMetrics.value
  const total = d.male + d.female
  const maleRate = total ? Math.round((d.male / total) * 10000) / 100 : 0
  const femaleRate = total ? Math.round((d.female / total) * 10000) / 100 : 0
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 54, right: 18, top: 18, bottom: 18 },
    xAxis: { type: 'value', show: false },
    yAxis: {
      type: 'category',
      data: ['男性', '女性'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(214, 238, 255, 0.75)', fontSize: 14, fontWeight: 800 }
    },
    series: [
      {
        type: 'bar',
        data: [
          {
            value: d.male,
            itemStyle: { color: '#63d8ff' },
            label: {
              show: true,
              position: 'right',
              formatter: `${d.male}万  ${maleRate}%`,
              color: 'rgba(240, 251, 255, 0.9)',
              fontWeight: 800
            }
          },
          {
            value: d.female,
            itemStyle: { color: '#ffe24a' },
            label: {
              show: true,
              position: 'right',
              formatter: `${d.female}万  ${femaleRate}%`,
              color: 'rgba(240, 251, 255, 0.9)',
              fontWeight: 800
            }
          }
        ],
        barWidth: 14,
        itemStyle: { borderRadius: 10 }
      }
    ]
  }
})

const ageOption = computed(() => {
  const list = activeMetrics.value.age
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'funnel',
        left: '18%',
        top: '10%',
        width: '64%',
        height: '80%',
        sort: 'descending',
        gap: 3,
        label: {
          show: true,
          color: 'rgba(240, 251, 255, 0.88)',
          fontSize: 12,
          formatter: '{b}  {c}'
        },
        labelLine: { show: false },
        itemStyle: { borderColor: 'rgba(2, 10, 30, 0.9)', borderWidth: 1 },
        data: list.map((i) => ({ name: i.label, value: i.value, itemStyle: { color: i.color } }))
      }
    ]
  }
})

const birthOption = computed(() => {
  const x = activeMetrics.value.births.map((i) => i.label)
  const y = activeMetrics.value.births.map((i) => i.value)
  const colors = activeMetrics.value.births.map((i) => i.color)
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 48, right: 18, top: 22, bottom: 30 },
    xAxis: {
      type: 'category',
      data: x,
      axisLabel: { color: 'rgba(214, 238, 255, 0.65)', fontSize: 12 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.18)' } },
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
        data: y.map((v, idx) => ({ value: v, itemStyle: { color: colors[idx] } })),
        barWidth: 18,
        itemStyle: { borderRadius: [10, 10, 0, 0] }
      }
    ]
  }
})

const moveOption = computed(() => {
  const x = activeMetrics.value.moves.map((i) => i.label)
  const y = activeMetrics.value.moves.map((i) => i.value)
  const colors = activeMetrics.value.moves.map((i) => i.color)
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 56, right: 18, top: 22, bottom: 42 },
    xAxis: {
      type: 'category',
      data: x,
      axisLabel: { color: 'rgba(214, 238, 255, 0.65)', fontSize: 12, rotate: 18 },
      axisLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.18)' } },
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
        data: y.map((v, idx) => ({ value: v, itemStyle: { color: colors[idx] } })),
        barWidth: 16,
        itemStyle: { borderRadius: [10, 10, 0, 0] }
      }
    ]
  }
})
</script>

<style scoped>
.dash-center {
  width: 100%;
  height: 100%;
  position: relative;
}
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.space-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 110, 220, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 110, 220, 0.06) 1px, transparent 1px);
  background-size: 36px 36px;
  pointer-events: none;
  z-index: 1;
}
.top-metrics {
  position: absolute;
  left: 50%;
  top: 24px;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  width: 1020px;
  z-index: 10;
}
.top-metric {
  height: 64px;
  border-radius: 12px;
  border: 1px solid rgba(89, 194, 255, 0.18);
  background: linear-gradient(90deg, rgba(16, 66, 130, 0.22), rgba(6, 18, 48, 0.45));
  box-shadow: inset 0 0 22px rgba(54, 232, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
.top-metric::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}
.top-metric-label {
  font-size: 18px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.78);
  letter-spacing: 1px;
  z-index: 1;
}
.top-metric-value {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  z-index: 1;
}
.top-metric-value--small .num {
  font-size: 26px;
}
.top-metric-value .num {
  font-size: 30px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.95);
  text-shadow: 0 0 12px rgba(54, 232, 255, 0.18);
}
.top-metric-value .unit {
  font-size: 14px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.55);
}
.map-stage {
  position: absolute;
  left: 50%;
  top: 54%;
  transform: translate(-50%, -50%);
  width: 1800px;
  height: 1280px;
  z-index: 5;
}
.map-tag {
  position: absolute;
  right: 300px;
  top: 120px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-radius: 999px;
  border: 1px solid rgba(89, 194, 255, 0.18);
  background: rgba(6, 18, 48, 0.35);
  padding: 0 16px;
  box-shadow: inset 0 0 18px rgba(54, 232, 255, 0.08);
  z-index: 6;
}
.map-tag-label {
  font-size: 14px;
  font-weight: 900;
  color: rgba(214, 238, 255, 0.6);
  letter-spacing: 1px;
}
.map-tag-value {
  font-size: 16px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.92);
  letter-spacing: 1px;
}
.anshan-map {
  position: absolute;
  left: 50%;
  top: 34%;
  transform: translate(-50%, -50%);
  width: 2300px;
  height: 1580px;
  z-index: 5;
}
.map-base-ring {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  width: 1200px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(30, 160, 255, 0.18), transparent 72%);
  border-top: 3px solid rgba(78, 184, 255, 0.35);
  z-index: 2;
  pointer-events: none;
}
.corner-panel {
  position: absolute;
  width: 820px;
  height: 820px;
  border-radius: 16px;
  border: 1px solid rgba(84, 188, 255, 0.22);
  background: linear-gradient(180deg, rgba(6, 27, 72, 0.55), rgba(4, 16, 44, 0.55));
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  overflow: hidden;
  padding: 18px 18px 12px;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 36px 1fr;
  gap: 10px;
  z-index: 12;
}
.corner-panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}
.corner-title {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgba(240, 251, 255, 0.9);
  text-shadow: 0 0 10px rgba(54, 232, 255, 0.14);
  display: flex;
  align-items: center;
  z-index: 1;
}
.corner-chart {
  min-height: 0;
  z-index: 1;
}
.corner-panel--lt {
  left: 36px;
  top: 116px;
}
.corner-panel--rt {
  right: 36px;
  top: 116px;
}
.corner-panel--lb {
  left: 36px;
  bottom: 52px;
}
.corner-panel--rb {
  right: 36px;
  bottom: 52px;
}
</style>
