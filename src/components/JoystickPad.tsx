import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, PanResponder, StyleSheet } from 'react-native';
import { getForwardsPayload, getBackwardsPayload, getLeftPayload, getRightPayload, getStopPayload, getCameraOnPayload, getUpLeftPayload, getUpRightPayload, getDownLeftPayload, getDownRightPayload } from '../services/MovementService';
import { BASE_URL } from '../constants/Urls';

const JoystickPad: React.FC = () => {
    const wsRef = useRef<WebSocket | null>(null);
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;  const [throttleTimeout, setThrottleTimeout] = useState<NodeJS.Timeout | null>(null);
  const throttleDelay = 400;

  useEffect(() => {           
    const socket = new WebSocket(`ws://${BASE_URL}/ws`);
    // console.log("BASE URL", BASE_URL);

    socket.onopen = () => {
        // console.log('WebSocket connection opened');
        wsRef.current = socket;
        cameraOn();
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
     * Get the payload for the camera to turn on
     */
const cameraOn = () => {
        const cameraCommandOn = getCameraOnPayload();
    sendPayload(cameraCommandOn);
    
}
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
  
/**
 * Send the direction to the API
 * @param direction 
 * @param speed 
 * @returns 
 */
  const sendDirectionToAPI = (direction: string, speed: number) => {
      console.log("Direction and Speed :", direction , " and ", speed);
    switch (direction) {
      case 'up':
        return getForwardsPayload(speed);
      case 'down':
       return getBackwardsPayload(speed);
      case 'left':
        return getLeftPayload(speed);
      case 'right':
        return getRightPayload(speed);
      case 'up-left':
      return getUpLeftPayload(speed);
      case 'up-right':
        return getUpRightPayload(speed);
      case 'down-left':
        return getDownLeftPayload(speed);
      case 'down-right':
       return getDownRightPayload(speed);
        case 'stop':
            return getStopPayload();
      default:
       return getStopPayload();
    }
  
  };


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        let { dx, dy } = gestureState;
        const maxDistance = 100; // Max joystick distance
      
        // Limit dx and dy to remain within the joystick circle
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > maxDistance) {
          const ratio = maxDistance / distance;
          dx *= ratio;
          dy *= ratio;
        }
      
        const normalizedDistance = Math.min(distance, maxDistance) / maxDistance;
        const speed = Math.round(normalizedDistance * 1000); // Calculate speed
      
          // Determine direction
        
        let direction = '';
        if (dy < 0 && dx >= -45 && dx <= 45) direction = 'up'; // Up condition
        else if (dy > 0 && dx >= -45 && dx <= 45) direction = 'down'; // Down condition
        else if (dx > 0 && dy >= -45 && dy <= 45) direction = 'right'; // Right condition
        else if (dx < 0 && dy >= -45 && dy <= 45) direction = 'left'; // Left condition
        else if (dx > 0 && dy > 0) direction = 'down-right'; // Down-right diagonal
        else if (dx > 0 && dy < 0) direction = 'up-right'; // Up-right diagonal
        else if (dx < 0 && dy > 0) direction = 'down-left'; // Down-left diagonal
        else if (dx < 0 && dy < 0) direction = 'up-left'; // Up-left diagonal
          else direction = 'stop'; // Default stop direction

          // getting payload
              const payload = sendDirectionToAPI(direction, speed);
              sendPayload(payload);
       
          // adjusting throttle of the joystick to prevent too many requests
        //   if (throttleTimeout) {
        //     clearTimeout(throttleTimeout);
        //   }
        //       setThrottleTimeout(setTimeout(() => {
        //     sendPayload(payload);
        //   }, throttleDelay));
      
        // Update joystick position
        pan.setValue({ x: dx, y: dy });
      },      
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
          const payload = sendDirectionToAPI("stop", 0);
          sendPayload(payload);
          // Arrêter le mouvement quand le joystick est relâché
      },
    })
  ).current;

  return (
    <View style={styles.joystickContainer}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.joystick,
          {
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    joystickContainer: {
      width: 150, // Reduce the width of the container
      height: 150, // Reduce the height of the container
      borderRadius: 100, // Adjust the border radius to match the new size
      backgroundColor: 'rgba(0,0,0,0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    joystick: {
      width: 60, // Reduce the width of the joystick
      height: 60, // Reduce the height of the joystick
      borderRadius: 30, // Adjust the border radius to match the new size
      backgroundColor: 'blue',
      position: 'absolute',
    },
    });

export default JoystickPad;