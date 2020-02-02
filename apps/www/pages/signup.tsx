import React from 'react';
import defaultPage from '../hoc/defaultPage';
import asyncComponent from "../util/asyncComponent";

const SignUp = asyncComponent(() => import('../routes/userAuth/SignUp'));

export default defaultPage(() => <SignUp/>);
