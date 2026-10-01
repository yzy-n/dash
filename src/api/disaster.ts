import { requestData } from './http'
// 应急救援队伍 & 公益救援队伍 统计
export function getEmergencyRescue() {
  return requestData('/disaster/bigscreen/emergencyrescue', { method: 'GET' })
}
// 应急救援物资（type：1=救灾物资，2=医疗防疫物资）
export function getRescueMaterials(type: string | number) {
  return requestData(
    `/disaster/bigscreen/rescuematerials?type=${type}`,
    { method: 'GET' }
  )
}
export function getEmergencySite() {
  return requestData('/disaster/bigscreen/emergencysite', { method: 'GET' })
}
// 资金保障（收入 / 支出）
export function getFinancialGuarantee() {
  return requestData('/disaster/bigscreen/financialguarantee', { method: 'GET' })
}
// 顶部五个灾害统计卡片
export function getReliefStats() {
  return requestData('/disaster/bigscreen/reliefstats', { method: 'GET' })
}
// 气象灾害预警
export function getDamageWarning() {
  return requestData('/disaster/bigscreen/damagewarning', { method: 'GET' })
}
// 专项整治行动（type：1 燃气安全，2/3 备用）
export function getSpecialActions(type: string | number) {
  return requestData(
    `/disaster/bigscreen/specialactions?type=${type}`,
    { method: 'GET' }
  )
}
// 灾后建设成效
export function getBuildEffect() {
  return requestData('/disaster/bigscreen/buildeffect', { method: 'GET' })
}
// 森林防火能力
export function getForestFireStack() {
  return requestData('/disaster/bigscreen/forestfirestack', { method: 'GET' })
}