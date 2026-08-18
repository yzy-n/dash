<template>
  <div class="left-wrap">
    <section class="panel panel--command">
      <div class="panel-title">指挥体系</div>
      <div class="command-tabs">
        <button type="button" class="command-tab command-tab--active">发布预警</button>
        <button type="button" class="command-tab">应急响应</button>
        <button type="button" class="command-tab">监测处置</button>
      </div>
      <div class="command-flow">
        <div class="command-layer command-layer--top">
          <div class="flow-node flow-node--left">
            <span class="flow-icon flow-icon--bell"></span>
            <div class="flow-text">
              <div class="flow-name">检测预警</div>
              <div class="flow-sub">应急预警响应</div>
            </div>
          </div>
          <div class="flow-node flow-node--mid">
            <span class="flow-icon flow-icon--cloud"></span>
            <div class="flow-text">
              <div class="flow-name">预警信息</div>
              <div class="flow-sub">发布预警指令</div>
            </div>
          </div>
          <div class="flow-node flow-node--right">
            <span class="flow-icon flow-icon--doc"></span>
            <div class="flow-text">
              <div class="flow-name">应急处置</div>
              <div class="flow-sub">协同联动处置</div>
            </div>
          </div>
        </div>
        <div class="command-layer command-layer--bottom">
          <div class="flow-pill flow-pill--a">市应急指挥中心</div>
          <div class="flow-pill flow-pill--b">应急救援队伍</div>
          <div class="flow-pill flow-pill--c">应急物资库</div>
          <div class="flow-pill flow-pill--d">社会力量</div>
          <div class="flow-pill flow-pill--e">医疗保障</div>
          <div class="flow-pill flow-pill--f">交通保障</div>
          <div class="flow-pill flow-pill--g">通信保障</div>
        </div>
      </div>
    </section>

    <section class="panel panel--rescue">
      <div class="panel-title">应急救援</div>
      <div class="rescue-grid">
        <div class="rescue-team">
          <div class="team-grid">
            <div class="team-panel">
              <div class="team-panel-head">
                <div class="team-panel-title">应急救援队伍</div>
              </div>
              <div class="team-stats">
                <div class="stat-row">
                  <span class="stat-icon stat-icon--a"></span>
                  <span class="stat-label">应急救援队伍</span>
                  <span class="stat-value">13</span>
                  <span class="stat-unit">个</span>
                </div>
                <div class="stat-row">
                  <span class="stat-icon stat-icon--b"></span>
                  <span class="stat-label">队伍总数</span>
                  <span class="stat-value">47</span>
                  <span class="stat-unit">支</span>
                </div>
                <div class="stat-row">
                  <span class="stat-icon stat-icon--c"></span>
                  <span class="stat-label">人员总数</span>
                  <span class="stat-value">3122</span>
                  <span class="stat-unit">人</span>
                </div>
              </div>
              <div class="team-tag">医疗卫生</div>
              <div class="team-list">
                <div class="team-row">鞍山市矿山救护大队</div>
                <div class="team-row">鞍山市红十字医疗救援队</div>
                <div class="team-row">鞍山市应急管理局综合救援队</div>
                <div class="team-row">鞍山市消防救援支队</div>
              </div>
            </div>

            <div class="team-panel">
              <div class="team-panel-head">
                <div class="team-panel-title">公益救援队伍</div>
              </div>
              <div class="team-stats">
                <div class="stat-row">
                  <span class="stat-icon stat-icon--a"></span>
                  <span class="stat-label">公益救援队伍</span>
                  <span class="stat-value">6</span>
                  <span class="stat-unit">个</span>
                </div>
                <div class="stat-row">
                  <span class="stat-icon stat-icon--b"></span>
                  <span class="stat-label">队伍总数</span>
                  <span class="stat-value">6</span>
                  <span class="stat-unit">支</span>
                </div>
                <div class="stat-row">
                  <span class="stat-icon stat-icon--c"></span>
                  <span class="stat-label">人员总数</span>
                  <span class="stat-value">110</span>
                  <span class="stat-unit">人</span>
                </div>
              </div>
              <div class="team-tag">医疗卫生</div>
              <div class="team-list">
                <div class="team-row">鞍山市红十字医疗救援队</div>
                <div class="team-row">鞍山市红十字救护救援队</div>
                <div class="team-row team-row--empty"></div>
                <div class="team-row team-row--empty"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="rescue-material">
          <div class="material-head">
            <div class="material-title">应急救援物资</div>
            <div class="material-tabs">
              <button type="button" class="material-tab material-tab--active">救灾物资</button>
              <button type="button" class="material-tab">医疗防疫物资</button>
            </div>
          </div>
          <div class="material-table">
            <div class="material-row material-row--head">
              <span>物资名称</span>
              <span class="material-row-qty">物资数量</span>
            </div>
            <div class="material-row">
              <span>救灾帐篷</span>
              <span class="material-row-qty"><strong>2</strong><em>顶</em></span>
            </div>
            <div class="material-row">
              <span>折叠床</span>
              <span class="material-row-qty"><strong>756</strong><em>张</em></span>
            </div>
            <div class="material-row">
              <span>棉被</span>
              <span class="material-row-qty"><strong>4</strong><em>套</em></span>
            </div>
            <div class="material-row">
              <span>棉褥</span>
              <span class="material-row-qty"><strong>5904</strong><em>条</em></span>
            </div>
            <div class="material-row">
              <span>棉裤</span>
              <span class="material-row-qty"><strong>4054</strong><em>条</em></span>
            </div>
            <div class="material-row">
              <span>毛巾被</span>
              <span class="material-row-qty"><strong>1940</strong><em>条</em></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="panel panel--places">
      <div class="panel-title">应急场所</div>
      <div class="places-body">
        <div class="places-map">
          <svg class="places-svg" viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M125 48 L168 35 L222 46 L254 30 L292 46 L322 82 L356 106 L390 146 L409 186 L386 218 L356 252 L332 288 L294 304 L262 330 L228 322 L200 300 L172 292 L142 260 L118 228 L96 200 L84 160 L96 126 L112 98 Z"
              fill="rgba(124,242,255,0.18)"
              stroke="rgba(124,242,255,0.65)"
              stroke-width="3"
            />
            <path
              d="M160 112 L196 96 L232 116 L260 98 L290 116 L316 150 L294 182 L268 208 L236 196 L210 170 L180 166 L150 140 Z"
              fill="rgba(0,160,255,0.12)"
              stroke="rgba(54,232,255,0.32)"
              stroke-width="2"
            />
          </svg>
          <div class="place-marker place-marker--a"><span></span></div>
          <div class="place-marker place-marker--b"><span></span></div>
          <div class="place-marker place-marker--c"><span></span></div>
          <div class="place-marker place-marker--d"><span></span></div>
          <div class="place-marker place-marker--e"><span></span></div>
          <div class="place-marker place-marker--f"><span></span></div>
          <div class="place-marker place-marker--g"><span></span></div>
          <div class="place-marker place-marker--h"><span></span></div>
          <div class="place-marker place-marker--i"><span></span></div>
          <div class="place-marker place-marker--j"><span></span></div>
          <div class="place-marker place-marker--k"><span></span></div>
          <div class="place-marker place-marker--l"><span></span></div>
        </div>
      </div>
    </section>

    <section class="panel panel--fund">
      <div class="panel-title">资金保障</div>
      <div class="fund-body">
        <div class="fund-split">
          <div class="fund-box">
            <div class="fund-box-title">收入</div>
            <div class="fund-box-chart">
              <EChart :option="fundIncomeOption" />
            </div>
          </div>
          <div class="fund-box">
            <div class="fund-box-title">支出</div>
            <div class="fund-box-chart">
              <EChart :option="fundExpenseOption" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from '@/components/echarts/EChart.vue'

