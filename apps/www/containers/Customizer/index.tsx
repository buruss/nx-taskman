import React, {Component} from "react";
import {Button, Drawer, Radio} from "antd";
import {connect} from "react-redux";
import CustomScrollbars from "../../util/CustomScrollbars";
import { onNavStyleChange, setThemeType} from "../../redux/actions/Setting";

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
  THEME_TYPE_DARK,
  THEME_TYPE_LITE,
  THEME_TYPE_SEMI_DARK
} from "../../constants/ThemeSetting";

interface Props {
  themeType; 
  navStyle;
  setThemeType;
  onNavStyleChange;
}

interface State {
  isCustomizerOpened;
}

class Customizer extends Component<Props, State> {

  toggleCustomizer = () => {
    this.setState((previousState) => (
      {
        isCustomizerOpened: !previousState.isCustomizerOpened
      }));
  };

  onThemeTypeChange = (e) => {
    this.props.setThemeType(e.target.value);
  };

  onNavStyleChange = (navStyle) => {
    this.props.onNavStyleChange(navStyle);
  };

  getCustomizerContent = () => {
    const {themeType, navStyle} = this.props;

    return <CustomScrollbars className="gx-customizer">
      <div className="gx-customizer-item">
        <h6 className="gx-mb-3 gx-text-uppercase">Theme</h6>
        <Radio.Group value={themeType} onChange={this.onThemeTypeChange}>
          <Radio.Button value={THEME_TYPE_LITE}>Lite</Radio.Button>
          <Radio.Button value={THEME_TYPE_SEMI_DARK}>Semi Dark</Radio.Button>
          <Radio.Button value={THEME_TYPE_DARK}>Dark</Radio.Button>
        </Radio.Group>
      </div>

      <h6 className="gx-mb-3 gx-text-uppercase">Nav Style</h6>

      {this.getNavStyles(navStyle)}

    </CustomScrollbars>
  };

  getNavStyles = (navStyle) => {
    return <ul className="gx-nav-option gx-list-inline">
      <li>
        <span onClick={this.onNavStyleChange.bind(this, NAV_STYLE_FIXED)}
              className={`gx-pointer ${navStyle === NAV_STYLE_FIXED && 'active'}`}>
        <img src='/images/layouts/fixed.png' alt='fixed'/>
        </span>
      </li>
      <li>
        <span onClick={this.onNavStyleChange.bind(this, NAV_STYLE_MINI_SIDEBAR)}
              className={`gx-pointer ${navStyle === NAV_STYLE_MINI_SIDEBAR && 'active'}`}>
        <img src='/images/layouts/mini sidebar.png' alt='mini sidebar'/>
        </span>
      </li>
      <li>
        <span onClick={this.onNavStyleChange.bind(this, NAV_STYLE_DRAWER)}
              className={`gx-pointer ${navStyle === NAV_STYLE_DRAWER && 'active'}`}>
        <img src='/images/layouts/drawer nav.png' alt='drawer nav'/>
        </span>
      </li>
      <li>
        <span onClick={this.onNavStyleChange.bind(this, NAV_STYLE_NO_HEADER_MINI_SIDEBAR)}
              className={`gx-pointer ${navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR && 'active'}`}>
        <img src='/images/layouts/no header mini sidebar.png' alt='no hader mini sidebar'/>
        </span>
      </li>
      <li>
        <span onClick={this.onNavStyleChange.bind(this, NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR)}
              className={`gx-pointer ${navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR && 'active'}`}>
        <img src='/images/layouts/vertical no header.png' alt='vertical no header'/>
        </span>
      </li>
      <li>
        <span onClick={this.onNavStyleChange.bind(this, NAV_STYLE_DEFAULT_HORIZONTAL)}
              className={`gx-pointer ${navStyle === NAV_STYLE_DEFAULT_HORIZONTAL && 'active'}`}>
        <img src='/images/layouts/default horizontal.png' alt='default horizontal'/>
        </span>
      </li>
      <li>
        <span onClick={this.onNavStyleChange.bind(this, NAV_STYLE_DARK_HORIZONTAL)}
              className={`gx-pointer ${navStyle === NAV_STYLE_DARK_HORIZONTAL && 'active'}`}>
        <img src='/images/layouts/dark horizontal.png' alt='dark horizontal'/>
        </span>
      </li>
      <li>
        <span onClick={this.onNavStyleChange.bind(this, NAV_STYLE_INSIDE_HEADER_HORIZONTAL)}
              className={`gx-pointer ${navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL && 'active'}`}>
        <img src='/images/layouts/inside header horizontal.png' alt='inside header horizontal'/>
        </span>
      </li>
      <li>
        <span onClick={this.onNavStyleChange.bind(this, NAV_STYLE_BELOW_HEADER)}
              className={`gx-pointer ${navStyle === NAV_STYLE_BELOW_HEADER && 'active'}`}>
        <img src='/images/layouts/below header.png' alt='below header'/>
        </span>
      </li>

      <li>
        <span onClick={this.onNavStyleChange.bind(this, NAV_STYLE_ABOVE_HEADER)}
              className={`gx-pointer ${navStyle === NAV_STYLE_ABOVE_HEADER && 'active'}`}>
        <img src='/images/layouts/top to header.png' alt='top to header'/>
        </span>
      </li>
    </ul>
  };


  constructor(props) {
    super(props);
    this.state = {isCustomizerOpened: false};
  }

  render() {
    return (
      <>
        <Drawer
          placement="right"
          closable={false}
          onClose={this.toggleCustomizer}
          visible={this.state.isCustomizerOpened}>
          {
            this.getCustomizerContent()
          }
        </Drawer>
        <div className="gx-customizer-option">
          <Button type="primary" onClick={this.toggleCustomizer.bind(this)}>
            <i className="icon icon-setting fxicon-hc-spin gx-d-block"/>
          </Button>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {themeType, width, navStyle} = settings;
  return {themeType, width, navStyle}
};
export default connect(mapStateToProps, {
  setThemeType,
  onNavStyleChange
})(Customizer);
