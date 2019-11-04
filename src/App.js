import React from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import Main from './components/layout/Main';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';
import Login from './components/pages/Login/Login';
import store from './store';
import { Provider } from 'react-redux';
import NetworkService from './services/network-service';
import AppLoading from './components/app-loading/app-loading';
import { getLoggedInInfo } from './services/user.service';
import { COOKIE_NAMES } from './constants/cookie-names';

NetworkService.setupInterceptors(store);

function Root() {
  const renderDashboard = () => {
    return (
      <>
        <Main />
      </>
    );
  };

  const [checkToken, setCheckToken] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  if (checkToken === false) {
    getLoggedInInfo(cookies.token).then(res => {
      setCheckToken(true);
      if (res.data.data.user) {
        setCookie(COOKIE_NAMES.user, res.data.data.user, {domain: '/'});
      }
    }).catch(err => {
      removeCookie(COOKIE_NAMES.token, {domain: '/'});
      removeCookie(COOKIE_NAMES.user, {domain: '/'})
      setCheckToken(true);
    });
  }

  if (!checkToken) {
    return <></>;
  }

  return (
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/dashboard' render={renderDashboard} />
            <Route
              path='/**'
              render={() => {
                return (
                  <Redirect
                    to={{
                      pathname: '/dashboard'
                    }}
                  />
                );
              }}
            />
          </Switch>
          <AppLoading />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  );
}

export default Root;
