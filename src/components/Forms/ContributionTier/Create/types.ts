import {SongAttributes, FetchStatus} from '../../../../config/types';
import {ProjectAttrs} from '../../../Projects/types';

export interface ContributionTier {
  style?: object;
  id: string;
}

export interface CreateContributionTierReviewProps {
  data: Partial<ProjectAttrs>;
  project: string;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export interface ConfirmProps {
  anchor: SongAttributes;
  onDone: (feedback: Feedback) => void;
}
