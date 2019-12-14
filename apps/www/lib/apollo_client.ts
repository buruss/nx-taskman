import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { setContext } from 'apollo-link-context';

const link = createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: 'http://localhost:3000/graphql'
});

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
    }
  } else {
    return { headers };
  }
});

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ initialState }) =>
    new ApolloClient({
      ssrMode: true,
      connectToDevTools: true,
      link: authLink.concat(link),
      cache: new InMemoryCache()
        //  rehydrate the cache using the initial data passed from the server:
        .restore(initialState || {})
    })
  , { getDataFromTree: "ssr" }
);