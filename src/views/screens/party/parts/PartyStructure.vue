<template>
  <div class="structure-wrap">
    <h3 class="title">{{ data.title }}</h3>

    <div class="gender-row">
      <div class="gender-card">
        <span class="gender-label">{{ data.genderStats?.[0]?.label || '' }}</span>
        <strong class="gender-value">{{ data.genderStats?.[0]?.value || '' }}</strong>
      </div>
      <div class="gender-card">
        <span class="gender-label">{{ data.genderStats?.[1]?.label || '' }}</span>
        <strong class="gender-value">{{ data.genderStats?.[1]?.value || '' }}</strong>
      </div>
    </div>
    <div class="title2">学历分布</div>
    <div class="title3">职业分布</div>
    <div class="dist-wrap">
      <section class="dist-block dist-block--age">
        <div class="block-tag">年龄分布</div>
        <div class="dist-grid">
          <div class="dist-item">
            <div class="dist-name">{{ data.ageStats?.[0]?.label || '' }}</div>
            <div class="dist-value">{{ data.ageStats?.[0]?.value || '' }}</div>
          </div>
          <div class="dist-item">
            <div class="dist-name">{{ data.ageStats?.[1]?.label || '' }}</div>
            <div class="dist-value">{{ data.ageStats?.[1]?.value || '' }}</div>
          </div>
          <div class="dist-item">
            <div class="dist-name">{{ data.ageStats?.[2]?.label || '' }}</div>
            <div class="dist-value">{{ data.ageStats?.[2]?.value || '' }}</div>
          </div>
          <div class="dist-item">
            <div class="dist-name">{{ data.ageStats?.[3]?.label || '' }}</div>
            <div class="dist-value">{{ data.ageStats?.[3]?.value || '' }}</div>
          </div>
        </div>
      </section>

      <section class="dist-block dist-block--join">
        <div class="block-tag2">入党时间分布</div>
        <div class="dist-grid">
          <div class="dist-item">
            <div class="dist-name">{{ data.joinStats?.[0]?.label || '' }}</div>
            <div class="dist-value">{{ data.joinStats?.[0]?.value || '' }}</div>
          </div>
          <div class="dist-item">
            <div class="dist-name">{{ data.joinStats?.[1]?.label || '' }}</div>
            <div class="dist-value">{{ data.joinStats?.[1]?.value || '' }}</div>
          </div>
          <div class="dist-item">
            <div class="dist-name">{{ data.joinStats?.[2]?.label || '' }}</div>
            <div class="dist-value">{{ data.joinStats?.[2]?.value || '' }}</div>
          </div>
          <div class="dist-item">
            <div class="dist-name">{{ data.joinStats?.[3]?.label || '' }}</div>
            <div class="dist-value">{{ data.joinStats?.[3]?.value || '' }}</div>
          </div>
        </div>
      </section>
    </div>

    <div class="middle-row">
      <div class="edu-col edu-col--left">
        <div class="edu-item">
          <div class="edu-pill">{{ data.eduLeft?.[0]?.label || '' }}</div>
          <div class="edu-value">{{ data.eduLeft?.[0]?.value || '' }}</div>
        </div>
        <div class="edu-item">
          <div class="edu-pill">{{ data.eduLeft?.[1]?.label || '' }}</div>
          <div class="edu-value">{{ data.eduLeft?.[1]?.value || '' }}</div>
        </div>
      </div>

      <div class="edu-col edu-col--right">
        <div class="edu-item">
          <div class="edu-pill">
            {{ data.eduRight?.[0]?.label || data.eduLeft?.[2]?.label || '' }}
          </div>
          <div class="edu-value">
            {{ data.eduRight?.[0]?.value || data.eduLeft?.[2]?.value || '' }}
          </div>
        </div>
        <div class="edu-item">
          <div class="edu-pill">
            {{ data.eduRight?.[1]?.label || data.eduLeft?.[3]?.label || '' }}
          </div>
          <div class="edu-value">
            {{ data.eduRight?.[1]?.value || data.eduLeft?.[3]?.value || '' }}
          </div>
        </div>
      </div>
    </div>

    <div class="job-row">
      <div class="job-item">
        <div class="job-bubble">{{ data.jobStats?.[0]?.rate || '' }}</div>
        <div class="job-label">{{ data.jobStats?.[0]?.label || '' }}</div>
        <div class="job-count">{{ data.jobStats?.[0]?.count || '' }}</div>
      </div>
      <div class="job-item">
        <div class="job-bubble">{{ data.jobStats?.[1]?.rate || '' }}</div>
        <div class="job-label">{{ data.jobStats?.[1]?.label || '' }}</div>
        <div class="job-count">{{ data.jobStats?.[1]?.count || '' }}</div>
      </div>
      <div class="job-item">
        <div class="job-bubble">{{ data.jobStats?.[2]?.rate || '' }}</div>
        <div class="job-label">{{ data.jobStats?.[2]?.label || '' }}</div>
        <div class="job-count">{{ data.jobStats?.[2]?.count || '' }}</div>
      </div>
      <div class="job-item">
        <div class="job-bubble">{{ data.jobStats?.[3]?.rate || '' }}</div>
        <div class="job-label">{{ data.jobStats?.[3]?.label || '' }}</div>
        <div class="job-count">{{ data.jobStats?.[3]?.count || '' }}</div>
      </div>
      <div class="job-item">
        <div class="job-bubble">{{ data.jobStats?.[4]?.rate || '' }}</div>
        <div class="job-label">{{ data.jobStats?.[4]?.label || '' }}</div>
        <div class="job-count">{{ data.jobStats?.[4]?.count || '' }}</div>
      </div>
      <div class="job-item">
        <div class="job-bubble">{{ data.jobStats?.[5]?.rate || '' }}</div>
        <div class="job-label">{{ data.jobStats?.[5]?.label || '' }}</div>
        <div class="job-count">{{ data.jobStats?.[5]?.count || '' }}</div>
      </div>
      <div class="job-item">
        <div class="job-bubble">{{ data.jobStats?.[6]?.rate || '' }}</div>
        <div class="job-label">{{ data.jobStats?.[6]?.label || '' }}</div>
        <div class="job-count">{{ data.jobStats?.[6]?.count || '' }}</div>
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
  height: 100%;
}

