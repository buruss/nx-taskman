import React from 'react';
import Head from 'next/head';
import SecuredPage from '../hoc/securedPage';
import asyncComponent from "../util/asyncComponent";

const DashBoard = asyncComponent(() => import('../routes/dashboard'));

export default SecuredPage(() => (
  <>
    <Head>
      <title>Dashborad</title>
    </Head>
    <DashBoard/>
  </>
));