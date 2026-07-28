import { onMounted, ref } from 'vue'

import {
  getCityBigscreenAppealList,
  getCityBigscreenCaseStatistics,
  getCityBigscreenComponentDistribution,
  getCityBigscreenEnergy,
  getCityBigscreenFull,
  getCityBigscreenGreenland,
  getCityBigscreenGrid,
  getCityBigscreenLandArea,
  getCityBigscreenLawCase,
  getCityBigscreenPark,
  getCityBigscreenSanitation
} from '@/api'

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

const DEFAULT_DATA: DashScreenData = {
  greeningMetrics: {
    cover: {
      name: '绿化覆盖面积',
      years: ['2020', '2021', '2022', '2023'],
      data: [7050, 7375.28, 7480, 7360],
      yMax: 8000,
      unit: '公顷'
    },
    garden: {
      name: '园林绿地面积',
      years: ['2020', '2021', '2022', '2023'],
      data: [5120, 5360, 5580, 5730],
      yMax: 6500,
      unit: '公顷'
    },
    park: {
      name: '公园占地面积',
      years: ['2020', '2021', '2022', '2023'],
      data: [1320, 1410, 1560, 1685],
      yMax: 2200,
      unit: '公顷'
    }
  },
  greenlandTrend: {
    x: ['2018', '2019', '2020', '2021'],
    series: [
      { name: '人均绿地面积', data: [14.2, 14.6, 15.1, 15.3], color: '#36e8ff' },
      { name: '建成区绿地面积', data: [12.1, 12.6, 13.4, 13.9], color: '#7d5dff' }
    ]
  },
  sanitationMetrics: {
    cover: {
      name: '清扫道路面积',
      years: ['2018', '2019', '2020', '2021', '2022'],
      data: [2350, 2680, 2890, 3050, 3320],
      unit: '万平方米'
    },
    garden: {
      name: '生活垃圾清运量',
      years: ['2018', '2019', '2020', '2021', '2022'],
      data: [1820, 1935, 2050, 2170, 2288],
      unit: '吨'
    },
    park: {
      name: '公厕数',
      years: ['2018', '2019', '2020', '2021', '2022'],
      data: [612, 625, 639, 648, 662],
      unit: '座'
    }
  },
  energyItems: [
    { name: '安装路灯道路长度', value: 12, color: '#2563eb' },
    { name: '道路照明灯盏数', value: 26, color: '#caa822' },
    { name: '城市照明装灯总功率', value: 35, color: '#10b98c' },
    { name: '城市照明总用电量', value: 48, color: '#6c42d8' }
  ],
  landAreaData: [
    { name: '居住用地', value: 80.91, total: 106.43 },
    { name: '工业用地', value: 82.06, total: 68.53 },
    { name: '道路交通设施用地', value: 61.17, total: 34.5 },
    { name: '商业服务业设施用地', value: 30.71, total: 14.91 },
    { name: '绿地与广场用地', value: 60.29, total: 27.65 }
  ],
  pocketParks: [
    { rank: 1, district: '铁东区', name: '悠然园' },
    { rank: 2, district: '立山区', name: '大观园' },
    { rank: 3, district: '铁西区', name: '青风园' },
    { rank: 4, district: '海城市', name: '曦光园' },
    { rank: 5, district: '台安县', name: '清韵园' }
  ],
  pocketParkConstruction: [
    { rank: 1, district: '铁东区', name: '社区健身广场' },
    { rank: 2, district: '铁东区', name: '社区门前空地' },
    { rank: 3, district: '铁东区', name: '职工街市场' },
    { rank: 4, district: '铁东区', name: '八卦街28栋与八卦街30栋之间' },
    { rank: 5, district: '铁东区', name: '十二道街8栋南侧' }
  ],
  centerKpis: [
    { label: '立案数', value: '559315' },
    { label: '结案数', value: '559297' },
    { label: '结案率', value: '99.99%' }
  ],
  centerSideLeft: [
    { name: '安全隐患', year: 0, last: 10961 },
    { name: '便民服务', year: 0, last: 12901 },
    { name: '矛盾纠纷', year: 0, last: 710 },
    { name: '办理记录', year: 0, last: 326 },
    { name: '突发事件', year: 0, last: 297 },
    { name: '两违线索', year: 0, last: 87 },
    { name: '关注重点人群', year: 0, last: 436 }
  ],
  centerSideRight: [
    { name: '政务服务', year: 0, last: 7776 },
    { name: '平安建设', year: 0, last: 6278 },
    { name: '群防群治', year: 0, last: 403 },
    { name: '苗头态势', year: 0, last: 306 },
    { name: '人居环境', year: 0, last: 79 },
    { name: '应急救援', year: 0, last: 10 },
    { name: '维护和谐卫生', year: 0, last: 31101 }
  ],
  gridInfoRows: [
    { name: '海城市', town: 26, village: 422, grid: 1415 },
    { name: '台安县', town: 12, village: 174, grid: 1658 },
    { name: '岫岩县', town: 24, village: 204, grid: 739 },
    { name: '铁东区', town: 14, village: 107, grid: 128 },
    { name: '铁西区', town: 8, village: 63, grid: 105 },
    { name: '立山区', town: 7, village: 89, grid: 254 }
  ],
  appealEvents: [
    { date: '2023-05-25', name: '海城市花园小区——噪音扰民', dep: '', score: '满意' },
    { date: '2023-05-24', name: '台安县南河街道——占道经营', dep: '', score: '满意' },
    { date: '2023-05-24', name: '铁西区教育街——路面破损', dep: '', score: '不满意' },
    { date: '2023-05-23', name: '高新区万科广场——垃圾堆放', dep: '', score: '满意' },
    { date: '2023-05-22', name: '岫岩县东门路段——井盖缺失', dep: '', score: '满意' }
  ],
  componentDistribution: [
    { name: '公共设施', value: 33.05 },
    { name: '园林绿化', value: 18.79 },
    { name: '市容环境', value: 6.89 },
    { name: '交通设施', value: 2.36 },
    { name: '其他', value: 0.29 }
  ],
  caseCount: {
    x: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'],
    y: [35210, 26840, 40120, 65420, 52890, 70210]
  },
  caseRing: [
    { name: '上报数', value: 40, color: '#ffdd22' },
    { name: '立案数', value: 30, color: '#0078ff' },
    { name: '派遣数', value: 10, color: '#00ccff' },
    { name: '处置数', value: 20, color: '#26e8ee' },
    { name: '结案数', value: 80, color: '#ff8822' },
    { name: '核查数', value: 10, color: '#ff2222' }
  ]
}

