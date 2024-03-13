import React, { useState } from "react";
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

const ChatRoomRow = (room, navigation) => {
  return (
    <TouchableOpacity
      key={room}
      style={styles.Room}
      onPress={() => navigation.navigate("ChatRoom", { navigation, room })}
    >
      <Text style={{ textAlign: "center", margin: 10 }}>Image</Text>
      <View>
        <Text style={styles.RoomTitle}>You ∙ {room}</Text>
        <Text>Last text placeholder</Text>
      </View>
    </TouchableOpacity>
  );
};

const ChatScreen = ({ navigation }) => {
  const [msgRooms, setMsgRooms] = useState(["9Zt37ePn4DVF8YFYMqj7"]);

  // const messagesQ = query(
  //   collection(firestore, "messageRooms", room, "messages"),
  //   orderBy("sentAt")
  // );

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor="#F2F1EB" />
      <View style={styles.HeaderBar}>
        <Text style={styles.ScreenHeader}>Messages</Text>
      </View>
      <ScrollView>
        {msgRooms.map((room) => ChatRoomRow(room, navigation))}
      </ScrollView>
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
