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
    Alert,
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
import HeaderBarWithBack from "../components/HeaderBarWithBack";

import { COLORS } from "../theme/theme";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook
import FontAwesome from "@expo/vector-icons/FontAwesome";


const MyListingDetailScreen = ({ route }) => {
    const { navigation, item, myListing } = route.params;

    const delURL = myListing.imageURL;
    const delListingID = myListing.listingId;

    const handleDelete = async () => {
        try {
            // Delete the document from 'listings' collection
            await deleteDoc(doc(db, "listings", delListingID));

            // Delete the document from user's mylistings collection
            const userDocRef = doc(db, "users", item.lister);
            const userDocSnapshot = await getDoc(userDocRef);
            const myListingsArray = userDocSnapshot.data().myListings;
            const indexToDelete = myListingsArray.findIndex(
                (listing) => listing.listingId === delListingID
            );
            if (indexToDelete !== -1) {
                myListingsArray.splice(indexToDelete, 1);
            }
            await updateDoc(userDocRef, { myListings: myListingsArray });

            // Delete the document from user's mySaved collection
            await deleteDoc(
                doc(db, "users", item.lister, "mySaved", delListingID)
            );

            // Delete image from Firebase Storage
            const imageRef = ref(storage, delURL);
            await deleteObject(imageRef);

            // Show alert
            Alert.alert("Success", "Listing has been deleted", [
                {
                    text: "OK",
                    onPress: () => {
                        // Navigate back to my listingsafter deletion
                        // navigation.navigate("MyListings");
                        navigation.goBack();
                        navigation.goBack();
                    },
                },
            ]);
        } catch (error) {
            console.error("Error deleting document: ", error);
            // Handle error
        }
    };

    const handleEdit = () => {
        // Navigate to the edit screen passing necessary params
        // console.log("passing item", item);
        // console.log("listingID", delListingID);
        navigation.navigate("EditListing", { item, delListingID, navigation });
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.imageURL }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{truncateTitle(item.title, 25)}</Text>
                <Text style={styles.itemPrice}>
                    <FontAwesome
                            name="dollar"
                            size={13}
                            color={COLORS.yellow}
                        />
                    {item.price.toFixed(2)}
                </Text>
                <Text style={styles.itemSeller}>Seller: {item.lister}</Text>
                <Text style={styles.itemDescription}>
                        Description: {item.desc}
                </Text>
            </View>
        </View>
    );
    const truncateTitle = (title, maxLength) => {
        return title.length > maxLength
            ? title.substring(0, maxLength) + "..."
            : title;
    };
    return (
        <View style={styles.screenContainer}>
            <StatusBar backgroundColor="#F2F1EB" />
            <HeaderBarWithBack />

            {/* FlatList to render the item details */}
            <FlatList
                data={[item]} // Wrap item in an array since FlatList expects an array of data
                renderItem={renderItem}
                keyExtractor={(item) => item.imageURL}
            />
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.deleteButton}
                    onPress={() => {
                        // Show an alert to confirm before proceeding
                        Alert.alert(
                            "Confirmation",
                            "Are you sure you want to delete?",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel",
                                },
                                {
                                    text: "OK",
                                    onPress: handleDelete, // Proceed with delete if user confirms
                                },
                            ],
                            { cancelable: false }
                        );
                    }}
                >
                    Delete
                </Button>
                <Button style={styles.editButton} onPress={handleEdit}>
                    Edit
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        //backgroundColor: COLORS.l,
        height:"100%",
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
        color: COLORS.yellow,
        marginBottom: 4,
        fontWeight: "bold",
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
        marginBottom: 16,
    },
    editButton: {
        flex:2,
        backgroundColor: COLORS.lightYellow, // Blue color
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },

    deleteButton: {
        flex:1,
        backgroundColor: COLORS.lightGrey, // Red color
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight:10,
    },
  });

export default MyListingDetailScreen;
