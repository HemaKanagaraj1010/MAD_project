import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddPost from '../AddPost';
import AddJob from '../AddJob';
import AddBroadcast from '../AddBroadcast';
import AddTestimonal from '../AddTestimonal';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="AddJob" component={AddJob} />
        <Stack.Screen name="AddBroadcast" component={AddBroadcast} />
        <Stack.Screen name="AddTestimonial" component={AddTestimonal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

