import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LoginUser } from "../components/LoginUser";
import { Registro } from "../components/Registro";

export const Acceso = () => {
  const [isLoginScreen, setIsLoginScreen] = useState(true);

  const toggleScreen = () => {
    setIsLoginScreen(!isLoginScreen);
  };

  return (
    <View style={styles.container}>
      {isLoginScreen ? (
        <LoginUser toggleScreen={toggleScreen} />
      ) : (
        <Registro toggleScreen={toggleScreen} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    backgroundColor: "#4F46E5",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  toggleButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
