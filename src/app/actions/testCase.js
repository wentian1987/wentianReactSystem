'use strict';

import * as types from '../constants/ActionTypes';

export function changeTestCaseInfo(page,size){
    if (page === undefined) {
        page = 1;
    }
    if(size == undefined){
        size = 5;
    }
    return dispatch => {
        dispatch(changeTestCasePageInfo(page,size));
    }
}

function changeTestCasePageInfo(page,size) {
    return {
        type: types.CHANGE_TESTCASE_INFO,
        page:page,
        size:size
    };
}
