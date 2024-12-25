import { calculateDistanceBetweenUserAndDestination } from "./user-location-utilites";
import * as Location from "expo-location";

describe("UserLocationUtilities", () => {
  it("calculateDistanceBetweenUserAndDestination should return the distance between two locations in meters", () => {
    const vancouverLocation: Location.LocationObject = {
      coords: {
        latitude: 49.2827,
        longitude: -123.1207,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: 0,
    };

    const newyorkDestination: Location.LocationObject = {
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: 1,
    };

    const expectedDistance = 3914461.691;
    const marginOfError = 0.5
    const distance = calculateDistanceBetweenUserAndDestination(vancouverLocation, newyorkDestination);
    expect(distance).toBeGreaterThanOrEqual(expectedDistance - marginOfError);
    expect(distance).toBeLessThanOrEqual(expectedDistance + marginOfError);
  });
});
