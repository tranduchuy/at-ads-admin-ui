import { Icon, Tooltip } from "antd";
import axios from "axios";
import * as PropTypes from 'prop-types';
import React from "react";
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import { API } from "../../../constants/api";
import { COOKIE_NAMES } from "../../../constants/cookie-names";

class ButtonCheckTrackingScript extends React.Component {

	abortController = new AbortController();

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			record: props.record
		};

		this.onClick = this.onClick.bind(this);
	}

	stopSpinning() {
		setTimeout(() => {
			this.setState({
				isLoading: false
			});
		}, 500);
	}

	onClick() {
		console.log(this.props);
		this.setState({
			isLoading: true
		});
		const { cookies } = this.props;
		axios({
			method: 'PUT',
			url: API.checkScriptWebsite.replace('{code}', this.props.record.code),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'accessToken': cookies.getC(COOKIE_NAMES.token)
			},
			signal: this.abortController.signal
		}).then(res => {
			this.setState({
				record: res.data.data.website
			});
			this.stopSpinning();

		}).catch(err => {
			console.log(err);
			// alert(err.response.data.messages.join('\n'));
			this.stopSpinning();
		});
	}

	componentWillUnmount() {
		this.abortController.abort();
	}

	render() {
		const antIcon = <Icon type="loading" spin/>;

		return (
			<div>
				<Tooltip placement="topLeft"
								 title="Kiểm tra gắn mã">
								<span className="recheck-website-tracking"
											onClick={this.onClick}>
									{
										this.state.isLoading ?
											antIcon :
											<Icon type="reload"/>
									}
								</span>
				</Tooltip>


				<a href={this.props.text}
					 target=" _blank"
					 style={{ color: this.props.record.isTracking ? '#44b543' : 'crimson', fontFamily: 'tahoma' }}>
					{this.props.text}
				</a>
			</div>
		)
	}
}

ButtonCheckTrackingScript.propTypes = {
	text: PropTypes.string,
	onClick: PropTypes.func,
	record: PropTypes.shape({
		isTracking: PropTypes.bool
	})
};

const mapStateToProps = (state) => ({
	websites: state.websites,
	users: state.users
});


export default connect(mapStateToProps, actions)(ButtonCheckTrackingScript);
