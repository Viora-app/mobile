import React from 'react';
import {View, Image} from 'react-native';
import {API_URL} from '@env';

import {useTheme} from '../../hooks/useTheme';
import {useAccount} from '../../hooks/useAccount';
import {useModal} from '../../hooks/useModal';
import {Icon, ImagePicker} from '../Elements';
import {finalMessages} from '../../utils/modal';
import {FetchStatus} from '../../config/types';
import themedStyles from './styles';
import type {AvatarProps, FileEvent} from './types';
import placeholderMini from '../../assets/images/gallerymini.png';

const Avatar = ({style, data}: AvatarProps) => {
  const styles = useTheme(themedStyles);
  const {update} = useAccount();
  const {show} = useModal();
  const image = data ? {uri: `${API_URL}${data.url}`} : placeholderMini;

  const onSelectImage = async (file: FileEvent) => {
    // @todo add loading state
    const formData = new FormData();
    formData.append('files.avatar', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    });

    formData.append('data', JSON.stringify({}));
    // @ts-expect-error Form data is different for file uploads
    const result = await update(formData);

    show(
      finalMessages({
        status: result.success ? FetchStatus.success : FetchStatus.error,
        message: result.success
          ? 'Your avatar should be available soon'
          : 'Error uploading your avatar',
      }),
    );
  };

  return (
    <View style={[styles.wrapper, style]}>
      <ImagePicker onSelectImage={onSelectImage}>
        <Image source={image} style={styles.avatar} />
        <Icon name="feather" size={32} style={styles.editIcon} color="#fff" />
      </ImagePicker>
    </View>
  );
};

export default Avatar;
