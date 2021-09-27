import React, {useEffect, useState, Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import localhost from '../ip';

import {
  Table,
  Row,
  Rows,
  Col,
  TableWrapper,
  Cell,
} from 'react-native-table-component';

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
  const something = () => {};

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
    for (var i = 1; i <= 7; i++) {
      obj[i].sort((a, b) => {
        return a.startTime - b.startTime;
      });
    }
    const box = [];
    for (var i = 1; i <= 7; i++) {
      const smallbox = [];
      for (var j = 0; j < obj[i].length; j++) {
        smallbox.push(obj[i][j]);
      }
      box.push(smallbox);
    }
    // console.log(box);
    // console.log(box);
    return (
      <View>
        {/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <TableWrapper style={{flexDirection: 'row'}}>
            <Col
              data={days}
              style={styles.head}
              borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}
              // heightArr={[60, 60]}
              textStyle={styles.text}
            />
            <Col
              data={box}
              borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}
              style={styles.title}
              heightArr={[30, 30, 30, 30, 30]}
              textStyle={styles.titleText}></Col>
          </TableWrapper>
        </Table> */}
        {[0, 1, 2, 3, 4, 5, 6].map(item => {
          for (var i = box[item].length; i < 6; i++) box[item].push('NA');
          console.log(days[item]);
          return (
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {days[item]} :{' '}
              </Text>
              <FlatList
                data={box[item]}
                horizontal={true}
                renderItem={str => {
                  if (str.item === 'NA') {
                    return (
                      <View
                        style={{
                          backgroundColor: 'red',
                          margin: 10,
                          width: 40,
                        }}>
                        <Text>{str.item}</Text>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        style={{
                          backgroundColor: 'green',
                          margin: 10,
                          // width: 40,
                        }}>
                        <Text>{str.item['courseName']}</Text>
                        <Text>
                          [{str.item.startTime} , {str.item.endTime}]
                        </Text>
                      </View>
                    );
                  }
                }}
                // keyExtractor={item => item}
              />
            </View>
          );
        })}
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
  singleHead: {backgroundColor: '#c8e1ff'},
  head: {flex: 1, backgroundColor: '#c8e1ff', borderRadius: 2},
  title: {
    flex: 4,
    backgroundColor: '#f6f8fa',
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#c8e1ff',
  },
  titleText: {
    borderRadius: 2,
    borderColor: '#c8e1ff',
    fontWeight: 'bold',
  },
  btn: {
    width: 58,
    height: 18,
    marginLeft: 15,
    backgroundColor: '#c8e1ff',
    borderRadius: 2,
  },
  btnText: {textAlign: 'center'},
  text: {textAlign: 'center', fontWeight: '100'},
});
