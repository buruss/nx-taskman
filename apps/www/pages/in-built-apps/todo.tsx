import React from 'react';
import Head from 'next/head';
import securedPage from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Todo = asyncComponent(() => import('../../routes/inbuiltApps/Todo'));

export default securedPage(() => (
  <>
    <Head>
      <title>Todo App</title>
    </Head>
    <>
      <Todo/>
    </>
  </>
));