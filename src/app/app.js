import React from 'react';
import {render} from 'react-dom';

import Root from './containers/root';
import {Provider} from 'react-redux';
import configureStore from './store/configure-store';

const store = configureStore();

import injectTapEventPlugin from 'react-tap-event-plugin';

// Helpers for debugging
window.React = React;
window.Perf = require('react-addons-perf');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/**
 * Render the main app component. You can read more about the react-router here:
 * https://github.com/reactjs/react-router/blob/master/docs/guides/README.md
 */
render(
	<Provider store={store}>
    	<Root />
    </Provider>
, document.getElementById('app'));
