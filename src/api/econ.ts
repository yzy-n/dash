import { requestData } from './http'
export function getSteelPrice(souseDate: string) {
  return requestData(`/economicoperation/bigscreen/steelprice?souseDate=${souseDate}`, {
    method: 'GET'
  })
}
