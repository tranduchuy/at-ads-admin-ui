import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import websiteReducer from './website-reducer';
import appReducer from './app-reducer';

const rootReducers = combineReducers({
	users: userReducer,
	websites: websiteReducer,
	app: appReducer
});

export default rootReducers;
