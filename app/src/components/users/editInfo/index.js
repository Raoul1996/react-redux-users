import React, {Component} from 'react'
import {Form, Input, Button} from 'antd'
import {config} from './index.json'
import './index.less'

const FormItem = Form.Item

@Form.create()
class EditUserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading: false
        })
        this.props.action.updateUserInfo(values)
        this.setState({
          loading: true
        })
      }
    })
  }


  render() {
    const {user: {userMe}} = this.props
    const {title} = config
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {}
    return (
      <div className="user-info">
        <div className="">{title}</div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label='userName'
            {...formItemLayout}
            key="user-name"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: false
              }],
              initialValue: userMe.name || ''
            })(
              <Input
                placeholder="please input your userName"
                className="update-user-info-input"
              />
            )}
          </FormItem>
          <FormItem
            label='school'
            {...formItemLayout}
            key="school"
          >
            {getFieldDecorator('school', {
              rules: [{
                required: false
              }],
              initialValue: userMe.school || ''
            })(
              <Input
                placeholder="please input your userName"
                className="update-user-info-input"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={this.state.loading}
            >Edit</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default EditUserInfo