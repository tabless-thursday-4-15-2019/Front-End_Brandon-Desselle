import axios from 'axios';

import axiosWithAuth from '../../axiosWithAuth';

/* LOGIN ACTIONS */

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const logIn = (creds) => (dispatch) => {
	dispatch({ type: LOGIN_START });
	return axios
		.post('https://tabless-db.herokuapp.com/login', creds)
		.then((res) => {
			localStorage.setItem('token', res.data.token);
			localStorage.setItem('user_id', res.data.user_id);
			dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
		})
		.catch((err) => {
			dispatch({ type: LOGIN_FAILURE, payload: err.message });
		});
};

/* FETCH LISTS ACTIONS */

export const FETCH_LISTS_START = 'FETCH_LISTS_START';
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS';
export const FETCH_LISTS_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchLists = (user_id) => (dispatch) => {
	dispatch({ type: FETCH_LISTS_START });
	axios
		.get(`https://tabless-db.herokuapp.com/users/${user_id}/tabs`, {
			headers: { Authorization: localStorage.getItem('token') }
		})
		.then((res) => {
			console.log(res);
			dispatch({ type: FETCH_LISTS_SUCCESS, payload: res.data.tabs });
		})
		.catch((err) => {
			console.log(err);
			dispatch({ type: FETCH_LISTS_FAILURE });
		});
};

/* ADD LIST ACTIONS */

export const ADD_LIST = 'ADD_LIST';
export const ADD_LIST_FAILURE = 'ADD_LIST_FAILURE';

export const addList = (newList) => (dispatch) => {
	axiosWithAuth()
		.post(`https://tabless-db.herokuapp.com/tabs`, newList)
		.then((res) => {
			console.log(res);
			dispatch({ type: ADD_LIST, payload: res.data });
		})
		.catch((err) => {
			console.log(err);
			dispatch({ type: ADD_LIST_FAILURE, payload: err.response });
		});
};

/* DELETE ACTIONS */

export const DELETE_START = 'DELETE_START';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';

export const deleteList = (id) => (dispatch) => {
	dispatch({ type: DELETE_START });
	axiosWithAuth()
		.delete(`https://tabless-db.herokuapp.com/tabs/${id}`)
		.then((res) => {
			dispatch({ type: DELETE_SUCCESS, payload: res.data });
		})
		.catch((err) => {
			console.log(err);
		});
};
