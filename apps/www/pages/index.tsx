import * as React from 'react';
import withAuth from '../hoc/securedPage/withAuth';
import Main from './main';

export default withAuth(Main);
