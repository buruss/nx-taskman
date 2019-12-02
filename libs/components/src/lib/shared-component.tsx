import React from 'react';

import './shared-component.scss';

/* eslint-disable-next-line */
export interface SharedComponentProps { }

export const SharedComponent = (props: SharedComponentProps) => {
  return (
    <div>
      <h1><b>Welcome! to SharedComponent component!</b></h1>
    </div>
  );
};

export default SharedComponent;
