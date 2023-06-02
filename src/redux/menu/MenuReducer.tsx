import { HIDE_MENU, SHOW_MENU} from "../actions/menu";

export const menu  = (action:any) => {
    switch (action?.type) {
        case HIDE_MENU:
            return false;
        case SHOW_MENU:
            return true;
        default:
            return true;
    }
}