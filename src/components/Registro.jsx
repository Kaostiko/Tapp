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
import { TappContext } from "../context/TappContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export const Registro = ({ toggleScreen }) => {
  const { login } = useContext(TappContext);
  const navigation = useNavigation();
  const [inputRegister, setInputRegister] = useState({
    name_user: "",
    last_name: "",
    email: "",
    password: "",
    telephone: "",
    year_birth: "",
    gender: "",
  });

  const handleChange = (name, value) => {
    setInputRegister({ ...inputRegister, [name]: value });
  };

  const onSubmit = (e) => {
    console.log("INPUTTTTTTTTTTTTTTT", inputRegister);
    e.preventDefault();
    console.log("Justo antes del axios");
    axios
      .post(
        `${process.env.EXPO_PUBLIC_API_URL}/user/registerUser`,
        inputRegister
      )
      .then((res) => {
        console.log("RESPUESTA CORRECTA", res);
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
            placeholderTextColor="white"
            value={inputRegister.name_user}
            onChangeText={(text) => handleChange("name_user", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor="white"
            value={inputRegister.last_name}
            onChangeText={(text) => handleChange("last_name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="white"
            value={inputRegister.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="white"
            secureTextEntry={true}
            value={inputRegister.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            placeholderTextColor="white"
            value={inputRegister.telephone}
            onChangeText={(text) => handleChange("telephone", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Año de nacimiento"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={inputRegister.year_birth}
            onChangeText={(text) => handleChange("year_birth", text)}
          />
          <View style={styles.radioContainer}>
            <Text>Género:</Text>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleChange("gender", "M")}
            >
              <Text style={styles.radioText}>Hombre</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleChange("gender", "F")}
            >
              <Text style={styles.radioText}>Mujer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleChange("gender", "Otro")}
            >
              <Text style={styles.radioText}>Otro</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>ACEPTAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>CERRAR</Text>
          </TouchableOpacity>
        </View>
        <Pressable onPress={toggleScreen}>
          <Text style={styles.loginText}>
            ¿Ya tienes cuenta? <Text style={styles.loginLink}>Entra</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4F46E5",
    /* margin: 20, */
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: "80%",
    color: "white",
  },
  formContainer: {
    width: "90%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    fontStyle: "italic",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    color: "white",
  },
  radioButton: {
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  radioText: {
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
  },
  loginLink: {
    color: "white",
    fontWeight: "bold",
  },
});
