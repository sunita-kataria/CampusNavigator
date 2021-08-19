import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function LandMark({addedBy, destination, pictureUrl}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.picture}
        source={{
          uri: pictureUrl,
        }}
      />
      <Text style={styles.destination}>{destination}</Text>
      <Text>Added By : {addedBy}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 250,
    margin: 10,
    borderBottomWidth: 5,
    borderBottomColor: 'grey',
  },
  picture: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  destination: {
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
