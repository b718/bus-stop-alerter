import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
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
      const inDestinationLocation = 1000000;
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
    paddingTop: 44,
    padding: 8,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
