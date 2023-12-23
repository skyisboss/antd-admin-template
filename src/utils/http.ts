import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { message } from 'antd'

const baseURL = '/admin/api'
const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    'x-session-platform-code': 'casino_plat',
    'content-type': 'application/json;charset=UTF-8',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    console.log(config)
    // 在请求发送之前做一些处理 // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['X-Token'] = 'fox2021'
    return config
  },
  err => {
    console.log(err)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const {
      data,
      config: { url },
      status,
    } = response
    if (status !== 200) {
      message.error('状态错误')
      console.warn('状态错误', url)
    }
    if (data?.err === 500) {
      message.error('请求eg错误')
      console.warn('请求错误', url)
    }

    return data
  },
  error => {
    return Promise.reject(new Error(error.message))
  },
)

export default instance

/**
 * 通用的列表返回值
 */
interface IResponse<T = any> {
  err?: number
  msg?: string
  success?: boolean
  rows?: T
  data?: T
  total?: number
}
interface IResponseList<T = any> extends Omit<IResponse, 't'> {
  rows?: T[]
  total?: number
}
/**
 * 通用http请求
 * @param config
 * @returns
 */
export function makeRequest<T = any, R = undefined>(config: AxiosRequestConfig & { noToast?: boolean }) {
  return instance.request<T, R extends 'list' ? IResponseList<T> : IResponse<T>>(config)
}
