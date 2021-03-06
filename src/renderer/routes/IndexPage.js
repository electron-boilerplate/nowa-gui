/*
  入口页面，顶层页面
*/
import React, { PropTypes } from 'react';
import { connect } from 'dva';

import {
  SHUTDOWN_PAGE, PREINIT_PAGE, BOILERPLATE_PAGE, PROJECT_PAGE, WELCOME_PAGE,
  SETTING_PAGE, FEEDBACK_PAGE, IMPORT_STEP1_PAGE, IMPORT_STEP2_PAGE
} from 'const-renderer-nowa';

import ShutdownPage from './ShutdownPage';
import PreinitPage from './PreinitPage';
import MainPage from './MainPage';
import WelcomePage from './WelcomePage';
import SettingPage from './SettingPage';
import FeedbackPage from './FeedbackPage';
import LayoutWrap from '../components/Layout/Wrap';


const IndexPage = ({ showPage, dispatch }) => {
  let mainbody;

  switch (showPage) {
    case SHUTDOWN_PAGE:
      mainbody = <ShutdownPage />;
      break;
    case PREINIT_PAGE:
      mainbody = <PreinitPage />;
      break;
    case WELCOME_PAGE:
      mainbody = <WelcomePage />;
      break;
    case SETTING_PAGE:
      mainbody = <SettingPage />;
      break;
    case FEEDBACK_PAGE:
      mainbody = <FeedbackPage dispatch={dispatch} />;
      break;
    case IMPORT_STEP1_PAGE:
    case IMPORT_STEP2_PAGE:
    case BOILERPLATE_PAGE:
    case PROJECT_PAGE:
      mainbody = <MainPage />;
      break;
    default:
      mainbody = <div />;
      break;
  }

  return (
    <LayoutWrap>{mainbody}</LayoutWrap>
  );
};

IndexPage.propTypes = {
  showPage: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ layout }) => ({
  showPage: layout.showPage,
}))(IndexPage);