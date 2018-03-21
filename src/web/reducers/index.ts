import { reduce } from './global'
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export const reducers = combineReducers({
  global : reduce,
  router : routerReducer
});
