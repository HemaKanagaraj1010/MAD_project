import "react-native-gesture-handler";
import React from "react";
import { registerRootComponent } from 'expo';
import AuthStack from "./src/navigation/AuthStack";
import AppStack from "./src/navigation/AppStack"
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
   <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="App" component={AppStack} />
        </Stack.Navigator>
 </NavigationContainer>
  );
}
registerRootComponent(App)

// import "react-native-gesture-handler";
// import React from "react";

// import { registerRootComponent } from 'expo';
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";




// import Login from "./src/Login";
// import Detail from "./src/Detail";
// import Dashboard from "./src/Dashboard";
// import TabNavigation from "./src/navigation/TabNavigation";
// import 'react-native-gesture-handler';

// const Stack = createStackNavigator();


// export default function App() {
//   return (
//   <NavigationContainer>
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screens
//            name="Login"
//            component={Login}
//            options={{headerShown: false}}
//            />
//     <Stack.Screen
//            name="Detail"
//            component={Detail}
//            options={{ headerShown: false}}
//            />

//    <Stack.Screen
//            name="TabNavigation"
//            component={TabNavigation}
//            options={{ headerShown: false}}
//            />
//            </Stack.Navigator>
//            </NavigationContainer>
//   );
// }
// registerRootComponent(App)