import React from 'react';
import Head from 'next/head';
import securedPage from '../hoc/securedPage';
import asyncComponent from "../util/asyncComponent";

const DashBoard = asyncComponent(() => import('../routes/dashboard'));

export default securedPage(() => (
  <>
    <Head>
      <title>Dashborad</title>
    </Head>
    <DashBoard/>
  </>
));