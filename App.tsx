/* import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShowPlan from './src/views/ShowPlan';
import NewPlan from './src/views/NewPlan';

export type RootStackParamList = {
  ShowPlan: undefined;
  NewPlan: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ShowPlan">
        <Stack.Screen
          name="ShowPlan"
          component={ShowPlan}
          options={{title: 'Show Plan'}}
        />
        <Stack.Screen name="NewPlan" component={NewPlan} options={{title: 'New Plan'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; */

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