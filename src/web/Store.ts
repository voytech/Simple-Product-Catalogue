
import { applyMiddleware, createStore } from 'redux';
import { reducers } from './reducers';
import  thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const routerMidd = routerMiddleware(history);

const getMiddleware = () => {
  /*if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware);
  } else {
    return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, createLogger())
  }*/
  return applyMiddleware(routerMidd,thunk);
};

export const store = createStore(reducers, getMiddleware());
