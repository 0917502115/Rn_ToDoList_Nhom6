import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

export const BMI = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bMi, setBMI] = useState(0);
  const [bmiPhanloai, setBmiPhanLoai] = useState('');

  const classifyBMI = (bmiValue) => {
    if (bmiValue < 18.5) {
      return 'Cân nặng thấp (gầy)';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      return 'Bình thường';
    } else if (bmiValue >= 25 && bmiValue < 25.99) {
      return 'Thừa cân';
    } else if (  bmiValue >25 && bmiValue <30) {
      return 'Tiền béo phì'; 
    } else if (  bmiValue >30 && bmiValue <35) {
      return 'Béo phì I'; 
    } else if (  bmiValue >35 && bmiValue <40) {
      return 'Béo phì II'; 
    }
     else {
      return 'Béo phì III';
    }
  };
  const computeBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100;
    const bmi = weightInKg / (heightInM * heightInM);
    setBMI(bmi);
    const phanloai = classifyBMI(bmi);
    setBmiPhanLoai(phanloai);
  };
  const clean =()=>{
    setWeight ('');
    setHeight('');
    setBMI(0);
    setBmiPhanLoai('');
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (KG)</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric" 
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}> Height (CM)</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={(text) => setHeight(text)}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.result}>BMI: {bMi.toFixed(2)}</Text>
      <Text style={styles.result}>Tình trạng:{bmiPhanloai}</Text>
      <TouchableOpacity style={styles.button} onPress={computeBMI}>
        <Text style={styles.buttonText}>Tính toán</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.button1} onPress={clean}>
        <Text style={styles.buttonText}>Làm mới</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'lightgreen',
    width: '40%',
    height: 50,
    marginTop: 7,
    color: '#fff',
    borderRadius: 30,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    left:-80,
  },
  button1: {
    backgroundColor: 'lightblue',
    width: '40%',
    height: 50,
    marginTop: 7,
    color: '#fff',
    borderRadius: 30,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    top: -57,
    left:80,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color:'red',
  },
});

export default BMI;