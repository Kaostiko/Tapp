import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
// import PdfInput from "../c/*  */omponents/PdfInput";
// import { pick } from "@react-native-documents/picker";

export const Anadir = () => {
  return (
    <View style={StyleSheet.anadir}>
      <Text style={styles.text}>Colores: #263D5A, #78D0A2 </Text>
      {/* <PdfInput /> */}
      {/*  <Button
        title="Selecciona el documento"
        onPress={async () => {
          try {
            const [pickResult] = await pick();
            console.log("conseguido: ", pickResult);
          } catch (err) {
            console.error;
          }
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  anadir: {
    backgroundColor: "#263D5A",
  },
  text: {
    margin: 20,
  },
});
