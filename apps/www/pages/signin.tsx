import React from 'react';
import DefaultPage from '../hoc/defaultPage';
import asyncComponent from '../util/asyncComponent'

const SignIn = asyncComponent(() => import('../views/userAuth/SignIn'));

export default DefaultPage(() => <SignIn/>);
