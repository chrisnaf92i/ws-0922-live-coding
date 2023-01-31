import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import * as Notifications from "expo-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { usePushNotifications } from "./push-notifications";
import { View, Text } from "./components/Themed";

const GRAPHQL_API_URL = Constants?.expoConfig?.extra?.GRAPHQL_API_URL;

const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const { notification } = usePushNotifications();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text>
                Title: {notification && notification.request.content.title}{" "}
              </Text>
              <Text>
                Body: {notification && notification.request.content.body}
              </Text>
              <Text>
                Data:{" "}
                {notification &&
                  JSON.stringify(notification.request.content.data)}
              </Text>
            </View>
          </View>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
