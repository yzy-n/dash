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
export function getInstalledcapacity(params) {
  return requestData('/publicservice/bigscreen/installedcapacity', { method: 'GET', params })
}
export function getUrbanfacilities(params) {
  return requestData('/publicservice/bigscreen/urbanfacilities', { method: 'GET', params })
}
export function getNaturalgas(params) {
  return requestData('/publicservice/bigscreen/naturalgas', { method: 'GET', params })
}
export function getWaterboard(params) {
  return requestData('/publicservice/bigscreen/waterboard', { method: 'GET', params })
}
export function getCruciformsociety(params) {
  return requestData('/publicservice/bigscreen/cruciformsociety', { method: 'GET', params })
}
export function getStationbuild(params) {
  return requestData('/publicservice/bigscreen/stationbuild', { method: 'GET', params })
}
export function getHeatboard(params) {
  return requestData('/publicservice/bigscreen/heatboard', { method: 'GET', params })
}
export function getAedcondition(params) {
  return requestData('/publicservice/bigscreen/aedcondition', { method: 'GET', params })
}
