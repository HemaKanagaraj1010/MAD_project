import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login';
import Detail from '../Detail';

import { NavigationContainer } from '@react-navigation/native';
import Dashboard from '../Dashboard';
import TabNavigation from './TabNavigation';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="TabNavigation" component={TabNavigation}/>
    </Stack.Navigator>
  );
}

export default AuthStack;
