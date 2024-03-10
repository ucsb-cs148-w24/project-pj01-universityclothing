import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
// app.tsx
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";

import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { initializeApp } from "firebase/app";
import setIsLoggedIn from "../../App.js";
import React, { useState } from "react";
import {
    GoogleAuthProvider,
    initializeAuth,
    signInWithCredential,
    getAuth,
} from "firebase/auth";

import { firestore } from "../../firebaseConfig";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase

const image = require("../assets/loginbackground.png"); // Adjust the path based on your project structure
const firebaseConfig = {
    // move to .ens later
    apiKey: "AIzaSyDR87GgBj0aOnBJ036ajWgCGT6NSlsaHlU",
    authDomain: "pj01-universityclothing.firebaseapp.com",
    databaseURL: "https://pj01-universityclothing.firebaseio.com/",
    projectId: "pj01-universityclothing",
    storageBucket: "pj01-universityclothing.appspot.com",
    messagingSenderId: "402529839560",
    appId: "1:402529839560:ios:794d6ea342486d070478fd",
    // measurementId: 'G-measurement-id',
};

async function addUser(id, data) {
    try {
        console.log("Adding user with id:", id);

        // Reference to the users collection
        const usersCol = collection(firestore, "users");

        // Check if a document with the provided email ID already exists
        const docRef = doc(usersCol, id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            console.log("Email already exists.");
            return; // Exit the function if the email already exists
        }

        // If the email doesn't exist, proceed to add the user
        await setDoc(docRef, data);
        console.log("User added successfully.");
    } catch (error) {
        console.error("Error adding user:", error);
    }
}

//google API request to find ucsb.edu end
//make a public_html folder
const signInWithGoogle = async (setIsLoggedIn) => {
    const response_type = "token";
    const client_id =
        "402529839560-1c1cl2ggt8aa91e079u1btc1401cb6nm.apps.googleusercontent.com";
    const redirect_uri = "https://sites.cs.ucsb.edu/~amisra/";
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
    ];

    const result = await WebBrowser.openAuthSessionAsync(
        `https://accounts.google.com/o/oauth2/v2/auth?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join(
            "%20"
        )}`
    );

    if (result.type === "success") {
        const urlParams = Linking.parse(result.url).queryParams;

        if (urlParams.access_token) {
            const access_token = Linking.parse(result.url).queryParams
                .access_token;

            // Use the access_token to make a request to the Google API
            const userInfoResponse = await fetch(
                "https://www.googleapis.com/oauth2/v1/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );

            if (userInfoResponse.ok) {
                const userInfo = await userInfoResponse.json();

                // Check if the user's email ends with "ucsb.edu"
                if (userInfo.email.endsWith("ucsb.edu")) {
                    // Handle the successful sign-in for UCSB email
                    let credential = GoogleAuthProvider.credential(
                        null,
                        access_token
                    );
                    const auth = getAuth();
                    signInWithCredential(auth, credential)
                        .then((userCredential) => {
                            // User signed in
                            var user = userCredential.user;
                            // console.log("Signed in user:", user);
                            const id = user.email;
                            const data = {
                                name: user.displayName,
                                myListings: [],
                                mySaved: [],
                            };

                            addUser(id, data);
                        })
                        .catch((error) => {
                            // Handle errors
                            console.error("Authentication error:", error);
                        });
                    console.log("Google Login Success", access_token);

                    // Set your isLoggedIn state to true or perform any other necessary actions
                    setIsLoggedIn(true);
                } else {
                    // Handle the case where the email doesn't end with "ucsb.edu"
                    console.log("Google Login Error: Not a UCSB email");
                    // You might want to display an error message to the user
                }
            } else {
                // Handle the case where fetching user info fails
                console.log("Error fetching user info from Google API");
            }
        } else {
            // Handle the case where access_token is not present in URL parameters
            console.log("Google Login Error: Access token not found");
            // You might want to display an error message to the user
        }
    } else {
        // Handle other cases (result.type === 'cancel' or result.type === 'dismiss')
        console.log("Google Login Error or Cancelled");
    }
};

const GoogleSignInButton = ({ setIsLoggedIn }) => {
    return (
        <View>
            <Text>
                <Button
                    title="Sign In with Google"
                    onPress={() => signInWithGoogle(setIsLoggedIn)}
                />
            </Text>
        </View>
    );
};

const Login = ({ setIsLoggedIn }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={image}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
            >
                <TouchableOpacity
                    style={styles.googleSignInButton}
                    onPress={() => signInWithGoogle(setIsLoggedIn)}
                >
                    <Text style={styles.googleSignInButtonText}>
                        Sign In with Google
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#3DCFFF",
        borderRadius: 20,
        width: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "blue",
    },
    buttonContainer: {
        marginTop: 20,
        fontSize: 240,
    },
    TouchableOpacity: {
        alignContent: "center",
    },
    googleSignInButton: {
        backgroundColor: "#3DCFFF", // Bright blue background
        borderRadius: 20, // Border-radius of 20px
        padding: 10, // Add padding for better visual appearance
        alignSelf: "center", // Center content horizontally
        marginTop: "160%",
        width: "70%",
    },
    googleSignInButtonText: {
        color: "#fff", // Text color is white
        textAlign: "center",
    },
});
