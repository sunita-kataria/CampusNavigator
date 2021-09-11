import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LandMark} from '../components';
import localhost from '../ip';
export default function LandMarks({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);
  const [DATA, setDATA] = useState([]);
  const apicall = async () => {
    const res = await fetch('http://' + localhost + ':8080/landmark/getAll');
    var json = await res.json();
    setDATA(json);
  };
  useEffect(() => {
    apicall();
    // setRefreshing(true);
  }, []);
  const renderItem = ({item}) => (
    <LandMark
      pictureUrl={item.image}
      addedBy={item.student.name}
      destination={item.name}
    />
  );
  const onRefresh = () => {
    apicall();
  };

  return (
    <SafeAreaView style={{paddingBottom: 30}}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text></Text>
      </ScrollView>
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
