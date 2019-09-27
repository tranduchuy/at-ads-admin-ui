import React from 'react';
import './App.scss';
import "antd/dist/antd.css";
import Main from './components/layout/Main';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import Login from './components/pages/Login/Login';
import store from './store';
import { Provider } from 'react-redux';

function Root() {

	const renderDashboard = () => {
		return <Main />;
	};

	return (
		<CookiesProvider>
			<BrowserRouter>
				<Provider store={store}>
					<Switch>
						<Route path="/login" component={Login} />
						<Route path="/dashboard"
							render={renderDashboard} />
						<Route path="/**" render={() => {
							return (
								<Redirect to={{
									pathname: "/dashboard"
								}} />
							)
						}} />
					</Switch>
				</Provider>
			</BrowserRouter>
		</CookiesProvider>
	)
}

export default Root;
