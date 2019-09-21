import React, { Component } from 'react';
import { Row, Col, Table, Input, Button, Icon } from 'antd';
import { withCookies } from 'react-cookie';
import { API } from '../../../constants/api';
import moment from 'moment';
import './Adwords-accounts-style.scss';

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
		this.getAccounts({
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
			this.getAccounts({ [dataIndex]: selectedKeys[0] });

		this.setState({ searchText: selectedKeys[0] });
	};

	handleReset = clearFilters => {
		clearFilters();
		this.setState({ searchText: '' });
	};

	onChangePage(currentPage) {

		if (this.state.totalItems > this.state.limit) {
			this.getAccounts({
				page: currentPage,
				limit: this.state.limit
			});
		}
		else {
			if (!this.state.searchText)
				this.getAccounts({
					page: currentPage,
					limit: this.state.limit
				});
		}

		this.setState({ page: currentPage });
	}

	isEmptyObj = obj => Object.keys(obj).length === 0;

	getAccounts(param) {
		let url = API.getAccounts;

		if (!this.isEmptyObj(param)) {
			url += '?';

			for (const key in param)
				url += `&${key}=${param[key]}`;
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
						adsId: this.formatAdsId(item.adsId),
						isConnected: item.isConnected,
						userId: item.user,
						createdAt: item.createdAt,
					}
				});

			this.setState({
				accounts,
				totalItems: accounts.length > 0 ? json.data.totalItems : 0
			});
		})
	}

	formatAdsId(adsId) {
		let arr = adsId.split('');
		return arr.splice(0, 3).join('') + '-'
			+ arr.splice(0, 3).join('') + '-'
			+ arr.splice(0, 4).join('');
	}

	render() {

		const accountColumns = [
			{
				title: 'Google Ads ID',
				dataIndex: 'adsId',
				key: 'adsId',
				render: (text, record) => {
					if (record.isConnected === true)
						return (
							<span style={{ color: '#44b543', fontFamily: 'tahoma' }}>{text}</span>
						)
					return (
						<span style={{ color: 'crimson', fontFamily: 'tahoma' }}>{text}</span>
					)
				},
			},
			{
				title: 'Quyền quản lý',
				dataIndex: 'isConnected',
				key: 'isConnected',
				render: text => {
					if (text === true)
						return (
							<span style={{ color: '#44b543' }}>
								<Icon type="check-circle" theme="filled" /> Đã chấp nhận
							</span>
						);
					return (
						<span style={{ color: 'crimson' }}>
							<Icon type="close-circle" theme="filled" /> Chưa chấp nhận
						</span>
					);
				}
			},
			{
				title: 'Người dùng (uid)',
				dataIndex: 'userId',
				key: 'userId',
				...this.getColumnSearchProps('userId'),
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
							rowKey={record => record.adsId}
							className="accounts-table"
							rowClassName={(record) => {
								if (record.isConnected === true)
									return 'isConnected';
								return 'isNotConnected';
							}} />
					</Col>
				</Row>
			</div>
		)
	}
}
export default withCookies(AdwordAccounts);
