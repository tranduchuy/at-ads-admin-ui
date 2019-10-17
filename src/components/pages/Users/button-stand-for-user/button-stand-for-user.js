import React from 'react';
import { withCookies } from 'react-cookie';
import * as  PropTypes from 'prop-types';
import { Icon, Tooltip, Button } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';

class ButtonStandForUser extends React.Component {

	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.setAppLoading(true);
		const { cookies } = this.props;
		cookies.set('standForUser', this.props.user);

		setTimeout(() => {
			window.open('https://x2.com.vn', '_blank');
			this.props.setAppLoading(false);
		}, 1000);
	}

	render() {
		return (
			<Tooltip title='Thay quyền'>
				<Button size='small'
								onClick={this.onClick}
				>
					<Icon type="login"/>
				</Button>
			</Tooltip>
		)
	}
}

ButtonStandForUser.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.string.isRequired
	})
};

const mapStateToProps = (state) => ({
	users: state.users
})
;
export default connect(mapStateToProps, actions)(withCookies(ButtonStandForUser));
