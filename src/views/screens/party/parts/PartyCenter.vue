<template>
  <div class="center-wrap">
    <h3 class="title">{{ data.title }}</h3>

    <div class="top-stats">
      <div v-for="item in data.topStats" :key="item.label" class="top-stat">
        <span class="top-label">{{ item.label }}</span>
        <span class="top-value">{{ item.value }}</span>
      </div>
    </div>

    <div class="cols">
      <div class="col col--left">
        <section v-for="block in data.leftBlocks" :key="block.title" class="block">
          <div class="block-title">{{ block.title }}</div>
          <div class="rows">
            <div v-for="row in block.rows" :key="row.label" class="row">
              <span class="row-label">{{ row.label }}</span>
              <span class="row-value">{{ row.value }}</span>
            </div>
          </div>
        </section>
      </div>

      <div class="col col--right">
        <section v-for="block in data.rightBlocks" :key="block.title" class="block">
          <div class="block-title">{{ block.title }}</div>
          <div class="rows">
            <div v-for="row in block.rows" :key="row.label" class="row">
              <span class="row-label">{{ row.label }}</span>
              <span class="row-value">{{ row.value }}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PartyCenterData } from '../data'

defineProps<{
  data: PartyCenterData
}>()
</script>

<style scoped>
.center-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  color: rgba(255, 214, 140, 0.92);
}

.title {
  margin: 0;
  position: absolute;
  left: 50%;
  top: 78px;
  transform: translateX(-50%);
  font-size: 48px;
  font-weight: 700;
  color: #ffefc8;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 214, 120, 0.16);
}

.top-stats {
  position: absolute;
  left: 60px;
  right: 60px;
  top: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.top-stat {
  flex: 1;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  border: 1px solid rgba(255, 187, 92, 0.34);
  background: linear-gradient(180deg, rgba(255, 173, 81, 0.12), rgba(225, 73, 21, 0.05));
  box-shadow:
    inset 0 0 0 1px rgba(255, 220, 160, 0.06),
    0 0 16px rgba(255, 170, 90, 0.08);
}

.top-label {
  font-size: 20px;
  color: rgba(255, 232, 198, 0.92);
  letter-spacing: 1px;
  white-space: nowrap;
}

.top-value {
  font-size: 34px;
  color: rgba(255, 232, 198, 0.98);
  font-weight: 700;
  white-space: nowrap;
}

.cols {
  position: absolute;
  left: 80px;
  right: 80px;
  top: 190px;
  bottom: 88px;
  display: flex;
  justify-content: space-between;
  gap: 72px;
}

.col {
  width: 44%;
  display: flex;
  flex-direction: column;
  gap: 62px;
}

.block-title {
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(255, 238, 206, 0.98);
  background: linear-gradient(90deg, rgba(197, 15, 15, 0.82), rgba(197, 15, 15, 0.22));
  border: 1px solid rgba(255, 176, 102, 0.25);
  box-shadow:
    inset 0 0 0 1px rgba(255, 230, 172, 0.08),
    0 0 16px rgba(255, 92, 32, 0.12);
}

.rows {
  margin-top: 16px;
  display: grid;
  gap: 16px;
}

.row {
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  border: 1px solid rgba(255, 176, 102, 0.25);
  background:
    linear-gradient(
      90deg,
      rgba(255, 200, 130, 0.12),
      rgba(255, 200, 130, 0.05) 60%,
      rgba(255, 200, 130, 0.02)
    ),
    rgba(197, 15, 15, 0.16);
}

.row-label {
  font-size: 18px;
  color: rgba(255, 238, 206, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 12px;
}

.row-value {
  font-size: 18px;
  color: rgba(255, 238, 206, 0.98);
  font-weight: 700;
  text-align: right;
  white-space: nowrap;
}
</style>
