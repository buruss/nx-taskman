import React from 'react';
import DefaultPage from '../hoc/defaultPage';
import asyncComponent from '../util/asyncComponent'

const SignIn = asyncComponent(() => import('../routes/userAuth/SignIn'));

export default DefaultPage(() => <SignIn/>);
