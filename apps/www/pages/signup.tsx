import React from 'react';
import DefaultPage from '../hoc/defaultPage';
import asyncComponent from "../util/asyncComponent";

const SignUp = asyncComponent(() => import('../routes/userAuth/SignUp'));

export default DefaultPage(() => <SignUp/>);
