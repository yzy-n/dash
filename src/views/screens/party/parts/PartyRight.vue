<template>
  <div class="right-wrap">
    <div class="stats-row">
      <div v-for="item in data.topStats" :key="item.label" class="stat-card">
        <span class="stat-label">{{ item.label }}</span>
        <strong class="stat-value">{{ item.value }}</strong>
      </div>
    </div>

    <div class="panel panel--donut">
      <div class="panel-title">组织概览</div>
      <div class="donut-area">
        <div class="donut"></div>
        <div class="legend">
          <div v-for="item in data.ringStats" :key="item.label" class="legend-row">
            <span class="legend-label">{{ item.label }}</span>
            <span class="legend-value">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="panel panel--rank">
      <div class="panel-title">地区排行</div>
      <div class="rank-list">
        <div v-for="item in data.rankingRows" :key="item.label" class="rank-row">
          <span class="rank-label">{{ item.label }}</span>
          <span class="rank-line">
            <span class="rank-fill"></span>
          </span>
          <strong class="rank-value">{{ item.value }}</strong>
        </div>
      </div>
    </div>

    <div class="panel panel--bars">
      <div class="panel-title">党建指标</div>
      <div class="bar-list">
        <div v-for="item in data.chartRows" :key="item.label" class="bar-row">
          <div class="bar-head">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </div>
          <div class="bar-track">
            <div class="bar-fill"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PartyRightData } from '../data'

defineProps<{
  data: PartyRightData
}>()
</script>

<style scoped>
.right-wrap {
  width: 100%;
  height: 100%;
  padding-top: 112px;
  box-sizing: border-box;
  color: #ffe4a5;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.stat-card,
.panel {
  border: 1px solid rgba(255, 205, 122, 0.22);
  background: linear-gradient(180deg, rgba(150, 16, 15, 0.76), rgba(107, 9, 9, 0.62));
  box-shadow: inset 0 0 0 1px rgba(255, 162, 50, 0.08);
}

.stat-card {
  min-height: 92px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.stat-label {
  font-size: 18px;
  color: rgba(255, 232, 192, 0.78);
}

.stat-value {
  font-size: 36px;
  line-height: 1;
  color: #fff0c5;
}

.panel {
  margin-top: 18px;
  padding: 20px;
}

.panel-title {
  font-size: 24px;
  color: #fff1ca;
}

.donut-area {
  margin-top: 18px;
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 20px;
  align-items: center;
}

.donut {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(115, 9, 9, 0.9) 34%, transparent 35%),
    conic-gradient(#ffcc3f 0 28%, #ff7a45 28% 61%, #ff4d6d 61% 85%, #f15a24 85% 100%);
}

.legend {
  display: grid;
  gap: 12px;
}

.legend-row,
.rank-row,
.bar-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.legend-label,
.rank-label,
.bar-head span {
  font-size: 16px;
  color: #ffe4aa;
}

.legend-value,
.rank-value,
.bar-head strong {
  font-size: 18px;
  color: #ffcd72;
}

.rank-list,
.bar-list {
  margin-top: 18px;
  display: grid;
  gap: 14px;
}

.rank-line,
.bar-track {
  flex: 1;
  height: 10px;
  margin: 0 14px;
  background: rgba(255, 220, 171, 0.08);
  border: 1px solid rgba(255, 196, 96, 0.16);
}

.rank-fill,
.bar-fill {
  display: block;
  width: 72%;
  height: 100%;
  background: linear-gradient(90deg, #ffb949, #fff08e);
}

.bar-row {
  display: grid;
  gap: 8px;
}
</style>
