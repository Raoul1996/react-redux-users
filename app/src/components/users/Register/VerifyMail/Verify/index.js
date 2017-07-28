import React from 'react'
import config from '../index.json'

const Verify = (props) => {
  const {sent, active} = config.verify[0]
  return (
    <div>
      <p className="h-title" key="verify-mail-p-1">{sent} {props.email}</p>
      <p className="h-title" key="verify-mail-p-2">{active}</p>
    </div>
  )
}
export default Verify
