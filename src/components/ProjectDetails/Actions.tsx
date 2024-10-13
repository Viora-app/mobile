import React, {FC, useEffect} from 'react';
import {View} from 'react-native';

import {useModal} from '../../hooks/useModal';
import {usePatchData} from '../../hooks/useQuery';
import {ProjectStatus} from '../Projects/types';
import {ENDPOINTS} from '../../config/endpoints';
import {FetchStatus} from '../../config/types';
import {finalMessages} from '../../utils/modal';
import {ActionsProps} from './types';
import {
  EditProject,
  SupportProject,
  SuccessfulProjectOwner,
  FailingProjectOwner,
  SuccessfulProjectContributor,
  PublishedProjectOwner,
} from '../ProjectStatus';

const Actions: FC<ActionsProps> = ({
  ownerId,
  accountId,
  projectId,
  status,
  deadline,
}) => {
  const {show} = useModal();
  const mutation = usePatchData(ENDPOINTS.PROJECTS);

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

  useEffect(() => {
    if (!mutation.isLoading && (mutation.isError || mutation.isSuccess)) {
      mutation.reset();
      onProjectStatusChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isError, mutation.isSuccess, mutation.isLoading]);

  const editable = ownerId === accountId && status === ProjectStatus.Draft;

  const published =
    status === ProjectStatus.Published || status === ProjectStatus.Successful;

  const succeeded =
    new Date(deadline) < new Date() &&
    (status === ProjectStatus.Successful || status === ProjectStatus.soldOut);

  const failing = status === ProjectStatus.Failing;
  //   ownerId === accountId
  return (
    <View>
      {editable && <EditProject projectId={projectId} ProjectStatus={status} />}

      {published && ownerId === accountId ? <PublishedProjectOwner /> : null}

      {published && ownerId !== accountId ? (
        <SupportProject projectId={projectId} />
      ) : null}

      {true && ownerId === accountId ? (
        <SuccessfulProjectOwner projectId={projectId} ProjectStatus={status} />
      ) : null}

      {succeeded && ownerId === accountId ? (
        <SuccessfulProjectContributor />
      ) : null}

      {failing && ownerId === accountId ? <FailingProjectOwner /> : null}
    </View>
  );
};

export default Actions;
