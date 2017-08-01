import React, {Component} from 'react'
import {Form, Icon, Button, Tooltip, Input} from 'antd'
import {Link} from 'react-router'
import QueueAnim from 'rc-queue-anim'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {login} from '../../../actions'
import {config} from './index.json'
import {messageInfo} from '../../../config/message.json'
import './index.less'
import {goto, verify} from '../../../utils'

const FormItem = Form.Item
const ButtonGroup = Button.Group

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => {
  const actions = {login}
  return {action: bindActionCreators(actions, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {identifier, password} = values
        const body = {identifier, password}
        this.props.action.login(body)
      }
    })

  }

  render() {
    const {getFieldDecorator} = this.props.form
    const formLayout = {}
    const {login} = this.state
    const {title, tooltip, links} = config
    const {register, forget} = links
    const {noLoginIdentifier, limitPassword, noPassword} = messageInfo
    return (
      <div className="user-login-wrapper">
        <QueueAnim
          type="bottom"
          delay={150}
        >
          <div className="login-header">
            <h1 className="login-header-title">{title}</h1>
          </div>
          <div className="login-form">
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formLayout}
              >
                <Tooltip
                  title={tooltip}
                  placement="top"
                  tigger={['focus']}
                >
                  {getFieldDecorator('identifier', {
                    rules: [{
                      required: true, message: noLoginIdentifier
                    }]
                  })(<Input
                    addonBefore={<Icon type="user"/>}
                    placeholder={noLoginIdentifier}
                  />)}
                </Tooltip>
              </FormItem>
              <FormItem
                {...formLayout}
              >
                {getFieldDecorator('password', {
                  rules: [{
                    pattern: verify.password, message: limitPassword
                  }, {
                    required: true, message: noPassword
                  }]
                })(<Input
                  type="password"
                  addonBefore={<Icon type="lock"/>}
                  placeholder={noPassword}
                />)}
              </FormItem>

              <Button
                className="login-form-button"
                disabled={false}
                type="primary"
                htmlType="submit"
              >Login</Button>
            </Form>
          </div>
          <div className="login-links"><Link to={'/register'}>
            {register}
          </Link>
            <Link to={'/forget'}>
              {forget}
            </Link></div>
        </QueueAnim>
      </div>
    )
  }
}

export default Login