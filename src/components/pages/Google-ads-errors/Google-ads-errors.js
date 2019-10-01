import React, { Component } from 'react';
import { Row, Col, Table, Popover, Button } from 'antd';
import { withCookies } from 'react-cookie';
import { API } from '../../../constants/api';
import moment from 'moment';
import './Google-ads-errors-style.scss';
import JSONPretty from 'react-json-pretty';
import axios from 'axios';
import ReactHighChart from 'react-highcharts';

const pieChartConfig = {
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie'
	},
	title: {
		text: 'Statistic type of Google Ads Error'
	},
	tooltip: {
		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
	plotOptions: {
		pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
				enabled: true,
				format: '<b>{point.name}</b>: {point.percentage:.1f} %'
			}
		}
	},
	series: [{
		name: 'Brands',
		colorByPoint: true,
		data: []
	}]
};

export class GoogleAdsErrors extends Component {

	cookies;
	token;

	constructor(props) {
		super(props);

		this.cookies = this.props.cookies;
		this.token = this.cookies.get('token');

		this.state = {
			ggAdsErrors: [],
			totalItems: 0,
			page: 1,
			limit: 10,
			statistic: []
		}
	}

	componentDidMount() {
		this.getGoogleAdsErrors({
			page: this.state.page,
			limit: this.state.limit
		});

		this.getStatistic();
	}

	getStatistic() {
		axios.get(API.getGoogleAdsErrorsStatistic, {
			headers: {
				accessToken: this.token
			}
		})
			.then((res) => {
				this.setState({
					statistic: res.data.data
				});
			})
	}

	getGoogleAdsErrors(param) {
		let url = API.getGoogleAdsErrors;

		if (param.page !== undefined)
			url += `?page=${param.page}`;

		if (param.limit !== undefined)
			url += `&limit=${param.limit}`;

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
			const data = json.data.entries;
			this.setState({
				ggAdsErrors: data,
				totalItems: data.length > 0 ? json.data.totalItems : 0
			});
		});
	}

	onChangePage(currentPage) {
		this.getGoogleAdsErrors({
			page: currentPage,
			limit: this.state.limit
		})
		this.setState({ page: currentPage });
	}

	render() {
		const ggAdsErrorColumns = [];
		const errorTemplate = {
			createdAt: '',
			reason: '',
			authConfig: {},
			params: {},
			error: {},
			functionName: '',
			serviceVersion: '',
			serviceName: '',
			moduleName: '',
		}

		for (const key in errorTemplate) {

			if (key !== 'authConfig' && key !== 'error' && key !== 'params') {
				ggAdsErrorColumns.push({
					title: key,
					dataIndex: key,
					key,
					render: text => {
						if (key === 'createdAt')
							return moment(text).format('HH:mm DD/MM/YYY');
						return text;
					}
				});
			} else {
				ggAdsErrorColumns.push({
					title: key,
					dataIndex: key,
					key,
					render: text => {
						const content = <JSONPretty style={{ fontSize: '12px' }} data={text}></JSONPretty>;

						return (
							<Popover
								content={content} title="Nội dung"
								placement="bottom"
								trigger="click"
								overlayStyle={{
									width: '45vw',
									maxHeight: '50vh'
								}}>
								<Button>Xem nội dung</Button>
							</Popover>
						)
					}
				});
			}
		}

		pieChartConfig.series[0].data = [];
		this.state.statistic.forEach(item => {
			pieChartConfig.series[0].data.push({
				name: item._id,
				y: item.count
			})
		});

		return (
			<div className="container">
				<Row>
					<Col span={24}>
						<ReactHighChart config={pieChartConfig}/>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Table pagination={{
							position: 'bottom',
							total: this.state.totalItems,
							pageSize: this.state.limit,
							current: this.state.page,
							onChange: (currentPage) => this.onChangePage(currentPage)
						}}
									 dataSource={this.state.ggAdsErrors}
									 columns={ggAdsErrorColumns}
									 rowKey={record => record._id}
									 className="gg-ads-errors-table"/>
					</Col>
				</Row>
			</div>
		)
	}
}

export default withCookies(GoogleAdsErrors);
