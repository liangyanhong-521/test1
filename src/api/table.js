import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function postList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'post',
    params
  })
}
