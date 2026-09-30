<template>
  <div class="structure-wrap">
    <h3 class="title">{{ data.title }}</h3>

    <div class="gender-row">
      <div class="gender-card">
        <span class="gender-label">{{ genderStats[0]?.label || '' }}</span>
        <strong class="gender-value">{{ genderStats[0]?.value || '' }}</strong>
      </div>
      <div class="gender-card">
        <span class="gender-label">{{ genderStats[1]?.label || '' }}</span>
        <strong class="gender-value">{{ genderStats[1]?.value || '' }}</strong>
      </div>
    </div>
    <div class="title2">学历分布</div>
    <div class="title3">职业分布</div>
    <div class="dist-wrap">
      <section class="dist-block dist-block--age">
        <div class="block-tag">年龄分布</div>
        <div class="dist-grid">
          <div class="dist-item">
            <div class="dist-name">{{ ageStats[0]?.label || '' }}</div>
            <div class="dist-value">{{ ageStats[0]?.value || '' }}</div>
          </div>
          <div class="dist-item">
            <div class="dist-name">{{ ageStats[1]?.label || '' }}</div>
            <div class="dist-value">{{ ageStats[1]?.value || '' }}</div>
          </div>
          <div class="dist-item">
            <div class="dist-name">{{ ageStats[2]?.label || '' }}</div>
            <div class="dist-value">{{ ageStats[2]?.value || '' }}</div>
          </div>
          <div class="dist-item">
            <div class="dist-name">{{ ageStats[3]?.label || '' }}</div>
            <div class="dist-value">{{ ageStats[3]?.value || '' }}</div>
          </div>
        </div>
      </section>

      <section class="dist-block dist-block--join">
        <div class="block-tag2">入党时间分布</div>
        <div class="dist-grid">
          <div class="dist-item">
            <div class="dist-name">{{ joinStats[0]?.label || '' }}</div>
            <div class="dist-value">{{ joinStats[0]?.value || '' }}</div>
          </div>
          <div class="dist-item">
            <div class="dist-name">{{ joinStats[1]?.label || '' }}</div>
            <div class="dist-value">{{ joinStats[1]?.value || '' }}</div>
          </div>
          <div class="dist-item">
            <div class="dist-name">{{ joinStats[2]?.label || '' }}</div>
            <div class="dist-value">{{ joinStats[2]?.value || '' }}</div>
          </div>
          <div class="dist-item">
            <div class="dist-name">{{ joinStats[3]?.label || '' }}</div>
            <div class="dist-value">{{ joinStats[3]?.value || '' }}</div>
          </div>
        </div>
      </section>
    </div>

    <div class="middle-row">
      <div class="edu-col edu-col--left">
        <div class="edu-item">
          <div class="edu-pill">{{ eduStats[0]?.label || '' }}</div>
          <div class="edu-value">{{ eduStats[0]?.value || '' }}</div>
        </div>
        <div class="edu-item">
          <div class="edu-pill">{{ eduStats[1]?.label || '' }}</div>
          <div class="edu-value">{{ eduStats[1]?.value || '' }}</div>
        </div>
      </div>

      <div class="edu-col edu-col--right">
        <div class="edu-item">
          <div class="edu-pill">{{ eduStats[2]?.label || '' }}</div>
          <div class="edu-value">{{ eduStats[2]?.value || '' }}</div>
        </div>
        <div class="edu-item">
          <div class="edu-pill">{{ eduStats[3]?.label || '' }}</div>
          <div class="edu-value">{{ eduStats[3]?.value || '' }}</div>
        </div>
      </div>
    </div>

    <div class="job-row">
      <div v-for="(item, index) in jobStats" :key="`${item.label}-${index}`" class="job-item">
        <div class="job-bubble">{{ item.rate }}</div>
        <div class="job-label">{{ item.label }}</div>
        <div class="job-count">{{ item.count }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { PartyStructureData } from '../data'
import { getMemberSex, getMemberAge, getRecruitPartyMembers, getMemberTrade } from '@/api/party'

const props = defineProps<{
  data: PartyStructureData
}>()

/** 兼容多种解包层级：datalist / dataList / res.data.* */
const pickList = (res: any): any[] => {
  const body = res?.data ?? res
  if (Array.isArray(body?.datalist)) return body.datalist
  if (Array.isArray(body?.dataList)) return body.dataList
  if (Array.isArray(body?.data?.datalist)) return body.data.datalist
  if (Array.isArray(body?.data?.dataList)) return body.data.dataList
  return []
}

/* =========================================================
   1. 性别比例（接口驱动）
   ========================================================= */

type GenderRaw = {
  sex: string
  name: string
  num: number
}

const genderRaw = ref<GenderRaw[]>([])

const genderStats = computed(() => {
  const list = genderRaw.value
  const total = list.reduce((s, it) => s + (Number(it.num) || 0), 0)

  return list.map((it) => ({
    label: it.name,
    value: total > 0 ? `${((it.num / total) * 100).toFixed(2)}%` : '0%'
  }))
})

const fetchGender = async () => {
  try {
    const res: any = await getMemberSex()
    console.log('[membersex] res=', res)

    const list = pickList(res)
    genderRaw.value = list
      .map((it: any) => ({
        sex: String(it?.sex ?? ''),
        name: String(it?.name ?? ''),
        num: Number(it?.num ?? 0)
      }))
      .sort((a, b) => Number(a.sex) - Number(b.sex))
  } catch (e) {
    console.error('性别比例查询失败', e)
    genderRaw.value = []
  }
}

/* =========================================================
   2. 年龄 / 入党时间分布（接口驱动）
   ========================================================= */

type MemberAgeRaw = {
  nameType: string
  name: string
  num: number
}

const ageRaw = ref<MemberAgeRaw[]>([])
const joinRaw = ref<MemberAgeRaw[]>([])

const buildStats = (rows: MemberAgeRaw[]) => {
  const total = rows.reduce((s, it) => s + (Number(it.num) || 0), 0)
  return rows.map((it) => {
    const num = Number(it.num) || 0
    const pct = total > 0 ? ((num / total) * 100).toFixed(2) : '0.00'
    return {
      label: it.name,
      value: `${num}名 / ${pct}%`
    }
  })
}

const ageStats = computed(() => buildStats(ageRaw.value))
const joinStats = computed(() => buildStats(joinRaw.value))

const normalizeAgeList = (list: any[]): MemberAgeRaw[] =>
  list
    .map((it: any) => ({
      nameType: String(it?.nameType ?? ''),
      name: String(it?.name ?? ''),
      num: Number(it?.num ?? 0)
    }))
    .sort((a, b) => Number(a.nameType) - Number(b.nameType))

const fetchAge = async () => {
  try {
    const res: any = await getMemberAge('1')
    console.log('[memberage] type=1 res=', res)
    ageRaw.value = normalizeAgeList(pickList(res))
  } catch (e) {
    console.error('党员年龄查询失败', e)
    ageRaw.value = []
  }
}

const fetchJoin = async () => {
  try {
    const res: any = await getMemberAge('2')
    console.log('[memberage] type=2 res=', res)
    joinRaw.value = normalizeAgeList(pickList(res))
  } catch (e) {
    console.error('入党时间查询失败', e)
    joinRaw.value = []
  }
}

/* =========================================================
   3. 学历分布（接口驱动）
   ========================================================= */

type EduRow = {
  label: string
  value: string
}

const eduStats = ref<EduRow[]>([])

const fetchEdu = async () => {
  try {
    const res: any = await getRecruitPartyMembers('2')
    console.log('[recruitpartymembers] type=2 res=', res)

    const list = pickList(res)
    eduStats.value = list.map((it: any) => {
      const num = Number(it?.value ?? 0)
      const rate = String(it?.rate ?? '')
      return {
        label: String(it?.label ?? ''),
        value: `${num}名 / ${rate}`
      }
    })
  } catch (e) {
    console.error('学历分布查询失败', e)
    eduStats.value = []
  }
}

/* =========================================================
   4. 职业分布（接口驱动）
   - 接口返回 { induName, name, num }
   - 前端计算 rate，并拼 count
   - rate: num / 总数 * 100
   - count: `${num}名`
   ========================================================= */

type JobRaw = {
  induName: string
  name: string
  num: number
}

type JobRow = {
  rate: string
  label: string
  count: string
}

const jobRaw = ref<JobRaw[]>([])

const jobStats = computed<JobRow[]>(() => {
  const list = jobRaw.value
  const total = list.reduce((s, it) => s + (Number(it.num) || 0), 0)
  return list.map((it) => {
    const num = Number(it.num) || 0
    const pct = total > 0 ? ((num / total) * 100).toFixed(2) : '0.00'
    return {
      rate: `${pct}%`,
      label: it.name,
      count: `${num}名`
    }
  })
})

const fetchJob = async () => {
  try {
    const res: any = await getMemberTrade()
    console.log('[membertrade] res=', res)

    const list = pickList(res)
    jobRaw.value = list
      .map((it: any) => ({
        induName: String(it?.induName ?? ''),
        name: String(it?.name ?? ''),
        num: Number(it?.num ?? 0)
      }))
      // 按 induName 升序，保证 1→2→3→... 的显示顺序稳定
      .sort((a, b) => Number(a.induName) - Number(b.induName))
  } catch (e) {
    console.error('职业分布查询失败', e)
    jobRaw.value = []
  }
}

onMounted(() => {
  fetchGender()
  fetchAge()
  fetchJoin()
  fetchEdu()
  fetchJob()
})
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
