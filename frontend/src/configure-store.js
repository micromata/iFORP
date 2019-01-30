import appReducer from './reducers/app-reducer';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux';

const baseReducers = {
  app: appReducer
};

const configureStore = () => {
  const middlewares = [ reduxThunk, reduxLogger ];

  const composeEnhancers =
    (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
      compose;

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );

  const store = createStore(combineReducers(baseReducers), enhancer);

  store.asyncReducers = {};

  return store;
};

export { configureStore };
