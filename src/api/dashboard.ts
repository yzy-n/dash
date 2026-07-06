import { requestData } from './http'

export type KpiData = {
  onlineDevices: number
  alarms: number
  throughput: number
}

export const getKpis = () => requestData<KpiData>('/api/dashboard/kpis')
