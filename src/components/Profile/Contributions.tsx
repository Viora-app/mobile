import React, {FC} from 'react';
import {View, Text, Image} from 'react-native';
import {Link} from '@react-navigation/native';
import {TOKEN_SYMBOL} from '@env';

import {useTheme} from '../../hooks/useTheme';
import {Routes} from '../../config/routes';
import {getSmallestSize} from '../../utils/image';
import {ImageFormats} from '../Projects/types';
import themedStyles from './styles';
import type {ContributionProps, ContributionsProps} from './types';

const Contribution: FC<ContributionProps> = ({data}) => {
  const styles = useTheme(themedStyles);
  const projectId = data.attributes.project.data.id;
  const formats = data.attributes.project.data.attributes?.images?.data?.length
    ? data.attributes.project.data.attributes?.images.data[0].attributes.formats
    : ({} as ImageFormats);
  const image = getSmallestSize(formats);

  return (
    <Link
      to={{
        screen: Routes.ProjectDetails as never,
        params: {id: projectId} as never,
      }}
      style={[styles.link, styles.spacerMini]}>
      <View style={[styles.wrapper]}>
        <Image source={image} style={styles.contributionsThumbnail} />
        <View
          style={[
            styles.column,
            styles.justifyBetween,
            styles.contributionsInfo,
          ]}>
          <View style={[styles.row, styles.justifyBetween]}>
            <Text style={styles.semi}>
              {data.attributes.contribution_tier.data.attributes.name}
            </Text>
            <Text
              style={
                styles.semi
              }>{`${data.attributes.amount} ${TOKEN_SYMBOL}`}</Text>
          </View>
          <Text style={[styles.base, styles.mild]}>
            {data.attributes.project.data.attributes.name}
          </Text>
        </View>
      </View>
    </Link>
  );
};

// @todo implement loading state
const Contributions: FC<ContributionsProps> = ({data}) => {
  const styles = useTheme(themedStyles);

  return (
    <View style={[styles.contributions, styles.column]}>
      {data.map(item => (
        <Contribution data={item} key={item.id} />
      ))}
    </View>
  );
};

export default Contributions;
