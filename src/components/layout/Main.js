import React, { Component } from 'react';
import { Route, Redirect, Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon, Button, Popconfirm } from 'antd';
import { withCookies } from 'react-cookie';
import links from '../../constants/aside.constant';
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
		console.log('token', token);
		this.isAuthenticated = !!token;
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
					{
						links.map((c, index) => {
							if (c.path === '') {
								return <PrivateRoute key={index}
									component={c.component}
									exact
									path={`${this.props.match.path}/${c.path}`} />
							}

							return <PrivateRoute key={index}
								component={c.component}
								path={`${this.props.match.path}/${c.path}`} />
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
						height: '100vh',
						position: 'fixed',
						left: 0,
					}}
				>
					<div className="logo" />
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
						{
							links.map((link, index) => {
								return (
									<Menu.Item key={index}>
										<Icon type={link.icon} />
										<span className="nav-text">{link.title}</span>
										<Link to={`${this.props.match.path}/${link.path}`} />
									</Menu.Item>
								)
							})
						}
					</Menu>

					<Popconfirm
						placement="rightBottom"
						title="Thoát khỏi hệ thống?"
						onConfirm={this.logout}
						okText="Đồng ý"
						cancelText="Hủy"
					>
						<Button type="link" style={{ color: 'silver', marginLeft: '8.5px', marginTop: '60vh' }}>
							<Icon type="logout" />
							<span style={{ marginLeft: '8.5px' }}>Đăng xuất</span>
						</Button>
					</Popconfirm>
				</Sider>
				<Layout style={{ marginLeft: 250 }}>
					<Header style={{ background: '#fff', padding: 0 }} />
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
