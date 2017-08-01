import React, {Component} from 'react'
import {Button, Form, Input} from 'antd'
import {verify} from '../../../../utils'
import {config} from './index.json'
import {form} from '../../../../config/label.json'
import {messageInfo} from '../../../../config/message.json'

const FormItem = Form.Item

@Form.create()
class Update extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
  }

  handlePasswordBlur(e) {
    const value = e.target.validator
    this.setState({
      passwordDirty: this.state.passwordDirty || !!value
    })
  }

  checkPassword(rule, value, callback) {
    const form = this.props.form
    const {errConfirm} = messageInfo
    if (value && value !== form.getFieldValue('password')) {
      callback(errConfirm)
    } else {
      callback()
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        const {new_password, new_password_confirmation} = values
        const params = {
          new_password, new_password_confirmation, verify_code: this.props.verifyCode
        }
        this.props.findPassword(params)
        this.setState({
          loading: false
        })
      }
    })
  }

  render() {
    const {loading} = this.state
    const {title, edit} = config
    const {password, confirm} = form
    const {limitPassword, noPassword, errConfirm} = messageInfo
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {}
    return (
      <div className="update-password">
        <h1 className="update-password-title">{title}</h1>
        <Form
          onSubmit={this.handleSubmit}
        >
          <FormItem
            label={password}
            hasFeedback
            {...formItemLayout}
            key="update-password-form-password"
          >
            {getFieldDecorator('new_password', {
              rules: [{
                pattern: verify.password, message: limitPassword
              }, {
                required: true, message: noPassword
              }]
            })(<Input type="password" onBlur={this.handlePasswordBlur}/>)}
          </FormItem>
          <FormItem
            label={confirm}
            {...formItemLayout}
            hasFeedback
            key="update-password-form-password_confirmation"
          >
            {getFieldDecorator('new_password_confirmation', {
              rules: [
                {required: true, message: errConfirm},
                {validator: this.checkPassword}]
            })(<Input type="password"/>)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >{edit}
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Update