import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Vibration,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Notifications from "expo-notifications";
import { widthPercentageToDP as screenWidthPercentage } from "react-native-responsive-screen";
import { registerForPushNotificationsAsync } from "@/utilities/notification/notification";

type NotificationButtonProps = {
  inDestinationLocation: boolean;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function NotificationButton(props: NotificationButtonProps) {
  const { inDestinationLocation } = props;

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

  useEffect(() => {
    if (inDestinationLocation) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Destination Alert",
          body: "You are about to arrive at your destination. Please prepare to exit.",
        },
        trigger: {
          seconds: 1,
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        },
      });
    }
  }, [inDestinationLocation]);

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
    <View style={styles.container}>
      {isVibrating ? (
        <View style={styles.notificationButtonContainer}>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => stopVibration()}
          >
            <Text style={styles.buttonText}>Stop Vibration</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
  },
  notificationButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    width: screenWidthPercentage("25%"),
    alignItems: "center",
  },
  buttonText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
});
