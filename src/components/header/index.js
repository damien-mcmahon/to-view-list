import { h, Component } from 'preact';
import { Link } from 'preact-router';
import TVIcon from '../icon';

export default class Header extends Component {
	render() {
		return (
			<header class="to-view-app--header">
        <TVIcon iconName="tv-logo" class="header--app-logo"/>
				<h1 class="header--app-title">To-View List</h1>
			</header>
		);
	}
}
