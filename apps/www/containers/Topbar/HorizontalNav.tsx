import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import IntlMessages from '../../util/IntlMessages';
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
} from '../../constants/ThemeSetting';
import { setPathName } from '../../redux/actions/Setting';
import { injectIntl } from 'react-intl';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

interface Props {
  setPathName;
  intl;
  pathname;
  navStyle;
}

class HorizontalNav extends Component<Props> {
  getNavStyleSubMenuClass = navStyle => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return 'gx-menu-horizontal gx-submenu-popup-curve';
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return 'gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve';
      case NAV_STYLE_BELOW_HEADER:
        return 'gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve';
      case NAV_STYLE_ABOVE_HEADER:
        return 'gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve';
      default:
        return 'gx-menu-horizontal';
    }
  };

  componentDidMount() {
    this.props.setPathName(Router.pathname);
  }

  render() {
    const { pathname, navStyle, intl } = this.props;
    const defaultOpenKeys = pathname.split('/')[1];
    return (
      <Menu
        onClick={e => {
          const pathName = e.key;
          this.props.setPathName(pathName);
        }}
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[pathname]}
        mode="horizontal"
      >
        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="main"
          title={intl.formatMessage({ id: 'sidebar.main' })}
        >
          <SubMenu
            className="gx-menu-horizontal"
            key="dashboard"
            title={
              <span>
                {' '}
                <i className="icon icon-dasbhoard" />
                <IntlMessages id="sidebar.dashboard" />
              </span>
            }
          >
            <Menu.Item key="main/dashboard/crypto">
              <Link href="/main/dashboard/crypto">
                <a>
                  <i className="icon icon-crypto" />
                  <IntlMessages id="sidebar.dashboard.crypto" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="main/dashboard/crm">
              <Link href="/main/dashboard/crm">
                <a>
                  {' '}
                  <i className="icon icon-crm" />
                  <IntlMessages id="sidebar.dashboard.crm" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="main/dashboard/listing">
              <Link href="/main/dashboard/listing">
                <a>
                  {' '}
                  <i className="icon icon-listing-dbrd" />
                  <IntlMessages id="sidebar.dashboard.listing" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="main/widgets">
            <Link href="/main/widgets">
              <a>
                {' '}
                <i className="icon icon-widgets" />
                <IntlMessages id="sidebar.widgets" />
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="main/metrics">
            <Link href="/main/metrics">
              <a>
                <i className="icon icon-apps" />
                <IntlMessages id="sidebar.metrics" />
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="main/algolia">
            <Link href="/main/algolia">
              <a>
                <i className="icon icon-shopping-cart " />
                <IntlMessages id="sidebar.algolia" />
              </a>
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="in-built-apps"
          title={intl.formatMessage({ id: 'sidebar.inBuiltApp' })}
        >
          <Menu.Item key="in-built-apps/mail">
            <Link href="/in-built-apps/mail">
              <a>
                <i className="icon icon-email" />
                <IntlMessages id="sidebar.mailApp" />
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="in-built-apps/todo">
            <Link href="/in-built-apps/todo">
              <a>
                <i className="icon icon-check-square-o" />
                <IntlMessages id="sidebar.todoApp" />
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="in-built-apps/contacts">
            <Link href="/in-built-apps/contacts">
              <a>
                <i className="icon icon-contacts" />
                <IntlMessages id="sidebar.contactsApp" />
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="in-built-apps/chat">
            <Link href="/in-built-apps/chat">
              <a>
                <i className="icon icon-chat-bubble -flex-column-reverse" />
                <IntlMessages id="sidebar.chatApp" />
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="social-apps/profile">
            <Link href="/social-apps/profile">
              <a>
                {' '}
                <i className="icon icon-profile2" />
                <IntlMessages id="sidebar.extensions.profile" />
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="social-apps/wall">
            <Link href="/social-apps/wall">
              <a>
                <i className="icon icon-avatar -flex-column-reverse" />
                <IntlMessages id="sidebar.wall" />
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="in-built-apps/notes">
            <Link href="/in-built-apps/notes">
              <a>
                {' '}
                <i className="icon icon-copy" />
                <IntlMessages id="sidebar.notes" />
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="in-built-apps/firebase-crud">
            <Link href="/in-built-apps/firebase-crud">
              <a>
                {' '}
                <i className="icon icon-icon" />
                <IntlMessages id="sidebar.crud" />
              </a>
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="components"
          title={intl.formatMessage({ id: 'sidebar.components' })}
        >
          <SubMenu
            className="gx-menu-horizontal"
            key="general"
            title={
              <span>
                <i className="icon icon-all-contacts" />
                <IntlMessages id="sidebar.components.general" />
              </span>
            }
          >
            <Menu.Item key="components/general/button">
              <Link href="/components/general/button">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.general.button" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/general/icon">
              <Link href="/components/general/icon">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.general.icon" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            className="gx-menu-horizontal"
            key="navigation"
            title={
              <span>
                <i className="icon icon-navigation" />
                <IntlMessages id="sidebar.components.navigation" />
              </span>
            }
          >
            <Menu.Item key="components/navigation/affix">
              <Link href="/components/navigation/affix">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.navigation.affix" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/navigation/breadcrumb">
              <Link href="/components/navigation/breadcrumb">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.navigation.breadcrumb" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/navigation/dropdown">
              <Link href="/components/navigation/dropdown">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.navigation.dropdown" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/navigation/menu">
              <Link href="/components/navigation/menu">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.navigation.menu" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/navigation/pagination">
              <Link href="/components/navigation/pagination">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.navigation.pagination" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/navigation/steps">
              <Link href="/components/navigation/steps">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.navigation.steps" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            className="gx-menu-horizontal"
            key="dataEntry"
            title={
              <span>
                <i className="icon icon-data-entry" />
                <IntlMessages id="sidebar.components.dataEntry" />
              </span>
            }
          >
            <Menu.Item key="components/dataEntry/autoComplete">
              <Link href="/components/dataEntry/autoComplete">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.autoComplete" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/checkbox">
              <Link href="/components/dataEntry/checkbox">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.checkbox" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/cascader">
              <Link href="/components/dataEntry/cascader">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.cascader" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/datePicker">
              <Link href="/components/dataEntry/datePicker">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.datePicker" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/form">
              <Link href="/components/dataEntry/form">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.form" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/inputNumber">
              <Link href="/components/dataEntry/inputNumber">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.inputNumber" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/input">
              <Link href="/components/dataEntry/input">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.input" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/mention">
              <Link href="/components/dataEntry/mention">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.mention" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/rate">
              <Link href="/components/dataEntry/rate">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.rate" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/radio">
              <Link href="/components/dataEntry/radio">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.radio" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/switch">
              <Link href="/components/dataEntry/switch">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.switch" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/slider">
              <Link href="/components/dataEntry/slider">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.slider" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/select">
              <Link href="/components/dataEntry/select">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.select" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/treeSelect">
              <Link href="/components/dataEntry/treeSelect">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.treeSelect" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/transfer">
              <Link href="/components/dataEntry/transfer">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.transfer" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/timePicker">
              <Link href="/components/dataEntry/timePicker">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.timePicker" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataEntry/upload">
              <Link href="/components/dataEntry/upload">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataEntry.upload" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            className="gx-menu-horizontal"
            key="dataDisplay"
            title={
              <span>
                <i className="icon icon-data-display" />

                <IntlMessages id="sidebar.components.dataDisplay" />
              </span>
            }
          >
            <Menu.Item key="components/dataDisplay/avatar">
              <Link href="/components/dataDisplay/avatar">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataDisplay.avatar" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataDisplay/badge">
              <Link href="/components/dataDisplay/badge">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataDisplay.badge" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataDisplay/collapse">
              <Link href="/components/dataDisplay/collapse">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataDisplay.collapse" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataDisplay/carousel">
              <Link href="/components/dataDisplay/carousel">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataDisplay.carousel" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataDisplay/card">
              <Link href="/components/dataDisplay/card">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataDisplay.card" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataDisplay/calendar">
              <Link href="/components/dataDisplay/calendar">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataDisplay.calender" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataDisplay/list">
              <Link href="/components/dataDisplay/list">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataDisplay.list" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataDisplay/popover">
              <Link href="/components/dataDisplay/popover">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataDisplay.popover" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataDisplay/tree">
              <Link href="/components/dataDisplay/tree">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataDisplay.tree" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataDisplay/tooltip">
              <Link href="/components/dataDisplay/tooltip">
                <a>
                  <IntlMessages id="sidebar.dataDisplay.toolTips" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataDisplay/timeline">
              <Link href="/components/dataDisplay/timeline">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataDisplay.timeLine" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataDisplay/tag">
              <Link href="/components/dataDisplay/tag">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataDisplay.tag" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/dataDisplay/tabs">
              <Link href="/components/dataDisplay/tabs">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.dataDisplay.tabs" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            className="gx-menu-horizontal"
            key="feedBack"
            title={
              <span>
                <i className="icon icon-feedback" />
                <IntlMessages id="sidebar.components.feedBack" />
              </span>
            }
          >
            <Menu.Item key="components/feedBack/alert">
              <Link href="/components/feedBack/alert">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.feedBack.alert" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/feedBack/modal">
              <Link href="/components/feedBack/modal">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.feedBack.modal" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/feedBack/message">
              <Link href="/components/feedBack/message">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.feedBack.message" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/feedBack/notification">
              <Link href="/components/feedBack/notification">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.feedBack.notification" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/feedBack/progress">
              <Link href="/components/feedBack/progress">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.feedBack.progress" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/feedBack/popconfirm">
              <Link href="/components/feedBack/popconfirm">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.feedBack.popConfirm" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/feedBack/spin">
              <Link href="/components/feedBack/spin">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.feedBack.spin" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            className="gx-menu-horizontal"
            key="others"
            title={
              <span>
                <i className="icon icon-inbox" />
                <IntlMessages id="sidebar.components.other" />
              </span>
            }
          >
            <Menu.Item key="components/others/anchor">
              <Link href="/components/others/anchor">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.other.anchor" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/others/backtop">
              <Link href="/components/others/backtop">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.other.backTop" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/others/divider">
              <Link href="/components/others/divider">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.other.divider" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            className="gx-menu-horizontal"
            key="table"
            title={
              <span>
                <i className="icon icon-table" />
                <IntlMessages id="sidebar.dataDisplay.table" />
              </span>
            }
          >
            <Menu.Item key="components/table/basic">
              <Link href="/components/table/basic">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.view.basicTable" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="components/table/data">
              <Link href="/components/table/data">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.view.dataTable" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="extraComponents"
          title={intl.formatMessage({ id: 'sidebar.extraComponents' })}
        >
          <SubMenu
            className="gx-menu-horizontal"
            key="editor"
            title={
              <span>
                <i className="icon icon-editor" />
                <IntlMessages id="sidebar.editors" />
              </span>
            }
          >
            <Menu.Item key="extra-components/editor/ck">
              <Link href="/extra-components/editor/ck">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.editors.CKEditor" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="extra-components/editor/wysiswyg">
              <Link href="/extra-components/editor/wysiswyg">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.editors.WYSISWYGEditor" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="extra-components/color-picker">
            <Link href="/extra-components/color-picker">
              <a>
                {' '}
                <i className="icon icon-picker" />
                <IntlMessages id="sidebar.pickers.colorPickers" />
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="extra-components/dnd">
            <Link href="/extra-components/dnd">
              <a>
                {' '}
                <i className="icon icon-drag-and-drop" />
                <IntlMessages id="sidebar.extensions.dragNDrop" />
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="extra-components/sweet-alert">
            <Link href="/extra-components/sweet-alert">
              <a>
                {' '}
                <i className="icon icon-sweet-alert" />
                <IntlMessages id="sidebar.extensions.sweetAlert" />{' '}
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item key="extra-components/notification">
            <Link href="/extra-components/notification">
              <i className="icon icon-notification" />
              <a>
                {' '}
                <IntlMessages id="sidebar.extensions.notification" />
              </a>
            </Link>
          </Menu.Item>

          <SubMenu
            className="gx-menu-horizontal"
            key="time-line"
            title={
              <span>
                <i className="icon icon-timeline" />
                <IntlMessages id="sidebar.timeLine" />
              </span>
            }
          >
            <Menu.Item key="extra-components/time-line/default">
              <Link href="/extra-components/time-line/default">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.timeLine.default" />{' '}
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="extra-components/time-line/default-with-icon">
              <Link href="/extra-components/time-line/default-with-icon">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.timeLine.defaultwithIcons" />{' '}
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="extra-components/time-line/left-align">
              <Link href="/extra-components/time-line/left-align">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.timeLine.leftAligned" />{' '}
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="extra-components/shuffle">
            <Link href="/extra-components/shuffle">
              <a>
                {' '}
                <i className="icon icon-shuffle" />
                <IntlMessages id="sidebar.extensions.shuffle" />{' '}
              </a>
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="extensions"
          title={intl.formatMessage({ id: 'sidebar.extensions' })}
        >
          <MenuItemGroup
            key="map"
            title={intl.formatMessage({ id: 'sidebar.map' })}
          >
            <SubMenu
              className="gx-menu-horizontal"
              key="google"
              title={
                <span>
                  <i className="icon icon-map-google" />
                  <IntlMessages id="sidebar.google.map" />
                </span>
              }
            >
              <Menu.Item key="extensions/map/google/simple">
                <Link href="/extensions/map/google/simple">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.simple" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/google/styled">
                <Link href="/extensions/map/google/styled">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.styled" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/google/geo-location">
                <Link href="/extensions/map/google/geo-location">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.geoLocation" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/google/directions">
                <Link href="/extensions/map/google/directions">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.mapDirection" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/google/overlay">
                <Link href="/extensions/map/google/overlay">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.overlay" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/google/kml">
                <Link href="/extensions/map/google/kml">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.kmLayer" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/google/popup-info">
                <Link href="/extensions/map/google/popup-info">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.popupInfo" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/google/traffic">
                <Link href="/extensions/map/google/traffic">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.trafficLayer" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/google/street-view">
                <Link href="/extensions/map/google/street-view">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.streetView" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/google/event">
                <Link href="/extensions/map/google/event">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.eventListener" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/google/drawing">
                <Link href="/extensions/map/google/drawing">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.mapDrawing" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/google/clustering">
                <Link href="/extensions/map/google/clustering">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.mapClustering" />
                  </a>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              className="gx-menu-horizontal"
              key="ammap"
              title={
                <span>
                  <i className="icon icon-amchart" />
                  <IntlMessages id="sidebar.ammap" />
                </span>
              }
            >
              <Menu.Item key="extensions/map/ammap/animations-lines">
                <Link href="/extensions/map/ammap/animations-lines">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.animations.lines" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/ammap/curved-lines">
                <Link href="/extensions/map/ammap/curved-lines">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.curved.lines" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/ammap/zooming-countries">
                <Link href="/extensions/map/ammap/zooming-countries">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.zooming.countries" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/ammap/patterns">
                <Link href="/extensions/map/ammap/patterns">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.patterns" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/ammap/capitals-map">
                <Link href="/extensions/map/ammap/capitals-map">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.capitals.map" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/ammap/map-markers">
                <Link href="/extensions/map/ammap/map-markers">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.markers" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/ammap/flight-routes">
                <Link href="/extensions/map/ammap/flight-routes">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.flight.routes" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/ammap/choropleth">
                <Link href="/extensions/map/ammap/choropleth">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.choropleth" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/ammap/grouped-countries">
                <Link href="/extensions/map/ammap/grouped-countries">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.grouped.countries" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/ammap/bubbles">
                <Link href="/extensions/map/ammap/bubbles">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.bubbles" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/ammap/drill-down">
                <Link href="/extensions/map/ammap/drill-down">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.drill.down" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/ammap/multiple-areas">
                <Link href="/extensions/map/ammap/multiple-areas">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.multiple.areas" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/map/ammap/weather">
                <Link href="/extensions/map/ammap/weather">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.map.weather" />
                  </a>
                </Link>
              </Menu.Item>
            </SubMenu>
          </MenuItemGroup>

          <MenuItemGroup
            key="chart"
            title={intl.formatMessage({ id: 'sidebar.chart' })}
          >
            <SubMenu
              className="gx-menu-horizontal"
              key="rechart"
              title={
                <span>
                  <i className="icon icon-chart-area-new" />
                  <IntlMessages id="sidebar.components.rechart" />
                </span>
              }
            >
              <Menu.Item key="extensions/chart/recharts/area">
                <Link href="/extensions/chart/recharts/area">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.chart.area" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/chart/recharts/bar">
                <Link href="/extensions/chart/recharts/bar">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.chart.bar" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/chart/recharts/composed">
                <Link href="/extensions/chart/recharts/composed">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.chart.composed" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/chart/recharts/line">
                <Link href="/extensions/chart/recharts/line">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.chart.line" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/chart/recharts/pie">
                <Link href="/extensions/chart/recharts/pie">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.chart.pie" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/chart/recharts/radar">
                <Link href="/extensions/chart/recharts/radar">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.chart.radar" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/chart/recharts/radial">
                <Link href="/extensions/chart/recharts/radial">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.chart.radial" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/chart/recharts/scatter">
                <Link href="/extensions/chart/recharts/scatter">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.chart.scatter" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/chart/recharts/treemap">
                <Link href="/extensions/chart/recharts/treemap">
                  <a>
                    <IntlMessages id="sidebar.chart.tree" />
                  </a>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              className="gx-menu-horizontal"
              key="amchart"
              title={
                <span>
                  <i className="icon icon-amchart" />
                  <IntlMessages id="sidebar.components.amchart" />
                </span>
              }
            >
              <Menu.Item key="extensions/chart/amchart/area">
                <Link href="/extensions/chart/amchart/area">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.chart.area" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/chart/amchart/bar">
                <Link href="/extensions/chart/amchart/bar">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.chart.bar" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/chart/amchart/line">
                <Link href="/extensions/chart/amchart/line">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.chart.line" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/chart/amchart/pie">
                <Link href="/extensions/chart/amchart/pie">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.chart.pie" />
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="extensions/chart/amchart/composed">
                <Link href="/extensions/chart/amchart/composed">
                  <a>
                    {' '}
                    <IntlMessages id="sidebar.chart.composed" />
                  </a>
                </Link>
              </Menu.Item>
            </SubMenu>
          </MenuItemGroup>

          <SubMenu
            className="gx-menu-horizontal"
            key="calendar"
            title={
              <span>
                <i className="icon icon-calendar" />
                <IntlMessages id="sidebar.calendar" />
              </span>
            }
          >
            <Menu.Item key="extensions/calendar/basic">
              <Link href="/extensions/calendar/basic">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.calendar.basic" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="extensions/calendar/cultures">
              <Link href="/extensions/calendar/cultures">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.calendar.cultures" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="extensions/calendar/popup">
              <Link href="/extensions/calendar/popup">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.calendar.popup" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="extensions/calendar/rendering">
              <Link href="/extensions/calendar/rendering">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.calendar.rendering" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="extensions/calendar/selectable">
              <Link href="/extensions/calendar/selectable">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.calendar.selectable" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="extensions/calendar/timeslots">
              <Link href="/extensions/calendar/timeslots">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.calendar.timeslots" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="custom-views"
          title={intl.formatMessage({ id: 'sidebar.customViews' })}
        >
          <SubMenu
            className="gx-menu-horizontal"
            key="user-auth"
            title={
              <span>
                <i className="icon icon-auth-screen" />
                <IntlMessages id="app.userAuth" />
              </span>
            }
          >
            <Menu.Item key="custom-views/user-auth/sign-in">
              <Link href="/custom-views/user-auth/sign-in">
                <a>
                  {' '}
                  <IntlMessages id="app.userAuth.signIn" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="custom-views/user-auth/forgot-password">
              <Link href="/custom-views/user-auth/forgot-password">
                <a>
                  {' '}
                  <IntlMessages id="app.userAuth.forgotPassword" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="custom-views/user-auth/sign-up">
              <Link href="/custom-views/user-auth/sign-up">
                <a>
                  {' '}
                  <IntlMessages id="app.userAuth.signUp" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="custom-views/user-auth/lock-screen">
              <Link href="/custom-views/user-auth/lock-screen">
                <a>
                  {' '}
                  <IntlMessages id="app.userAuth.lockScreen" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="custom-views/user-auth/reset-password">
              <Link href="/custom-views/user-auth/reset-password">
                <a>
                  {' '}
                  <IntlMessages id="app.userAuth.resetPassword" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            className="gx-menu-horizontal"
            key="list-type"
            title={
              <span>
                <i className="icon icon-all-contacts" />
                <IntlMessages id="sidebar.listType" />
              </span>
            }
          >
            <Menu.Item key="custom-views/list-type/simple-list">
              <Link href="/custom-views/list-type/simple-list">
                <a>
                  <IntlMessages id="sidebar.listType.plainListView" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="custom-views/list-type/strip-list">
              <Link href="/custom-views/list-type/strip-list">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.listType.withDivider" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="custom-views/list-type/card-list">
              <Link href="/custom-views/list-type/card-list">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.listType.cardListView" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            className="gx-menu-horizontal"
            key="eCommerce"
            title={
              <span>
                <i className="icon icon-shopping-cart" />
                <IntlMessages id="sidebar.eCommerce" />
              </span>
            }
          >
            <Menu.Item key="custom-views/eCommerce/product-grid">
              <Link href="/custom-views/eCommerce/product-grid">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.eCommerce.productGrid" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="custom-views/eCommerce/product-list">
              <Link href="/custom-views/eCommerce/product-list">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.eCommerce.productList" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            className="gx-menu-horizontal"
            key="errorPages"
            title={
              <span>
                <i className="icon icon-error" />
                <IntlMessages id="sidebar.extraPages" />
              </span>
            }
          >
            <Menu.Item key="custom-views/error-pages/error-404">
              <Link href="/custom-views/error-pages/error-404">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.extraPages.404" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="custom-views/error-pages/error-500">
              <Link href="/custom-views/error-pages/error-500">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.extraPages.500" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            className="gx-menu-horizontal"
            key="extra-elements"
            title={
              <span>
                <i className="icon icon-ellipse-h" />
                <IntlMessages id="sidebar.listType.extras" />
              </span>
            }
          >
            <Menu.Item key="custom-views/extras/pricing-table">
              <Link href="/custom-views/extras/pricing-table">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.extraElements.pricingTable" />
                </a>
              </Link>
            </Menu.Item>

            <Menu.Item key="custom-views/extras/callouts">
              <Link href="/custom-views/extras/callouts">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.extraElements.callouts" />
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="custom-views/extras/testimonials">
              <Link href="/custom-views/extras/testimonials">
                <a>
                  {' '}
                  <IntlMessages id="sidebar.extraElements.testimonials" />
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { themeType, navStyle, pathname, locale } = settings;
  return { themeType, navStyle, pathname, locale };
};
export default connect(mapStateToProps, { setPathName })(
  injectIntl(HorizontalNav),
);
