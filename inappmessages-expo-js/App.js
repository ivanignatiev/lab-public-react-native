import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { TouchableOpacity } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body with random number ' + (Math.random().toString()) + ' !',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

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
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const UIContext = createContext({});

const UIProvider = ({
  children,
}) => {
  const [notification, setNotification] = useState(false);
  const [notificationVisibility, setNotificationVisibility] = useState(false);

  const [error, setError] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);

  

  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      setNotificationVisibility(true);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <UIContext.Provider value={{
      expoPushToken,
      notification,
      notificationVisibility,
      setNotification,
      setNotificationVisibility,
      setError,
    }}>
      {notification && notificationVisibility && (
        <TouchableOpacity onPress={() => {
          setNotificationVisibility(false);
        }} style={{ 
          position: 'absolute', 
          top: 50, 
          left: 30, 
          right: 30, 
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#000000',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <View>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}>{notification.request.content.title}</Text>
          <Text style={{
            fontSize: 14,
          }}>{notification.request.content.body}</Text>
        </View>
        </TouchableOpacity>
      )}

      {error && errorVisibility && (
        <TouchableOpacity onPress={() => {
          setErrorVisibility(false);
        }} style={{ 
          position: 'absolute', 
          top: 50, 
          left: 30, 
          right: 30, 
          backgroundColor: '#FBEDEB',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#000000',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <View>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000000',
          }}>{error.title}</Text>
          <Text style={{
            fontSize: 14,
            color: '#000000',
          }}>{error.body}</Text>
        </View>
        </TouchableOpacity>
      )}
      {children}
    </UIContext.Provider>
  );
};

const NotificationScreen = () => {
  const {
    expoPushToken,
    notification,
    notificationVisibility,
    setNotification,
    setNotificationVisibility,
    setError,
  } = useContext(UIContext);

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {notification && notification.request.content.title} </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
        <Button
          title="Press to Show Error"
          onPress={async () => {
            await setError({
              title: 'Error Title',
              body: 'Error Body',
            })
          }}
        />
      </View>
  );
}

export default function App() {

  return (
    <UIProvider>
      <NotificationScreen/>
    </UIProvider>
  );
}