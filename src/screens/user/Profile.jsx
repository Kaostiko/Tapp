import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { MyAvatar } from "../../components/MyAvatar";
import { TappContext } from "../../context/TappContext";

export const Profile = () => {
  const { user, setToken, salir } = useContext(TappContext);
  const [modalVisible, setModalVisible] = useState(false);

  // Validar que user no sea undefined y tenga al menos un elemento
  /* if (!user || user.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando...</Text>
      </View>
    );
  } */

  const openModal = () => {
    setModalVisible(true);
    console.log("Esta visibilidad: ", modalVisible);
  };
  const closeModal = () => {
    setModalVisible(false);
    console.log("Esta visibilidad: ", modalVisible);
  };

  const { email, gender, image, name, last_name, telephone } = user;
  console.log("Estado del modal: ", modalVisible);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/dog.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <>
          <View style={styles.content}>
            {/* <MyAvatar
              backgroundColor="#4F46E5"
              size={50}
              borderRadius={50}
              fallbackText="SS"
            /> */}
            <Image
              source={require("../../../assets/images/artist8.jpg")}
              style={styles.profileImage}
            />
            <Text style={styles.title}>
              {name} {last_name}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.title}>{email}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Telefono</Text>
            <Text style={styles.title}>{telephone}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Genero</Text>
            <Text style={styles.title}>{gender}</Text>
          </View>
          {/* <Button title="SALIR" onPress={salir} style={styles.button} /> */}
          <View style={{ flexDirection: "row", gap: 15, margin: 15 }}>
            <Pressable style={styles.button} onPress={salir}>
              <Text style={styles.buttonText}>Salir</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={openModal}>
              <Text style={styles.buttonText}>Editar</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>Cerrar Modal</Text>
            </Pressable>
          </View>
        </>
      </ImageBackground>
      <Modal
        animationType="slide"
        visible={modalVisible}
        style={{ backgroundColor: "red", marginTop: 100 }}
        // onRequestClose={() => {
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={styles.modalContainer}>
          {/* Contenido del modal */}
          <Text style={{ fontSize: 20 }}>Esto es un modal</Text>
          <Pressable style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#4F46E5",
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    gap: 25,
    width: "90%",
    marginTop: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4F46E5",
  },
  closeButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 50,
  },
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
  profileImage: {
    width: 100, // Ajusta el tamaño de la imagen según sea necesario
    height: 100, // Ajusta el tamaño de la imagen según sea necesario
    borderRadius: 50, // Hace que la imagen tenga forma circular
  },
});
