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

export const Tickets = () => {
  const { user, isLogged } = useContext(TappContext);
  const user_id = user.user_id;
  // console.log(user_id, "USER ID");
  const [tickets, setTickets] = useState([]);
  const [reloadTickets, setReloadTickets] = useState(false);

  useEffect(() => {
    axios
      .get(`http://192.168.1.120:4000/ticket/getTickets/${user_id}`)
      .then((res) => {
        setTickets(res.data);
        // console.log(tickets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reloadTickets]);

  // Función para recargar los tickets
  const reloadTicketsHandler = () => {
    setReloadTickets((prevState) => !prevState); // Cambiar el estado de reloadTickets para forzar la recarga
  };

  // Para borrar los tickects:
  const deleteTicket = (ticket_id) => {
    axios
      .post(`http://192.168.1.120:4000/ticket/deleteTicket/${ticket_id}`)
      .then((res) => {
        console.log("EL RESULTADO: ", res.data);
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
              <Pressable
                style={styles.botonUpdate}
                onPress={reloadTicketsHandler}
              >
                <Text style={styles.buttonText}>Actualizar tickets</Text>
              </Pressable>
              {tickets.map((ticket) => (
                <View key={ticket.ticket_id} style={styles.ticket}>
                  <View>
                    <Text>Supermercado: {ticket.supermercado}</Text>
                    <Text>Fecha: {ticket.date}</Text>
                    <Text>Total: {ticket.amount} €</Text>
                  </View>
                  <Pressable
                    style={styles.botonDelete}
                    onPress={() => deleteTicket(ticket.ticket_id)}
                  >
                    <Text style={styles.buttonText}>Borrar</Text>
                  </Pressable>
                  <Pressable style={styles.botonUpdate}>
                    <Text style={styles.buttonText}>Ver</Text>
                  </Pressable>
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
    // backgroundColor: "yellow",
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
  ticketsContainer: {
    flex: 1,
    // backgroundColor: "red",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  ticket: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botonUpdate: {
    backgroundColor: "blue",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  botonDelete: {
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    margin: 10,
    color: "white",
    fontWeight: "bold",
  },
});
