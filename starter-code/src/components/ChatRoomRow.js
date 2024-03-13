import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { firebaseApp, firestore } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

const ChatRoomRow = ({ room, navigation }) => {
  const auth = getAuth(firebaseApp);
  const [user] = useAuthState(auth);

  const [otherUser, setOtherUser] = useState("");
  const [listing, setListing] = useState({ lid: "", imageURL: "", title: "" });

  useEffect(() => {
    const fetchData = async () => {
      const otherUserEmail =
        user.email === room.users[0] ? room.users[1] : room.users[0];

      const otherUserSnap = await getDoc(
        doc(firestore, "users", otherUserEmail)
      );

      if (!otherUserSnap.exists()) {
        console.log("Error: other user " + otherUserEmail + " does not exist");
        return;
      }

      setOtherUser(otherUserSnap.data().name);

      const listingSnap = await getDoc(
        doc(firestore, "listings", room.listing)
      );

      if (!listingSnap.exists()) {
        console.log("Error: listing " + room.listing + " does not exist");
        return;
      }

      setListing({
        lid: room.listing,
        imageURL: listingSnap.data().imageURL,
        title: listingSnap.data().title,
      });
    };

    fetchData();
  }, []);

  const shortenTitle = (title) => {
    const limit = 32;
    return title.length > limit ? title.substring(0, limit - 3) + "..." : title;
  };

  return (
    <TouchableOpacity
      key={room.rid}
      style={styles.Room}
      onPress={() =>
        navigation.navigate("ChatRoom", { navigation, room: room.rid })
      }
    >
      <Text style={{ textAlign: "center", margin: 10 }}>Image</Text>
      <View>
        <Text style={styles.RoomTitle}>
          {shortenTitle(otherUser + " ∙ " + listing.title)}
        </Text>
        <Text>{room.latestMsg.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Room: {
    height: 70,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    // borderWidth: 1,
    // borderColor: "blue",
  },
  RoomTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChatRoomRow;
