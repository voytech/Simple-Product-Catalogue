import { ActionObjectPathReduder } from './ActionObjectPathReduder'
import { combineReducers } from 'redux';

export const reducers = combineReducers({root : ActionObjectPathReduder.reduce});
