import {FetchStatus} from '../config/types';
import successImage from '../assets/images/success.png';
import errorImage from '../assets/images/error.png';
import {Feedback, HapticLevels} from './types';
import {haptic} from './haptic';

export const finalMessages = (feedback: Feedback) => {
  if (feedback.status === FetchStatus.success) {
    haptic(HapticLevels.Success);
    return {
      title: 'Success!',
      description: feedback.message ?? 'That was successful.',
      image: successImage,
    };
  }
  haptic(HapticLevels.Error);
  return {
    title: 'Error!',
    description: feedback.message || 'Something went wrong.',
    image: errorImage,
  };
};
