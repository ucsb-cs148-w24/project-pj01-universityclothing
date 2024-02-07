import React from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ToastAndroid,
} from "react-native";

const CreateScreen = () => {
    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor="#F2F1EB" />
            <Text>Post Screen, this is where seller can create listing </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: "#F2F1EB",
        width: "100%",
        height: "100%",
    },
    ScrollViewFlex: {
        flexGrow: 1,
        justifyContent: "space-between",
    },
});

export default CreateScreen;
