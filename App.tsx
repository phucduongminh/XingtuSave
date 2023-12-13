/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import TabNavigator from './src/navigators';
import { NavigationContainer } from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <NavigationContainer>
    <TabNavigator/>
    </NavigationContainer>
  );
}

export default App;
