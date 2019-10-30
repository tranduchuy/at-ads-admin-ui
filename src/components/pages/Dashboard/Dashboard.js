import React  from 'react';
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

class Dashboard extends BasePage {
	constructor(props) {
		super(props);

		const prevMonth = moment().subtract(1, 'month').format('DD-MM-YYYY');
		const now = moment().format('DD-MM-YYYY');
		this.state = {
			data: [],
			from: prevMonth,
			to: now
		};

		this.chartWrap = React.createRef();
	}

	fetchData() {
		this.props.setAppLoading(true);
		const { cookies } = this.props;
		axios.get(API.statisticGoogleApiAndError, {
			params : {
				from: this.state.from,
				to  : this.state.to
			},
			headers: {
				"accesstoken": cookies.get(COOKIE_NAMES.token)
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
	}

	render() {
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

		console.log('chartWrap', this.chartWrap);

		return (
			<div ref={this.chartWrap}>
				<h2>Request Google Ads & Error Statistic</h2>
				<h4>From <strong>{this.state.from}</strong> To <strong>{this.state.to}</strong></h4>
				<LineChart width={this.chartWrap.current ? this.chartWrap.current.offsetWidth : 800} height={300}>
					<CartesianGrid strokeDasharray="3 3"/>
					<XAxis dataKey="date" type="category" allowDuplicatedCategory={false}/>
					<YAxis dataKey="value"/>
					<Tooltip/>
					<Legend/>
					{series.map(s => (
						<Line dataKey="value" data={s.data} stroke={s.stroke} name={s.name} key={s.name}/>
					))}
				</LineChart>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	users: state.users
});

export default connect(mapStateToProps, actions)(withCookies(Dashboard));
