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