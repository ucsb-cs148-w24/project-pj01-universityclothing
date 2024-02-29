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

const ChatRoom = ({ route }) => {
  const { navigation, room } = route.params;

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor="#F2F1EB" />
      <View style={styles.HeaderBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.HeaderButton}>Back</Text>
        </TouchableOpacity>
        <Text style={{margin: 10}}>Image</Text>
        <Text style={styles.RoomTitle}>
          {room.users[0]} and {room.users[1]} ∙ {room.listing}
        </Text>
      </View>
      <Text>{room.id}</Text>
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
    backgroundColor: "#F2F1EB",
    width: "100%",
    height: "100%",
  },
});

export default ChatRoom;
