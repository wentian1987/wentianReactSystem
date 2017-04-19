import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import spacing from 'material-ui/styles/spacing';
import Snackbar from 'material-ui/Snackbar'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {darkWhite, lightWhite, grey900} from 'material-ui/styles/colors';
import AppNavDrawer from './AppNavDrawerMain';
import FullWidthSection from './FullWidthSectionMain';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';
import RaisedButton from 'material-ui/RaisedButton';

import {connect} from 'react-redux';

import {snackbarInfoShow} from './../actions/snackbar';

// 返回页首配置。
import Back2Top from 'react-back2top';
import {FloatingActionButton} from 'material-ui';
import UpIcon from 'material-ui/svg-icons/navigation/arrow-upward';

class MasterMain extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    width: PropTypes.number.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object,
  };

  state = {
    navDrawerOpen: false,
  };

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme(),
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }

  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      footer: {
        backgroundColor: grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356,
      },
      browserstack: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: '25px 15px 0',
        padding: 0,
        color: lightWhite,
        lineHeight: '25px',
        fontSize: 12,
      },
      browserstackLogo: {
        margin: '0 3px',
      },
      iconButton: {
        color: darkWhite,
      },

      demoStyle: {
        margin: '16px 32px 0px 32px',
      },
    };

    if (this.props.width === MEDIUM || this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles;
  }

  handleTouchTapLeftIconButton = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  };

  handleChangeRequestNavDrawer = (open) => {
    this.setState({
      navDrawerOpen: open,
    });
  };

  handleChangeList = (event, value) => {
    this.context.router.push(value);
    this.setState({
      navDrawerOpen: false,
    });
  };

  handleChangeMuiTheme = (muiTheme) => {
    this.setState({
      muiTheme: muiTheme,
    });
  };

  handleTouchTapDemo = () => {
    this.context.router.push('/home');
  };

  handleRequestClose = ()=> {
    const {dispatch} = this.props;
    dispatch(snackbarInfoShow(false));
  }

  render() {
    const {
      location,
      children,
    } = this.props;

    let {
      navDrawerOpen,
    } = this.state;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const router = this.context.router;
    const styles = this.getStyles();
    const title =
      router.isActive('/get-started') ? 'Get Started' :
      router.isActive('/customization') ? 'Customization' :
      router.isActive('/components') ? 'Components' :
      router.isActive('/discover-more') ? 'Discover More' : '自动化测试系统';

    let docked = false;
    let showMenuIconButton = true;

    if (this.props.width === LARGE && title !== '自动化测试系统') {
      docked = true;
      navDrawerOpen = true;
      showMenuIconButton = false;

      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1,
      };
      styles.root.paddingLeft = 256;
      styles.footer.paddingLeft = 256;
    }

    const snackbarInfo = this.props.state.snackbarInfo;
    return (

      <div>
        <Title render={title} />
        <AppBar
          onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
          title={title}
          zDepth={0}
          /*iconElementRight={
            <IconButton
              iconClassName="muidocs-icon-custom-github"
              href="https://10.133.212.35:7010/ecif"
            />
          }*/
          style={styles.appBar}
          showMenuIconButton={showMenuIconButton}
        />
        {title !== '' ?
          <div style={prepareStyles(styles.root)}>
            <div style={prepareStyles(styles.content)}>
              {React.cloneElement(children, {
                onChangeMuiTheme: this.handleChangeMuiTheme,...this.props
              })}
            </div>
          </div> :
            children
        }
        <AppNavDrawer
          style={styles.navDrawer}
          location={location}
          docked={docked}
          onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
          onChangeList={this.handleChangeList}
          open={navDrawerOpen}
          {...this.props}
        />

        <Snackbar
          open={snackbarInfo.open}
          message={snackbarInfo.message}
          autoHideDuration={snackbarInfo.autoHideDuration}
          onRequestClose={this.handleRequestClose}
          style={{backgroundColor:'#ffd699'}}
        />

        <Back2Top visibilityHeight={200} scrollDuration={500}>
          <FloatingActionButton style={{backgroundColor:'red',
          position:'fixed',_position:'absolute',right:'42px',bottom:'15%'}}>
              <UpIcon/>
          </FloatingActionButton>
        </Back2Top>

        <FullWidthSection style={styles.footer}>

          <RaisedButton
            className="demo-button"
            label="模板-示例程序"
            onTouchTap={this.handleTouchTapDemo}
            style={styles.demoStyle}
            labelStyle={styles.label}
          />
          <br/>
          <p style={prepareStyles(styles.p)}>
            {'copyright by wentian，欢迎大家提出批评改进意见'}
            <br/>
            {' 邮件：wentian1@126.com '}
          </p>
          <p style={prepareStyles(styles.browserstack)}>
            {'Thank you to '}
            <a href="https://www.browserstack.com" style={prepareStyles(styles.browserstackLogo)} target="_blank">
              <img src="http://www.browserstack.com/images/layout/logo.png" height="25" width="auto" />
            </a>
            {' for providing real browser testing infrastructure.'}
          </p>
        </FullWidthSection>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {state:state}
}

export default withWidth()(connect(mapStateToProps)(MasterMain));
