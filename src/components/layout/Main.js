import React, { Component } from 'react';
import { Route, Redirect, Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { withCookies } from 'react-cookie';
import links from '../../constants/aside.constant';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { COOKIE_NAMES } from '../../constants/cookie-names';
import AsideBtnLogout from './AsideBtnLogout';
import AsideUserInfo from './AsideUserInfo';
import CustomHeader from './CustomHeader';
import logoImg from '../../assets/images/app-logo.png';
import './Main.scss';

const { Footer, Sider, Content } = Layout;

class Main extends Component {
  isAuthenticated = false;

  isLoggedIn() {
    const { cookies } = this.props;
    const token = cookies.get(COOKIE_NAMES.token);
    const user = cookies.get(COOKIE_NAMES.user);

    if (this.props.users.isLogout) {
      return false;
    }

    return token && user;
  }

  componentWillMount() {
    const { cookies } = this.props;

    if (!this.isLoggedIn()) {
      cookies.remove(COOKIE_NAMES.token);
      cookies.remove(COOKIE_NAMES.user);
      this.isAuthenticated = false;
    } else {
      this.isAuthenticated = true;
    }
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={props =>
            this.isAuthenticated ? (
              <Component {...props} />
            ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }}
                />
              )
          }
        />
      );
    };

    const renderContents = () => {
      return (
        <div>
          {links.map((c, index) => {
            return (
              <PrivateRoute
                key={index}
                exact={c.path === ''}
                component={c.component}
                path={`${this.props.match.path}/${c.path}`}
              />
            );
          })}
        </div>
      );
    };

    const href = window.location.href.split('?')[0];
    const position = href.split('/');
    const currentPosition = position[position.length - 1];
    let page = '0';

    switch (currentPosition) {
      case 'users':
        page = '1';
        break;
      case 'packages':
        page = '2';
        break;
      case 'orders':
        page = '3';
        break;
      case 'accounts':
        page = '4';
        break;
      case 'websites':
        page = '5';
        break;
      case 'google-ads-errors':
        page = '6';
        break;
      default:
        break;
    }

    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            backgroundColor: 'white'
          }}
        >
          <div className='logo'>
            <div className="app-name">Chống Click Tặc</div>
            <img alt='' src={logoImg} />
            <p className="role">Administrator</p>
          </div>

          <AsideUserInfo />

          <Menu theme='light' mode='inline' defaultSelectedKeys={[page]}>
            {links.map((link, index) => {
              return (
                <Menu.Item key={index}>
                  <Icon type={link.icon} />
                  <span className='nav-text'>{link.title}</span>
                  <Link to={`${this.props.match.path}/${link.path}`} />
                </Menu.Item>
              );
            })}
          </Menu>

          <AsideBtnLogout />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <CustomHeader />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div
              style={{ padding: 24, background: '#fff', textAlign: 'center' }}
            >
              {renderContents()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Chống Click Tặc - Admin ©2019 Powered by Appnet Technology
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  actions
)(withCookies(withRouter(Main)));
