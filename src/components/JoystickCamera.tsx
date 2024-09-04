import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { BASE_URL } from '../constants/Urls';
const JoystickCamera: React.FC = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const [xvalue, setXValue] = useState(90);
  const [yvalue, setYValue] = useState(90);

  useEffect(() => {           
    const socket = new WebSocket(`ws://${BASE_URL}/ws`);
    // console.log("BASE URL", BASE_URL);

    socket.onopen = () => {
        // console.log('WebSocket connection opened');
        wsRef.current = socket;

    };

    socket.onmessage = (event) => {
        // console.log('Received:', event.data);
    };

    socket.onclose = () => {
        // console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    return () => {
        socket.close();
    };
  }, []);
    /**
     * Send payload to the API
     * @param payload 
     */
    const sendPayload = (payload: any) => {
      console.log("Sending payload:", JSON.stringify(payload));
      const currentWs = wsRef.current;
      if (currentWs) {
          currentWs.send(JSON.stringify(payload));
      }
    };
  
  useEffect(() => {
    console.log('X Value:', xvalue);
    console.log('Y Value:', yvalue);
    sendPayload({ cmd: 3, x: xvalue, y: yvalue });
  }
  , [xvalue, yvalue]);
  return (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
          <Slider
        style={styles.sliderContainer}  
  minimumValue={30}
        maximumValue={130}
        value={yvalue}
        onValueChange={setYValue}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        thumbTintColor="#FF6347" 
/>
      <Slider
  style={{width: 200, height: 40}}
  minimumValue={30}
        maximumValue={130}
        value={xvalue}
        onValueChange={setXValue}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        thumbTintColor="#FF6347" 
/>
  
    </View>
  );
};
const styles = StyleSheet.create({
  sliderContainer: {
    transform: [{ rotate: '90deg' }],
    width: 200, height: 40,// Rotate the slider 90 degrees
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default JoystickCamera;
