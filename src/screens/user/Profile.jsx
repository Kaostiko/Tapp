import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  Modal,
  SafeAreaView,
  TextInput,
} from "react-native";
import { TappContext } from "../../context/TappContext";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import colores from "../../utils/colores";
import BotonCustomizado from "../../components/BotonCustomizado";

export const Profile = () => {
  const { user, setToken, setIsLogged, setUser } = useContext(TappContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editableUser, setEditableUser] = useState({}); // Estado para los valores editables
  const { name_user, last_name, user_id } = user;
  const salir = () => {
    setToken("");
    setIsLogged(false);
  };

  // Validar que user no sea undefined y tenga al menos un elemento
  if (!user || user.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando...</Text>
      </View>
    );
  }

  const openModal = () => {
    setModalVisible(true);
    setEditableUser({ ...user });
    // console.log("Esta visibilidad: ", modalVisible);
  };
  const closeModal = () => {
    setModalVisible(false);
    setEditableUser({}); // Limpiar el estado editable
    // console.log("Esta visibilidad: ", modalVisible);
  };

  // Función para manejar los cambios en los inputs del modal
  const handleChange = (name, value) => {
    setEditableUser({ ...editableUser, [name]: value });
  };

  // Función para enviar los cambios al backend y actualizar el usuario
  const handleSubmit = () => {
    axios
      .put(
        `${process.env.EXPO_PUBLIC_API_URL}/user/editUser/${user_id}`,
        editableUser
      )
      .then((res) => {
        console.log("ESITABLEEEEEEEEE", editableUser);
        console.log("Usuario actualizado:", res.data);
        setUser(res.data);
        // Actualizar el usuario en el contexto o realizar cualquier otra acción necesaria
        closeModal();
      })
      .catch((err) => {
        console.log("Error al actualizar el usuario:", err);
      });
  };

  // console.log("Estado del modal: ", modalVisible);

  // Poner en mayúscula primera letra:
  const capitalize = (t) => {
    if (!t) return ""; // Manejar casos de cadena vacía o null
    return t[0].toUpperCase() + t.slice(1);
  };

  // Seleccionar imagen para cambiar la del perfil.
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setEditableUser({ ...editableUser, image: result.uri });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/icons/perfil.png")}
          style={styles.profileImage}
        />
        <Text style={styles.title}>
          {capitalize(name_user)} {capitalize(last_name)}
        </Text>
      </View>
      <View style={styles.botones}>
        <BotonCustomizado
          title={"SALIR"}
          customBackgroundColor={colores.primary}
          onPress={salir}
        />
        <BotonCustomizado
          title={"EDITAR"}
          customBackgroundColor={colores.accent}
          onPress={openModal}
        />
      </View>
      {/* Modal de edición */}
      <Modal animationType="slide" visible={modalVisible}>
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Edición de usuario:</Text>

          {/* Componente para mostrar la imagen seleccionada */}
          {user.image ? (
            <Image
              source={{ uri: editableUser.image }}
              style={{ width: 100, height: 100, marginBottom: 20 }}
            />
          ) : (
            <Image
              source={require("../../../assets/icons/perfil.png")}
              style={{
                width: 100,
                height: 100,
                marginBottom: 20,
                tintColor: colores.accent,
              }}
            />
          )}

          {/* Botón para abrir la galería de fotos */}
          <BotonCustomizado
            title={"Seleccionar imagen"}
            customBackgroundColor={colores.accent}
            onPress={pickImage}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={editableUser.name_user}
            onChangeText={(text) => handleChange("name_user", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={editableUser.last_name}
            onChangeText={(text) => handleChange("last_name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefono"
            value={editableUser.telephone}
            onChangeText={(text) => handleChange("telephone", text)}
          />

          {/* Botones para confirmar o cancelar la edición */}
          <View style={styles.botones}>
            <BotonCustomizado
              title={"GUARDAR"}
              customBackgroundColor={colores.accent}
              onPress={handleSubmit}
            />
            <BotonCustomizado
              title={"CANCELAR"}
              customBackgroundColor={colores.primary}
              onPress={closeModal}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 60,
  },
  content: {
    backgroundColor: colores.accent,
    padding: 20,
    marginTop: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "90%",
  },
  title: {
    fontSize: 24,
    // fontWeight: "bold",
    color: "#fff",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    tintColor: colores.text_primary,
  },
  modalContainer: {
    flex: 1,
    marginTop: 120,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 30,
    textAlign: "center",
    margin: 20,
    color: colores.primary,
  },
  input: {
    color: colores.accent,
    width: "70%",
    fontSize: 15,
    fontStyle: "italic",
    borderBottomWidth: 1,
    borderBottomColor: colores.accent,
    marginVertical: 30,
  },
  botones: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 15,
    margin: 15,
  },
});
