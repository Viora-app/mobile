import {ImageData, ProjectStatus} from '../Projects/types';
import {FetchStatus} from '../../config/types';

export interface ProjectDetailsProps {
  id: string;
  name: string;
  summary: string;
}

export interface ArtistProps {
  id: string;
}

export interface DeadlineProps {
  date: string;
}

export interface FundingProgressProps {
  currentFunding: number;
  softGoal: number;
  hardGoal: number;
  style: string;
}

export interface GalleryProps {
  images: ImageData[];
}

export interface ActionsProps {
  ownerId: number | undefined;
  accountId: number | undefined;
  projectId: string;
  status: ProjectStatus;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}
