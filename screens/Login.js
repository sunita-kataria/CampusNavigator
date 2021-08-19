import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TextPropTypes,
  Text,
} from 'react-native';

const Login = ({navigation}) => {
  const [userName, onChangeUserName] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const checkCredentials = () => {
    let apiCall = true;
    if (apiCall) {
      navigation.navigate('HomeScreen');
    }
  };

  const signUp = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUserName}
        value={userName}
        placeholder="user name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="password"
        secureTextEntry={true}
      />
      <Button title="Login" onPress={checkCredentials} />
      <Button title="SignUp" onPress={signUp} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Login;
