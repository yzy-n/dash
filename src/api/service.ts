import { requestData } from './http'
export function getPowervolume(params) {
  return requestData('/publicservice/bigscreen/powervolume', { method: 'GET', params })
}
export function getPowertype(params) {
  return requestData('/publicservice/bigscreen/powertype', { method: 'GET', params })
}
