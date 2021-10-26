import React, {useEffect, useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet, Picker} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import localhost from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddDirection({navigation}) {
  const [step, setStep] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isLandmark, setIsLandmark] = useState(false);

  const [selectedLandmark, setSelectedLandmark] = useState('NA');
  const [selectedClassroom, setSelectedClassroom] = useState(1);
  const [allSteps, setallSteps] = useState([]);
  const [Landmark, setLandmark] = useState([]);
  const [Classroom, setClassroom] = useState([]);
  const [nameSelector, setnameSelector] = useState('');
  const abc = async () => {
    const res = await fetch('http://' + localhost + ':8080/landmark/getAll');
    var json = await res.json();
    setLandmark(json);
  };
  const def = async () => {
    const res = await fetch('http://' + localhost + ':8080/classroom/getAll');
    const json = await res.json();
    setClassroom(json);
  };
  useEffect(() => {
    abc();
    def();
  }, []);

  const addElemetInStep = () => {
    let temp = [...allSteps];
    const xyzzz = {};
    xyzzz['instructions'] = instructions;
    if (selectedLandmark == 'NA') {
      xyzzz['isLandmark'] = false;
    } else {
      xyzzz['isLandmark'] = true;
      xyzzz['landmark'] = {
        id: selectedLandmark,
      };
    }

    temp.push(xyzzz);
    setInstructions('');
    setallSteps(temp);
  };
  const finalSubmit = async () => {
    const ee = await AsyncStorage.getItem('email');
    const obj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameSelector,
        likes: 0,
        student: {
          emailId: ee,
        },
        classroom: {
          id: selectedClassroom,
        },
        steps: allSteps,
      }),
    };
    console.log(obj.body);
    const res = await fetch('http://' + localhost + ':8080/direction/add', obj);
    // var json = await res.json();
    if (res.ok) {
      navigation.goBack();
    }
    setallSteps([]);
    setnameSelector('');
  };
  const renderAllStep = (item, index) => {
    return (
      <View>
        {index === 0 ? null : (
          <Ionicons name="md-arrow-down" size={20} color="green" />
        )}
        <Text key={index}>{item.instructions}</Text>
      </View>
    );
  };
  const renderOption = (item, index) => {
    return <Picker.Item label={item.name} value={item.id} />;
  };

  const renderClassroom = (item, index) => {
    return <Picker.Item label={item.name} value={item.id} />;
  };
  return (
    <View>
      <TextInput
        onChangeText={setnameSelector}
        value={nameSelector}
        style={styles.input}
        placeholder="name"
      />
      {Classroom.length > 0 ? (
        <Picker
          selectedValue={selectedClassroom}
          style={{height: 50, width: 150}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedClassroom(itemValue)
          }>
          {Classroom.map(renderClassroom)}
        </Picker>
      ) : null}
      <Button title="FinalSubmit" onPress={finalSubmit} />

      <TextInput
        onChangeText={setInstructions}
        value={instructions}
        style={styles.input}
      />
      {Landmark.length > 0 ? (
        <Picker
          selectedValue={selectedLandmark}
          style={{height: 50, width: 150}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLandmark(itemValue)
          }>
          <Picker.Item label="NA" value="NA" />
          {Landmark.map(renderOption)}
        </Picker>
      ) : null}
      <Button title="add" onPress={addElemetInStep} />

      {allSteps.map(renderAllStep)}
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
