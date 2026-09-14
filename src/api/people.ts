import { requestData } from './http'

export function getPopu() {
  return requestData('/population/bigscreen/popu', { method: 'GET' })
}
export function getUrbanRural() {
  return requestData('/population/bigscreen/urbanrural', { method: 'GET' })
}
export function getTownPopu(date: string) {
  return requestData(`/population/bigscreen/townpopu?souseDate=${date}`, { method: 'GET' })
}
export function getAreaPopu() {
  return requestData('/population/bigscreen/areapopu', { method: 'GET' })
}
export function getScaleDensity() {
  return requestData('/population/bigscreen/scaledensity', { method: 'GET' })
}
export function getHouseScale() {
  return requestData('/population/bigscreen/housescale', { method: 'GET' })
}
