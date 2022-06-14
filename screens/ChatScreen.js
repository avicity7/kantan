import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { TouchableOpacity, Text, View } from "react-native";
import {
  GiftedChat,
  renderBubble,
  Bubble,
  Composer,
  InputToolbar,
} from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";

import { auth } from "../firebase";
import { database } from "../firebase";
export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <View style={{ backgroundColor: "#333", flex: 1 }}>
      <GiftedChat
        messages={messages}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: "white",
                  fontFamily: "Sora_400Regular",
                },
                left: {
                  color: "white",
                  fontFamily: "Sora_400Regular",
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: "#555",
                },
                right: {
                  backgroundColor: "#6FB16D",
                },
              }}
            />
          );
        }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{ backgroundColor: "#333" }}
            renderComposer={(props1) => (
              <Composer
                {...props1}
                textInputStyle={{
                  color: "white",
                  fontFamily: "Sora_400Regular",
                }}
              />
            )}
          />
        )}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          name: auth?.currentUser?.email,
        }}
      />
    </View>
  );
}
