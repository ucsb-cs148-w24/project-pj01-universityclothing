import React from "react";
import { StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../theme/theme";

import HomeScreen from '../screen/HomeScreen';
import ChatScreen from '../screen/ChatScreen';
import Profile from '../screen/ProfileScreen';
import SearchScreen from '../screen/SearchScreen';
import CreateScreen from '../screen/PostScreen';

import Entypo from "@expo/vector-icons/Entypo";


const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <Entypo
              name="home"
              size={25}
              color={
                focused ? COLORS.yellow : COLORS.darkBlue
              }
            />
          ),
        }}>
        </Tab.Screen>

        <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Entypo
              name="chat"
              size={25}
              color={
                focused ? COLORS.yellow : COLORS.darkBlue
              }
            />
          ),
        }}>
        </Tab.Screen>

        <Tab.Screen
        name="Post"
        component={CreateScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Entypo
              name="circle-with-plus"
              size={25}
              color={
                focused ? COLORS.yellow : COLORS.darkBlue
              }
            />
          ),
        }}>
        </Tab.Screen>

        <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Entypo
              name="magnifying-glass"
              size={25}
              color={
                focused ? COLORS.yellow : COLORS.darkBlue
              }
            />
          ),
        }}>
        </Tab.Screen>

        <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Entypo
              name="user"
              size={25}
              color={
                focused ? COLORS.yellow : COLORS.darkBlue
              }
            />
          ),
        }}>
        </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Navigator;
