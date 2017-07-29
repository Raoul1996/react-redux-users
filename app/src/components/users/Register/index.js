import React, {Component} from 'react'
import {Button, Form, Input, Steps, Card, Icon, Tooltip, Row, Col, Checkbox} from 'antd'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import QueueAnim from 'rc-tween-one'
import API from '../../../api'
import {verify} from '../../../utils'
import * as requestService from '../../../utils/request'
import {userRegister} from '../../../actions'
import config from './index.json'
import stepsConfig from './steps.json'
import messageInfo from './message.json'
import './index.less'

const FormItem = Form.Item
const Step = Steps.Step
const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => {
  const actions = {userRegister}
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checkAgreement: false,
      passwordDirty: false,
      captcha: '',
      captchaStamp: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.refreshCaptcha = this.refreshCaptcha.bind(this)
    this.checkAgreement = this.checkAgreement.bind(this)
    this.getCaptcha = this.getCaptcha.bind(this)
  }

  componentDidMount () {
    try {
      this.getCaptcha()
    } catch (err) {
      console.error(err)
    }
  }

  async getCaptcha () {
    try {
      const data = await requestService.get(API.register)
      await this.setState({
        captcha: data.url
      })
    } catch (err) {
      console.error(err)
    }
  }

  checkPassword (rule, value, callback) {
    const form = this.props.form
    const {errConfirm} = messageInfo
    if (value && value !== form.getFieldValue('password')) {
      callback(errConfirm)
    } else {
      callback()
    }
  }

  refreshCaptcha () {
    this.setState({
      captchaStamp: +new Date()
    })
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
        const {name, email, mobile, password, school, password_confirmation, captcha} = values
        const body = {name, email, mobile, password, school, password_confirmation, captcha}
        console.log(this.props)
        this.props.actions.userRegister(body)
      }
    })
  }

  render () {

    const {title, activeAccount, form, agree, agreement, userAgreement, register} = config
    const {steps} = stepsConfig
    const {username, email, password, confirm, mobile, school, captcha} = form
    const {noUsername, noEmail, errEmail, limitPassword, noPassword, errConfirm, noMobile, errMobile, noSchool, noCaptcha} = messageInfo

    const {getFieldDecorator} = this.props.form

    const formItemLayout = {}
    return (
      <Card className="register">
        <QueueAnim type="bottom">
          <div className="register-header" key="register-header">
            <h1 className="register-header-title">{title}</h1>
            <Link to="/register/active">
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
              <Tooltip title={steps[1].link}>
                <Link to="/register/active">{steps[1].title}</Link>
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
                    // src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP19yH5U8FEdtwFM3Upj1DMPeeRgxBn15RzOW_NAlz2vMPMjIHjg'}
                    src={`${this.state.captcha}?${this.state.captchaStamp}`}
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