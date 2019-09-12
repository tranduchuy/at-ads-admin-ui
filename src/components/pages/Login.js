import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Col, Row } from 'antd';
import { withCookies } from 'react-cookie';

class Login extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const { cookies } = this.props;
		const token = cookies.get('token');
		if (token) {
			setTimeout(() => {
				this.props.history.push("/dashboard");
			}, 1000);
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}

			// TODO: call api login
			fetch('http://localhost:3000/api/admin/users/login', {
				method: 'POST',
				body: JSON.stringify({
					email: 'admin@gmail.com',
					password: '!master2019'
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			}).then(response => {
				return response.json()
			}).then(json => {
				const { cookies } = this.props;
				cookies.set('token', json.data.meta.token);

				setTimeout(() => {
					this.props.history.push("/dashboard");
				}, 1000);
			});
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const headerTitleStyle = {
			'textAlign': 'center',
			'padding': '20px 0'
		};

		return (
			<div>
				<Row>
					<Col span={9}></Col>
					<Col span={6}>
						<h2 style={headerTitleStyle}>Click CPanel</h2>
					</Col>
					<Col span={9}></Col>
				</Row>
				<Row>
					<Col span={9}></Col>
					<Col span={6}>
						<Form onSubmit={this.handleSubmit}
							className="login-form">
							<Form.Item>
								{getFieldDecorator('username', {
									rules: [{ required: true, message: 'Please input your username!' }],
								})(
									<Input
										prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
										placeholder="Username"
									/>,
								)}
							</Form.Item>
							<Form.Item>
								{getFieldDecorator('password', {
									rules: [{ required: true, message: 'Please input your Password!' }],
								})(
									<Input
										prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
										type="password"
										placeholder="Password"
									/>,
								)}
							</Form.Item>
							<Form.Item>
								<div style={{ textAlign: 'center' }}>
									<Button type="primary"
										htmlType="submit"
										className="login-form-button">
										Log in
									</Button>
								</div>
							</Form.Item>
						</Form>
					</Col>
					<Col span={9}></Col>
				</Row>
			</div>
		);
	}
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default withCookies(WrappedNormalLoginForm);
