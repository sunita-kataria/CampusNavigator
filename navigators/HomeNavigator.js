import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Routine, LandMarks} from '../screens';
// import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
    //   screenOptions={({router}) => ({
    //     tabBarIcon: ({focused, color, size}) => {
    //       if (route.name === 'Home') {
    //         return (
    //           <Ionicons
    //             name="ios-information-circle"
    //             size={size}
    //             color={color}
    //           />
    //         );
    //       } else if (route.name === 'Settings') {
    //         return (
    //           <Ionicons
    //             name="ios-information-circle"
    //             size={size}
    //             color={color}
    //           />
    //         );
    //       }
    //       return (
    //         <Ionicons name="ios-information-circle" size={size} color={color} />
    //       );
    //     },
    //   })}
    >
      <Tab.Screen name="Home" component={Home} options={{title: 'Home'}} />
      <Tab.Screen
        name="Routine"
        component={Routine}
        options={{title: 'See Routine'}}
      />
      <Tab.Screen
        name="LandMarks"
        component={LandMarks}
        options={{title: 'LandMarks'}}
      />
    </Tab.Navigator>
  );
}
