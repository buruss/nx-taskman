import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import withData from '../lib/apollo_client';

interface IProps {
  apollo: any;
}

class MyApp extends App<IProps> {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

// Wraps all components in the tree with the data provider
export default withData(MyApp);