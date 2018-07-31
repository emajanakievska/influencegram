import {
    FETCH_SAVED_POSTS,
    REMOVE_SAVED_POST
} from '../actions/types';

const initialState = {
    savedPosts: null
};


export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SAVED_POSTS:
            return { ...state,
                savedPosts: (state.savedPosts, action.payload)
            } || false;
        case REMOVE_SAVED_POST:
            const {
                _id
            } = action.payload;

            return { ...state,
                savedPosts: state.savedPosts.savedPosts.filter(postId => postId !== _id)
            } || false;
        default:
            return state;
    }
}