import React, {Component} from 'react'
import {Steps, Card, message} from 'antd'
import QueueAnim from 'rc-queue-anim'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {activeUser, sendActiveMail} from '../../../../actions'
import {goto, verify} from '../../../../utils'
import config from './index.json'
import {steps} from './steps.json'
import {messageInfo} from '../message.json'
import './index.less'
import Verify from './Verify'
import Active from './Active'

const Step = Steps.Step
const {submitSuccessful, errCaptcha, errEmail} = messageInfo

@connect(
  state => state.user,
  dispatch => bindActionCreators({activeUser, sendActiveMail}, dispatch)
)
class VerifyMail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      input: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onActiveSubmit = this.onActiveSubmit.bind(this)
    this.onVerifySubmit = this.onVerifySubmit.bind(this)
  }

  componentDidMount () {
    console.log(this.props.params)
    if (this.props.params.vcode) {
      const params = {
        verify_code: this.props.params.vcode
      }
      this.props.activeUser(params)
    }
  }

  onInputChange (e) {
    this.setState({
      input: e.target.value
    })
  }

  onVerifySubmit () {
    const {input} = this.state
    if (input.length === 6) {
      message.success(submitSuccessful)
      const params = {
        verify_code: input,
        user_id: this.props.userInfo.id
      }
      this.props.activeUser(params)
    } else {
      message.error(errCaptcha)
    }
  }

  onActiveSubmit () {
    const {input} = this.state
    if (!!input.match(verify.mail)) {
      message.success(submitSuccessful)
      const params = {
        email: input
      }
      this.props.sendActiveMail(params)
    } else {
      message.error(errEmail)
    }
  }

  render () {
    const {title, confirm} = config
    const {userInfo, route: {path}} = this.props
    const addonVerify = (<div onClick={this.onVerifySubmit} className="veriyf-mail-input-add">{confirm}</div>)
    const addonActive = (<div onClick={this.onActiveSubmit} className="veriyf-mail-input-add">{confirm}</div>)
    return (
      <Card className="verify-mail">
        <QueueAnim type="bottom">
          <div className="verify-mail-header" key="verify-mail-header">
            <h1 className="verify-mail-header-title">{title}</h1>
          </div>
          <Steps
            current={1}
            className="verify-mail-header-steps"
            key="verify-mail-header-steps"
          >
            <Step title={steps[0].title} onClick={() => {
              goto('register')
            }}/>
            <Step title={steps[1].title}/>
            <Step title={steps[2].title}/>
          </Steps>
          {
            path === 'verify'
              ? <Verify
                email={userInfo.email}
                addonAfter={addonVerify}
                onInputChange={this.onInputChange}
              />
              :
              <Active
                addonAfter={addonActive}
                onInputChange={this.onInputChange}
              />
          }
        </QueueAnim>
      </Card>
    )
  }
}


export default VerifyMail