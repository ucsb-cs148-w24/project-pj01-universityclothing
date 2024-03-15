import React, {useState} from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  View,
} from "react-native";
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import ExitHeaderBar from "../components/ExitHeaderBar";
import {COLORS} from '../theme/theme';
import { useItems } from "../components/ItemsContext";

import { db, storage, firebaseApp, firestore} from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, updateDoc, getDoc, addDoc, onSnapshot } from 'firebase/firestore';
import { useEffect } from "react";
import FavoritesHeader from "./FavoritesHeader";

const getItemList = (category, data) => {
    if (category === "Clothing") {
        categoryID = 0;
    } else if (category === "Electronics") {
        categoryID = 1;
    } else if (category === "Home") {
        categoryID = 2;
    } else if (category === "Vehicles") {
        categoryID = 3;
    } else if (category === "Education") {
        categoryID = 4;
    } else if (category === "Collectibles") {
        categoryID = 5;
    } else if (category === "Health & Beauty") {
        categoryID = 6;
    } else if (category === "Sports & Outdoors") {
        categoryID = 7;
    } else if (category === "Arts & Crafts") {
        categoryID = 8;
    } else if (category === "Pet") {
        categoryID = 9;
    } else if (category === "Tools & Equipment") {
        categoryID = 10;
    } else if (category === "Others") {
        categoryID = 11;
    }

    if (category === "All") {
        return data;
    } else {
        return data.filter((item) => item.category === categoryID);
    }
};

const Favorites = ({navigation}) => {
    const [listings, setFiles] = useState([]);
    const [mySaved, setMySaved] = useState([])
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "listings"),
            (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    console.log("change", change.type);
                    if (change.type === "added") {
                        // Handle added documents
                        setFiles((prevFiles) => [
                            ...prevFiles,
                            change.doc.data(),
                        ]);
                    } else if (change.type === "removed") {
                        // Handle removed documents
                        const removedImageURL = change.doc.data().imageURL;
                        console.log("removed", removedImageURL);
                        console.log("listings", listings);
                        setFiles((prevFiles) =>
                            prevFiles.filter(
                                (item) => item.imageURL !== removedImageURL
                            )
                        );
                    }
                });
            }
        );

        return () => unsubscribe();
    }, []);

    const { items } = useItems();
    const combinedItems = [...listings, ...items];

    const categories = [
        "All",
        "Clothing",
        "Electronics",
        "Home",
        "Vehicles",
        "Education",
        "Collectibles",
        "Health & Beauty",
        "Sports & Outdoors",
        "Arts & Crafts",
        "Pet",
        "Tools & Equipment",
        "Others",
    ];

    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: "All",
    });

    useEffect(() => {
        // This effect will run whenever `listings` changes, including when it's first set.
        setFilteredItems(
            getItemList(categoryIndex.category, [...listings, ...items])
        );
    }, [listings, items, categoryIndex.category]);

    const [filteredItems, setFilteredItems] = useState(combinedItems); // State to hold filtered items

    const handleCategorySelect = (category, index) => {
        setCategoryIndex({ index: index, category: category });
        setFilteredItems(getItemList(category, combinedItems));
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            // here we will pass in the navigation, item
            // and the doc id and imageURl of the listing
            // so we can delete it later
            onPress={() =>
                navigation.navigate("MyListingDetail", {
                    navigation,
                    item,
                    myListing: myListings.find(
                        (listing) => listing.imageURL === item.imageURL
                    ),
                })
            }
            style={styles.itemContainer}
        >
            <Image source={{ uri: item.imageURL }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.itemSeller}>Seller: {item.lister}</Text>
            </View>
        </TouchableOpacity>
    );

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor="#F2F1EB" />
      {/* Header Bar */}
      <FavoritesHeader 
      navigation={navigation} 
      />
      {/* FlatList to render the item details */}
       {/* Category Selector */}
       <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.CategoryScrollViewStyle}
            >
                {categories.map((category, index) => (
                    <View
                        key={index.toString()}
                        style={styles.CategoryScrollViewContainer}
                    >
                        <TouchableOpacity
                            style={styles.CategoryScrollViewItem}
                            onPress={() =>
                                handleCategorySelect(category, index)
                            } // Implement onPress here
                        >
                            <Text
                                style={[
                                    styles.CategoryText,
                                    categoryIndex.index === index
                                        ? { color: COLORS.primaryOrangeHex }
                                        : {},
                                ]}
                            >
                                {category}
                            </Text>
                            {categoryIndex.index === index && (
                                <View style={styles.ActiveCategory} />
                            )}
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {/* Item List */}
            <View style={{ flex: 120 }}>
                <FlatList // !!! TODO: FIX FLEX VALUE !!!
                    data={filteredItems} // Use filteredItems here
                    renderItem={renderItem}
                    keyExtractor={(item) => item.imageURL}
                    style={styles.flatList}
                />
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  // Category Selector Styles
  CategoryScrollViewStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
  },
  CategoryScrollViewContainer: {
    marginRight: 10, // Space between category items
  },
  CategoryScrollViewItem: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  CategoryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  ActiveCategory: {
    position: "absolute",
    bottom: -2,
    height: 3,
    backgroundColor: COLORS.lightBlue,
    width: "100%",
    borderRadius: 1.5,
  },
});

export default Favorites;