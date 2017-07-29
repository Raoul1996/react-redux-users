export const SET_USERINFO = "SET_USERINFO"
export const SET_USERME = "SET_USERME"
export const  SET_USER_ROLE = "SET_USER_ROLE"

export const actionCreater = (type, payload = {}) => ({
  type: type,
  payload: payload
})