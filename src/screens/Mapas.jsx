import { Slider } from "@react-native-community/slider";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export const Mapas = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [distance, setDistance] = useState(5); // Inicializa la distancia en 5 km

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    // Aquí puedes realizar la búsqueda de lugares cercanos al lugar seleccionado con la distancia especificada
    searchNearbyPlaces(
      place.details.geometry.location.lat,
      place.details.geometry.location.lng
    );
  };

  const searchNearbyPlaces = (latitude, longitude) => {
    // Realiza la búsqueda de lugares cercanos utilizando la API de Google Places con la distancia especificada
    // Asegúrate de incluir la distancia en los parámetros de búsqueda de la API
    console.log(
      `Search nearby places within ${distance} km of (${latitude}, ${longitude})`
    );
  };

  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Search for a school"
        onPress={(data, details = null) => {
          handlePlaceSelect({ data, details });
        }}
        fetchDetails={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        query={{
          key: "YOUR_GOOGLE_API_KEY",
          language: "en",
        }}
      />
      {selectedPlace && (
        <View>
          <Text>Place Name: {selectedPlace.details.name}</Text>
          <Text>Latitude: {selectedPlace.details.geometry.location.lat}</Text>
          <Text>Longitude: {selectedPlace.details.geometry.location.lng}</Text>
        </View>
      )}
      <View>
        <Text>Select Distance (km): {distance}</Text>
        <Slider
          minimumValue={1}
          maximumValue={50}
          step={1}
          value={distance}
          onValueChange={(value) => setDistance(value)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
