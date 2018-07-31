import {
    ADD_NEW_POST
} from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case ADD_NEW_POST:
            return action.payload || false;
        default:
            return state;
    }
}