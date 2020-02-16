import React from "react";
import {Avatar, Popover} from "antd";
import { useLogout } from '../../hoc/securedPage/withAuthAsync';

const UserInfo = () => {
  // 내부적으로 useLazyQuery로 클릭 시 호출할 함수를 반환함
  const signOut = useLogout();
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Connections</li>
      <li onClick={() => signOut()}>Logout
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
