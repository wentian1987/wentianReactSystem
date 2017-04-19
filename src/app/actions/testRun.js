'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {request} from '../utils/RequestUtils';
import {SOAPUI_TESTRUN_LIST} from '../constants/Urls';
import {snackbarInfo} from './snackbar';

export function fetchTestRuns(isRefreshing, loading, isLoadMore, page, size) {
    if (page === undefined) {
        page = 1;
    }
    if(size == undefined){
        size = 10;
    }
    return dispatch => {
        dispatch(fetchTestRunList(isRefreshing, loading, isLoadMore));
        return request(SOAPUI_TESTRUN_LIST + '?' + 'page=' + (page-1) + '&size=' + size, 'get')
      .then((testRunList) => {
        if(testRunList.length == 0){
            //dispatch(ToastShort('没有更多数据了。'));

            dispatch(snackbarInfo('没有更多数据了。'));
            return;
        }
        dispatch(changeTestRunPageInfo(page,size));
        dispatch(receiveTestRunList(testRunList));
        let errorMessage = testRunList.showapi_res_error;
        if (errorMessage && errorMessage !== '') {
            dispatch(snackbarInfo(errorMessage));
        }
      })
      .catch((error) => {
        dispatch(receiveTestRunList([]));
        dispatch(snackbarInfo('网络发生错误，请重试'));
      });
    };
}

function changeTestRunPageInfo(page,size) {
    return {
        type: types.CHANGE_TESTRUN_INFO,
        page: page,
        size: size
    };
}

function fetchTestRunList(isRefreshing, loading, isLoadMore,page,size) {
    if (isLoadMore === undefined) {
        isLoadMore = false;
    }
    return {
        type: types.FETCH_TESTRUN_LIST,
        isRefreshing: isRefreshing,
        loading: loading,
        isLoadMore: isLoadMore
    };
}

function receiveTestRunList(testRunList) {
    return {
        type: types.RECEIVE_TESTRUN_LIST,
        testRunList: testRunList
    };
}