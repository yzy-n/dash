<template>
  <div class="center-wrap">
    <div class="top-stats">
      <div v-for="item in data.topStats" :key="item.label" class="top-stat">
        <span class="top-label">{{ item.label }}</span>
        <span class="top-value">{{ item.value }}</span>
      </div>
    </div>

    <div class="cols">
      <div class="side side--left">
        <section class="list list--left-a">
          <div class="list-title">{{ data.leftBlocks?.[0]?.title || '' }}</div>
          <div class="list-rows">
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.leftBlocks?.[0]?.rows?.[0]?.value,
                  data.leftBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.leftBlocks?.[0]?.rows?.[0]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[0]?.rows?.[0]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.leftBlocks?.[0]?.rows?.[1]?.value,
                  data.leftBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.leftBlocks?.[0]?.rows?.[1]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[0]?.rows?.[1]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.leftBlocks?.[0]?.rows?.[2]?.value,
                  data.leftBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.leftBlocks?.[0]?.rows?.[2]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[0]?.rows?.[2]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.leftBlocks?.[0]?.rows?.[3]?.value,
                  data.leftBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.leftBlocks?.[0]?.rows?.[3]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[0]?.rows?.[3]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.leftBlocks?.[0]?.rows?.[4]?.value,
                  data.leftBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.leftBlocks?.[0]?.rows?.[4]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[0]?.rows?.[4]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.leftBlocks?.[0]?.rows?.[5]?.value,
                  data.leftBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.leftBlocks?.[0]?.rows?.[5]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[0]?.rows?.[5]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.leftBlocks?.[0]?.rows?.[6]?.value,
                  data.leftBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.leftBlocks?.[0]?.rows?.[6]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[0]?.rows?.[6]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.leftBlocks?.[0]?.rows?.[7]?.value,
                  data.leftBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.leftBlocks?.[0]?.rows?.[7]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[0]?.rows?.[7]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.leftBlocks?.[0]?.rows?.[8]?.value,
                  data.leftBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.leftBlocks?.[0]?.rows?.[8]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[0]?.rows?.[8]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.leftBlocks?.[0]?.rows?.[9]?.value,
                  data.leftBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.leftBlocks?.[0]?.rows?.[9]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[0]?.rows?.[9]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.leftBlocks?.[0]?.rows?.[10]?.value,
                  data.leftBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.leftBlocks?.[0]?.rows?.[10]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[0]?.rows?.[10]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.leftBlocks?.[0]?.rows?.[11]?.value,
                  data.leftBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.leftBlocks?.[0]?.rows?.[11]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[0]?.rows?.[11]?.value || '' }}</span>
            </div>
          </div>
        </section>

        <section class="list list--left-b">
          <div class="list-title">{{ data.leftBlocks?.[1]?.title || '' }}</div>
          <div class="list-rows">
            <div class="list-row">
              <span class="list-label">{{ data.leftBlocks?.[1]?.rows?.[0]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[1]?.rows?.[0]?.value || '' }}</span>
            </div>
            <div class="list-row">
              <span class="list-label">{{ data.leftBlocks?.[1]?.rows?.[1]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[1]?.rows?.[1]?.value || '' }}</span>
            </div>
            <div class="list-row">
              <span class="list-label">{{ data.leftBlocks?.[1]?.rows?.[2]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[1]?.rows?.[2]?.value || '' }}</span>
            </div>
            <div class="list-row">
              <span class="list-label">{{ data.leftBlocks?.[1]?.rows?.[3]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[1]?.rows?.[3]?.value || '' }}</span>
            </div>
            <div class="list-row">
              <span class="list-label">{{ data.leftBlocks?.[1]?.rows?.[4]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[1]?.rows?.[4]?.value || '' }}</span>
            </div>
            <div class="list-row">
              <span class="list-label">{{ data.leftBlocks?.[1]?.rows?.[5]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[1]?.rows?.[5]?.value || '' }}</span>
            </div>
            <div class="list-row">
              <span class="list-label">{{ data.leftBlocks?.[1]?.rows?.[6]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[1]?.rows?.[6]?.value || '' }}</span>
            </div>
            <div class="list-row">
              <span class="list-label">{{ data.leftBlocks?.[1]?.rows?.[7]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[1]?.rows?.[7]?.value || '' }}</span>
            </div>
            <div class="list-row">
              <span class="list-label">{{ data.leftBlocks?.[1]?.rows?.[8]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[1]?.rows?.[8]?.value || '' }}</span>
            </div>
            <div class="list-row">
              <span class="list-label">{{ data.leftBlocks?.[1]?.rows?.[9]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[1]?.rows?.[9]?.value || '' }}</span>
            </div>
            <div class="list-row">
              <span class="list-label">{{ data.leftBlocks?.[1]?.rows?.[10]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[1]?.rows?.[10]?.value || '' }}</span>
            </div>
            <div class="list-row">
              <span class="list-label">{{ data.leftBlocks?.[1]?.rows?.[11]?.label || '' }}</span>
              <span class="list-value">{{ data.leftBlocks?.[1]?.rows?.[11]?.value || '' }}</span>
            </div>
          </div>
        </section>
      </div>

      <div class="side side--right">
        <section class="list list--right-a">
          <div class="list-title">{{ data.rightBlocks?.[0]?.title || '' }}</div>
          <div class="list-rows">
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.rightBlocks?.[0]?.rows?.[0]?.value,
                  data.rightBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[0]?.rows?.[0]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[0]?.rows?.[0]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.rightBlocks?.[0]?.rows?.[1]?.value,
                  data.rightBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[0]?.rows?.[1]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[0]?.rows?.[1]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.rightBlocks?.[0]?.rows?.[2]?.value,
                  data.rightBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[0]?.rows?.[2]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[0]?.rows?.[2]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.rightBlocks?.[0]?.rows?.[3]?.value,
                  data.rightBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[0]?.rows?.[3]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[0]?.rows?.[3]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.rightBlocks?.[0]?.rows?.[4]?.value,
                  data.rightBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[0]?.rows?.[4]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[0]?.rows?.[4]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.rightBlocks?.[0]?.rows?.[5]?.value,
                  data.rightBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[0]?.rows?.[5]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[0]?.rows?.[5]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.rightBlocks?.[0]?.rows?.[6]?.value,
                  data.rightBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[0]?.rows?.[6]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[0]?.rows?.[6]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.rightBlocks?.[0]?.rows?.[7]?.value,
                  data.rightBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[0]?.rows?.[7]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[0]?.rows?.[7]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.rightBlocks?.[0]?.rows?.[8]?.value,
                  data.rightBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[0]?.rows?.[8]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[0]?.rows?.[8]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.rightBlocks?.[0]?.rows?.[9]?.value,
                  data.rightBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[0]?.rows?.[9]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[0]?.rows?.[9]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.rightBlocks?.[0]?.rows?.[10]?.value,
                  data.rightBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[0]?.rows?.[10]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[0]?.rows?.[10]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fill': getFill(
                  data.rightBlocks?.[0]?.rows?.[11]?.value,
                  data.rightBlocks?.[0]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[0]?.rows?.[11]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[0]?.rows?.[11]?.value || '' }}</span>
            </div>
          </div>
        </section>

        <section class="list list--right-b">
          <div class="list-title">{{ data.rightBlocks?.[1]?.title || '' }}</div>
          <div class="list-rows">
            <div
              class="list-row"
              :style="{
                '--fillx': getFillX(
                  data.rightBlocks?.[1]?.rows?.[0]?.value,
                  data.rightBlocks?.[1]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[1]?.rows?.[0]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[1]?.rows?.[0]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fillx': getFillX(
                  data.rightBlocks?.[1]?.rows?.[1]?.value,
                  data.rightBlocks?.[1]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[1]?.rows?.[1]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[1]?.rows?.[1]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fillx': getFillX(
                  data.rightBlocks?.[1]?.rows?.[2]?.value,
                  data.rightBlocks?.[1]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[1]?.rows?.[2]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[1]?.rows?.[2]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fillx': getFillX(
                  data.rightBlocks?.[1]?.rows?.[3]?.value,
                  data.rightBlocks?.[1]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[1]?.rows?.[3]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[1]?.rows?.[3]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fillx': getFillX(
                  data.rightBlocks?.[1]?.rows?.[4]?.value,
                  data.rightBlocks?.[1]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[1]?.rows?.[4]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[1]?.rows?.[4]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fillx': getFillX(
                  data.rightBlocks?.[1]?.rows?.[5]?.value,
                  data.rightBlocks?.[1]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[1]?.rows?.[5]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[1]?.rows?.[5]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fillx': getFillX(
                  data.rightBlocks?.[1]?.rows?.[6]?.value,
                  data.rightBlocks?.[1]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[1]?.rows?.[6]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[1]?.rows?.[6]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fillx': getFillX(
                  data.rightBlocks?.[1]?.rows?.[7]?.value,
                  data.rightBlocks?.[1]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[1]?.rows?.[7]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[1]?.rows?.[7]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fillx': getFillX(
                  data.rightBlocks?.[1]?.rows?.[8]?.value,
                  data.rightBlocks?.[1]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[1]?.rows?.[8]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[1]?.rows?.[8]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fillx': getFillX(
                  data.rightBlocks?.[1]?.rows?.[9]?.value,
                  data.rightBlocks?.[1]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[1]?.rows?.[9]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[1]?.rows?.[9]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fillx': getFillX(
                  data.rightBlocks?.[1]?.rows?.[10]?.value,
                  data.rightBlocks?.[1]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[1]?.rows?.[10]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[1]?.rows?.[10]?.value || '' }}</span>
            </div>
            <div
              class="list-row"
              :style="{
                '--fillx': getFillX(
                  data.rightBlocks?.[1]?.rows?.[11]?.value,
                  data.rightBlocks?.[1]?.rows
                )
              }"
            >
              <span class="list-label">{{ data.rightBlocks?.[1]?.rows?.[11]?.label || '' }}</span>
              <span class="list-value">{{ data.rightBlocks?.[1]?.rows?.[11]?.value || '' }}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PartyCenterData } from '../data'

