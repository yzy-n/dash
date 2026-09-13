import { requestData } from './http'

export function getPartyList() {
  return requestData('/partybuilding/bigscreen/twoneworgan', { method: 'GET' })
}
export function getChannelSourceList() {
  return requestData(`/appeal/bigscreen/channelsource`, { method: 'GET' })
}
