import {actionCreater, SET_USERINFO, SET_USERME, SET_USER_ROLE, CLEAN_USERME,IS_LOGINED} from './type'
import {message} from 'antd'
import * as requestService from '../utils/request'
import store from 'store2'
import API from '../api'
import {goto} from '../utils'
const ERR_OK = 0

/**
 * 登录验证
 * @header token
 */
export function tokenVerify() {
  return async (dispatch) =>{
    try{
      await requestService.tget(API.tokenVerify)
      await dispatch(actionCreater(IS_LOGINED))
    } catch (err) {
      dispatch(actionCreater(CLEAN_USERME))
      store.remove('rt_rx.token')
      store.remove('rt_rx.name')
      store.remove('rt_rx.id')
      store.remove('rt_rx.role')
      throw new Error("need login")
    }
  }

}

/**
 * 用户登录
 * @param body
 * @returns {function(*)}
 */
export function login(body) {
  return async dispatch => {
    try {
      const data = await requestService.post(API.login, body)
      // I wanna use store.js
      store.set('rt_rx.token', data.token)
      store.set('rt_rx.name', data.user.name)
      store.set('rt_rx.id', data.user.id)
      store.set('rt_rx.role', data.role)
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
 * 用户登出
 * @returns {function(*)}
 */
export function logout() {
  return async (dispatch) => {
    try {
      const data = await requestService.tget(API.logout)
      await dispatch(actionCreater(CLEAN_USERME))
      // TODO: store these as a obj?
      store.remove('rt_rx.token')
      store.remove('rt_rx.name')
      store.remove('rt_rx.id')
      store.remove('rt_rx.role')
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
      const data = await requestService.get(API.userMail, params)
      if (data.code === ERR_OK) {
        message.success('sen mail successfully')
        goto('/register/verify')
      }
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
        store.set('rt_rx.token', data.token)
        store.set('rt_rx.name', data.user.name)
        store.set('rt_rx.id', data.user.id)
        store.set('rt_rx.role', data.role)
        // I wanna use store2
        console.log(data)
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

/**
 * 忘记密码验证邮箱
 * @param param mail Address
 * @returns {function(*)}
 */
export function forgetPassword(param) {
  return async () => {
    try {
      const data = await requestService.get(API.forgotPassword, param)
        message.success('send mail successful')
        goto('/password/succ')
    } catch (err) {
      message.error('send mail failed')
      console.error(err)
    }
  }
}

/**
 * 找回密码
 * @param params verify code
 * @return {number}
 */
export function findPassword(params) {
  return setTimeout(async () => {
    try {
      const data = await requestService.post(API.findPassword, params)
        message.success('Update password successful')
      goto('/password/done')
    } catch (err) {
      console.error(err)
      goto('/password')
    }
  }, 2000)
}