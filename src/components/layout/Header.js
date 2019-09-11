import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
	render() {
		return (
			<nav>
				<ul>
					<li>
						<Link to="/dashboard">Home</Link>
					</li>
					<li>
						<Link to="/dashboard/about/">About</Link>
					</li>
					<li>
						<Link to="/dashboard/users/">Users</Link>
					</li>
				</ul>
			</nav>
		)
	}
}
