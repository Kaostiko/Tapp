import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { TappContext } from "../context/TappContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import colores from "../utils/colores";
import BotonCustomizado from "./BotonCustomizado";

export const LoginUser = ({ toggleScreen }) => {
  const navigation = useNavigation();
  const {
    setIsLogged,
    setLogin,
    login,
    setUserisState,
    setToken,
    userIdState,
  } = useContext(TappContext);

  const openRegister = () => {
    setLogin(false);
  };

  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setInputLogin({ ...inputLogin, [name]: value });
  };

  const onSubmit = () => {
    if (!inputLogin.email || !inputLogin.password) {
      Alert.alert("Email o contraseña no pueden estar vacíos");
      return;
    }
    axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/user/login`, inputLogin)
      .then((res) => {
        setToken(res.data.token);
        setUserisState(res.data.user.user_id);
        setIsLogged(true);
        navigation.navigate("Perfil");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          Alert.alert("Email o contraseña no válidos");
        } else {
          console.log(err);
          Alert.alert("Ha ocurrido un error. Por favor, intenta de nuevo.");
        }
      });
  };

  return (
    <View style={styles.container}>
      {login && (
        <View style={styles.modal}>
          <Text style={styles.title}>Accede a tu cuenta</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colores.accent}
              onChangeText={(text) => handleChange("email", text)}
              value={inputLogin.email}
              autoCompleteType="email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor={colores.accent}
              onChangeText={(text) => handleChange("password", text)}
              value={inputLogin.password}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonText}>ACEPTAR</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 40,
            }}
          >
            <Pressable
              onPress={toggleScreen}
              style={{ justifyContent: "center" }}
            >
              <Text style={styles.registerText}>
                ¿No estás registrado?{" "}
                <Text style={styles.registerLink}>Date de alta</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: colores.accent,
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: colores.text_primary,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: colores.bg_primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: colores.accent,
    fontWeight: "bold",
  },
  registerText: {
    color: colores.text_primary,
  },
  registerLink: {
    color: colores.text_primary,
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
