import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import type {Timeout} from '../../config/types';
import {Routes} from '../../config/routes';
import {usePresets} from '../../hooks/usePresets';
import {useAccount} from '../../hooks/useAccount';
import {SafeArea} from '../../components/Elements';
import Splash from '../../components/Splash';
import {CURRENT_INTRO_VERSION} from '../Intro';

const SplashScreen = () => {
  const {presets} = usePresets();
  const navigation = useNavigation();
  const timeout = useRef<Timeout>();
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
    <SafeArea>
      <Splash />
    </SafeArea>
  );
};

export default SplashScreen;
