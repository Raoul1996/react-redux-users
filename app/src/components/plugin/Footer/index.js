import React from 'react'
import {config} from './index.json'
import './index.less'

const Footer = (props) => {
  const {title} = config

  return (
    <div className="footer" key="footer-1">
      <p>{title}</p>
    </div>
  )
}
export default Footer
