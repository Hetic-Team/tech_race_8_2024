// CarDoorEffect.tsx
import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CarDoorEffect: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const doorWidth = useRef(new Animated.Value(width / 2)).current;
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    Animated.timing(doorWidth, {
      toValue: isVisible ? 0 : width / 2,
      duration: 2000, // Adjust this value for slower or faster animation
      useNativeDriver: false,
    }).start(() => {
      // Callback when animation completes
      console.log("dasds")
      setIsAnimationComplete(!isVisible);
      console.log  (isAnimationComplete)
    });
  }, [isVisible]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.door,
          { width: doorWidth, left: 0, zIndex: !isAnimationComplete ? 0 : 1000 },
        ]}
      />
      <Animated.View
        style={[
          styles.door,
          { width: doorWidth, right: 0, zIndex: !isAnimationComplete ? 0: 1000 },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 1000, // Initial zIndex for the door effect
  },
  door: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#fff',
    height: '100%',
  },
});

export default CarDoorEffect;
