import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { firestore } from "../../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

export default function PostDBTest() {
    // TODO change this to post instead of read

    const [name, setName] = useState("");

    // this function will take email as id (primary key), and data and write it to user database
    async function addUser(id, data) {
        console.log("Adding user with id:", id);

        // Reference to the users collection
        const usersCol = collection(firestore, "users");

        // console.log(usersCol);

        // Add a new document with a generated id and log the result

        const docRef = await setDoc(doc(firestore, "users", id), data);
    }

    useEffect(() => {
        // modify the data when needed
        const data = {
            fname: "testing",
            lname: "test2",
            school: "ucsb",
        };
        const id = "test@gmail.com";
        addUser(id, data);
    }, []);

    // Placeholder content, adjust as needed
    return (
        <View>
            <Text>User added to Firestore!</Text>
        </View>
    );
}
