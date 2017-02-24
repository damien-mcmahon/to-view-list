import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import App from './components/app';
import store from './stores';
import runtime from 'offline-plugin/runtime';

runtime.install();

render((
  <Provider store={store}>
    <App />
  </Provider>

), document.body);
