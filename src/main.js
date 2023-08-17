// src/DashboardScreen.js
import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';

const DashboardScreen = () => {
  const [distance, setDistance] = useState('');
  const [signalStrength1, setSignalStrength1] = useState('');
  const [signalStrength2, setSignalStrength2] = useState('');

  const calculateDistance = () => {
    if (!signalStrength1 || !signalStrength2) {
      setDistance('Enter signal strengths for both devices.');
      return;
    }

    const freqInMHz = 2400; // Frequency in MHz, adjust as needed
    const signalStrengthDifference =
      parseFloat(signalStrength1) - parseFloat(signalStrength2);
    const exp =
      (27.55 -
        20 * Math.log10(freqInMHz) +
        Math.abs(signalStrengthDifference)) /
      20.0;
    const calculatedDistance = Math.pow(10, exp);

    setDistance(`Calculated distance: ${calculatedDistance.toFixed(2)} meters`);
  };

  return (
    <View>
      <Text>WiFi Signal Distance Calculator</Text>
      <TextInput
        placeholder="Signal Strength Device 1"
        onChangeText={text => setSignalStrength1(text)}
      />
      <TextInput
        placeholder="Signal Strength Device 2"
        onChangeText={text => setSignalStrength2(text)}
      />
      <Button title="Calculate Distance" onPress={calculateDistance} />
      <Text>{distance}</Text>
    </View>
  );
};

export default DashboardScreen;