const props = defineProps<{
  data: PartyCenterData
}>()

const pickNumber = (value: unknown) => {
  if (value === null || value === undefined) return undefined
  const match = String(value).match(/-?\d+(?:\.\d+)?/)
  if (!match) return undefined
  const num = Number(match[0])
  return Number.isFinite(num) ? num : undefined
}

const getFill = (value: unknown, rows: unknown) => {
  const list = Array.isArray(rows) ? rows : []
  const nums = list
    .map((item: any) => pickNumber(item?.value))
    .filter((n): n is number => typeof n === 'number' && Number.isFinite(n))
  const max = nums.length ? Math.max(...nums) : 0
  const cur = pickNumber(value) ?? 0
  if (!max) return '0%'
  const pct = Math.max(0, Math.min(100, (cur / max) * 30))
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
  top: 220px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 200px;
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
  left: 0;
  right: 0;
  top: 320px;
  bottom: 88px;
  display: flex;
  justify-content: space-between;
  padding: 0 80px;
  box-sizing: border-box;
}

.side {
  position: relative;
  width: 1560px;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.list {
  position: relative;
  width: 420px;
  height: 100%;
}

.list-title {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 52px;
  line-height: 52px;
  text-align: center;
  font-size: 32px;
  font-weight: 800;
  color: rgba(255, 238, 206, 0.98);
  letter-spacing: 2px;
  background: linear-gradient(90deg, rgba(197, 15, 15, 0.82), rgba(197, 15, 15, 0.22));
  box-shadow:
    inset 0 0 0 1px rgba(255, 230, 172, 0.08),
    0 0 16px rgba(255, 92, 32, 0.12);
}

.list-rows {
  position: absolute;
  left: 0;
  right: 0;
  top: 76px;
  height: 1350px;
}

.list-row {
  position: absolute;
  left: 0;
  right: 0;
  height: 72px;
  padding: 0 24px;
  box-sizing: border-box;
}

.list-row:nth-child(1) {
  top: 0;
}
.list-row:nth-child(2) {
  top: 108px;
}
.list-row:nth-child(3) {
  top: 216px;
}
.list-row:nth-child(4) {
  top: 324px;
}
.list-row:nth-child(5) {
  top: 432px;
}
.list-row:nth-child(6) {
  top: 540px;
}
.list-row:nth-child(7) {
  top: 648px;
}
.list-row:nth-child(8) {
  top: 756px;
}
.list-row:nth-child(9) {
  top: 864px;
}
.list-row:nth-child(10) {
  top: 972px;
}
.list-row:nth-child(11) {
  top: 1080px;
}
.list-row:nth-child(12) {
  top: 1188px;
}

.list-label {
  position: absolute;
  left: 26px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 26px;
  color: rgba(255, 238, 206, 0.96);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-value {
  position: absolute;
  right: 26px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 26px;
  color: rgba(255, 238, 206, 0.98);
  font-weight: 800;
  white-space: nowrap;
}

.list--left-b .list-label {
  display: none;
}

.list--left-b {
  transform: translateX(-600px);
}

.list--left-b .list-value {
  left: 50%;
  right: auto;
  top: 2px;
  transform: translateX(-50%);
  font-size: 28px;
}

.list--left-b .list-row::before {
  content: '';
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 0;
  height: 22px;
  border: 2px solid rgba(255, 200, 130, 0.62);
  background: rgba(120, 10, 10, 0.18);
  box-shadow:
    inset 0 0 0 2px rgba(255, 220, 160, 0.08),
    0 0 18px rgba(255, 140, 70, 0.06);
  box-sizing: border-box;
}

.list--left-b .list-row::after {
  content: '';
  position: absolute;
  left: 30px;
  bottom: 6px;
  width: 62%;
  height: 10px;
  background: linear-gradient(90deg, rgba(255, 210, 120, 0.85), rgba(255, 120, 0, 0.55));
}

.list--left-a .list-label {
  left: 28px;
  top: 16px;
  transform: none;
  font-size: 26px;
  font-weight: 800;
}

.list--left-a .list-value {
  right: 28px;
  top: 16px;
  transform: none;
  font-size: 26px;
  font-weight: 800;
}

.list--left-a .list-row::before {
  content: '';
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 0;
  height: 22px;
  border: 2px solid rgba(255, 200, 130, 0.62);
  background: rgba(120, 10, 10, 0.18);
  box-shadow:
    inset 0 0 0 2px rgba(255, 220, 160, 0.08),
    0 0 18px rgba(255, 140, 70, 0.06);
  box-sizing: border-box;
}

.list--left-a .list-row::after {
  content: '';
  position: absolute;
  left: 30px;
  bottom: 6px;
  width: var(--fill, 0%);
  height: 10px;
  background: linear-gradient(90deg, rgba(255, 210, 120, 0.85), rgba(255, 120, 0, 0.55));
}
.list--right-a {
  transform: translateX(600px);
}
.list--right-a .list-label {
  left: 28px;
  top: 16px;
  transform: none;
  font-size: 26px;
  font-weight: 800;
}

.list--right-a .list-value {
  right: 28px;
  top: 16px;
  transform: none;
  font-size: 26px;
  font-weight: 800;
}

.list--right-a .list-row::before {
  content: '';
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 0;
  height: 22px;
  border: 2px solid rgba(255, 200, 130, 0.62);
  background: rgba(120, 10, 10, 0.18);
  box-shadow:
    inset 0 0 0 2px rgba(255, 220, 160, 0.08),
    0 0 18px rgba(255, 140, 70, 0.06);
  box-sizing: border-box;
}

.list--right-a .list-row::after {
  content: '';
  position: absolute;
  left: 30px;
  bottom: 6px;
  width: var(--fill, 0%);
  height: 10px;
  background: linear-gradient(90deg, rgba(255, 210, 120, 0.85), rgba(255, 120, 0, 0.55));
}

.list--right-b .list-label {
  display: none;
}

.list--right-b .list-value {
  left: 50%;
  right: auto;
  top: 2px;
  transform: translateX(-50%);
  font-size: 28px;
}

.list--right-b .list-row::before {
  content: '';
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 0;
  height: 22px;
  border: 2px solid rgba(255, 200, 130, 0.62);
  background: rgba(120, 10, 10, 0.18);
  box-shadow:
    inset 0 0 0 2px rgba(255, 220, 160, 0.08),
    0 0 18px rgba(255, 140, 70, 0.06);
  box-sizing: border-box;
}

.list--right-b .list-row::after {
  content: '';
  position: absolute;
  left: 30px;
  right: 30px;
  bottom: 6px;
  height: 10px;
  background: linear-gradient(90deg, rgba(255, 210, 120, 0.85), rgba(255, 120, 0, 0.55));
  transform: scaleX(var(--fillx, 0));
  transform-origin: left;
}
</style>
