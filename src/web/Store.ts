
import { applyMiddleware, createStore } from 'redux';
import { reducers } from './reducers';
import thunk from 'redux-thunk';

const getMiddleware = () => {
  /*if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware);
  } else {
    return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, createLogger())
  }*/
  return applyMiddleware(thunk);
};

export const store = createStore(reducers, getMiddleware());
