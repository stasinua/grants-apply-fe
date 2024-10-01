interface Applicant {
  id: number;
  name: string;
  description: string;
}

interface Grant {
  id: number;
  name: string;
  institution: {
    name: string;
  };
  description: string;
  grantAmount: number;
  location: string;
  startingAt: string;
  deadlineAt: string;
  fundingAreas: string[];
  createdAt: string;
  updatedAt: string;
}

interface GrantApplication {
  id: number;
  grant: Partial<Grant>;
  applicant: Partial<Applicant>;
  positive: boolean;
  reason: string;
  createdAt: string;
  updatedAt: string;
}

interface GrantApplicationFeedback {
  id: number;
  grant: Partial<Grant>;
  applicant: Partial<Applicant>;
  positive: boolean;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}

interface GrantsContextType {
  grants: Grant[];
}

type GrantsActions =
  | { type: 'set_grants'; grants: Grant[] }
  | { type: 'clear_grants' };
