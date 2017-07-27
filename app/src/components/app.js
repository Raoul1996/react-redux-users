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
/**
 * Created by out_xu on 17/3/16.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import {Button} from 'antd'
import logo from '../images/logo.svg'

import './app.less'
class AppComponent extends Component {
  render () {
    return (
      <div className="App">
        {this.props.children}
      </div>
    )
  }
}

export default AppComponent
