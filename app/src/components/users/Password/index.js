import React, {Component} from 'react'
import {Steps, Card} from 'antd'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import QueueAnmi from 'rc-queue-anim'

import {config} from './index.json'
import {steps} from './steps.json'
import {findPassword, forgetPassword} from '../../../actions'
import './index.less'
import StepContent from './StepContent'
import Update from './Update'

const Step = Steps.Step

@connect(
  state => ({}),
  dispatch => bindActionCreators({findPassword, forgetPassword}, dispatch)
)
class Password extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
    this.sendVerifyMail = this.sendVerifyMail.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  sendVerifyMail(e) {
    e.preventDefault()
    this.props.forgetPassword({email: this.state.input})
  }

  onInputChange(e) {
    e.preventDefault()
    this.setState = {
      input: e.target.value
    }
  }

  render() {
    const {params: {type}} = this.props
    const {title, send} = config
    const {verify, change, done} = steps
    const current = {
      'succ': 0,
      'update': 1,
      'done': 2
    }
    const addonAfter = <div onClick={this.sendVerifyMail} className="verify-mail-input-add">{send}</div>
    return (
      <Card className="forget-password">
        <QueueAnmi>
          <div className="forget-password-header">
            <h1 className="forget-password-header-title">{title}</h1>
            {/* the current attr is to ctrl which step will be show, in this component we use the params in url. */}
            <Steps
              current={current[type] || 0}
              className="forget-password-header-steps"
              key="forget-password-header-steps"
            >
              <Step title={verify}/>
              <Step title={change}/>
              <Step title={done}/>
            </Steps>
            <StepContent
              type={type}
              addonAfter={addonAfter}
              onInputChange={this.onInputChange}
            />
            {!!type && type.length > 10 &&
            <Update
              verifyCode={type}
              findPassword={findPassword}
            />
            }
          </div>
        </QueueAnmi>
      </Card>
    )
  }
}

export default Password