import { withData } from "next-apollo";
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

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

const config = {
  link: authLink.concat(new HttpLink({
    uri: 'http://localhost:3000/graphql', // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch,
  })),
};

export default withData(config);