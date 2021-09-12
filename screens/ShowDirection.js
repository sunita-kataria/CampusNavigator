import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import localhost from '../ip';
export default function ShowDirection({route, navigation}) {
  const data = route.params.details;

  const [datafetched, setdatafetched] = useState('');
  useEffect(() => {
    getlandmark();
  }, []);
  const getlandmark = async () => {
    const res = await fetch(
      'http://' + localhost + ':8080/direction/getByClassId/' + data,
    );
    const json = await res.json();
    console.log(json);
    setdatafetched(json);
  };
  const renderStep = item => {
    console.log(item);
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          {item.isLandmark ? (
            <Image
              source={{uri: item.landmark.image}}
              style={{width: 100, height: 100, flex: 2}}
            />
          ) : null}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'red',
              flex: 3,
            }}>
            <Text style={{fontWeight: 'italic', fontSize: 20}}>
              {item.instructions}
            </Text>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Ionicons name="md-arrow-down" size={40} color="green" />
        </View>
      </View>
    );
  };
  return (
    <View>
      <Text style={{fontWeight: 'italic', fontSize: 30}}>
        {datafetched?.name}
      </Text>
      <Text style={{fontWeight: 'italic', fontSize: 15}}>
        Liked By : {datafetched?.likes}
      </Text>
      <Text style={{fontWeight: 'italic', fontSize: 15}}>
        Added By : {datafetched?.student.name}
      </Text>
      <Text style={{fontWeight: 'Bold', fontSize: 25}}>Steps</Text>
      {datafetched?.steps.map(renderStep)}
      <Text style={{fontWeight: 'Bold', fontSize: 20}}>Your Destination</Text>
    </View>
  );
}
