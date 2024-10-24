import React, {FC, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {setShortcutItems} from 'react-native-quick-actions';
import 'react-native-gesture-handler';

import SplashScreen from '../screens/Splash';
import IntroScreen from '../screens/Intro';
import LoginScreen from '../screens/Login';
import ProjectDetailsScreen from '../screens/ProjectDetails';
import PictureScreen from '../screens/Picture';
import Tabs from './Tabs';
import {quickActions} from './actionMenus';

const Stack = createStackNavigator();
const options = {
  headerShown: false,
  detachPreviousScreen: true,
};

const Stacks: FC = () => {
  useEffect(() => {
    setShortcutItems(quickActions);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={options}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
        <Stack.Screen name="Picture" component={PictureScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
