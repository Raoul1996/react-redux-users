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
    } catch (err) {
      console.log(err)
    }
  }
}