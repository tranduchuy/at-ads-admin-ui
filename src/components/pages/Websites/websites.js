import React from 'react';
import { Row, Col, Table, Input, Button, Icon } from 'antd';
import { withCookies } from 'react-cookie';
import { API } from '../../../constants/api';
import moment from 'moment';
import './websites-style.scss';
import { COOKIE_NAMES } from "../../../constants/cookie-names";
import { BasePage } from "../base-page";
import ButtonCheckTrackingScript from './button-check-tracking-script';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

export class WebsitePages extends BasePage {
	cookies;
	token;
	paginationConfig = {};

	constructor(props) {
		super(props);

		this.cookies = this.props.cookies;
		this.token = this.cookies.get(COOKIE_NAMES.token);

		this.state = {
			searchText: '',
			websites: [],
			totalItems: 0,
			page: 1,
			limit: 10
		};

		this.paginationConfig = {
			position: 'bottom',
			total: this.state.totalItems,
			pageSize: this.state.limit,
			current: this.state.page,
			onChange: (currentPage) => this.onChangePage(currentPage)
		};

		this.onClickRecheckWebsite = this.onClickRecheckWebsite.bind(this);
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
			<Icon type="search" style={{ color: filtered ? '#f2f2f2' : undefined }}/>
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
		} else {
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

		this.props.setAppLoading(true);

		fetch(url, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'accessToken': this.token
			},
			signal: this.abortController.signal
		}).then(res => {
			return res.json();
		}).then(json => {
			let websites = (json.data.entries || [])
				.map(item => {
					return {
						domain: item.domain,
						isTracking: item.isTracking,
						adsId: item.accountInfo ? item.accountInfo.adsId : "",
						email: item.userInfo ? item.userInfo.email : "",
						expiredAt: item.expiredAt,
						createdAt: item.createdAt,
						code: item.code,
						websiteCode: item.code
					}
				});

			this.setState({
				websites,
				totalItems: websites.length > 0 ? json.data.totalItems : 0
			});

			setTimeout(() => {
				this.props.setAppLoading(false);
			}, 500);
		})
	}

	onClickRecheckWebsite(record) {

	}

	render() {
		const accountColumns = [
			{
				title: (filter, sortOrder) => {
					return (
						<div>
							<Icon type="chrome" className="ggAds-icon"/>
							<span>Domain</span>
						</div>
					)
				},
				dataIndex: 'domain',
				key: 'domain',
				render: (text, record) => {
					return <ButtonCheckTrackingScript text={text}
																						onClick={this.onClickRecheckWebsite}
																						record={record}/>
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
								<Icon type="check"/> Đã gắn
							</span>
						);
					return (
						<span style={{ color: 'crimson' }}>
							<Icon type="close"/> Chưa gắn
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
			// {
			// 	title: 'Ngày hết hạn',
			// 	dataIndex: 'expiredAt',
			// 	key: 'expiredAt',
			// 	render: text => {
			// 		if (text) {
			// 			return (
			// 				<span>{moment(text).format('HH:mm DD/MM/YYYY')}</span>
			// 			);
			// 		}

			// 		return (
			// 			<span></span>
			// 		);
			// 	}
			// },
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
			// {
			// 	title: '',
			// 	dataIndex: 'code',
			// 	key: 'code',
			// 	render: text => {
			// 		const host = `/dashboard/update-expiration?code=${text}`;
			// 		return (
			// 			<Link to={host}>
			// 				<Button type="primary">Nâng cấp domain</Button>
			// 			</Link>
			// 		)
			// 	}
			// },
		];

		return (
			<div className="container">
				<Row>
					<Col span={24}>
						<Table pagination={this.paginationConfig}
									 dataSource={this.state.websites}
									 columns={accountColumns}
									 rowKey={(record, index) => record.code}
									 className="accounts-table"/>
					</Col>
				</Row>
			</div>
		)
	}
}

export default connect(null, actions)(withCookies(WebsitePages))
