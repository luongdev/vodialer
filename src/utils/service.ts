import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import { get, merge } from 'lodash-es'
import { getToken } from './cache/cookies'

function logout() {
  useUserStore().logout()
  location.reload()
}

function createService() {
  const service = axios.create()

  service.interceptors.request.use(
    (config) => config,

    (error) => Promise.reject(error)
  )

  service.interceptors.response.use(
    (response) => {
      const apiData = response.data

      const responseType = response.request?.responseType
      if (responseType === 'blob' || responseType === 'arraybuffer') return apiData

      const code = apiData.code

      if (code === undefined) {
        ElMessage.error('Interfaces other than this system')
        return Promise.reject(new Error('Interfaces other than this system'))
      }
      switch (code) {
        case 0:
          return apiData
        case 401:
          return logout()
        default:
          ElMessage.error(apiData.message || 'Error')
          return Promise.reject(new Error('Error'))
      }
    },
    (error) => {
      const status = get(error, 'response.status')
      switch (status) {
        case 400:
          error.message = 'Request Error'
          break
        case 401:
          logout()
          break
        case 403:
          error.message = '403'
          break
        case 404:
          error.message = '404'
          break
        case 408:
          error.message = '408'
          break
        case 500:
          error.message = '500'
          break
        case 501:
          error.message = '501'
          break
        case 502:
          error.message = '502'
          break
        case 503:
          error.message = '503'
          break
        case 504:
          error.message = '504'
          break
        case 505:
          error.message = '505'
          break
        default:
          break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const token = getToken()
    const defaultConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json'
      },
      timeout: 5000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}

const service = createService()
export const request = createRequest(service)
