import React from "react";
import { MessageFilled, MailFilled, ProfileFilled, BellFilled } from '@ant-design/icons';

const WelComeCard = () => {

  return (
    <div className="gx-wel-ema gx-pt-xl-2">
      <h1 className="gx-mb-3">Welcome Ema!</h1>
      <p className="gx-fs-sm gx-text-uppercase">You Have</p>
      <ul className="gx-list-group">
        <li>
          <MessageFilled/>
          <span>5 Unread messages</span>
        </li>
        <li>
          <MailFilled/>
          <span>2 Pending invitations</span>
        </li>
        <li>
          <ProfileFilled/>
          <span>7 Due tasks</span>
        </li>
        <li>
          <BellFilled/>
          <span>3 Other notifications</span>
        </li>
      </ul>
    </div>

  );
};

export default WelComeCard;
