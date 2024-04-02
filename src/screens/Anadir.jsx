import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { TappContext } from "../context/TappContext";

export const Anadir = () => {
  const { user, isLogged } = useContext(TappContext);
  const user_id = user.user_id;
  // console.log("Esta logeado?: ", isLogged);

  const pickPDF = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      const formData = new FormData();
      const assets = docRes.assets;
      if (!assets) return;

      const file = assets[0];

      const pdfFile = {
        name: file.name,
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };

      formData.append("file", pdfFile);
      console.log("FORMDATA: ", formData);
      const { data } = await axios
        .post(`http://192.168.1.120:4000/ticket/addTicket/${user_id}`, formData)
        .then((res) => console.log("RESPUESTA CORRECTA", res))
        .catch((error) => console.log("Algo falló: ", error));
      // console.log("Esto es DATA", data);
    } catch (err) {
      console.log("Error seleccionado archivo: ", err);
    }
  };

  return (
    <View style={styles.container}>
      {isLogged ? (
        <>
          <Text style={styles.text}>Sube y guarda tus tickets </Text>
          <Button
            title="Sube ticket"
            onPress={pickPDF}
            style={styles.upBoton}
          />
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.textWaring}>
              Accede para poder subir y guardar tus tickets
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#263D5A",
    fontVariant: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#78D0A2",
    margin: 20,
    textAlign: "center",
  },
  upBoton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "blue",
  },
  textWaring: {
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#263D5A",
    textAlign: "center",
    padding: 60,
  },
});
