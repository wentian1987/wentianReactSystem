'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	isRefreshing: false,
	loading: false,
	isLoadMore: false,
	noMore: false,
	page:1,
	size:10,
	testRunList: []
};
export default function testRun(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_TESTRUN_LIST:
			return Object.assign({}, state, {
				isRefreshing: action.isRefreshing,
				loading: action.loading,
				isLoadMore: action.isLoadMore
			});
		case types.RECEIVE_TESTRUN_LIST:{
			return Object.assign({}, state, {
				isRefreshing: false,
				isLoadMore: false,
				noMore: false,
				testRunList:  action.testRunList,//combine(state, action),
				loading: state.testRunList  === undefined
			});
		}
		case types.CHANGE_TESTRUN_INFO:
			return Object.assign({}, state, {
				page:action.page,
		        size:action.size
			});
		default:
			return state;
	}
}

function combine(state, action) {
	state.testRunList  = action.testRunList;
	return state.testRunList;
}

function loadMore(state, action) {
	state.testRunList  = state.testRunList.concat(action.testRunList);
	return state.testRunList;
}