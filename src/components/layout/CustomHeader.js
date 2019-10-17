import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

class CustomHeader extends Component {
	render() {
		return (
			<Header style={{ background: '#fff', padding: 0 }}>
				<Menu theme="dark"
							mode="horizontal"
							defaultSelectedKeys={['2']}
							style={{ lineHeight: '64px' }}>
					<Menu.Item key="1">nav 1</Menu.Item>
					<Menu.Item key="2">nav 2</Menu.Item>
					<Menu.Item key="3">nav 3</Menu.Item>
				</Menu>

				<div className="logo">
					{this.props.users.user ? this.props.users.user.email : ''}
				</div>
			</Header>
		)
	}
}

const mapStateToProps = state => ({
	users: state.users
});

export default connect(mapStateToProps, actions)(CustomHeader);
