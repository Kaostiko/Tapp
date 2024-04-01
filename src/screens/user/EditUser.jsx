import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export const EditUser = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Vamos a editar la información del usuario</Text>
      <Pressable style={styles.button} onPress={navigation("Perfil")}>
        <Text style={styles.buttonText}>Volver</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});
