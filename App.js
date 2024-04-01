import React from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Navigation } from "./src/components/Navigation";
import { TappContextProvider } from "./src/context/TappContext";

export default function App() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar />
      <TappContextProvider>
        <Navigation />
      </TappContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
});
