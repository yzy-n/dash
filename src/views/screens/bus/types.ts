export type BusRouteRow = {
  id: number | string
  lineNo: string
  name: string
  start: string
  end: string
}

export type BusStationRow = {
  name: string
  lng?: number
  lat?: number
  direction?: 'up' | 'down'
}

export type BusRoadCloseRow = {
  roadName: string
  section?: string
  startPoint?: string
  endPoint?: string
  startTime?: string
  endTime?: string
  time: string
}

export type BusCongestionRow = {
  pos: string
  level: string
  start: string
  end: string
}

export type BusStatSummary = {
  pending: number
  processing: number
  finished: number
}

export type BusCongestionSummary = {
  severe: number
  moderate: number
  light: number
}

/** 城区停车场现状分析-需求进度（数据源：/parking 的 parkingLevelRates） */
export type BusParkingDemandLevel = {
  name: string
  /** 目标车位数/车 */
  target: number
  /** 完成百分比 0-100 */
  percent: number
}

export type BusScreenData = {
  parkingRatioXData: string[]
  parkingRatioYData: number[]
  parkingPlanXData: string[]
  parkingPlanYData: number[]
  trafficCompanyXAxis: string[]
  trafficCompanyOneData: number[]
  trafficCompanyTwoData: number[]
  trafficCompanyThreeData: number[]
  trafficCompanyFourData: number[]
  trafficCompanyFiveData: number[]
  busLineMonthDataMap: Record<string, Array<{ name: string; value: number }>>
  taxiXAxis: string[]
  taxiNumData: number[]
  taxiPassengerData: number[]
  vehicleInfoXAxis: string[]
  vehicleInfoPrivateData: number[]
  vehicleInfoTotalData: number[]
  goodsShipSeries: {
    type1: {
      xData: string[]
      provinceNumData: number[]
      provinceGrowthData: number[]
      cityNumData: number[]
      cityGrowthData: number[]
    }
    type2: {
      xData: string[]
      provinceNumData: number[]
      provinceGrowthData: number[]
      cityNumData: number[]
      cityGrowthData: number[]
    }
  }
  passengerShipSeries: {
    type1: {
      xData: string[]
      provinceNumData: number[]
      provinceGrowthData: number[]
      cityNumData: number[]
      cityGrowthData: number[]
    }
    type2: {
      xData: string[]
      provinceNumData: number[]
      provinceGrowthData: number[]
      cityNumData: number[]
      cityGrowthData: number[]
    }
  }
  roadOverviewSummary: {
    roadLength: number
    roadArea: number
    footwalkArea: number
    viaductNum: number
    bridgeNum: number
    roadRate: number
  }
  roadChangeSeries: {
    type1: Array<{
      year: string
      countryRoadLength: number
      countryRoadRate: number
      provinceRoadLength: number
      provinceRoadRate: number
      cityRoadLength: number
      cityRoadRate: number
    }>
    type2: Array<{
      year: string
      countryRoadLength: number
      countryRoadRate: number
      provinceRoadLength: number
      provinceRoadRate: number
      cityRoadLength: number
      cityRoadRate: number
    }>
  }
  parkingDemandLevels: BusParkingDemandLevel[]
  roadCloseSummary: BusStatSummary
  roadCloseList: BusRoadCloseRow[]
  congestionSummary: BusCongestionSummary
  congestionList: BusCongestionRow[]
  routes: BusRouteRow[]
  activeRouteId: number | string
  stations: BusStationRow[]
  activeBusRunningCount: number
}

export const createEmptyBusData = (): BusScreenData => ({
  parkingRatioXData: [],
  parkingRatioYData: [],
  parkingPlanXData: [],
  parkingPlanYData: [],
  trafficCompanyXAxis: [],
  trafficCompanyOneData: [],
  trafficCompanyTwoData: [],
  trafficCompanyThreeData: [],
  trafficCompanyFourData: [],
  trafficCompanyFiveData: [],
  busLineMonthDataMap: {},
  taxiXAxis: [],
  taxiNumData: [],
  taxiPassengerData: [],
  vehicleInfoXAxis: [],
  vehicleInfoPrivateData: [],
  vehicleInfoTotalData: [],
  goodsShipSeries: {
    type1: {
      xData: [],
      provinceNumData: [],
      provinceGrowthData: [],
      cityNumData: [],
      cityGrowthData: []
    },
    type2: {
      xData: [],
      provinceNumData: [],
      provinceGrowthData: [],
      cityNumData: [],
      cityGrowthData: []
    }
  },
  passengerShipSeries: {
    type1: {
      xData: [],
      provinceNumData: [],
      provinceGrowthData: [],
      cityNumData: [],
      cityGrowthData: []
    },
    type2: {
      xData: [],
      provinceNumData: [],
      provinceGrowthData: [],
      cityNumData: [],
      cityGrowthData: []
    }
  },
  roadOverviewSummary: {
    roadLength: 0,
    roadArea: 0,
    footwalkArea: 0,
    viaductNum: 0,
    bridgeNum: 0,
    roadRate: 0
  },
  roadChangeSeries: {
    type1: [],
    type2: []
  },
  // 接口返回前的兜底占位，加载 parkingLevelRates 后整体替换
  parkingDemandLevels: [
    { name: '理想水平', target: 1.2, percent: 0 },
    { name: '2025年期望', target: 0.6, percent: 0 }
  ],
  roadCloseSummary: {
    pending: 0,
    processing: 0,
    finished: 0
  },
  roadCloseList: [],
  congestionSummary: {
    severe: 0,
    moderate: 0,
    light: 0
  },
  congestionList: [],
  routes: [],
  activeRouteId: '',
  stations: [],
  activeBusRunningCount: 0
})
