import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import Voice from "@react-native-voice/voice";
import { BASE_URL } from "../constants/Urls";

interface VoiceControlProps {
  onActivationChange: (isActivated: boolean) => void;
}

interface Command {
  keywords: string[];
  action: (param?: string) => void;
}

const ACTIVATION_KEYWORD = "voiture";

const VoiceControl: React.FC<VoiceControlProps> = ({ onActivationChange }) => {
  const [recognizedText, setRecognizedText] = useState("");
  const [status, setStatus] = useState("En attente du mot-clé...");
  const websocket = useRef<WebSocket | null>(null);
  const lastCommandTime = useRef(0);
  const commandQueue = useRef<Array<{ cmd: number; data: number[] | number }>>([]);
  const sirenInterval = useRef<NodeJS.Timeout | null>(null);
  const isActivated = useRef(false);

  const startListening = useCallback(async () => {
    try {
      await Voice.start("fr-FR");
      setStatus("Écoute...");
    } catch (e) {
      setTimeout(startListening, 500);
    }
  }, []);

  useEffect(() => {
    const setupVoice = async () => {
      try {
        await Voice.destroy();
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechError = onSpeechError;
        websocket.current = new WebSocket(`ws://${BASE_URL}/ws`);
        await startListening();
      } catch (e) {
        console.error("Erreur lors de l'initialisation de Voice:", e);
      }
    };

    setupVoice();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      if (websocket.current) {
        websocket.current.close();
      }
      if (sirenInterval.current) {
        clearInterval(sirenInterval.current);
      }
    };
  }, [startListening]);

  const onSpeechError = (e: any) => {
    startListening();
  };

  const throttle = (func: Function, limit: number) => {
    return (...args: any[]) => {
      const now = Date.now();
      if (now - lastCommandTime.current > limit) {
        func(...args);
        lastCommandTime.current = now;
      } else {
        commandQueue.current.push(args[0]);
      }
    };
  };

  const sendWebSocketMessage = useCallback(throttle((message: { cmd: number; data: number[] | number }) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(JSON.stringify(message));
      console.log("Message sent:", message);
    } else {
      console.log("WebSocket not connected");
    }
  }, 200), []);

  const processCommandQueue = useCallback(() => {
    if (commandQueue.current.length > 0) {
      const nextCommand = commandQueue.current.shift();
      if (nextCommand) {
        sendWebSocketMessage(nextCommand);
      }
    }
  }, [sendWebSocketMessage]);

  useEffect(() => {
    const interval = setInterval(processCommandQueue, 250);
    return () => clearInterval(interval);
  }, [processCommandQueue]);

  const playSiren = useCallback(() => {
    let isHighFreq = true;
    if (sirenInterval.current) {
      clearInterval(sirenInterval.current);
    }
    sirenInterval.current = setInterval(() => {
      if (isHighFreq) {
        sendWebSocketMessage({ cmd: 8, data: [1, 800] });
      } else {
        sendWebSocketMessage({ cmd: 8, data: [1, 600] });
      }
      isHighFreq = !isHighFreq;
    }, 500);

    setTimeout(() => {
      if (sirenInterval.current) {
        clearInterval(sirenInterval.current);
        sendWebSocketMessage({ cmd: 8, data: [0, 0] });
      }
    }, 10000);
  }, [sendWebSocketMessage]);

  const commands: Command[] = [
    {
      keywords: ["avance", "avancer", "aller", "avant", "devant"],
      action: () => sendWebSocketMessage({ cmd: 1, data: [1000, 1000, 1000, 1000] })
    },
    {
      keywords: ["recule", "reculer", "arrière", "retour"],
      action: () => sendWebSocketMessage({ cmd: 1, data: [-1000, -1000, -1000, -1000] })
    },
    {
      keywords: ["droite", "tourner à droite", "aller à droite"],
      action: () => sendWebSocketMessage({ cmd: 1, data: [1000, 1000, 0, 0] })
    },
    {
      keywords: ["gauche", "tourner à gauche", "aller à gauche"],
      action: () => sendWebSocketMessage({ cmd: 1, data: [0, 0, 1000, 1000] })
    },
    {
      keywords: ["stop", "arrête", "arrêter", "arrête-toi", "stopper"],
      action: () => sendWebSocketMessage({ cmd: 1, data: [0, 0, 0, 0] })
    },
    {
      keywords: ["police", "sirène", "urgence"],
      action: playSiren
    }
  ];

  const findCommand = useCallback((text: string): Command | undefined => {
    return commands.find(command =>
      command.keywords.some(keyword => text.toLowerCase().includes(keyword))
    );
  }, []);

  const handleUnrecognizedCommand = useCallback(() => {
    console.log("Commande non reconnue");
    sendWebSocketMessage({ cmd: 7, data: 1 });
    setTimeout(() => {
      sendWebSocketMessage({ cmd: 7, data: 0 });
    }, 500);
  }, [sendWebSocketMessage]);

  const onSpeechResults = useCallback((e: { value: string[] }) => {
    if (e.value && e.value.length > 0) {
      const recognizedText = e.value[0].toLowerCase();
      setRecognizedText(recognizedText);

      if (!isActivated.current) {
        if (recognizedText.includes(ACTIVATION_KEYWORD)) {
          isActivated.current = true;
          onActivationChange(true);
          setStatus("Activé ! Quelle est votre commande ?");
          startListening();
        } else {
          startListening();
        }
      } else {
        const command = findCommand(recognizedText);
        if (command) {
          command.action();
          setStatus("Commande exécutée. En attente du mot-clé...");
        } else {
          handleUnrecognizedCommand();
          setStatus("Commande non reconnue. En attente du mot-clé...");
        }
        isActivated.current = false;
        onActivationChange(false);
        startListening();
      }
    }
  }, [onActivationChange, startListening, findCommand, handleUnrecognizedCommand]);

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{status}</Text>
      <Text style={styles.recognizedText}>Texte reconnu : {recognizedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  recognizedText: {
    fontSize: 16,
    color: "black",
  },
});

export default VoiceControl;
