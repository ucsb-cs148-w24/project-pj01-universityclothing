import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Image,
} from "react-native";

import { firebaseApp, firestore } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDoc,
  orderBy,
  Timestamp,
  addDoc,
} from "firebase/firestore";

const ChatMessage = ({ message, user }) => {
  const { text, from } = message;

  const msgStyle = from === user ? styles.sentMsg : styles.receivedMsg;

  return (
    <View>
      <Text style={msgStyle}>{text}</Text>
    </View>
  );
};

const ChatRoom = ({ route }) => {
  const dummy = useRef();

  const { navigation, room } = route.params;

  const [roomData, setRoomData] = useState({ listing: "", users: ["", ""] });
  const [otherUser, setOtherUser] = useState("");
  const [listing, setListing] = useState({ lid: "", imageURL: "", title: "" });
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");

  const auth = getAuth(firebaseApp);
  const [user] = useAuthState(auth);

  const messagesQ = query(
    collection(firestore, "messageRooms", room, "messages"),
    orderBy("sentAt", "asc")
  );

  useEffect(() => {
    const fetchRoom = async () => {
      const roomSnap = await getDoc(doc(firestore, "messageRooms", room));
      setRoomData(roomSnap.data());
    };

    fetchRoom();
  }, []);

  useEffect(() => {
    if (roomData.listing === "") return;

    const fetchData = async () => {
      const otherUserEmail =
        user.email === roomData.users[0]
          ? roomData.users[1]
          : roomData.users[0];

      const otherUserSnap = await getDoc(
        doc(firestore, "users", otherUserEmail)
      );

      if (!otherUserSnap.exists()) {
        console.log("Error: other user " + otherUserEmail + " does not exist");
      }
      setOtherUser(otherUserSnap.data().name);

      const listingSnap = await getDoc(
        doc(firestore, "listings", roomData.listing)
      );

      if (!listingSnap.exists()) {
        console.log("Error: listing " + roomData.listing + " does not exist");
        return;
      }

      setListing({
        lid: roomData.listing,
        imageURL: listingSnap.data().imageURL,
        title: listingSnap.data().title,
      });
    };

    fetchData();
  }, [roomData]);

  useEffect(() => {
    if (otherUser === "") return;

    console.log("blahb lah");

    const unsubMsgs = onSnapshot(messagesQ, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setMessages((prevMsgs) => [...prevMsgs, change.doc]);
          console.log(change.doc.data());
        }
      });
    });

    return () => unsubMsgs();
  }, [otherUser]);

  const addMessage = (msg) => {
    if (msg === "") return;

    const newMsgRef = addDoc(
      collection(firestore, "messageRooms", room, "messages"),
      {
        from: user.email,
        sentAt: Timestamp.fromDate(new Date()),
        text: msg,
      }
    );
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor="#F2F1EB" />
      <View style={styles.HeaderBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.HeaderButton}>Back</Text>
        </TouchableOpacity>
        <Text style={{ margin: 10 }}>Image</Text>
        <Text style={styles.RoomTitle}>
          {otherUser + " ∙ " + listing.title}
        </Text>
      </View>

      <ScrollView
        ref={dummy}
        onContentSizeChange={() =>
          dummy.current.scrollToEnd({ animated: true })
        }
      >
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg.data()} user={user.email} />
          ))}
      </ScrollView>

      <View style={styles.sendMsgBar}>
        <TextInput
          style={styles.sendMsgInput}
          placeholder="Type a message"
          value={textInput}
          onChangeText={(txt) => setTextInput(txt)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addMessage(textInput);
            setTextInput("");
          }}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  RoomTitle: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
  HeaderButton: {
    color: "blue",
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
  },
  sentMsg: {
    alignSelf: "flex-end",
    borderRadius: 10,
    margin: 5,
    marginRight: 10,
    marginLeft: 35,
    padding: 8,
    backgroundColor: "deepskyblue",
    overflow: "hidden",
    elevation: 3,
  },
  receivedMsg: {
    alignSelf: "flex-start",
    borderRadius: 10,
    margin: 5,
    marginLeft: 10,
    marginRight: 35,
    padding: 8,
    backgroundColor: "lightgray",
    overflow: "hidden",
    elevation: 3,
  },
  sendMsgBar: {
    flexDirection: "row",
    height: 50,
    zIndex: 1,
    elevation: 4,
    marginTop: 5,
    paddingLeft: 3,
  },
  sendMsgInput: {
    backgroundColor: "#e8e8e8",
    flexBasis: 0,
    flexGrow: 1,
    paddingLeft: 7,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 2,
    elevation: 4,
    height: 50,
    width: 50,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    padding: 8,
    textAlign: "center",
  },
});

export default ChatRoom;
