import { StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import globalStyles from "../styles/globalStyles";
import Button from "../components/Button";
import Input from "../components/Input";
let userEmail;
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Chats");
      }
    });

    return unsubscribed;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        userEmail = user.email;
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView style={globalStyles.container}>
      <Text style={styles.titleText}>Welcome!</Text>
      <Text style={styles.infoText}>
        Login using your given account details.
      </Text>
      <Input placeholder="email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button text="Log in" onPress={handleLogin} />
    </KeyboardAvoidingView>
  );
};

export { Login, userEmail };

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30.0,
    ...globalStyles.bold,
    color: "#6FB16D",
  },
  infoText: {
    marginTop: 10,
    marginBottom: 20,
    ...globalStyles.regular,
  },
});
