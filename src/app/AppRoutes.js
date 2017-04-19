import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

// Here we define all our material-ui ReactComponents.
import Master from './components-example/Master';
import Home from './components-example/pages/Home';

import RequiredKnowledge from './components-example/pages/get-started/RequiredKnowledge';
import Installation from './components-example/pages/get-started/Installation';
import Usage from './components-example/pages/get-started/Usage';
import Examples from './components-example/pages/get-started/Examples';
import ServerRendering from './components-example/pages/get-started/ServerRendering';

import Colors from './components-example/pages/customization/Colors';
import Themes from './components-example/pages/customization/Themes';
import Styles from './components-example/pages/customization/Styles';

import AppBarPage from './components-example/pages/components/AppBar/Page';
import AutoCompletePage from './components-example/pages/components/AutoComplete/Page';
import AvatarPage from './components-example/pages/components/Avatar/Page';
import BadgePage from './components-example/pages/components/Badge/Page';
import BottomNavigationPage from './components-example/pages/components/BottomNavigation/Page';
import CardPage from './components-example/pages/components/Card/Page';
import ChipPage from './components-example/pages/components/Chip/Page';
import CircularProgressPage from './components-example/pages/components/CircularProgress/Page';
import CheckboxPage from './components-example/pages/components/Checkbox/Page';
import DatePicker from './components-example/pages/components/DatePicker/Page';
import DialogPage from './components-example/pages/components/Dialog/Page';
import DividerPage from './components-example/pages/components/Divider/Page';
import DrawerPage from './components-example/pages/components/Drawer/Page';
import DropDownMenuPage from './components-example/pages/components/DropDownMenu/Page';
import FlatButtonPage from './components-example/pages/components/FlatButton/Page';
import FloatingActionButtonPage from './components-example/pages/components/FloatingActionButton/Page';
import FontIconPage from './components-example/pages/components/FontIcon/Page';
import GridListPage from './components-example/pages/components/GridList/Page';
import IconButtonPage from './components-example/pages/components/IconButton/Page';
import IconMenuPage from './components-example/pages/components/IconMenu/Page';
import ListPage from './components-example/pages/components/List/Page';
import LinearProgressPage from './components-example/pages/components/LinearProgress/Page';
import PaperPage from './components-example/pages/components/Paper/Page';
import MenuPage from './components-example/pages/components/Menu/Page';
import PopoverPage from './components-example/pages/components/Popover/Page';
import RaisedButtonPage from './components-example/pages/components/RaisedButton/Page';
import RefreshIndicatorPage from './components-example/pages/components/RefreshIndicator/Page';
import RadioButtonPage from './components-example/pages/components/RadioButton/Page';
import SelectField from './components-example/pages/components/SelectField/Page';
import SliderPage from './components-example/pages/components/Slider/Page';
import SnackbarPage from './components-example/pages/components/Snackbar/Page';
import SvgIconPage from './components-example/pages/components/SvgIcon/Page';
import SubheaderPage from './components-example/pages/components/Subheader/Page';
import TablePage from './components-example/pages/components/Table/Page';
import TabsPage from './components-example/pages/components/Tabs/Page';
import TextFieldPage from './components-example/pages/components/TextField/Page';
import TimePickerPage from './components-example/pages/components/TimePicker/Page';
import TogglePage from './components-example/pages/components/Toggle/Page';
import ToolbarPage from './components-example/pages/components/Toolbar/Page';

import Community from './components-example/pages/discover-more/Community';
import Contributing from './components-example/pages/discover-more/Contributing';
import Showcase from './components-example/pages/discover-more/Showcase';
import RelatedProjects from './components-example/pages/discover-more/RelatedProjects';

import StepperPage from './components-example/pages/components/Stepper/Page';

/*------------------------------*/
import MasterMain from './components/MasterMain';
import HomeMain from './components/pages/HomeMain';

/**
 * Routes: https://github.com/reactjs/react-router/blob/master/docs/API.md#route
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > Master
 */
const AppRoutes = (
  <Route path="/" component={MasterMain}>
    <IndexRoute component={HomeMain} />

    <Route path="home" component={Home} />
    <Redirect from="get-started" to="/get-started/required-knowledge" />
    <Route path="get-started">
      <Route path="required-knowledge" component={RequiredKnowledge} />
      <Route path="installation" component={Installation} />
      <Route path="usage" component={Usage} />
      <Route path="examples" component={Examples} />
      <Route path="server-rendering" component={ServerRendering} />
    </Route>
    <Redirect from="customization" to="/customization/themes" />
    <Route path="customization">
      <Route path="colors" component={Colors} />
      <Route path="themes" component={Themes} />
      <Route path="styles" component={Styles} />
    </Route>
    <Redirect from="components" to="/components/app-bar" />
    <Route path="components">
      <Route path="app-bar" component={AppBarPage} />
      <Route path="auto-complete" component={AutoCompletePage} />
      <Route path="avatar" component={AvatarPage} />
      <Route path="bottom-navigation" component={BottomNavigationPage} />
      <Route path="badge" component={BadgePage} />
      <Route path="card" component={CardPage} />
      <Route path="chip" component={ChipPage} />
      <Route path="circular-progress" component={CircularProgressPage} />
      <Route path="checkbox" component={CheckboxPage} />
      <Route path="date-picker" component={DatePicker} />
      <Route path="dialog" component={DialogPage} />
      <Route path="divider" component={DividerPage} />
      <Route path="drawer" component={DrawerPage} />
      <Route path="dropdown-menu" component={DropDownMenuPage} />
      <Route path="font-icon" component={FontIconPage} />
      <Route path="flat-button" component={FlatButtonPage} />
      <Route path="floating-action-button" component={FloatingActionButtonPage} />
      <Route path="grid-list" component={GridListPage} />
      <Route path="icon-button" component={IconButtonPage} />
      <Route path="icon-menu" component={IconMenuPage} />
      <Route path="list" component={ListPage} />
      <Route path="linear-progress" component={LinearProgressPage} />
      <Route path="paper" component={PaperPage} />
      <Route path="menu" component={MenuPage} />
      <Route path="popover" component={PopoverPage} />
      <Route path="refresh-indicator" component={RefreshIndicatorPage} />
      <Route path="radio-button" component={RadioButtonPage} />
      <Route path="raised-button" component={RaisedButtonPage} />
      <Route path="select-field" component={SelectField} />
      <Route path="svg-icon" component={SvgIconPage} />
      <Route path="slider" component={SliderPage} />
      <Route path="snackbar" component={SnackbarPage} />
      <Route path="stepper" component={StepperPage} />
      <Route path="subheader" component={SubheaderPage} />
      <Route path="table" component={TablePage} />
      <Route path="tabs" component={TabsPage} />
      <Route path="text-field" component={TextFieldPage} />
      <Route path="time-picker" component={TimePickerPage} />
      <Route path="toggle" component={TogglePage} />
      <Route path="toolbar" component={ToolbarPage} />
    </Route>
    <Redirect from="discover-more" to="/discover-more/community" />
    <Route path="discover-more">
      <Route path="community" component={Community} />
      <Route path="contributing" component={Contributing} />
      <Route path="showcase" component={Showcase} />
      <Route path="related-projects" component={RelatedProjects} />
    </Route>
  </Route>
);

export default AppRoutes;
