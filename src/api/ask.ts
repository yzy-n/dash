import { requestData } from './http'

export function getAskList() {
  return requestData('/appeal/bigscreen/latestdemands', { method: 'GET' })
}
export function getDemandTypeList() {
  return requestData('/appeal/bigscreen/appealtrend', { method: 'GET' })
}
export function getYearTrendList() {
  return requestData('/appeal/bigscreen/annualanalysis', { method: 'GET' })
}
export function getAppealTypeAnalysisList() {
  return requestData('/appeal/bigscreen/appealtypeanalysis', { method: 'GET' })
}
export function getChannelSourceList() {
  return requestData(`/appeal/bigscreen/channelsource`, { method: 'GET' })
}
export function getHardWorkOrderList() {
  return requestData(`/appeal/bigscreen/difficultworkorder`, { method: 'GET' })
}

export function getHotlineStats(params: { period: 'year' | 'season' | 'month' | 'week' | 'day' }) {
  return requestData('/appeal/bigscreen/trafficdata', { method: 'GET', params })
}
export function getHotProblemList() {
  return requestData('/appeal/bigscreen/hotproblem', { method: 'GET' })
}
