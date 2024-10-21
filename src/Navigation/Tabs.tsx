import React, {FC, useCallback, useEffect} from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {TOKEN_SYMBOL} from '@env';

import Projects from '../screens/Projects';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import BottomTabBar from '../components/BottomTabBar';
import {colors} from '../config/stylesGuides';
import {usePresets} from '../hooks/usePresets';
import {RouteParams} from '../screens/Projects/types';

const Tab = createBottomTabNavigator();

const Navigation: FC<RouteParams> = ({route: {params}}) => {
  const {presets} = usePresets();

  const options = {
    tabBarShowLabel: false,
    headerStyle: {
      backgroundColor: colors[presets.theme].secondaryStrong,
      shadowColor: 'transparent',
      elevation: 0,
    },
  };

  const ThemedBottomTabBar = useCallback(
    (props: BottomTabBarProps) => {
      return <BottomTabBar {...props} theme={presets.theme} />;
    },
    [presets],
  );

  useEffect(() => {
    if (!TOKEN_SYMBOL) {
      console.error('Error: Env variable TOKEN_SYMBOL is missing');
    }
  }, []);

  return (
    <Tab.Navigator initialRouteName="Home" tabBar={ThemedBottomTabBar}>
      <Tab.Screen
        name="Home"
        // @ts-expect-error
        component={Projects}
        options={options}
        initialParams={params}
      />
      <Tab.Screen name="Profile" component={Profile} options={options} />
      <Tab.Screen name="Settings" component={Settings} options={options} />
    </Tab.Navigator>
  );
};
export default Navigation;
