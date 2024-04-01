import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

export const MyAvatar = ({
  backgroundColor,
  size,
  borderRadius,
  fallbackText,
}) => {
  return (
    <View
      style={[
        styles.avatarContainer,
        { backgroundColor, width: size, height: size, borderRadius },
      ]}
    >
      <Text style={styles.fallbackText}>{fallbackText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
