import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// Crear el contexto
export const TappContext = createContext();

// Componente proveedor del contexto
export const TappContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false); //usuario registrado
  const [login, setLogin] = useState(true); // Screen login o register
  const [userIdState, setUserisState] = useState("");
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la consulta al servidor para obtener los datos del usuario
        const response = await axios.get(
          `http://192.168.1.120:4000/user/getOneUser/${userIdState}`
        );
        setUser(response.data); // Establecer los datos del usuario en el estado
      } catch (error) {
        if (error.response) {
          // El servidor respondió con un código de estado fuera del rango 2xx
          console.log(
            "Error al obtener los datos del usuario. Código de estado:",
            error.response.status
          );
          console.log("Mensaje de error:", error.response.data);
        } else if (error.request) {
          // La solicitud fue realizada, pero no se recibió respuesta
          if (userIdState) {
            console.log("Error al realizar la solicitud:", error.request);
          } else {
            console.log("El usuario no está registrado.");
          }
        } else {
          // Ocurrió un error al configurar la solicitud
          console.log("Error:", error.message);
        }
      }
    };

    fetchData();
  }, [token, userIdState]);

  return (
    <TappContext.Provider
      value={{
        setIsLogged,
        isLogged,
        setLogin,
        login,
        setUserisState,
        setUser,
        user,
        setToken,
        token,
      }}
    >
      {children}
    </TappContext.Provider>
  );
};
