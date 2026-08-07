<template>
  <div class="right-wrap">
    <section class="panel panel--command">
      <div class="panel-title">应急指挥</div>
      <div class="command-grid">
        <div class="command-item">
          <div class="c-label">指挥席位</div>
          <div class="c-value">18</div>
        </div>
        <div class="command-item">
          <div class="c-label">在线队伍</div>
          <div class="c-value">86</div>
        </div>
        <div class="command-item">
          <div class="c-label">联动部门</div>
          <div class="c-value">24</div>
        </div>
      </div>
      <div class="command-line"></div>
      <div class="cmd-list">
        <div class="cmd-row">
          <span class="dot"></span>
          <span class="txt">发布暴雨橙色预警响应</span>
          <span class="time">09:05</span>
        </div>
        <div class="cmd-row">
          <span class="dot"></span>
          <span class="txt">转移低洼区群众 126 人</span>
          <span class="time">08:32</span>
        </div>
        <div class="cmd-row">
          <span class="dot"></span>
          <span class="txt">巡查地质灾害点 6 处</span>
          <span class="time">07:40</span>
        </div>
      </div>
    </section>

    <section class="panel panel--task">
      <div class="panel-title">任务派单</div>
      <div class="task-table">
        <div class="task-row task-row--head">
          <span>编号</span>
          <span>事项</span>
          <span>状态</span>
        </div>
        <div class="task-row">
          <span>01023</span>
          <span>沿河积水排险</span>
          <span class="st st--run">进行中</span>
        </div>
        <div class="task-row">
          <span>01018</span>
          <span>山区道路除冰</span>
          <span class="st st--run">进行中</span>
        </div>
        <div class="task-row">
          <span>01011</span>
          <span>老旧小区消防排查</span>
          <span class="st st--done">已完成</span>
        </div>
        <div class="task-row">
          <span>01005</span>
          <span>危化企业巡查</span>
          <span class="st st--done">已完成</span>
        </div>
        <div class="task-row">
          <span>00998</span>
          <span>避难场所开放检查</span>
          <span class="st st--run">进行中</span>
        </div>
      </div>
    </section>

    <section class="panel panel--rank">
      <div class="panel-title">风险排行</div>
      <div class="rank-box">
        <EChart :option="rankOption" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

const rankOption = computed(() => {
  const names = ['海城市', '岫岩县', '台安县', '铁东区', '铁西区', '立山区']
  const values = [36, 28, 21, 12, 10, 9]
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    grid: { left: 140, right: 26, top: 24, bottom: 22 },
    xAxis: {
      type: 'value',
      splitNumber: 4,
      axisLabel: { color: 'rgba(214, 238, 255, 0.6)', fontSize: 14 },
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(120, 220, 255, 0.12)' } }
    },
    yAxis: {
      type: 'category',
      data: names,
      axisLabel: { color: 'rgba(214, 238, 255, 0.86)', fontSize: 18 },
      axisTick: { show: false },
      axisLine: { show: false }
    },
    series: [
      {
        type: 'bar',
        data: values,
        barWidth: 18,
        itemStyle: {
          borderRadius: [0, 10, 10, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: 'rgba(150, 245, 255, 0.35)' },
              { offset: 1, color: 'rgba(0, 160, 255, 0.95)' }
            ]
          }
        },
        label: {
          show: true,
          position: 'right',
          color: 'rgba(240, 251, 255, 0.92)',
          fontSize: 16,
          fontWeight: 700
        }
      }
    ]
  }
})
</script>

<style scoped>
.right-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
  min-height: 0;
}

