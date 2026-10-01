import { requestData } from './http'
// 水环境质量：水质等级分布
export function getWaterQualityGrade() {
  return requestData('/weatherenvironment/bigscreen/waterqualitygrade', { method: 'GET' })
}
// 水环境质量：全省水质排名
export function getSurfaceWaterQualityTop() {
  return requestData('/weatherenvironment/bigscreen/surfacewaterqualitytop', { method: 'GET' })
}
// 大气达标数据信息（达标天数 + 达标天数比例）
export function getAtmosphericStandards() {
  return requestData('/weatherenvironment/bigscreen/atmosphericstandards', { method: 'GET' })
}
// 污染物监测（name：废水 / 废气）
export function getPolluteInfos(name: string) {
  return requestData(
    `/weatherenvironment/bigscreen/polluteinfos?name=${encodeURIComponent(name)}`,
    { method: 'GET' }
  )
}
// 空气质量实时（站点 AQI）
export function getAirQualityRealtime() {
  return requestData('/weatherenvironment/bigscreen/airqualityrealtime', { method: 'GET' })
}
// 实时天气（city：城市名，如"鞍山"）
export function getWeather(city: string) {
  return requestData(
    `/weatherenvironment/bigscreen/weather?city=${encodeURIComponent(city)}`,
    { method: 'GET' }
  )
}
// 环保专项资金（收入 / 支出结构图）
export function getCreditRepair(souseDate: string) {
  return requestData(
    `/weatherenvironment/bigscreen/creditrepair?souseDate=${encodeURIComponent(souseDate)}`,
    { method: 'GET' }
  )
}
// 生态行政处罚情况
export function getEnvProMoney() {
  return requestData('/weatherenvironment/bigscreen/envpromoney', { method: 'GET' })
}
// 12369 环保举报
export function getReport() {
  return requestData('/weatherenvironment/bigscreen/report', { method: 'GET' })
}
// 企业超标排放情况（pollutantname：污染物名称，如"氮氧化物"）
export function getPolluteInfoExt(pollutantname: string) {
  return requestData(
    `/weatherenvironment/bigscreen/polluteinfoext?pollutantname=${encodeURIComponent(pollutantname)}`,
    { method: 'GET' }
  )
}