import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";

const messageRooms = [
  {
    id: "r1",
    listing: "l1",
    users: ["me", "you"],
    // messages: [
    //   {
    //     id: "m1",
    //     from: "you",
    //     text: "received"
    //   },
    //   {
    //     id: "m2",
    //     from: "me",
    //     text: "sent"
    //   }
    // ]
  },
  {
    id: "r2",
    listing: "l2",
    users: ["me", "you"],
  },
];

const ChatScreen = () => {
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor="#F2F1EB" />
      <View style={styles.HeaderBar}>
        <TouchableOpacity>
          <Text style={styles.HeaderButton}>Edit</Text>
        </TouchableOpacity>
        <Text style={styles.ScreenHeader}>Messages</Text>
        <TouchableOpacity>
          {/* TODO replace with compose icon */}
          <Text style={styles.HeaderButton}>New</Text>
        </TouchableOpacity>
      </View>
      {messageRooms.map((room) => {
        return (
          <TouchableOpacity style={styles.Room}>
            <Text style={{ textAlign: "center", margin: 10 }}>
              Image
            </Text>
            <View>
              <Text style={styles.RoomTitle}>You ∙ {room.listing}</Text>
              <Text>Last text placeholder</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
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
  ScreenHeader: {
    textAlign: "center",
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  HeaderBar: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  HeaderButton: {
    color: "blue",
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: "#F2F1EB",
    width: "100%",
    height: "100%",
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});

export default ChatScreen;
