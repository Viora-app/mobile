import React, {FC, useEffect, useRef, useState} from 'react';
import {popInitialAction} from 'react-native-quick-actions';

import {RouteParams} from '../../utils/types';
import type {Timeout, QuickAction} from '../../config/types';
import {Routes} from '../../config/routes';
import {LAUNCH_PROTOCOL} from '../../config/endpoints';
import {usePresets} from '../../hooks/usePresets';
import {useAccount} from '../../hooks/useAccount';
import {SafeArea} from '../../components/Elements';
import Splash from '../../components/Splash';
import {CURRENT_INTRO_VERSION} from '../Intro';

const SplashScreen: FC<RouteParams> = ({navigation}) => {
  const {presets} = usePresets();
  const timeout = useRef<Timeout>();
  const {account} = useAccount();
  const [isNavigated, setIsNavigated] = useState(false);

  useEffect(() => {
    // Handle shortcut actions
    const handleQuickAction = async (data: QuickAction) => {
      try {
        const url = data?.userInfo?.url;
        const path = url.replace(LAUNCH_PROTOCOL, '');
        if (path) {
          setIsNavigated(true);
          const params = path === 'new' ? {modal: 'project'} : {};
          navigation.navigate({
            name: Routes.Tabs,
            params,
          });
        }
      } catch (e) {
        console.log('Error handling quick actions', e);
      }
    };

    popInitialAction().then(data => {
      if (data) {
        handleQuickAction(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
