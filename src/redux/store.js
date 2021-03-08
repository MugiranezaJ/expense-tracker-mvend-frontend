import thunk from 'redux-thunk'
import RootReducer from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'

const initialState = {};
const middlewares = [thunk];
let devtools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : x => x

if (
  process.env.NODE_ENV !== "production" &&
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const Store = createStore(
  RootReducer,
  initialState,
  compose(applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default Store