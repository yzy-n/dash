export type MetricKey = 'cover' | 'garden' | 'park'

export type TimeBarMetric = {
  name: string
  years: string[]
  data: number[]
  yMax?: number
  unit?: string
}

export type LineSeries = {
  name: string
  data: number[]
  color?: string
}

export type RoseDatum = {
  name: string
  value: number
  color?: string
}

export type RankRow = {
  rank: number
  district: string
  name: string
}

export type KpiItem = {
  label: string
  value: string | number
}

export type SideStat = {
  name: string
  year: number
  last: number
}

export type GridInfoRow = {
  name: string
  town: number
  village: number
  grid: number
}

export type AppealEvent = {
  date: string
  name: string
  dep: string
  score: string
}

export type NamedValue = {
  name: string
  value: number
  total?: number
}

export type DashScreenData = {
  greeningMetrics: Record<MetricKey, TimeBarMetric>
  greenlandTrend: {
    x: string[]
    series: LineSeries[]
  }
  sanitationMetrics: Record<MetricKey, TimeBarMetric>
  energyItems: RoseDatum[]
  landAreaData: NamedValue[]
  pocketParks: RankRow[]
  pocketParkConstruction: RankRow[]
  centerKpis: KpiItem[]
  centerSideLeft: SideStat[]
  centerSideRight: SideStat[]
  gridInfoRows: GridInfoRow[]
  appealEvents: AppealEvent[]
  componentDistribution: NamedValue[]
  caseCount: {
    x: string[]
    y: number[]
  }
  caseRing: RoseDatum[]
}

export const createEmptyTimeBarMetric = (): TimeBarMetric => ({
  name: '',
  years: [],
  data: []
})

export const createEmptyDashData = (): DashScreenData => ({
  greeningMetrics: {
    cover: createEmptyTimeBarMetric(),
    garden: createEmptyTimeBarMetric(),
    park: createEmptyTimeBarMetric()
  },
  greenlandTrend: {
    x: [],
    series: []
  },
  sanitationMetrics: {
    cover: createEmptyTimeBarMetric(),
    garden: createEmptyTimeBarMetric(),
    park: createEmptyTimeBarMetric()
  },
  energyItems: [],
  landAreaData: [],
  pocketParks: [],
  pocketParkConstruction: [],
  centerKpis: [],
  centerSideLeft: [],
  centerSideRight: [],
  gridInfoRows: [],
  appealEvents: [],
  componentDistribution: [],
  caseCount: {
    x: [],
    y: []
  },
  caseRing: []
})
