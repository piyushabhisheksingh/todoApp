import * as React from 'react';
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import screens from './screens';
import { colors } from '../assets'
import styles from './style';


import Todo from '../components/todo'


const Stack = createStackNavigator();

function Root() {
  return (
    <>
      <SafeAreaView style={styles.statusBarStyle}>
        <StatusBar backgroundColor={colors.white} barStyle={"dark-content"}></StatusBar>
      </SafeAreaView>
      <SafeAreaView style={styles.root}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={screens.TodoScreen} component={Todo} options={{ headerShown: false, gestureEnabled: false }} />
          </Stack.Navigator>
        </NavigationContainer >
      </SafeAreaView>
      <SafeAreaView styles={styles.navigationBarStyle} />
    </>
  );
}


export default Root;