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
  SafeAreaView
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
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ItemScreen = ({ route }) => {
    const { navigation, item } = route.params;
    const [isLiked, setIsLiked] = useState(false);

    const [sellerName, setSellerName] = useState("");

    const auth = getAuth(firebaseApp);
    const [user] = useAuthState(auth);

    const saveListing = async () => {
      setIsLiked(!isLiked);
      try {
        console.log("SAVE");
        console.log("EMAIL: ", user.email);
        const usersCol = collection(firestore, "users");
  
  
        const userDocRef = doc(usersCol, user.email);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();
        const updatedMySaved = userData.mySaved || [];
  
  
        if (updatedMySaved.some(savedItem => savedItem.id === item.id)) {
          const index = updatedMySaved.findIndex(savedItem => savedItem.id === item.id);
          //console.log("runned: ", index);
          if (index !== -1){
              userData.mySaved.splice(index, 1);
          }
          await updateDoc(userDocRef, { mySaved: userData.mySaved });
          return; // Exit the function if the listing is already saved
        }
  
        updatedMySaved.push({
          name: item.title,
          imageURL: item.imageURL,
          id: item.id,
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
        <Text style={styles.itemTitle}>{truncateTitle(item.title, 25)}</Text>
        
        <Text style={styles.itemPrice}>
          <FontAwesome
                name="dollar"
                size={13}
                color={COLORS.yellow}
            />
            {item.price.toFixed(2)}
        </Text>
        <Text style={styles.itemSeller}>Seller: {sellerName}</Text>
        <Text style={styles.itemDescription}>Description: {item.desc}</Text>
      </View>
    </View>
  );
  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength
        ? title.substring(0, maxLength) + "..."
        : title;
};


  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar backgroundColor="#F2F1EB" />
      {/* Header Bar */}
      <ExitHeaderBar navigation={navigation} />
      {/* FlatList to render the item details */}
      <FlatList
        data={[item]} // Wrap item in an array since FlatList expects an array of data
        renderItem={renderItem} 
        keyExtractor={(item) => item.imageURL}
      />
      <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={saveListing}
                >
                  <Entypo
                    name = "heart"
                    size = {25}
                    color={isLiked ? "#FF0000" : "#FFFFFF"}
                  />
                </TouchableOpacity>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    //backgroundColor: COLORS.lightGrey,
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
  msgButton: {
      flex:2,
      backgroundColor: COLORS.lightYellow, // Bright blue background
      borderRadius: 20, // Border-radius of 20px
      alignSelf: "center", // Center content horizontally
      paddingHorizontal: 20,
      paddingVertical: 10,
      //marginBottom: 8,
  },
  msgButtonText: {
      color: COLORS.darkBlue, // Text color is white
      textAlign: "center",
      fontWeight:"bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
},

  saveButton: {
      flex:1,
      backgroundColor: COLORS.lightGrey, // Red color
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight:10,
  },
});

export default ItemScreen;