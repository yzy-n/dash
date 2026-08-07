<template>
  <div class="right-wrap">
    <section class="panel panel--dev">
      <div class="panel-head">
        <div class="panel-title">发展党员</div>
        <div class="panel-tabs">
          <span class="tab tab--active">学历构成</span>
          <span class="tab">年龄构成</span>
        </div>
      </div>

      <div class="table">
        <div class="table-head">
          <span class="c1">学历</span>
          <span class="c2">人数</span>
          <span class="c3">占比</span>
        </div>

        <div class="table-row">
          <span class="c1">{{ data.rankingRows?.[0]?.label || '' }}</span>
          <span class="c2">{{ data.rankingRows?.[0]?.value || '' }}</span>
          <span class="c3">{{ getRate(data.rankingRows?.[0]?.value, data.rankingRows) }}</span>
        </div>
        <div class="table-row">
          <span class="c1">{{ data.rankingRows?.[1]?.label || '' }}</span>
          <span class="c2">{{ data.rankingRows?.[1]?.value || '' }}</span>
          <span class="c3">{{ getRate(data.rankingRows?.[1]?.value, data.rankingRows) }}</span>
        </div>
        <div class="table-row">
          <span class="c1">{{ data.rankingRows?.[2]?.label || '' }}</span>
          <span class="c2">{{ data.rankingRows?.[2]?.value || '' }}</span>
          <span class="c3">{{ getRate(data.rankingRows?.[2]?.value, data.rankingRows) }}</span>
        </div>
        <div class="table-row">
          <span class="c1">{{ data.rankingRows?.[3]?.label || '' }}</span>
          <span class="c2">{{ data.rankingRows?.[3]?.value || '' }}</span>
          <span class="c3">{{ getRate(data.rankingRows?.[3]?.value, data.rankingRows) }}</span>
        </div>
      </div>
    </section>

    <section class="panel panel--talent">
      <div class="panel-head">
        <div class="panel-title">人才政策</div>
        <div class="panel-tabs">
          <span class="tab tab--active">人才总量</span>
          <span class="tab">认定高层次人才数量</span>
        </div>
        <div class="panel-total panel-total--talent">
          <span class="total-dot"></span>
          <span class="total-label">合计：</span>
          <span class="total-value">{{ sumValues(data.ringStats) }}</span>
        </div>
      </div>

      <div class="talent-body">
        <EChart class="donut" :option="talentOption" />
      </div>
    </section>

    <section class="panel panel--mass">
      <div class="panel-head">
        <div class="panel-title">群团组织</div>
        <div class="panel-tabs">
          <span class="tab tab--active">工会</span>
          <span class="tab">共青团</span>
          <span class="tab">妇联</span>
        </div>
      </div>

      <div class="mass-list">
        <div class="mass-row">
          <div class="mass-left">
            <span class="mass-badge mass-badge--a"></span>
            <div class="mass-name">{{ data.topStats?.[0]?.label || '' }}</div>
          </div>
          <div class="mass-right">
            <span class="mass-num">{{ getNumText(data.topStats?.[0]?.value) }}个</span>
            <span class="mass-unit">{{ getUnitText(data.topStats?.[0]?.value) }}</span>
          </div>
        </div>
        <div class="mass-row">
          <div class="mass-left">
            <span class="mass-badge mass-badge--b"></span>
            <div class="mass-name">{{ data.topStats?.[1]?.label || '' }}</div>
          </div>
          <div class="mass-right">
            <span class="mass-num">{{ getNumText(data.topStats?.[1]?.value) }}人</span>
            <span class="mass-unit">{{ getUnitText(data.topStats?.[1]?.value) }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="panel panel--service">
      <div class="panel-head">
        <div class="panel-title panel-title--service">党员服务中心分布</div>
        <div class="panel-total">
          <span class="total-label">合计</span>
          <span class="total-value" style="margin-left: 100px">{{
            data.topStats?.[2]?.value || ''
          }}</span>
          <span>个</span>
        </div>
      </div>

      <div class="service-list">
        <div class="service-row">
          <span class="service-dot"></span>
          <span class="service-label">{{ data.rankingRows?.[0]?.label || '' }}</span>
          <span class="service-value">{{ data.rankingRows?.[0]?.value || '' }}</span>
          <span
            class="service-track"
            :style="{ '--fillx': getFillX(data.rankingRows?.[0]?.value, data.rankingRows) }"
          ></span>
        </div>
        <div class="service-row">
          <span class="service-dot"></span>
          <span class="service-label">{{ data.rankingRows?.[1]?.label || '' }}</span>
          <span class="service-value">{{ data.rankingRows?.[1]?.value || '' }}</span>
          <span
            class="service-track"
            :style="{ '--fillx': getFillX(data.rankingRows?.[1]?.value, data.rankingRows) }"
          ></span>
        </div>
        <div class="service-row">
          <span class="service-dot"></span>
          <span class="service-label">{{ data.rankingRows?.[2]?.label || '' }}</span>
          <span class="service-value">{{ data.rankingRows?.[2]?.value || '' }}</span>
          <span
            class="service-track"
            :style="{ '--fillx': getFillX(data.rankingRows?.[2]?.value, data.rankingRows) }"
          ></span>
        </div>
        <div class="service-row">
          <span class="service-dot"></span>
          <span class="service-label">{{ data.rankingRows?.[3]?.label || '' }}</span>
          <span class="service-value">{{ data.rankingRows?.[3]?.value || '' }}</span>
          <span
            class="service-track"
            :style="{ '--fillx': getFillX(data.rankingRows?.[3]?.value, data.rankingRows) }"
          ></span>
        </div>
      </div>
    </section>

    <section class="panel panel--vol">
      <div class="panel-head">
        <div class="panel-title">志愿服务</div>
        <div class="panel-tabs">
          <span class="tab tab--active">志愿者</span>
          <span class="tab">志愿服务队伍</span>
          <span class="tab">志愿服务活动</span>
        </div>
      </div>

      <div class="vol-meta">
        <div class="vol-unit">单位：人</div>
        <div class="vol-total">
          <span class="total-dot"></span>
          <span class="total-label">合计：</span>
          <span class="total-value">{{ sumValues(volRows) }}</span>
          <span class="total-suffix">人</span>
        </div>
      </div>

      <div class="vol-body">
        <EChart class="vol-chart" :option="volOption" />
      </div>
    </section>

    <section class="panel panel--two">
      <div class="panel-head">
        <div class="panel-title">两新组织</div>
      </div>

      <div class="two-block">
        <div class="two-head">
          <span class="two-arrow two-arrow--l"></span>
          <div class="two-title">非公有制企业</div>
          <span class="two-arrow two-arrow--r"></span>
        </div>
        <div class="two-grid">
          <div class="two-item">
            <div class="two-value">
              <span class="two-num">{{ getNumText(data.rankingRows?.[4]?.value) }}</span>
              <span class="two-unit">{{ getUnitText(data.rankingRows?.[4]?.value) || '个' }}</span>
            </div>
            <div class="two-label">非公有制企业<br />党组织</div>
          </div>
          <div class="two-item">
            <div class="two-value">
              <span class="two-num">{{ getNumText(data.rankingRows?.[5]?.value) }}</span>
              <span class="two-unit">{{ getUnitText(data.rankingRows?.[5]?.value) || '名' }}</span>
            </div>
            <div class="two-label">非公有制企业<br />党员</div>
          </div>
          <div class="two-item">
            <div class="two-value">
              <span class="two-num">{{ getNumText(data.chartRows?.[0]?.value) }}</span>
              <span class="two-unit">{{ getUnitText(data.chartRows?.[0]?.value) || '%' }}</span>
            </div>
            <div class="two-label">非公有制企业<br />党组织覆盖率</div>
          </div>
        </div>
      </div>

      <div class="two-block">
        <div class="two-head">
          <span class="two-arrow two-arrow--l"></span>
          <div class="two-title">社会组织</div>
          <span class="two-arrow two-arrow--r"></span>
        </div>
        <div class="two-grid">
          <div class="two-item">
            <div class="two-value">
              <span class="two-num">{{ getNumText(data.topStats?.[2]?.value) }}</span>
              <span class="two-unit">{{ getUnitText(data.topStats?.[2]?.value) || '个' }}</span>
            </div>
            <div class="two-label">社会组织<br />党组织</div>
          </div>
          <div class="two-item">
            <div class="two-value">
              <span class="two-num">{{ getNumText(data.topStats?.[3]?.value) }}</span>
              <span class="two-unit">{{ getUnitText(data.topStats?.[3]?.value) || '名' }}</span>
            </div>
            <div class="two-label">社会组织<br />党员</div>
          </div>
          <div class="two-item">
            <div class="two-value">
              <span class="two-num">{{ getNumText(data.chartRows?.[1]?.value) }}</span>
              <span class="two-unit">{{ getUnitText(data.chartRows?.[1]?.value) || '%' }}</span>
            </div>
            <div class="two-label">社会组织<br />党组织覆盖率</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import EChart from '@/components/echarts/EChart.vue'
import 'echarts-gl'
import type { PartyRightData } from '../data'

const props = defineProps<{
  data: PartyRightData
}>()

const pickNumber = (value: unknown) => {
  if (value === null || value === undefined) return undefined
  const match = String(value).match(/-?\d+(?:\.\d+)?/)
  if (!match) return undefined
  const num = Number(match[0])
  return Number.isFinite(num) ? num : undefined
}

const sumValues = (rows: unknown) => {
  const list = Array.isArray(rows) ? rows : []
  const nums = list
    .map((item: any) => pickNumber(item?.value))
    .filter((n): n is number => typeof n === 'number' && Number.isFinite(n))
  if (!nums.length) return ''
  const sum = nums.reduce((a, b) => a + b, 0)
  return String(sum)
}

const getRate = (value: unknown, rows: unknown) => {
  const list = Array.isArray(rows) ? rows : []
  const nums = list
    .map((item: any) => pickNumber(item?.value))
    .filter((n): n is number => typeof n === 'number' && Number.isFinite(n))
  const sum = nums.reduce((a, b) => a + b, 0)
  const cur = pickNumber(value)
  if (!sum || cur === undefined) return ''
  const pct = (cur / sum) * 100
  return `${pct.toFixed(2)}%`
}

const getFillX = (value: unknown, rows: unknown) => {
  const list = Array.isArray(rows) ? rows : []
  const nums = list
    .map((item: any) => pickNumber(item?.value))
    .filter((n): n is number => typeof n === 'number' && Number.isFinite(n))
  const max = nums.length ? Math.max(...nums) : 0
  const cur = pickNumber(value) ?? 0
  if (!max) return '0'
  const scale = Math.max(0, Math.min(1, cur / max))
  return scale.toFixed(4)
}

const getFillPercent = (value: unknown, rows: unknown) => {
  const cur = pickNumber(value) ?? 0
  const txt = String(value ?? '')
  if (txt.includes('%')) {
    const scale = Math.max(0, Math.min(1, cur / 100))
    return scale.toFixed(4)
  }
  return getFillX(value, rows)
}

const getNumText = (value: unknown) => {
  const txt = String(value ?? '')
  const match = txt.match(/-?\d+(?:\.\d+)?/)
  return match ? match[0] : txt
}

const getUnitText = (value: unknown) => {
  const txt = String(value ?? '')
  const match = txt.match(/-?\d+(?:\.\d+)?/)
  if (!match) return ''
  const unit = txt.replace(match[0], '').trim()
  return unit
}

const hexToRgb = (hex: string) => {
  const clean = hex.replace('#', '').trim()
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  const n = Number.parseInt(full, 16)
  if (!Number.isFinite(n)) return { r: 0, g: 0, b: 0 }
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

const darken = (hex: string, factor: number) => {
  const { r, g, b } = hexToRgb(hex)
  const rr = Math.max(0, Math.min(255, Math.round(r * factor)))
  const gg = Math.max(0, Math.min(255, Math.round(g * factor)))
  const bb = Math.max(0, Math.min(255, Math.round(b * factor)))
  return `rgb(${rr}, ${gg}, ${bb})`
}

const getPie3DOption = (rows: any[]) => {
  const palette = ['#ffe04b', '#ff8b39', '#16d2ff', '#ff4d6d', '#8a5cff']
  const data = rows
    .map((item: any, idx: number) => ({
      name: item?.label ?? '',
      value: pickNumber(item?.value) ?? 0,
      raw: item?.value ?? '',
      color: palette[idx % palette.length]
    }))
    .filter((d: any) => d.value > 0)

  const sum = data.reduce((acc: number, cur: any) => acc + cur.value, 0)
  const outerR = 1
  const innerR = 0.52
  const h = 0.26
  const gap = Math.PI / 90

  const series: any[] = []
  let startValue = 0

  const pushSurface = (name: string, color: string, equation: any, opacity = 1) => {
    series.push({
      name,
      type: 'surface',
      parametric: true,
      silent: true,
      wireframe: { show: false },
      shading: 'lambert',
      itemStyle: { color, opacity },
      parametricEquation: equation,
      emphasis: { disabled: true }
    })
  }

  data.forEach((d: any) => {
    const endValue = startValue + d.value
    const startAngle0 = sum ? (startValue / sum) * Math.PI * 2 : 0
    const endAngle0 = sum ? (endValue / sum) * Math.PI * 2 : 0
    startValue = endValue

    const startAngle = startAngle0 + gap / 2
    const endAngle = endAngle0 - gap / 2
    if (endAngle <= startAngle) return

    const topEq = {
      u: { min: startAngle, max: endAngle, step: (endAngle - startAngle) / 80 },
      v: { min: innerR, max: outerR, step: (outerR - innerR) / 18 },
      x: (u: number, v: number) => Math.cos(u) * v,
      y: (u: number, v: number) => Math.sin(u) * v,
      z: () => h
    }

    const bottomEq = {
      u: { min: startAngle, max: endAngle, step: (endAngle - startAngle) / 80 },
      v: { min: innerR, max: outerR, step: (outerR - innerR) / 18 },
      x: (u: number, v: number) => Math.cos(u) * v,
      y: (u: number, v: number) => Math.sin(u) * v,
      z: () => -h
    }

    const outerWallEq = {
      u: { min: startAngle, max: endAngle, step: (endAngle - startAngle) / 80 },
      v: { min: -h, max: h, step: (2 * h) / 14 },
      x: (u: number) => Math.cos(u) * outerR,
      y: (u: number) => Math.sin(u) * outerR,
      z: (_u: number, v: number) => v
    }

    const innerWallEq = {
      u: { min: startAngle, max: endAngle, step: (endAngle - startAngle) / 80 },
      v: { min: -h, max: h, step: (2 * h) / 14 },
      x: (u: number) => Math.cos(u) * innerR,
      y: (u: number) => Math.sin(u) * innerR,
      z: (_u: number, v: number) => v
    }

    const startCapEq = {
      u: { min: innerR, max: outerR, step: (outerR - innerR) / 18 },
      v: { min: -h, max: h, step: (2 * h) / 14 },
      x: (u: number) => Math.cos(startAngle) * u,
      y: (u: number) => Math.sin(startAngle) * u,
      z: (_u: number, v: number) => v
    }

    const endCapEq = {
      u: { min: innerR, max: outerR, step: (outerR - innerR) / 18 },
      v: { min: -h, max: h, step: (2 * h) / 14 },
      x: (u: number) => Math.cos(endAngle) * u,
      y: (u: number) => Math.sin(endAngle) * u,
      z: (_u: number, v: number) => v
    }

    pushSurface(d.name, d.color, topEq)
    pushSurface(`${d.name}-outer`, darken(d.color, 0.72), outerWallEq)
    pushSurface(`${d.name}-inner`, darken(d.color, 0.64), innerWallEq)
    pushSurface(`${d.name}-start`, darken(d.color, 0.58), startCapEq)
    pushSurface(`${d.name}-end`, darken(d.color, 0.58), endCapEq)
    pushSurface(`${d.name}-bottom`, darken(d.color, 0.48), bottomEq, 0.9)
  })

  const meta = new Map<string, { raw: string; pct: string }>()
  data.forEach((d: any) => {
    const pct = sum ? `${((d.value / sum) * 100).toFixed(2)}%` : ''
    meta.set(d.name, { raw: String(d.raw ?? ''), pct })
  })

  return {
    animation: false,
    tooltip: { show: false },
    legend: {
      show: true,
      selectedMode: false,
      orient: 'vertical',
      right: 14,
      top: 'middle',
      icon: 'roundRect',
      itemWidth: 14,
      itemHeight: 10,
      itemGap: 18,
      data: data.map((d: any) => d.name),
      formatter: (name: string) => {
        const info = meta.get(name)
        if (!info) return name
        return `{n|${name}}{v|${info.raw}}{p|${info.pct}}`
      },
      textStyle: {
        rich: {
          n: {
            width: 50,
            align: 'left',
            color: 'rgba(255, 238, 206, 0.92)',
            fontSize: 22,
            fontWeight: 700,
            padding: [0, 12, 0, 0]
          },
          v: {
            width: 120,
            align: 'right',
            color: 'rgba(255, 238, 206, 0.98)',
            fontSize: 22,
            fontWeight: 800,
            padding: [0, 12, 0, 0]
          },
          p: {
            width: 90,
            align: 'right',
            color: 'rgba(255, 238, 206, 0.86)',
            fontSize: 20,
            fontWeight: 700
          }
        }
      }
    },
    xAxis3D: { min: -1.4, max: 1.4, show: false },
    yAxis3D: { min: -1.4, max: 1.4, show: false },
    zAxis3D: { min: -0.8, max: 0.8, show: false },
    grid3D: {
      show: false,
      boxWidth: 200,
      boxDepth: 200,
      boxHeight: 40,
      left: -180,
      viewControl: {
        alpha: 42,
        beta: 30,
        distance: 210,
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0
      },
      light: {
        main: { intensity: 1.35, shadow: false },
        ambient: { intensity: 0.5 }
      }
    },
    series
  }
}

const talentOption = computed(() => {
  const rows = Array.isArray(props.data?.ringStats) ? props.data.ringStats : []
  return getPie3DOption(rows)
})

const volRows = computed(() => {
  const d: any = props.data ?? {}
  const candidates = [d.volRows, d.volunteerRows, d.volunteerStats, d.rankingRows, d.chartRows]
  for (const c of candidates) {
    if (Array.isArray(c) && c.length) return c
  }
  return []
})

const calcAxisStep = (maxValue: number) => {
  if (!maxValue) return 1
  const targetTicks = 5
  const raw = maxValue / targetTicks
  const exp = Math.floor(Math.log10(raw))
  const base = Math.pow(10, exp)
  const f = raw / base
  const nf = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10
  return nf * base
}

const volOption = computed(() => {
  const rows = volRows.value
  const data = rows
    .map((item: any) => ({
      name: String(item?.label ?? ''),
      value: pickNumber(item?.value) ?? 0
    }))
    .filter((d: any) => d.name)

  const maxValue = data.reduce((m: number, d: any) => Math.max(m, d.value), 0)
  const step = calcAxisStep(maxValue)
  const maxAxis = maxValue ? Math.ceil(maxValue / step) * step : step * 5

  return {
    backgroundColor: 'transparent',
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      borderWidth: 0,
      backgroundColor: 'rgba(0,0,0,0.65)',
      textStyle: { color: '#fff', fontSize: 18 }
    },
    grid: { left: 86, right: 26, top: 36, bottom: 66, containLabel: false },
    xAxis: {
      type: 'category',
      data: data.map((d: any) => d.name),
      axisLabel: {
        color: 'rgba(255, 238, 206, 0.86)',
        fontSize: 16,
        interval: 0,
        margin: 16
      },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: 'rgba(255, 210, 140, 0.35)' } }
    },
    yAxis: {
      type: 'value',
      max: maxAxis,
      interval: step,
      splitNumber: 5,
      axisLabel: { color: 'rgba(255, 238, 206, 0.78)', fontSize: 16 },
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: true, lineStyle: { color: 'rgba(255, 210, 140, 0.18)' } }
    },
    series: [
      {
        type: 'bar',
        data: data.map((d: any) => d.value),
        barWidth: 46,
        barMinHeight: 6,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 235, 160, 0.95)' },
              { offset: 0.35, color: 'rgba(255, 190, 70, 0.92)' },
              { offset: 1, color: 'rgba(255, 120, 0, 0.72)' }
            ]
          }
        }
      }
    ]
  }
})
</script>

