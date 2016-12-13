import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import App from './components/app';
import store from './stores';

render((
  <Provider store={store}>
    <App />
  </Provider>

), document.body);
