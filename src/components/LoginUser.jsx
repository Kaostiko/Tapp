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
  const [showMsg, setShowMsg] = useState(false);

  const handleChange = (name, value) => {
    setInputLogin({ ...inputLogin, [name]: value });
  };

  const onSubmit = () => {
    if (!inputLogin.email || !inputLogin.password) {
      Alert.alert("Email o contraseña no pueden estar vacíos");
      setShowMsg(true);
      return;
    }
    axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/user/login`, inputLogin)
      .then((res) => {
        console.log("RESPUESTA", res);
        // console.log("DECODE TOKEN", res.data.token);
        setToken(res.data.token);
        // setUser(res.data.user);
        setUserisState(res.data.user.user_id);
        console.log("ID :", userIdState);
        setIsLogged(true);
        navigation.navigate("Perfil");
        // Guardar el token en Keychain
        // Keychain.setGenericPassword("token", res.data);
        // console.log("Ha guardado correctamente token.", res.data);
        // setIsLogged("Vuelvo a ponerlo en false################");
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      {login && (
        <View style={styles.modal}>
          <Text style={styles.title}>Accede a tu cuenta</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChange("email", text)}
              value={inputLogin.email}
              autoCompleteType="email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
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
          {showMsg && (
            <Text style={styles.errorText}>Email o contraseña incorrectos</Text>
          )}
          <Text style={styles.registerText}>
            ¿No estás registrado?{" "}
            <Pressable onPress={toggleScreen}>
              <Text style={styles.registerLink}>Date de alta</Text>
            </Pressable>
          </Text>
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
    backgroundColor: "#4F46E5",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 10,
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
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#4F46E5",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  registerText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 40,
  },
  registerLink: {
    color: "#fff",
    fontWeight: "bold",
  },
});
