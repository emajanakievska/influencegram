import { FETCH_USER_INSTAGRAM } from '../actions/types';

export default function (state = null, action) {
    switch(action.type) {
        case FETCH_USER_INSTAGRAM:
            return action.payload || false;
        default:
            return state;
    }
}