import {SongAttributes, FetchStatus} from '../../../../config/types';

export interface PostExclusiveContentsFormProps {
  style?: object;
  projectId: string;
}
export interface ProjectAttrs {
  name: string;
  description: string;
}
export interface PostExclusiveContentsReviewProps {
  data: Partial<ProjectAttrs>;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export interface ConfirmProps {
  anchor: SongAttributes;
  onDone: (feedback: Feedback) => void;
}
