
import { applyMiddleware, createStore, ActionCreatorsMapObject, ActionCreator } from 'redux';
import { reducers } from './reducers';
import  thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import { LOGIN, LOGOUT } from './consts/Actions';
import { bindActionCreators } from 'redux'
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const routerMidd = routerMiddleware(history);

const localStorageMiddleware = store => next => action => {
  if (action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('auth', JSON.stringify(action.payload.auth));
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('auth', '');
  }
  next(action);
};

const getMiddleware = () => {
  return applyMiddleware(routerMidd,localStorageMiddleware,thunk);
};

export const store = createStore(reducers, getMiddleware());

export class StoreUtils { // Add store state typings somewhere !

  private static lsAuth(){
    let authStr = window.localStorage.getItem('auth')
    if (authStr){
      return JSON.parse(authStr);
    }
  }

  public static call(action){
    store.dispatch(action);
  }

  public static createActions(actions : ActionCreatorsMapObject){
    return bindActionCreators(actions,store.dispatch);
  }

  public static createAction(action : ActionCreator<any>){
    return bindActionCreators(action,store.dispatch);
  }

  public static getAuthentication(){
    return (store.getState() as any).global.auth || StoreUtils.lsAuth(); // remove this any ! use some strict typings.
  }

  public static getAuthToken(){
    return StoreUtils.getAuthentication() && StoreUtils.getAuthentication().token; // remove this any ! use some strict typings.
  }

  public static isAuthenticated(){
    let auth =  StoreUtils.getAuthentication()
    return auth !== undefined && auth.token !== undefined;
  }

  public static currentUser(){
    let auth = StoreUtils.getAuthentication();
    return auth !== undefined ? auth.name : '';
  }
}
