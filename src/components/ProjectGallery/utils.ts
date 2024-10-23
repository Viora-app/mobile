import {getSmallestSize, getLargestSize} from '../../utils/image';
import {ImageFormats} from '../Projects/types';

export const getPreferredSize = (obj: ImageFormats, index: number) => {
  if (index === 0) {
    return getLargestSize(obj);
  }

  return getSmallestSize(obj);
};
