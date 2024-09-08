import React, {useEffect, useRef, useState} from 'react';
import {View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import appLogo from '../../assets/images/IconText.png';
import {Routes} from '../../config/routes';
import {usePresets} from '../../hooks/usePresets';
import {useAccount} from '../../hooks/useAccount';
import type {Timeout} from '../../config/types';
import {CURRENT_INTRO_VERSION} from '../Intro';
import {useTheme} from '../../hooks/useTheme';
import themedStyles from './styles';

const SplashScreen = () => {
  const {presets} = usePresets();
  const navigation = useNavigation();
  const timeout = useRef<Timeout>();
  const styles = useTheme(themedStyles);
  const {account} = useAccount();
  const [isNavigated, setIsNavigated] = useState(false);

  useEffect(() => {
    clearTimeout(timeout.current);

    if (!isNavigated) {
      timeout.current = setTimeout(() => {
        setIsNavigated(true);
        if (presets.visitedIntroVersion < CURRENT_INTRO_VERSION) {
          navigation.navigate(Routes.Intro as never);
        } else if (!account?.jwt) {
          navigation.navigate(Routes.Login as never);
        } else {
          navigation.navigate(Routes.Tabs as never);
        }
      }, 1000);
    }
  }, [presets, navigation, account, isNavigated]);

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <View style={styles.splashContainer}>
      <View style={styles.splashImageContainer}>
        <Image
          style={styles.splashLogo}
          source={appLogo}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default SplashScreen;