.panel {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 92px 28px 26px;
  background:
    linear-gradient(180deg, rgba(6, 27, 72, 0.6), rgba(4, 16, 44, 0.6)),
    url('@/assets/img/leftBg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  border: 1px solid rgba(84, 188, 255, 0.24);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  color: rgba(214, 238, 255, 0.86);
  box-sizing: border-box;
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
  position: absolute;
  left: 28px;
  top: 18px;
  height: 54px;
  display: inline-flex;
  align-items: center;
  font-size: 40px;
  font-style: italic;
  transform: skewX(-10deg);
  font-weight: 800;
  letter-spacing: 2px;
  color: #f8fbff;
  text-shadow:
    -2px -2px 3px rgba(255, 255, 255, 0.7),
    2px 2px 4px rgba(0, 20, 60, 0.5),
    0 0 6px #90c4ff,
    0 0 14px #3b8fff,
    0 0 24px #0f58d1;
}

.panel--command {
  height: 520px;
}

.panel--task {
  flex: 1;
}

.panel--rank {
  height: 520px;
}

.command-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.command-item {
  height: 140px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.58);
  border-radius: 14px;
  padding: 18px 18px 14px;
  box-sizing: border-box;
  display: grid;
  align-content: center;
  gap: 12px;
}

.c-label {
  font-size: 18px;
  color: rgba(214, 238, 255, 0.72);
}

.c-value {
  font-size: 44px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  text-shadow: 0 0 14px rgba(45, 216, 255, 0.2);
}

.command-line {
  margin-top: 18px;
  height: 1px;
  background: rgba(94, 197, 255, 0.16);
}

.cmd-list {
  margin-top: 18px;
  display: grid;
  gap: 14px;
}

.cmd-row {
  height: 62px;
  display: grid;
  grid-template-columns: 20px 1fr 110px;
  gap: 14px;
  align-items: center;
  padding: 0 16px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.46);
  border-radius: 12px;
  box-sizing: border-box;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(57, 213, 255, 0.85);
  box-shadow: 0 0 12px rgba(45, 216, 255, 0.22);
}

.txt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
}

.time {
  text-align: right;
  color: rgba(214, 238, 255, 0.72);
  font-size: 18px;
}

.task-table {
  margin-top: 10px;
  display: grid;
  gap: 12px;
}

.task-row {
  height: 64px;
  display: grid;
  grid-template-columns: 130px 1fr 120px;
  gap: 14px;
  align-items: center;
  padding: 0 16px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.58);
  border-radius: 12px;
  box-sizing: border-box;
  font-size: 20px;
}

.task-row span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-row--head {
  background: rgba(20, 30, 75, 0.55);
  color: rgba(234, 240, 255, 0.95);
  font-weight: 700;
}

.st {
  justify-self: end;
  font-weight: 800;
}

.st--run {
  color: rgba(255, 190, 94, 0.95);
  text-shadow: 0 0 10px rgba(255, 169, 60, 0.18);
}

.st--done {
  color: rgba(92, 255, 178, 0.95);
  text-shadow: 0 0 10px rgba(34, 255, 154, 0.16);
}

.rank-box {
  position: absolute;
  left: 10px;
  right: 10px;
  top: 86px;
  bottom: 18px;
}

.table-row.head {
  background: rgba(20, 30, 75, 0.55);
  color: rgba(234, 240, 255, 0.95);
  font-weight: 700;
}

.table-row.head .table-name,
.table-row.head .table-num {
  color: rgba(234, 240, 255, 0.95);
  text-shadow: none;
}

.table-row span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-name {
  text-align: left;
  padding-left: 18px;
}

.table-num {
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.table-num--cyan {
  color: rgba(124, 242, 255, 0.95);
  text-shadow: 0 0 10px rgba(45, 216, 255, 0.22);
}

.table-num--orange {
  color: rgba(255, 190, 94, 0.95);
  text-shadow: 0 0 10px rgba(255, 169, 60, 0.18);
}

.table-num--green {
  color: rgba(92, 255, 178, 0.95);
  text-shadow: 0 0 10px rgba(34, 255, 154, 0.16);
}

.table-num--red {
  color: rgba(255, 120, 120, 0.95);
  text-shadow: 0 0 10px rgba(255, 70, 90, 0.18);
}

.table--appeal .table-row {
  grid-template-columns: 1fr 2.2fr 1.2fr 0.9fr;
}

.table--3 .table-row {
  grid-template-columns: 0.6fr 1fr 1.6fr;
}
</style>
