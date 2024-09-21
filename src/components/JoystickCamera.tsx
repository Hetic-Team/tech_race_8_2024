import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity,Animated, PanResponder} from 'react-native';
import Slider from '@react-native-community/slider';
import { BASE_URL } from '../constants/Urls';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from '../constants/Colors';

const JoystickCamera: React.FC = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const [xvalue, setXValue] = useState(90);
  const [yvalue, setYValue] = useState(90);
  const [isSportActive, setIsSportActive] = useState(false);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  
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
    sendPayload({ cmd: 3, x: xvalue, y: yvalue });
  }
    , [xvalue, yvalue]);
  return (
    <View style={styles.container}>
     <View style={styles.topContainer}>
        </View>
          <Slider
        style={styles.sliderContainer}
        minimumValue={30}
        maximumValue={130}
        value={yvalue}
        onValueChange={setYValue}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        thumbTintColor={Colors.light.primaryGreen}
/>
      <Slider
  style={{width: 150, height: 40}}
  minimumValue={30}
        maximumValue={130}
        value={xvalue}
        onValueChange={setXValue}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        thumbTintColor={Colors.light.primaryGreen}
/>
    </View>
  );
};
const styles = StyleSheet.create({
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  container:
  {
    padding: 10,
    paddingVertical: 40,
    gap: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor:Colors.light.background,
  },
  sliderContainer: {
    transform: [{ rotate: '90deg' }],
    width: 150, height: 40,// Rotate the slider 90 degrees
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    color: Colors.light.primaryGreen,
    fontSize: 20, 
    // width: "100%",
    paddingHorizontal: 20,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
export default JoystickCamera;
