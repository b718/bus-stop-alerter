import * as Location from "expo-location";
import { getPreciseDistance } from 'geolib';

export async function getUserCurrentLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return;
  }

  const currentLocation = await Location.getCurrentPositionAsync({});
  return currentLocation;
}

export function calculateDistanceBetweenUserAndDestination(userLocation: Location.LocationObject, destinationLocation: Location.LocationObject) {
  const userCoordinates = {latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude};
  const destinationCoordinates = {latitude: destinationLocation.coords.latitude, longitude: destinationLocation.coords.longitude};
  const distanceBetweenUserAndDestination = getPreciseDistance(userCoordinates, destinationCoordinates)
  return distanceBetweenUserAndDestination;
}
