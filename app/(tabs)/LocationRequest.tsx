import React, { useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const requestLocationPermissions = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();

  if (foregroundStatus !== 'granted' || backgroundStatus !== 'granted') {
    alert('Permission to access location was denied. You need to manually give permission to access location.');
  }
};

export default function LocationRequest() {
  useEffect(() => {
    requestLocationPermissions();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button title="Request Location Permissions" onPress={requestLocationPermissions} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});
