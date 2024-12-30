import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import {
  calculateDistanceBetweenUserAndDestination,
  getUserCurrentLocation,
} from "@/utilities/user-location/user-location-utilites";
import SearchMenu from "@/components/SearchMenu";
import { DestinationLocationContext } from "../_layout";
import { constructLatLngFromDestinationLocation } from "@/utilities/user-destination/user-destination-adapter";
import NotificationButton from "@/components/NotificationButton";

export default function HomeScreen() {
  const { destinationLocation } = useContext(DestinationLocationContext);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [inDestinationLocation, setInDestinationLocation] =
    useState<boolean>(false);
  useEffect(() => {
    getUserCurrentLocation(setLocation);
  }, []);
  useEffect(() => {
    if (location && destinationLocation) {
      const inDestinationLocation = 1000;
      const inDestinationLocationRange = setInterval(() => {
        if (
          calculateDistanceBetweenUserAndDestination(
            location,
            destinationLocation
          ) < inDestinationLocation
        ) {
          setInDestinationLocation(true);
        }
      }, 1000);
      return () => clearInterval(inDestinationLocationRange);
    }
  }, [destinationLocation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker coordinate={constructLatLngFromDestinationLocation(destinationLocation)}>
          <Image 
            source={require("../../assets/images/red_arrow.png")}
            style={styles.markerImage}
          />
        </Marker>
        <Circle
            center = {constructLatLngFromDestinationLocation(destinationLocation)}
            radius = { 500 } //This is the user hyperparameter that can be changed to make bigger radius
            strokeWidth = { 1 }
            strokeColor = { '#e205ff' }
            fillColor = { 'rgba(239,176,247,0.5)' }
        />
        <SearchMenu />
        <Marker
          coordinate={constructLatLngFromDestinationLocation(
            destinationLocation
          )}
        />
      </MapView>
      <NotificationButton inDestinationLocation={inDestinationLocation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  markerImage: {
    width: 50,
    height: 50
  }
});
