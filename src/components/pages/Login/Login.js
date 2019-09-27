import React, { Component } from 'react';
import { Form, Icon, Input, Button, Col, Row } from 'antd';
import { withCookies } from 'react-cookie';
import { API } from '../../../constants/api';
import './Login-style.scss';

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
							cookies.set('token', resolve.data.meta.token, { path: '/' });

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

		return (
			<div>
				<Row>
					<Col span={9}></Col>
					<Col span={6}>
						<Form onSubmit={this.handleSubmit}
							className="login-form">

							<div className="form-title">Click CPanel</div>

							<div className="logo">
								<img src={require('../../../assets/images/app-logo.png')} alt="..." />
							</div>

							<Form.Item>
								{getFieldDecorator('email', {
									rules: [{ required: true, message: 'Vui lòng nhập email' }],
								})(
									<Input
										prefix={<Icon type="user" />}
										placeholder="Email"
									/>,
								)}
							</Form.Item>

							<Form.Item>
								{getFieldDecorator('password', {
									rules: [{ required: true, message: 'Vui lòng nhập mật khẩu' }],
								})(
									<Input
										prefix={<Icon type="lock" />}
										type="password"
										placeholder="Mật khẩu"
									/>,
								)}
							</Form.Item>

							<p style={{ color: 'red', textAlign: 'center' }}>{this.state.loginMessage}</p>

							<Form.Item>
								<div style={{ textAlign: 'center' }}>
									<Button
										type="danger"
										htmlType="submit"
										className="login-form-button">
										ĐĂNG NHẬP
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

const mapStateToProps = state => {
	return {
		user: user
	}
}


