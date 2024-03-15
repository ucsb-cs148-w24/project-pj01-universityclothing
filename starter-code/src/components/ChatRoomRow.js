import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  LogBox,
} from "react-native";

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

  const shortenText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit - 3) + "..." : text;
  };

  return (
    <TouchableOpacity
      key={room.rid}
      style={styles.Room}
      onPress={() =>
        navigation.navigate("ChatRoom", { navigation, room: room.rid })
      }
    >
      <Image source={{ uri: listing.imageURL }} style={styles.ListingImg} />
      <View>
        <Text style={styles.RoomTitle}>
          {shortenText(otherUser + " ∙ " + listing.title, 35)}
        </Text>
        <Text style={styles.LatestMsg}>
          {shortenText(room.latestMsg.text, 43)}
        </Text>
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
  ListingImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
    marginRight: 15,
  },
  LatestMsg: {
    color: "dimgray",
  },
});

export default ChatRoomRow;
