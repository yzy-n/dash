import { requestData } from './http'

export type CityBigscreenPayload = Record<string, unknown>

const cityBigscreenBase = '/citymanage/bigscreen'

export type CityBigscreenSanitationType = 1 | 2 | 3

export const getCityBigscreenSanitation = <T = CityBigscreenPayload>(params?: {
  type?: CityBigscreenSanitationType
}) => requestData<T>(`${cityBigscreenBase}/sanitation`, { params })

export const getCityBigscreenPark = <T = CityBigscreenPayload>() =>
  requestData<T>(`${cityBigscreenBase}/park`)

export const getCityBigscreenLawCase = <T = CityBigscreenPayload>() =>
  requestData<T>(`${cityBigscreenBase}/law-case`)

export const getCityBigscreenLandArea = <T = CityBigscreenPayload>() =>
  requestData<T>(`${cityBigscreenBase}/land-area`)

export const getCityBigscreenGrid = <T = CityBigscreenPayload>() =>
  requestData<T>(`${cityBigscreenBase}/grid`)

export type CityBigscreenGreenlandType = 1 | 2 | 3

export const getCityBigscreenGreenland = <T = CityBigscreenPayload>(params?: {
  type?: CityBigscreenGreenlandType
}) => requestData<T>(`${cityBigscreenBase}/greenland`, { params })

export const getCityBigscreenFull = <T = CityBigscreenPayload>() =>
  requestData<T>(`${cityBigscreenBase}/full`)

export const getCityBigscreenEnergy = <T = CityBigscreenPayload>() =>
  requestData<T>(`${cityBigscreenBase}/energy`)

export const getCityBigscreenComponentDistribution = <T = CityBigscreenPayload>() =>
  requestData<T>(`${cityBigscreenBase}/component-distribution`)

export const getCityBigscreenCaseStatistics = <T = CityBigscreenPayload>() =>
  requestData<T>(`${cityBigscreenBase}/case-statistics`)

export const getCityBigscreenAppealList = <T = CityBigscreenPayload>(params: {
  pageNo: number
  pageSize: number
}) => requestData<T>(`${cityBigscreenBase}/appeal-list`, { params })

export const cityBigscreenApi = {
  getSanitation: getCityBigscreenSanitation,
  getPark: getCityBigscreenPark,
  getLawCase: getCityBigscreenLawCase,
  getLandArea: getCityBigscreenLandArea,
  getGrid: getCityBigscreenGrid,
  getGreenland: getCityBigscreenGreenland,
  getFull: getCityBigscreenFull,
  getEnergy: getCityBigscreenEnergy,
  getComponentDistribution: getCityBigscreenComponentDistribution,
  getCaseStatistics: getCityBigscreenCaseStatistics,
  getAppealList: getCityBigscreenAppealList
}
