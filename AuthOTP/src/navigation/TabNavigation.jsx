

import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../Dashboard';
import ProfileScreen from '../ProfileScreen';
import AddPost from '../AddPost';
import Explore from '../Explore';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'; // Import createStackNavigator
import AddJob from '../AddJob';
import AddBroadcast from '../AddBroadcast';
import AddTestimonal from '../AddTestimonal';
import JobDescription from '../JobDescription';
import AlumniSearch from '../AlumniSearch';
import News from '../News';
import UsersPage from '../UsersPage';
import NewsDetailScreen from '../NewsDetailScreen';
import UserProfile from '../UserProfile';
import ViewTestimonal from '../ViewTestimonal';
import ChatApplication from '../ChatApplication';
import ChatScreen from '../ChatScreen';
import BroadcastMessage from '../BroadcastMessage';
import TestimonialDetails from '../TestimonialDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Create a Stack navigator


const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="AlumniSearch" component={AlumniSearch} options={{ headerShown: false }} />
      <Stack.Screen name="News" component={News} options={{ headerShown: false }} />
    <Stack.Screen name="Explore" component={Explore} options={{headerShown: false}}/>
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
      <Stack.Screen name="UsersPage" component={UsersPage} options={{ headerShown: false }} />
      <Stack.Screen name="UserProfile" component={UserProfile} options={{headerShown: false}} />
      <Stack.Screen name="ViewTestimonal" component={ViewTestimonal} options={{headerShown: false}}/>
      <Stack.Screen name="ChatApplication" component={ChatApplication} options={{headerShown: false}}/>
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}}/>
      <Stack.Screen name="BroadcastMessage" component={BroadcastMessage} options={{headerShown: false}}/>
      <Stack.Screen name="TestimonialDetails" component={TestimonialDetails} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};
// Stack navigator for AddPost screens
const AddPostStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddPost" component={AddPost} options={{ headerShown: false }} />
      <Stack.Screen name="AddJob" component={AddJob} options={{ headerShown: false }}/>
      <Stack.Screen name="AddBroadcast" component={AddBroadcast} options={{ headerShown: false }}/>
      <Stack.Screen name="AddTestimonal" component={AddTestimonal} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
const JobDescriptionStack=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Explore" component={Explore} options={{ headerShown: false }}/>
      <Stack.Screen name="JobDescription" component={JobDescription} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}
export default function TabNavigation({ route }) { // Accept route prop
  const uid = route.params ? route.params.uid : null;
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home"
        component={HomeStack}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, marginBottom: 3, fontSize: 12 }}>Home</Text>
          ),
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={JobDescriptionStack}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, marginBottom: 3, fontSize: 12 }}>Explore</Text>
          ),
          tabBarIcon: ({ color, size }) => <FontAwesome name="search" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="addpost"
        component={AddPostStack} // Use the AddPostStack as component
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, marginBottom: 3, fontSize: 12 }}>Add Post</Text>
          ),
          tabBarIcon: ({ color, size }) => <Entypo name="camera" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={() => <ProfileScreen uid={uid} />} // Pass uid as prop to ProfileScreen
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, marginBottom: 3, fontSize: 12 }}>Profile</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
