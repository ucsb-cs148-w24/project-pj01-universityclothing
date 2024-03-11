import React from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    View,
    ToastAndroid,
} from "react-native";
import {
    getDocs,
    getDoc,
    doc,
    updateDoc,
    addDoc,
    collection,
    onSnapshot,
    deleteDoc,
    query,
    where,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { firebaseApp, firestore, db, storage } from "../../firebaseConfig";
import ExitHeaderBar from "../components/ExitHeaderBar";
import { COLORS } from "../theme/theme";
import { Button } from "react-native-paper";

const MyListingDetailScreen = ({ route }) => {
    const { navigation, item, myListing } = route.params;

    console.log("curr item", item);

    console.log("curr listing", myListing);
    const delURL = myListing.imageURL;
    const delListingID = myListing.listingId;
    console.log("delete image URL", delURL);
    console.log("delete listing id", delListingID);

    const handleDelete = async () => {
        try {
            // Delete the document from 'listings' collection
            await deleteDoc(doc(db, "listings", delListingID));
            // Delete the document from user's mylistings collection

            const userDocRef = doc(db, "users", item.lister);

            // Get the current value of the myListings field
            const userDocSnapshot = await getDoc(userDocRef);
            const myListingsArray = userDocSnapshot.data().myListings;

            // Find the index of the element to delete
            const indexToDelete = myListingsArray.findIndex(
                (listing) => listing.listingId === delListingID
            );

            if (indexToDelete !== -1) {
                // Remove the element from the array
                myListingsArray.splice(indexToDelete, 1);
            }

            // Update the document with the modified array
            await updateDoc(userDocRef, { myListings: myListingsArray });

            // Delete the documen from user's mySaved collection
            await deleteDoc(
                doc(db, "users", item.lister, "mySaved", delListingID)
            );
            // Delete image from Firebase Storage
            const imageRef = ref(storage, delURL);
            await deleteObject(imageRef);
            // Delete successful, navigate back to previous screen or perform any other action
            navigation.goBack(); // Example: Navigate back to previous screen after deletion
        } catch (error) {
            console.error("Error deleting document: ", error);
            // Handle error
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.imageURL }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.itemSeller}>Seller: {item.lister}</Text>
                <Text style={styles.itemDescription}>
                    Description: {item.desc}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.screenContainer}>
            <StatusBar backgroundColor="#F2F1EB" />
            {/* Header Bar */}
            <ExitHeaderBar navigation={navigation} />
            {/* FlatList to render the item details */}
            <FlatList
                data={[item]} // Wrap item in an array since FlatList expects an array of data
                renderItem={renderItem}
                keyExtractor={(item) => item.imageURL}
            />
            <Button onPress={handleDelete}>Delete</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
    },
    itemContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 8,
        margin: 16,
        padding: 16,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    itemImage: {
        width: "100%",
        height: 300,
        borderRadius: 8,
        marginBottom: 16,
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    itemPrice: {
        fontSize: 16,
        color: COLORS.primary,
        marginBottom: 8,
    },
    itemSeller: {
        fontSize: 14,
        color: COLORS.gray,
        marginBottom: 8,
    },
    itemDescription: {
        fontSize: 14,
        color: COLORS.gray,
    },
});

export default MyListingDetailScreen;
