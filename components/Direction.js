import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function Direction({data, navigation}) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ShowDirection', {
          details: data.classroom.id,
        })
      }>
      <View style={styles.container}>
        <View style={styles.textHalf}>
          <Text style={styles.destination}>{data.name}</Text>
          <Text>Added By : {data.student.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
