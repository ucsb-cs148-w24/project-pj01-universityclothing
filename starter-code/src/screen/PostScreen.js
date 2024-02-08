import React, { useState } from "react"; // Updated import statement
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker

const PostScreen = () => {
    const [title, setTitle] = useState(""); // State for the title
    const [price, setPrice] = useState(""); // State for the price
    const [description, setDescription] = useState(""); // State for the description
    const [condition, setCondition] = useState(""); // State for the condition

    // triggered when we hit the submit button
    const handleSubmit = () => {
        // Use Alert for iOS feedback
        Alert.alert(
            "Submission Confirmation", // Alert Title
            `Listing Submitted: ${title}, ${description}, ${condition}`, // Alert Message
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
    };
    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor="#F2F1EB" />
            <ScrollView contentContainerStyle={styles.ScrollViewFlex}>
                <Text>Post listing screen</Text>
                <TextInput
                    style={styles.TextInputStyle}
                    placeholder="Enter listing title here"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.TextInputStyle}
                    placeholder="Enter listing price here"
                    value={price}
                    onChangeText={setPrice}
                    multiline // Allows multiple lines
                    numberOfLines={4} // Default number of lines
                />
                <TextInput
                    style={styles.TextInputStyle}
                    placeholder="Enter listing description here"
                    value={description}
                    onChangeText={setDescription}
                    multiline // Allows multiple lines
                    numberOfLines={4} // Default number of lines
                />
                <Picker
                    selectedValue={condition}
                    onValueChange={(itemValue, itemIndex) =>
                        setCondition(itemValue)
                    }
                    style={styles.PickerStyle}
                >
                    <Picker.Item label="Select Condition" value="" />
                    <Picker.Item label="New" value="0" />
                    <Picker.Item label="Used - Like New" value="1" />
                    <Picker.Item label="Used - Good" value="2" />
                    <Picker.Item label="Used - Fair" value="3" />
                </Picker>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.SubmitButton}
                >
                    <Text style={styles.SubmitButtonText}>Submit Listing</Text>
                </TouchableOpacity>
            </ScrollView>
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
        padding: 20, // Added padding for better layout
    },
    TextInputStyle: {
        borderWidth: 1,
        borderColor: "#D1D1D1",
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#FFFFFF",
    },
    PickerStyle: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#D1D1D1",
        borderRadius: 5,
    },
});

export default PostScreen;
