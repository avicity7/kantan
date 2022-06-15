import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import "react-native-get-random-values";
import { customAlphabet } from "nanoid/non-secure";
import { useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { auth, database } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import globalStyles from "../styles/globalStyles";
import Input from "../components/Input";
import Button from "../components/Button";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";

const CreateEvent = () => {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState("");
  const [completed, setCompleted] = useState(false);
  const [code, setCode] = useState(null);

  const validateInput = () => {
    if (eventName === "") {
      Alert.alert(
        "Invalid name",
        "The name for the event is not valid. Please try again."
      );
    } else {
      setCompleted(true);
    }
  };

  const generateCode = () => {
    const code = customAlphabet("123456789abcdefghijkmnpqrstuvwxyz", 7);
    return code().toUpperCase();
  };

  useEffect(() => {
    if (completed) {
      const code = generateCode();
      setCode(code);
    }
  }, [completed]);

  useEffect(() => {
    const addToDatabase = async () => {
      try {
        await setDoc(doc(database, "events", code), {
          id: code,
          name: eventName,
          owner: auth.currentUser.uid,
          users: [],
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    if (code !== null) {
      addToDatabase();
    }
  }, [code]);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Create an event</Text>
      <Text style={styles.body}>
        {code !== null
          ? "Send this QR code or the code ID below to the individuals involved in this event."
          : "You will get to select individuals involved in this event and send a notice after this step."}
      </Text>

      {code !== null ? (
        <>
          <View style={styles.qrCodeContainer}>
            <QRCode value={code} size={225} />
          </View>
          <Text style={styles.code}>{code}</Text>
        </>
      ) : (
        <>
          <Input placeholder="Event name" onChangeText={setEventName} />
          <Button
            text="Create event"
            onPress={() => validateInput()}
            disabled={completed}
          />
        </>
      )}

      <View style={styles.tabRectangle}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Chats")}
            style={styles.chatIcon}
          >
            <Icon name="chat" color="#999" size={30} />
            <Text style={{ color: "#999", fontFamily: "Sora_400Regular" }}>
              Chats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ScanEvent")}
            style={styles.eventIcon}
          >
            <Icon name="group" color="#6FB16D" size={35} />
            <Text
              style={{
                color: "#6FB16D",
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
  body: {
    marginHorizontal: 40.0,
    ...globalStyles.regular,
  },
  qrCodeContainer: {
    marginVertical: 40,
    padding: 25,
    backgroundColor: "#fff",
  },
  code: {
    ...globalStyles.bold,
    fontSize: 32,
  },
  tabRectangle: {
    backgroundColor: "#393939",
    width: "100%",
    height: 70,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: -200,
    marginTop: 290,
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

export default CreateEvent;
