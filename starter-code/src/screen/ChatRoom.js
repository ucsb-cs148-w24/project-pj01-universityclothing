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
  LogBox,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

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
  getDocs,
  limit,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const ChatMessage = ({ message, user }) => {
  const { text, from } = message;

  if (text.length === 0) return null;

  const msgStyle = from === user ? styles.sentMsg : styles.receivedMsg;

  return (
    <View>
      <Text style={msgStyle}>{text}</Text>
    </View>
  );
};

const ChatRoom = ({ route }) => {
  console.warn = () => {};
  LogBox.ignoreLogs(["source.uri should not be an empty string"]);
  LogBox.ignoreLogs(["Non-serializable values"]);

  const dummy = useRef();

  const { room } = route.params;
  const navigation = useNavigation();

  const [roomData, setRoomData] = useState({ listing: "", users: ["", ""] });
  const [otherUser, setOtherUser] = useState("");
  const [listing, setListing] = useState({ imageURL: "", title: "" });
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");

  const auth = getAuth(firebaseApp);
  const [user] = useAuthState(auth);

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

      setListing(listingSnap.data());
    };

    fetchData();
  }, [roomData]);

  useEffect(() => {
    const fetchMsgs = async () => {
      if (otherUser === "") return;

      // const unsubMsgs = onSnapshot(
      //   messagesQ,
      //   (snapshot) => {
      //     // console.log(messages);
      //     // console.log(snapshot.docChanges());

      //     console.log("length: " + snapshot.docChanges().length);

      //     // if (snapshot.docChanges().length === messages.length) return;
      //     setMessages((prevMsgs) => {
      //       console.log(prevMsgs);
      //       snapshot.docChanges().forEach((change) => {
      //         prevMsgs.push(change.doc);
      //       });
      //       console.log(prevMsgs);
      //       return prevMsgs;
      //     });
      //     // snapshot.docChanges().forEach((change) => {
      //     //   setMessages((prevMsgs) => [...prevMsgs, change.doc]);
      //     //   // console.log(change.doc.data());
      //     //   // if (change.type === "added") {
      //     //   // }
      //     // });
      //   },
      //   (error) => console.log(error.message)
      // );

      // return () => unsubMsgs();

      const messagesQ = query(
        collection(firestore, "messageRooms", room, "messages"),
        orderBy("sentAt", "asc")
      );

      const msgsSnap = await getDocs(messagesQ);
      msgsSnap.forEach((msg) => {
        setMessages((prevMsgs) => [...prevMsgs, msg]);
      });

      const latestMsgQ = query(
        collection(firestore, "messageRooms", room, "messages"),
        orderBy("sentAt", "desc"),
        limit(1)
      );

      const unsubLatestMsg = onSnapshot(latestMsgQ, (msgSnap) => {
        setMessages((prevMsgs) => {
          // console.log(prevMsgs.length);
          if (
            prevMsgs.length === 0 ||
            prevMsgs[prevMsgs.length - 1].id !== msgSnap.docs[0].id
          ) {
            return [...prevMsgs, msgSnap.docs[0]];
          } else return prevMsgs;
        });
      });

      return () => unsubLatestMsg();
    };

    fetchMsgs();
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

  const shortenTitle = (title) => {
    const limit = 30;
    return title.length > limit ? title.substring(0, limit - 3) + "..." : title;
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor="#F2F1EB" />

      <View style={styles.HeaderBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.HeaderBarMiddle}
          onPress={() =>
            navigation.navigate("ItemDetails", {
              navigation,
              item: listing,
            })
          }
        >
          <Image source={{ uri: listing.imageURL }} style={styles.ListingImg} />
          <Text style={styles.RoomTitle}>
            {shortenTitle(otherUser + " ∙ " + listing.title)}
          </Text>
        </TouchableOpacity>
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
  HeaderBarMiddle: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  RoomTitle: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
  ListingImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
    marginRight: 5,
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
