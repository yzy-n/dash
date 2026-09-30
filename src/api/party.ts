import { requestData } from './http'

export function getExcellentBranch() {
  return requestData('/partybuilding/bigscreen/excellentbranch', { method: 'GET' })
}
export function getExcellentBranchInfo() {
  return requestData(`/partybuilding/bigscreen/excellentbranchinfo`, { method: 'GET' })
}
export function getStarBranchInfo() {
  return requestData(`/partybuilding/bigscreen/starbranchinfo`, { method: 'GET' })
}
export function getStarBranch() {
  return requestData('/partybuilding/bigscreen/starbranch', { method: 'GET' })
}
export function getRecruitPartyMembers(type: string) {
  return requestData(`/partybuilding/bigscreen/recruitpartymembers?type=${type}`, { method: 'GET' })
}
export function getTalentPolicy(type: string) {
  return requestData(`/partybuilding/bigscreen/talentpolicy?type=${type}`, { method: 'GET' })
}
export function getOrganizaSituation(type: string) {
  return requestData(`/partybuilding/bigscreen/organizasituation?type=${type}`, { method: 'GET' })
}
export function getIdealService() {
  return requestData('/partybuilding/bigscreen/idealservice', { method: 'GET' })
}
export function getMemberSex() {
  return requestData('/partybuilding/bigscreen/membersex', { method: 'GET' })
}
export function getMemberAge(type: string) {
  return requestData(`/partybuilding/bigscreen/memberage?type=${type}`, { method: 'GET' })
}
export function getMemberTrade() {
  return requestData('/partybuilding/bigscreen/membertrade', { method: 'GET' })
}
export function getMemberTopStats() {
  return requestData('/partybuilding/bigscreen/membertopstats', { method: 'GET' })
}
export function getServiceCentre() {
  return requestData('/partybuilding/bigscreen/servicecentre', { method: 'GET' })
}

export function getTwoNewOrgan() {
  return requestData('/partybuilding/bigscreen/twoneworgan', { method: 'GET' })
}