<style scoped>
.right-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  color: rgba(255, 238, 206, 0.92);
}

.panel {
  position: absolute;
  box-sizing: border-box;
  overflow: visible;
}

.panel--dev {
  left: 180px;
  top: 180px;
  width: 1000px;
  height: 950px;
  overflow: hidden;
}

.panel--dev .panel-head {
  height: 88px;
  padding: 14px 18px 0;
}

.panel--dev .panel-title {
  height: 56px;
  line-height: 56px;
  padding: 0 26px;
  font-size: 38px;
  letter-spacing: 2px;
}

.panel--dev .panel-tabs {
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  top: 120px;
}

.panel--dev .tab {
  min-width: 250px;
  height: 60px;
  line-height: 60px;
  font-size: 30px;
  border-radius: 30px;
}

.panel--dev .table {
  left: 18px;
  right: 18px;
  top: 200px;
  bottom: 22px;
  padding: 14px 14px 18px;
  box-sizing: border-box;
}

.panel--dev .table-head {
  height: 64px;
  padding: 0 18px;
  background: transparent;
  border-bottom: 1px solid rgba(255, 200, 130, 0.2);
  font-size: 32px;
  color: rgba(255, 238, 206, 0.9);
}

.panel--dev .table-row {
  position: relative;
  height: 74px;
  margin-top: 14px;
  padding: 0 18px;
  border-bottom: none;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 200, 130, 0.22);
  background:
    linear-gradient(135deg, rgba(255, 210, 120, 0.22) 0 18%, transparent 18% 100%),
    linear-gradient(90deg, rgba(170, 12, 12, 0.72), rgba(120, 8, 8, 0.42));
  box-shadow: inset 0 0 0 1px rgba(255, 220, 160, 0.06);
}

