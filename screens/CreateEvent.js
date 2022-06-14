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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create an event</Text>
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
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Event name"
              placeholderTextColor="#AAA"
              style={styles.input}
              onChangeText={(text) => {
                setEventName(text);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => validateInput()}
            style={styles.buttonContainer}
            disabled={completed}
          >
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    display: "flex",
    alignItems: "center",
  },
  header: {
    paddingTop: 75.0,
    fontSize: 26.0,
    textAlign: "center",
    fontFamily: "Sora_700Bold",
    color: "#fff",
  },
  body: {
    marginHorizontal: 40.0,
    color: "#fff",
    textAlign: "center",
    fontFamily: "Sora_400Regular",
  },
  inputContainer: {
    width: "80%",
    backgroundColor: "#555",
    borderRadius: 25,
    padding: 10,
    marginTop: 20,
  },
  input: {
    fontFamily: "Sora_400Regular",
    color: "#fff",
  },
  buttonContainer: {
    height: 55,
    width: "60%",
    backgroundColor: "#6FB16D",
    borderRadius: 25,
    padding: 10,
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Sora_600SemiBold",
    color: "#fff",
    fontSize: 16,
  },
  qrCodeContainer: {
    marginVertical: 40,
    padding: 25,
    backgroundColor: "#fff",
  },
  code: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "Sora_700Bold",
  },
});

export default CreateEvent;
