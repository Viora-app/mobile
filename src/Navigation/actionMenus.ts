import {LAUNCH_PROTOCOL} from '../config/endpoints';

export const quickActions = [
  {
    type: 'newProject',
    title: 'Create New Project',
    icon: 'Add',
    userInfo: {
      url: `${LAUNCH_PROTOCOL}new`,
    },
  },
  {
    type: 'updates',
    title: 'View Latest Updates',
    icon: 'Date',
    userInfo: {
      url: `${LAUNCH_PROTOCOL}Home`,
    },
  },
];
