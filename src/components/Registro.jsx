import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import axios from "axios";
import colores from "../utils/colores";

export const Registro = ({ toggleScreen }) => {
  const [inputRegister, setInputRegister] = useState({
    name_user: "",
    last_name: "",
    email: "",
    password: "",
    telephone: "",
    year_birth: "",
    gender: "",
  });

  const [selectedGender, setSelectedGender] = useState(""); // Estado para el género seleccionado

  const handleChange = (name, value) => {
    setInputRegister({ ...inputRegister, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.EXPO_PUBLIC_API_URL}/user/registerUser`,
        inputRegister
      )
      .then((res) => {
        setInputRegister("");
        toggleScreen();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor={colores.accent}
            value={inputRegister.name_user}
            onChangeText={(text) => handleChange("name_user", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor={colores.accent}
            value={inputRegister.last_name}
            onChangeText={(text) => handleChange("last_name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colores.accent}
            value={inputRegister.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor={colores.accent}
            secureTextEntry={true}
            value={inputRegister.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            placeholderTextColor={colores.accent}
            value={inputRegister.telephone}
            onChangeText={(text) => handleChange("telephone", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Año de nacimiento"
            placeholderTextColor={colores.accent}
            keyboardType="numeric"
            value={inputRegister.year_birth}
            onChangeText={(text) => handleChange("year_birth", text)}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Género:</Text>
            <TouchableOpacity
              style={[
                styles.radioButton,
                selectedGender === "M" && styles.selectedButton,
              ]}
              onPress={() => {
                handleChange("gender", "M");
                setSelectedGender("M");
              }}
            >
              <Text
                style={[
                  styles.radioText,
                  selectedGender === "M" && styles.selectedText,
                ]}
              >
                Hombre
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                selectedGender === "F" && styles.selectedButton,
              ]}
              onPress={() => {
                handleChange("gender", "F");
                setSelectedGender("F");
              }}
            >
              <Text
                style={[
                  styles.radioText,
                  selectedGender === "F" && styles.selectedText,
                ]}
              >
                Mujer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                selectedGender === "Otro" && styles.selectedButton,
              ]}
              onPress={() => {
                handleChange("gender", "Otro");
                setSelectedGender("Otro");
              }}
            >
              <Text
                style={[
                  styles.radioText,
                  selectedGender === "Otro" && styles.selectedText,
                ]}
              >
                Otro
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>ACEPTAR</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 40,
            alignItems: "center",
          }}
        >
          <Pressable onPress={toggleScreen}>
            <Text style={styles.loginText}>
              ¿Ya tienes cuenta? <Text style={styles.loginLink}>Entra</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colores.accent,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    color: "white",
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    paddingVertical: 8,
    backgroundColor: colores.bg_primary,
    fontStyle: "italic",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  radioButton: {
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  selectedButton: {
    backgroundColor: colores.bg_primary,
    borderColor: colores.bg_primary,
  },
  radioText: {
    color: colores.text_primary,
  },
  selectedText: {
    color: colores.accent,
  },
  radioLabel: {
    color: colores.text_primary,
    marginRight: 5,
  },

  button: {
    backgroundColor: colores.bg_primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: colores.accent,
    fontWeight: "bold",
  },
  loginText: {
    color: colores.text_primary,
  },
  loginLink: {
    color: colores.text_primary,
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
