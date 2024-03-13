import { UPDATE_MODAL, UPDATE_USERDATA } from "../actions/user";

export const user = (user = { userdata: {}}, action) => {
    switch (action.type) {
        case UPDATE_USERDATA:
            return { userdata: action.userdata }
        default:
            return user;
    }
}

export const modal = (value = false, action) => {
    switch (action.type) {
        case UPDATE_MODAL:
            return value = action.value
        default:
            return value;
    }
}