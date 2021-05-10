import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupLoginScreen from './screens/SignupLoginScreen'
import { AppDrawerNavigator } from './components/AppDrawerNavigator'
import { AppTabNavigator } from './components/AppTabNavigator';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';   

export default function App() {
  return (
    <AppContainer/>
  );
}

const switchNavigator = createSwitchNavigator({
  SignupLoginScreen:{screen: SignupLoginScreen},
  Drawer:{screen: AppDrawerNavigator},
  BottomTab:{screen: AppTabNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);
