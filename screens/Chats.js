import Clock from "../components/Clock";
import moment from "moment";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const Chats = () => {
  const navigation = useNavigation();
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

      <View style={styles.chatContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChatScreen")}
          style={styles.chatButton}
        >
          <View style={styles.circle}></View>
          <Text style={styles.chatTitle}>Chat 1</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabRectangle}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Chats")}
            style={styles.chatIcon}
          >
            <Icon name="chat" color="#6FB16D" size={30} />
            <Text style={{ color: "#6FB16D", fontFamily: "Sora_400Regular" }}>
              Chats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ScanEvent")}
            style={styles.eventIcon}
          >
            <Icon name="group" color="#999" size={35} />
            <Text
              style={{
                color: "#999",
                fontFamily: "Sora_400Regular",
                marginTop: -2,
              }}
            >
              Event
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calendarIcon}>
            <Icon name="event" color="#999" size={30} />
            <Text style={{ color: "#999", fontFamily: "Sora_400Regular" }}>
              Calendar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 33.5,
  },
  normalDate: {
    fontSize: 35,
    color: "#fff",
    fontFamily: "Sora_400Regular",
  },
  chatContainer: {
    backgroundColor: "#363636",
    flex: 1,
    margin: 0,
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "black",
    shadowOpacity: "80%",
    shadowRadius: 30,
  },
  chatButton: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 25,
    borderBottomWidth: 1,
    borderColor: "#999",
  },
  chatTitle: {
    color: "white",
    fontFamily: "Sora_600SemiBold",
    fontSize: 16,
    marginTop: -35,
    marginLeft: -5,
  },
  circle: {
    backgroundColor: "#CCC",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  tabRectangle: {
    backgroundColor: "#393939",
    width: "100%",
    height: 70,
    alignItems: "center",
    borderRadius: 10,
  },
  tabContainer: {
    width: "75%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
  },
  eventIcon: {
    marginRight: -12,
    marginTop: -3,
  },
  calendarIcon: {
    marginRight: -10,
  },
});

export default Chats;
