import { reduce } from './ActionObjectPathReduder'
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export const reducers = combineReducers({
  global : reduce,
  router : routerReducer
});
