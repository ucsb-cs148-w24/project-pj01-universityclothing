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
import HomeScreen from '../screen/HomeScreen';


const goBackHome = () => {
  navigation.navigate('Home');
}

const ItemScreen = () => {
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor="#F2F1EB" />
      {/* Header Bar */}
      <HeaderBar title="Gaucho Item" />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ItemScreen;