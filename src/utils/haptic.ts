import {trigger} from 'react-native-haptic-feedback';

import {HapticLevels} from './types';

export const haptic = (level: unknown) => {
  console.log('=', level);
  trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
};
