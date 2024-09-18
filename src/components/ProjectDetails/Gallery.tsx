import React, {FC} from 'react';
import {View, Image} from 'react-native';

import {ImageData, ImageFormats} from '../Projects/types';
import {useTheme} from '../../hooks/useTheme';
import {getSmallestSize, getLargestSize} from '../../utils/image';
import {GalleryProps} from './types';
import themedStyles from './styles';

const getPreferredSize = (obj: ImageFormats, index: number) => {
  if (index === 0) {
    return getLargestSize(obj);
  }

  return getSmallestSize(obj);
};

const formatImages = (imageArray: ImageData[]) =>
  Array(5)
    .fill(null)
    .map((_, index) => {
      const {attributes} = imageArray[index]
        ? imageArray[index]
        : {attributes: {formats: {} as ImageFormats}};
      return getPreferredSize(attributes.formats, index);
    });

const Gallery: FC<GalleryProps> = ({images}) => {
  const styles = useTheme(themedStyles);
  const [mainImage, ...otherImages] = formatImages(images ?? []);

  return (
    <View style={[styles.galleryWrapper, styles.spacer]}>
      <Image source={mainImage} style={styles.galleryMain} />
      <View style={[styles.row, styles.otherImages]}>
        {otherImages.map((item, index) => (
          <Image
            key={`gallery-${index}`}
            source={item}
            style={styles.galleryOther}
          />
        ))}
      </View>
    </View>
  );
};

export default Gallery;
