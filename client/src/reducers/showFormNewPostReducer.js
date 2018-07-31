import {
    SHOW_ADD_NEW_POST,
    HIDE_ADD_NEW_POST,
} from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case SHOW_ADD_NEW_POST:
            return action.payload || true;
        case HIDE_ADD_NEW_POST:
            return action.payload || false;
        default:
            return state;
    }
}