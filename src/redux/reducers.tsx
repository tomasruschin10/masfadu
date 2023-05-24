import { combineReducers } from 'redux';
import { user } from './user/UserReducer';
import { token } from './user/TokenReducer';
import { message } from './message/MessageReducer';
export default combineReducers({ user, token, message });