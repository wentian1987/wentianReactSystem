'use strict';
import React, {
  Component
} from 'react';

import {render} from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import AppRoutes from './../AppRoutes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {createHashHistory} from 'history';

// Helpers for debugging
window.React = React;
window.Perf = require('react-addons-perf');

class Root extends Component {
  render() {
    return (
	  <Router
	    history={useRouterHistory(createHashHistory)({queryKey: false})}
	    onUpdate={() => window.scrollTo(0, 0)}
	  >
	    {AppRoutes}
	  </Router>
    );
  }
};
export default Root;