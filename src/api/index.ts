'use client'

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const graphQlClient = new ApolloClient({
  cache: new InMemoryCache,
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
});