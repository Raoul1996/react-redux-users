

import {codeHelper} from '../utils'
const TIMEOUT = 15000
import store from 'store2'
function filterStatus (json) {
  if (json.code === 0) {
    return json.data
  } else if (json.code === 1004) {
    store.remove('rt_rx.token')
    store.remove('rt_rx.name')
    store.remove('rt_rx.id')
    store.remove('rt_rx.role')
    throw new Error('Did not Login')
  } else {
    throw new Error('ResponseUnexpected', codeHelper(json.code))
  }
}

/**
 * 参数拼接
 * @param uri
 * @param params
 * @returns {*}
 */
function parseParams (uri, params) {
  const paramsArray = []
  Object.keys(params).forEach(key => params[key] && paramsArray.push(`${key}=${params[key]}`))
  if (uri.search(/\?/) === -1) {
    uri += `?${paramsArray.join('&')}`
  } else {
    uri += `&${paramsArray.join('&')}`
  }
  return uri
}

export async function request (uri, type = 'GET', headers = {}, body = {}) {
  const timer = await setTimeout(() => {
    throw new Error('fetch time out')
  }, TIMEOUT)
  const fetchOption = {
    method: type,
    headers
  }
  if (type === 'POST') {
    fetchOption.body = JSON.stringify(body)
  }
  const res = await fetch(uri, fetchOption)
  const json = await res.json()

  clearTimeout(timer)
  return filterStatus(json)
}

/**
 * get 请求
 * @param uri api url
 * @param params 参数拼接
 * @param headers 请求头部
 * @returns {*}
 */
export function get (uri, params, headers) {
  if (params) {
    uri = parseParams(uri, params)
  }
  return request(uri, 'GET', headers)
}

export function tget (uri, params, headers) {
  if (params) {
    uri = parseParams(uri, params)
  }
  headers = {
    ...headers,
    token: store.get('rt_rx.token')
  }
  return request(uri, 'GET', headers)
}

/**
 * post 请求
 * @param uri api url
 * @param body 请求 body
 * @param headers 请求头部
 * @returns {*}
 */
export function post (uri, body, headers = {}) {
  if (!headers['Content-type']) {
    headers['Content-type'] = 'application/json'
  }
  return request(uri, 'POST', headers, body)
}

export function tpost (uri, body, headers = {}) {
  if (!headers['Content-type']) {
    headers['Content-type'] = 'application/json'
  }
  headers = {
    ...headers,
    token: store.get('rt_rx.token')
  }
  return request(uri, 'POST', headers, body)
}
