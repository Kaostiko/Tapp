import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Estadisticas = () => {
  return (
    <View style={styles.container}>
      <Text>Estadisticas</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
