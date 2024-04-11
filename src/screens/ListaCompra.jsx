import CheckBox, { MyCheckbox } from "../components/CheckBox";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { TappContext } from "../context/TappContext";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import colores from "../utils/colores";
import BotonCustomizado from "../components/BotonCustomizado";

export const ListaCompra = () => {
  const [newItem, setNewItem] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const { isLogged, user } = useContext(TappContext);
  const { user_id } = user;

  useEffect(() => {
    fetchShoppingList();
  }, [user_id]);

  const addItem = async () => {
    // Verificar si el campo de nuevo artículo está vacío
    if (!newItem.trim()) {
      Alert.alert("El campo de artículo está vacío.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/listacompra/addProduct/${user_id}`,
        {
          name: newItem,
          bought: false,
        }
      );
      setNewItem("");
      await fetchShoppingList();
    } catch (error) {
      console.error("Error al enviar datos al backend:", error);
      // Manejar el error y mostrar un mensaje al usuario si es necesario
      Alert.alert(
        "Error al enviar datos al backend. Por favor, intenta de nuevo."
      );
    }
  };

  const fetchShoppingList = async () => {
    try {
      if (!user_id) {
        // No hay usuario, por lo que no hacemos nada
        return;
      }
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/listacompra/getLista/${user_id}`
      );
      const fetchedShoppingList = response.data;
      const checkedItemsArray = fetchedShoppingList.map(
        (item) => item.bought === 1
      );
      setCheckedItems(checkedItemsArray);
      setShoppingList(fetchedShoppingList);
    } catch (error) {
      console.error("Error al obtener la lista de compras:", error);
    }
  };

  const toggleBought = async (index) => {
    const newList = [...checkedItems];
    newList[index] = !newList[index];
    setCheckedItems(newList);

    try {
      const productId = shoppingList[index].shopping_list_id;
      const newBoughtState = newList[index];

      // Determinar la URL del endpoint según el nuevo estado del producto
      const endpoint = newBoughtState
        ? `${process.env.EXPO_PUBLIC_API_URL}/listacompra/checkProduct/${productId}`
        : `${process.env.EXPO_PUBLIC_API_URL}/listacompra/uncheckProduct/${productId}`;

      console.log(endpoint);
      // Enviar solicitud al endpoint correspondiente
      const response = await axios.put(endpoint, { bought: newBoughtState });
      console.log("Producto actualizado en el backend:", response.data);
    } catch (error) {
      console.error("Error al actualizar producto en el backend:", error);
    }
  };

  const CleanUp = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/listacompra/cleanList/${user_id}`
      );
      // console.log("Lista eliminada en el backend:", response.data);
      setShoppingList([]);
      setCheckedItems([]);
    } catch (error) {
      console.error("Error al eliminar lista en el backend:", error);
    }
  };

  return (
    <View style={styles.container}>
      {isLogged ? (
        <>
          <Text style={styles.title}>Lista de Compras</Text>
          <TextInput
            style={styles.input}
            placeholder="Artículo para comprar"
            placeholderTextColor={colores.accent}
            value={newItem}
            onChangeText={(text) => setNewItem(text)}
          />
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
            <BotonCustomizado
              title={"AÑADIR"}
              customBackgroundColor={colores.accent}
              onPress={addItem}
            />
            <BotonCustomizado
              title={"BORRAR LISTA"}
              customBackgroundColor={colores.primary}
              onPress={CleanUp}
            />
          </View>
          <FlatList
            data={shoppingList}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <Pressable
                  style={[
                    styles.checkboxBase,
                    checkedItems[index] && styles.checkboxChecked,
                  ]}
                  onPress={() => toggleBought(index)}
                >
                  {checkedItems[index] && (
                    <Ionicons name="checkmark" size={18} color="white" />
                  )}
                </Pressable>
                <Text
                  style={[
                    styles.itemText,
                    checkedItems[index] && styles.strikeThrough,
                  ]}
                >
                  {item.name}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.textWaring}>
              Accede para poder crear listas de compra compartidas.
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 25,
    color: colores.primary,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: colores.accent,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontStyle: "italic",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    margin: 5,
  },
  itemText: {
    marginLeft: 10,
  },
  strikeThrough: {
    textDecorationLine: "line-through",
  },
  textWaring: {
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
    color: colores.primary,
    textAlign: "center",
    padding: 60,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colores.accent,
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: colores.accent,
  },
  boton: {
    backgroundColor: "red",
    color: "red",
  },
});
