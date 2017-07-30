import {actionCreater, SET_USERINFO, SET_USERME, SET_USER_ROLE} from './type'
import {message} from 'antd'
import * as requestService from '../utils/request'
import store from 'store.js'
import API from '../api'
import {getLocalStorage, goto} from '../utils'

/**
 * 登录验证
 */


/**
 * 用户登录
 * @param body
 * @returns {function(*)}
 */
export function login(body) {
  return async dispatch => {
    try {
      const data = await requestService.post(API.login, body)
      window.localStorage.setItem('neuq_oj.token', data.token)
      window.localStorage.setItem('neuq_oj.name', data.user.name)
      window.localStorage.setItem('neuq_oj.id', data.user.id)
      window.localStorage.setItem('neuq_oj.role', data.role)
      // I wanna use store.js
      // TODO: 不清楚是不是可以工作
      // store.set('rt_rx.token', data.token)
      // store.set('rt_rx.name', data.name)
      // store.set('rt_rx.id', data.id)
      // store.set('rt_rx.role', data.role)
      await dispatch(actionCreater(SET_USERME, data.user))
      await dispatch(actionCreater(SET_USER_ROLE, data.role))
      message.success('login successful')
      goto('/register')
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 *用户注册
 * @param body request body
 * @returns {function(*)}
 */
export function userRegister(body) {
  return async dispatch => {
    try {
      const {email, mobile, name, school} = body
      let userInfo = {email, mobile, name, school}
      const data = await requestService.post(API.register, body)
      dispatch(actionCreater(SET_USERINFO, {
        ...userInfo,
        user_id: data.user_id
      }))
      goto('/register/verify')
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 *发送用户注册邮件
 * @param params
 * @returns {function()}
 * @constructor
 */
export function sendActiveMail(params) {
  return async () => {
    try {
      await requestService.get(API.userMail, params)
      goto('/register/verify')
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * 通过邮件激活用户
 * @param param captcha
 * @returns {function(*)}
 * @constructor
 */
export function activeUser(param) {
  return dispatch => {
    setTimeout(async () => {
      try {
        const data = await requestService.get(API.userActive, param)
        // set sth. to localStorage
        window.localStorage.setItem('neuq_oj.token', data.token)
        window.localStorage.setItem('neuq_oj.name', data.user.name)
        window.localStorage.setItem('neuq_oj.id', data.user.id)
        window.localStorage.setItem('neuq_oj.role', data.role)
        // I wanna use store.js
        console.log(data)
        // TODO: 不清楚是不是可以工作，因为我没闲着的邮箱了。
        console.log('must test the store.js')
        store.set('rt_rx.token', data.token)
        store.set('rt_rx.name', data.name)
        store.set('rt_rx.id', data.id)
        store.set('rt_rx.role', data.role)
        await dispatch(actionCreater(SET_USERME, data.user))
        await dispatch(actionCreater(SET_USER_ROLE, data.role))
        await goto('/register/actived')
        message.success('active successful')
      } catch (err) {
        message.error('verify link timeout')
        goto('/register/active')
        console.error(err)
      }
    }, 2000)
  }

}