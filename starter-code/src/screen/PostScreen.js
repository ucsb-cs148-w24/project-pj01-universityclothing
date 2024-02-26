// PostCreationScreen.js
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";

import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { useItems } from "../components/ItemsContext";
import { firebaseApp, firestore, db, storage } from "../../firebaseConfig";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapsho } from "firebase/firestore";

import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const PostCreationScreen = ({ navigation }) => {
    const { handleNewPost } = useItems();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [condition, setCondition] = useState("");

    // get the auth instance
    const auth = getAuth(firebaseApp);

    const [user, loading, error] = useAuthState(auth);
    let user_email = user.email;

    // if (user) {
    //     console.log("User is signed in:", user_email);
    // } else {
    //     console.log("No user is signed in");
    // }

    const options = [
        { label: "New", value: 0 },
        { label: "Used - Like New", value: 1 },
        { label: "Used - Good", value: 2 },
        { label: "Used - Fair", value: 3 },
    ];

    // Function to handle form submission, should add to our firebase database
    const handleSubmit = () => {
        if (!title || !price || !description || !category || !condition) {
            alert("Please fill in all required fields");
            return;
        }

        // upload the image here
        downloadURL = uploadImage(imageUrl, "image");

        // Validate that price, condition, and category can be converted to numbers
        const numericPrice = Number(price);
        const numericCondition = Number(condition);
        const numericCategory = Number(category);

        if (
            isNaN(numericPrice) ||
            isNaN(numericCondition) ||
            isNaN(numericCategory)
        ) {
            alert("Price, condition, and category must be numeric values");
            return;
        }

        // Construct the data object with validated numeric values
        const data = {
            condition: numericCondition,
            price: numericPrice,
            desc: description,
            category: numericCategory,
            isSelling: true,
            title: title,
            imageURL: downloadURL,
            lister: user_email, // Assuming user_email is defined elsewhere in your code
        };

        // Show the data for debugging purposes
        alert(JSON.stringify(data));

        addListing(data);

        // Clear the form
        setTitle("");
        setPrice("");
        setDescription("");
        setCategory("");
        setImageUrl("");
        setDescription("");
    };
    async function addListing(data) {
        console.log("Adding listing");

        // Reference to the users collection
        const listingCol = collection(firestore, "listings");

        // console.log(usersCol);

        // Add a new document with a generated id and log the result

        // const docRef = doc(firestore, "listings");
        await addDoc(listingCol, data);
    }

    // Function to handle image selection
    const selectImage = async () => {
        // Requesting the permission to access the camera roll
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // this happen when we post item
        if (!result.cancelled) {
            // if we want multiple images we can make a for loop that iterates thru
            // assets from indices 0 -> n
            setImageUrl(result.assets[0].uri);
            // await uploadImage(result.assets[0].uri, "image");
        }
    };

    async function uploadImage(uri, fileType) {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, "Stuff/" + new Date().getTime());
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                console.log("Upload is five bytes at freddies");
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            },
            (error) => {
                // handle error
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    // await saveRecord(fileType, downloadURL, new Date().toISOString());
                    // Need to make a saveRecord function that will store seller, price, image/video, etc as a Record data type
                    setImage("");
                    // setVideo("");
                });
            }
        );
        return downloadURL;
    }

    return (
        // here are the inputs that users enter on the screen
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <Text style={styles.label}>Price</Text>
            <TextInput
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                style={styles.input}
                keyboardType="numeric"
                inputMode="decimal"
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                style={styles.input}
            />

            <Text style={styles.label}>Category</Text>
            <RNPickerSelect
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                items={[
                    { label: "Clothing and Fashion", value: "0" },
                    { label: "Electronics", value: "1" },
                    { label: "Home and Furniture", value: "2" },
                    { label: "Vehicles", value: "3" },
                    { label: "Books and Education", value: "4" },
                    { label: "Collectibles", value: "5" },
                    { label: "Health and Beauty", value: "6" },
                    { label: "Sports and Outdoors", value: "7" },
                    { label: "Arts and Crafts", value: "8" },
                    { label: "Pet Supplies", value: "9" },
                    { label: "Tools and Equipment", value: "10" },
                    { label: "Others", value: "11" },
                ]}
            />
            <Text style={styles.label}>Condition</Text>
            <View style={styles.choicesContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.choice,
                            condition === option.value
                                ? styles.choiceSelected
                                : null,
                        ]}
                        onPress={() => setCondition(option.value)}
                    >
                        <Text style={styles.choiceText}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Button title="Select Image" onPress={selectImage} />
            {imageUrl && (
                <Image
                    source={{ uri: imageUrl }}
                    style={{ width: 200, height: 200 }}
                />
            )}

            <Button title="Post Item" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    choicesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        // Additional styles for the choices container
    },
    choice: {
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        padding: 10,
        margin: 5,
        // Additional styles for each choice
    },
    choiceSelected: {
        backgroundColor: "#007bff",
        // Additional styles for a selected choice
    },
    choiceText: {
        color: "#000",
        // Text styles within each choice
    },
});

export default PostCreationScreen;
