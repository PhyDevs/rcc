import React from 'react';
import { API_URL } from '../config/api'

const types = {
	SUBMIT_STARTED: 0,
	SUBMIT_DONE: 1,
};

const cache = {};

const requsetReducer = (state, action) => {
	switch (action.type) {
		case types.SUBMIT_STARTED:
			return { ...state, loading: true };
		case types.SUBMIT_DONE:
			return { ...state, loading: false, ...action.payload };
		default:
			return state;
	}
};


const useRequest = () => {
	const [state, dispatch] = React.useReducer(requsetReducer, {
		loading: false,
		data: null,
	});

	const get = React.useCallback(async (route, isCached = false) => {
		let res = { data: null };
		try {
			const headers = {
				'Content-Type': 'application/json',
			};
			dispatch({ type: types.SUBMIT_STARTED });
			if (cache[route] !== undefined && isCached) {
				res = cache[route];
			} else {
				res = await fetch(`${API_URL}/${route}`, { 
                    method: 'GET', 
                    headers
                });
                res = await res.json();

				cache[route] = isCached ? res : null;
			}
			dispatch({ type: types.SUBMIT_DONE, payload: { data: res } });
		} catch (err) {
			dispatch({ type: types.SUBMIT_DONE, payload: { data: null } });
			if (!err.response || err.response.status === 401) {
				console.log('Error', err);
			} else if (err.response.status === 404 || err.response.status === 400) {
				return 404;
			}
		}

		return res;
	}, []);

	return [state, get];
};

export { useRequest };