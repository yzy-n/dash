<template>
  <div class="left-wrap">
    <h3 class="org-title" :style="getPointStyle(layout.orgTitle)">{{ data.orgTitle }}</h3>
    <div class="org-total" :style="getPointStyle(layout.orgTotal)">
      合计：<strong>{{ data.orgTotal }}</strong> 个
    </div>

    <button class="chip chip--active" :style="getRectStyle(layout.cityTab)">全市</button>
    <button class="chip" :style="getRectStyle(layout.districtTab)">地区</button>

    <div
      v-for="(item, index) in data.orgList"
      :key="item.label"
      class="org-item"
      :style="getOrgItemStyle(index)"
    >
      {{ item.label }}
    </div>

    <h3 class="stars-title" :style="getPointStyle(layout.starsTitle)">{{ data.starsTitle }}</h3>
    <button class="chip2 chip--active" :style="getRectStyle(layout.starsCityTab)">全市</button>
    <button class="chip2" :style="getRectStyle(layout.starsDistrictTab)">地区</button>
    <div class="stars-total" :style="getPointStyle(layout.starsTotal)">
      合计：<strong>{{ data.starsTotal }}</strong> 个
    </div>

    <div
      v-for="(item, index) in data.starRows"
      :key="item.label"
      class="star-row"
      :style="getStarRowStyle(index)"
    >
      <div class="star-dot"></div>
      <div class="star-icons">
        <span v-for="n in item.stars" :key="n" class="star">★</span>
      </div>
      <div class="star-info">
        <span class="star-label">{{ item.label }}</span>
        <span class="star-value">{{ item.value }}</span>
        <span class="star-rate">{{ item.rate }}</span>
      </div>
    </div>

    <div class="panel-structure">
      <div class="panel-structure__inner">
        <PartyStructure :data="data.structurePanel" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PartyStructure from './PartyStructure.vue'
import type { PartyLeftData } from '../data'

defineProps<{
  data: PartyLeftData
}>()

type Point = {
  left: number
  top: number
}

type Rect = Point & {
  width: number
  height: number
}

const layout = {
  orgTitle: { left: 172, top: 190 },
  orgTotal: { left: 1018, top: 200 },
  cityTab: { left: 308, top: 286, width: 296, height: 46 },
  districtTab: { left: 692, top: 286, width: 296, height: 46 },
  orgItems: { left: 126, top: 386, width: 1028, height: 84, stepY: 124 },
  starsTitle: { left: 34, top: 1156 },
  starsCityTab: { left: 96, top: 1266, width: 190, height: 44 },
  starsDistrictTab: { left: 382, top: 1266, width: 190, height: 44 },
  starsTotal: { left: 266, top: 1350 },
  starRows: { left: 26, top: 1450, width: 1048, height: 58, stepY: 92 }
} as const

const getPointStyle = (point: Point) => ({
  left: `${point.left}px`,
  top: `${point.top}px`,
  fontStyle: 'italic'
})

const getRectStyle = (rect: Rect) => ({
  left: `${rect.left}px`,
  top: `${rect.top}px`,
  width: `${rect.width}px`,
  height: `${rect.height}px`
})

const getOrgItemStyle = (index: number) =>
  getRectStyle({
    left: layout.orgItems.left,
    top: layout.orgItems.top + index * layout.orgItems.stepY,
    width: layout.orgItems.width,
    height: layout.orgItems.height,
    marginTop: '30px'
  })

const getStarRowStyle = (index: number) =>
  getRectStyle({
    left: layout.starRows.left,
    top: layout.starRows.top + index * layout.starRows.stepY,
    width: layout.starRows.width,
    height: layout.starRows.height
  })
</script>

<style scoped>
.left-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  color: #ffe4a5;
}

.org-title {
  position: absolute;
  margin: 0;
  font-weight: 700;
  letter-spacing: 2px;
  color: #ffefc8;
  text-shadow: 0 0 8px rgba(255, 196, 112, 0.16);
}
.stars-title {
  position: absolute;
  margin: 0;
  font-weight: 700;
  letter-spacing: 2px;
  color: #ffefc8;
  text-shadow: 0 0 8px rgba(255, 196, 112, 0.16);
  margin-top: 10px;
  margin-left: 130px;
  font-size: 40px;
}

