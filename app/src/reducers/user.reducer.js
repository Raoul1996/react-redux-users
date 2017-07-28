import {SET_USERINFO} from '../actions/type'

const initUser = {
  userInfo: {}
}
export default function user (state = initUser, action) {
  switch (action.type) {
    case SET_USERINFO:
      return {
        ...state,
        userInfo: action.payload
      }
    default :
      return state
  }

}