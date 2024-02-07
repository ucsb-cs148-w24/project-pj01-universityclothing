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
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HeaderBar from "../components/HeaderBar";
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from "react-native/Libraries/NewAppScreen";

const HomeScreen = () => {
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor="#F2F1EB" />
      {/* Header Bar */}
      <HeaderBar title="Gaucho Sell" />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    width: "100%",
    height: "100%",
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});

export default HomeScreen;
