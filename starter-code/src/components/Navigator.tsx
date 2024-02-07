import React from 'react';
import {StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';

import HomeScreen from '../screen/HomeScreen';
import ChatScreen from '../screen/ChatScreen';
import Profile from '../screen/Profile';
import SearchScreen from '../screen/SearchScreen';
import CreateScreen from '../screen/CreateScreen';

import Entypo from '@expo/vector-icons/Entypo';


// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import ItemScreen from '../screen/ItemScreen';


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

// const Stack = createStackNavigator();

// const Navigator2 = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="ItemScreen" component={ItemScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

const styles = StyleSheet.create({});

export default Navigator;