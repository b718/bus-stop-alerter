import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Button, Platform, Vibration, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function HomeScreen() {
  const [isVibrating, setIsVibrating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync();

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Call Notification',
        body: 'This simulates a call-like vibration.',
      },
      trigger: {
        seconds: 1,
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      },
    });

    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Received notification:', notification);
      triggerCallVibration();
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification opened:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [1000, 1000], 
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  const triggerCallVibration = () => {
    const VIBRATION_INTERVAL = 500;

    if (!isVibrating) {
      intervalRef.current = setInterval(() => {
        Vibration.vibrate(VIBRATION_INTERVAL);
      }, VIBRATION_INTERVAL);
      setIsVibrating(true);
    }
  };

  const stopVibration = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      Vibration.cancel();
      setIsVibrating(false);
    }
  };

  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.header, styles.paragraph]}>Expo Push Notifications Demo</Text>
        <Button
          title="Send Local Notification"
          onPress={async () => {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: 'Call Notification',
                body: 'This simulates a call-like vibration.',
              },
              trigger: {
                seconds: 1,
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
              },
            });
          }}
        />
        <Separator />
        <Button
          title="Stop Vibration"
          onPress={() => stopVibration()}
          color="#FF0000"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const Separator = () => {
  return <View style={Platform.OS === 'android' ? styles.separator : null} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 44,
    padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
