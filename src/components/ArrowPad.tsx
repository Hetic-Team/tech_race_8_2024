
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BASE_URL } from '../constants/Urls';
import { getForwardsPayload, getBackwardsPayload, getLeftPayload, getRightPayload, getStopPayload} from '../services/MovementService';
const ArrowPad = () => {
      const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

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

  const sendPayload = (payload: { cmd: number; data: number[]; }) => {

    if (ws) {
      ws.send(JSON.stringify(payload));
      setMessages(prevMessages => [...prevMessages, `You: ${JSON.stringify(payload)}`]);
    }
  };

  const sendDirectionToAPI = async (type: Number) => {
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

    const handleButtonPress = (e: any) => {
        sendDirectionToAPI(e);

    };

  return (
    <View style={styles.container}>
          <TouchableOpacity style={styles.arrowButton} onLongPress={() => handleButtonPress(1)}
          onPressOut={()=>handleButtonPress(0)}>
        <Text style={styles.arrowText}>↑</Text>
      </TouchableOpacity>
      <View style={styles.horizontalContainer}>
              <TouchableOpacity style={styles.arrowButton} onLongPress={() => handleButtonPress(3)}
               onPressOut={()=>handleButtonPress(0)}>
          <Text style={styles.arrowText}>←</Text>
        </TouchableOpacity>
              <TouchableOpacity style={styles.arrowButton}
                  onLongPress={() => handleButtonPress(4)}
                  onPressOut={()=>handleButtonPress(0)}>
                  
          <Text style={styles.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
          <TouchableOpacity style={styles.arrowButton} onLongPress={() => handleButtonPress(2)}
           onPressOut={()=>handleButtonPress(0)}>
        <Text style={styles.arrowText}>↓</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  arrowButton: {
    padding: 20,
    margin: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  arrowText: {
    fontSize: 24,
  },
});

export default ArrowPad;
