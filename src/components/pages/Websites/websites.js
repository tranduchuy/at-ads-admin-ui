import React, { Component } from 'react';
import { Row, Col, Table, Input, Button, Icon, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import { withCookies } from 'react-cookie';
import { API } from '../../../constants/api';
import moment from 'moment';
import './websites-style.scss';

export class AdwordAccounts extends Component {

	cookies;
	token;

	constructor(props) {
		super(props);

		this.cookies = this.props.cookies;
		this.token = this.cookies.get('token');

		this.state = {
			searchText: '',
			accounts: [],
			totalItems: 0,
			page: 1,
			limit: 10
		}
	}

	componentDidMount() {
		this.getWebsites({
			page: this.state.page,
			limit: this.state.limit
		});
	}

	getColumnSearchProps = dataIndex => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={node => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, dataIndex, confirm)}
					style={{ width: 188, marginBottom: 8, display: 'block' }} autoFocus
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, dataIndex, confirm)}
					icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
					Reset
				</Button>
			</div>
		),
		filterIcon: filtered => (
			<Icon type="search" style={{ color: filtered ? '#f2f2f2' : undefined }} />
		)
	});

	handleSearch = (selectedKeys, dataIndex, confirm) => {
		confirm(); // hide panel search

		if (selectedKeys[0])
			this.getWebsites({ [dataIndex]: selectedKeys[0] });

		this.setState({ searchText: selectedKeys[0] });
	};

	handleReset = clearFilters => {
		clearFilters();
		this.setState({ searchText: '' });
	};

	onChangePage(currentPage) {
		if (this.state.totalItems > this.state.limit) {
			this.getWebsites({
				page: currentPage,
				limit: this.state.limit
			});
		}
		else {
			if (!this.state.searchText)
				this.getWebsites({
					page: currentPage,
					limit: this.state.limit
				});
		}

		this.setState({ page: currentPage });
	}

	isEmptyObj = obj => Object.keys(obj).length === 0;

	getWebsites(param) {
		let url = API.getWebsites;

		if (!this.isEmptyObj(param)) {
			url += '?';

			for (const key in param) {
				if (param.hasOwnProperty(key)) {
					url += `&${key}=${param[key]}`;
				}
			}
		}

		fetch(url, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'accessToken': this.token
			}
		}).then(res => {
			return res.json();
		}).then(json => {
			let accounts = (json.data.entries || [])
				.map(item => {
					return {
						domain     : item.domain,
						isTracking : item.isTracking,
						adsId      : item.accountInfo ? item.accountInfo.adsId : "",
						email      : item.userInfo ? item.userInfo.email : "",
						expiredAt  : item.expiredAt,
						createdAt  : item.createdAt,
						code       : item.code,
						websiteCode: item.code
					}
				});

			this.setState({
				accounts,
				totalItems: accounts.length > 0 ? json.data.totalItems : 0
			});
		})
	}

	onClickRecheckWebsite(record) {
		console.log(record);
	}

	render() {

		const accountColumns = [
			{
				title: (filter, sortOrder) => {
					return (
						<div>
							<Icon type="chrome" className="ggAds-icon" />
							<span>Domain</span>
						</div>
					)
				},
				dataIndex: 'domain',
				key: 'domain',
				render: (text, record) => {
					return (
						<div>
							<Tooltip placement="topLeft" title="Kiểm tra gắn mã">
								<span className="recheck-website-tracking"
									onClick={() => this.onClickRecheckWebsite(record)}
								>
									<Icon type="reload" />
								</span>
							</Tooltip>
							

							<a href={text} 
								target=" _blank" 
								style={{ color: record.isTracking ? '#44b543' : 'crimson', fontFamily: 'tahoma' }}>
								{text}
								</a>
						</div>
					)
				},
			},
			{
				title: 'Code',
				dataIndex: 'websiteCode',
				key: 'websiteCode',
				render: text => {
					return (
						<span>{text}</span>
					)
				}
			},
			{
				title: 'Gắn tracking',
				dataIndex: 'isTracking',
				key: 'isTracking',
				render: text => {
					if (text === true)
						return (
							<span style={{ color: '#44b543' }}>
								<Icon type="check" /> Đã gắn
							</span>
						);
					return (
						<span style={{ color: 'crimson' }}>
							<Icon type="close" /> Chưa gắn
						</span>
					);
				}
			},
			{
				title: 'AdsId',
				dataIndex: 'adsId',
				key: 'adsId',
				...this.getColumnSearchProps('adsId'),
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
				...this.getColumnSearchProps('email'),
			},
			{
				title: 'Ngày hết hạn',
				dataIndex: 'expiredAt',
				key: 'expiredAt',
				render: text => {
					if(text)
						return (
							<span>{moment(text).format('HH:mm DD/MM/YYYY')}</span>
						);
					return (
						<span></span>
					);
				}
			},
			{
				title: 'Ngày thêm',
				dataIndex: 'createdAt',
				key: 'createdAt',
				render: text => {
					return (
						<span>{moment(text).format('HH:mm DD/MM/YYYY')}</span>
					)
				}
			},
			{
				title: '',
				dataIndex: 'code',
				key: 'code',
				render: text => {
					const host = `/dashboard/update-expiration?code=${text}`;
					return (
						<Link to={host}><Button type="primary" >Nâng cấp domain</Button></Link>
					)
				}
			},
		];

		return (
			<div className="container">
				<Row>
					<Col span={24}>
						<Table pagination={{
							position: 'bottom',
							total: this.state.totalItems,
							pageSize: this.state.limit,
							current: this.state.page,
							onChange: (currentPage) => this.onChangePage(currentPage)
						}}
							dataSource={this.state.accounts}
							columns={accountColumns}
							rowKey={(record,index) => index}
							className="accounts-table"
						/>
					</Col>
				</Row>
			</div>
		)
	}
}
export default withCookies(AdwordAccounts);
