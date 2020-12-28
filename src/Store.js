import { createStore } from 'redux';
import appReducer from './module/combineReducer';

const store = createStore(appReducer)

export default store;
