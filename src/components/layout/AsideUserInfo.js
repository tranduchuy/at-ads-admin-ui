import React from 'react';
import { connect } from "react-redux";
import * as actions from '../../actions';
import './AsideUserInfo.scss';

class AsideUserInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={'email'}>
				{this.props.users.user ? this.props.users.user.email : ''}
			</div>
		)
	}
}

const mapStateToProps = state => (
	{
		users: state.users
	}
);

export default connect(mapStateToProps, actions)(AsideUserInfo);
