import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
// import { firebase, firestore } from "../../firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    // move to .ens later
    apiKey: "AIzaSyDR87GgBj0aOnBJ036ajWgCGT6NSlsaHlU",
    authDomain: "pj01-universityclothing.firebaseapp.com",
    databaseURL: "https://pj01-universityclothing.firebaseio.com",
    projectId: "pj01-universityclothing",
    storageBucket: "pj01-universityclothing.appspot.com",
    messagingSenderId: "402529839560",
    appId: "1:402529839560:ios:794d6ea342486d070478fd",
    // measurementId: 'G-measurement-id',
};

async function getUsers(firestore) {
    const usersCol = collection(firestore, "users");
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    return userList;
}

export default function TestDB() {
    const firebaseApp = initializeApp(firebaseConfig);
    // firestore is the firebase database we can read and write to
    const firestore = getFirestore(firebaseApp);
    const [user, setUser] = useState(null);

    async function getUser() {
        console.log("calling getUsers");
        const userlist = await getUsers(firestore);
        console.log(userlist);
        // const docRef = firestore
        //     .collection("users")
        //     .doc("ping-yujonathan@ucsb.edu");

        // console.log("get firestore");

        // try {
        //     const doc = await docRef.get();
        //     if (doc.exists) {
        //         console.log("Document data:", doc.data());
        //         // Update state with the user object
        //         setUser(doc.data());
        //     } else {
        //         console.log("No such document!");
        //     }
        // } catch (error) {
        //     console.error("Error getting document:", error);
        // }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <View>
            <Text>{JSON.stringify()}</Text>
            {/* <Text>{firestore}</Text> */}
        </View>
    );
}
