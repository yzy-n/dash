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

export type BusScreenData = {
  parkingRatioXData: string[]
  parkingRatioYData: number[]
  parkingPlanXData: string[]
  parkingPlanYData: number[]
  publicTransportXAxis: string[]
  publicTransportPassengerData: number[]
  publicTransportTaxiNumData: number[]
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
  parkingDemandIdeal: number
  parkingDemandTarget: number
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
  publicTransportXAxis: [],
  publicTransportPassengerData: [],
  publicTransportTaxiNumData: [],
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
  parkingDemandIdeal: 0,
  parkingDemandTarget: 0,
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
