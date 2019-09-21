import React from 'react';
import './App.scss';
import "antd/dist/antd.css";
import Main from './components/layout/Main';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import Login from './components/pages/Login/Login';

function Root() {

	const renderDashboard = () => {
		return <Main />;
	};

	return (
		<CookiesProvider>
			<BrowserRouter>
				<Switch>
					<Route path="/login" component={Login}/>
					<Route path="/dashboard"
								 render={renderDashboard}/>
					<Route path="/**" render={() => {
						return (
							<Redirect to={{
								pathname: "/dashboard"
							}}/>
						)
					}}/>
				</Switch>
			</BrowserRouter>
		</CookiesProvider>
	)
}

export default Root;
