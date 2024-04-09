import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import colores from "../utils/colores";

export const Home = () => {
  return (
    <>
      <ScrollView>
        <View style={styles.maincontainer}>
          <View style={styles.container}>
            <Text style={styles.text_header}>Tappea tu tickets</Text>
            <Image
              source={{
                uri: "https://financialfood.es/wp-content/uploads/2023/02/compra-supermercado-010223.jpg",
              }}
              style={styles.image}
            />
            <Text style={styles.text_header}>y tenlo siempre a mano.</Text>
          </View>
          <View style={styles.subcontainer}>
            <View>
              <Text style={styles.subcontainer_text_header}>
                ¿Cómo usar la aplicación?
              </Text>
            </View>
            <View style={styles.subcontainer_children}>
              <Text style={styles.subcontainer_text}>
                1-. Haz tu lista de la compra
              </Text>
              <Image
                source={require("../../assets/icons/verification.png")}
                style={styles.icono}
              />
              <Text style={styles.subcontainer_text}>2-. Sube tus tickets</Text>
              <Image
                source={require("../../assets/icons/boleto.png")}
                style={styles.icono}
              />
              <Text style={styles.subcontainer_text}>
                3-. Ten a mano tus tickets y obten información.
              </Text>
              <Image
                source={require("../../assets/icons/ahorros.png")}
                style={styles.icono}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  text_header: {
    fontSize: 30,
    textAlign: "center",
    paddingHorizontal: 10,
    fontStyle: "italic",
    fontWeight: "bold",
    paddingVertical: 30,
    color: colores.primary,
  },
  subcontainer: {
    backgroundColor: colores.accent,
    flex: 1,
    borderRadius: 25,
  },
  image: {
    height: 205,
    width: 400,
  },
  subcontainer_text_header: {
    fontSize: 30,
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 30,
    color: colores.text_primary,
  },
  subcontainer_text: {
    color: colores.text_primary,
    fontSize: 20,
    textAlign: "center",
  },
  icono: {
    height: 150,
    width: 150,
    tintColor: colores.bg_primary,
  },
  subcontainer_children: {
    gap: 20,
    width: 400,
    alignItems: "center",
    backgroundColor: colores.accent,
    paddingBottom: 40,
  },
});
