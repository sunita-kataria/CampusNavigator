import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TextPropTypes,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Button} from '../components';
import localhost from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [userName, onChangeUserName] = React.useState('abc@gmail.com');
  const [password, onChangePassword] = React.useState('123456');

  const checkCredentials = async () => {
    try {
      const res = await fetch('http://' + localhost + ':8080/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailId: userName,
          pwd: password,
        }),
      });
      var json = await res.json();
      if (json['loggedIn']) {
        AsyncStorage.setItem('email', userName);

        navigation.navigate('HomeScreen');
      } else {
        alert(json['message']);
      }
    } catch (err) {
      console.error(err);
    }
    // let apiCall = true false;
    // if (apiCall) {
    // }
  };

  const signUp = async () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 100}}></View>
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUserName}
          value={userName}
          placeholder="email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="password"
          secureTextEntry={true}
        />
        <Button title="Login" onPress={checkCredentials} />
        <View>
          <TouchableOpacity onPress={signUp}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontSize: 20,
                textDecorationLine: 'underline',
              }}>
              Don't Have account SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    // height: 40,
    // margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    // padding: 10,
  },
  buttonContainer: {
    // flex: 5,
    // justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  body: {
    flex: 2,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    // height: 200,
  },
});

export default Login;
