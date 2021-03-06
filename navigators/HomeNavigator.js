import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Routine, LandMarks, Directions} from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return <Ionicons name="md-home" size={size} color={color} />;
          } else if (route.name === 'Directions') {
            return <Ionicons name="navigate" size={size} color={color} />;
          }
          return <Ionicons name="md-compass" size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} options={{title: 'Home'}} />
      <Tab.Screen
        name="Directions"
        component={Directions}
        options={{title: 'Directions'}}
      />
      <Tab.Screen
        name="LandMarks"
        component={LandMarks}
        options={{title: 'LandMarks'}}
      />
    </Tab.Navigator>
  );
}
