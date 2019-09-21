import React from "react";
import { Component } from "react";
import { Select } from 'antd';
import { API } from "../../../constants/api";
import { withCookies } from 'react-cookie';
import { Form, Icon, Input, Button, Col, Row } from 'antd';

const { Option } = Select;

class ExpirationUpdating extends Component {

	cookies;
	token;

	constructor(props) {
		super(props);

		this.cookies = this.props.cookies;
		this.token = this.cookies.get('token');

		this.state = {
			packages: [],
			selectedPackage: {
				_id: ''
			},
			updatingMessage: {
				message: '',
				isSucceed: true
			}
		}

		this.handleChangePackage = this.handleChangePackage.bind(this);
	}

	componentDidMount() {
		this.getPackages();
	}

	getPackages() {
		fetch(API.getPackages, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'accessToken': this.token
			}
		}).then(res => {
			return res.json();
		}).then(json => {
			const packages = json.data.packages.sort((a, b) => {
				return a.numOfDays - b.numOfDays;
			});

			this.setState({
				packages,
				selectedPackage: {
					_id: packages[0]._id
				}
			});
		})
	}

	handleChangePackage(value) {
		this.setState({
			selectedPackage: {
				_id: value
			}
		});
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const params = {
					packageId: this.state.selectedPackage._id,
					code: values.code
				}
				this.checkWebsiteCode(params);
			}
		});
	};

	checkWebsiteCode(params) {
		const url = API.checkWebsiteCode.replace('{code}', params.code);

		fetch(url, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'accessToken': this.token
			}
		})
			.then(res => {
				if (res.status === 200)
					return Promise.resolve(res.json());
				return Promise.reject(res.json());
			})
			.then(
				resolve => {
					this.setState({
						domain: resolve.data.domain
					});
					this.updateVipDomain(params);
				},
				reject => reject.then(
					res => {
						this.setState({
							updatingMessage: {
								message: res.messages[0],
								isSucceed: false
							}
						})
					})
			)
	}

	updateVipDomain(params) {
		fetch(API.updateVipDomain, {
			method: 'PUT',
			body: JSON.stringify(params),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"accessToken": this.token
			}
		})
			.then(res => {
				if (res.status === 200)
					return Promise.resolve(res.json());
				return Promise.reject(res.json());
			})
			.then(
				resolve => {
					this.setState({
						updatingMessage: {
							message: resolve.messages[0],
							isSucceed: true
						}
					})
				},
				reject => reject.then(
					res => {
						this.setState({
							updatingMessage: {
								message: res.essages[0],
								isSucceed: false
							}
						})
					})
			)
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const headerTitleStyle = {
			'textAlign': 'center',
			'padding': '20px 0'
		};
		const formStyle = {
			'border': '1px solid #E0E0E1',
			'padding': '20px',
			'borderRadius': '5px',
			'textAlign': 'left',
		}
		const selectedPackage = this.state.selectedPackage._id || (this.state.packages.length > 0 ? this.state.packages[0]._id : '');
		const updatingMessageColor = this.state.updatingMessage.isSucceed ? '#44b543' : 'red';

		return (
			<div>
				<Row><h2 style={headerTitleStyle}>CẬP NHẬT THỜI HẠN SỬ DỤNG</h2></Row>
				<Row>
					<Col span={9}></Col>
					<Col span={6}>
						<Form
							onSubmit={this.handleSubmit}
							style={formStyle}
							className="update-expiration-form">

							<Form.Item>
								<label>
									Gói:
									<Select
										value={selectedPackage}
										style={{ width: '100%' }}
										placeholder="Chọn gói"
										onChange={this.handleChangePackage}>
										{
											this.state.packages.map((item, index) => {
												return <Option value={item._id} key={index}>{item.name} - {item.numOfDays} ngày</Option>
											})
										}
									</Select>
								</label>
							</Form.Item>

							<Form.Item>
								{getFieldDecorator('code', {
									rules: [{ required: true, message: 'Vui lòng nhập mã website' }],
								})(
									<Input
										prefix={<Icon type="qrcode" style={{ color: 'rgba(0,0,0,.25)' }} />}
										placeholder="Mã website"
									/>,
								)}
							</Form.Item>

							<p style={{ color: updatingMessageColor, textAlign: 'center' }}>{this.state.updatingMessage.message}</p>
							<p>{this.state.domain ? `Domain: ${this.state.domain.domain}` : ''}</p>

							<Form.Item>
								<div style={{ textAlign: 'center' }}>
									<Button type="primary"
										htmlType="submit"
										className="login-form-button">
										Cập nhật
									</Button>
								</div>
							</Form.Item>

						</Form>
					</Col>
					<Col span={9}></Col>
				</Row>
			</div>
		)
	}
}

const UpdateExpirationForm = Form.create({ name: 'update_expiration' })(ExpirationUpdating);
export default withCookies(UpdateExpirationForm);