type FundGraphNode = {
  id: string
  label: string
  valueText: string
  size: number
  color: string
}

type FundGraphLink = {
  source: string
  target: string
}

const buildFundGraphOption = (rootId: string, nodes: FundGraphNode[], links: FundGraphLink[]) => {
  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: false,
        silent: true,
        draggable: false,
        center: ['50%', '50%'],
        zoom: 1.2,
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [0, 12],
        force: {
          repulsion: 1600,
          edgeLength: 240,
          gravity: 0.06,
          layoutAnimation: false
        },
        data: nodes.map((item) => {
          const isRoot = item.id === rootId
          return {
            id: item.id,
            name: `${item.label}\n${item.valueText}`,
            symbol: 'circle',
            symbolSize: item.size,
            itemStyle: {
              color: {
                type: 'radial',
                x: 0.35,
                y: 0.35,
                r: 0.9,
                colorStops: [
                  { offset: 0, color: 'rgba(255, 255, 255, 0.08)' },
                  { offset: 1, color: 'rgba(6, 18, 48, 0.78)' }
                ]
              },
              borderColor: item.color,
              borderWidth: isRoot ? 3 : 2,
              shadowBlur: 22,
              shadowColor: 'rgba(54, 232, 255, 0.16)'
            },
            label: {
              show: true,
              position: 'inside',
              color: 'rgba(240, 251, 255, 0.96)',
              fontWeight: isRoot ? 900 : 800,
              fontSize: isRoot ? 26 : 20,
              lineHeight: isRoot ? 28 : 24
            }
          }
        }),
        links,
        lineStyle: {
          color: 'rgba(54, 232, 255, 0.38)',
          width: 3,
          curveness: 0.22
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: { width: 4 }
        }
      }
    ]
  }
}

