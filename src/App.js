import React from 'react';
import './App.css';
import { Login as LoginPage } from './components/pages/Login';
import { Main } from './components/layout/Main';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function AppRouter() {

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={LoginPage}/>
				<Route path="/dashboard" component={Main}/>
			</Switch>
		</BrowserRouter>
	)
}

export default AppRouter;
