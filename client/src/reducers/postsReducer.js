import {
  FETCH_USER_POSTS,
  FETCH_ALL_POSTS,
  REMOVE_DB_POST
} from '../actions/types';

const initialState = {
  userPosts: null,
  allPosts: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_POSTS:
      return { ...state,
        userPosts: (state.userPosts, action.payload)
      } || false;
    case REMOVE_DB_POST:
      const {
        _id
      } = action.payload;
      return {
        ...state,
        userPosts: state.userPosts.filter(post => post._id !== _id)
      };
    case FETCH_ALL_POSTS:
      return { ...state,
        allPosts: (state.allPosts, action.payload)
      } || false;

    default:
      return state;
  }
}