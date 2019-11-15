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
import * as _ from 'lodash';

class Dashboard extends BasePage {
	cookies;
	token;
	from = moment().subtract(13, 'days').startOf('day');
	to = moment().endOf('day');

	constructor(props) {
		super(props);

		this.cookies = this.props.cookies;
		this.token = this.cookies.get(COOKIE_NAMES.token);

		this.state = {
			data: [],
			from: this.from.valueOf().toString(),
			to: this.to.valueOf().toString(),
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
				to: this.state.to,
				timeZone: moment().format('Z')
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

	getStatisticDates = () => {
		let dates = [];

		let currDate = moment(this.from).startOf('day');
		let lastDate = moment(this.to).startOf('day');

		while (currDate.add(1, 'days').diff(lastDate) < 0) {
			dates.push(moment(currDate.clone().toDate()).format('DD-MM-YYYY'));
		}

		dates.unshift(moment(this.from).format('DD-MM-YYYY'));
		dates.push(moment(this.to).format('DD-MM-YYYY'));

		return dates;
	}

	mapResults(items) {
		const dateLabels = this.getStatisticDates();
		dateLabels.forEach((label, index) => {
			const item = _.find(items, ele => ele.date === label);
			if (!item)
				items.push({
					requestsNumber: 0,
					googleAdsErrorsNumber: 0,
					date: label,
					_date: moment(label, 'DD-MM-YYYY')._d
				});
			else {
				item.requestsNumber = item.requestsNumber || 0;
				item.googleAdsErrorsNumber = item.googleAdsErrorsNumber || 0;
				item._date = moment(label, 'DD-MM-YYYY')._d;
			}
		});

		// items.sort((a, b) => {
		// 	if (a._date.getTime() < b._date.getTime()) {
		// 		return -1;
		// 	} else if (a._date.getTime() === b._date.getTime()) {
		// 		return 0;
		// 	} else {
		// 		return 1;
		// 	}
		// });

		this.setState({
			data: _.sortBy(items, '_date')
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
				date: moment(item._date).format('DD-MM'),
				value: item.googleAdsErrorsNumber
			});

			seriesRequest.data.push({
				date: moment(item._date).format('DD-MM'),
				value: item.requestsNumber
			});
		});

		const series = [
			seriesError,
			seriesRequest
		];

		const { overviewStatisticData } = this.state;
		const startDate = moment(this.from).format('DD-MM-YYYY');
		const endDate = moment(this.to).format('DD-MM-YYYY');
		const dateDistance = (this.to.diff(this.from, 'days')) + 1 || 0;
		const dateDistanceView = dateDistance > 1 ? dateDistance.toString() + ' days' : dateDistance.toString() + ' day';

		return (
			<div className="dashboard">
				<div ref={this.chartWrap}>
					<h2>Google Ads Request & Error Statistic</h2>
					<h4>
						From <strong>{startDate}</strong> To <strong>{endDate} ({dateDistanceView})</strong>
					</h4>
					<div className="chart-warpper">
						<LineChart width={this.chartWrap.current ? this.chartWrap.current.offsetWidth : 800} height={300}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="date" type="category" allowDuplicatedCategory={false} style={{fontSize: '12px'}} />
							<YAxis dataKey="value" style={{fontSize: '12px'}} />
							<Tooltip />
							<Legend />
							{series.map(s => (
								<Line dataKey="value" data={s.data} stroke={s.stroke} name={s.name} key={s.name} />
							))}
						</LineChart>
					</div>
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
