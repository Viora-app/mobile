import React, {useCallback, useEffect, useState} from 'react';
import {View, Keyboard} from 'react-native';

import {useTheme} from '../../../../hooks/useTheme';
import {useModal} from '../../../../hooks/useModal';
import {usePostData} from '../../../../hooks/useQuery';
import {FetchStatus} from '../../../../config/types';
import {finalMessages} from '../../../../utils/modal';
import {ButtonThemes} from '../../../Elements/Button/types';
import {ENDPOINTS} from '../../../../config/endpoints';
import FormSummary from '../../../FormElements/GenericSummary';
import {Button} from '../../../Elements';
import type {CreateProjectReviewProps, Feedback} from './types';
import themedStyles from './styles';

const CreateProjectReview = ({data}: CreateProjectReviewProps) => {
  const {show} = useModal();
  const styles = useTheme(themedStyles);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const mutation = usePostData(ENDPOINTS.PROJECTS);

  const onDone = useCallback(
    (feedback: Feedback) => {
      show(finalMessages(feedback));
    },
    [show],
  );

  const onSubmit = async () => {
    setIsSubmitted(true);
    Keyboard.dismiss();
    try {
      await mutation.mutateAsync({data});
    } catch (e) {
      console.error('Error creating project:', e);
    }
  };

  useEffect(() => {
    if (!mutation.isLoading && (mutation.isError || mutation.isSuccess)) {
      onDone({
        status: mutation.isSuccess ? FetchStatus.success : FetchStatus.error,
        message: mutation.isSuccess ? '' : 'Error creating your project.',
      });
    }
  }, [mutation, onDone]);

  return (
    <View style={styles.reviewWrapper}>
      <FormSummary data={data} />
      <View style={styles.actionBar}>
        <Button
          title={isSubmitted ? 'Updating' : 'Continue'}
          theme={ButtonThemes.primary}
          onPress={onSubmit}
          disabled={isSubmitted}
        />
      </View>
    </View>
  );
};

export default CreateProjectReview;
