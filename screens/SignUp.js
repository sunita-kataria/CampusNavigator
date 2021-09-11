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

// 25737008@students.lincoln.ac.uk

const SignUp = ({navigation}) => {
  const [userName, onChangeUserName] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [Name, onChangeName] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [confirmPassword, onChangeConfirmPassword] = React.useState('');

  const checkCredentials = async () => {
    try {
      const res = await fetch('http://' + localhost + ':8080/auth/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: Name,
          emailId: userName,
          pwd: password,
        }),
      });
      var json = await res.json();
      if (json['loggedIn']) {
        navigation.navigate('HomeScreen');
      } else {
        alert(json['message']);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const Login = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 50}}></View>
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUserName}
          value={userName}
          placeholder="email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={Name}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Contact Number"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="password"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          onChangeText={onChangeConfirmPassword}
          value={confirmPassword}
          placeholder="confirm password"
          secureTextEntry={true}
        />
        <Button title="SignUp" onPress={checkCredentials} />
        <View>
          <TouchableOpacity onPress={Login}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontSize: 20,
                textDecorationLine: 'underline',
              }}>
              Already Have account SignIn
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
    flex: 4,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    // height: 200,
  },
});

export default SignUp;
