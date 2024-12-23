import * as Location from "expo-location";

export async function getUserCurrentLocation(setLocation: (location: Location.LocationObject) => void) {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  setLocation(location);
}
