import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import screens from './screens';

import { HomeScreen } from '../pages'

const Stack = createStackNavigator();

function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={screens.HomeScreen} component={HomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}


export default Root;