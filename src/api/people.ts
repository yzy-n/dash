import { requestData } from './http'

export function getPopu(souseDate: string) {
  return requestData(`/population/bigscreen/popu?souseDate=${souseDate}`, { method: 'GET' })
}
export function getUrbanRural(souseDate: string) {
  return requestData(`/population/bigscreen/urbanrural?souseDate=${souseDate}`, {
    method: 'GET'
  })
}
export function getTownPopu(date: string) {
  return requestData(`/population/bigscreen/townpopu?souseDate=${date}`, { method: 'GET' })
}
export function getAreaPopu(souseDate: string) {
  return requestData(`/population/bigscreen/areapopu?souseDate=${souseDate}`, { method: 'GET' })
}
export function getScaleDensity(souseDate: string) {
  return requestData(`/population/bigscreen/scaledensity?souseDate=${souseDate}`, { method: 'GET' })
}
export function getHouseScale(souseDate: string) {
  return requestData(`/population/bigscreen/housescale?souseDate=${souseDate}`, { method: 'GET' })
}

// ⭐ 性别构成
export function getSexStructure(params: { area: string; souseDate: string }) {
  const query = new URLSearchParams(params).toString()
  return requestData(`/population/bigscreen/sexstructure?${query}`, { method: 'GET' })
}

// ⭐ 计划生育
export function getFamilyPlanning(params: { area: string; souseDate: string }) {
  const query = new URLSearchParams(params).toString()
  return requestData(`/population/bigscreen/familyplanning?${query}`, { method: 'GET' })
}

// ⭐ 年龄构成
export function getAgeStructure(params: { area: string; souseDate: string }) {
  const query = new URLSearchParams(params).toString()
  return requestData(`/population/bigscreen/agestructure?${query}`, { method: 'GET' })
}
// ⭐ 机械变动
export function getMobileChanges(params: { area: string; souseDate: string }) {
  const query = new URLSearchParams(params).toString()
  return requestData(`/population/bigscreen/mobilechanges?${query}`, { method: 'GET' })
}
// ⭐ 教育水平
export function getEduLevel(souseDate: string) {
  return requestData(`/population/bigscreen/edulevel?souseDate=${encodeURIComponent(souseDate)}`, {
    method: 'GET'
  })
}
// ⭐ 基本养老保险
export function getBaseEndIns(souseDate: string) {
  return requestData(
    `/population/bigscreen/baseendins?souseDate=${encodeURIComponent(souseDate)}`,
    { method: 'GET' }
  )
}
// ⭐ 残疾人 - 类型统计
export function getHandicapType(souseDate: string) {
  return requestData(
    `/population/bigscreen/handicaptype?souseDate=${encodeURIComponent(souseDate)}`,
    { method: 'GET' }
  )
}

// ⭐ 残疾人 - 年龄段统计
export function getHandicapAge(souseDate: string) {
  return requestData(
    `/population/bigscreen/handicapage?souseDate=${encodeURIComponent(souseDate)}`,
    { method: 'GET' }
  )
}

// ⭐ 残疾人 - 性别统计
export function getHandicapSex(souseDate: string) {
  return requestData(
    `/population/bigscreen/handicapsex?souseDate=${encodeURIComponent(souseDate)}`,
    { method: 'GET' }
  )
}

// ⭐ 残疾人 - 户口统计
export function getHandicapInhabitant(souseDate: string) {
  return requestData(
    `/population/bigscreen/handicapinhabitant?souseDate=${encodeURIComponent(souseDate)}`,
    { method: 'GET' }
  )
}
// ⭐ 自然变动情况
export function getNaturalChange(souseDate: string) {
  return requestData(
    `/population/bigscreen/naturalchange?souseDate=${encodeURIComponent(souseDate)}`,
    { method: 'GET' }
  )
}
// ⭐ 婚姻情况
export function getMaritalStatus(souseDate: string) {
  return requestData(
    `/population/bigscreen/maritalstatus?souseDate=${encodeURIComponent(souseDate)}`,
    { method: 'GET' }
  )
}
// ⭐ 社会救助情况
export function getSingleData(souseDate: string) {
  return requestData(
    `/population/bigscreen/singledata?souseDate=${encodeURIComponent(souseDate)}`,
    { method: 'GET' }
  )
}
