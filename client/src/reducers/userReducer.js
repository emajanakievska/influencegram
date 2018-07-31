import {
    FETCH_USER_DB,
} from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER_DB:
            return action.payload || false;
        default:
            return state;
    }
}