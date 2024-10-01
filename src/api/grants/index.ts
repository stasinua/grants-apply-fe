import { ApolloQueryResult, useQuery } from '@apollo/client';
import { grantsQuery } from './api'; // Import your GraphQL query
import { graphQlClient } from '..';

export default function usePaginatedGrants(
  page: number,
  limit: number,
  applicantId?: number
) {
  console.log('usePaginatedGrants ->>>', page, limit, applicantId);

  const { loading, error, data, refetch } = useQuery(grantsQuery.queryShema, {
    variables: { page, limit, applicantId },
    client: graphQlClient,
  });

  return {
    refetch,
    loading,
    error,
    grants: data?.[grantsQuery.dataKey]?.items,
    total: data?.[grantsQuery.dataKey]?.total,
  };
}

// Using different methods of export to show how they can be customized for different scenarios
export const usePaginatedGrantsStandalone = (
  page: number,
  limit: number,
  applicantId?: number
) => {
  console.log('usePaginatedGrantsStandalone ->>>', page, limit, applicantId);
  const res: Promise<ApolloQueryResult<{ items: Grant[]; total: number }>> =
    graphQlClient.query({
      query: grantsQuery.queryShema,
      variables: { page, limit, applicantId },
    });

  return res;
};
