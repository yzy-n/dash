import { requestData } from './http'
export function getDeclaration() {
  return requestData('/businessenvironment/bigscreen/declaration', { method: 'GET' })
}
export function getGrandTotal() {
  return requestData('/businessenvironment/bigscreen/grandtotal', { method: 'GET' })
}
export function getGeneralAtters() {
  return requestData('/businessenvironment/bigscreen/generalatters', { method: 'GET' })
}
export function getAverageProcessingTime() {
  return requestData('/businessenvironment/bigscreen/averageprocessingtime', { method: 'GET' })
}
export function getOneThing() {
  return requestData('/businessenvironment/bigscreen/onething', { method: 'GET' })
}
export function getOverdue() {
  return requestData('/businessenvironment/bigscreen/overdue', { method: 'GET' })
}
export function getAnnouncement() {
  return requestData('/businessenvironment/bigscreen/announcement', { method: 'GET' })
}
export function getFileCity() {
  return requestData('/businessenvironment/bigscreen/filecity', { method: 'GET' })
}
export function getFile() {
  return requestData('/businessenvironment/bigscreen/file', { method: 'GET' })
}
export function getMatterTop() {
  return requestData('/businessenvironment/bigscreen/mattertop', { method: 'GET' })
}
export function getLiaoshitong() {
  return requestData('/businessenvironment/bigscreen/liaoshitong', { method: 'GET' })
}
export function getEvaluation() {
  return requestData('/businessenvironment/bigscreen/evaluation', { method: 'GET' })
}
export function getProcess() {
  return requestData('/businessenvironment/bigscreen/process', { method: 'GET' })
}
export function getLicense() {
  return requestData('/businessenvironment/bigscreen/license', { method: 'GET' })
}
