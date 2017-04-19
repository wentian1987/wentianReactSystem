import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';

import DataTables from 'material-ui-datatables';

import withWidth, {LARGE} from 'material-ui/utils/withWidth';
import spacing from 'material-ui/styles/spacing';
import {fetchTestRuns} from './../../actions/testRun';
import {changeTestSuiteInfo} from './../../actions/testSuite';
import {changeTestCaseInfo} from './../../actions/testCase';
import { findDOMNode } from 'react-dom';
import scrollToAnim from './../../utils/ScrollUtils';

import {connect} from 'react-redux';

/**animation start*/
import ScrollAnim from 'rc-scroll-anim';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Animate from 'rc-animate';

const Link = ScrollAnim.Link;
const Element = ScrollAnim.Element;
const ScrollOverPack = ScrollAnim.OverPack;
const EventListener = ScrollAnim.Event;
ScrollAnim.scrollScreen.init({ loop: true });
import requestAnimationFrame from 'raf';
/**animation end*/

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  soapUITestRun: PropTypes.object.isRequired
};

const styles = {
  container: {
    textAlign: 'center',
  },
  component: {
    margin: '30px 20px'
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const TABLE_TESTRUN_COLUMNS_SORT_STYLE = [
  {
    key: 'id',
    label: 'id',
    tooltip: 'id',
    sortable: true,
    style: {
      
      color:'green',
      //backgroundColor:'red'
    }
  }, {
    key: 'statusState',
    label: '状态',
    tooltip: 'statusState',
    sortable: true,
  }, {
    key: 'operateDate',
    label: '操作时间',
  }, {
    key: 'operateUser',
    label: '操作人',
  }
];
const TABLE_TESTSUITE_COLUMNS_SORT_STYLE = [
  {
    key: 'id',
    label: 'id',
    tooltip: 'id',
    sortable: true,
    style: {
      color:'green',
      //backgroundColor:'red'
    }
  }, {
    key: 'name',
    label: '用例名',
    tooltip: 'name',
    sortable: true,
  }, {
    key: 'statusState',
    label: '状态',
    tooltip: 'statusState',
    sortable: true,
  }, {
    key: 'operateDate',
    label: '操作时间',
  }, {
    key: 'operateUser',
    label: '操作人',
  }
];
const TABLE_TESTCASE_COLUMNS_SORT_STYLE = [
  {
    key: 'id',
    label: 'id',
    tooltip: 'id',
    sortable: true,
    style: {
      
      color:'green',
      //backgroundColor:'red'
    }
  }, {
    key: 'name',
    label: '用例名',
    tooltip: 'name',
    sortable: true,
  }, {
    key: 'Reason',
    label: '失败原因',
    tooltip: 'Reason',
    sortable: true,
  }, {
    key: 'duration',
    label: '耗时(毫秒)',
    tooltip: 'duration',
    sortable: true,
  },{
    key: 'statusState',
    label: '状态',
    tooltip: 'statusState',
    sortable: true,
  }, {
    key: 'operateDate',
    label: '操作时间',
  }, {
    key: 'operateUser',
    label: '操作人',
  }
];
var scrollPosition = -1;
var scrollUpdate =false;
const rowSize = [3,5,10,20];
class HomePageMain extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };
  componentWillMount(){
    console.log('componentWillMount');
    this.setState({
      testRunRowSizeIndex : 1,
      testRunSelection : 0,
      testSuiteRowSizeIndex : 1,
      testSuiteSelection : 0,
      testSuiteViewShow : false,
      testCaseRowSizeIndex : 1,
      testCaseViewShow : false
    });
  };
  componentDidMount(){
    console.log('componentDidMount');
    const {dispatch} = this.props;
    dispatch(fetchTestRuns(true,true,true,1,5));  
        // 添加改变窗口事件,可加setTimeout
    EventListener.addEventListener('resize.userResize', this.barAnimate.bind(this));
  
  };

  componentDidUpdate() {
    if(scrollUpdate && scrollPosition > 0){
      //window.scrollTo(0, (scrollPosition - 75));
      scrollToAnim(Date.now(),(scrollPosition-75));
      scrollUpdate = false;
    }
  }

  onFocus = (e) => {
    this.dom = e.target;
    this.barAnimate();
  }

  onDataLoadEnd = (func) => {
    setTimeout(() => {
      this.setState({ show: true }, func);
    }, 1500);
  }

  barAnimate() {
    if (!this.dom) {
      return;
    }
    const bar = this.refs.bar;
    bar.style.left = `${this.dom.getBoundingClientRect().left}px`;
  }

  constructor(props, context) {
    super(props, context);
    this.handleTestRunRowSelection = this.handleTestRunRowSelection.bind(this);
    this.handleTestRunPreviousPageClick = this.handleTestRunPreviousPageClick.bind(this);
    this.handleTestRunNextPageClick = this.handleTestRunNextPageClick.bind(this);
    this.handleTestRunRowSizeChange = this.handleTestRunRowSizeChange.bind(this);

    this.handleTestSuiteRowSelection = this.handleTestSuiteRowSelection.bind(this);
    this.handleTestSuitePreviousPageClick = this.handleTestSuitePreviousPageClick.bind(this);
    this.handleTestSuiteNextPageClick = this.handleTestSuiteNextPageClick.bind(this);
    this.handleTestSuiteRowSizeChange = this.handleTestSuiteRowSizeChange.bind(this);

    this.handleTestCasePreviousPageClick = this.handleTestCasePreviousPageClick.bind(this);
    this.handleTestCaseNextPageClick = this.handleTestCaseNextPageClick.bind(this);
    this.handleTestCaseRowSizeChange = this.handleTestCaseRowSizeChange.bind(this);

  }

  handleTestRunRowSizeChange(index){
    console.log('handleTestRunRowSizeChange: ' + rowSize[index]); 
    this.setState({
      testRunRowSizeIndex : index,
    });
    const {dispatch} = this.props;
    dispatch(fetchTestRuns(true,true,true,1,rowSize[index])); 

    dispatch(changeTestSuiteInfo(1, rowSize[index]));
    dispatch(changeTestCaseInfo(1, rowSize[index]));   

    this.setState({
      testRunSelection:0,

      testSuiteSelection : 0,
      testSuiteViewShow : false,
      testCaseViewShow : false,
    });

  }

  handleTestRunRowSelection(selectedRows) {
    console.log('selectedRows: ' + selectedRows[0]);
    
    this.setState({
      testRunSelection:selectedRows,

      testSuiteSelection : 0,
      testSuiteViewShow : true,
      testCaseViewShow : false,

    });

    if(this.refs.testSuite != undefined){
       scrollPosition = this.refs.testSuite.offsetTop;
       scrollUpdate = true;
    }
  }
  handleTestRunPreviousPageClick() {
    console.log('handleTestRunPreviousPageClick');
    
    const {dispatch} = this.props;
    dispatch(fetchTestRuns(true,true,true,(this.props.state.soapUITestRun.page - 1),this.props.state.soapUITestRun.size)); 
  }

  handleTestRunNextPageClick() {
    console.log('handleTestRunNextPageClick');
    const {dispatch} = this.props;
    dispatch(fetchTestRuns(true,true,true,(this.props.state.soapUITestRun.page + 1),this.props.state.soapUITestRun.size));  
  }

  handleTestSuiteRowSizeChange(index){
    console.log('handleTestSuiteRowSizeChange: ' + rowSize[index]); 
    this.setState({
      testSuiteRowSizeIndex : index,

      testCaseSelection : 0,
      testCaseViewShow : false,
    });

    const {dispatch} = this.props;
    dispatch(changeTestSuiteInfo(1, rowSize[index]));  

    const testSuiteData = this.props.state.soapUITestSuite;
    console.log("testSuitePageInfo=" + (testSuiteData.page-1)*testSuiteData.size
     + "-" + ((testSuiteData.page-1)*testSuiteData.size + testSuiteData.size));
  }

  handleTestSuiteRowSelection(selectedRows) {
    console.log('selectedRows: ' + selectedRows[0]);
    
    this.setState({
      testCaseViewShow : true,
      testCaseSelection : selectedRows,
    });
    if(this.refs.testCase != undefined){
       scrollPosition = this.refs.testCase.offsetTop;
       scrollUpdate = true;
    }
  }

  handleTestSuitePreviousPageClick() {
    console.log('handleTestSuitePreviousPageClick');
    
    const {dispatch} = this.props;
    dispatch(changeTestSuiteInfo((this.props.state.soapUITestSuite.page - 1),this.props.state.soapUITestSuite.size)); 
  }

  handleTestSuiteNextPageClick() {
    console.log('handleTestSuiteNextPageClick');
    if(this.props.state.soapUITestSuite.page * this.props.state.soapUITestSuite.size < this.props.state.soapUITestRun.testRunList[this.state.testRunSelection].soapUITestSuite.length){
      const {dispatch} = this.props;
      dispatch(changeTestSuiteInfo((this.props.state.soapUITestSuite.page + 1),this.props.state.soapUITestSuite.size));  
    }else{

    }
  }

  handleTestCaseRowSizeChange(index){
    console.log('handleTestCaseRowSizeChange: ' + rowSize[index]); 
    this.setState({
      testCaseRowSizeIndex : index,
    });

    const {dispatch} = this.props;
    dispatch(changeTestCaseInfo(1, rowSize[index]));  
  }

  handleTestCasePreviousPageClick() {
    console.log('handleTestCasePreviousPageClick');
    
    const {dispatch} = this.props;
    dispatch(changeTestCaseInfo((this.props.state.soapUITestCase.page - 1),this.props.state.soapUITestCase.size)); 
  }

  handleTestCaseNextPageClick() {
    console.log('handleTestCaseNextPageClick');
    const {dispatch} = this.props;
    dispatch(changeTestCaseInfo((this.props.state.soapUITestCase.page + 1),this.props.state.soapUITestCase.size));  
  }

  render() {
    const style = {
      paddingTop: spacing.desktopGutterMini,
    };
    const testRunData = this.props.state.soapUITestRun;
    const testSuiteData = this.props.state.soapUITestSuite;
    const testCaseData = this.props.state.soapUITestCase;
    return (
      <div style={style}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <h1>测试情况总览</h1>

          <div style={styles.component}>
            <h2>test run情况概述</h2>
            <Card style={{margin: 12}}>
              <DataTables
                title={'test run'}
                height={'auto'}
                selectable={true}
                showRowHover={true}
                columns={TABLE_TESTRUN_COLUMNS_SORT_STYLE}
                
                filterHintText={'请录入搜索信息'}
                data={testRunData.testRunList}
                page={testRunData.page}         

                rowSizeLabel={'分页信息：'}
                summaryLabelTemplate={(start, end) => {return `${start} - ${end}`}}
     
                showCheckboxes={false}
                showHeaderToolbar={true}
                count={testRunData.page * testRunData.size + 1}

                onRowSelection={this.handleTestRunRowSelection}
                onNextPageClick={this.handleTestRunNextPageClick}
                onPreviousPageClick={this.handleTestRunPreviousPageClick}
                onSortOrderChange={this.handleTestRunSortOrderChange}
                onRowSizeChange={this.handleTestRunRowSizeChange}
                rowSize={rowSize[this.state.testRunRowSizeIndex]}
                rowSizeList = {rowSize}
              />
            </Card>
          </div>

          <div  ref="testSuite" />
          {testRunData.testRunList.length > 0 ?
          <div  style={styles.component,{display:this.state.testSuiteViewShow?'block':'none'}}>

            <h2>test suite情况概述</h2>
            <Card style={{margin: 12}}>
              <DataTables
                title={'test suite'}
                height={'auto'}
                selectable={true}
                showRowHover={true}
                columns={TABLE_TESTSUITE_COLUMNS_SORT_STYLE}
                
                filterHintText={'请录入搜索信息'}
                data={testRunData.testRunList[this.state.testRunSelection].soapUITestSuite.slice((testSuiteData.page-1)*testSuiteData.size,
                  (testSuiteData.page-1)*testSuiteData.size + testSuiteData.size)}
                page={testSuiteData.page}         

                rowSizeLabel={'分页信息：'}
                summaryLabelTemplate={(start, end, count) => {return `${start} - ${end}`}}
     
                showCheckboxes={false}
                showHeaderToolbar={true}
                count={testSuiteData.page * testSuiteData.size + 1}

                onRowSelection={this.handleTestSuiteRowSelection}
                onNextPageClick={this.handleTestSuiteNextPageClick}
                onPreviousPageClick={this.handleTestSuitePreviousPageClick}
                onRowSizeChange={this.handleTestSuiteRowSizeChange}

                rowSize={rowSize[this.state.testSuiteRowSizeIndex]}
                rowSizeList = {rowSize}
              />
            </Card>
          </div>
             :
              <div/>
          }
          <div  ref="testCase" />
          {testRunData.testRunList.length > 0?
          <div style={styles.component, {display:this.state.testCaseViewShow?'block':'none'}}>
            <h2>test case情况概述</h2>
            <Card style={{margin: 12}}>
              <DataTables
                title={'test case'}
                height={'auto'}
                selectable={true}
                showRowHover={true}
                columns={TABLE_TESTCASE_COLUMNS_SORT_STYLE}
                
                filterHintText={'请录入搜索信息'}
                data={testRunData.testRunList[this.state.testRunSelection]
                  .soapUITestSuite[this.state.testSuiteSelection].soapUITestCases.slice((testCaseData.page-1)*testCaseData.size,
                  (testCaseData.page-1)*testCaseData.size + testCaseData.size)}
                page={testCaseData.page}         

                rowSizeLabel={'分页信息：'}
                summaryLabelTemplate={(start, end, count) => {return `${start} - ${end}`}}
     
                showCheckboxes={false}
                showHeaderToolbar={true}
                count={testCaseData.page * testCaseData.size + 1}

                onNextPageClick={this.handleTestCaseNextPageClick}
                onPreviousPageClick={this.handleTestCasePreviousPageClick}

                onRowSizeChange={this.handleTestCaseRowSizeChange}
                rowSize={rowSize[this.state.testCaseRowSizeIndex]}
                rowSizeList = {rowSize}
              />
            </Card>
          </div>
           :
            <div/>
        }
        </div>
      </MuiThemeProvider>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const {soapUITestRun} = state;
  return {
    soapUITestRun
  };
}

export default withWidth()(connect(mapStateToProps)(HomePageMain));
