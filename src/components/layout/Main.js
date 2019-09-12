import React, { Component } from 'react';
import { Route, Redirect, Link } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import { withCookies } from 'react-cookie';

const { Header, Footer, Sider, Content } = Layout;

class DemoPage extends Component {
	render() {

		console.log('Demo page');

		return (
			<h1>Hello world</h1>
		)
	}
}

const links = [
	{
		title    : 'Demo page',
		path     : 'demo',
		icon     : 'user',
		component: DemoPage
	}
];

class Main extends Component {

	isAuthenticated = false;

	constructor(props) {
		super(props);
	}

	UNSAFE_componentWillMount() {
		const { cookies } = this.props;
		const token = cookies.get('token');
		console.log('token', token);
		this.isAuthenticated = !!token;
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
				links.map((c, index) => {
					return <PrivateRoute key={index} component={c.component} path={`/dashboard/${c.path}`}/>
				})
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
					<div className="logo"/>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
						{
							links.map((link, index) => {
								return (
									<Menu.Item key={index}>
										<Icon type={link.icon}/>
										<span className="nav-text">{link.title}</span>
										<Link to={`/dashboard/${link.path}`}/>
									</Menu.Item>
								)
							})
						}
					</Menu>
				</Sider>
				<Layout style={{ marginLeft: 200 }}>
					<Header style={{ background: '#fff', padding: 0 }}/>
					<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
						<div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
							{renderContents()}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default withCookies(Main);
