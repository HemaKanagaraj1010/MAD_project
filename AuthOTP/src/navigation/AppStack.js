
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../Dashboard';
import TabNavigation from './TabNavigation';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Dashboard">
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
    </Stack.Navigator>
  );
}

export default AppStack;

