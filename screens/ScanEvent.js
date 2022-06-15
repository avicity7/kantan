import { Alert, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Icon } from "react-native-elements";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "../firebase";
import globalStyles from "../styles/globalStyles";
import Input from "../components/Input";
import Button from "../components/Button";

const Scan = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");

  const checkDatabase = async (code) => {
    const reference = doc(database, "events", code);
    const snapshot = await getDoc(reference);

    if (!snapshot.exists()) {
      Alert.alert(
        "Invalid code",
        "The code you have provided doesn't seem to exist. Please try again."
      );
    } else {
      try {
        await updateDoc(reference, {
          users: arrayUnion({ uid: auth.currentUser.uid }),
        })
          .then(() => {
            // TODO: Add to calendar
          })
          .finally(() =>
            console.log(
              `Added user with uid ${auth.currentUser.uid} to document ${code}`
            )
          );
      } catch (e) {
        console.error("Error updating document: ", e);
        Alert.alert(
          "Something went wrong",
          `Something went wrong when trying to update the database: ${e}`
        );
      }
    }
  };

  const onScanned = ({ data }) => {
    checkDatabase(data);
    setHasScanned(true);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Scan the QR Code</Text>
      <View style={styles.scannerContainer}>
        {hasPermission ? (
          <BarCodeScanner
            onBarCodeScanned={hasScanned ? undefined : onScanned}
            barCodeTypes={["qr"]}
            style={styles.scanner}
          />
        ) : (
          <>
            <Text style={styles.inadequatePermissionsHeader}>
              Inadequate permissions
            </Text>
            <Text style={styles.inadequatePermissionsText}>
              You have disabled this app's access to your camera. You will not
              be able to scan codes.
            </Text>
          </>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.orLabel}>OR</Text>
        <View style={globalStyles.center}>
          <Input placeholder="Enter code" onChangeText={setEnteredCode} />
          <Button
            text="Submit"
            onPress={() => checkDatabase(enteredCode.toUpperCase())}
          />
        </View>
      </View>
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
  scannerContainer: {
    height: "40%",
    aspectRatio: 1,
    marginVertical: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scanner: {
    height: "100%",
    width: "100%",
  },
  inadequatePermissionsHeader: {
    width: "100%",
    fontSize: 16,
    ...globalStyles.bold,
  },
  inadequatePermissionsText: {
    ...globalStyles.regular,
  },
  orLabel: {
    marginVertical: 16,
    ...globalStyles.regular,
    fontSize: 26.0,
  },
  bottomContainer: {
    marginHorizontal: 40,
    marginTop: 0,
    width: "85%",
  },
  tabRectangle: {
    backgroundColor: "#393939",
    width: "100%",
    height: 70,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: -35,
    marginTop: 25,
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

export default Scan;
