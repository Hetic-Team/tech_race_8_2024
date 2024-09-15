import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

interface SpeedViewProps {
    speed: number; // Speed value from 0 to 1.81
}

const SpeedView: React.FC<SpeedViewProps> = ({ speed }) => {
  // Maximum speed for scaling
  const maxSpeed = 1.81;

  // Calculate the number of segments to fill
  const totalSegments = 8; // Total number of segments in the progress bar
  const filledSegments = Math.round((speed / maxSpeed) * totalSegments);

  return (
    <View style={styles.container}>
      <View style={styles.segmentContainer}>
        {[...Array(totalSegments)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              index < filledSegments ? styles.filledSegment : styles.emptySegment
            ]}
          />
        ))}
      </View>
      <Text style={styles.speedText}>{speed.toFixed(2)} mph</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  segmentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2, // Space between the progress bar and the speed text
  },
  segment: {
    width: 10, // Width of each segment
    height: 10, // Height of each segment
    margin: 2, // Space between segments
  },
  filledSegment: {
    backgroundColor: "#4CAF50", // Color of the filled segment
  },
  emptySegment: {
    backgroundColor: "#ddd", // Color of the empty segment
  },
  speedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default SpeedView;
