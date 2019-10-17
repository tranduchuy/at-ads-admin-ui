import React from 'react';
import { withCookies } from 'react-cookie';
import * as  PropTypes from 'prop-types';
import { Icon, Tooltip, Button } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import secret from '../../../../config/secret';
import { COOKIE_NAMES } from '../../../../constants/cookie-names';

class ButtonStandForUser extends React.Component {

	secret = secret;

	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		console.log(this.props.users);
		this.props.setAppLoading(true);
		const { cookies } = this.props;
		const targetUser = JSON.parse(JSON.stringify(this.props.user));
		targetUser._id = targetUser.id;
		cookies.set(COOKIE_NAMES.FRONT_END.user, targetUser, {path: '/'}); // target user info
		cookies.set(COOKIE_NAMES.FRONT_END.standBy, this.props.users.user, {path: '/'}); // Admin info
		cookies.set(COOKIE_NAMES.FRONT_END.token, this.props.users.token, {path: '/'}); // admin token

		// console.log('value: ', this.secret);
		setTimeout(() => {
			window.open(this.secret.FRONT_END_DOMAIN, '_blank');
			this.props.setAppLoading(false);
		}, 1000);
	}

	render() {
		return (
			<Tooltip title='Thay quyền'>
				<Button size='small'
								onClick={this.onClick}>
					<Icon type="login"/>
				</Button>
			</Tooltip>
		);
	}
}

ButtonStandForUser.propTypes = {
	users: PropTypes.object,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired
	}),
	setAppLoading: PropTypes.func
};

const mapStateToProps = (state) => ({
	users: state.users
});

export default connect(mapStateToProps, actions)(withCookies(ButtonStandForUser));
