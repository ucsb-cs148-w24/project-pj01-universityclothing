import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
    ActivityIndicator,
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
    ScrollView,
} from "react-native";
import { useItems } from "../components/ItemsContext";
import { firebaseApp, firestore, db, storage } from "../../firebaseConfig";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    ref,
    deleteObject,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";

import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import HeaderBarWithBack from "../components/HeaderBarWithBack";

const EditListingScreen = ({ route }) => {
    const { handleNewPost } = useItems();
    const { item, delListingID, navigation } = route.params;
    // the doc id of the curent listing
    const listingId = delListingID;

    const [title, setTitle] = useState(item.title);
    const [price, setPrice] = useState(item.price.toString());
    const [description, setDescription] = useState(item.desc);
    const [category, setCategory] = useState(item.category.toString());
    const [imageUrl, setImageUrl] = useState(item.imageURL);
    const [condition, setCondition] = useState(item.condition.toString());
    const [isPosting, setIsPosting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // get the auth instance
    const auth = getAuth(firebaseApp);

    const [user, loading, error] = useAuthState(auth);
    let user_email = user.email;

    const options = [
        { label: "New", value: 0 },
        { label: "Used - Like New", value: 1 },
        { label: "Used - Good", value: 2 },
        { label: "Used - Fair", value: 3 },
    ];

    // Function to handle form submission, should add to our firebase database
    const handleSubmit = async () => {
        if (isPosting) return;
        if (
            title === item.title &&
            price === item.price.toString() &&
            description === item.desc &&
            category === item.category.toString() &&
            condition === item.condition.toString() &&
            imageUrl === item.imageURL
        ) {
            // Show alert indicating no changes were made
            alert("No changes were made to the listing");
            return;
        }

        if (
            !title ||
            !price ||
            !description ||
            !category ||
            condition === "" ||
            !imageUrl
        ) {
            alert("Please fill in all required fields");
            return;
        }

        setIsPosting(true);

        // upload the image here if
        console.log(imageUrl);
        const downloadURL = await uploadImage(imageUrl, "image");
        console.log(downloadURL);

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
            title: title,
            price: numericPrice,
            desc: description,
            category: numericCategory,
            condition: numericCondition,
            imageURL: downloadURL,
            lister: user_email, // Assuming user_email is defined elsewhere in your code
            isSelling: true,
        };

        // Show the data for debugging purposes

        // Add the listing with the data
        await updateListing(data);
        console.log(data);

        // Display the formatted data in an alert
        alert("Listing Updated");

        console.log("HERE");
        // navigation.navigate("MyListings");
        navigation.goBack();
        navigation.goBack();
        navigation.goBack();

        setIsPosting(false);
    };

    // need to update listing from listings
    // in mylisting and mysaved, just need to update image URL if modified.
    async function updateListing(data) {
        console.log("Updating listing");

        const listingRef = doc(db, "listings", listingId);

        // first delete the old image in the storage
        console.log("deleting", item.imageURL);
        const imageRef = ref(storage, item.imageURL);
        await deleteObject(imageRef);
        console.log("deleted");

        // Update the listing document in the listings collection
        console.log("updating", data);
        await updateDoc(listingRef, data);
        console.log("listing updated");

        // add the new URL to myListing
        const userDocRef = doc(db, "users", item.lister);
        console.log("userDocRef", userDocRef);
        const userDocSnapshot = await getDoc(userDocRef);
        console.log("userDocSnapshot", userDocSnapshot);
        const myListingsArray = userDocSnapshot.data().myListings;
        const indexToUpdate_listing = myListingsArray.findIndex(
            (listing) => listing.listingId === listingId
        );
        console.log("indexToUpdate_listing", indexToUpdate_listing);
        if (indexToUpdate_listing !== -1) {
            // Create a new array with the modified value
            const updatedListingsArray = [...myListingsArray];
            console.log(
                "old url",
                updatedListingsArray[indexToUpdate_listing].imageURL
            );
            updatedListingsArray[indexToUpdate_listing].imageURL =
                data.imageURL;
            console.log(
                "new url",
                updatedListingsArray[indexToUpdate_listing].imageURL
            );

            // Update the document with the new array
            await updateDoc(userDocRef, { myListings: updatedListingsArray });
        }
        console.log("myListings updated");
        // add the new URL to mySaved if its there
        const mySavedArray = userDocSnapshot.data().mySaved;
        const indexToUpdate_saved = mySavedArray.findIndex(
            (listing) => listing.listingId === listingId
        );
        if (indexToUpdate_saved !== -1) {
            // Create a new array with the modified value
            const updatedSavedArray = [...mySavedArray];

            updatedSavedArray[indexToUpdate_saved].imageURL = data.imageURL;

            // Update the document with the new array
            await updateDoc(userDocRef, { mySaved: updatedSavedArray });
        }

        console.log("mySaved updated");
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

        // Return a promise that resolves with the download URL
        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Handle upload progress
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setUploadProgress(progress);
                },
                (error) => {
                    // Handle unsuccessful uploads
                    reject(error);
                },
                () => {
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            console.log("File available at", downloadURL);
                            resolve(downloadURL); // Resolve the promise with the download URL
                        }
                    );
                }
            );
        });
    }

    return (
        // here are the inputs that users enter on the screen
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
                {/* <HeaderBarWithBack /> */}
                {isPosting && (
                    <View style={styles.overlayStyle}>
                        <ActivityIndicator size="large" color="#FFF" />
                        <Text style={styles.loadingText}>
                            Posting {Math.round(uploadProgress)}%
                        </Text>
                    </View>
                )}
                <Text style={styles.label}>Title</Text>
                <TextInput
                    placeholder={title}
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
                    onValueChange={(itemValue, itemIndex) =>
                        setCategory(itemValue)
                    }
                    value={category}
                    items={[
                        { label: "Clothing", value: "0" },
                        { label: "Electronics", value: "1" },
                        { label: "Home", value: "2" },
                        { label: "Vehicles", value: "3" },
                        { label: "Education", value: "4" },
                        { label: "Collectibles", value: "5" },
                        { label: "Health & Beauty", value: "6" },
                        { label: "Sports & Outdoors", value: "7" },
                        { label: "Arts & Crafts", value: "8" },
                        { label: "Pet", value: "9" },
                        { label: "Tools & Equipment", value: "10" },
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
                            <Text style={styles.choiceText}>
                                {option.label}
                            </Text>
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

                <TouchableOpacity
                    style={styles.postItemButton}
                    onPress={() => {
                        // Show an alert to confirm before proceeding
                        Alert.alert(
                            "Confirmation",
                            "Are you sure you want to update the listing?",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel",
                                },
                                {
                                    text: "OK",
                                    onPress: handleSubmit, // Proceed to handle submit if user confirms
                                },
                            ],
                            { cancelable: false }
                        );
                    }}
                    disabled={isPosting}
                >
                    {isPosting ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.postItemButtonText}>
                            Update Listing
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.postItemButton}
                    onPress={() => navigation.goBack()}
                    disabled={isPosting}
                >
                    {isPosting ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.postItemButtonText}>
                            Cancel Update
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
                        </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    overlayStyle: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.75)", // Darker overlay for better readability
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    loadingText: {
        marginTop: 16,
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "500",
    },
    selectImageButton: {
        backgroundColor: "#007bff", // Blue
        borderRadius: 5,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    selectImageButtonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    postItemButton: {
        backgroundColor: "#0C356A",
        borderRadius: 5,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    postItemButtonText: {
        color: "#FFC436",
        fontWeight: "bold",
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
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

export default EditListingScreen;
