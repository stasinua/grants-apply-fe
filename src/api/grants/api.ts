import { gql } from '@apollo/client';

export const grantsQuery = {
  dataKey: 'getAllGrants',
  queryShema: gql(`
  query getAllGrants($page: Int!, $limit: Int!, $applicantId: Int){
    getAllGrants(page: $page, limit: $limit, applicantId: $applicantId) {
    	items {
        id,
          name,
          institution {
            name
          }
          description,
          grantAmount,
          location,
          startingAt,
          deadlineAt,
          fundingAreas,
          applicants {
            id,
            name
          },
          createdAt
      },
    	total
    }
  }
  `),
};
