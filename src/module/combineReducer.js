import { combineReducers } from 'redux';
import user from './userReducer'
import system from './systemReducer'

const appReducer = combineReducers({
    user,
    system
})

export default appReducer