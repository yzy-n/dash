import { requestData } from './http'
export function getAskList() {
  return requestData('/appeal/bigscreen/latestdemands', { method: 'GET' })
}
