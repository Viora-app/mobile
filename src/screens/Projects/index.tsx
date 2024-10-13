import React from 'react';
import {SafeArea} from '../../components/Elements';
import Projects from '../../components/Projects';
import Form from '../../components/Forms/Project/Create';
import ModalButton from '../../components/ModalButton';
import {ButtonType} from '../../components/ModalButton/types';

const ProjectsScreen = () => (
  <SafeArea>
    <Projects />
    <ModalButton
      type={ButtonType.Add}
      title="Let the world know"
      description="and receive love and support"
      modalContent={Form}
    />
  </SafeArea>
);

export default ProjectsScreen;
