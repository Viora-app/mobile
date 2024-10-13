import React, {FC, useState} from 'react';
import {View, Keyboard, ScrollView, Dimensions} from 'react-native';

import {useTheme} from '../../../../hooks/useTheme';
import {useModal} from '../../../../hooks/useModal';
import {validateForm} from '../../../../utils/validators';
import {ProjectAttrs} from './types';
import ValidationFeedback from '../../../FormElements/ValidationFeedback';
import {ButtonThemes} from '../../../Elements/Button/types';
import {Button, Input} from '../../../Elements';
import type {PostExclusiveContentsFormProps} from './types';
import {schema} from './schema';
import themedStyles from './styles';
import PostExclusiveContentsReview from './Review';

const PostExclusiveContentsForm: FC<PostExclusiveContentsFormProps> = ({style, projectId}) => {
  const [data, setData] = useState<Partial<ProjectAttrs>>({
    name: '',
    description: '',
    // project_type: ProjectType.Single,
  });
  const {show} = useModal();
  const styles = useTheme(themedStyles);
  const maxHeight = Dimensions.get('window').height * 0.6;

  const onSubmit = async () => {
    Keyboard.dismiss();
    show({
      title: 'Looking good!',
      description: '',
      content: <PostExclusiveContentsReview data={data} />,
    });
  };

  const onChange = (fieldName: string) => (value: string) => {
    const currentFieldValue = data[fieldName as keyof ProjectAttrs];
    const parsedValue =
      typeof currentFieldValue === 'number' ? parseFloat(value) || 0 : value;
    setData({
      ...data,
      [fieldName]: parsedValue,
    });
  };

  const validity = validateForm(schema, data);

  return (
    <View style={style}>
      <ScrollView style={{maxHeight}}>
        <Input
          placeholder="Tier Name"
          onChange={onChange}
          value={data.name}
          name="name"
        />
        <Input
          placeholder="Description (Min 140 characters)"
          onChange={onChange}
          value={data.description}
          name="description"
          multiline
        />
      </ScrollView>
      <ValidationFeedback {...validity} />
      <View style={styles.actionBar}>
        <Button
          title="Continue"
          theme={ButtonThemes.primary}
          onPress={onSubmit}
          disabled={!validity.isValid}
        />
      </View>
    </View>
  );
};

export default PostExclusiveContentsForm;
