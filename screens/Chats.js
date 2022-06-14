import Clock from "../components/Clock";
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";

const Chats = () => {
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
};

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

export default Chats;
