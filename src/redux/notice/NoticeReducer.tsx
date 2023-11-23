// reducer.js

import { FORGET_NOTICE, REMEMBER_NOTICE } from '../actions/notice';

const initialState = {
  notice: false,
};

export const notice = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_NOTICE:
      return {
        ...state,
        notice: action.value,
      };
    case REMEMBER_NOTICE:
      return {
        ...state,
        notice: action.value,
      };
    default:
      return state;
  }
};