type UnknownRecord = Record<string, unknown>

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const toNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[%,$，\s]/g, ''))
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

const toStringValue = (value: unknown) => {
  if (value === null || value === undefined) return undefined
  return String(value)
}

const getByPath = (source: unknown, path: string) => {
  return path.split('.').reduce<unknown>((current, key) => {
    if (Array.isArray(current) && /^\d+$/.test(key)) return current[Number(key)]
    if (isRecord(current) && key in current) return current[key]
    return undefined
  }, source)
}

const pickByPaths = (source: unknown, paths: string[]) => {
  for (const path of paths) {
    const value = getByPath(source, path)
    if (value !== undefined && value !== null) return value
  }
  return undefined
}

const walk = (
  source: unknown,
  visitor: (value: unknown, path: string) => boolean | void,
  path = '',
  depth = 0
): boolean => {
  if (depth > 5 || source === null || source === undefined) return false
  if (visitor(source, path)) return true
  if (Array.isArray(source)) {
    return source.some((item, index) => walk(item, visitor, `${path}[${index}]`, depth + 1))
  }
  if (isRecord(source)) {
    return Object.entries(source).some(([key, value]) => {
      const nextPath = path ? `${path}.${key}` : key
      return walk(value, visitor, nextPath, depth + 1)
    })
  }
  return false
}

const findValue = (source: unknown, matcher: (value: unknown, path: string) => boolean) => {
  let found: unknown
  walk(source, (value, path) => {
    if (matcher(value, path.toLowerCase())) {
      found = value
      return true
    }
    return false
  })
  return found
}

const findArrayByKeywords = (source: unknown, keywords: string[]) =>
  findValue(
    source,
    (value, path) => Array.isArray(value) && keywords.some((keyword) => path.includes(keyword))
  )

