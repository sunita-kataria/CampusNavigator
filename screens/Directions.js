import React from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import {Direction} from '../components';

const DATA = [
  {
    id: 1,
    pictureUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JC4Tc15mhraeLJij-Jq6lzrZqKkkrOUcljo4hRrK9JQTlycw2HaxbyUgOxvS_3N8VjM&usqp=CAU',
    destination: 'Tower Gate',
    summary:
      'main gate -> left turn -> canteen -> mechanical lab -> Tower->main gate -> left turn -> canteen -> mechanical lab -> Tower->main gate -> left turn -> canteen -> mechanical lab -> Tower->main gate -> left turn -> canteen -> mechanical lab -> Tower',
  },
  {
    id: 2,
    pictureUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JC4Tc15mhraeLJij-Jq6lzrZqKkkrOUcljo4hRrK9JQTlycw2HaxbyUgOxvS_3N8VjM&usqp=CAU',
    destination: 'Tower ',
    summary: 'main gate -> left turn -> canteen -> mechanical lab -> Tower',
  },
];

export default function Directions({navigation}) {
  const renderItem = ({item}) => (
    <Direction
      pictureUrl={item.pictureUrl}
      destination={item.destination}
      summary={item.summary}
    />
  );

  return (
    <View>
      <Button
        title="Add More"
        color="#101EF3"
        onPress={() => navigation.navigate('AddDirection')}
      />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
