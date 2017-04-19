'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	test: 'initial state '
};

export default function test(state = initialState, action) {
	switch (action.type) {
		case types.TEST:
			return {test: action.test};
		default:
			return state;
	}
}
