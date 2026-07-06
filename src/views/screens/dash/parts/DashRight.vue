<script setup lang="ts">
import CaseCountChart from '../charts/CaseCountChart.vue'
import CaseRingChart from '../charts/CaseRingChart.vue'
import CategoryProgressChart from '../charts/CategoryProgressChart.vue'
import ComponentDistributionChart from '../charts/ComponentDistributionChart.vue'

const gridInfoRows = [
  { name: '海城市', town: 26, village: 422, grid: 1415 },
  { name: '台安县', town: 12, village: 174, grid: 1658 },
  { name: '岫岩县', town: 24, village: 204, grid: 739 },
  { name: '铁东区', town: 14, village: 107, grid: 128 },
  { name: '铁西区', town: 8, village: 63, grid: 105 },
  { name: '立山区', town: 7, village: 89, grid: 254 }
]

const appealEvents = [
  { date: '2023-05-25', name: '海城市花园小区——噪音扰民', result: '已办结', score: '满意' },
  { date: '2023-05-24', name: '台安县南河街道——占道经营', result: '已办结', score: '满意' },
  { date: '2023-05-24', name: '铁西区教育街——路面破损', result: '办理中', score: '不满意' },
  { date: '2023-05-23', name: '高新区万科广场——垃圾堆放', result: '已办结', score: '满意' },
  { date: '2023-05-22', name: '岫岩县东门路段——井盖缺失', result: '办理中', score: '满意' }
]
</script>

<template>
  <aside class="right">
    <div class="right-top">
      <div class="panel">
        <div class="panel-title">网格信息</div>
        <div class="table">
          <div class="table-row head">
            <span>名称</span>
            <span>乡镇(街道)数</span>
            <span>村居(社区)数</span>
            <span>网格数</span>
          </div>
          <div class="table-row" v-for="row in gridInfoRows" :key="row.name">
            <span>{{ row.name }}</span>
            <span>{{ row.town }}</span>
            <span>{{ row.village }}</span>
            <span class="num">{{ row.grid }}</span>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">部件分布</div>
        <div class="panel-chart"><ComponentDistributionChart /></div>
      </div>

      <div class="panel">
        <div class="panel-title">案件数量</div>
        <div class="panel-chart"><CaseCountChart /></div>
      </div>
    </div>

    <div class="right-bottom">
      <div class="panel">
        <div class="panel-title">诉求事件</div>
        <div class="table">
          <div class="table-row head">
            <span>时间</span>
            <span>事项名称</span>
            <span>办理部门</span>
            <span>办理评价</span>
          </div>
          <div class="table-row" v-for="row in appealEvents" :key="row.name">
            <span>{{ row.date }}</span>
            <span class="ellipsis">{{ row.name }}</span>
            <span>{{ row.result }}</span>
            <span>{{ row.score }}</span>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">部件类别</div>
        <div class="panel-chart"><CategoryProgressChart /></div>
      </div>

      <div class="panel">
        <div class="panel-title">上报数</div>
        <div class="panel-chart"><CaseRingChart /></div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.right {
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.panel {
  position: relative;
  border: 1px solid rgba(84, 188, 255, 0.24);
  background: linear-gradient(180deg, rgba(6, 27, 72, 0.72), rgba(4, 16, 44, 0.72));
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  overflow: hidden;
  border-radius: 18px;
  padding: 26px 28px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}

.panel-title {
  height: 42px;
  display: inline-flex;
  align-items: center;
  font-size: 40px;
  line-height: 2px;
  margin-top: -15px;
  margin-left: 30px;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', sans-serif;
  font-style: italic;
  transform: skewX(-10deg);
  font-weight: bold;
  letter-spacing: 2px;
  color: #f8fbff;
  text-shadow:
    -2px -2px 3px rgba(255, 255, 255, 0.7),
    2px 2px 4px rgba(0, 20, 60, 0.5),
    0 0 6px #90c4ff,
    0 0 14px #3b8fff,
    0 0 24px #0f58d1;
}

.panel-chart {
  flex: 1;
  min-height: 0;
}

.right-top {
  height: 820px;
  display: grid;
  grid-template-columns: 1.1fr 1fr 1fr;
  gap: 26px;
}

.right-bottom {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1.35fr 1fr 0.9fr;
  gap: 26px;
}

.table {
  flex: 1;
  min-height: 0;
  display: grid;
  gap: 12px;
  font-size: 16px;
  color: rgba(214, 238, 255, 0.84);
}

.table-row {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 1.2fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: rgba(6, 18, 48, 0.58);
  border: 1px solid rgba(89, 194, 255, 0.12);
}

.table-row.head {
  background: rgba(20, 30, 75, 0.55);
  color: rgba(234, 240, 255, 0.95);
  font-weight: 700;
}

.table-row span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-row .num {
  color: #36e8ff;
  font-weight: 700;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
