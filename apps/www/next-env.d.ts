/// <reference types="next" />
/// <reference types="next/types/global" />

import ApolloClient from 'apollo-client';
import { AppApolloCache } from './util/next_example_page';

declare module 'next' {
  export interface NextPageContext {
    apolloClient?: ApolloClient<AppApolloCache>;
  }
}