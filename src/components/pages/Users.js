import React, { Component } from 'react';
import { API } from "../../constants/api";
import { Row, Col, Table, Input, Button, Icon } from 'antd';

export class Users extends Component {

	constructor(props) {
		super(props);

		this.state = {
			users: [],
			page : 0,
			limit: 10
		}

		this.onTableChanged = this.onTableChanged.bind(this);
	}

	componentDidMount() {}

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
					style={{ width: 188, marginBottom: 8, display: 'block' }}
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
		filterIcon    : filtered => (
			<Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }}/>
		)
	});

	handleSearch = (selectedKeys, dataIndex, confirm) => {
		confirm(); // hide panel search
		console.log(selectedKeys, dataIndex);
	};

	handleReset = clearFilters => {
		clearFilters();
		this.setState({ searchText: '' });
	};

	onTableChanged = (pagination) => {
		console.log(pagination);
	};

	render() {
		const dataSource = [];

		const columns = [
			{
				title    : 'Name',
				dataIndex: 'name',
				key      : 'name',
				...this.getColumnSearchProps('name')
			},
			{
				title    : 'Email',
				dataIndex: 'email',
				key      : 'email',
				...this.getColumnSearchProps('email')
			},
			{
				title    : 'Phone',
				dataIndex: 'phone',
				key      : 'phone',
			},
			{
				title    : 'Google ID',
				dataIndex: 'googleId',
				key      : 'googleId',
			},
			{
				title    : 'Ngày tham gia',
				dataIndex: 'createdAt',
				key      : 'createdAt'
			},
			{
				title    : 'Avatar',
				dataIndex: 'avatar',
				key      : 'avatar'
			}
		];

		return (
			<div>
				<Row>
					<Col span={24}>
						<Table pagination={{ position: 'bottom' }}
									 onChange={this.onTableChanged}
									 dataSource={dataSource}
									 columns={columns}/>
					</Col>
				</Row>
			</div>
		)
	}
}
