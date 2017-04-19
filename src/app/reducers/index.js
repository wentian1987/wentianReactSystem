'use strict';

import {combineReducers} from 'redux';
import test from './test';
import soapUITestRun from './soapUITestRun';
import soapUITestSuite from './soapUITestSuite';
import soapUITestCase from './soapUITestCase';
import snackbarInfo from './snackbarInfo';

const rootReducer = combineReducers({
	test,
	soapUITestRun,
	soapUITestSuite,
	soapUITestCase,
	snackbarInfo
});

export default rootReducer;