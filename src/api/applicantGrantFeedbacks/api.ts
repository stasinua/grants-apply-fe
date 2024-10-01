import { gql } from '@apollo/client';

export const addFeedbackMutation = {
  dataKey: 'addFeedback',
  queryShema: gql(`
  mutation addFeedback($grantId: Int!, $applicantId: Int!, $positive: Boolean!, $feedback: String) {
    addFeedback(grantId:$grantId, applicantId:$applicantId, positive: $positive, feedback:$feedback) {
      grant {
        name
      },
      applicant {
        name
      }
    }
  }
  `),
};

export const feedbacksQuery = {
  dataKey: 'getAllApplicantGrantFeedbacks',
  queryShema: gql(`
  query getAllApplicantGrantFeedbacks($applicantId: Int!, $page: Int!, $limit: Int!, $positive: Boolean) {
    getAllApplicantGrantFeedbacks(applicantId:$applicantId, page:$page, limit:$limit, positive: $positive) {
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
          fundingAreas
        },
        applicant {
          name
        },
        positive,
        feedback,
        createdAt
      },
      total
    }
  }
  `),
};
