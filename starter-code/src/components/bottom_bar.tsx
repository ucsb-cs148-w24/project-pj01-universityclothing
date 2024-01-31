import React from 'react';
import {StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';

import HomeScreen from '../screen/HomeScreen';
import ChatScreen from '../screen/ChatScreen';
import Profile from '../screen/Profile';
import SearchScreen from '../screen/SearchScreen';
import CreateScreen from '../screen/CreateScreen';
import Icons from './Icons';

const Tab = createBottomTabNavigator();

const bottom_bar = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => (
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
              name="home"
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

const styles = StyleSheet.create({});

export default bottom_bar;