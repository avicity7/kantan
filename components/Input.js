import { View, TextInput, StyleSheet } from "react-native";
import globalStyles from "../styles/globalStyles";

const Input = ({ placeholder, secureTextEntry, value, onChangeText }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#AAA"
        style={styles.input}
        secureTextEntry={secureTextEntry && secureTextEntry}
        value={value}
        onChangeText={(text) => onChangeText(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
    backgroundColor: "#555",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
  },

  input: {
    ...globalStyles.regular,
    textAlign: "left",
  },
});

export default Input;
