import React, {Component} from 'react'

class Template extends Component {
  render () {
    const {data, getDemo} = this.props

    return (
      <p>this is the template</p>
    )
  }
}

Template.propTypes = {}
Template.defaultProps = {}

export default Template
