import { ADD_USER, DELETE_USER, UPDATE_USER } from './actionTypes';
import { SET_SEARCH_TERM } from './actionTypes';

export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: term,
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});
