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
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import ExitHeaderBar from "../components/ExitHeaderBar";
import {COLORS} from '../theme/theme';

import { firebaseApp, firestore} from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';




const ItemScreen = ({ route }) => {
  const { navigation, item} = route.params;

  // const renderItem = ({ item }) => (
  //   <View style={styles.itemContainer}>
  //     <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
  //     <Text style={styles.itemTitle}>{item.title}</Text>
  //     <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
  //     <Text style={styles.itemSeller}>Seller: {item.seller}</Text>
  //     <Text style={styles.itemDescription}>Description: {item.description}</Text>
  //   </View>
  // );
  const auth = getAuth(firebaseApp);

  const [user] = useAuthState(auth);
  // let user_email = user.email;

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
        console.log("Listing already saved.");
        return; // Exit the function if the listing is already saved
      }

      updatedMySaved.push({imageURL: item.imageURL });

      console.log("Before await update doc");

      // Update the user document with the updated mySaved array
      await updateDoc(userDocRef, { mySaved: updatedMySaved});
      console.log("SAVE SUCCESS");
    } catch (error) {
      console.error("Error saving listing:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageURL }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.itemSeller}>Seller: {item.lister}</Text>
        <Text style={styles.itemDescription}>Description: {item.desc}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={saveListing}>
        <Text style={styles.saveButtonText}>Save Listing</Text>
        </TouchableOpacity>
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
});

export default ItemScreen;
