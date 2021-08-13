import request from '@/utils/request'

export function getList() {
  return request({
    url: '/project/getAllProject',
    method: 'get'
  })
}
export function ListSelect(Data) {
  return request({
    url: '/project/getProjectById?id =' + Data.id,
    method: 'get',
    data: Data
  })
}

export function ListAdd(formData) {
  return request({
    url: '/project/addProject',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData
  })
}
export function ListDelete(Data) {
  return request({
    url: '/project/deleteProjectById?id=' + Data,
    method: 'delete',
    // headers: { 'Content-Type': 'multipart/form-data' },
    data: Data
  })
}
export function ListEdit(Data) {
  return request({
    url: '/project/updateProject',
    method: 'put',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: Data
  })
}
