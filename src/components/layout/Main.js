import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Header } from './Header';

function Index() {
	return <h2>Home</h2>;
}

function About() {
	return <h2>About</h2>;
}

function Users() {
	return <h2>Users</h2>;
}

export class Main extends Component {
	render() {
		return (
			<div>
				<Header/>

				<Route path={this.props.match.path} exact component={Index}/>
				<Route path={`${this.props.match.path}/about`} component={About}/>
				<Route path={`${this.props.match.path}/users`} component={Users}/>
			</div>
		);
	}
}
