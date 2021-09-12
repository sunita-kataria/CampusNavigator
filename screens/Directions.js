import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Direction} from '../components';
import localhost from '../ip';

export default function Directions({navigation}) {
  const [DATA, setDATA] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
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

  const renderItem = ({item}) => (
    <Direction data={item} key={item.id} navigation={navigation} />
  );

  const onRefresh = () => {
    apicall();
  };
  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({});
