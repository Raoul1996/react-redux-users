import {SET_USERINFO, SET_USERME, SET_USER_ROLE, CLEAN_USERME, IS_LOGINED} from '../actions/type'

const initUser = {
  userInfo: {}
}
export default function user(state = initUser, action) {
  switch (action.type) {
    case SET_USERINFO:
      return {
        ...state,
        userInfo: action.payload
      }
    case SET_USERME:
      return {
        ...state,
        userMe: action.payload,
        isLogin: true,
        role: user
      }
    case SET_USER_ROLE:
      return {
        ...state,
        role: action.payload
      }
    case CLEAN_USERME:
      return {
        ...state,
        userMe: {},
        isLogin: false,
        role: ''
      }
    case IS_LOGINED:
      return {
        ...state,
        isLogin: true
      }
    default :
      return state
  }

}