import React from 'react'
import {Input} from 'antd'
import {config} from './index.json'
import {messageInfo} from '../../message.json'

const Active = (props) => {
  const {text, notice} = config
  const {noEmail} = messageInfo
  console.log(config)
  return (
    <div>
      <p className="h-title" key="verify-mail-p-1">{text}</p>
      <p className="h-title" key="verify-mail-p-2">{notice}</p>
      <div className="verify-mail-input" key="verify-mail-input">
        <Input
          placeholder={noEmail}
          addonAfter={props.addonAfter}
          onChange={props.onInputChange}
        />
      </div>
    </div>
  )
}
export default Active
