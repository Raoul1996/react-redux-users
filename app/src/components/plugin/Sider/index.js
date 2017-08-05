import React, {Component} from 'react'
import {config} from './index.json'
class Sider extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const props = this.props
    const {title} = config
    return (
      <div className="sider">{title}</div>
    )
  }
}

export default Sider