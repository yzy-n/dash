<template>
  <!-- 给地图容器固定宽高，杜绝高度0空白 -->
  <div ref="mapContainer" class="amap-box"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const props = defineProps<{
  buses: Array<{ id: string | number; lng: number; lat: number; label?: string }>
  routePath: Array<[number, number]>
}>()

const mapContainer = ref<HTMLDivElement | null>(null)
let map: AMap.Map | null = null
let busMarkers: AMap.Marker[] = []
let routePolyline: AMap.Polyline | null = null

// ========= 1. 替换你自己的Web JS Key =========
const AMAP_KEY = 'd2769ab79a003d151d5c1b251b8b5c94'
let AMapGlobal: typeof AMap | null = null
let loadLock = false

// 单例加载地图API
const loadAMapApi = async (): Promise<typeof AMap | null> => {
  if (AMapGlobal) return AMapGlobal
  if (loadLock) {
    await new Promise((res) => setTimeout(res, 300))
    return loadAMapApi()
  }
  loadLock = true
  try {
    AMapGlobal = await AMapLoader.load({
      key: AMAP_KEY,
      version: '2.0',
      plugins: ['AMap.ToolBar', 'AMap.MapType']
    })
    console.log('高德API加载成功', AMapGlobal)
  } catch (e) {
    console.error('高德API加载失败，请检查key和域名白名单', e)
    return null
  } finally {
    loadLock = false
  }
  return AMapGlobal
}

// 初始化地图
const initMap = async () => {
  // 强制等待DOM完全渲染
  await nextTick()
  if (!mapContainer.value) {
    console.error('地图容器DOM不存在')
    return
  }
  // 已有地图实例直接返回，不重复创建
  if (map) return

  const AMap = await loadAMapApi()
  if (!AMap) return

  map = new AMap.Map(mapContainer.value!, {
    zoom: 11,
    center: [122.99, 41.12], // 鞍山坐标
    viewMode: '3D',
    showLabel: true,
    // 兜底：先使用标准矢量图，避免卫星图加载失败空白
    layers: [new AMap.createDefaultLayer()]
  })

  // 图层切换控件：1=卫星，0=标准地图
  const mapTypeCtrl = new AMap.MapType({
    defaultType: 1,
    showRoad: true
  })
  map.addControl(mapTypeCtrl)
  map.addControl(new AMap.ToolBar({ position: 'RB' }))

  console.log('地图实例创建完成', map)
}

// 渲染公交点位
const renderBusMarkers = () => {
  if (!map || !AMapGlobal) return
  busMarkers.forEach((m) => m.remove())
  busMarkers = []
  props.buses.forEach((item) => {
    const marker = new AMapGlobal!.Marker({
      map,
      position: [item.lng, item.lat],
      icon: new AMapGlobal!.Icon({
        size: [32, 32],
        image: '/bus-icon.png',
        imageSize: [32, 32]
      }),
      title: item.label
    })
    busMarkers.push(marker)
  })
}

// 绘制线路
const renderRouteLine = () => {
  if (!map || !AMapGlobal || props.routePath.length === 0) return
  if (routePolyline) routePolyline.remove()

  routePolyline = new AMapGlobal!.Polyline({
    path: props.routePath,
    strokeColor: '#00eaff',
    strokeWeight: 6,
    strokeOpacity: 0.8,
    zIndex: 100
  })
  map.add(routePolyline)
  map.setFitView([routePolyline])
}

watch(() => props.buses, renderBusMarkers, { deep: true })
watch(() => props.routePath, renderRouteLine, { deep: true })

onMounted(async () => {
  await initMap()
  renderBusMarkers()
  renderRouteLine()
})

onBeforeUnmount(() => {
  if (map) {
    map.destroy()
    map = null
  }
})
</script>

<style scoped>
/* 核心修复：必须给地图容器固定宽高，不能高度自适应0 */
.amap-box {
  width: 100%;
  height: 100%;
  min-height: 600px;
  background: #061b48;
}
</style>