const fundIncomeOption = computed(() => {
  const nodes: FundGraphNode[] = [
    { id: 't', label: '收入合计', valueText: '1057.62 万元', size: 140, color: '#36e8ff' },
    { id: 'b', label: '财政专项收入', valueText: '1057.62 万元', size: 96, color: '#ffbc40' },
    { id: 'b2', label: '公共预算收入', valueText: '0 万元', size: 90, color: '#7cf2ff' },
    { id: 'b3', label: '政府性基金收入', valueText: '0 万元', size: 90, color: '#79ffa8' }
  ]
  const links: FundGraphLink[] = [
    { source: 't', target: 'b' },
    { source: 't', target: 'b2' },
    { source: 't', target: 'b3' }
  ]
  return buildFundGraphOption('t', nodes, links)
})

const fundExpenseOption = computed(() => {
  const nodes: FundGraphNode[] = [
    { id: 't', label: '支出合计', valueText: '1093.30 万元', size: 140, color: '#36e8ff' },
    { id: 'a', label: '应急专项支出', valueText: '293.67 万元', size: 96, color: '#7cf2ff' },
    { id: 'd', label: '个人救助补贴', valueText: '25.84 万元', size: 90, color: '#79ffa8' },
    { id: 'e', label: '救灾物资采购', valueText: '106.28 万元', size: 90, color: '#8b5cff' },
    { id: 'f', label: '工程抢险支出', valueText: '961.18 万元', size: 96, color: '#39d5ff' }
  ]
  const links: FundGraphLink[] = [
    { source: 't', target: 'a' },
    { source: 't', target: 'd' },
    { source: 't', target: 'e' },
    { source: 't', target: 'f' }
  ]
  return buildFundGraphOption('t', nodes, links)
})
</script>

<style scoped>
.left-wrap {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 26px;
  box-sizing: border-box;
}

