import React, { Component } from 'react'
//连接redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUserInfo } from '../actions'

import EditUserInfo from '../components/users/editInfo'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }

}
const mapDispatchToProps = (dispatch) => {
  const actions = {updateUserInfo}
  return {
    action: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserInfo)
