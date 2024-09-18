import React, {FC, useCallback, useEffect} from 'react';
import {View, Text, Image, TouchableHighlight, Linking} from 'react-native';
import {API_URL} from '@env';

import {ENDPOINTS} from '../../config/endpoints';
import {useGetData} from '../../hooks/useQuery';
import {useTheme} from '../../hooks/useTheme';
import {ArtistProps} from './types';
import themedStyles from './styles';
import instagram from '../../assets/images/instagram.png';
import twitter from '../../assets/images/twitter.png';
import twitch from '../../assets/images/twitch.png';
import placeholderMini from '../../assets/images/gallerymini.png';

const params = {
  include: {
    images: ['*'],
  },
};

enum SocialPlatforms {
  Instagram = 'instagram',
  Twitter = 'twitter',
  Twitch = 'twitch',
}

const platforms: Record<SocialPlatforms, string> = {
  instagram: 'https://instagram.com/',
  twitter: 'https://x.com/',
  twitch: 'https://twitch.com/',
};

const Artist: FC<ArtistProps> = ({id}) => {
  const styles = useTheme(themedStyles);
  const {data} = useGetData(`${ENDPOINTS.PROFILES}/${id}`, params);
  const image = data?.avatar
    ? {uri: `${API_URL}${data?.avatar?.url}`}
    : placeholderMini;

  const openPlatform = useCallback(
    (platform: SocialPlatforms) => () => {
      // @todo incorporate username
      Linking.openURL(platforms[platform]).catch(err => {
        console.error(`Error visiting ${platform}`, err);
      });
    },
    [],
  );

  return (
    <View style={[styles.artistWrapper, styles.spacer]}>
      <View style={[styles.row, styles.artistInfo]}>
        <View style={styles.artistAvatarWrapper}>
          <Image source={image} style={styles.artistAvatar} />
        </View>
        <Text
          style={[
            styles.large,
            styles.artistName,
          ]}>{`${data?.first_name} ${data?.last_name}`}</Text>
      </View>
      <View style={[styles.row, styles.socialLinks]}>
        <TouchableHighlight
          style={styles.socialLink}
          onPress={openPlatform(SocialPlatforms.Instagram)}>
          <Image source={instagram} style={styles.socialIcon} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.socialLink}
          onPress={openPlatform(SocialPlatforms.Twitch)}>
          <Image source={twitch} style={styles.socialIcon} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.socialLink}
          onPress={openPlatform(SocialPlatforms.Twitter)}>
          <Image source={twitter} style={styles.socialIcon} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Artist;
