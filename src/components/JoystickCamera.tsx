import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, PanResponder, StyleSheet } from 'react-native';
import { getForwardsPayload, getBackwardsPayload, getLeftPayload, getRightPayload, getStopPayload } from '../services/MovementService';
import { BASE_URL } from '../constants/Urls';

const JoystickCamera: React.FC = () => {
    const wsRef = useRef<WebSocket | null>(null);
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;  const [throttleTimeout, setThrottleTimeout] = useState<NodeJS.Timeout | null>(null);
  const throttleDelay = 1000;

  useEffect(() => {           
    const socket = new WebSocket(`ws://${BASE_URL}/ws`);
    console.log("BASE URL", BASE_URL);

    socket.onopen = () => {
        console.log('WebSocket connection opened');
        wsRef.current = socket;
    };

    socket.onmessage = (event) => {
        console.log('Received:', event.data);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    return () => {
        socket.close();
    };
}, []);

const sendPayload = (payload: any) => {
    const currentWs = wsRef.current;
    if (currentWs) {
        console.log("Sending payload:", JSON.stringify(payload));
        // currentWs.send(JSON.stringify(payload));
    }
};

  const sendDirectionToAPI = (direction: string, speed: number) => {
    let payload: any;
    switch (direction) {
      case 'up':
        payload = {
          cmd: 1,
          data: [speed, speed, speed, speed] // All wheels move forward
        };
        break;
      case 'down':
        payload = {
          cmd: 1,
          data: [-speed, -speed, -speed, -speed] // All wheels move backward
        };
        break;
      case 'left':
        payload = {
          cmd: 1,
          data: [-speed, speed, -speed, speed] // Example values for left turn, adjust as needed
        };
        break;
      case 'right':
        payload = {
          cmd: 1,
          data: [speed, -speed, speed, -speed] // Example values for right turn, adjust as needed
        };
        break;
      case 'up-left':
        payload = {
          cmd: 1,
          data: [-speed, speed, -speed, speed] // Example values for up-left, adjust as needed
        };
        break;
      case 'up-right':
        payload = {
          cmd: 1,
          data: [speed, -speed, speed, -speed] // Example values for up-right, adjust as needed
        };
        break;
      case 'down-left':
        payload = {
          cmd: 1,
          data: [-speed, speed, -speed, speed] // Example values for down-left, adjust as needed
        };
        break;
      case 'down-right':
        payload = {
          cmd: 1,
          data: [speed, -speed, speed, -speed] // Example values for down-right, adjust as needed
        };
        break;
      case 'stop':
      default:
        payload = {
          cmd: 1,
          data: [0, 0, 0, 0] // Stop all wheels
        };
        break;
    }
      sendPayload(payload);
    // Send the prepared payload
      // Throttle the sending of payload
//    if (throttleTimeout) {
//     clearTimeout(throttleTimeout);
//   }
//       setThrottleTimeout(setTimeout(() => {
//         // console.log("bef",payload)
//     sendPayload(payload);
//   }, throttleDelay));
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
        const speed = Math.round(normalizedDistance * 4095); // Calculate speed
      
        // Determine direction
        let direction = '';
        if (dx > 0 && dy < 0) direction = 'up';
        else if (dx > 0 && dy > 0) direction = 'down';
        else if (dx < 0 && dy < 0) direction = 'up';
        else if (dx < 0 && dy > 0) direction = 'down';
        else if (dx > 0) direction = 'right';
        else if (dx < 0) direction = 'left';
        else if (dy > 0) direction = 'down';
        else if (dy < 0) direction = 'up';
      
        sendDirectionToAPI(direction, speed);
      
        // Update joystick position
        pan.setValue({ x: dx, y: dy });
      },      
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        sendDirectionToAPI("stop", 0); // Arrêter le mouvement quand le joystick est relâché
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

export default JoystickCamera;
// import { Joystick } from 'react-joystick-component';
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { getForwardsPayload, getBackwardsPayload, getLeftPayload, getRightPayload, getStopPayload, mapJoystickToCameraAngles} from '@/services/MovementService';
// import { BASE_URL } from '@/constants/Urls';

// export const JoystickCamera = () => {
//   const [ws, setWs] = useState<WebSocket | null>(null);
//   const [messages, setMessages] = useState<string[]>([]);

//   useEffect(() => {
//     const socket = new WebSocket(`ws://${BASE_URL}/ws`);
//     console.log("Bae URL", BASE_URL)
//     socket.onopen = () => {
//       console.log('WebSocket connection opened');
//       setWs(socket);
//     };

//     socket.onmessage = (event) => {
//       console.log('Received:', event.data);
//       setMessages(prevMessages => [...prevMessages, event.data]);
//     };

//     socket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     socket.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);
//   /**
//    * Send request to the API
//    * @param payload
//    */
//   const sendPayload = (payload: { cmd: number; data: number[]; }) => {

//     if (ws) {
//       ws.send(JSON.stringify(payload));
//       setMessages(prevMessages => [...prevMessages, `You: ${JSON.stringify(payload)}`]);
//     }
//   };
//   /**
//    * Handle the joystick movement
//    * @param e
//    */
//   const handleButtonPress = (e: any) => {
//     console.log('Button pressed:', e);
//     let xVal = e.x;
//     let yVal = e.y;
//     sendPayload({
//       cmd: 3,
//       data: mapJoystickToCameraAngles(xVal, yVal),
//     });
//   };

//   return (
//     <Joystick size={100} throttle={50} sticky={true} baseColor="red" stickColor="blue" move={handleButtonPress}></Joystick>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   message: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   arrowsContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   horizontalArrows: {
//     flexDirection: 'row',
//   },
//   arrowButton: {
//     margin: 5,
//     padding: 5,
//     backgroundColor: '#DDDDDD',
//     borderRadius: 5,
//   },
//   arrowText: {
//     fontSize: 10,
//   },
// });

// // export default Joystick;
