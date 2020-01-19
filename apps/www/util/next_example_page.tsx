import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject  } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { setContext } from 'apollo-link-context';
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { NextPage } from 'next';
import nextCookie from 'next-cookies';

export type AppApolloCache = any;

let apolloClient: ApolloClient<AppApolloCache > | null = null;

interface ApolloInitialProps {
  apolloState?: AppApolloCache;
}

interface ApolloProps extends ApolloInitialProps {
  apolloClient?: ApolloClient<any>;
}


/**
 * 요청에 "Authorization: Bearer 토큰" 형태의 헤더를 추가
 * 쿠키 방식으로 바꾸면서 사실살 필요없을 수도 있지만 JWT 공부용으로 남겨놓음
 */
const authLink = setContext((_, ctx) => {
  const { headers } = ctx;

  const {token} = nextCookie(ctx);

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


/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState: NormalizedCacheObject = {}, cookie = ''): ApolloClient<NormalizedCacheObject> {
  // 서버 사이드 렌더링 시 getDataFromTree 안에서도 쿠키를 전송하도록 하려면 아래처럼 headers에 쿠키 추가해야 함
  const enchancedFetch = (input: RequestInfo, init?: RequestInit) => {
    return fetch(input, {
        ...init,
        headers: {
            ...init.headers,
            "Cookie": cookie
        }
    }).then(response => response)
  };
  const link = createPersistedQueryLink().concat(authLink.concat(new HttpLink({
      uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // 쿠키 전송을 위해 필요함
      fetch: enchancedFetch,
  })));
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient<AppApolloCache>({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link,
    cache: new InMemoryCache().restore(initialState),
    connectToDevTools: true
  });
}


/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState?: AppApolloCache, cookie = '') {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, cookie);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState, cookie);
  }

  return apolloClient;
}


/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo<PageProps extends object, InitialProps = PageProps>(
  PageComponent: NextPage<PageProps, InitialProps>,
  { ssr = true } = {}
) {
  const WithApollo: NextPage<
    ApolloProps & PageProps,
    ApolloInitialProps & InitialProps
  > = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...(pageProps as PageProps)} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree, req } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient({}, req?.headers?.cookie));

      // Run wrapped getInitialProps methods
      let pageProps = {} as InitialProps;
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            console.log('get data from tree. cookie -= ', req.headers.cookie);
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error.graphQLErrors?.[0]?.message ? error.graphQLErrors?.[0].message : JSON.stringify(error));
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState
      };
    };
  }

  return WithApollo;
}