.org-title {
  font-size: 40px;
}

.org-total {
  position: absolute;
  font-size: 30px;
  color: #ffbf58;
  white-space: nowrap;
}
.stars-total {
  position: absolute;
  font-size: 30px;
  margin-left: 250px;
  margin-top: 50px;
  color: #ffbf58;
  white-space: nowrap;
}

.org-total strong,
.stars-total strong {
  margin: 0 6px;
  font-size: 28px;
  color: #ffd465;
}

.chip {
  position: absolute;
  border: none;
  border-radius: 22px;
  color: #fff1cb;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(180deg, rgba(255, 201, 93, 0.52), rgba(255, 145, 31, 0.18));
  box-shadow:
    inset 0 1px 0 rgba(255, 241, 190, 0.42),
    inset 0 0 0 1px rgba(255, 211, 122, 0.34),
    0 0 10px rgba(255, 170, 52, 0.1);
  cursor: default;
}
.chip2 {
  position: absolute;
  border: none;
  border-radius: 22px;
  color: #fff1cb;
  font-size: 28px;
  font-weight: 700;
  margin-left: 300px;
  margin-top: 30px;
  background: linear-gradient(180deg, rgba(255, 201, 93, 0.52), rgba(255, 145, 31, 0.18));
  box-shadow:
    inset 0 1px 0 rgba(255, 241, 190, 0.42),
    inset 0 0 0 1px rgba(255, 211, 122, 0.34),
    0 0 10px rgba(255, 170, 52, 0.1);
  cursor: default;
}

.org-item {
  position: absolute;
  line-height: 84px;
  text-align: center;
  font-size: 28px;
  margin-top: 30px;
  font-weight: 700;
  color: #ffeec8;
  border-radius: 32px;
  background: linear-gradient(180deg, rgba(255, 204, 102, 0.62), rgba(255, 150, 37, 0.18));
  box-shadow:
    inset 0 1px 0 rgba(255, 241, 197, 0.65),
    inset 0 0 0 1px rgba(255, 207, 106, 0.22),
    0 0 10px rgba(255, 164, 54, 0.08);
}

.star-row {
  position: absolute;
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-left: 110px;
  margin-top: 100px;
}

.star-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 18px;
  background:
    radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9), rgba(255, 235, 168, 0.2) 45%),
    radial-gradient(circle at 60% 60%, rgba(255, 188, 82, 0.95), rgba(255, 107, 0, 0.18));
  box-shadow:
    0 0 14px rgba(255, 184, 62, 0.28),
    inset 0 0 0 2px rgba(255, 226, 146, 0.42);
  flex: 0 0 auto;
}

.star-icons {
  display: flex;
  gap: 14px;
  color: #ffd74a;
  text-shadow: 0 0 10px rgba(255, 214, 84, 0.28);
  font-size: 34px;
  width: 140px;
  flex: 0 0 auto;
}

.star {
  line-height: 1;
}

.star-info {
  flex: 1;
  display: flex;
  align-items: center;
  height: 58px;
  padding: 0 26px;
  border-radius: 34px;
  background: linear-gradient(90deg, rgba(255, 206, 120, 0.22), rgba(255, 160, 62, 0.08));
  box-shadow:
    inset 0 0 0 1px rgba(255, 214, 122, 0.18),
    0 0 18px rgba(255, 170, 52, 0.08);
}

.star-label {
  flex: 1;
  color: #ffe4aa;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.star-value {
  width: 220px;
  color: #ffd374;
  font-size: 34px;
  font-weight: 700;
  text-align: right;
  white-space: nowrap;
}

.star-rate {
  width: 180px;
  color: #ffd374;
  font-size: 34px;
  font-weight: 700;
  text-align: right;
  white-space: nowrap;
}

.panel-structure {
  position: absolute;
  top: 0;
  left: 1200px;
  width: 2640px;
  height: 2160px;
  overflow: hidden;
}

.panel-structure__inner {
  width: 4080px;
  height: 2160px;
  transform: scale(0.647);
  transform-origin: top left;
}
</style>
