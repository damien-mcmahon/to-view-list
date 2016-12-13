import { h, Component } from 'preact';
import { Link } from 'preact-router';

export default class Header extends Component {
	render() {
		return (
			<header class="toViewApp--header">
				<h1>To-View</h1>
			</header>
		);
	}
}
