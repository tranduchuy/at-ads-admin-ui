import { Button, Icon, Popconfirm } from "antd";
import React from 'react';

export class AsideBtnLogout extends React.Component {
	constructor(props) {
		super(props)
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
					<span style={{ marginLeft: '8.5px' }}>Đăng xuất</span>
				</Button>
			</Popconfirm>
		)
	}
}
