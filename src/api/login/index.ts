import { request } from '@/utils/service'
import type * as Login from './types/login'

export function getLoginCodeApi() {
  return request<Login.LoginCodeResponseData>({
    url: 'login/code',
    method: 'get'
  })
}

export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: 'users/login',
    method: 'post',
    data
  })
}

export function getUserInfoApi() {
  return request<Login.UserInfoResponseData>({
    url: 'users/info',
    method: 'get'
  })
}
