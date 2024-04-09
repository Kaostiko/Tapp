/* import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CheckBox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      {checked && (
        <Text>
          {" "}
          <MaterialIcons name="check-box" size={24} color="#000" />
        </Text>
      )}
      {!checked && (
        <Text>
          <MaterialIcons
            name="check-box-outline-blank"
            size={24}
            color="#000"
          />
        </Text>
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
 */

import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function MyCheckbox({ onPress, checked }) {
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onPress}
    >
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
}

// export default function App() {
//   return (
//     <View style={styles.appContainer}>
//       <Text style={styles.appTitle}>Checkbox Example</Text>
//       <View style={styles.checkboxContainer}>
//         <MyCheckbox />
//         <Text style={styles.checkboxLabel}>{`⬅️ Click!`}</Text>
//       </View>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "coral",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "coral",
  },
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    marginVertical: 16,
    fontWeight: "bold",
    fontSize: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 18,
  },
});