const toNamedValueArray = (source: unknown, fallback: NamedValue[]) => {
  if (!Array.isArray(source)) return fallback
  const list = source
    .map((item) => {
      if (!isRecord(item)) return null
      const name = toStringValue(
        pickByPaths(item, ['name', 'label', 'type', 'category', 'componentName'])
      )
      const value = toNumber(
        pickByPaths(item, ['value', 'count', 'num', 'area', 'percent', 'rate'])
      )
      const total = toNumber(pickByPaths(item, ['total', 'totalValue', 'sum']))
      if (!name || value === undefined) return null
      return { name, value, total }
    })
    .filter((item): item is NamedValue => Boolean(item))

  return list.length ? list : fallback
}

const toRoseData = (source: unknown, fallback: RoseDatum[]) => {
  const named = toNamedValueArray(source, [])
  if (!named.length) return fallback
  return named.map((item, index) => ({
    name: item.name,
    value: item.value,
    color: fallback[index]?.color
  }))
}

const normalizeSanitationMetrics = (
  source: unknown,
  fallback: DashScreenData['sanitationMetrics']
): DashScreenData['sanitationMetrics'] => {
  const rows = pickByPaths(source, ['dataList'])
  if (!Array.isArray(rows)) return fallback

  const publishedRows = rows.filter(
    (item) =>
      isRecord(item) &&
      item.dataStatus === 'PUBLISHED' &&
      toStringValue(item.type) !== undefined &&
      toNumber(item.year) !== undefined &&
      toNumber(item.num) !== undefined
  )

  const buildMetric = (type: string, base: TimeBarMetric) => {
    const typeRows = publishedRows
      .filter((item) => String(item.type) === type)
      .sort((a, b) => (toNumber(a.year) ?? 0) - (toNumber(b.year) ?? 0))

    if (!typeRows.length) return base

    return {
      ...base,
      years: typeRows.map((item) => String(toNumber(item.year))),
      data: typeRows.map((item) => toNumber(item.num) ?? 0)
    }
  }

  return {
    cover: buildMetric('1', fallback.cover),
    garden: buildMetric('2', fallback.garden),
    park: buildMetric('3', fallback.park)
  }
}

const normalizeLandAreaData = (source: unknown, fallback: NamedValue[]) => {
  const rows = pickByPaths(source, ['dataList'])
  if (!Array.isArray(rows)) return fallback

  const list = rows
    .filter((item) => isRecord(item) && item.dataStatus === 'PUBLISHED')
    .map((item) => {
      const name = toStringValue(item.label)
      const value = toNumber(item.area)
      const total = toNumber(item.planArea)
      if (!name || value === undefined) return null
      return { name, value, total }
    })
    .filter((item): item is NamedValue => Boolean(item))

  return list.length ? list : fallback
}

const toTimeBarMetric = (
  source: unknown,
  fallback: TimeBarMetric,
  extraPaths: { years?: string[]; data?: string[]; name?: string[]; unit?: string[] } = {}
) => {
  const years =
    (pickByPaths(source, extraPaths.years ?? []) as string[] | undefined) ??
    (findArrayByKeywords(source, ['year', 'date', 'month', 'xaxis']) as string[] | undefined)

  const data =
    (pickByPaths(source, extraPaths.data ?? []) as unknown[] | undefined) ??
    (findArrayByKeywords(source, ['value', 'count', 'num', 'data', 'series']) as
      unknown[] | undefined)

  const directRows = Array.isArray(source) ? source : undefined

  if (directRows?.every((item) => isRecord(item))) {
    const rowYears = directRows.map(
      (item) => toStringValue(pickByPaths(item, ['year', 'date', 'month', 'name'])) ?? ''
    )
    const rowData = directRows.map(
      (item) => toNumber(pickByPaths(item, ['value', 'count', 'num', 'area'])) ?? NaN
    )
    if (rowYears.every(Boolean) && rowData.every((item) => Number.isFinite(item))) {
      return {
        name: toStringValue(pickByPaths(source, extraPaths.name ?? [])) ?? fallback.name,
        unit: toStringValue(pickByPaths(source, extraPaths.unit ?? [])) ?? fallback.unit,
        yMax: fallback.yMax,
        years: rowYears,
        data: rowData
      }
    }
  }

  const metricYears = Array.isArray(years) ? years.map((item) => String(item)) : fallback.years
  const metricData = Array.isArray(data)
    ? data.map((item) => toNumber(item) ?? NaN).filter((item) => Number.isFinite(item))
    : fallback.data

  if (!metricYears.length || !metricData.length || metricYears.length !== metricData.length) {
    return fallback
  }

  return {
    name: toStringValue(pickByPaths(source, extraPaths.name ?? [])) ?? fallback.name,
    unit: toStringValue(pickByPaths(source, extraPaths.unit ?? [])) ?? fallback.unit,
    yMax: fallback.yMax,
    years: metricYears,
    data: metricData
  }
}

