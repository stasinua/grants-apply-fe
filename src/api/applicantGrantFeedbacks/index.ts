import { useMutation, useQuery } from '@apollo/client';
import {
  addFeedbackMutation,
  deleteAllFeedbacksForApplicantMutation,
  feedbacksQuery,
} from './api'; // Import your GraphQL query
import { graphQlClient } from '..';

export const usePaginatedApplicantGrantFeedbacks = (
  applicantId: number,
  page: number,
  limit: number,
  positive?: boolean
) => {
  console.log(
    'usePaginatedApplicantGrantFeedbacks ->>>',
    applicantId,
    page,
    limit,
    positive
  );

  const { loading, error, data, refetch } = useQuery(
    feedbacksQuery.queryShema,
    {
      variables: { applicantId, page, limit, positive },
      client: graphQlClient,
    }
  );

  return {
    refetch,
    loading,
    error,
    applicantGrantFeedbacks: data?.[feedbacksQuery.dataKey]?.items,
    total: data?.[feedbacksQuery.dataKey]?.total,
  };
};

// Using different methods of export to show how they can be customized for different scenarios
export const addApplicantGrantFeedback = (
  grantId: number,
  applicantId: number,
  positive: boolean,
  feedback: string
) => {
  const res = graphQlClient.mutate({
    mutation: addFeedbackMutation.queryShema,
    variables: {
      grantId,
      applicantId,
      positive,
      feedback,
    },
  });

  return res;
};

export const deleteAllFeedbacksForApplicant = (applicantId: number) => {
  const res = graphQlClient.mutate({
    mutation: deleteAllFeedbacksForApplicantMutation.queryShema,
    variables: {
      applicantId,
    },
  });

  return res;
};
