import { REMOVE_TOKEN, UPDATE_TOKEN } from "../actions/token";

export const token  = (token = '', action) => {
    switch (action.type) {
        case UPDATE_TOKEN:
            return action.token;
        case REMOVE_TOKEN:
            return token;
        default:
            return token;
    }
}