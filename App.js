import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

const App = () => {
  const [switchValue, setSwitchValue] = useState(true);
  const [result, setResult] = useState('');

  const [heightValue, setHeight] = useState(0);
  const [weightValue, setWeight] = useState(0);

  const [hightPlaceholderValue, setHightPlaceholderValue] = useState(
    'Height (CM)'
  );
  const [weightPlaceholderValue, setWeightPlaceholderValue] = useState(
    'Weight (KG)'
  );

  const toggleSwitch = (value) => {
    setSwitchValue(value);
    if (value) {
      setHightPlaceholderValue('Height (cm)');
      setWeightPlaceholderValue('Weight (kg)');
    } else {
      setHightPlaceholderValue('Height (in)');
      setWeightPlaceholderValue('Weight (lb)');
    }
     setResult('');
  };

  const onButtonPress = () => {
    var result
    if (switchValue) {
      //Metric
      result = (parseFloat(weightValue) * 10000) / (parseFloat(heightValue) * parseFloat(heightValue));
    } else {
      //Imperial
      var heightInCM = heightValue * 2.54 
      var weightInKG = weightValue / 2.205 
      result = (parseFloat(weightInKG) * 10000) / (parseFloat(heightInCM) * parseFloat(heightInCM));
    }
    result = result.toFixed(2);
    showResult(result);
  };

  const showResult = (result) => {
    console.log('Result value: ' + result);
    if (result < 18.5) {
      setResult('BMI is ' + result + '\nYou are Underweight');
    } else if (result >= 18.5 && result < 25) {
      setResult('BMI is ' + result + '\nYou are Normal');
    } else if (result >= 25 && result < 30) {
      setResult('BMI is ' + result + '\nYou are Overweight');
    } else if (result >= 30) {
      setResult('BMI is ' + result + '\nYou are Obese');
    } else {
      setResult('Invalid Inpupt');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>BMI Calculator</Text>

      <View style={styles.typeContainer}>
        <Text style={styles.label}>Imperial</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={switchValue ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={switchValue}
        />
        <Text style={styles.label}>Metric</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder={hightPlaceholderValue}
        keyboardType={'numeric'}
        onChangeText={(textHeight) => setHeight(textHeight)}
        placeholderTextColor="#EEEEEE"
      />

      <TextInput
        style={styles.input}
        placeholder={weightPlaceholderValue}
        keyboardType={'numeric'}
        onChangeText={(textWeight) => setWeight(textWeight)}
        placeholderTextColor="#EEEEEE"
      />

      <TouchableOpacity onPress={onButtonPress} style={styles.button}>
        <Text style={styles.buttonText}> Calculate </Text>
      </TouchableOpacity>

      <Text style={styles.resultText}>{result}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    backgroundColor: '#006064',
    justifyContent: 'flex-end',
  },
  typeContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  titleText: {
    margin: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
    color: '#fff',
  },
  input: {
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#006064',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
  label: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
});

export default App;