.panel--dev .table-row:nth-of-type(even) {
  background:
    linear-gradient(135deg, rgba(255, 210, 120, 0.18) 0 18%, transparent 18% 100%),
    linear-gradient(90deg, rgba(150, 10, 10, 0.68), rgba(100, 6, 6, 0.38));
}

.panel--dev .table-row .c1 {
  font-size: 32px;
  color: rgba(255, 238, 206, 0.92);
}

.panel--dev .table-row .c2,
.panel--dev .table-row .c3 {
  font-size: 32px;
}

.panel--talent {
  left: 1460px;
  top: 180px;
  width: 1000px;
  height: 950px;
  overflow: hidden;
}

.panel--talent .panel-head {
  height: 150px;
  padding: 14px 18px 0;
}

.panel--talent .panel-title {
  height: 56px;
  line-height: 56px;
  padding: 0 26px;
  font-size: 38px;
  margin-left: -50px;
}

.panel--talent .panel-tabs {
  left: 120px;
  top: 140px;
  gap: 80px;
}

.panel--talent .tab {
  min-width: 280px;
  height: 52px;
  line-height: 52px;
  font-size: 34px;
  border-radius: 26px;
}

.panel--talent .panel-total--talent {
  position: absolute;
  right: 170px;
  top: 240px;
  height: 56px;
  min-width: 320px;
  padding: 0 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 30px;
  border: 2px solid rgba(255, 200, 130, 0.55);
  border-radius: 6px;
}

