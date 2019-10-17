import {combineReducers} from 'redux';
import userReducer from './user-reducer';
import websiteReducer from './website-reducer';

const rootReducers = combineReducers({
    users: userReducer,
    websites: websiteReducer
});
  
export default rootReducers;
