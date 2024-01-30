import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import Profile from '../screens/Profile';
import SearchScreen from '../components/SearchScreen';
import CreateScreen from '../components/CreateScreen';
import Icons from '../components/Icons';

const Tab = createBottomTabNavigator();

const botton_bar = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icons
              name="home"
              size={25}
              color={
                focused ? COLORS.darkBlue : COLORS.darkBlue
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
            <Icons
              name="people"
              size={25}
              color={
                focused ? COLORS.darkBlue : COLORS.darkBlue
              }
            />
          ),
        }}>
        </Tab.Screen>

        <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icons
              name="diff-added"
              size={25}
              color={
                focused ? COLORS.darkBlue : COLORS.darkBlue
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
            <Icons
              name="search"
              size={25}
              color={
                focused ? COLORS.darkBlue : COLORS.darkBlue
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
            <Icons
              name="three-bars"
              size={25}
              color={
                focused ? COLORS.darkBlue : COLORS.darkBlue
              }
            />
          ),
        }}>
        </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create();

export default botton_bar;