.panel--talent .panel-total--talent .total-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 210, 120, 0.9);
  box-shadow: 0 0 12px rgba(255, 210, 120, 0.18);
}

.panel--talent .panel-total--talent .total-label {
  font-size: 22px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.88);
  white-space: nowrap;
}

.panel--talent .panel-total--talent .total-value {
  font-size: 30px;
  font-weight: 900;
  color: rgba(255, 220, 140, 0.98);
  white-space: nowrap;
}

.panel--mass {
  left: 2700px;
  top: 180px;
  width: 1000px;
  height: 950px;
}

.panel--mass .panel-head {
  height: 150px;
  padding: 14px 18px 0;
}

.panel--mass .panel-title {
  height: 56px;
  line-height: 56px;
  padding: 0 26px;
  font-size: 38px;
  margin-left: -50px;
}

.panel--mass .panel-tabs {
  left: 80px;
  top: 140px;
  right: auto;
  gap: 80px;
}

.panel--mass .tab {
  min-width: 220px;
  height: 52px;
  line-height: 52px;
  font-size: 34px;
  border-radius: 26px;
}

.panel--service {
  left: 180px;
  top: 1190px;
  width: 1000px;
  height: 950px;
}

.panel--service .panel-head {
  overflow: visible;
}

.panel--service .panel-title {
  font-size: 38px;
  position: relative;
  top: -30px;
}
.panel--service .panel-total {
  position: absolute;
  right: 100px;
  top: 126px;
  height: 64px;
  min-width: 380px;
  padding: 0 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  border: 2px solid rgba(255, 200, 130, 0.55);
  background:
    linear-gradient(135deg, rgba(255, 210, 120, 0.26) 0 16%, transparent 16% 100%),
    linear-gradient(90deg, rgba(170, 12, 12, 0.72), rgba(120, 8, 8, 0.42));
  box-shadow:
    inset 0 0 0 1px rgba(255, 220, 160, 0.06),
    0 0 18px rgba(255, 140, 70, 0.06);
  border-radius: 6px;
}

