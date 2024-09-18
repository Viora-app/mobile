import React, {FC, useEffect} from 'react';
import {View} from 'react-native';

import {useTheme} from '../../hooks/useTheme';
import {useModal} from '../../hooks/useModal';
import {usePatchData} from '../../hooks/useQuery';
import {ProjectStatus} from '../Projects/types';
import EditProjectForm from '../Forms/Project/Edit';
import CreateContributionTier from '../Forms/ContributionTier/Create';
import {ENDPOINTS} from '../../config/endpoints';
import {FetchStatus} from '../../config/types';
import {finalMessages} from '../../utils/modal';
import {Button} from '../Elements';
import {ButtonThemes} from '../Elements/Button/types';
import Contribute from '../Forms/Project/Contribute';
import {ActionsProps} from './types';
import themedStyles from './styles';

const Actions: FC<ActionsProps> = ({ownerId, accountId, projectId, status}) => {
  const styles = useTheme(themedStyles);
  const {show} = useModal();
  const mutation = usePatchData(ENDPOINTS.PROJECTS);

  const support = () => {
    show({
      title: 'Support art & culture',
      description: "You're about to make a difference",
      content: <Contribute projectId={projectId} />,
    });
  };

  const edit = () => {
    show({
      title: 'Edit your project',
      description: 'Improvement is always a good thing',
      content: <EditProjectForm id={projectId} />,
    });
  };

  const publish = () => {
    show({
      title: 'Are you done editing?',
      description:
        'Once you go live, your fans will be able to contribute in your project. Please note that you will no longer be able to edit this project.',
      onPrimaryPress: async () => {
        try {
          await mutation.mutate({
            id: projectId,
            data: {
              status: ProjectStatus.Published,
            },
          });
        } catch (e) {
          console.error('Error updating project status:', e);
        }
      },
    });
  };

  const withdraw = () => {
    show({
      title: 'Congratulation!',
      description:
        'We are happy that you have succeed in raising funds. Everybody is looking forward to hear more about your music. Use the funds to make the dream come true!',
      onPrimaryPress: async () => {
        try {
          await mutation.mutate({
            id: projectId,
            data: {
              status: ProjectStatus.Withdrawn,
            },
          });
        } catch (e) {
          console.error('Error updating project status:', e);
        }
      },
    });
  };

  const onProjectStatusChange = () => {
    let feedback = {
      status: FetchStatus.success,
      message: '',
    };
    if (mutation.error) {
      feedback = {
        status: FetchStatus.error,
        message: 'Oops! Something went wrong.',
      };
    }
    show(finalMessages(feedback));
  };

  const AddContributionTier = () => {
    show({
      title: 'Add contribution tier',
      description: 'And enable fans to support you',
      content: <CreateContributionTier id={projectId} />,
    });
  };

  useEffect(() => {
    if (!mutation.isLoading && (mutation.isError || mutation.isSuccess)) {
      mutation.reset();
      onProjectStatusChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isError, mutation.isSuccess, mutation.isLoading]);

  const editable = ownerId === accountId && status === ProjectStatus.Draft;
  const payable =
    ownerId !== accountId &&
    (status === ProjectStatus.Published || status === ProjectStatus.Successful);
  const succeeded =
    ownerId === accountId &&
    (status === ProjectStatus.Successful || status === ProjectStatus.soldOut);

  return (
    <View style={[styles.actionBar, styles.spacer]}>
      {editable ? (
        <>
          <Button
            title="Add contribution tier"
            theme={ButtonThemes.primary}
            onPress={AddContributionTier}
            wrapperStyle={styles.spacerMini}
          />
          <Button
            title="Edit"
            theme={ButtonThemes.secondary}
            onPress={edit}
            wrapperStyle={styles.spacerMini}
          />
          <Button
            title="Go live"
            theme={ButtonThemes.primary}
            onPress={publish}
          />
        </>
      ) : null}
      {payable ? (
        <Button
          title="Support"
          theme={ButtonThemes.primary}
          onPress={support}
        />
      ) : null}

      {succeeded ? (
        <Button
          title="Withdraw funds"
          theme={ButtonThemes.primary}
          onPress={withdraw}
        />
      ) : null}
    </View>
  );
};

export default Actions;
