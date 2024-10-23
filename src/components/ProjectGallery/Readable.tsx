import React, {FC} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import {useTheme} from '../../hooks/useTheme';
import {getPreferredSize} from './utils';
import {GalleryProps, ReadableImageProps} from './types';
import themedStyles from './styles';

const ImageItem: FC<ReadableImageProps> = ({index, image, style}) => {
  const styles = useTheme(themedStyles);
  const onPress = () => {};

  const img = getPreferredSize(image?.attributes.formats ?? {}, index);
  return (
    <TouchableOpacity
      disabled={typeof img === 'number'}
      onPress={onPress}
      style={[
        styles.imageWrapper,
        index === 0 ? styles.galleryMain : styles.galleryOther,
        style,
      ]}>
      <Image source={img} style={styles.image} />
    </TouchableOpacity>
  );
};

const Gallery: FC<GalleryProps> = ({images}) => {
  const styles = useTheme(themedStyles);

  const formatImages = () => {
    return Array(5)
      .fill(null)
      .map((_, index) => images[index] || null);
  };

  return (
    <View style={[styles.galleryWrapper, styles.spacer]}>
      {formatImages().map((image, index) => (
        <ImageItem image={image} index={index} key={`image-${index}`} />
      ))}
    </View>
  );
};

export default Gallery;
