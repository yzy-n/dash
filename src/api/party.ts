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