.panel {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 92px 28px 26px;
  /* background:
    linear-gradient(180deg, rgba(6, 27, 72, 0.6), rgba(4, 16, 44, 0.6)),
    url('@/assets/img/leftBg.png'); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  border: 1px solid rgba(84, 188, 255, 0.24);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  color: rgba(214, 238, 255, 0.86);
  box-sizing: border-box;
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

.panel--fund {
  display: flex;
  flex-direction: column;
}

.command-tabs {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 6px;
}

.command-tab {
  width: 180px;
  height: 54px;
  border-radius: 14px;
  border: 1px solid rgba(84, 188, 255, 0.18);
  background: rgba(6, 18, 48, 0.45);
  color: rgba(214, 238, 255, 0.7);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 2px;
  cursor: pointer;
}

.command-tab--active {
  color: rgba(240, 251, 255, 0.96);
  border-color: rgba(54, 232, 255, 0.4);
  background: radial-gradient(circle at 30% 30%, rgba(54, 232, 255, 0.22), rgba(6, 18, 48, 0.55));
  box-shadow:
    inset 0 0 18px rgba(54, 232, 255, 0.12),
    0 0 14px rgba(54, 232, 255, 0.12);
}

.command-flow {
  margin-top: 18px;
  height: calc(100% - 86px);
  position: relative;
}

.command-layer {
  position: absolute;
  left: 0;
  right: 0;
}

.command-layer--top {
  top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.command-layer--bottom {
  bottom: 14px;
  height: 120px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 48px;
  gap: 12px 14px;
  padding: 0 6px;
  box-sizing: border-box;
}

.flow-node {
  height: 118px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 16px;
  box-sizing: border-box;
}

.flow-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  border: 1px solid rgba(120, 220, 255, 0.25);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.22), rgba(6, 18, 48, 0.18));
  box-shadow: 0 0 16px rgba(45, 216, 255, 0.1);
}

.flow-text {
  min-width: 0;
  display: grid;
  gap: 8px;
}

.flow-name {
  font-size: 24px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  letter-spacing: 2px;
}

.flow-sub {
  font-size: 18px;
  color: rgba(214, 238, 255, 0.72);
}

.flow-pill {
  height: 48px;
  border-radius: 999px;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  color: rgba(214, 238, 255, 0.82);
  letter-spacing: 1px;
  box-sizing: border-box;
}

.rescue-grid {
  margin-top: 10px;
  height: calc(100% - 10px);
  min-height: 0;
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 18px;
}

.rescue-team,
.rescue-material {
  min-height: 0;
}

.team-grid {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.team-panel {
  min-height: 0;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.team-panel-head {
  height: 54px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(20, 30, 75, 0.55);
  border-bottom: 1px solid rgba(89, 194, 255, 0.12);
  box-sizing: border-box;
}

.team-panel-title {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  letter-spacing: 2px;
}

.team-stats {
  padding: 14px 16px 10px;
  display: grid;
  gap: 10px;
  box-sizing: border-box;
}

.stat-row {
  display: grid;
  grid-template-columns: 26px 1fr auto auto;
  gap: 10px;
  align-items: center;
  font-size: 18px;
  color: rgba(214, 238, 255, 0.78);
}

.stat-icon {
  width: 20px;
  height: 20px;
  border-radius: 999px;
  border: 1px solid rgba(120, 220, 255, 0.28);
  background: radial-gradient(circle, rgba(54, 232, 255, 0.28), rgba(6, 18, 48, 0.2));
  box-shadow: 0 0 10px rgba(54, 232, 255, 0.12);
}

.stat-value {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  text-shadow: 0 0 12px rgba(45, 216, 255, 0.16);
}

.stat-unit {
  color: rgba(214, 238, 255, 0.7);
}

.team-tag {
  width: 112px;
  height: 32px;
  margin: 2px auto 12px;
  border-radius: 999px;
  border: 1px solid rgba(54, 232, 255, 0.35);
  background: rgba(54, 232, 255, 0.12);
  color: rgba(240, 251, 255, 0.92);
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-list {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  border-top: 1px solid rgba(89, 194, 255, 0.12);
}

.team-row {
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 18px;
  color: rgba(214, 238, 255, 0.82);
  border-bottom: 1px solid rgba(89, 194, 255, 0.1);
  box-sizing: border-box;
}

.team-row--empty {
  opacity: 0;
}

.rescue-material {
  min-height: 0;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.material-head {
  height: 54px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(20, 30, 75, 0.55);
  border-bottom: 1px solid rgba(89, 194, 255, 0.12);
  box-sizing: border-box;
}

.material-title {
  font-size: 22px;
  font-weight: 900;
  color: rgba(240, 251, 255, 0.96);
  letter-spacing: 2px;
}

.material-tabs {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.material-tab {
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(84, 188, 255, 0.18);
  background: rgba(6, 18, 48, 0.32);
  color: rgba(214, 238, 255, 0.7);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.material-tab--active {
  border-color: rgba(54, 232, 255, 0.42);
  color: rgba(240, 251, 255, 0.96);
  background: rgba(54, 232, 255, 0.14);
}

.material-table {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: 56px repeat(6, 1fr);
}

.material-row {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid rgba(89, 194, 255, 0.1);
  color: rgba(214, 238, 255, 0.82);
  font-size: 18px;
  box-sizing: border-box;
}

.material-row--head {
  background: rgba(20, 30, 75, 0.45);
  color: rgba(234, 240, 255, 0.95);
  font-weight: 800;
}

.material-row-qty {
  justify-self: end;
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
}

.material-row-qty strong {
  font-size: 22px;
  font-weight: 900;
  color: rgba(124, 242, 255, 0.95);
}

.material-row-qty em {
  font-style: normal;
  color: rgba(214, 238, 255, 0.65);
}

.places-body {
  margin-top: 10px;
  height: calc(100% - 10px);
  display: grid;
}

.places-map {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  border-radius: 14px;
  overflow: hidden;
}

.places-svg {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 78%;
  height: 78%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 18px rgba(54, 232, 255, 0.12));
}

.place-marker {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background: rgba(54, 232, 255, 0.95);
  box-shadow: 0 0 16px rgba(54, 232, 255, 0.18);
}

.place-marker span {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  background: rgba(6, 18, 48, 0.85);
}

.place-marker--a {
  left: 40%;
  top: 26%;
}
.place-marker--b {
  left: 46%;
  top: 34%;
}
.place-marker--c {
  left: 52%;
  top: 38%;
}
.place-marker--d {
  left: 58%;
  top: 44%;
}
.place-marker--e {
  left: 62%;
  top: 52%;
}
.place-marker--f {
  left: 50%;
  top: 56%;
}
.place-marker--g {
  left: 44%;
  top: 50%;
}
.place-marker--h {
  left: 38%;
  top: 44%;
}
.place-marker--i {
  left: 34%;
  top: 54%;
}
.place-marker--j {
  left: 30%;
  top: 40%;
}
.place-marker--k {
  left: 56%;
  top: 30%;
}
.place-marker--l {
  left: 60%;
  top: 60%;
}

.fund-body {
  margin-top: 10px;
  flex: 1;
  min-height: 0;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.42);
  border-radius: 14px;
  overflow: hidden;
  padding: 14px;
  box-sizing: border-box;
  display: flex;
}

.fund-split {
  flex: 1;
  min-height: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.fund-box {
  min-height: 0;
  border: 1px solid rgba(89, 194, 255, 0.12);
  background: rgba(6, 18, 48, 0.36);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.fund-box-title {
  height: 46px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(240, 251, 255, 0.96);
  background: rgba(20, 30, 75, 0.42);
  border-bottom: 1px solid rgba(89, 194, 255, 0.12);
}

.fund-box-chart {
  flex: 1;
  min-height: 0;
}
</style>
