import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "../firebase";

const Scan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [hasScanned, setHasScanned] = useState(false);

  const onScanned = ({ type, data }) => {
    const checkDatabase = async () => {
      const reference = doc(database, "events", data);
      const snapshot = await getDoc(reference);

      if (!snapshot.exists()) {
        Alert.alert(
          "Invalid code",
          "The code you have scanned doesn't seem to exist. Please try again."
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
                `Added user with uid ${auth.currentUser.uid} to document ${data}`
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

    checkDatabase();
    setHasScanned(true);
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
  scannerContainer: {
    height: "25%",
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
    textAlign: "center",
    color: "#fff",
    fontFamily: "Sora_700Bold",
  },
  inadequatePermissionsText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Sora_400Regular",
  },
  bottomContainer: {
    marginHorizontal: 40,
    marginTop: 0,
    width: "85%",
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
});

export default Scan;
