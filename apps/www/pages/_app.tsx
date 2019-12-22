import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { withApollo } from '../util/next_example';

interface IProps {
  apollo: any;
}

class MyApp extends App<IProps> {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
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
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);