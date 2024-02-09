import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
// app.tsx


import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { initializeApp } from "firebase/app";
import  setIsLoggedIn  from '../App.js';
import React, { useState } from 'react';


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
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

//google API request to find ucsb.edu end
//make a public_html folder
const signInWithGoogle = async (setIsLoggedIn) => {
  const response_type = "token";
const client_id = "402529839560-1c1cl2ggt8aa91e079u1btc1401cb6nm.apps.googleusercontent.com";
const redirect_uri = "https://sites.cs.ucsb.edu/~amisra/";
const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
const result = await WebBrowser.openAuthSessionAsync(
  `https://accounts.google.com/o/oauth2/v2/auth?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join("%20")}`
);
  if (result.type === 'success') {
    const access_token = Linking.parse(result.url).queryParams.access_token;

    // Handle the successful sign-in
    console.log('Google Login Success', access_token);

    // Set your isLoggedIn state to true or perform any other necessary actions
    setIsLoggedIn();
  } else {
    // Handle other cases (result.type === 'cancel' or result.type === 'dismiss')
    console.log('Google Login Error or Cancelled');
  }
};


const GoogleSignInButton = ({ setIsLoggedIn }) => {
  return (
    <View>
      <Text><Button title="Sign In with Google" onPress={() => signInWithGoogle(setIsLoggedIn)} /></Text>
    </View>
  );
};

const Login = ({ setIsLoggedIn }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to UCSB MarketPlace! Where only UCSB students can participate</Text>
      <GoogleSignInButton setIsLoggedIn={setIsLoggedIn} />
    </View>
  );
};

export default Login;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue'
  },
  buttonContainer: {
    marginTop: 20,
    fontSize: 240
  },
});