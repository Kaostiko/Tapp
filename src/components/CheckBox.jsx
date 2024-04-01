import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CheckBox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      {checked && <MaterialIcons name="check-box" size={24} color="#000" />}
      {!checked && (
        <MaterialIcons name="check-box-outline-blank" size={24} color="#000" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    width: 30,
    height: 30,
    // borderWidth: 1,
    // borderColor: "#000",
    // borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
});

export default CheckBox;
