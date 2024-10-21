import React, {FC, useEffect} from 'react';

import {SafeArea} from '../../components/Elements';
import Projects from '../../components/Projects';
import Form from '../../components/Forms/Project/Create';
import ModalButton from '../../components/ModalButton';
import {ButtonType} from '../../components/ModalButton/types';
import {useModal} from '../../hooks/useModal';
import {RouteParams} from './types';

const modalProps = {
  title: 'Let the world know',
  description: 'and receive love and support',
};

const ProjectsScreen: FC<RouteParams> = ({route: {params}}) => {
  const {show, isVisible} = useModal();
  useEffect(() => {
    if (params && params.modal && !isVisible) {
      show({
        content: <Form />,
        ...modalProps,
      });
    }
  }, [isVisible, params, show]);

  return (
    <SafeArea>
      <Projects />
      <ModalButton type={ButtonType.Add} modalContent={Form} {...modalProps} />
    </SafeArea>
  );
};

export default ProjectsScreen;
