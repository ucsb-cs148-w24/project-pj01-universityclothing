import React, { useState, useEffect } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

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
  limit,
} from "firebase/firestore";

import ChatRoomRow from "../components/ChatRoomRow";

const ChatScreen = ({ navigation }) => {
  const auth = getAuth(firebaseApp);
  const [user] = useAuthState(auth);

  const [msgRooms, setMsgRooms] = useState([]);

  const updateRooms = (room) => {
    console.log(msgRooms);
    const newMsgRooms = msgRooms.filter((msgRoom) => msgRoom.rid !== room.rid);
    newMsgRooms.unshift(room);
    console.log(msgRooms);
    console.log(newMsgRooms);
    setMsgRooms(newMsgRooms);
    console.log(msgRooms);
  };

  useEffect(() => {
    const msgRoomsQ = query(
      collection(firestore, "users", user.email, "myMessageRooms")
    );

    const unsubMsgRooms = onSnapshot(msgRoomsQ, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          const curRoom = { rid: change.doc.id, latestMsg: {} };

          const roomRef = doc(firestore, "messageRooms", change.doc.id);
          const roomSnap = await getDoc(roomRef);

          if (!roomSnap.exists()) {
            console.log("Error: room " + change.doc.id + " does not exist");
            return;
          }

          curRoom.listing = roomSnap.data().listing;
          curRoom.users = roomSnap.data().users;

          const latestMsgQ = query(
            collection(firestore, "messageRooms", change.doc.id, "messages"),
            orderBy("sentAt", "desc"),
            limit(1)
          );
          const unsubLatestMsg = onSnapshot(latestMsgQ, (msgSnap) => {
            curRoom.latestMsg.sentAt = msgSnap.docs[0].data().sentAt.toDate();
            curRoom.latestMsg.text = msgSnap.docs[0].data().text;
            updateRooms(curRoom);
          });
        }
      });
    });

    return () => unsubMsgRooms();
  }, []);

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor="#F2F1EB" />
      <View style={styles.HeaderBar}>
        <Text style={styles.ScreenHeader}>Messages</Text>
      </View>
      <ScrollView>
        {msgRooms.map((room) => (
          <ChatRoomRow key={room.rid} room={room} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenHeader: {
    textAlign: "center",
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  HeaderBar: {
    width: "100%",
    paddingTop: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});

export default ChatScreen;
