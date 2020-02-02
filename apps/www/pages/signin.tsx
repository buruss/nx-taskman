import React from 'react';
import defaultPage from '../hoc/defaultPage';
import asyncComponent from '../util/asyncComponent'

// const SignIn = asyncComponent(() => import('../routes/userAuth/SignIn'));

export default defaultPage(asyncComponent(() => import('../routes/userAuth/SignIn')));