.panel--service .panel-total .total-label {
  font-size: 28px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.9);
  white-space: nowrap;
}

.panel--service .panel-total .total-value {
  font-size: 44px;
  font-weight: 900;
  color: rgba(255, 220, 140, 0.98);
  white-space: nowrap;
}
.panel--vol {
  left: 1460px;
  top: 1160px;
  width: 1000px;
  height: 950px;
}
.panel--vol .panel-title {
  height: 56px;
  line-height: 56px;
  padding: 0 26px;
  font-size: 38px;
  margin-left: -60px;
}
.panel--vol .panel-tabs {
  top: 120px;
  right: 126px;
  gap: 28px;
}

.panel--vol .tab {
  min-width: 220px;
  height: 56px;
  line-height: 56px;
  font-size: 26px;
  border-radius: 28px;
}

.panel--vol .vol-meta {
  position: absolute;
  left: 26px;
  right: 26px;
  top: 186px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel--vol .vol-unit {
  font-size: 18px;
  color: rgba(255, 238, 206, 0.82);
}

.panel--vol .vol-total {
  height: 56px;
  min-width: 360px;
  padding: 0 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 14px;
  border: 2px solid rgba(255, 200, 130, 0.55);
  background:
    linear-gradient(135deg, rgba(255, 210, 120, 0.26) 0 16%, transparent 16% 100%),
    linear-gradient(90deg, rgba(170, 12, 12, 0.72), rgba(120, 8, 8, 0.42));
  box-shadow:
    inset 0 0 0 1px rgba(255, 220, 160, 0.06),
    0 0 18px rgba(255, 140, 70, 0.06);
  border-radius: 6px;
}

.panel--vol .vol-total .total-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 220, 140, 0.88);
  box-shadow: 0 0 10px rgba(255, 210, 120, 0.28);
}

