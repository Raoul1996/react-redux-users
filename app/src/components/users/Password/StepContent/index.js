import React from 'react'
import {config} from './index.json'
import {Link} from 'react-router'
import {Input} from 'antd'
import {messageInfo} from '../../../../config/message.json'

const StepContent = (props) => {
  const {sendSuccessful, active, success, back, willSend, limit} = config
  const {type, addonAfter, onInputChange} = props
  const {noEmail} = messageInfo
  // if the type is undefined or too long
  if (!!type && type.length > 10) {
    return null
  } else if (type === 'succ') {
    return (
      <div className="StepContent">
        <p className="h-title" key="verify-mail-p-1">{sendSuccessful}</p>
        <p className="h-title" key="verify-mail-p-2">{active}</p>
      </div>
    )
  } else if (type === 'done') {
    return (
      <div className="StepContent">
        <p className="h-title" key="verify-mail-p-1">{success}
          <Link to="/">{back}</Link>
        </p>
        <p className="h-title" key="verify-mail-p-2">{active}</p>
      </div>
    )
  } else {
    return (
      <div className="StepContent">
        <p className="h-title" key="verify-mail-p-1">{willSend}</p>
        <p className="h-title" key="verify-mail-p-2">{limit}</p>
        <div className="verify-mail-input" key="verify-mail-input">
          <Input
            placeholder={noEmail}
            addonAfter={addonAfter}
            onChange={onInputChange}
          />
        </div>
      </div>
    )
  }
}
export default StepContent
