import React from 'react';
import {View, ScrollView} from 'react-native';

import {useAccount} from '../../hooks/useAccount';
import {useGetData} from '../../hooks/useQuery';
import {useTheme} from '../../hooks/useTheme';
import Contributions from '../../components/Profile/Contributions';
import Avatar from '../../components/Avatar';
import Wallet from '../../components/Wallet';
import SectionHeader from '../../components/SectionHeader';
import EditProfileForm from '../../components/Forms/Profile/Edit';
import ModalButton from '../../components/ModalButton';
import {ButtonType} from '../../components/ModalButton/types';
import {ENDPOINTS} from '../../config/endpoints';
import themedStyles from './styles';

const ProfileScreen = () => {
  const styles = useTheme(themedStyles);
  const {account} = useAccount();
  const {data} = useGetData(ENDPOINTS.CONTRIBUTIONS, {
    filters: {users_permissions_user: account?.id},
    include: {
      project: ['*'],
      contribution_tier: ['*'],
    },
  });

  const contributions = data?.data ?? [];

  return (
    <View style={[styles.screenContainer, styles.profileScreen]}>
      <ScrollView>
        <View>
          <View style={styles.details}>
            <Avatar data={account?.avatar} />
            <Wallet />
          </View>
        </View>

        <View>
          {contributions.length > 0 && (
            <SectionHeader title="Contributions" style={styles.sectionHeader} />
          )}
          <Contributions data={contributions} />
        </View>
      </ScrollView>
      <ModalButton
        type={ButtonType.Edit}
        title="Edit profile"
        description="Let people find you easier"
        modalContent={EditProfileForm}
      />
    </View>
  );
};

export default ProfileScreen;
