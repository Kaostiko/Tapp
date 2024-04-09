import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TappContext } from "../context/TappContext";
import axios from "axios";
import colores from "../utils/colores";
import BotonCustomizado from "../components/BotonCustomizado";

export const Tickets = () => {
  const { user, isLogged } = useContext(TappContext);
  const user_id = user.user_id;
  // console.log(user_id, "USER ID");
  const [tickets, setTickets] = useState([]);
  const [reloadTickets, setReloadTickets] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.EXPO_PUBLIC_API_URL}/ticket/getTickets/${user_id}`)
      .then((res) => {
        // console.log("Respuesta del useEffect", res);
        setTickets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id, reloadTickets]);

  // Función para recargar los tickets
  const reloadTicketsHandler = () => {
    setReloadTickets((prevState) => !prevState); // Cambiar el estado de reloadTickets para forzar la recarga
  };

  // Para borrar los tickects:
  const deleteTicket = (ticket_id) => {
    axios
      .post(
        `${process.env.EXPO_PUBLIC_API_URL}/ticket/deleteTicket/${ticket_id}`
      )
      .then((res) => {
        // console.log("EL RESULTADO: ", res.data);
        // Recargar los tickets después de borrar uno
        setReloadTickets((prevState) => !prevState);
      })
      .catch((err) => {
        console.log("EEEEEEEEEEEROROOOOOOOOOO", err);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        {isLogged ? (
          <>
            <View style={styles.ticketsContainer}>
              <BotonCustomizado
                title={"Actualizar tickets"}
                customBackgroundColor={colores.accent}
                onPress={reloadTicketsHandler}
              />

              {tickets.map((ticket) => (
                <View key={ticket.ticket_id} style={styles.ticket}>
                  <View style={styles.datos}>
                    <Text>Supermercado: {ticket.supermercado}</Text>
                    <Text>Fecha: {ticket.date}</Text>
                    <Text>Total: {ticket.amount} €</Text>
                  </View>
                  <View>
                    <BotonCustomizado
                      title={"Borrar"}
                      customBackgroundColor={colores.primary}
                      onPress={() => deleteTicket(ticket.ticket_id)}
                    />
                    <BotonCustomizado
                      title={"Ver"}
                      customBackgroundColor={colores.accent}
                      onPress={() => {}}
                    />
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            <View style={styles.container}>
              <Text style={styles.textWaring}>
                Accede para poder ver tus tickets registrados.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  textWaring: {
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#263D5A",
    textAlign: "center",
    padding: 60,
  },
  datos: {
    justifyContent: "space-evenly",
  },
  ticketsContainer: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 10,
  },
  ticket: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: colores.accent,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
