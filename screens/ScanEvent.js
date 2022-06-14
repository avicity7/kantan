import { Alert, StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "../firebase";
import globalStyles from "../styles/globalStyles";
import Input from "../components/Input";
import Button from "../components/Button";

const Scan = () => {
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
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Scan;
