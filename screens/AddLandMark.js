import React, {useState} from 'react';
import {View, Text, Button, Image, TextInput, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localhost from '../ip';

export default function AddLandMark({navigation}) {
  const [location, setlocation] = useState('');
  const [step, setStep] = useState('');
  const submit = async () => {
    const e = await AsyncStorage.getItem('email');
    const res = await fetch('http://' + localhost + ':8080/landmark/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: step,
        image: location,
        student: {
          emailId: e,
        },
      }),
    });
    var json = await res.json();
    if (res.status) {
      navigation.goBack();
    }
  };

  const selectfromgallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setlocation(image['path']);

      // ImgToBase64.getBase64String(image['path'])
      //   .then(base64String => doSomethingWith(base64String))
      //   .catch(err => doSomethingWith(err));
    });
  };
  const takepic = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };
  return (
    <View>
      <Button onPress={selectfromgallery} title="select from gallery" />
      <Button onPress={takepic} title="take from camera" />
      {/* <Image
        source={require('file:///storage/emulated/0/Android/data/com.navigateyourcampus/files/Pictures/19da8c6b-d071-4a03-a0b3-8c9edb706882.jpg')}
      /> */}
      <Image
        source={{
          uri: location,
        }}
        style={{
          width: '100%',
          height: '60%',
          // resizeMode: Image.resizeMode.contain,
        }}
      />
      <TextInput
        onChangeText={setStep}
        value={step}
        style={styles.input}
        placeholder="name"
      />

      <Button onPress={submit} title="submit" />
    </View>
  );
}

// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Button,
//   Image,
// } from 'react-native';
// import ImagePicker from 'react-native-image-picker';

// export default class AddLandMark extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       resourcePath: {},
//     };
//   }

//   selectFile = () => {
//     var options = {
//       title: 'Select Image',
//       customButtons: [
//         {
//           name: 'customOptionKey',
//           title: 'Choose file from Custom Option',
//         },
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     ImagePicker.showImagePicker(options, res => {
//       console.log('Response = ', res);

//       if (res.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (res.error) {
//         console.log('ImagePicker Error: ', res.error);
//       } else if (res.customButton) {
//         console.log('User tapped custom button: ', res.customButton);
//         alert(res.customButton);
//       } else {
//         let source = res;
//         this.setState({
//           resourcePath: source,
//         });
//       }
//     });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.container}>
//           <Image
//             source={{
//               uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,
//             }}
//             style={{width: 100, height: 100}}
//           />
//           <Image
//             source={{uri: this.state.resourcePath.uri}}
//             style={{width: 200, height: 200}}
//           />
//           <Text style={{alignItems: 'center'}}>
//             {this.state.resourcePath.uri}
//           </Text>

//           <TouchableOpacity onPress={this.selectFile} style={styles.button}>
//             <Text style={styles.buttonText}>Select File</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  input: {
    // height: 40,
    // margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    // padding: 10,
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
});
