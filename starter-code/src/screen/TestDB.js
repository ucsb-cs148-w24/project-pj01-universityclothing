import { firebaseApp, firestore } from "../../firebaseConfig.js";
import { Text, View } from "react-native";

// Get a list of cities from your database
async function getUsers(firestore) {
    const users = collection(firestore, "users");
    const allUsers = await getDocs(users);
    console.log(allUsers);

    return allUsers;
}

export default function TestDB() {
    return (
        <View>
            {getUsers(firestore).then((allUsers) => {
                allUsers.forEach((user) => {
                    <Text>{user}</Text>;
                });
            })}
        </View>
    );
}