const normalizeLineChart = (source: unknown, fallback: DashScreenData['greenlandTrend']) => {
  const seriesSource =
    (pickByPaths(source, ['series', 'lines', 'lineList']) as unknown[] | undefined) ??
    (findArrayByKeywords(source, ['series', 'line']) as unknown[] | undefined)

  const x =
    (pickByPaths(source, ['x', 'xAxis', 'years', 'dates', 'months']) as unknown[] | undefined)?.map(
      (item) => String(item)
    ) ?? fallback.x

  if (!Array.isArray(seriesSource)) return fallback

  const series = seriesSource
    .map((item, index) => {
      if (!isRecord(item)) return null
      const name =
        toStringValue(pickByPaths(item, ['name', 'label', 'type'])) ?? fallback.series[index]?.name
      const data = (pickByPaths(item, ['data', 'values', 'list']) as unknown[] | undefined)?.map(
        (value) => toNumber(value) ?? NaN
      )
      if (!name || !data?.length || data.some((value) => Number.isNaN(value))) return null
      return { name, data, color: fallback.series[index]?.color }
    })
    .filter((item): item is LineSeries => Boolean(item))

  if (!series.length) return fallback
  return { x, series }
}

const normalizeParkRows = (source: unknown, fallback: RankRow[]) => {
  const rows = Array.isArray(source)
    ? source
    : ((pickByPaths(source, ['list', 'rows', 'records', 'parks']) as unknown[] | undefined) ??
      (findArrayByKeywords(source, ['park', 'list', 'rows']) as unknown[] | undefined))

  if (!Array.isArray(rows)) return fallback

  const list = rows
    .map((item, index) => {
      if (!isRecord(item)) return null
      const rank = toNumber(pickByPaths(item, ['rank', 'sort', 'order'])) ?? index + 1
      const district =
        toStringValue(pickByPaths(item, ['district', 'area', 'county', 'region'])) ?? ''
      const name = toStringValue(pickByPaths(item, ['name', 'parkName', 'title'])) ?? ''
      if (!name) return null
      return { rank, district, name }
    })
    .filter((item): item is RankRow => Boolean(item))

  return list.length ? list : fallback
}

const normalizeParkData = (
  source: unknown,
  fallbackRankings: RankRow[],
  fallbackConstruction: RankRow[]
) => {
  const rankings = pickByPaths(source, ['summary.rankings']) as unknown[] | undefined
  const buildings = pickByPaths(source, ['summary.buildings']) as unknown[] | undefined

  const parseRankings = (rows: unknown[] | undefined) => {
    if (!Array.isArray(rows)) return fallbackRankings
    const list = rows
      .map((item) => {
        if (!isRecord(item) || item.dataStatus !== 'PUBLISHED') return null
        const rank = toNumber(pickByPaths(item, ['ranking', 'rank', 'sort'])) ?? 0
        const district = toStringValue(pickByPaths(item, ['areaName', 'district', 'area'])) ?? ''
        const name = toStringValue(pickByPaths(item, ['parkName', 'name', 'title'])) ?? ''
        if (!rank || !district || !name) return null
        return { rank, district, name }
      })
      .filter((item): item is RankRow => Boolean(item))
      .sort((a, b) => a.rank - b.rank)

    return list.length ? list : fallbackRankings
  }

  const parseBuildings = (rows: unknown[] | undefined) => {
    if (!Array.isArray(rows)) return fallbackConstruction
    const list = rows
      .map((item, index) => {
        if (!isRecord(item) || item.dataStatus !== 'PUBLISHED') return null
        const district = toStringValue(pickByPaths(item, ['areaName', 'district', 'area'])) ?? ''
        const seat = toStringValue(pickByPaths(item, ['seat', 'location', 'address'])) ?? ''
        if (!district || !seat) return null
        return { rank: index + 1, district, name: seat }
      })
      .filter((item): item is RankRow => Boolean(item))

    return list.length ? list : fallbackConstruction
  }

  return {
    rankings: parseRankings(rankings),
    construction: parseBuildings(buildings)
  }
}

