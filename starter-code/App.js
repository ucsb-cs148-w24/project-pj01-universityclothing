import Login from "./src/screen/logInPage";
import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/components/Navigator";
import HomeScreen from "./src/screen/HomeScreen";
import ItemScreen from "./src/screen/ItemScreen";
import { ItemsProvider } from "./src/components/ItemsContext";
import MyListings from "./src/screen/MyListings";

const Stack = createNativeStackNavigator();
const App = () => {
    //pass func setIsLoggedIn usestate to login component usestate, setisloggedin = setisloggedin, call func on true
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <ItemsProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                {isLoggedIn ? (
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen
                                name="Tab"
                                component={Navigator}
                                options={{ animation: "slide_from_bottom" }}
                            ></Stack.Screen>
                            <Stack.Screen
                                name="ItemDetails"
                                component={ItemScreen}
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
