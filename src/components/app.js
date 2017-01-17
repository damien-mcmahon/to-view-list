import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider, connect } from 'preact-redux';

import Header from './header';
import Home from '../containers/home';
import About from '../containers/about';
import Calendar from '../containers/calendar';

import style from '../style';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
          <About path="/about" />
          <Calendar path="/calendar" />
				</Router>
			</div>
		);
	}
}
