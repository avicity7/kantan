import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Icon } from "react-native-elements";


const Scan = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [hasScanned, setHasScanned] = useState(false);

  const onScanned = ({ type, data }) => {
    setHasScanned(true);
    console.log(type, data);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scan the QR Code</Text>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={hasScanned ? undefined : onScanned}
          barCodeTypes={["qr"]}
          style={styles.scanner}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text
          style={{
            color: "#fff",
            marginVertical: 16,
            textAlign: "center",
            fontFamily: "Sora_400Regular",
            fontSize: 26.0,
          }}
        >
          OR
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter code"
          placeholderTextColor="#fff"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.tabRectangle}>
        <View style = {styles.tabContainer}>
          <TouchableOpacity onPress = {() => navigation.navigate("Chats")} style = {styles.chatIcon}>
            <Icon name = 'chat' color = "#999" size = {30}/>
            <Text style = {{color:"#999", fontFamily: "Sora_400Regular"}}>Chats</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => navigation.navigate("ScanEvent")} style = {styles.eventIcon}>
            <Icon name = 'group' color = "#6FB16D" size = {35}/>
            <Text style = {{color:"#6FB16D", fontFamily: "Sora_400Regular", marginTop: -2}}>Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.calendarIcon}>
            <Icon name = 'event' color = "#999" size = {30}/>
            <Text style = {{color:"#999", fontFamily: "Sora_400Regular"}}>Calendar</Text>
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
  header: {
    paddingTop: 75.0,
    fontSize: 26.0,
    textAlign: "center",
    fontFamily: "Sora_700Bold",
    color: "#fff",
  },
  scannerContainer: {
    flex: 1,
    marginVertical: 40,
    aspectRatio: 1,
  },
  scanner: {
    flex: 1,
    marginLeft: "20%",
    width: "100%",
  },
  bottomContainer: {
    marginHorizontal: 40,
    marginTop: 0,
  },
  textInput: {
    color: "#fff",
    height: 55,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    fontFamily: "Sora_400Regular",
    fontSize: 20.0,
    paddingHorizontal: 16.0,
  },
  button: {
    height: 55,
    backgroundColor: "#6FB16D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20.0,
    marginVertical: 32.0,
  },
  buttonTitle: {
    textAlign: "center",
    fontSize: 26.0,
    color: "#fff",
    fontFamily: "Sora_700Bold",
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
    marginTop:-3,
  },
  calendarIcon: { 
    marginRight: -10,
  }
});

export default Scan;
