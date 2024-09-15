import React from 'react';
import {View} from 'react-native';
import Projects from '../../components/Projects';
import Form from '../../components/Forms/Project/Create';
import ModalButton from '../../components/ModalButton';
import {ButtonType} from '../../components/ModalButton/types';
import {useTheme} from '../../hooks/useTheme';
import themedStyles from './styles';

const ProjectsScreen = () => {
  const styles = useTheme(themedStyles);

  return (
    <View style={[styles.screenContainer, styles.projectsScreen]}>
      <Projects />
      <ModalButton
        type={ButtonType.Add}
        title="Let the world know"
        description="and receive love and support"
        modalContent={Form}
      />
    </View>
  );
};

export default ProjectsScreen;
