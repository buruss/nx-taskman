import React from 'react';
import App from 'next/app';
import Head from 'next/head';

import 'antd/dist/antd.css';
import "../public/vendors/flag/sprite-flags-24x24.css";
import "../public/vendors/gaxon/styles.css";
import "../public/vendors/react-notification/react-notifications.css";
import "../public/vendors/noir-pro/styles.css";
import "../styles/style.css"

import '../styles/inbuildApps.css';

import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import "../firebaseConfig/index";
import initStore from '../redux/store';

interface Props {
  Component, pageProps,store
}

class MyApp extends App<Props> {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <>
        <Head>
          <title>Wieldy- Admin Dashboard</title>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default withRedux(initStore)(MyApp);
