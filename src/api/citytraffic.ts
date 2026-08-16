import { requestData } from './http'

export type CityTrafficPayload = Record<string, unknown>

const cityTrafficBigscreenBase = '/citytraffic/bigscreen'

export const getCityTrafficParking = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/parking`)

export const getCityTrafficRoadOverview = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/road-overview`)

export const getCityTrafficPublicTransport = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/public-transport`)

export const getCityTrafficTaxi = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/taxi`)

export const getCityTrafficTrafficCompany = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/traffic-company`)

export const getCityTrafficPassengerShip = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/passenger-ship`)

export const getCityTrafficVehicle = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/vehicle`)

export type CityTrafficGoodsShipType = 1 | 2 | 3

export const getCityTrafficGoodsShip = <T = CityTrafficPayload>(params?: {
  type?: CityTrafficGoodsShipType
}) => requestData<T>(`${cityTrafficBigscreenBase}/goods-ship`, { params })

export type CityTrafficBusLineType = 1 | 2 | 3

export const getCityTrafficBusLine = <T = CityTrafficPayload>(params?: {
  type?: CityTrafficBusLineType
}) => requestData<T>(`${cityTrafficBigscreenBase}/bus-line`, { params })

export const getCityTrafficBusLinePage = <T = CityTrafficPayload>(params: {
  pageNo: number
  pageSize: number
}) => requestData<T>(`${cityTrafficBigscreenBase}/bus-line-page`, { params })

export const getCityTrafficBusLineDetail = <T = CityTrafficPayload>(params: { lineNo: string }) =>
  requestData<T>(`${cityTrafficBigscreenBase}/bus-line-detail`, { params })

export const getCityTrafficCongestion = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/congestion`)
export const getCityTrafficRoadWarning = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/road-warning`)
export const getCityTrafficBusRealtime = <T = CityTrafficPayload>(params: {
  pageNo: number
  pageSize: number
}) => requestData<T>(`${cityTrafficBigscreenBase}/bus-realtime`, { params })
export const cityTrafficApi = {
  getParking: getCityTrafficParking,
  getRoadOverview: getCityTrafficRoadOverview,
  getPublicTransport: getCityTrafficPublicTransport,
  getTrafficCompany: getCityTrafficTrafficCompany,
  getTaxi: getCityTrafficTaxi,
  getPassengerShip: getCityTrafficPassengerShip,
  getVehicle: getCityTrafficVehicle,
  getGoodsShip: getCityTrafficGoodsShip,
  getCongestion: getCityTrafficCongestion,
  getBusLinePage: getCityTrafficBusLinePage
}
