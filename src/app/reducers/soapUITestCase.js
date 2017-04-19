'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	page:1,
	size:5,
};
export default function soapUITestCase(state = initialState, action) {
	switch (action.type) {
		case types.CHANGE_TESTCASE_INFO:
			return Object.assign({}, state, {
				page:action.page,
		        size:action.size
			});

		default:
			return state;
	}
}
