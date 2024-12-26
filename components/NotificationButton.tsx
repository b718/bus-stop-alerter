import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  Vibration,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Notifications from "expo-notifications";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { registerForPushNotificationsAsync } from "@/utilities/notification/notification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function NotificationButton() {
  const [isVibrating, setIsVibrating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync();

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Received notification:", notification);
        triggerCallVibration();
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification opened:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

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
        <Button
          title="Send Local Notification"
          onPress={async () => {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "MY KING",
                body: "BRYAN",
              },
              trigger: {
                seconds: 1,
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
              },
            });
          }}
        />
        <Separator />
        {isVibrating && <View style={styles.notificationButtonContainer}>
          <TouchableOpacity
            style={styles.stopButton}
            onPress={() => stopVibration()}
          >
            <Text style={styles.buttonText}>Stop Vibration</Text>
          </TouchableOpacity>
        </View>}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const Separator = () => {
  return <View style={Platform.OS === "android" ? styles.separator : null} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 44,
    padding: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  notificationButtonContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  stopButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
});
