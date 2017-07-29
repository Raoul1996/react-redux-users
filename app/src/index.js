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
import React from 'react'
import ReactDOM from 'react-dom'
//引入redux
import { Provider } from 'react-redux'
import configStore from './stores'
import RouterApp from './router'
const store = configStore()
import 'whatwg-fetch'
import 'babel-polyfill'
ReactDOM.render(
  <Provider store={store}>
    {RouterApp(store)}
  </Provider>,
  document.getElementById('app')
)