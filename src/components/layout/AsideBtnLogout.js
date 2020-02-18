import { Button, Icon, Popconfirm } from "antd";
import React from 'react';
import { withCookies } from "react-cookie";
import { withRouter } from 'react-router-dom';

class AsideBtnLogout extends React.Component {
	constructor(props) {
		super(props);

		this.logout = this.logout.bind(this);
	}

	logout() {
		const { cookies } = this.props;
		cookies.remove('token', { path: '/' });
		this.props.history.push('/login');
	}

	render() {
		return (
			<Popconfirm placement="rightBottom"
									title="Thoát khỏi hệ thống?"
									onConfirm={this.logout}
									okText="Đồng ý"
									cancelText="Hủy">
				<Button type="link" style={{ width: '100%', 'textAlign': 'left', 'padding': '0 23px' }}>
					<Icon type="logout"/>
					<span style={{ marginLeft: '8.5px', fontSize: '12px' }}>Đăng xuất</span>
				</Button>
			</Popconfirm>
		)
	}
}

export default withCookies(withRouter(AsideBtnLogout));
