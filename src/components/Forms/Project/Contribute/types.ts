import {FetchStatus} from '../../../../config/types';

export interface ContributionTier {
  id: string;
  attributes: {
    name: string;
    description: string;
    rewards: string;
    amount: number;
  };
}

export interface ContributeProps {
  projectId: string;
}

export interface ContributeOptionProps {
  data: ContributionTier;
  selected: boolean;
  onSelected: (id: string) => void;
}

export interface ContributionReviewProps {
  id: string;
  projectId: string;
  data: {
    name: string;
    rewards: string;
    amount: number;
  };
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}
