import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Hello, World!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#508D69",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "#EEF296",
    fontSize: 30,
    fontWeight: "bold",
  },
});
