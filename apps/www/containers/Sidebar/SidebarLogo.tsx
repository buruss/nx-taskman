import React, {Component} from "react";
import {connect} from "react-redux";
import Link from "next/link";

import {onNavStyleChange, toggleCollapsedSideNav} from "../../redux/actions/Setting";
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";

interface Props {width, themeType, navCollapsed, navStyle, toggleCollapsedSideNav, onNavStyleChange, }

class SidebarLogo extends Component<Props> {

  render() {
    const {width, themeType, navCollapsed} = this.props;
    let {navStyle} = this.props;
    if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
      navStyle = NAV_STYLE_DRAWER;
    }
    return (
      <div className="gx-layout-sider-header">

        {(navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) ? <div className="gx-linebar">

          <i
            className={`gx-icon-btn icon icon-${navStyle === NAV_STYLE_MINI_SIDEBAR ? 'menu-unfold' : 'menu-fold'} ${themeType !== THEME_TYPE_LITE ? 'gx-text-white' : ''}`}
            onClick={() => {
              if (navStyle === NAV_STYLE_DRAWER) {
                this.props.toggleCollapsedSideNav(!navCollapsed);
              } else if (navStyle === NAV_STYLE_FIXED) {
                this.props.onNavStyleChange(NAV_STYLE_MINI_SIDEBAR)
              } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
                this.props.toggleCollapsedSideNav(!navCollapsed);
              } else {
                this.props.onNavStyleChange(NAV_STYLE_FIXED)
              }
            }}
          />
        </div> : null}

        <Link href="/">
          {navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR && width >= TAB_SIZE ?
            <img alt="" src={"/images/w-logo.png"}/> :
            themeType === THEME_TYPE_LITE ?
              <img alt="" src={"/images/logo-white.png"}/> :
              <img alt="" src={"/images/logo.png"}/>}

        </Link>

      </div>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {navStyle, themeType, width, navCollapsed} = settings;
  return {navStyle, themeType, width, navCollapsed}
};

export default connect(mapStateToProps, {
  onNavStyleChange,
  toggleCollapsedSideNav
})(SidebarLogo);