const normalizeGridRows = (source: unknown, fallback: GridInfoRow[]) => {
  const rows = pickByPaths(source, ['dataList'])
  if (!Array.isArray(rows)) return fallback

  const publishedRows = rows.filter((item) => isRecord(item) && item.dataStatus === 'PUBLISHED')
  const grouped = new Map<
    string,
    {
      streets: Set<string>
      communities: Set<string>
      grid: number
    }
  >()

  for (const item of publishedRows) {
    const areaName = toStringValue(item.areaName)
    if (!areaName) continue

    if (!grouped.has(areaName)) {
      grouped.set(areaName, {
        streets: new Set<string>(),
        communities: new Set<string>(),
        grid: 0
      })
    }

    const bucket = grouped.get(areaName)!
    const streetName = toStringValue(item.streetName)
    const communityName = toStringValue(item.communityName)
    const gridNum = toNumber(item.gridNum) ?? 0

    if (streetName) bucket.streets.add(streetName)
    if (communityName) bucket.communities.add(communityName)
    bucket.grid += gridNum
  }

  const list = Array.from(grouped.entries()).map(([name, bucket]) => ({
    name,
    town: bucket.streets.size,
    village: bucket.communities.size,
    grid: bucket.grid
  }))

  return list.length ? list : fallback
}

const normalizeLawCaseData = (
  source: unknown,
  fallbackCount: DashScreenData['caseCount'],
  fallbackRing: RoseDatum[]
) => {
  const rows = pickByPaths(source, ['dataList'])
  if (!Array.isArray(rows)) {
    return { caseCount: fallbackCount, caseRing: fallbackRing }
  }

  const validRows = rows
    .filter(
      (item) =>
        isRecord(item) &&
        item.dataStatus !== 'ITEM_DEL' &&
        item.dataStatus !== 'DRAFT' &&
        toStringValue(item.dateMonth)
    )
    .sort((a, b) => String(a.dateMonth).localeCompare(String(b.dateMonth)))

  if (!validRows.length) {
    return { caseCount: fallbackCount, caseRing: fallbackRing }
  }

  const caseCount = {
    x: validRows.map((item) => String(item.dateMonth)),
    y: validRows.map((item) => toNumber(item.appearNum) ?? 0)
  }

  const latest = validRows[validRows.length - 1]

  return {
    caseCount,
    caseRing: [
      { name: '上报数', value: toNumber(latest.appearNum) ?? 0, color: '#ffdd22' },
      { name: '立案数', value: toNumber(latest.registerNum) ?? 0, color: '#0078ff' },
      { name: '派遣数', value: toNumber(latest.sendNum) ?? 0, color: '#00ccff' },
      { name: '处置数', value: toNumber(latest.disposeNum) ?? 0, color: '#26e8ee' },
      { name: '结案数', value: toNumber(latest.windNum) ?? 0, color: '#ff8822' },
      { name: '核查数', value: toNumber(latest.checkNum) ?? 0, color: '#ff2222' }
    ]
  }
}

const normalizeAppealRows = (source: unknown, fallback: AppealEvent[]) => {
  const rows = Array.isArray(source)
    ? source
    : ((pickByPaths(source, ['list', 'rows', 'records']) as unknown[] | undefined) ??
      (findArrayByKeywords(source, ['appeal', 'event', 'list', 'rows']) as unknown[] | undefined))

  if (!Array.isArray(rows)) return fallback

  const list = rows
    .map((item) => {
      if (!isRecord(item)) return null
      const date =
        toStringValue(pickByPaths(item, ['date', 'time', 'createTime', 'occurTime'])) ?? ''
      const name =
        toStringValue(pickByPaths(item, ['name', 'title', 'eventName', 'appealName'])) ?? ''
      const dep =
        toStringValue(pickByPaths(item, ['department', 'deptName', 'handleDept', 'organName'])) ??
        ''
      const score =
        toStringValue(pickByPaths(item, ['score', 'evaluate', 'satisfaction', 'status'])) ?? '-'
      if (!date && !name) return null
      return { date, name, dep, score }
    })
    .filter((item): item is AppealEvent => Boolean(item))

  return list.length ? list : fallback
}

