import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { firestore } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function PostDBTest() {
    // TODO change this to post instead of read
    
    const [users, setUsers] = useState([]);

    async function getUsers() {
        console.log("calling getUsers");

        const usersCol = collection(firestore, "users");
        const userSnapshot = await getDocs(usersCol);
        const userList = userSnapshot.docs.map((doc) => doc.data());

        console.log(userList);

        setUsers(userList);

        console.log(users);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <View>
            {
                users.map((user, i) => <Text key={i}>{JSON.stringify(user)}</Text>)
            }
        </View>
    );
}
