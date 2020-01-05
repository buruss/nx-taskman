import React, {Component} from "react";
import {Layout, ConfigProvider} from "antd";
import {IntlProvider} from 'react-intl';
import {connect} from "react-redux";

import Sidebar from "../Sidebar/index";
import HorizontalDefault from "../Topbar/HorizontalDefault/index";
import HorizontalDark from "../Topbar/HorizontalDark/index";
import InsideHeader from "../Topbar/InsideHeader/index";
import AboveHeader from "../Topbar/AboveHeader/index";
import BelowHeader from "../Topbar/BelowHeader/index";
import Topbar from "../Topbar/index";
import {footerText} from "../../util/config";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_DARK
} from "../../constants/ThemeSetting";
import NoHeaderNotification from "../Topbar/NoHeaderNotification/index";
import AppLocale from "../../lngProvider";
import Customizer from "../Customizer";

const {Content, Footer} = Layout;

interface Props {
  width, themeType, layoutType, locale, navStyle, children
}

class AppLayout extends Component<Props> {

  getContainerClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-container-wrap";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-container-wrap";
      default:
        return '';
    }
  };
  getNavStyles = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL :
        return <HorizontalDefault/>;
      case NAV_STYLE_DARK_HORIZONTAL :
        return <HorizontalDark/>;
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL :
        return <InsideHeader/>;
      case NAV_STYLE_ABOVE_HEADER :
        return <AboveHeader/>;
      case NAV_STYLE_BELOW_HEADER :
        return <BelowHeader/>;
      case NAV_STYLE_FIXED :
        return <Topbar/>;
      case NAV_STYLE_DRAWER :
        return <Topbar/>;
      case NAV_STYLE_MINI_SIDEBAR :
        return <Topbar/>;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR :
        return <NoHeaderNotification/>;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR :
        return <NoHeaderNotification/>;
      default :
        return null;
    }
  };

  getSidebar = (navStyle, width) => {
    if (width < TAB_SIZE) {
      return <Sidebar/>;
    }
    switch (navStyle) {
      case NAV_STYLE_FIXED :
        return <Sidebar/>;
      case NAV_STYLE_DRAWER :
        return <Sidebar/>;
      case NAV_STYLE_MINI_SIDEBAR :
        return <Sidebar/>;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR :
        return <Sidebar/>;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <Sidebar/>;
      default :
        return null;
    }
  };

  render() {
    const {width, themeType, layoutType, locale, navStyle, children} = this.props;
    let bodyClass = "";
    if (themeType === THEME_TYPE_DARK) {
      bodyClass = "dark-theme"
    }
    const currentAppLocale = AppLocale[locale.locale];
    return (
      <ConfigProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>
          <Layout className={`gx-app-layout ${bodyClass}`}>
            {this.getSidebar(navStyle, width)}
            <Layout>
              {this.getNavStyles(navStyle)}
              <Content className={`gx-layout-content ${this.getContainerClass(navStyle)}`}>
                <div className="gx-main-content-wrapper">
                  {children}
                </div>
                <Footer>
                  <div className="gx-layout-footer-content">
                    {footerText}
                  </div>
                </Footer>
              </Content>
            </Layout>
            <Customizer/>
          </Layout>
        </IntlProvider>
      </ConfigProvider>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {width, themeType, layoutType, navStyle, locale} = settings;
  return {width, themeType, layoutType, navStyle, locale}
};
export default connect(mapStateToProps)(AppLayout);

