<script setup lang="ts">
import Passenger3DBar from '../charts/Passenger3DBar.vue'
import LineChart from '../charts/line.vue'
import TaxiPassengerLine from '../charts/TaxiPassengerLine.vue'
import PyramidFunnelChart from '../charts/PyramidFunnelChart.vue'
import CargoMixChart from '../charts/CargoMixChart.vue'
import VehicleInfoBar from '../charts/VehicleInfoBar.vue'
import { computed, ref } from 'vue'
import type { BusScreenData } from '../types'

const passengerTab = ref<'ratio' | 'plan'>('ratio')
const cargoTab = ref<'ratio' | 'plan'>('ratio')

const props = defineProps<{
  data: BusScreenData
}>()

const currentPassengerShipSeries = computed(() =>
  passengerTab.value === 'plan'
    ? props.data.passengerShipSeries.type2
    : props.data.passengerShipSeries.type1
)

const currentGoodsShipSeries = computed(() =>
  cargoTab.value === 'plan' ? props.data.goodsShipSeries.type2 : props.data.goodsShipSeries.type1
)
</script>

<template>
  <aside class="left">
    <div class="col">
      <div class="panel">
        <div class="panel-title">公共交通</div>
        <div class="panel-chart">
          <Passenger3DBar
            :x-data="data.publicTransportXAxis"
            :passenger-data="data.publicTransportPassengerData"
            :taxi-num-data="data.publicTransportTaxiNumData"
          />
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">出租车</div>
        <div class="panel-chart">
          <LineChart />
        </div>
      </div>
    </div>
    <div class="col col-left">
      <div class="panel panel--full">
        <div class="section">
          <div class="panel-head">
            <div class="panel-title">长途客运</div>
          </div>
          <div class="tabs">
            <button
              class="tab"
              :class="{ 'tab--active': passengerTab === 'ratio' }"
              @click="passengerTab = 'ratio'"
            >
              客运量
            </button>
            <button
              class="tab"
              :class="{ 'tab--active': passengerTab === 'plan' }"
              @click="passengerTab = 'plan'"
            >
              旅客周转量
            </button>
          </div>
          <div class="panel-chart">
            <TaxiPassengerLine
              :x-data="currentPassengerShipSeries.xData"
              :province-num-data="currentPassengerShipSeries.provinceNumData"
              :province-growth-data="currentPassengerShipSeries.provinceGrowthData"
              :city-num-data="currentPassengerShipSeries.cityNumData"
              :city-growth-data="currentPassengerShipSeries.cityGrowthData"
              :num-unit="passengerTab === 'plan' ? '万人公里' : '万人'"
            />
          </div>
        </div>

        <div class="section section--bottom">
          <div class="panel-chart"><PyramidFunnelChart /></div>
        </div>
      </div>
    </div>

    <div class="col">
      <div class="panel">
        <div class="panel-title">货物运输</div>
        <div class="tabs">
          <button
            class="tab"
            :class="{ 'tab--active': cargoTab === 'ratio' }"
            @click="cargoTab = 'ratio'"
          >
            货运量
          </button>
          <button
            class="tab"
            :class="{ 'tab--active': cargoTab === 'plan' }"
            @click="cargoTab = 'plan'"
          >
            货运周转量
          </button>
        </div>
        <div class="panel-chart">
          <CargoMixChart
            :x-data="currentGoodsShipSeries.xData"
            :province-num-data="currentGoodsShipSeries.provinceNumData"
            :province-growth-data="currentGoodsShipSeries.provinceGrowthData"
            :city-num-data="currentGoodsShipSeries.cityNumData"
            :city-growth-data="currentGoodsShipSeries.cityGrowthData"
            :num-unit="cargoTab === 'plan' ? '万吨公里' : '万吨'"
          />
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">车辆信息</div>
        <div class="panel-chart">
          <VehicleInfoBar
            :x-data="data.vehicleInfoXAxis"
            :private-data="data.vehicleInfoPrivateData"
            :total-data="data.vehicleInfoTotalData"
          />
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.left {
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 26px;
}

.col {
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.col:not(.col-left) .panel {
  flex: 1;
}

.panel {
  position: relative;
  border: 1px solid rgba(84, 188, 255, 0.24);
  box-shadow:
    inset 0 0 36px rgba(34, 121, 255, 0.08),
    0 0 30px rgba(0, 45, 111, 0.14);
  overflow: hidden;
  border-radius: 18px;
  padding: 26px 28px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background:
    linear-gradient(180deg, rgba(6, 27, 72, 0.6), rgba(4, 16, 44, 0.6)),
    url('@/assets/img/leftBg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}

.panel::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(94, 197, 255, 0.12);
  pointer-events: none;
}

.panel--full {
  flex: 1;
  background-size: 100% auto;
  background-position: top center;
}

.section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.section--bottom {
  margin-top: 20px;
  padding-top: 22px;
  border-top: 1px solid rgba(94, 197, 255, 0.16);
}

.panel-title {
  height: 42px;
  display: inline-flex;
  align-items: center;
  font-size: 40px;
  line-height: 2px;
  margin-top: -10px;
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

.panel-head {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 6px;
}

.tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 18px;
  margin: 6px 0 18px;
}
.tab {
  height: 64px;
  min-width: 300px;
  padding: 0 26px;
  border: none;
  outline: none;
  background: url('@/assets/img/tabBg.png') no-repeat center;
  background-size: 100% 100%;
  background-color: transparent;
  appearance: none;
  color: #ffffff;
  font-size: 32px;
  font-weight: 700;
  line-height: 64px;
  text-align: center;
  cursor: pointer;
  opacity: 0.72;
  filter: saturate(0.85);
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
  font-style: italic;
  letter-spacing: 2px;
  text-shadow:
    0 0 6px #fff,
    0 0 12px #7cf,
    0 0 24px #0cf,
    0 0 40px #00a8ff;
}
.tab--active {
  color: #eaf4ff;
  opacity: 1;
  filter: drop-shadow(0 0 10px rgba(54, 232, 255, 0.28));
}

.panel-chart {
  flex: 1;
  min-height: 0;
}

.table {
  flex: 1;
  min-height: 0;
  display: grid;
  gap: 12px;
  font-size: 20px;
  color: rgba(214, 238, 255, 0.84);
  margin-top: 100px;
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
