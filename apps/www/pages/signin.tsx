import React from 'react';
import Page from '../hoc/defaultPage';
import asyncComponent from '../util/asyncComponent'

const SignIn = asyncComponent(() => import('../routes/customViews/userAuth/SignIn'));

export default Page(() => <SignIn/>);
