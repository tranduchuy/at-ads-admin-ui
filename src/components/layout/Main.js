import React, { Component } from 'react';
import { Route, Redirect, Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import { withCookies } from 'react-cookie';
import links from '../../constants/aside.constant';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import AppLoading from "../app-loading/app-loading";
import AsideBtnLogout  from "./AsideBtnLogout";
import AsideUserInfo  from "./AsideUserInfo";
import CustomHeader from './CustomHeader';
import logoImg from '../../assets/images/app-logo.png';
import './Main.scss';

const { Footer, Sider, Content } = Layout;

class Main extends Component {

	constructor(props) {
		super(props);
	}

	isAuthenticated = false;

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

		const href            = window.location.href.split('?')[0];
		const position        = href.split("/");
		const currentPosition = position[position.length - 1];
		let page = '0';
		
		switch (currentPosition) {
			case 'update-expiration':
				page = '1';
				break;
			case 'users':
				page = '2';
				break;	
			case 'accounts':
				page = '3';
				break;
			case 'websites':
				page = '4';
				break;
			case 'google-ads-errors':
				page = '5';
				break;
			default:
				break;
		}

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
						<img alt="" src={logoImg}/>
					</div>

					<AsideUserInfo/>

					<Menu theme="dark" mode="inline" defaultSelectedKeys={[page]}>
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
				<AppLoading/>
			</Layout>
		);
	}
}

const mapStateToProps = state => ({
	users: state.users
});

export default connect(mapStateToProps, actions)(withCookies(withRouter(Main)));