.panel--vol .vol-total .total-label {
  font-size: 22px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.9);
  white-space: nowrap;
}

.panel--vol .vol-total .total-value {
  font-size: 28px;
  font-weight: 900;
  color: rgba(255, 220, 140, 0.98);
  white-space: nowrap;
}

.panel--vol .vol-total .total-suffix {
  font-size: 22px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.86);
  white-space: nowrap;
}

.panel--vol .vol-body {
  position: absolute;
  left: 26px;
  right: 26px;
  top: 268px;
  bottom: 26px;
}

.panel--vol .vol-chart {
  width: 100%;
  height: 100%;
}

.panel--two {
  left: 2680px;
  top: 1160px;
  width: 1000px;
  height: 950px;
}

.panel--two .panel-head {
  height: 150px;
  padding: 14px 18px 0;
}

.panel--two .panel-title {
  height: 56px;
  line-height: 56px;
  padding: 0 26px;
  font-size: 38px;
  margin-left: -50px;
}

.panel-head {
  position: relative;
  height: 92px;
  padding: 16px 20px;
  box-sizing: border-box;
}

.panel-title {
  height: 52px;
  line-height: 52px;
  padding: 0 18px;
  display: inline-block;
  font-size: 36px;
  font-weight: 800;
  color: rgba(255, 238, 206, 0.98);
  letter-spacing: 2px;
}

.panel-total {
  position: absolute;
  right: 20px;
  top: 26px;
  font-size: 22px;
  color: rgba(255, 238, 206, 0.88);
}

.panel-tabs {
  position: absolute;
  right: 20px;
  top: 18px;
  display: flex;
  gap: 120px;
  align-items: center;
}

