import {
  combineReducers
} from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import postsReducer from "./postsReducer";
import showHideNewPostReducer from "./showFormNewPostReducer";
import addNewPostReducer from "./addNewPostReducer";
import savePostReducer from "./savePostReducer";
import fetchPostsDbReducer from "./fetchPostsDbReducer";
import savedPostReducer from "./savedPostReducer";
import {
  reducer as reduxForm
} from 'redux-form';

export default combineReducers({
  userInstagram: authReducer,
  userFromDbById: userReducer,
  posts: postsReducer,
  showHideNewPost: showHideNewPostReducer,
  addNewPost: addNewPostReducer,
  savePost: savePostReducer,
  fetchIdOfUserSavedPosts: savedPostReducer,
  fetchPostsInfoById: fetchPostsDbReducer,
  form: reduxForm
});