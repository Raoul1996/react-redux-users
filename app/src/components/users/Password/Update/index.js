import React, {Component} from 'react'
import {config} from './index.json'

class Update extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const props = this.props
    const {title} = config
    return (
      <div className="template">{title}</div>
    )
  }
}

export default Update