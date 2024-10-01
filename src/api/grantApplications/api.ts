import { gql } from '@apollo/client';

export const grantApplicationsQuery = {
  dataKey: 'getAllApplicantGrantApplications',
  queryShema: gql(`
  query getAllApplicantGrantApplications($page: Int!, $limit: Int!, $applicantId: Int!){
    getAllApplicantGrantApplications(page: $page, limit: $limit, applicantId: $applicantId) {
    	items {
        id,
        grant {
          name,
          institution {
            name
          },
          description,
          grantAmount,
          location,
          startingAt,
          deadlineAt,
          fundingAreas,
          createdAt
        },
        positive,
        createdAt
      },
    	total
    }
  }
  `),
};
