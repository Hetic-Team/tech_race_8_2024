declare module '@react-native-voice/voice' {
  const Voice: {
    onSpeechResults: (e: { value: string[] }) => void;
    start: (locale?: string) => Promise<void>;
    stop: () => Promise<void>;
    destroy: () => Promise<void>;
    removeAllListeners: () => void;
  };

  export default Voice;
}
