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

export const getCityBigscreenGreenland2 = <T = CityBigscreenPayload>(params?: {
  type?: CityBigscreenGreenlandType
}) => requestData<T>(`${cityBigscreenBase}/greenland-area`, { params })
export const getCityBigscreenGreenland = <T = CityBigscreenPayload>(params?: {
  type?: CityBigscreenGreenlandType
}) => requestData<T>(`${cityBigscreenBase}/greenland`, { params })

export const getCityBigscreenFull = <T = CityBigscreenPayload>() =>
  requestData<T>(`${cityBigscreenBase}/full`)

export const getCityBigscreenEnergy = <T = CityBigscreenPayload>(params?: { limit?: number }) =>
  requestData<T>(`${cityBigscreenBase}/street-light`, { params })

export const getCityBigscreenCaseStatisticsByArea = <T = CityBigscreenPayload>(params: {
  areaName: string
}) => requestData<T>(`${cityBigscreenBase}/case-statistics-by-area`, { params })

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
  getGreenlandArea: getCityBigscreenGreenland2,
  getFull: getCityBigscreenFull,
  getEnergy: getCityBigscreenEnergy,
  getCaseStatisticsByArea: getCityBigscreenCaseStatisticsByArea,
  getComponentDistribution: getCityBigscreenComponentDistribution,
  getCaseStatistics: getCityBigscreenCaseStatistics,
  getAppealList: getCityBigscreenAppealList
}
