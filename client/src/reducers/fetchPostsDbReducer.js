import {
    FETCH_POSTS_DB,
} from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_POSTS_DB:
            return action.payload || false;
        default:
            return state;
    }
}