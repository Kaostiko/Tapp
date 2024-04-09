import React from "react";
import { TouchableOpacity, Text, StyleSheet, Pressable } from "react-native";
import colores from "../utils/colores";

const BotonCustomizado = ({ onPress, title, customBackgroundColor }) => {
  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: customBackgroundColor || colores.accent },
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    height: 35,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  buttonText: {
    color: colores.text_primary,
    fontSize: 18,
  },
});

export default BotonCustomizado;
