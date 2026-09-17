import { requestData } from './http'
export function getPowervolume(params) {
  return requestData('/publicservice/bigscreen/powervolume', { method: 'GET', params })
}
export function getPowertype(params) {
  return requestData('/publicservice/bigscreen/powertype', { method: 'GET', params })
}
export function getReturnwork(params) {
  return requestData('/publicservice/bigscreen/returnwork', { method: 'GET', params })
}
export function getChargeboard(params) {
  return requestData('/publicservice/bigscreen/chargeboard', { method: 'GET', params })
}
export function getReportboard(params) {
  return requestData('/publicservice/bigscreen/reportboard', { method: 'GET', params })
}
