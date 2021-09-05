import React from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import {LandMark} from '../components';

const DATA = [
  {
    id: 1,
    pictureUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JC4Tc15mhraeLJij-Jq6lzrZqKkkrOUcljo4hRrK9JQTlycw2HaxbyUgOxvS_3N8VjM&usqp=CAU',
    destination: 'Tower Gate',
    addedBy: 'Devid',
  },
  {
    id: 2,
    pictureUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JC4Tc15mhraeLJij-Jq6lzrZqKkkrOUcljo4hRrK9JQTlycw2HaxbyUgOxvS_3N8VjM&usqp=CAU',
    destination: 'Tower Gate',
    addedBy: 'Devid',
  },
  {
    id: 3,
    pictureUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JC4Tc15mhraeLJij-Jq6lzrZqKkkrOUcljo4hRrK9JQTlycw2HaxbyUgOxvS_3N8VjM&usqp=CAU',
    destination: 'Tower Gate',
    addedBy: 'Devid',
  },
];

export default function LandMarks({navigation}) {
  const renderItem = ({item}) => (
    <LandMark
      pictureUrl={item.pictureUrl}
      addedBy={item.addedBy}
      destination={item.destination}
    />
  );

  return (
    <View>
      <Button
        title="Add More"
        color="#101EF3"
        onPress={() => navigation.navigate('AddLandMark')}
      />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({});
