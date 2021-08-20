import React, {useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AddDirection() {
  const [step, setStep] = useState('');
  const [allSteps, setallSteps] = useState([]);

  const addElemetInStep = () => {
    let temp = [...allSteps];
    temp.push(step);
    setStep('');
    setallSteps(temp);
  };

  const renderAllStep = (item, index) => {
    return (
      <View>
        {index === 0 ? null : (
          <Ionicons name="md-arrow-down" size={20} color="green" />
        )}
        <Text key={index}>{item}</Text>
      </View>
    );
  };

  return (
    <View>
      <TextInput onChangeText={setStep} value={step} style={styles.input} />
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