.dist-block--age {
  left: 0;
}

.dist-block--join {
  right: 0;
}

.block-tag {
  position: absolute;
  top: 180px;
  left: 700px;
  font-size: 50px;
}
.block-tag2 {
  width: 390px;
  position: absolute;
  left: 580px;
  top: 180px;
  text-align: center;
  font-size: 50px;
  color: #ffe7ac;
}

.dist-grid {
  position: relative;
  height: 260px;
  margin-top: 68px;
  margin-left: 0;
}

.dist-item {
  position: absolute;
  width: 720px;
  padding-left: 70px;
  box-sizing: border-box;
}

.dist-block--age .dist-item:nth-child(1) {
  left: 180px;
  top: 370px;
}

.dist-block--age .dist-item:nth-child(2) {
  left: 940px;
  top: 370px;
}

.dist-block--age .dist-item:nth-child(3) {
  left: 180px;
  top: 690px;
}

.dist-block--age .dist-item:nth-child(4) {
  left: 940px;
  top: 690px;
}

.dist-block--join .dist-item:nth-child(1) {
  left: 200px;
  top: 370px;
}

.dist-block--join .dist-item:nth-child(2) {
  left: 960px;
  top: 370px;
}

.dist-block--join .dist-item:nth-child(3) {
  left: 200px;
  top: 690px;
}

.dist-block--join .dist-item:nth-child(4) {
  left: 960px;
  top: 690px;
}

.dist-name {
  font-size: 40px;
  color: #ffe4ad;
  line-height: 1.2;
}

.dist-value {
  margin-top: 8px;
  font-size: 40px;
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
  height: 120px;
}

.edu-col--left .edu-item:nth-child(1) {
  left: 50px;
  top: 900px;
}

.edu-col--left .edu-item:nth-child(2) {
  left: 50px;
  top: 600px;
}

.edu-col--right .edu-item:nth-child(1) {
  left: -40px;
  top: 600px;
}

.edu-col--right .edu-item:nth-child(2) {
  left: -45px;
  top: 900px;
}

.edu-pill {
  width: 240px;
  height: 42px;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  text-align: center;
  line-height: 42px;
  border-radius: 22px;
  color: #ffe6aa;
  font-size: 48px;
}

.edu-value {
  position: absolute;
  left: 27%;
  top: 160px;
  font-size: 40px;
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
  top: 2400px;
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
  top: 140px;
}

.job-item:nth-child(3) {
  left: 1440px;
  top: 230px;
}

.job-item:nth-child(4) {
  left: 1900px;
  top: 320px;
}

.job-item:nth-child(5) {
  left: 2360px;
  top: 230px;
}

.job-item:nth-child(6) {
  left: 2820px;
  top: 140px;
}

.job-item:nth-child(7) {
  left: 3280px;
  top: 0;
}

.job-bubble {
  width: 192px;
  height: 192px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(255, 210, 120, 0.42);
  background: radial-gradient(circle, rgba(255, 196, 91, 0.28), rgba(225, 73, 21, 0.72));
  color: #fff0c0;
  font-size: 36px;
  font-weight: 700;
}

.job-label {
  margin-top: 14px;
  font-size: 28px;
  color: #ffe2a6;
}

.job-count {
  margin-top: 8px;
  font-size: 32px;
  color: #ffcd72;
}
.title2 {
  position: absolute;
  top: 1850px;
  left: 1840px;
  width: 460px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 86px;
  font-weight: 800;
  color: rgba(255, 238, 206, 0.98);
  letter-spacing: 20px;
  font-style: italic;
  box-shadow:
    inset 0 0 0 1px rgba(255, 230, 172, 0.08),
    0 0 16px rgba(255, 92, 32, 0.12);
}
.title3 {
  position: absolute;
  top: 2400px;
  left: 1840px;
  width: 460px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 86px;
  font-weight: 800;
  color: rgba(255, 238, 206, 0.98);
  letter-spacing: 20px;
  font-style: italic;
  box-shadow:
    inset 0 0 0 1px rgba(255, 230, 172, 0.08),
    0 0 16px rgba(255, 92, 32, 0.12);
}
</style>
