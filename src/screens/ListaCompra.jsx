import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ListaCompra = () => {
  return (
    <View style={styles.container}>
      <Text> Hacer un proyecto de TODO en está Screen </Text>
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
