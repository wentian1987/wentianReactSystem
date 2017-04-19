'use strict';

import * as types from '../constants/ActionTypes';

export function snackbarInfo(message){
    return dispatch => {
        dispatch(changeSnackbarInfo(message));
    }
}

export function snackbarInfoShow(show){
    return dispatch => {
        dispatch(changeSnackbarInfoShow(show));
    }
}

function changeSnackbarInfo(message) {
    return {
        type: types.CHANGE_SNACKBAR_INFO,
        message:message,
    };
}

function changeSnackbarInfoShow(show) {
    return {
        type: types.CHANGE_SNACKBAR_SHOW_INFO,
        show:show,
    };
}