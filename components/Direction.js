import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function Direction({summary, destination, pictureUrl}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.picture}
        source={{
          uri: pictureUrl,
        }}
      />
      <View style={styles.textHalf}>
        <Text style={styles.destination}>{destination}</Text>
        <Text>{summary}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // height: 100,
    margin: 10,
    borderBottomWidth: 5,
    borderBottomColor: 'grey',
    flex: 1,
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    flex: 1,
    resizeMode: 'cover',
    width: 50,
    height: 80,
    borderRadius: 50,
    borderColor: '#101EF3',
    // overflow: 'hidden',
  },
  textHalf: {
    flex: 3,
    marginLeft: 5,
    alignSelf: 'center',
  },
  destination: {
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
});
