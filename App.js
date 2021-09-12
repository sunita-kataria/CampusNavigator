import React from 'react';
import InitialNavigator from './navigators/InitialNavigator';
import {LogBox} from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notification
  return <InitialNavigator />;
}
