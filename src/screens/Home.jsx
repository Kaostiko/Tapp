import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { Anadir } from "./Anadir";
import { useNavigation } from "@react-navigation/native";

export const Home = () => {
  const navigation = useNavigation(); //

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              paddingHorizontal: 10,
            }}
          >
            Lleva el control de tus gastos en supermercados.
          </Text>
          <Text
            style={{ fontSize: 30, textAlign: "center", paddingHorizontal: 10 }}
          >
            Compara precios y saca información de tus compras.{" "}
          </Text>
        </View>
        <View style={{ gap: 20, paddingVertical: 35 }}>
          <Image
            source={{
              uri: "https://financialfood.es/wp-content/uploads/2023/02/compra-supermercado-010223.jpg",
            }}
            style={{ height: 205, width: 400, borderColor: "red" }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              paddingHorizontal: 10,
              paddingBottom: 30,
            }}
          >
            Ten a mano siempre lo tickets y saca información de ellos
          </Text>
        </View>
        <View
          style={{
            gap: 20,
            paddingVertical: 35,
            backgroundColor: "#ACCBFF",
            width: 400,
            paddingHorizontal: 20,
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../../assets/icons/clouds.png")}
            style={{ height: 75, width: 75, borderColor: "#fff" }}
          />
          <Image
            source={require("../../assets/icons/rainy.png")}
            style={{ height: 75, width: 75, borderColor: "#fff" }}
          />
          <Image
            source={require("../../assets/icons/snow.png")}
            style={{ height: 75, width: 75, borderColor: "#fff" }}
          />
          <Image
            source={require("../../assets/icons/sunny.png")}
            style={{ height: 75, width: 75, borderColor: "#fff" }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              paddingHorizontal: 10,
              paddingVertical: 30,
            }}
          >
            ¿Cómo usar la aplicación?
          </Text>
        </View>
        <View
          style={{
            gap: 20,
            paddingVertical: 35,
            width: 400,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => navigation.navigate(Anadir)}>
            <Text style={{ fontSize: 20 }}>1-. Carga tu tickets</Text>
          </Pressable>
          <Image
            source={require("../../assets/icons/boleto.png")}
            style={{ height: 150, width: 150, borderColor: "#fff" }}
          />
          <Text style={{ fontSize: 20 }}>2-. Confirma los productos</Text>
          <Image
            source={require("../../assets/icons/verification.png")}
            style={{ height: 150, width: 150, borderColor: "#fff" }}
          />
          <Text style={{ fontSize: 20 }}>
            3-. Saca información de tus compras y ten a mano tus tickets
          </Text>
          <Image
            source={require("../../assets/icons/ahorros.png")}
            style={{ height: 150, width: 150, borderColor: "#fff" }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
