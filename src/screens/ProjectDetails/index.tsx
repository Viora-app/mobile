import React, {FC} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ProjectDetails from '../../components/ProjectDetails';
import {useTheme} from '../../hooks/useTheme';
import themedStyles from './styles';

const ProjectDetailsScreen: FC = ({route: {params}}) => {
  const styles = useTheme(themedStyles);
  const insets = useSafeAreaInsets();

  const safeAreaStyle = {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <View
      style={[styles.screenContainer, styles.projectsScreen, safeAreaStyle]}>
      <ProjectDetails {...params} />
    </View>
  );
};

export default ProjectDetailsScreen;
