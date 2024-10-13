import React, {FC} from 'react';
import {Text, View, Image} from 'react-native';

import {useTheme} from '../../hooks/useTheme';
import themedStyles from './styles';
import loading from '../../assets/images/loading.png';

const ScreenLoading: FC = () => {
  const styles = useTheme(themedStyles);

  return (
    <View style={styles.wrapper}>
      <Image source={loading} style={styles.spacer} />
      <Text style={styles.title}>Loading</Text>
    </View>
  );
};
export default ScreenLoading;
