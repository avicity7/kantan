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

const CreateEvent = () => {
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
});

export default CreateEvent;
