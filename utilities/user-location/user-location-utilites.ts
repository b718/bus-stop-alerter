import * as Location from "expo-location";
import { getPreciseDistance } from 'geolib';

export async function getUserCurrentLocation(setLocation: (location: Location.LocationObject) => void) {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  setLocation(location);
}

export function calculateDistanceBetweenUserAndDestination(userLocation: Location.LocationObject, destinationLocation: Location.LocationObject) {
  const userCoordinates = {latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude};
  const destinationCoordinates = {latitude: destinationLocation.coords.latitude, longitude: destinationLocation.coords.longitude};
  const distanceBetweenUserAndDestination = getPreciseDistance(userCoordinates, destinationCoordinates)
  return distanceBetweenUserAndDestination;
}
