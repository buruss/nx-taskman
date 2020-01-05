import React from 'react';
import Head from 'next/head';
import { NextComponentType } from "next";
import { getDataFromTree } from '@apollo/react-ssr';
import { AppProps, AppInitialProps, AppContext } from 'next/app';
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { InMemoryCache, NormalizedCacheObject  } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IApolloProps {
  apolloState?: NormalizedCacheObject;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export default (MyApp: NextComponentType<IApolloProps & AppInitialProps>) => {
  return class Apollo extends React.Component<IApolloProps & AppInitialProps & AppProps> {
    public apolloClient: ApolloClient<NormalizedCacheObject>;
    static displayName = 'withApollo(App)';
    static async getInitialProps (ctx: AppContext) {
      const { Component, router } = ctx;

      let appProps = {}
      if (MyApp.getInitialProps) {
        appProps = await MyApp.getInitialProps(ctx);
      }
      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApolloClient();
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <MyApp
            {...appProps}
            pageProps={{}}
            Component={Component}
            router={router}
            apolloClient={apollo}
          />
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error)
      }

      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind();


      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      }
    }

    constructor (props: IApolloProps & AppInitialProps & AppProps) {
      super(props);
      this.apolloClient = initApolloClient(props.apolloState);
    }

    render () {
      return <MyApp
        {...this.props}
        apolloClient={this.apolloClient}
      />
    }
  }
}


/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState?: NormalizedCacheObject, cookie?: string) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, cookie);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}


/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState: NormalizedCacheObject = {}, cookie?: string): ApolloClient<NormalizedCacheObject> {
  const headers = cookie ? {cookie}: undefined;
  const link = createPersistedQueryLink().concat(authLink.concat(new HttpLink({
      uri: 'http://localhost:3000/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      headers,
      fetch,
  })));
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link,
    cache: new InMemoryCache().restore(initialState),
    connectToDevTools: true
  });
}



/**
 * 요청에 "Authorization: Bearer 토큰" 형태의 헤더를 추가
 */
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  if (token) {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      }
    };
  } else {
    return { headers };
  }
});
