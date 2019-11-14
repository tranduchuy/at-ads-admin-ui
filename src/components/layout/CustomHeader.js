import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Layout, Menu, Icon, Badge, Card, Avatar, Divider } from 'antd';

const { Header } = Layout;
const { SubMenu } = Menu;
const { Meta } = Card;

class CustomHeader extends Component {
	render() {
		return (
			<Header style={{ background: '#fff', padding: 0 }}>
				<Menu theme="light"
					mode="horizontal"
					//defaultSelectedKeys={['2']}
					style={{ lineHeight: '64px' }}>

					<SubMenu key="1"
						title={
							<span className="submenu-title-wrapper">
								<Icon type="message" />
								Tin nhắn
								<Badge count={99}
									overflowCount={10}
									offset={[0, -20]} />
							</span>
						}
					>
						<Menu.ItemGroup title="Hôm nay">


							<Card style={{ width: 300, margin: '5px' }}>
								<Meta
									avatar={
										<Avatar src="https://ca.slack-edge.com/THXMMTH2T-UKTMGS4AV-7e288c74391a-512" />
									}
									title="Tue Vo"
									description="This is the description"
								/>
							</Card>

						</Menu.ItemGroup>
						<Menu.ItemGroup title="Hôm qua">

							<Card style={{ width: 300, margin: '5px' }}>
								<Meta
									avatar={
										<Avatar src="https://ca.slack-edge.com/THXMMTH2T-UKTMGS4AV-7e288c74391a-512" />
									}
									title="Tue Vo"
									description="This is the description"
								/>
							</Card>

						</Menu.ItemGroup>
					</SubMenu>

					{/* <Menu.Item key="2">nav 2</Menu.Item>
					<Menu.Item key="3">nav 3</Menu.Item> */}
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