.tab {
  min-width: 160px;
  height: 44px;
  line-height: 44px;
  padding: 0 16px;
  box-sizing: border-box;
  text-align: center;
  font-size: 22px;
  color: rgba(255, 238, 206, 0.9);
  border-radius: 22px;
  border: 2px solid rgba(255, 200, 130, 0.55);
  background: rgba(120, 10, 10, 0.22);
}

.tab--active {
  background: radial-gradient(
    circle at 50% 30%,
    rgba(255, 220, 140, 0.52),
    rgba(160, 10, 10, 0.32)
  );
  box-shadow: 0 0 16px rgba(255, 210, 120, 0.12);
}

.table {
  position: absolute;
  left: 26px;
  right: 26px;
  top: 116px;
  bottom: 26px;
}

.table-head,
.table-row {
  display: grid;
  grid-template-columns: 1fr 180px 180px;
  align-items: center;
  height: 96px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(255, 200, 130, 0.18);
}

.table-head {
  height: 80px;
  font-size: 24px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.9);
  background: rgba(120, 10, 10, 0.14);
}

.table-row {
  font-size: 28px;
  color: rgba(255, 238, 206, 0.96);
}

.table-row .c2,
.table-row .c3 {
  text-align: right;
  font-weight: 800;
  color: rgba(255, 238, 206, 0.98);
}

.panel--talent .talent-body {
  position: absolute;
  left: 26px;
  right: 26px;
  top: 178px;
  bottom: 26px;
  overflow: hidden;
}

.panel--talent .donut {
  width: 100%;
  height: 100%;
}

.panel--talent .legend {
  display: grid;
  gap: 16px;
  padding-right: 8px;
}

.panel--talent .legend-row {
  display: grid;
  grid-template-columns: 1fr 180px 140px 26px;
  align-items: center;
  column-gap: 12px;
  height: 54px;
}

.panel--talent .legend-label {
  font-size: 22px;
  color: rgba(255, 238, 206, 0.92);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.panel--talent .legend-value {
  text-align: right;
  font-size: 24px;
  font-weight: 800;
  color: rgba(255, 238, 206, 0.98);
  white-space: nowrap;
}

.panel--talent .legend-rate {
  text-align: right;
  font-size: 22px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.86);
  white-space: nowrap;
}

.panel--talent .legend-mark {
  width: 18px;
  height: 8px;
  border-radius: 4px;
  justify-self: end;
  box-shadow: 0 0 12px rgba(255, 210, 120, 0.12);
}

.panel--talent .legend-mark--a {
  background: #ffe04b;
}

.panel--talent .legend-mark--b {
  background: #ff8b39;
}

.panel--talent .legend-mark--c {
  background: #16d2ff;
}

.panel--talent .legend-mark--d {
  background: #ff4d6d;
}

.panel--talent .legend-mark--e {
  background: #8a5cff;
}

.mass-list {
  position: absolute;
  left: -56px;
  right: 26px;
  top: 310px;
  bottom: 26px;
  display: grid;
  align-content: start;
  gap: 66px;
  padding-top: 18px;
  box-sizing: border-box;
}

.mass-row {
  height: 170px;
  display: grid;
  grid-template-columns: 260px 1fr;
  align-items: center;
  column-gap: 22px;
}

.mass-left {
  position: relative;
  height: 170px;
  display: grid;
  align-content: center;
  justify-items: center;
  row-gap: 14px;
}

.mass-badge {
  width: 92px;
  height: 92px;
  border-radius: 50%;
  border: 2px solid rgba(255, 200, 130, 0.72);
  background:
    radial-gradient(circle at 40% 30%, rgba(255, 235, 170, 0.52), rgba(120, 10, 10, 0.22)),
    radial-gradient(circle, rgba(255, 220, 140, 0.12), rgba(140, 10, 10, 0.35));
  box-shadow:
    inset 0 0 0 2px rgba(255, 220, 160, 0.08),
    0 0 24px rgba(255, 180, 80, 0.12);
  position: relative;
}

.mass-badge::before {
  content: '';
  position: absolute;
  inset: 22px;
  border-radius: 12px;
  border: 1px solid rgba(255, 220, 160, 0.35);
  background: rgba(255, 220, 140, 0.14);
}

.mass-badge--a::after,
.mass-badge--b::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 18px;
  height: 18px;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background: rgba(255, 220, 140, 0.88);
  box-shadow: 0 0 10px rgba(255, 210, 120, 0.28);
}

