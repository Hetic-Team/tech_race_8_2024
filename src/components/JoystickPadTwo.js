// @ts-nocheck
import { KorolJoystick } from "korol-joystick";

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getForwardsPayload, getBackwardsPayload, getLeftPayload, getRightPayload, getStopPayload} from '../services/MovementService';
import { BASE_URL } from '../constants/Urls';

export const JoystickPadTwo = () => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(`ws://${BASE_URL}/ws`);
    console.log("Bae URL", BASE_URL)
    socket.onopen = () => {
      console.log('WebSocket connection opened');
      setWs(socket);
    };

    socket.onmessage = (event) => {
      console.log('Received:', event.data);
      setMessages(prevMessages => [...prevMessages, event.data]);
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

  // const [input, setInput] = useState('');

  // const sendMessage = () => {
  //   if (ws && input) {
  //     ws.send(input);
  //     setMessages(prevMessages => [...prevMessages, `You: ${input}`]);
  //     setInput('');
  //   }
  // };

  const sendPayload = (payload) => {
    console.log('sdsd')
    if (ws) {
      console.log(JSON.stringify(payload))
      ws.send(JSON.stringify(payload));
      setMessages(prevMessages => [...prevMessages, `You: ${JSON.stringify(payload)}`]);
    }
  };

  const sendDirectionToAPI = async (type) => {
    try {
      console.log('Sending direction to API:', type);
      if(type == 0) sendPayload(getStopPayload());
      else if (type == 1) {
        sendPayload(getForwardsPayload());
      }
      else if (type == 2) sendPayload(getBackwardsPayload());
      else if (type == 3) sendPayload(getLeftPayload());
      else if (type == 4) sendPayload(getRightPayload());
    } catch (error) {
      console.log('Error sending direction to API:', error);
    }
  };
  const getJoystickDirection = (angle) => {
    if ((angle >= 0 && angle <= 45) || (angle > 315 && angle <= 360)) {
        return 'Right';
    } else if (angle > 45 && angle <= 135) {
        return 'Upward';
    } else if (angle > 135 && angle <= 225) {
        return 'Left';
    } else if (angle > 225 && angle <= 315) {
        return 'Downward';
    } else {
        return 'Unknown';
    }
}
  const handleButtonPress = (e) => {
    const direction = getJoystickDirection(e.angle.degree)
    console.log(direction);
    if(e.type == "stop") sendDirectionToAPI(0);
    else if (direction == "Upward") sendDirectionToAPI(1);
    else if (direction == "Right") sendDirectionToAPI(4);
    else if (direction == "Left") sendDirectionToAPI(3);
    else if (direction == "Downward") sendDirectionToAPI(2);
    else sendDirectionToAPI(0);

    };
    // sendDirectionToAPI(type);

  return (
    <KorolJoystick radius={75} onMove={handleButtonPress} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  arrowsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalArrows: {
    flexDirection: 'row',
  },
  arrowButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  arrowText: {
    fontSize: 10,
  },
  joystick: {
    backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background for joystick
  },
});

// export default Joystick;
