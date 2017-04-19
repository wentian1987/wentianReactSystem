'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {request} from '../utils/RequestUtils';
import {TEST} from '../constants/Urls';

export function fetchTest() {
    return dispatch => {
        return request(TEST, 'get')
            .then((test) => {
                console.log("test = " + test.name);
                dispatch(fetchTestOne(test));
                let errorMessage = test.res_error;
                if (errorMessage && errorMessage !== '') {
                    ToastShort(errorMessage);
                }
            })

        .catch((error) => {
            console.log(error);
            dispatch(fetchTestOne([]));
            ToastShort('网络发生错误，请重试');
        });
	}
}

function fetchTestOne(test) {
	return {
		type: types.TEST,
		test: test.name
	};
}