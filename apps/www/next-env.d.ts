/// <reference types="next" />
/// <reference types="next/types/global" />

import ApolloClient from '@apollo-client';
import { AppApolloCache } from './hoc/withApollo';

declare module 'next' {
  export interface NextPageContext {
    apolloClient?: ApolloClient<AppApolloCache>;
  }
}