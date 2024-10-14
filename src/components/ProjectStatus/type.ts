import {Account} from '../../context/accountContext/types';
import {ArtistShareProp} from '../ProjectDetails/types';
import {Project} from '../Projects/types';

export interface FullDataComponentProps {
  project: Project;
  account?: Account;
  artist: ArtistShareProp;
}

export interface DefaultProjectStatusProps {
  projectId: string;
}
