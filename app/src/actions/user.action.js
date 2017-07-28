//  
//                                  _oo8oo_
//                                 o8888888o
//                                 88" . "88
//                                 (| -_- |)
//                                 0\  =  /0
//                               ___/'==='\___
//                             .' \\|     |// '.
//                            / \\|||  :  |||// \
//                           / _||||| -:- |||||_ \
//                          |   | \\\  -  /// |   |
//                          | \_|  ''\---/''  |_/ |
//                          \  .-\__  '-'  __/-.  /
//                        ___'. .'  /--.--\  '. .'___
//                     ."" '<  '.___\_<|>_/___.'  >' "".
//                    | | :  `- \`.:`\ _ /`:.`/ -`  : | |
//                    \  \ `-.   \_ __\ /__ _/   .-` /  /
//                =====`-.____`.___ \_____/ ___.`____.-`=====
//                                  `=---=`
//  
//  
// 
//                          佛祖保佑         永无bug
//                          
// 
import {actionCreater, SET_USERINFO,SET_USERME,SET_USER_ROLE} from './type'
import {message} from 'antd'
import * as requestService from '../utils/request'

import API from '../api'
import {getLocalStorage, goto} from '../utils'

/**
 *用户注册
 * @param body request body
 * @returns {function(*)}
 */
export function userRegister (body) {
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
export function sendActiveMail (params) {
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
export function activeUser (param) {
  return dispatch => {
    setTimeout(async () => {
      try {
        const data = await requestService.get(API.userActive, param)
        // set sth. to localStorage
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