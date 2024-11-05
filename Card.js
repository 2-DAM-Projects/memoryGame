import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";

export default function Card({ onPress, isTurnedOver, children }) {
  const flipAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(flipAnimation, {
      toValue: isTurnedOver ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isTurnedOver]);

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const frontStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Animated.View style={[styles.cardFace, styles.cardBack, backStyle]}>
        <Text style={styles.text}>{children}</Text>
      </Animated.View>
      <Animated.View style={[styles.cardFace, styles.cardFront, frontStyle]}>
        <Text style={styles.text}>?</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    margin: 10,
    perspective: 1000, // Necesario para la rotación 3D
  },
  cardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  cardFront: {
    backgroundColor: "#1e293b",
    borderWidth: 10,
    borderColor: "#334155",
  },
  cardBack: {
    backgroundColor: "#1e293b",
  },
  text: {
    fontSize: 46,
    color: "#334155",
  },
});
