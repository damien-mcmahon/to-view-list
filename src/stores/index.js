import { createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(reducers, [thunk]);

export default store;
