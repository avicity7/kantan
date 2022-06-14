import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CreateEvent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create an event</Text>
      <Text style={styles.body}>
        You will get to select individuals involved in this event and send a
        notice after this step.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Event name"
          placeholderTextColor="#AAA"
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
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
    width: "60%",
    backgroundColor: "#6FB16D",
    borderRadius: 25,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Sora_600SemiBold",
    color: "#fff",
    fontSize: 16,
  },
});

export default CreateEvent;
