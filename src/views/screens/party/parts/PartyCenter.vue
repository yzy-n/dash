<template>
  <div class="center-wrap">
    <h3 class="title">{{ data.title }}</h3>

    <div class="gender-row">
      <div v-for="item in data.genderStats" :key="item.label" class="gender-card">
        <span class="gender-label">{{ item.label }}</span>
        <strong class="gender-value">{{ item.value }}</strong>
      </div>
    </div>

    <div class="dist-wrap">
      <section class="dist-block">
        <div class="block-tag">年龄分布</div>
        <div class="dist-grid">
          <div v-for="item in data.ageStats" :key="item.label" class="dist-item">
            <div class="dist-name">{{ item.label }}</div>
            <div class="dist-value">{{ item.value }}</div>
          </div>
        </div>
      </section>

      <section class="dist-block">
        <div class="block-tag">入党时间分布</div>
        <div class="dist-grid">
          <div v-for="item in data.joinStats" :key="item.label" class="dist-item">
            <div class="dist-name">{{ item.label }}</div>
            <div class="dist-value">{{ item.value }}</div>
          </div>
        </div>
      </section>
    </div>

    <div class="middle-row">
      <div class="edu-col">
        <div v-for="item in data.eduLeft" :key="item.label" class="edu-item">
          <div class="edu-pill">{{ item.label }}</div>
          <div class="edu-value">{{ item.value }}</div>
        </div>
      </div>

      <div class="ring-box">
        <div class="ring ring--outer"></div>
        <div class="ring ring--inner"></div>
        <div class="ring-text ring-text--main">学历分布</div>
        <div class="ring-text ring-text--sub">职业分布</div>
      </div>

      <div class="edu-col edu-col--right">
        <div v-for="item in data.eduRight" :key="item.label" class="edu-item">
          <div class="edu-pill">{{ item.label }}</div>
          <div class="edu-value">{{ item.value }}</div>
        </div>
      </div>
    </div>

    <div class="job-row">
      <div v-for="item in data.jobStats" :key="item.label" class="job-item">
        <div class="job-bubble">{{ item.rate }}</div>
        <div class="job-label">{{ item.label }}</div>
        <div class="job-count">{{ item.count }}</div>
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
  color: #ffe4a5;
  padding-top: 120px;
  box-sizing: border-box;
}

.title {
  margin: 0;
  position: absolute;
  left: 0;
  top: 110px;
  font-size: 38px;
  font-weight: 700;
  color: #ffefc8;
}

.gender-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
}

.gender-card {
  height: 80px;
  padding: 0 28px;
  border: 1px solid rgba(255, 192, 92, 0.24);
  background: rgba(255, 219, 164, 0.03);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.gender-label {
  font-size: 24px;
  color: #ffe4aa;
}

.gender-value {
  font-size: 42px;
  color: #fff1be;
}

.dist-wrap {
  margin-top: 34px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 38px;
}

.block-tag {
  width: 180px;
  height: 42px;
  margin: 0 auto 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #ffe7ac;
  background: linear-gradient(90deg, rgba(255, 196, 83, 0.28), rgba(255, 196, 83, 0.08));
}

.dist-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 20px;
}

.dist-item {
  min-height: 82px;
}

.dist-name {
  font-size: 18px;
  color: #ffe4ad;
}

.dist-value {
  margin-top: 8px;
  font-size: 24px;
  color: #ffcf77;
}

.middle-row {
  margin-top: 26px;
  display: grid;
  grid-template-columns: 1fr 720px 1fr;
  gap: 24px;
  align-items: center;
}

.edu-col {
  display: grid;
  gap: 18px;
}

.edu-col--right {
  text-align: right;
}

.edu-item {
  text-align: center;
}

.edu-pill {
  width: 180px;
  height: 42px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  background: rgba(255, 206, 119, 0.08);
  color: #ffe6aa;
  font-size: 18px;
}

.edu-value {
  margin-top: 10px;
  font-size: 24px;
  color: #ffcf77;
}

.ring-box {
  position: relative;
  height: 380px;
}

.ring {
  position: absolute;
  border-radius: 50%;
}

.ring--outer {
  left: 88px;
  top: 18px;
  width: 540px;
  height: 190px;
  border: 26px solid rgba(255, 159, 73, 0.88);
  border-top-color: rgba(255, 225, 188, 0.95);
  transform: rotate(8deg);
}

.ring--inner {
  left: 208px;
  top: 118px;
  width: 300px;
  height: 96px;
  border: 18px solid rgba(160, 70, 25, 0.82);
}

.ring-text {
  position: absolute;
  font-size: 28px;
  font-weight: 700;
  color: #fff0bd;
}

.ring-text--main {
  left: 288px;
  top: 116px;
}

.ring-text--sub {
  left: 278px;
  top: 246px;
}

.job-row {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
}

.job-item {
  text-align: center;
}

.job-bubble {
  width: 112px;
  height: 112px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(255, 210, 120, 0.42);
  background: radial-gradient(circle, rgba(255, 196, 91, 0.28), rgba(225, 73, 21, 0.72));
  color: #fff0c0;
  font-size: 26px;
  font-weight: 700;
}

.job-label {
  margin-top: 14px;
  font-size: 18px;
  color: #ffe2a6;
}

.job-count {
  margin-top: 8px;
  font-size: 22px;
  color: #ffcd72;
}
</style>
