import request from '@/utils/request'

export function getList() {
  return request({
    url: '/news/getAllNews',
    method: 'get'
  })
}

export function ListAdd(formData) {
  return request({
    url: '/news/addNews',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData
  })
}
export function ListDelete(Data) {
  return request({
    url: '/news/deleteNewsById?id=' + Data,
    method: 'delete',
    // headers: { 'Content-Type': 'multipart/form-data' },
    data: Data
  })
}
export function ListEdit(Data) {
  return request({
    url: '/news/updateNews',
    method: 'put',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: Data
  })
}