const normalizeKpis = (source: unknown, fallback: KpiItem[]) => {
  const candidates: Array<{ label: string; paths: string[] }> = [
    { label: '立案数', paths: ['caseNum', 'fileCount', 'filingCount', 'liAnCount', 'kpi.caseNum'] },
    { label: '结案数', paths: ['closeCount', 'finishCount', 'jieAnCount', 'kpi.closeCount'] },
    { label: '结案率', paths: ['closeRate', 'finishRate', 'jieAnRate', 'kpi.closeRate'] }
  ]

  const mapped = candidates.map((item, index) => {
    const raw =
      pickByPaths(source, item.paths) ??
      findValue(source, (_value, path) =>
        item.paths.some((key) => path.endsWith(key.toLowerCase()))
      )
    if (raw === undefined) return fallback[index]
    const num = toNumber(raw)
    if (typeof raw === 'string' && raw.includes('%')) return { label: item.label, value: raw }
    if (item.label.endsWith('率')) return { label: item.label, value: `${num ?? raw}%` }
    return { label: item.label, value: num ?? String(raw) }
  })

  return mapped
}

const normalizeSideStats = (source: unknown, fallback: SideStat[]) => {
  const leftRows =
    (pickByPaths(source, ['left', 'leftList', 'leftRows', 'leftData']) as unknown[] | undefined) ??
    (findArrayByKeywords(source, ['left', 'sideleft']) as unknown[] | undefined)
  const rightRows =
    (pickByPaths(source, ['right', 'rightList', 'rightRows', 'rightData']) as
      unknown[] | undefined) ??
    (findArrayByKeywords(source, ['right', 'sideright']) as unknown[] | undefined)

  const parseRows = (rows: unknown[] | undefined, fallbackRows: SideStat[]) => {
    if (!Array.isArray(rows)) return fallbackRows
    const list = rows
      .map((item) => {
        if (!isRecord(item)) return null
        const name = toStringValue(pickByPaths(item, ['name', 'label', 'title'])) ?? ''
        const year = toNumber(pickByPaths(item, ['year', 'current', 'thisYear', 'yearNum'])) ?? 0
        const last = toNumber(pickByPaths(item, ['last', 'lastMonth', 'month', 'lastNum'])) ?? 0
        if (!name) return null
        return { name, year, last }
      })
      .filter((item): item is SideStat => Boolean(item))

    return list.length ? list : fallbackRows
  }

  return {
    left: parseRows(leftRows, fallback.slice(0, 7)),
    right: parseRows(rightRows, DEFAULT_DATA.centerSideRight)
  }
}

