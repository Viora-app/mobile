import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Project} from '../Projects/types';
import {ENDPOINTS} from '../../config/endpoints';
import {useGetData} from '../../hooks/useQuery';
import {useTheme} from '../../hooks/useTheme';
import {useAccount} from '../../hooks/useAccount';
import {IconButton} from '../Elements';
import Gallery from './Gallery';
import Deadline from './Deadline';
import Artist from './Artist';
import Actions from './Actions';
import NotFound from '../NotFound/Screen';
import Loading from '../Loading/Screen';
import FundingProgress from './FundingProgress';
import {ProjectDetailsProps} from './types';
import themedStyles from './styles';

const params = {
  include: {
    users_permissions_user: ['email'],
    images: ['*'],
  },
};

const ProjectDetails: FC<ProjectDetailsProps> = ({id, ...restProps}) => {
  const styles = useTheme(themedStyles);
  const {data, isLoading} = useGetData(`${ENDPOINTS.PROJECTS}/${id}`, params);
  const {account} = useAccount();
  const navigation = useNavigation();

  const gotBack = () => {
    navigation.goBack();
  };

  if (id && !isLoading && data?.data?.id !== id) {
    return <NotFound />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const {
    attributes: {
      name,
      summary,
      description,
      images,
      soft_goal,
      hard_goal,
      deadline,
      current_funding,
      // planned_release_date, @todo design this
    },
  } = data?.data as Project;
  const artistId = data?.data?.attributes.users_permissions_user.data.id;

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <IconButton
          onPress={gotBack}
          style={styles.closeButton}
          iconSize={24}
          iconName="cross"
        />
      </View>
      <Gallery images={images?.data} />
      <Text style={[styles.largest, styles.spacer]}>
        {restProps.name ?? name}
      </Text>
      <Text style={[styles.medium, styles.spacer]}>
        {restProps.summary ?? summary}
      </Text>
      <Deadline date={deadline} />
      <Text style={[styles.medium, styles.spacer]}>{description}</Text>
      <Artist id={artistId} />
      <Text style={[styles.semi, styles.spacer]}>
        By supporting her, you're not just funding the music—you’re becoming a
        part of the creative journey!
      </Text>
      <FundingProgress
        currentFunding={current_funding}
        softGoal={soft_goal}
        hardGoal={hard_goal}
        style={styles.spacer}
      />
      <Actions
        projectId={id}
        ownerId={data?.data?.attributes.users_permissions_user.data.id}
        accountId={account?.id}
        status={data?.data?.attributes.status}
      />
      <View style={styles.spacer} />
    </ScrollView>
  );
};

export default ProjectDetails;
