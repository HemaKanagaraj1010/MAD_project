// JobDescriptionStack.jsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobDescription from '../JobDescription';
import Explore from '../JobSearch';

const Stack = createStackNavigator();

const JobDescriptionStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Explore" component={Explore}/>
      <Stack.Screen name="JobDescription" component={JobDescription} />
    </Stack.Navigator>
  );
};

export default JobDescriptionStack;
