export const FORGET_NOTICE = 'FORGET_NOTICE';
export const REMEMBER_NOTICE = 'REMEMBER_NOTICE';
export const forgetNotice = (value) => ({ type: FORGET_NOTICE, value });
export const rememberNotice = (value) => ({ type: REMEMBER_NOTICE, value });
