/**
 * Created by out_xu on 16/12/20.
 */
import { combineReducers } from 'redux'

import demo from './demo.reducer'
import user from './user.reducer'
const rootReducer = combineReducers({
  demo,
  user
})

export default rootReducer
