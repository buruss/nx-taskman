import React from "react";
import {Avatar, Popover} from "antd";
import { logout } from '../../hoc/securedPage/withAuthSync';

const UserInfo = () => {
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Connections</li>
      <li onClick={() => logout()}>Logout
      </li>
    </ul>
  );

  return (
    <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions} trigger="click">
      <Avatar src={"/images/avatar/domnic-harris.png"} className="gx-avatar gx-pointer" alt="" />
    </Popover>
  );
};

export default UserInfo;
