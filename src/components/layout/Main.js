import React, { Component } from 'react';
import { Route, Redirect, Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon, Button, Popconfirm } from 'antd';
import { withCookies } from 'react-cookie';
import links from '../../constants/aside.constant';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { AsideBtnLogout } from "./AsideBtnLogout";
import AsideUserInfo  from "./AsideUserInfo";
import CustomHeader from './CustomHeader';
import logoImg from '../../assets/images/app-logo.png';
import './Main.scss';

const { Header, Footer, Sider, Content } = Layout;

class Main extends Component {

	isAuthenticated = false;

	constructor(props) {
		super(props);

		this.logout = this.logout.bind(this);
	}

	UNSAFE_componentWillMount() {
		const { cookies } = this.props;
		const token = cookies.get('token');
		const user = cookies.get('user');
		//console.log('token', token);
		this.isAuthenticated = !!token && !!user;

		if (this.isAuthenticated) {
			this.props.login(user, token);
		}
	}

	logout() {
		const { cookies } = this.props;
		cookies.remove('token', { path: '/' });
		this.props.history.push('/login');
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
									pathname: "/login",
									state   : { from: props.location }
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
					{
						links.map((c, index) => {
							if (c.path === '') {
								return <PrivateRoute key={index}
																		 component={c.component}
																		 exact
																		 path={`${this.props.match.path}/${c.path}`}/>
							}

							return <PrivateRoute key={index}
																	 component={c.component}
																	 path={`${this.props.match.path}/${c.path}`}/>
						})
					}
				</div>
			)
		};

		return (
			<Layout>
				<Sider
					style={{
						overflow: 'auto',
						height  : '100vh',
						position: 'fixed',
						left    : 0,
					}}
				>
					<div className="logo">
						<img src={logoImg}/>
					</div>

					<AsideUserInfo/>

					<Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
						{
							links.map((link, index) => {
								return (
									<Menu.Item key={index}>
										<Icon type={link.icon}/>
										<span className="nav-text">{link.title}</span>
										<Link to={`${this.props.match.path}/${link.path}`}/>
									</Menu.Item>
								)
							})
						}
					</Menu>

					<AsideBtnLogout/>
				</Sider>
				<Layout style={{ marginLeft: 250 }}>
					<CustomHeader/>
					<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
						<div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
							{renderContents()}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Click CPanel ©2019 Created by Appnet Technology</Footer>
				</Layout>
			</Layout>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps, actions)(withCookies(withRouter(Main)));
