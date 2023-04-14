import { UPDATE_MESSAGE } from "../actions/message";

export const message  = (message = {body: '', open: false, type: 'success'}, action) => {
    switch (action.type) {
        case UPDATE_MESSAGE:
            return action.message;
        default:
            return message;
    }
}