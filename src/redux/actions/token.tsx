export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const updatetoken = (token) => ({ type: UPDATE_TOKEN, token });
export const removetoken = () => ({ type: REMOVE_TOKEN });