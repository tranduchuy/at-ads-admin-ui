import React, { Component } from 'react';
import { Route, Redirect, Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import { withCookies } from 'react-cookie';
import links from '../../constants/aside.constant';
const { Header, Footer, Sider, Content } = Layout;

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
				<div>
					{
						links.map((c, index) => {
							if (c.path === '') {
								return <PrivateRoute key={index} component={c.component} exact path={`${this.props.match.path}/${c.path}`}/>
							}

							return <PrivateRoute key={index} component={c.component} path={`${this.props.match.path}/${c.path}`}/>
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
					<div className="logo"/>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
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

export default withCookies(withRouter(Main));
