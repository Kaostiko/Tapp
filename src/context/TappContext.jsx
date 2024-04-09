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
      if (token && userIdState) {
        try {
          const response = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/user/getOneUser/${userIdState}`
          );
          setUser(response.data);
        } catch (error) {
          if (error.response) {
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
      }
    };

    fetchData();
  }, [token, userIdState, user]);

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
        userIdState,
      }}
    >
      {children}
    </TappContext.Provider>
  );
};
