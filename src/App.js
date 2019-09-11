import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import LoginPage from './components/pages/Login';
import Main  from './components/layout/Main';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

function Root() {

	const renderDashboard = () => {
		return <Main />;
	};

	return (
		<CookiesProvider>
			<BrowserRouter>
				<Switch>
					<Route path="/login" component={LoginPage}/>
					<Route path="/dashboard"
								 render={renderDashboard}/>
				</Switch>
			</BrowserRouter>
		</CookiesProvider>
	)
}

export default Root;
