import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {userSignOut} from "../../redux/actions/Auth";

interface Props {
  userSignOut;
}

class UserInfo extends Component<Props> {

  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>My Account</li>
        <li>Connections</li>
        <li onClick={() => this.props.userSignOut()}>Logout
        </li>
      </ul>
    );

    return (
      <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions}
               trigger="click">
        <Avatar src={"/images/avatar/domnic-harris.png"}
                className="gx-avatar gx-pointer" alt=""/>
      </Popover>
    )

  }
}

export default connect(null, {userSignOut})(UserInfo);
