import React from 'react';
import defaultPage from '../hoc/defaultPage';
import SignIn from '../routes/userAuth/SignIn';
import { withApollo } from '../hoc/withApollo';

// SSG를 위해 ssr 끔
export default withApollo(defaultPage(SignIn), {ssr: false});

// SSG 렌더링을 위해서 getStaticProps 선언이 필요함
export const getStaticProps = async () => ({ props: {} });
