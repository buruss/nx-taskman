import * as React from 'react';
import Router from 'next/router';

/**
 * 항상 main 으로 이동
 */
export default () => {
  React.useEffect(() => {
    Router.push('/main');
  }, []);
  return null;
};
