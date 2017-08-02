import React, { Component } from 'react'
//连接redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUserInfo } from '../actions'

import EditUserInfo from '../components/users/editInfo'

class DemoContainer extends Component {
  render () {
    const {demo: {data}, action: {getDemo}} = this.props
    return (
      <ReduxDemo
        data={data}
        getDemo={getDemo}
      />
    )
  }
}

// use ES7 Decorator 装饰器
// @connect(mapStateToProps,mapDispatchToProps)
// class DemoContainer extends Component {
//     render() {
//         const {demo:{data}, action:{getDemo}} = this.props;
//         return (
//             <ReduxDemo
//                 data={data}
//                 getDemo={getDemo}
//             />
//         );
//     }
// }

DemoContainer.propTypes = {}
DemoContainer.defaultProps = {}

const mapStateToProps = (state) => {
  return {
    demo: state.demo
  }

}
const mapDispatchToProps = (dispatch) => {
  const actions = {getDemo}
  return {
    action: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoContainer)
