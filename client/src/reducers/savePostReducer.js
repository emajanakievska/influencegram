import {
    SAVE_POST,
} from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case SAVE_POST:
            return action.payload.nModified === 1 ? 'true' : 'false'
        default:
            return state;
    }
}