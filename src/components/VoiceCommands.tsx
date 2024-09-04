import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Button, Text } from 'react-native';
import Voice from '@react-native-voice/voice';
import { BASE_URL } from '../constants/Urls';

interface VoiceControlProps {
  // Vous pouvez ajouter des props si nécessaire
}

const VoiceControl: React.FC<VoiceControlProps> = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const websocket = useRef<WebSocket | null>(null);
  const lastCommandTime = useRef(0);
  const commandQueue = useRef<Array<{ cmd: number; data: number[] }>>([]);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    websocket.current = new WebSocket(`ws://${BASE_URL}/ws`);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, []);

  const throttle = (func: Function, limit: number) => {
    return (...args: any[]) => {
      const now = Date.now();
      if (now - lastCommandTime.current > limit) {
        func(...args);
        lastCommandTime.current = now;
      } else {
        // Ajouter la commande à la file d'attente
        commandQueue.current.push(args[0]);
      }
    };
  };

  const sendWebSocketMessage = useCallback(throttle((message: { cmd: number; data: number[] }) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(JSON.stringify(message));
      console.log('Message sent:', message);
    } else {
      console.log('WebSocket not connected');
    }
  }, 200), []);  // 200ms de délai entre chaque envoi

  const processCommandQueue = useCallback(() => {
    if (commandQueue.current.length > 0) {
      const nextCommand = commandQueue.current.shift();
      if (nextCommand) {
        sendWebSocketMessage(nextCommand);
      }
    }
  }, [sendWebSocketMessage]);

  useEffect(() => {
    const interval = setInterval(processCommandQueue, 250);  // Vérifier la file d'attente toutes les 250ms
    return () => clearInterval(interval);
  }, [processCommandQueue]);

  const onSpeechResults = (e: { value: string[] }) => {
    if (e.value && e.value.length > 0) {
      const command = e.value[0].toLowerCase();
      setRecognizedText(command);
      handleCommand(command);
    }
  };

  const handleCommand = (command: string) => {
    switch (command) {
      case 'avance':
        sendWebSocketMessage({ cmd: 1, data: [1000, 1000, 1000, 1000] });
        break;
      case 'arrête':
        sendWebSocketMessage({ cmd: 1, data: [0, 0, 0, 0] });
        break;
      default:
        console.log('Commande non reconnue');
    }
  };

  const startListening = async () => {
    try {
      await Voice.start('fr-FR');
      setIsListening(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <Button
        title={isListening ? "Arrêter l'écoute" : "Commencer l'écoute"}
        onPress={isListening ? stopListening : startListening}
      />
      <Text>Texte reconnu : {recognizedText}</Text>
    </View>
  );
};

export default VoiceControl;
