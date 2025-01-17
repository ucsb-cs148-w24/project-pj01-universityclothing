import Login from "./src/screen/logInPage";
import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, LogBox } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/components/Navigator";
import HomeScreen from "./src/screen/HomeScreen";
import ItemScreen from "./src/screen/ItemScreen";
import ChatRoom from "./src/screen/ChatRoom";
import { ItemsProvider } from "./src/components/ItemsContext";
import MyListings from "./src/screen/MyListings";
import MyListingDetailScreen from "./src/screen/MyListingDetailScreen";
import Favorites from "./src/components/Favorites";
import EditListingScreen from "./src/screen/EditListingScreen";
import SavedItems from "./src/screen/SavedItems";
import ContactUsScreen from './src/screen/ContactUsScreen';

const Stack = createNativeStackNavigator();
const App = () => {
    LogBox.ignoreAllLogs();
    
    //pass func setIsLoggedIn usestate to login component usestate, setisloggedin = setisloggedin, call func on true
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <ItemsProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                {isLoggedIn ? (
                    <NavigationContainer independent={true}>
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen
                                name="Tab"
                                component={Navigator}
                                options={{ animation: "slide_from_bottom" }}
                            ></Stack.Screen>
                            <Stack.Screen
                                name="Login"
                                component={App}
                                options={({ navigation }) => ({
                                    navigation: navigation,
                                })}
                            ></Stack.Screen>
                            <Stack.Screen
                                name="ItemDetails"
                                component={ItemScreen}
                                options={({ navigation }) => ({
                                    navigation: navigation,
                                })}
                            ></Stack.Screen>
                            <Stack.Screen
                                name="MyListingDetail"
                                component={MyListingDetailScreen}
                                options={({ navigation }) => ({
                                    navigation: navigation,
                                })}
                            ></Stack.Screen>
                            <Stack.Screen
                                name="MyListings"
                                component={MyListings}
                                options={({ navigation }) => ({
                                    navigation: navigation,
                                })}
                            ></Stack.Screen>
                            <Stack.Screen
                                name="EditListing"
                                component={EditListingScreen}
                                options={({ navigation }) => ({
                                    navigation: navigation,
                                })}
                            ></Stack.Screen>
                            <Stack.Screen
                                name="ChatRoom"
                                component={ChatRoom}
                                options={({ navigation }) => ({
                                  navigation: navigation,
                                })}
                            ></Stack.Screen>
                            <Stack.Screen
                                name="Favorites"
                                component={Favorites}
                                options={({ navigation }) => ({
                                    navigation: navigation,
                                })}
                            ></Stack.Screen>
                            <Stack.Screen
                                name="ContactUs"
                                component={ContactUsScreen}
                                options={({ navigation }) => ({
                                    navigation: navigation,
                                })}
                            ></Stack.Screen>
                            <Stack.Screen
                                name="SavedItems"
                                component={SavedItems}
                                options={({ navigation }) => ({
                                    navigation: navigation,
                                })}
                            ></Stack.Screen>

                        </Stack.Navigator>
                    </NavigationContainer>
                ) : (
                    <Login setIsLoggedIn={setIsLoggedIn} />
                )}
            </SafeAreaView>
        </ItemsProvider>
    );
};

export default App;
