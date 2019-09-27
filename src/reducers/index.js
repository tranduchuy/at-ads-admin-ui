import {combineReducers} from 'redux';
import userReducer from './user-reducer';

const rootReducers = combineReducers({
    users: userReducer
});
  
export default rootReducers;
