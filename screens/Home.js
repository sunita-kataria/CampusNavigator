import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import localhost from '../ip';
export default function Home({navigation}) {
  const [DATA, setDATA] = useState([]);
  const apicall = async () => {
    try {
      const res = await fetch('http://' + localhost + ':8080/timetable/getAll');
      var data = await res.json();
      setDATA(data);
    } catch (err) {
      console.error(err);
    }
  };
  var ind = v => {
    if (v == 'Monday') return 1;
    if (v == 'Tuesday') return 2;
    if (v == 'Wednesday') return 3;
    if (v == 'Thursday') return 4;
    if (v == 'Friday') return 5;
    if (v == 'Saturday') return 6;
    if (v == 'Sunday') return 7;
  };
  var days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  useEffect(() => {
    apicall();
  }, []);
  if (DATA.length > 0) {
    var obj = {};
    obj[ind('Monday')] = new Array();
    obj[ind('Tuesday')] = new Array();
    obj[ind('Wednesday')] = new Array();
    obj[ind('Thursday')] = new Array();
    obj[ind('Friday')] = new Array();
    obj[ind('Saturday')] = new Array();
    obj[ind('Sunday')] = new Array();
    for (var i = 0; i < DATA.length; i++) {
      obj[ind(DATA[i]['weekDay'])].push(DATA[i]);
    }
    console.log(obj[1].length);
    for (var i = 1; i <= 7; i++) {
      obj[i].sort((a, b) => {
        return a.startTime - b.startTime;
      });
    }

    return (
      <View>
        {days.map(item => (
          <>
            <Text>{item}</Text>
            <Text>
              {obj[ind(item)].map(e => (
                <TouchableOpacity style={styles.button} onPress={onPress}>
                  <Text>
                    {e['courseName']} [{e.startTime} to {e.endTime}]
                  </Text>
                </TouchableOpacity>
              ))}
            </Text>
          </>
        ))}
      </View>
    );
  }
  return null;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});
