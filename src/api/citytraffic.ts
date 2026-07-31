import { requestData } from './http'

export type CityTrafficPayload = Record<string, unknown>

const cityTrafficBigscreenBase = '/citytraffic/bigscreen'

export const getCityTrafficParking = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/parking`)

export const getCityTrafficRoadOverview = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/road-overview`)

export const getCityTrafficPublicTransport = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/public-transport`)

export const getCityTrafficPassengerShip = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/passenger-ship`)

export const getCityTrafficVehicle = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/vehicle`)

export const getCityTrafficGoodsShip = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/goods-ship`)

export const getCityTrafficCongestion = <T = CityTrafficPayload>() =>
  requestData<T>(`${cityTrafficBigscreenBase}/congestion`)

export const cityTrafficApi = {
  getParking: getCityTrafficParking,
  getRoadOverview: getCityTrafficRoadOverview,
  getPublicTransport: getCityTrafficPublicTransport,
  getPassengerShip: getCityTrafficPassengerShip,
  getVehicle: getCityTrafficVehicle,
  getGoodsShip: getCityTrafficGoodsShip,
  getCongestion: getCityTrafficCongestion
}
