import * as React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login, SignUp} from '../screens';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeNavigator}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUp}
          options={{title: 'Signup'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
