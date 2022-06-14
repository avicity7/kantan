import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import moment from "moment";
import {
  useFonts,
  Sora_400Regular,
  Sora_600SemiBold,
  Sora_700Bold,
} from "@expo-google-fonts/sora";
import Clock from "../components/Clock";
let momentMonthName = moment().format("MMMM");
let date = new Date().getDate();
let year = new Date().getFullYear();
let day = new Date().getDay();
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.normalDate}>
            {date} {momentMonthName} {year}
          </Text>
          <Clock />
          <Text style={styles.normalDate}>{days[day - 1]}</Text>
        </View>

        <View style={styles.chatContainer}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  dateContainer: {
    paddingTop: 75,
    alignItems: "center",
    alignContent: "center",
  },
  normalDate: {
    fontSize: 35,
    color: "#fff",
    fontFamily: "Sora_400Regular",
  },
  chatContainer: {
    backgroundColor: "#333",
    flex: 1,
    margin: 0,
    marginTop: 20,
  },
});
