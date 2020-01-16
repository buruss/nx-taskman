import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import "../static/styles/style.css"
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
