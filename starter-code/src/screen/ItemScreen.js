import React, { useState, useEffect } from "react";
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
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import ExitHeaderBar from "../components/ExitHeaderBar";
import { COLORS } from "../theme/theme";
import Entypo from "@expo/vector-icons/Entypo";
import { db,firebaseApp, firestore } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    doc,
    getDoc,
    updateDoc,
    setDoc,
    addDoc,
    collection,
    query,
    getDocs,
    where,
    limit,
    Timestamp,
} from "firebase/firestore";

const ItemScreen = ({ route }) => {
    const { navigation, item } = route.params;

    const [sellerName, setSellerName] = useState("");

    const auth = getAuth(firebaseApp);
    const [user] = useAuthState(auth);

    const saveListing = async () => {
      try {
        console.log("SAVE");
        console.log("EMAIL: ", user.email);
        const usersCol = collection(firestore, "users");
  
  
        const userDocRef = doc(usersCol, user.email);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();
        const updatedMySaved = userData.mySaved || [];
  
  
        if (updatedMySaved.some(savedItem => savedItem.imageURL === item.imageURL)) {
          alert("It's already saved");
          return; // Exit the function if the listing is already saved
        }
  
        updatedMySaved.push({
          name: item.title,
          imageURL: item.imageURL,
      });
  
  
        // Update the user document with the updated mySaved array
        await updateDoc(userDocRef, { mySaved: updatedMySaved});//cause error
        console.log("SAVE SUCCESS");
      } catch (error) {
        console.error("Error saving listing:", error);
      }
    };

    useEffect(() => {
        const fetchSeller = async () => {
            const sellerSnap = await getDoc(
                doc(firestore, "users", item.lister)
            );

            if (!sellerSnap.exists()) {
                console.log("Error: seller " + item.lister + " does not exist");
            }

            setSellerName(sellerSnap.data().name);
        };

        fetchSeller();
    }, []);

    const openChat = async () => {
        const listingQ = query(
            collection(firestore, "listings"),
            where("timePosted", "==", item.timePosted),
            where("title", "==", item.title),
            where("lister", "==", item.lister),
            limit(1)
        );
        const listingSnap = await getDocs(listingQ);
        
        const lid = listingSnap.docs[0].id;

        const roomQ = query(
            collection(firestore, "messageRooms"),
            where("listing", "==", lid),
            limit(1)
        );

        const roomsSnap = await getDocs(roomQ);
        if (roomsSnap.size > 0) {
            navigation.navigate("ChatRoom", { navigation, room: roomsSnap.docs[0].id });
        } else startChat(lid);
    };
    
    const startChat = async (lid) => {
        const newRoomRef = await addDoc(collection(firestore, "messageRooms"), {
            listing: lid,
            users: [user.email, item.lister],
        });
        await addDoc(collection(firestore, "messageRooms", newRoomRef.id, "messages"), {
            from: user.email,
            sentAt: Timestamp.now(),
            text: "",
        });

        await setDoc(
            doc(firestore, "users", user.email, "myMessageRooms", newRoomRef.id),
            {}
        );
        await setDoc(
            doc(firestore, "users", item.lister, "myMessageRooms", newRoomRef.id),
            {}
        );

        navigation.navigate("ChatRoom", { navigation, room: newRoomRef.id });
    };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageURL }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.itemSeller}>Seller: {sellerName}</Text>
        <Text style={styles.itemDescription}>Description: {item.desc}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={saveListing}>

        <Text style={styles.saveButtonText}>Liked</Text>
        </TouchableOpacity>
      </View>
      
            {user.email !== item.lister && (
                <TouchableOpacity
                    style={styles.msgButton}
                    onPress={openChat}
                >
                    <Text style={styles.msgButtonText}>
                        Message {sellerName}
                    </Text>
                </TouchableOpacity>
            )}
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
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    margin: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // height: 350,
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  saveButton: {
    backgroundColor: '#0C356A',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFC436',
    fontWeight: 'bold',
  },
    msgButton: {
        backgroundColor: COLORS.lightBlue, // Bright blue background
        borderRadius: 20, // Border-radius of 20px
        padding: 10, // Add padding for better visual appearance
        alignSelf: "center", // Center content horizontally
        width: "70%",
        marginTop: 20,
        marginBottom: 8,
    },
    msgButtonText: {
        color: "#fff", // Text color is white
        textAlign: "center",
    },
});

export default ItemScreen;