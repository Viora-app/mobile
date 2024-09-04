import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/Splash';
import IntroScreen from '../screens/Intro';
import LoginScreen from '../screens/Login';
import ProjectDetailsScreen from '../screens/ProjectDetails';
import Tabs from './Tabs';

const Stack = createStackNavigator();

const Stacks = (): JSX.Element => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        detachPreviousScreen: true,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Stacks;
