'use strict';

import * as types from '../constants/ActionTypes';

export function changeTestSuiteInfo(page,size){
    if (page === undefined) {
        page = 1;
    }
    if(size == undefined){
        size = 5;
    }
    return dispatch => {
        dispatch(changeTestSuitePageInfo(page,size));
    }
}

function changeTestSuitePageInfo(page,size) {
    return {
        type: types.CHANGE_TESTSUITE_INFO,
        page:page,
        size:size
    };
}
