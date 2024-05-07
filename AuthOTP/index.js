import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import App from "./App"
import { name as AuthOTP  } from './app.json';

// Register the root component of your application
AppRegistry.registerComponent('AuthOTP', () => App);
AppRegistry.registerComponent('AuthOTP'.toLowerCase(), () => App);
