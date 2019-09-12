import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Col, Row } from 'antd';
import { withCookies } from 'react-cookie';
import { API } from '../../constants/api';

class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loginMessage: ''
		};
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
				//console.log('Received values of form: ', values);
				const params = {
					email: values.email,
					password: values.password
				}

				fetch(API.login, {
					method: 'POST',
					body: JSON.stringify(params),
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					}
				})
					.then(res => {
						if (res.status === 200)
							return Promise.resolve(res.json());
						return Promise.reject(res.json());
					})
					.then(
						resolve => {
							const { cookies } = this.props;
							cookies.set('token', resolve.data.meta.token);

							setTimeout(() => {
								this.props.history.push("/dashboard");
							}, 1000);
						},
						reject => reject.then(
							res => {
								this.setState({
									loginMessage: res.messages[0]
								});
							})
					)
			}
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
								{getFieldDecorator('email', {
									rules: [{ required: true, message: 'Vui lòng nhập email' }],
								})(
									<Input
										prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
										placeholder="Email"
									/>,
								)}
							</Form.Item>

							<Form.Item>
								{getFieldDecorator('password', {
									rules: [{ required: true, message: 'Vui lòng nhập mật khẩu' }],
								})(
									<Input
										prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
										type="password"
										placeholder="Mật khẩu"
									/>,
								)}
							</Form.Item>

							<p style={{ color: 'red', textAlign: 'center' }}>{this.state.loginMessage}</p>

							<Form.Item>
								<div style={{ textAlign: 'center' }}>
									<Button type="primary"
										htmlType="submit"
										className="login-form-button">
										Đăng nhập
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
