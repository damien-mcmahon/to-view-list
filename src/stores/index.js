import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import persistState from 'redux-localstorage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const localStorageOptions = 'tvShows';
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk), persistState(localStorageOptions)));

export default store;
