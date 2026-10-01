import { requestData } from './http'
export function getSteelPrice(souseDate: string) {
  return requestData(`/economicoperation/bigscreen/steelprice?souseDate=${souseDate}`, {
    method: 'GET'
  })
}
export function getNationwide(year: string) {
  return requestData(`/economicoperation/bigscreen/nationwide?year=${year}`, { method: 'GET' })
}

export function getGrossRegional(year: string) {
  return requestData(`/economicoperation/bigscreen/grossregional?year=${year}`, {
    method: 'GET'
  })
}
export function getIndustrialAnalysis(souseDate: string) {
  return requestData(`/economicoperation/bigscreen/industrialanalysis?souseDate=${souseDate}`, {
    method: 'GET'
  })
}
export function getEconomicIndicatorsDName(souseDate: string) {
  return requestData(`/economicoperation/bigscreen/economicindicatorsdname?souseDate=${souseDate}`, {
    method: 'GET'
  })
}
// @/api/econ
export function getFixedInvestments(souseDate: string) {
  return requestData(`/economicoperation/bigscreen/fixedinvestments?souseDate=${souseDate}`, {
    method: 'GET'
  })
}
export function getParkProperty(souseDate: string) {
  return requestData(`/economicoperation/bigscreen/parkproperty?souseDate=${souseDate}`, {
    method: 'GET'
  })
}
export function getFourChanges(souseDate: string) {
  return requestData(`/economicoperation/bigscreen/fourchanges?souseDate=${souseDate}`, {
    method: 'GET'
  })
}
export function getEconomicIndicatorsIndustry(souseDate: string) {
  return requestData(
    `/economicoperation/bigscreen/economicindicatorsindustry?souseDate=${souseDate}`,
    { method: 'GET' }
  )
}
export function getEconomicIndicatorsPark(souseDate: string) {
  return requestData(
    `/economicoperation/bigscreen/economicindicatorspark?souseDate=${souseDate}`,
    { method: 'GET' }
  )
}
export function getEconomicBenefit(souseDate: string) {
  return requestData(
    `/economicoperation/bigscreen/economicbenefit?souseDate=${souseDate}`,
    { method: 'GET' }
  )
}
export function getVolumeForeignTrade(souseDate: string) {
  return requestData(`/economicoperation/bigscreen/volumeforeigntrade?souseDate=${souseDate}`, {
    method: 'GET'
  })
}
export function getResidentIncome(souseDate: string) {
  return requestData(`/economicoperation/bigscreen/residentincome?souseDate=${souseDate}`, {
    method: 'GET'
  })
}
export function getHouseholdConsumption(souseDate: string) {
  return requestData(`/economicoperation/bigscreen/householdconsumption?souseDate=${souseDate}`, {
    method: 'GET'
  })
}
export function getGdp() {
  return requestData('/economicoperation/bigscreen/gdp', { method: 'GET' })
}
export function getFiscalTaxRevenue() {
  return requestData('/economicoperation/bigscreen/fiscaltaxrevenue', { method: 'GET' })
}
export function getFiscalRevenue() {
  return requestData('/economicoperation/bigscreen/fiscalrevenue', { method: 'GET' })
}
export function getEachRegion(souseDate: string) {
  return requestData(`/economicoperation/bigscreen/eachregion?souseDate=${souseDate}`, { method: 'GET' })
}
// 社会消费品零售总额增速
export function getAmountGrowth(souseDate: string) {
  return requestData(
    `/economicoperation/bigscreen/amountgrowth?souseDate=${souseDate}`,
    { method: 'GET' }
  )
}
// 数字经济与服务业情况
export function getRentabilityAnalyseIndustry(souseDate: string) {
  return requestData(
    `/economicoperation/bigscreen/rentabilityanalyseindustry?souseDate=${souseDate}`,
    { method: 'GET' }
  )
}
// 价格监测（goodsType：1=农副产品，2=蔬菜）
export function getPrice(souseDate: string, goodsType: string | number) {
  return requestData(
    `/economicoperation/bigscreen/price?souseDate=${souseDate}&goodsType=${goodsType}`,
    { method: 'GET' }
  )
}
// 建筑业增加值增速
export function getConstruction(souseDate: string) {
  return requestData(
    `/economicoperation/bigscreen/construction?souseDate=${souseDate}`,
    { method: 'GET' }
  )
}
// 商品房交易情况（type：1=新房，2=二手房）
export function getCondo(souseDate: string, type: string | number) {
  return requestData(
    `/economicoperation/bigscreen/condo?souseDate=${souseDate}&type=${type}`,
    { method: 'GET' }
  )
}