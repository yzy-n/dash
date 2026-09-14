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
export function getHotProblemList(params: {
  hotDateType: 'year' | 'season' | 'month' | 'week' | 'day'
}) {
  return requestData('/appeal/bigscreen/hotproblem', { method: 'GET', params })
}
export function getEffectivenessAnalysis() {
  return requestData(`/appeal/bigscreen/effectivenessanalysis`, { method: 'GET' })
}
export function getRepaymentPeople() {
  return requestData(`/appeal/bigscreen/repaymentpeople`, { method: 'GET' })
}
export function getAcceptanceDeptParticipation() {
  return requestData(`/appeal/bigscreen/acceptancedeptparticipation`, { method: 'GET' })
}
export function getDepthVTop() {
  return requestData(`/appeal/bigscreen/depthvtop`, { method: 'GET' })
}
export function getEarlyWarningProblems() {
  return requestData(`/appeal/bigscreen/earlywarningproblems`, { method: 'GET' })
}
export function getHandlingQuality() {
  return requestData(`/appeal/bigscreen/handlingquality`, { method: 'GET' })
}
export function getReturnVisitSupervision() {
  return requestData(`/appeal/mobile/returnvisitsupervision`, { method: 'GET' })
}
