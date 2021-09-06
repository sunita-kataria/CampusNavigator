import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import {Direction} from '../components';
import localhost from '../ip';

export default function Directions({navigation}) {
  const [DATA, setDATA] = useState([]);
  const apicall = async () => {
    try {
      const data = [];
      const res = await fetch('http://' + localhost + ':8080/classroom/getAll');
      var json = await res.json();
      for (var i = 0; i < json.length; i++) {
        const res2 = await fetch(
          'http://' +
            localhost +
            ':8080/direction/getByClassId/' +
            json[i]['id'],
        );
        if (res2['status'] == 200) {
          var json2 = await res2.json();
          data.push(json2);
        }
      }
      setDATA(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    apicall();
  }, []);

  const renderItem = ({item}) => <Direction data={item} key={item.id} />;

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