export const useDashData = () => {
  const data = ref<DashScreenData>(DEFAULT_DATA)
  const loading = ref(false)
  const error = ref('')

  const load = async () => {
    loading.value = true
    error.value = ''

    const [
      greenlandResult,
      sanitationResult,
      parkResult,
      landAreaResult,
      energyResult,
      gridResult,
      componentResult,
      caseStatisticsResult,
      appealResult,
      lawCaseResult,
      fullResult
    ] = await Promise.allSettled([
      getCityBigscreenGreenland(),
      getCityBigscreenSanitation(),
      getCityBigscreenPark(),
      getCityBigscreenLandArea(),
      getCityBigscreenEnergy(),
      getCityBigscreenGrid(),
      getCityBigscreenComponentDistribution(),
      getCityBigscreenCaseStatistics(),
      getCityBigscreenAppealList(),
      getCityBigscreenLawCase(),
      getCityBigscreenFull()
    ])

    const greenland = greenlandResult.status === 'fulfilled' ? greenlandResult.value : undefined
    const sanitation = sanitationResult.status === 'fulfilled' ? sanitationResult.value : undefined
    const park = parkResult.status === 'fulfilled' ? parkResult.value : undefined
    const landArea = landAreaResult.status === 'fulfilled' ? landAreaResult.value : undefined
    const energy = energyResult.status === 'fulfilled' ? energyResult.value : undefined
    const grid = gridResult.status === 'fulfilled' ? gridResult.value : undefined
    const component = componentResult.status === 'fulfilled' ? componentResult.value : undefined
    const caseStatistics =
      caseStatisticsResult.status === 'fulfilled' ? caseStatisticsResult.value : undefined
    const appeal = appealResult.status === 'fulfilled' ? appealResult.value : undefined
    const lawCase = lawCaseResult.status === 'fulfilled' ? lawCaseResult.value : undefined
    const full = fullResult.status === 'fulfilled' ? fullResult.value : undefined

    if (
      [
        greenlandResult,
        sanitationResult,
        parkResult,
        landAreaResult,
        energyResult,
        gridResult,
        componentResult,
        caseStatisticsResult,
        appealResult,
        lawCaseResult,
        fullResult
      ].every((item) => item.status === 'rejected')
    ) {
      error.value = '大屏接口暂不可用，当前展示的是本地默认数据'
    }

    const sideStats = normalizeSideStats(full, DEFAULT_DATA.centerSideLeft)
    const parkData = normalizeParkData(
      park,
      DEFAULT_DATA.pocketParks,
      DEFAULT_DATA.pocketParkConstruction
    )
    const lawCaseData = normalizeLawCaseData(lawCase, DEFAULT_DATA.caseCount, DEFAULT_DATA.caseRing)

    data.value = {
      greeningMetrics: {
        cover: toTimeBarMetric(
          pickByPaths(greenland, ['cover', 'greenCoverage', 'greeningCoverage']) ?? greenland,
          DEFAULT_DATA.greeningMetrics.cover,
          {
            years: ['years', 'xAxis', 'dateList'],
            data: ['values', 'data', 'countList'],
            name: ['name', 'title'],
            unit: ['unit']
          }
        ),
        garden: toTimeBarMetric(
          pickByPaths(greenland, ['garden', 'greenlandArea', 'parkGreenArea']) ?? greenland,
          DEFAULT_DATA.greeningMetrics.garden,
          {
            years: ['years', 'xAxis', 'dateList'],
            data: ['values', 'data', 'countList'],
            name: ['name', 'title'],
            unit: ['unit']
          }
        ),
        park: toTimeBarMetric(
          pickByPaths(greenland, ['park', 'parkArea', 'parkLandArea']) ?? greenland,
          DEFAULT_DATA.greeningMetrics.park,
          {
            years: ['years', 'xAxis', 'dateList'],
            data: ['values', 'data', 'countList'],
            name: ['name', 'title'],
            unit: ['unit']
          }
        )
      },
      greenlandTrend: normalizeLineChart(
        pickByPaths(greenland, ['trend', 'lineChart', 'line']) ?? greenland,
        DEFAULT_DATA.greenlandTrend
      ),
      sanitationMetrics: normalizeSanitationMetrics(sanitation, DEFAULT_DATA.sanitationMetrics),
      energyItems: toRoseData(
        pickByPaths(energy, ['list', 'items', 'records', 'data']) ??
          findArrayByKeywords(energy, ['energy', 'lamp', 'light']) ??
          energy,
        DEFAULT_DATA.energyItems
      ),
      landAreaData: normalizeLandAreaData(landArea, DEFAULT_DATA.landAreaData),
      pocketParks: parkData.rankings,
      pocketParkConstruction: parkData.construction,
      centerKpis: normalizeKpis(full ?? caseStatistics, DEFAULT_DATA.centerKpis),
      centerSideLeft: sideStats.left,
      centerSideRight: sideStats.right,
      gridInfoRows: normalizeGridRows(grid, DEFAULT_DATA.gridInfoRows),
      appealEvents: normalizeAppealRows(appeal, DEFAULT_DATA.appealEvents),
      componentDistribution: toNamedValueArray(
        pickByPaths(component, ['list', 'items', 'records', 'data']) ??
          findArrayByKeywords(component, ['component', 'distribution']) ??
          component,
        DEFAULT_DATA.componentDistribution
      ),
      caseCount: lawCaseData.caseCount,
      caseRing: lawCaseData.caseRing
    }

    loading.value = false
  }

  onMounted(load)

  return {
    data,
    loading,
    error,
    load
  }
}
