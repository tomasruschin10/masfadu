import { combineReducers } from 'redux';
import { user } from './user/UserReducer';
import { token } from './user/TokenReducer';
import { message } from './message/MessageReducer';
import { menu } from './menu/MenuReducer';
import { notice } from './notice/NoticeReducer';
export default combineReducers({ user, token, message, menu, notice });