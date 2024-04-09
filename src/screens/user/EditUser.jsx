import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { TappContext } from "../../context/TappContext";

const initialValue = {
  name_user: "",
  last_name: "",
  telephone: "",
  image: "",
};

export const EditUser = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(TappContext);

  const [editInput, setEditInput] = useState(initialValue);

  useEffect(() => {
    if (user) {
      setEditInput({
        ...editInput,
        name_user: user.name_user !== null ? user.name_user : "",
        last_name: user.last_name !== null ? user.last_name : "",
        telephone: user.telephone !== null ? user.telephone : "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInputs({ ...editInputs, [name]: value });
  };
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      style={{ backgroundColor: "red", marginTop: 100 }}
    >
      <View style={styles.modalContainer}>
        <Text style={{ fontSize: 20 }}>
          Esto es un modal // EDITAR USUARIO?
        </Text>
        <Pressable style={styles.closeButton} onPress={closeModal}>
          <Text style={styles.buttonText}>Cerrar</Text>
        </Pressable>
      </View>
    </Modal>
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
