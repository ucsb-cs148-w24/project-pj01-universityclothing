import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ReadDBTest from "./src/screen/ReadDBTest";
import HomeScreen from "./src/screen/HomeScreen";
import ChatScreen from "./src/screen/ChatScreen";
import LoginScreen from "./src/screen/LoginScreen";
import Profile from "./src/screen/Profile";
import SearchScreen from "./src/screen/SearchScreen";
import PostDBTest from "./src/screen/PostDBTest";

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            {/* <StatusBar style="auto" /> */}
            {/* <ReadDBTest /> */}
            <PostDBTest />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
