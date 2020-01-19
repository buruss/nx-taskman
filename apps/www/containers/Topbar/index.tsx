import React, { Component } from 'react';
import { Layout, Popover } from 'antd';
import Link from 'next/link';

import languageData from './languageData';
import {
  switchLanguage,
  toggleCollapsedSideNav,
} from '../../redux/actions/Setting';
import SearchBox from '../../components/SearchBox';
import UserInfo from '../../components/UserInfo';
import AppNotification from '../../components/AppNotification';
import CustomScrollbars from '../../util/CustomScrollbars';

import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE,
} from '../../constants/ThemeSetting';
import { connect } from 'react-redux';

const { Header } = Layout;

interface Props {
  locale;
  width;
  navCollapsed;
  navStyle;
  switchLanguage;
  toggleCollapsedSideNav;
}

class Topbar extends Component<Props> {
  state = {
    searchText: '',
  };

  languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language => (
          <li
            className="gx-media gx-pointer"
            key={JSON.stringify(language)}
            onClick={e => this.props.switchLanguage(language)}
          >
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
            <span className="gx-language-text">{language.name}</span>
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );

  updateSearchChatUser = evt => {
    this.setState({
      searchText: evt.target.value,
    });
  };

  render() {
    const { locale, width, navCollapsed, navStyle } = this.props;
    return (
      <>
        <Header>
          {navStyle === NAV_STYLE_DRAWER ||
          ((navStyle === NAV_STYLE_FIXED ||
            navStyle === NAV_STYLE_MINI_SIDEBAR) &&
            width < TAB_SIZE) ? (
            <div className="gx-linebar gx-mr-3">
              <i
                className="gx-icon-btn icon icon-menu"
                onClick={() => {
                  this.props.toggleCollapsedSideNav(!navCollapsed);
                }}
              />
            </div>
          ) : null}
          <Link href="/">
            <a className="gx-d-block gx-d-lg-none gx-pointer">
              <img alt="" src={'/images/w-logo.png'} />
            </a>
          </Link>

          <SearchBox
            styleName="gx-d-none gx-d-lg-block gx-lt-icon-search-bar-lg"
            placeholder="Search in app..."
            onChange={this.updateSearchChatUser.bind(this)}
            value={this.state.searchText}
          />
          <ul className="gx-header-notifications gx-ml-auto">
            <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
              <Popover
                overlayClassName="gx-popover-horizantal"
                placement="bottomRight"
                content={
                  <SearchBox
                    styleName="gx-popover-search-bar"
                    placeholder="Search in app..."
                    onChange={this.updateSearchChatUser.bind(this)}
                    value={this.state.searchText}
                  />
                }
                trigger="click"
              >
                <span className="gx-pointer gx-d-block">
                  <i className="icon icon-search-new" />
                </span>
              </Popover>
            </li>
            {width >= TAB_SIZE ? null : (
              <>
                <li className="gx-notify">
                  <Popover
                    overlayClassName="gx-popover-horizantal"
                    placement="bottomRight"
                    content={<AppNotification />}
                    trigger="click"
                  >
                    <span className="gx-pointer gx-d-block">
                      <i className="icon icon-notification" />
                    </span>
                  </Popover>
                </li>
              </>
            )}
            <li className="gx-language">
              <Popover
                overlayClassName="gx-popover-horizantal"
                placement="bottomRight"
                content={this.languageMenu()}
                trigger="click"
              >
                <span className="gx-pointer gx-flex-row gx-align-items-center">
                  <i className={`flag flag-24 flag-${locale.icon}`} />
                  <span className="gx-pl-2 gx-language-name">
                    {locale.name}
                  </span>
                  <i className="icon icon-chevron-down gx-pl-2" />
                </span>
              </Popover>
            </li>
            <li className="gx-user-nav">
              <UserInfo />
            </li>
          </ul>
        </Header>
      </>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale, navStyle, navCollapsed, width } = settings;
  return { locale, navStyle, navCollapsed, width };
};

export default connect(mapStateToProps, {
  toggleCollapsedSideNav,
  switchLanguage,
})(Topbar);
