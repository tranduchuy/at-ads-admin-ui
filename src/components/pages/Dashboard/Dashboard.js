import React from 'react';
import './Dashboard-style.scss';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import { API } from "../../../constants/api";
import axios from 'axios';
import moment from 'moment';
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { BasePage } from "../base-page";
import { COOKIE_NAMES } from '../../../constants/cookie-names';
import { withCookies } from 'react-cookie';
import { Icon } from 'antd';

class Dashboard extends BasePage {
	cookies;
	token;
	constructor(props) {
		super(props);

		this.cookies = this.props.cookies;
		this.token = this.cookies.get(COOKIE_NAMES.token);

		const prevMonth = new Date(moment().subtract(1, 'month')).getTime().toString();
		const now = new Date(moment()).getTime().toString();
		this.state = {
			data: [],
			from: prevMonth,
			to: now,
			overviewStatisticData: {
				numberOfUser: 0,
				numberOfAdswords: 0,
				numberOfWebsite: 0
			}
		};

		this.chartWrap = React.createRef();
	}

	statisticOverview() {
		this.props.setAppLoading(true);
		axios.get(API.statisticOverview, {
			headers: {
				"accesstoken": this.token
			},
			signal: this.abortController.signal
		}).then(res => {
			this.setState({
				overviewStatisticData: res.data.data
			})
			setTimeout(() => {
				this.props.setAppLoading(false);
			}, 500);
		}).catch(err => {
			this.props.setAppLoading(false);
		});
	}

	fetchData() {
		this.props.setAppLoading(true);
		axios.get(API.statisticGoogleApiAndError, {
			params: {
				from: this.state.from,
				to: this.state.to
			},
			headers: {
				"accesstoken": this.token
			},
			signal: this.abortController.signal
		}).then(res => {
			this.mapResults(res.data.data.result);
			setTimeout(() => {
				this.props.setAppLoading(false);
			}, 500);
		}).catch(err => {
			this.props.setAppLoading(false);
		});
	}

	mapResults(items) {
		items = items.map(item => {
			item.requestsNumber = item.requestsNumber || 0;
			item._date = moment(item.date, 'DD-MM-YYYY')._d;
			return item;
		});

		items.sort((a, b) => {
			if (a._date.getTime() < b._date.getTime()) {
				return -1;
			} else if (a._date.getTime() === b._date.getTime()) {
				return 0;
			} else {
				return 1;
			}
		});

		this.setState({
			data: items
		});
	}

	componentDidMount() {
		this.fetchData();
		this.statisticOverview();
	}

	render() {
		const googleAdLogoUrl = 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/logo_Google_Ads_192px.max-200x200.png';
		const seriesError = {
			name: 'Error',
			stroke: 'red',
			data: []
		};

		const seriesRequest = {
			name: 'Request',
			stroke: 'blue',
			data: []
		};

		this.state.data.forEach(item => {
			seriesError.data.push({
				date: item.date,
				value: item.googleAdsErrorsNumber
			});

			seriesRequest.data.push({
				date: item.date,
				value: item.requestsNumber
			});
		});

		const series = [
			seriesError,
			seriesRequest
		];

		const { overviewStatisticData } = this.state;
		const startDate = this.state.data.length > 0 ? this.state.data[0].date : '';
		const endDate = this.state.data.length > 0 ? this.state.data[this.state.data.length-1].date : '';

		return (
			<div className="dashboard">
				<div ref={this.chartWrap}>
					<h2>Request Google Ads & Error Statistic</h2>
					<h4>
						From <strong>{startDate}</strong> To <strong>{endDate}</strong>
					</h4>
					<LineChart width={this.chartWrap.current ? this.chartWrap.current.offsetWidth : 800} height={300}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" type="category" allowDuplicatedCategory={false} />
						<YAxis dataKey="value" />
						<Tooltip />
						<Legend />
						{series.map(s => (
							<Line dataKey="value" data={s.data} stroke={s.stroke} name={s.name} key={s.name} />
						))}
					</LineChart>
				</div>

				<div className="overview">
					<ul>
						<li>
							<Icon type="user" /> Users:
							<span className="data-value">{overviewStatisticData.numberOfUser}</span>
						</li>
						<li>
							<img src={googleAdLogoUrl} alt="" className="ggAds-icon" /> Google Ads accounts:
							<span className="data-value">{overviewStatisticData.numberOfAdswords}</span>
						</li>
						<li>
							<Icon type="layout" /> Websites:
							<span className="data-value">{overviewStatisticData.numberOfWebsite}</span>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	users: state.users
});

export default connect(mapStateToProps, actions)(withCookies(Dashboard));
