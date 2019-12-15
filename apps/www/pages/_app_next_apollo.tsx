import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import withData from '../lib/next_apollo';

interface IProps {
}

class MyApp extends App<IProps> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <main>
        <Head>
          <title>Wieldy- Admin Dashboard</title>
        </Head>
        <header>
          상단 메뉴
        </header>
        <section>
          <Component {...pageProps} />
        </section>
        <footer>
          하단 푸터
        </footer>
      </main>
    );
  }
}

export default withData(MyApp);