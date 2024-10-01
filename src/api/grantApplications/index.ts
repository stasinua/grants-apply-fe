import { useQuery } from '@apollo/client';
import { grantApplicationsQuery } from './api'; // Import your GraphQL query
import { graphQlClient } from '..';

export default function usePaginatedGrantApplications(page: number, limit: number, applicantId: number) {
  console.log('usePaginatedGrantApplications ->>>',page, limit);
  
  const { loading, error, data } = useQuery(grantApplicationsQuery.queryShema, {
    variables: { page, limit, applicantId },
    client: graphQlClient
  });

  return {
    loading,
    error,
    grantApplications: data?.[grantApplicationsQuery.dataKey]?.items,
    total: data?.[grantApplicationsQuery.dataKey]?.total,
  };
}
