import { UPDATE_USERDATA } from "../actions/user";

export const user = (user = { userdata: {}}, action) => {
    switch (action.type) {
        case UPDATE_USERDATA:
            return { userdata: action.userdata }
        default:
            return user;
    }
}