import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Chats from "./screens/Chats";
import Scan from "./screens/ScanEvent";
import CreateEvent from "./screens/CreateEvent";
import ChatScreen from "./screens/ChatScreen";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Sora_400Regular,
  Sora_600SemiBold,
  Sora_700Bold,
} from "@expo-google-fonts/sora";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_600SemiBold,
    Sora_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <StatusBar hidden />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{
                title: "Chat 1",
                headerStyle: { backgroundColor: "#333" },
                headerTintColor: "#FFF",
                headerTitleStyle: { fontFamily: "Sora_400Regular" },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="Chats"
              options={{ headerShown: false }}
              component={Chats}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ScanEvent"
              component={Scan}
            />
            <Stack.Screen
              name="CreateEvent"
              options={{ headerShown: false }}
              component={CreateEvent}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
