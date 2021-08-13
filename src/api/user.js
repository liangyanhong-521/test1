import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login?username=' + data.username + '&password=' + data.password, // 用户登录后台接口地址的设计。
    method: 'get',
    data
  })
}

export function getInfo(TokenKey) {
  return request({
    url: '/user/test',
    method: 'post',
    params: { TokenKey }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
