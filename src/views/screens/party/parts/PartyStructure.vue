<template>
  <div class="structure-wrap">
    <h3 class="title">{{ data.title }}</h3>

    <div class="gender-row">
      <div v-for="item in data.genderStats" :key="item.label" class="gender-card">
        <span class="gender-label">{{ item.label }}</span>
        <strong class="gender-value">{{ item.value }}</strong>
      </div>
    </div>

    <div class="dist-wrap">
      <section class="dist-block dist-block--age">
        <div class="block-tag">年龄分布</div>
        <div class="dist-grid">
          <div v-for="item in data.ageStats" :key="item.label" class="dist-item">
            <div class="dist-name">{{ item.label }}</div>
            <div class="dist-value">{{ item.value }}</div>
          </div>
        </div>
      </section>

      <section class="dist-block dist-block--join">
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
      <div class="edu-col edu-col--left">
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
import type { PartyStructureData } from '../data'

defineProps<{
  data: PartyStructureData
}>()
</script>

<style scoped>
.structure-wrap {
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
  left: 450px;
  top: 310px;
  font-size: 44px;
  font-weight: 700;
  color: #ffefc8;
}

.gender-row {
  display: grid;
  grid-template-columns: 900px 900px;
  column-gap: 900px;
  justify-content: center;
}

.gender-card {
  height: 80px;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 450px;
}

.gender-label {
  font-size: 40px;
  color: #ffe4aa;
}

.gender-value {
  font-size: 42px;
  color: #fff1be;
}

.dist-wrap {
  position: absolute;
  left: 360px;
  top: 650px;
  width: 3360px;
  height: 460px;
}

.dist-block {
  position: absolute;
  top: 0;
  width: 1520px;
}

.dist-block--age {
  left: 0;
}

.dist-block--join {
  right: 0;
}

.block-tag {
  width: 240px;
  height: 42px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #ffe7ac;
  background: linear-gradient(90deg, rgba(255, 196, 83, 0.28), rgba(255, 196, 83, 0.08));
}

.dist-grid {
  position: relative;
  height: 360px;
  margin-top: 26px;
}

.dist-item {
  position: absolute;
  width: 760px;
}

.dist-block--age .dist-item:nth-child(1) {
  left: 0;
  top: 0;
}

.dist-block--age .dist-item:nth-child(2) {
  left: 760px;
  top: 0;
}

.dist-block--age .dist-item:nth-child(3) {
  left: 0;
  top: 128px;
}

.dist-block--age .dist-item:nth-child(4) {
  left: 760px;
  top: 128px;
}

.dist-block--join .dist-item:nth-child(1) {
  left: 0;
  top: 0;
}

.dist-block--join .dist-item:nth-child(2) {
  left: 760px;
  top: 0;
}

.dist-block--join .dist-item:nth-child(3) {
  left: 0;
  top: 128px;
}

.dist-block--join .dist-item:nth-child(4) {
  left: 760px;
  top: 128px;
}

.dist-name {
  font-size: 24px;
  color: #ffe4ad;
}

.dist-value {
  margin-top: 10px;
  font-size: 28px;
  color: #ffcf77;
}

.middle-row {
  position: absolute;
  left: 360px;
  top: 1120px;
  width: 3360px;
  height: 520px;
}

.edu-col {
  position: absolute;
  top: 0;
  width: 720px;
}

.edu-col--left {
  left: 0;
}

.edu-col--right {
  right: 0;
  text-align: right;
}

.edu-item {
  position: absolute;
  width: 720px;
  text-align: center;
}

.edu-col--left .edu-item:nth-child(1) {
  left: 0;
  top: 0;
}

.edu-col--left .edu-item:nth-child(2) {
  left: 0;
  top: 132px;
}

.edu-col--right .edu-item:nth-child(1) {
  left: 0;
  top: 0;
}

.edu-col--right .edu-item:nth-child(2) {
  left: 0;
  top: 132px;
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
  position: absolute;
  left: 50%;
  top: -80px;
  transform: translateX(-50%);
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
  position: absolute;
  left: 0;
  right: 0;
  top: 1700px;
  height: 360px;
}

.job-item {
  position: absolute;
  text-align: center;
}

.job-item:nth-child(1) {
  left: 520px;
  top: 0;
}

.job-item:nth-child(2) {
  left: 980px;
  top: 40px;
}

.job-item:nth-child(3) {
  left: 1440px;
  top: 52px;
}

.job-item:nth-child(4) {
  left: 1900px;
  top: 40px;
}

.job-item:nth-child(5) {
  left: 2360px;
  top: 52px;
}

.job-item:nth-child(6) {
  left: 2820px;
  top: 40px;
}

.job-item:nth-child(7) {
  left: 3280px;
  top: 0;
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
