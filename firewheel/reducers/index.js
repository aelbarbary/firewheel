import {combineReducers} from 'redux'
import habits from './habits'
import habitLogs from './habitLogs'

const rootReducer = combineReducers({
  habits, habitLogs
})

export default rootReducer
