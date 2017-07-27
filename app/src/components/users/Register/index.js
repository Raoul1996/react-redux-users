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

import React, {Component} from 'react'
import {Button, Form, Input, Steps, Card, Icon, Tooltip, Row, Col, Checkbox} from 'antd'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import QueueAnim from 'rc-tween-one'
import Api from '../../../api'
import {verify} from '../../../utils'
import * as Request from '../../../utils/request'
import config from './index.json'
import './index.less'

const FormItem = Form.Item
const Step = Steps.Step
const mapStateToprops = () => ({})
const mapDispatchToProps = (dispatch) => {
  const actions = {userRegister}
}
@connect()
@Form.create()
class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checkAgreement: false,
      passwordDirty: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.refreshCaptcha = this.refreshCaptcha.bind(this)
    this.checkAgreement = this.checkAgreement.bind(this)
  }

  componentDidMount () {

  }

  checkPassword (rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback(config.message.errConfirm)
    } else {
      callback()
    }
  }

  refreshCaptcha () {
    console.log('click me!')
  }

  // TODO: I don't know the dirty's mean.
  handlePasswordBlur (e) {
    const value = e.target.validator
    this.setState({
      passwordDirty: this.state.passwordDirty || !!value
    })
  }

  checkAgreement (e) {
    this.setState({
      checkAgreement: e.target.checked
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // const {name,email,mobile,password,school,password_confirmation,captcha} = values
        const body = values
        this.props.action.userRegsiter(body)
      }
    })
  }

  render () {

    const {title, activeAccount, steps, form, message, agree, agreement, userAgreement, register} = config
    const {username, email, password, confirm, mobile, school, captcha} = form
    const {noUsername, noEmail, errEmail, limitPassword, noPassword, errConfirm, noMobile, errMobile, noSchool, noCaptcha} = message

    const {getFieldDecorator} = this.props.form

    const formItemLayout = {}
    return (
      <Card className="register">
        <QueueAnim type="bottom">
          <div className="register-header" key="register-header">
            <h1 className="register-header-title">{title}</h1>
            <Link to="">
              <Icon type="info-circle-o"/>{activeAccount}
            </Link>
          </div>
          <Steps
            current={0}
            className="register-steps"
            key="register-steps"
          >
            <Step title={steps[0].title}/>
            <Step title={
              <Tooltip title={steps[1].title}>
                <Link to="">{steps[1].link}</Link>
              </Tooltip>
            }/>
            <Step title={steps[2].title}/>
          </Steps>
          <QueueAnim
            onSubmit={this.handleSubmit}
            className="register-form"
            component="Form"
            type="bottom"
          >
            <FormItem
              label={username}
              hasFeedback
              {...formItemLayout}
              key="register-2"
            >
              {getFieldDecorator('name', {
                rules: [{required: true, message: noUsername}]
              })(<Input/>)}
            </FormItem>
            <FormItem
              label={email}
              {...formItemLayout}
              key="register-3"
            >
              {getFieldDecorator('email', {
                rules: [{pattern: verify.mail, message: errEmail}, {required: true, message: noEmail}]
              })(<Input/>)}
            </FormItem>
            <FormItem
              label={password}
              {...formItemLayout}
              hasFeedback
              key="register-4"
            >
              {getFieldDecorator('password', {
                rules: [{pattern: verify.password, message: limitPassword}, {required: true, message: noPassword}]
              })(<Input type="password" onBlur={this.handlePasswordBlur}/>)}
            </FormItem>
            <FormItem
              label={confirm}
              {...formItemLayout}
              hasFeedback
              key="register-5"
            >
              {getFieldDecorator('password_confirmation', {
                rules: [
                  {required: true, message: errConfirm},
                  {validator: this.checkPassword}]
              })(<Input type="password"/>)}
            </FormItem>
            <FormItem
              label={mobile}
              {...formItemLayout}
              hasFeedback
              key="register-6"
            >
              {getFieldDecorator('mobile', {
                rules: [{pattern: verify.mobile, message: errMobile}, {required: true, message: noMobile}]
              })(<Input/>)}
            </FormItem>
            <FormItem
              label={school}
              {...formItemLayout}
              key="register-7"
            >
              {getFieldDecorator('school', {
                rules: [{required: false, message: noSchool}]
              })(<Input/>)}
            </FormItem>
            <FormItem
              label={captcha}
              key="register-8">
              <Row type="flex">
                <Col>
                  {getFieldDecorator('captcha', {
                    rules: [{required: false, message: noCaptcha}]
                  })(<Input size="large"/>)}
                </Col>
                <Col>
                  <img
                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP19yH5U8FEdtwFM3Upj1DMPeeRgxBn15RzOW_NAlz2vMPMjIHjg'}
                    alt="register-captcha"
                    className="register-form-captcha"
                    onClick={this.refreshCaptcha}
                    key={'captcha'}
                  />
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row type="flex" align="center" key="register-9" className="register-form-footer">
                <Col xs={{span: 24}} sm={{span: 12}}>
                  <Checkbox onChange={this.checkAgreement}>
                    {agree}
                    {<Tooltip title={agreement}>
                      <span className="user-should-know">{userAgreement}</span>
                    </Tooltip>}
                  </Checkbox>
                </Col>
                <Col xs={{span: 24}} sm={{span: 12}}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    disabled={!this.state.checkAgreement}
                  >{register}</Button>
                </Col>
              </Row>
            </FormItem>
          </QueueAnim>
        </QueueAnim>
      </Card>
    )
  }
}

export default Register