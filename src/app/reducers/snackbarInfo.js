'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	message:"默认显示信息。",
	open:false,
	autoHideDuration: 4000
};
export default function snackbarInfo(state = initialState, action) {
	switch (action.type) {
		case types.CHANGE_SNACKBAR_INFO:
			return Object.assign({}, state, {
				message:action.message,
		        open:true,
			});

		case types.CHANGE_SNACKBAR_SHOW_INFO:
			return Object.assign({}, state, {
		        open:action.show,
			});
		default:
			return state;
	}
}
