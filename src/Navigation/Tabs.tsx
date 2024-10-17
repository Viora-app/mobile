import React, {useCallback, useEffect} from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {TOKEN_SYMBOL} from '../../env.json';

import Projects from '../screens/Projects';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
// import TopTunes from '../screens/TopTunes';
import BottomTabBar from '../components/BottomTabBar';
import {colors} from '../config/stylesGuides';
import {usePresets} from '../hooks/usePresets';

const Tab = createBottomTabNavigator();

const Navigation = (): JSX.Element => {
  const {presets} = usePresets();

  const tabBarOptions = {
    tabBarShowLabel: false,
    headerStyle: {
      backgroundColor: colors[presets.theme].secondaryStrong,
      shadowColor: 'transparent',
      elevation: 0,
    },
  };

  const ThemedBottomTabBar2 = useCallback(
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
    <Tab.Navigator initialRouteName="Home" tabBar={ThemedBottomTabBar2}>
      <Tab.Screen name="Home" component={Projects} options={tabBarOptions} />
      {/* <Tab.Screen
        name="Top Tunes"
        component={TopTunes}
        options={tabBarOptions}
      /> */}
      <Tab.Screen name="Profile" component={Profile} options={tabBarOptions} />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={tabBarOptions}
      />
    </Tab.Navigator>
  );
};
export default Navigation;
