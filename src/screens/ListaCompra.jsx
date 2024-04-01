import CheckBox from "../components/CheckBox";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";

export const ListaCompra = () => {
  const [newItem, setNewItem] = useState("");
  const [section, setSection] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  const addItem = () => {
    if (newItem.trim() !== "") {
      setShoppingList([
        ...shoppingList,
        { name: newItem, section: section, bought: false },
      ]);
      setNewItem("");
      setSection("");
    }
  };

  const toggleBought = (index) => {
    const newList = [...shoppingList];
    newList[index].bought = !newList[index].bought;
    setShoppingList(newList);
  };

  const CleanUp = () => {
    setShoppingList([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <TextInput
        style={styles.input}
        placeholder="Nuevo ítem"
        value={newItem}
        onChangeText={(text) => setNewItem(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sección"
        value={section}
        onChangeText={(text) => setSection(text)}
      />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Button title="Añadir" onPress={addItem} />
        <Button title="COMPRADO" onPress={CleanUp} />
      </View>
      <FlatList
        data={shoppingList}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <CheckBox
              checked={item.bought}
              onPress={() => toggleBought(index)}
            />
            <Text
              style={[styles.itemText, item.bought && styles.strikeThrough]}
            >
              {item.name} - {item.section}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    // borderWidth: 1,
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
    // padding: 10,
    // backgroundColor: "red",
  },
  itemText: {
    marginLeft: 10,
  },
  strikeThrough: {
    textDecorationLine: "line-through",
  },
});
