import axios from 'axios';
import {
  FETCH_USER_DB,
  FETCH_USER_INSTAGRAM,
  FETCH_USER_POSTS,
  FETCH_ALL_POSTS,
  SHOW_ADD_NEW_POST,
  HIDE_ADD_NEW_POST,
  ADD_NEW_POST,
  SAVE_POST,
  FETCH_SAVED_POSTS,
  FETCH_POSTS_DB,
  REMOVE_SAVED_POST,
  REMOVE_DB_POST,
} from './types';

export const fetchUserFromDb = () => async dispatch => {
  const res = await axios.get('/api/get_db_user');
  dispatch({
    type: FETCH_USER_DB,
    payload: res.data
  });
};

export const fetchUserFromInstagram = () => async dispatch => {
  const res = await axios.get('/api/get_instagram_user');
  dispatch({
    type: FETCH_USER_INSTAGRAM,
    payload: res.data
  });
};

export const fetchUserPostsDb = () => async dispatch => {
  const res = await axios.get('/api/get_db_posts');
  dispatch({
    type: FETCH_USER_POSTS,
    payload: res.data
  });
};

export const fetchAllPostsFromDb = () => async dispatch => {
  const res = await axios.get('/api/get_all_db_posts');
  dispatch({
    type: FETCH_ALL_POSTS,
    payload: res.data
  });
};

export const showAddNewPostComponent = () => async dispatch => {
  dispatch({
    type: SHOW_ADD_NEW_POST,
    payload: true
  });
};

export const hideAddNewPostComponent = () => async dispatch => {
  dispatch({
    type: HIDE_ADD_NEW_POST,
    payload: false
  });
};

export const addNewPost = (values, history) => async dispatch => {
  const res = await axios.post('/api/post_db_posts', values, {
    headers: {
      'Content-Type': 'application/JSON'
    }
  });
  history.push('/user/posts');
  dispatch({
    type: ADD_NEW_POST,
    payload: res.data
  });
};

export const saveNewPost = (userId, postId) => async dispatch => {
  const res = await axios.get(`/api/save_new_post/${userId}/${postId}`);
  dispatch({
    type: SAVE_POST,
    payload: res.data
  });
};

export const removeSavedPost = (userId, postId) => async dispatch => {
  const res = await axios.get(`/api/remove_saved_post/${userId}/${postId}`);
  dispatch({
    type: REMOVE_SAVED_POST,
    payload: res.data
  });
};

export const fetchUserSavedPosts = userId => async dispatch => {
  const res = await axios.get(`/api/get_saved_posts/${userId}`);
  dispatch({
    type: FETCH_SAVED_POSTS,
    payload: res.data
  });
};

export const removeDbPost = (postId, history) => async dispatch => {
  const res = await axios.get(`/api/remove_db_post/${postId}`);
  dispatch({
    type: REMOVE_DB_POST,
    payload: {
      _id: postId
    }
  });
  history.push('/user/posts');
};

export const fetchPostsFromDb = posts => async dispatch => {
  const res = await axios.get('/api/get_post_db', {
    params: {
      posts
    }
  });

  dispatch({
    type: FETCH_POSTS_DB,
    payload: res.data
  });
};