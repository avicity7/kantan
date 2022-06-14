import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.titleText}>Welcome!</Text>
      <Text style={styles.infoText}>
        Login using your given account details.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          placeholderTextColor="#AAA"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="password"
          placeholderTextColor="#AAA"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },

  titleText: {
    color: "#6FB16D",
    fontFamily: "Sora_600SemiBold",
    fontSize: 30,
  },

  infoText: {
    color: "#fff",
    fontFamily: "Sora_400Regular",
    fontSize: 18.4,
    marginTop: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
  },

  inputContainer: {
    width: "80%",
    backgroundColor: "#555",
    borderRadius: 25,
    padding: 10,
    marginTop: 15,
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
