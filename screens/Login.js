import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { KeyboardAvoidingView } from "react-native";

const Login = () => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style = {styles.normalText}>LoginScreen</Text>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#333",
  },

  normalText: { 
    color : "#fff",
    fontFamily : "Sora_400Regular",
  }
});
