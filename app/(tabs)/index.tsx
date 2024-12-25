import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getUserCurrentLocation } from "@/utilities/user-location/user-location-utilites";
import SearchMenu from "@/components/SearchMenu";
import { DestinationLocationContext } from "../_layout";
import { constructLatLngFromDestinationLocation } from "@/utilities/user-destination/user-destination-adapter";

export default function HomeScreen() {
  const {destinationLocation, setDestinationLocation} = useContext(DestinationLocationContext);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  useEffect(() => {getUserCurrentLocation(setLocation)}, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker coordinate={constructLatLngFromDestinationLocation(destinationLocation)}/>
        <SearchMenu />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
