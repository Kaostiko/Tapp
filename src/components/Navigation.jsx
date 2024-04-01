import React, { useContext } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import { Home } from "../screens/Home";
import { Anadir } from "../screens/Anadir";
import { Estadisticas } from "../screens/Estadisticas";
import { ListaCompra } from "../screens/ListaCompra";
import { Acceso } from "../screens/Acceso";
import { Profile } from "../screens/user/Profile";
import { TappContext } from "../context/TappContext";
import { Mapas } from "../screens/Mapas";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const { token } = useContext(TappContext);

  return (
    <Tab.Navigator
      screenOptions={{
        style: { borderTopWidth: 0 },
        tabBarStyle: {
          justifyContent: "center",
          alignItems: "center",
          height: 60,
        },
      }}
    >
      <Tab.Screen
        key="Home"
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/icons/hogar.png")}
              style={{ width: size, height: size, tintColor: "#4F46E5" }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Estadísticas"
        component={Estadisticas}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/icons/estadisticas.png")}
              style={{ width: size, height: size, tintColor: "#4F46E5" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Anadir"
        component={Anadir}
        options={{
          tabBarLabel: "Añadir",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/icons/mas.png")}
              style={{
                width: size,
                height: size,
                tintColor: "#4F46E5",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cesta"
        component={ListaCompra}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/icons/carrito.png")}
              style={{ width: size, height: size, tintColor: "#4F46E5" }}
            />
          ),
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
     name="Mapas"
     component={Mapas}
     options={{
       tabBarIcon: ({ color, size }) => (
         <Image
           source={require("../../assets/icons/carrito.png")}
           style={{ width: size, height: size, tintColor: "#4F46E5" }}
         />
       ),
     }}
   /> */}
      {!token ? (
        <Tab.Screen
          key="Acceso"
          name="Acceso"
          component={Acceso}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../../assets/icons/perfil.png")}
                style={{ width: size, height: size, tintColor: "#4F46E5" }}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          key="Perfil"
          name="Perfil"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../../assets/images/artist8.jpg")}
                style={{ width: size, height: size, borderRadius: 50 }}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

export const Navigation = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};
