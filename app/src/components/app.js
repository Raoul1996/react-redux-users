import React, { Component } from 'react'
import { Link } from 'react-router'

import './app.less'
class AppComponent extends Component {
  render () {
    return (
      <div className="App">
        {this.props.children}
      </div>
    )
  }
}

export default AppComponent
