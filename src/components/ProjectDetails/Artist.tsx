import React, {FC, useCallback} from 'react';
import {View, Text, Image, TouchableHighlight, Linking} from 'react-native';

import {ENDPOINTS} from '../../config/endpoints';
import {useGetData} from '../../hooks/useQuery';
import {useTheme} from '../../hooks/useTheme';
import {ArtistProps} from './types';
import themedStyles from './styles';
import instagramIcon from '../../assets/images/instagram.png';
import xIcon from '../../assets/images/twitter.png';
import twitchIcon from '../../assets/images/twitch.png';
import {getSmallestSize} from '../../utils/image';

enum SocialPlatforms {
  Instagram = 'instagram',
  Twitter = 'twitter',
  Twitch = 'twitch',
}

const Artist: FC<ArtistProps> = ({id}) => {
  const styles = useTheme(themedStyles);
  const params = {
    include: {
      avatar: ['*'],
    },
    filters: {users_permissions_user: id},
  };
  const {data} = useGetData(ENDPOINTS.PROFILES, params);

  const openPlatform = useCallback(
    (platform: SocialPlatforms) => () => {
      const {instagram, twitter, twitch} = data?.data[0].attributes ?? {};
      const platforms: Record<SocialPlatforms, string> = {
        instagram: `https://instagram.com/${instagram}`,
        twitter: `https://x.com/${twitter}`,
        twitch: `https://twitch.com/${twitch}`,
      };
      Linking.openURL(platforms[platform]).catch(err => {
        console.error(`Error visiting ${platform}`, err);
      });
    },
    [data?.data],
  );

  const {
    first_name,
    last_name,
    avatar = {},
    instagram,
    twitter,
    twitch,
  } = data?.data[0].attributes ?? {};
  const image = getSmallestSize(avatar?.data?.attributes.formats ?? {});
  const name = [first_name, last_name].join(' ') || "What's his face?";

  return (
    <View style={[styles.artistWrapper, styles.spacer]}>
      <View style={[styles.row, styles.artistInfo]}>
        <View style={styles.artistAvatarWrapper}>
          <Image source={image} style={styles.artistAvatar} />
        </View>
        <Text style={[styles.large, styles.artistName]}>{name}</Text>
      </View>
      <View style={[styles.row, styles.socialLinks]}>
        {instagram && (
          <TouchableHighlight
            style={styles.socialLink}
            onPress={openPlatform(SocialPlatforms.Instagram)}>
            <Image source={instagramIcon} style={styles.socialIcon} />
          </TouchableHighlight>
        )}
        {twitch && (
          <TouchableHighlight
            style={styles.socialLink}
            onPress={openPlatform(SocialPlatforms.Twitch)}>
            <Image source={twitchIcon} style={styles.socialIcon} />
          </TouchableHighlight>
        )}
        {twitter && (
          <TouchableHighlight
            style={styles.socialLink}
            onPress={openPlatform(SocialPlatforms.Twitter)}>
            <Image source={xIcon} style={styles.socialIcon} />
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
};

export default Artist;
