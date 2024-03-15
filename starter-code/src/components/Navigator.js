import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../theme/theme";

import HomeScreen from "../screen/HomeScreen";
import ChatScreen from "../screen/ChatScreen";
import Profile from "../screen/ProfileScreen";
import CreateScreen from "../screen/PostScreen";

import Entypo from "@expo/vector-icons/Entypo";
import MyListings from "../screen/MyListings";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.yellow,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const Navigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Entypo
              name="home"
              size={25}
              color={focused ? COLORS.yellow : COLORS.darkBlue}
            />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo
              name="chat"
              size={25}
              color={focused ? COLORS.yellow : COLORS.darkBlue}
            />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Post"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="plus" size={45} color={COLORS.white} />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarLabel: "",
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="My Listings"
        component={MyListings}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo
              name="list"
              size={25}
              color={focused ? COLORS.yellow : COLORS.darkBlue}
            />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo
              name="user"
              size={25}
              color={focused ? COLORS.yellow : COLORS.darkBlue}
            />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Navigator;
