import { LatLng } from "react-native-maps";
import * as Location from "expo-location";
import { OpenCageApiResponse } from "@/types/open-cage-api";

export function constructLatLngFromDestinationLocation(destinationLocation: Location.LocationObject | null): LatLng {
  if (!destinationLocation) {
    return { latitude: 0, longitude: 0 };
  }

  return {
    latitude: destinationLocation?.coords.latitude,
    longitude: destinationLocation?.coords.longitude,
  };
}

export function constructLocationObjectFromOpenCageAPI(openCageApi: OpenCageApiResponse):  Location.LocationObject {
    return {
      coords: {
        latitude: openCageApi.geometry.lat,
        longitude: openCageApi.geometry.lng,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: 0,
    };
}