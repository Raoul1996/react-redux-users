import React, {Component} from 'react'
import {Icon} from 'antd'
import {pureRender} from '../utils'
import './app.less'
import 'babel-polyfill'
import Footer from './plugin/Footer'

@pureRender
class AppComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: true
    }
    this.onCollapseChange = this.onCollapseChange.bind(this)
  }

  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse
    })
  }

  render() {
    return (
      <div className="App">
        <div>{this.props.children}</div>
        <Footer/>
      </div>
    )
  }
}

export default AppComponent
