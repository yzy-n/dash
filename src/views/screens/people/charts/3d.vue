<template>
  <div ref="chartRef" class="pie3d-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'

// -------------------- 工具函数 --------------------
// 生成扇形的曲面参数方程（厚度 h 由调用方传入）
function getParametricEquation(
  startRatio: number,
  endRatio: number,
  isSelected: boolean,
  isHovered: boolean,
  k: number,
  h: number // 每个扇形独立的厚度
) {
  const midRatio = (startRatio + endRatio) / 2
  const startRadian = startRatio * Math.PI * 2
  const endRadian = endRatio * Math.PI * 2
  const midRadian = midRatio * Math.PI * 2

  if (startRatio === 0 && endRatio === 1) isSelected = false

  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
  const hoverRate = isHovered ? 1.05 : 1

  return {
    u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
    v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
    x(u: number, v: number) {
      if (u < startRadian)
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      if (u > endRadian) return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    y(u: number, v: number) {
      if (u < startRadian)
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      if (u > endRadian) return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    z(u: number, v: number) {
      // 厚度上下对称
      if (u < -Math.PI * 0.5) return Math.sin(u) * h * 0.5
      if (u > Math.PI * 2.5) return Math.sin(u) * h * 0.5
      return Math.sin(v) > 0 ? h * 0.5 : -h * 0.5
    }
  }
}

// 生成配置项（动态厚度映射）
function getPie3DOption(
  pieData: any[],
  internalDiameterRatio: number = 0.59,
  minThickness: number = 0.08,
  maxThickness: number = 0.25
) {
  const series: any[] = []
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  const k =
    typeof internalDiameterRatio !== 'undefined'
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3

  const palette = ['#00b8e8', '#4068e8', '#9c54d8', '#f2a22c', '#d4d028', '#36d268', '#28bcb0']
  const colorOf = (item: any, idx: number) =>
    item?.itemStyle?.color ?? palette[idx % palette.length]

  // 1. 提取所有数值，计算 min/max
  const values = pieData.map((item) => item.value)
  const minVal = Math.min(...values)
  const maxVal = Math.max(...values)
  const range = maxVal - minVal

  // 2. 为每个数据生成系列，并计算厚度映射
  for (let i = 0; i < pieData.length; i++) {
    const rawValue = pieData[i].value
    // 厚度映射：如果所有值相等，则取中间值
    let thickness = (minThickness + maxThickness) / 2
    if (range > 0) {
      // 线性映射到 [minThickness, maxThickness]
      const ratio = (rawValue - minVal) / range
      thickness = minThickness + ratio * (maxThickness - minThickness)
    }
    // 保留两位小数以防浮点误差
    thickness = Math.round(thickness * 1000) / 1000

    sumValue += rawValue
    const seriesItem: any = {
      name: pieData[i].name || `series${i}`,
      type: 'surface',
      parametric: true,
      wireframe: { show: false },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k,
        thickness // 保存每个扇形的厚度
      }
    }
    seriesItem.itemStyle = {
      color: colorOf(pieData[i], i),
      opacity: pieData[i]?.itemStyle?.opacity ?? 0.95
    }
    series.push(seriesItem)
  }

  // 3. 计算比例并设置参数方程（使用各自的厚度）
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value
    series[i].pieData.startRatio = startValue / sumValue
    series[i].pieData.endRatio = endValue / sumValue
    const thickness = series[i].pieStatus.thickness
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      thickness
    )
    startValue = endValue
  }

  // 4. 透明圆环（交互辅助）
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: { show: false },
    itemStyle: { opacity: 0 },
    parametricEquation: {
      u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
      v: { min: 0, max: Math.PI, step: Math.PI / 20 },
      x(u: number, v: number) {
        return Math.sin(v) * Math.sin(u) + Math.sin(u)
      },
      y(u: number, v: number) {
        return Math.sin(v) * Math.cos(u) + Math.cos(u)
      },
      z(u: number, v: number) {
        return Math.cos(v) > 0 ? 0.1 : -0.1
      }
    }
  })

  const option = {
    tooltip: {
      formatter(params: any) {
        if (params.seriesName !== 'mouseoutSeries') {
          return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${option.series[params.seriesIndex].pieData.value}`
        }
        return ''
      }
    },
    xAxis3D: { min: -1, max: 1 },
    yAxis3D: { min: -1, max: 1 },
    zAxis3D: { min: -1, max: 1 },
    grid3D: {
      show: false,
      boxHeight: 10,
      viewControl: {
        alpha: 40,
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: false
      },
      postEffect: {
        enable: true,
        bloom: { enable: true, bloomIntensity: 0.1 },
        SSAO: { enable: true, quality: 'medium', radius: 2 }
      }
    },
    series
  }
  return option
}

function buildLabelGraphicElements(pieData: any[], series: any[], chart: echarts.ECharts) {
  const total = pieData.reduce((s, i) => s + (Number(i?.value) || 0), 0)
  const getPercent = (item: any) => {
    const raw = item?.percent
    if (typeof raw === 'string' && raw) return raw
    const v = Number(item?.value) || 0
    if (!total) return '0%'
    const p = Math.round((v / total) * 10000) / 100
    return `${p}%`
  }

  const w = chart.getWidth()
  const h = chart.getHeight()
  const cx = w * 0.5
  const cy = h * 0.52
  const r = Math.min(w, h) * 0.26
  const yScale = 0.72

  const elements: any[] = []
  const slices = series.filter((s) => s?.type === 'surface' && s?.name !== 'mouseoutSeries')

  slices.forEach((s, idx) => {
    const startRatio = Number(s?.pieData?.startRatio) || 0
    const endRatio = Number(s?.pieData?.endRatio) || 0
    const midRatio = (startRatio + endRatio) / 2
    const rad = midRatio * Math.PI * 2

    const color = s?.itemStyle?.color ?? 'rgba(140,210,255,0.9)'
    const name = s?.name ?? ''
    const value = s?.pieData?.value ?? 0
    const percent = getPercent(s?.pieData ?? {})

    const x1 = cx + Math.cos(rad) * r * 0.92
    const y1 = cy + Math.sin(rad) * r * 0.92 * yScale
    const x2 = cx + Math.cos(rad) * r * 1.12
    const y2 = cy + Math.sin(rad) * r * 1.12 * yScale
    const dir = Math.cos(rad) >= 0 ? 1 : -1
    const x3 = x2 + dir * 52
    const y3 = y2

    elements.push({
      type: 'group',
      id: `label-${idx}`,
      zlevel: 10,
      silent: true,
      children: [
        {
          type: 'polyline',
          shape: {
            points: [
              [x1, y1],
              [x2, y2],
              [x3, y3]
            ]
          },
          style: { stroke: color, lineWidth: 1, opacity: 0.8 }
        },
        {
          type: 'circle',
          shape: { cx: x1, cy: y1, r: 2.6 },
          style: { fill: color, opacity: 0.9 }
        },
        {
          type: 'text',
          style: {
            x: x3 + dir * 26,
            y: y3,
            text: `${name}\n${value}`,
            fill: color,
            font: '700 23px Microsoft YaHei',
            textAlign: dir > 0 ? 'left' : 'right',
            textVerticalAlign: 'middle',
            lineHeight: 16
          }
        }
      ]
    })
  })

  return elements
}

// -------------------- 组件 --------------------
const props = defineProps<{
  data?: Array<{ name: string; value: number; itemStyle?: { color?: string; opacity?: number } }>
  innerRadius?: number // 内径占比，0~1，默认0.59
  minThickness?: number // 最小厚度，默认0.08
  maxThickness?: number // 最大厚度，默认0.25
}>()

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null
let option: any = null

function initChart() {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)

  const pieData = props.data || [
    { name: 'cc', value: 37, itemStyle: { color: '#f77b66' } },
    { name: 'aa', value: 44, itemStyle: { color: '#3edce0' } },
    { name: 'bb', value: 32, itemStyle: { color: '#f94e76' } },
    { name: 'ee', value: 16, itemStyle: { color: '#018ef1' } },
    { name: 'dd', value: 23, itemStyle: { color: '#9e60f9' } }
  ]
  option = getPie3DOption(
    pieData,
    props.innerRadius ?? 0.59,
    props.minThickness ?? 0.08,
    props.maxThickness ?? 0.25
  )
  chartInstance.setOption(option)
  const elements = buildLabelGraphicElements(pieData, option.series, chartInstance)
  chartInstance.setOption(
    { graphic: elements } as any,
    { notMerge: false, lazyUpdate: true } as any
  )
  bindEvents()
}

function bindEvents() {
  if (!chartInstance) return
  let selectedIndex = ''
  let hoveredIndex = ''

  chartInstance.on('click', (params: any) => {
    if (params.seriesType !== 'surface') return
    if (params.seriesName === 'mouseoutSeries') return
    const idx = params.seriesIndex
    const isSelected = !option.series[idx].pieStatus.selected
    const isHovered = option.series[idx].pieStatus.hovered
    const k = option.series[idx].pieStatus.k
    const thickness = option.series[idx].pieStatus.thickness
    const startRatio = option.series[idx].pieData.startRatio
    const endRatio = option.series[idx].pieData.endRatio

    if (selectedIndex !== '' && selectedIndex !== idx) {
      const prev = option.series[selectedIndex]
      prev.parametricEquation = getParametricEquation(
        prev.pieData.startRatio,
        prev.pieData.endRatio,
        false,
        false,
        prev.pieStatus.k,
        prev.pieStatus.thickness
      )
      prev.pieStatus.selected = false
    }

    option.series[idx].parametricEquation = getParametricEquation(
      startRatio,
      endRatio,
      isSelected,
      isHovered,
      k,
      thickness
    )
    option.series[idx].pieStatus.selected = isSelected
    if (isSelected) selectedIndex = idx

    chartInstance!.setOption(option)
  })

  chartInstance.on('mouseover', (params: any) => {
    if (params.seriesType !== 'surface') return
    if (hoveredIndex === params.seriesIndex) return

    if (hoveredIndex !== '') {
      const prev = option.series[hoveredIndex]
      prev.parametricEquation = getParametricEquation(
        prev.pieData.startRatio,
        prev.pieData.endRatio,
        prev.pieStatus.selected,
        false,
        prev.pieStatus.k,
        prev.pieStatus.thickness
      )
      prev.pieStatus.hovered = false
      hoveredIndex = ''
    }

    if (params.seriesName !== 'mouseoutSeries') {
      const idx = params.seriesIndex
      const isSelected = option.series[idx].pieStatus.selected
      const k = option.series[idx].pieStatus.k
      const thickness = option.series[idx].pieStatus.thickness
      const startRatio = option.series[idx].pieData.startRatio
      const endRatio = option.series[idx].pieData.endRatio
      option.series[idx].parametricEquation = getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        true,
        k,
        thickness
      )
      option.series[idx].pieStatus.hovered = true
      hoveredIndex = idx
    }

    chartInstance!.setOption(option)
  })

  chartInstance.on('globalout', () => {
    if (hoveredIndex !== '') {
      const prev = option.series[hoveredIndex]
      prev.parametricEquation = getParametricEquation(
        prev.pieData.startRatio,
        prev.pieData.endRatio,
        prev.pieStatus.selected,
        false,
        prev.pieStatus.k,
        prev.pieStatus.thickness
      )
      prev.pieStatus.hovered = false
      hoveredIndex = ''
      chartInstance!.setOption(option)
    }
  })
}

function resizeChart() {
  chartInstance?.resize()
  if (chartInstance && option?.series) {
    const pieData = props.data || []
    const elements = buildLabelGraphicElements(pieData, option.series, chartInstance)
    chartInstance.setOption(
      { graphic: elements } as any,
      { notMerge: false, lazyUpdate: true } as any
    )
  }
}

onMounted(() => {
  nextTick(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  chartInstance?.dispose()
})

watch(
  () => [props.data, props.innerRadius, props.minThickness, props.maxThickness],
  () => {
    if (chartInstance) {
      const pieData = props.data || []
      option = getPie3DOption(
        pieData,
        props.innerRadius ?? 0.59,
        props.minThickness ?? 0.08,
        props.maxThickness ?? 0.25
      )
      chartInstance.setOption(option)
      const elements = buildLabelGraphicElements(pieData, option.series, chartInstance)
      chartInstance.setOption(
        { graphic: elements } as any,
        { notMerge: false, lazyUpdate: true } as any
      )
      chartInstance.off('click')
      chartInstance.off('mouseover')
      chartInstance.off('globalout')
      bindEvents()
    }
  },
  { deep: true }
)
</script>

<style scoped>
.pie3d-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>
