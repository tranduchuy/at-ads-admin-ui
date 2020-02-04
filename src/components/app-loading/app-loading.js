import React from 'react';
import './app-loading.scss';
// import { Spin } from 'antd';
import * as action from '../../actions';
import { connect } from 'react-redux';

class AppLoading extends React.Component {
	render() {
		// if (this.props.app.isLoading) {
		// 	return <div className={'app-loading'}>
		// 		<Spin tip={'Vui lòng chờ'}
		// 					size='large'/>
		// 	</div>;
		// }

		return (
			<></>
		)
	}
}

const mapStateToProps = (state) => ({
	app: state.app
});

export default connect(mapStateToProps, action)(AppLoading);