.mass-badge--b::after {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.mass-name {
  width: 240px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  color: rgba(255, 238, 206, 0.92);
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mass-right {
  height: 88px;
  padding: 0 22px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  border: 2px solid rgba(255, 200, 130, 0.62);
  background:
    linear-gradient(135deg, rgba(255, 210, 120, 0.22) 0 18%, transparent 18% 100%),
    linear-gradient(90deg, rgba(150, 10, 10, 0.32), rgba(100, 6, 6, 0.2));
  box-shadow:
    inset 0 0 0 1px rgba(255, 220, 160, 0.06),
    0 0 18px rgba(255, 140, 70, 0.06);
  border-radius: 8px;
}

.mass-num {
  font-size: 54px;
  font-weight: 900;
  color: rgba(255, 220, 140, 0.98);
  letter-spacing: 1px;
}

.mass-unit {
  font-size: 30px;
  font-weight: 800;
  color: rgba(255, 220, 140, 0.9);
  padding-top: 6px;
}

.service-list {
  position: absolute;
  left: 26px;
  right: 26px;
  top: 300px;
  bottom: 26px;
  display: grid;
  align-content: start;
  gap: 50px;
}

.service-row {
  position: relative;
  height: 96px;
  padding-left: 30px;
  padding-right: 24px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 180px;
  align-items: center;
}

.service-dot {
  position: absolute;
  left: 0;
  top: 44px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 210, 120, 0.85);
}

.service-label {
  font-size: 26px;
  color: rgba(255, 238, 206, 0.92);
}

.service-value {
  text-align: right;
  font-size: 30px;
  font-weight: 900;
  color: rgba(255, 238, 206, 0.98);
}

.service-track {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 10px;
  height: 22px;
  border: 2px solid rgba(255, 200, 130, 0.62);
  background: rgba(120, 10, 10, 0.18);
  box-shadow:
    inset 0 0 0 2px rgba(255, 220, 160, 0.08),
    0 0 18px rgba(255, 140, 70, 0.06);
  box-sizing: border-box;
}

.service-track::after {
  content: '';
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 5px;
  height: 10px;
  background: linear-gradient(90deg, rgba(255, 210, 120, 0.85), rgba(255, 120, 0, 0.55));
  transform: scaleX(var(--fillx, 0));
  transform-origin: left;
}

.bar-list {
  position: absolute;
  left: 26px;
  right: 26px;
  top: 130px;
  bottom: 26px;
  display: grid;
  align-content: start;
  gap: 28px;
}

.bar-row {
  display: grid;
  gap: 12px;
}

.bar-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  color: rgba(255, 238, 206, 0.92);
}

.bar-head strong {
  font-size: 28px;
  font-weight: 900;
  color: rgba(255, 220, 140, 0.98);
}

.bar-track {
  position: relative;
  height: 22px;
  border: 2px solid rgba(255, 200, 130, 0.62);
  background: rgba(120, 10, 10, 0.18);
  box-shadow:
    inset 0 0 0 2px rgba(255, 220, 160, 0.08),
    0 0 18px rgba(255, 140, 70, 0.06);
  box-sizing: border-box;
}

.bar-track::after {
  content: '';
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 5px;
  height: 10px;
  background: linear-gradient(90deg, rgba(255, 210, 120, 0.85), rgba(255, 120, 0, 0.55));
  transform: scaleX(var(--fillx, 0));
  transform-origin: left;
}

.two-block {
  position: relative;
  margin: 0 26px;
  padding: 0;
  box-sizing: border-box;
}

.two-block + .two-block {
  margin-top: 46px;
}

.two-head {
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.two-arrow {
  width: 180px;
  height: 18px;
  position: relative;
  opacity: 0.75;
}

.two-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 16px;
  right: 16px;
  height: 2px;
  transform: translateY(-50%);
  background: linear-gradient(90deg, transparent, rgba(255, 220, 140, 0.75), transparent);
}

.two-arrow--l::after,
.two-arrow--r::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  border-top: 2px solid rgba(255, 220, 140, 0.72);
  border-right: 2px solid rgba(255, 220, 140, 0.72);
  transform: translateY(-50%) rotate(45deg);
}

.two-arrow--l::after {
  left: 6px;
  transform: translateY(-50%) rotate(-135deg);
}

.two-arrow--r::after {
  right: 6px;
}

.two-title {
  text-align: center;
  font-size: 26px;
  font-weight: 900;
  color: rgba(255, 238, 206, 0.94);
  letter-spacing: 2px;
}

.two-grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 26px;
}

.two-item {
  text-align: center;
  height: 210px;
  padding: 22px 14px 18px;
  box-sizing: border-box;
  border: 1px solid rgba(255, 200, 130, 0.22);
  background:
    linear-gradient(135deg, rgba(255, 210, 120, 0.2) 0 18%, transparent 18% 100%),
    linear-gradient(180deg, rgba(150, 10, 10, 0.28), rgba(90, 6, 6, 0.18));
  box-shadow:
    inset 0 0 0 1px rgba(255, 220, 160, 0.06),
    0 0 18px rgba(255, 140, 70, 0.05);
  border-radius: 10px;
}

.two-value {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
}

.two-num {
  font-size: 44px;
  font-weight: 900;
  color: rgba(255, 238, 206, 0.98);
}

.two-unit {
  font-size: 22px;
  font-weight: 800;
  color: rgba(255, 238, 206, 0.82);
}

.two-label {
  margin-top: 18px;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  color: rgba(255, 238, 206, 0.88);
}
</style>
