import { TouchableOpacity, Text, StyleSheet } from "react-native";
import globalStyles from "../styles/globalStyles";

const Button = ({ text, onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonContainer}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 55,
    width: "60%",
    backgroundColor: "#6FB16D",
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    ...globalStyles.bold,
    fontSize: 16,
  },
});

export default Button;
