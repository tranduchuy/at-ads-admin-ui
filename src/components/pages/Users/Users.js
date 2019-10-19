import React from 'react';
import { Row, Col, Table, Input, Button, Icon } from 'antd';
import { API } from '../../../constants/api';
import moment from 'moment';
import './Users-style.scss';
import { BasePage } from '../base-page';
import ButtonStandForUser from './button-stand-for-user/button-stand-for-user';
import * as actions from '../../../actions';
import { connect } from 'react-redux';

export class Users extends BasePage {
	constructor(props) {
		super(props);

		this.state = {
			searchText: '',
			users: [],
			totalItems: 0,
			page: 1,
			limit: 10
		};
	}

	componentDidMount() {
		this.getUsers({
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
			this.getUsers({ [dataIndex]: selectedKeys[0] });

		this.setState({ searchText: selectedKeys[0] });
	};

	handleReset = clearFilters => {
		clearFilters();
		this.setState({ searchText: '' });
	};

	onChangePage(currentPage) {

		if (this.state.totalItems > this.state.limit) {
			this.getUsers({
				page: currentPage,
				limit: this.state.limit
			});
		} else {
			if (!this.state.searchText)
				this.getUsers({
					page: currentPage,
					limit: this.state.limit
				});
		}

		this.setState({ page: currentPage });
	}

	isEmptyObj = obj => Object.keys(obj).length === 0;

	getUsers(param) {
		console.trace(param);
		let url = API.getUsers;

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
				'accessToken': this.props.users.token
			},
			signal: this.abortController.signal
		}).then(res => {
			return res.json();
		}).then(json => {
			let users = (json.data.entries || [])
				.map(item => {
					return {
						id: item._id,
						name: item.name,
						email: item.email,
						phone: item.phone,
						googleId: item.googleId,
						createdAt: item.createdAt,
						avatar: item.avatar,
						role: item.role
					};
				});

			this.setState({
				users,
				totalItems: users.length > 0 ? json.data.totalItems : 0
			});
		});
	}

	render() {

		const userColumns = [
			{
				title: 'Hành động',
				key: 'id',
				render: (text, record) => {
					return (
						<ButtonStandForUser user={record}/>
					);
				}
			},
			{
				title: 'Họ và Tên',
				dataIndex: 'name',
				key: 'name',
				...this.getColumnSearchProps('name'),
				render: (text, record) => {
					return (
						<div>
							<img className="user-avatar" alt=""
									 src={record.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}/>
							<span className="user-name">{text}</span>
						</div>
					);
				}
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
				...this.getColumnSearchProps('email')
			},
			{
				title: 'Số điện thoại',
				dataIndex: 'phone',
				key: 'phone',
			},
			{
				title: 'Google ID',
				dataIndex: 'googleId',
				key: 'googleId',
			},
			{
				title: 'Ngày tham gia',
				dataIndex: 'createdAt',
				key: 'createdAt',
				render: text => {
					return (
						<span>{moment(text).format('HH:mm DD/MM/YYYY')}</span>
					);
				}
			},
		];

		const paginationConfig = {
			position: 'bottom',
			total: this.state.totalItems,
			pageSize: this.state.limit,
			current: this.state.page,
			onChange: (currentPage) => this.onChangePage(currentPage)
		};

		return (
			<div className="container">
				<Row>
					<Col span={24}>
						<Table pagination={paginationConfig}
									 dataSource={this.state.users}
									 columns={userColumns}
									 rowKey={(record) => record.id}
									 className="users-table"/>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	users: state.users
});

export default connect(mapStateToProps, actions)(Users);
