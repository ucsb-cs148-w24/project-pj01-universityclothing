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
    //initialization for the whole items
    const [listings, setFiles] = useState([]);
    const [myListings, setMyListings] = useState([]);
    const [savedList, setSavedList] = useState([]);

    const auth = getAuth(firebaseApp);

    const [user] = useAuthState(auth);
    let user_email = user.email
    useEffect(() => {
        const docRef = doc(db, "users", user_email); // Construct a reference to the user document

        const unsubscribe = onSnapshot(
            docRef,
            async (docSnapshot) => {
                if (!docSnapshot.exists()) {
                    console.log("No matching user document found.");
                    return;
                }

                // Print the entire user document
                // console.log("User document:", docSnapshot.data());

                // Get the 'myListings' array from the user document
                const myListings = docSnapshot.data().mySaved;
                console.log("myListings: ", myListings)
                let savedList = [];
                for (let i = 0; i < myListings.length; i++) {
                    savedList.push(myListings[i].name);
                    //console.log("Listing ID:", myListings[i].name);
                }

                // Clear the listings array
                setFiles([]);
                setSavedList([]);
                // setMyListings([]);

                // You can then perform any action with the listings array, such as displaying it in your UI
                // we go through the list of listing IDs associated with the user, and get each doc from the listings collection
                // and add it to the listings array to display in the UI
                for (let i = 0; i < savedList.length; i++) {
                    const docRef = doc(db, "listings", savedList[i]);
                    //console.log(docRef)
                    const docSnap = await getDoc(docRef);

                    setFiles((prevFiles) => [...prevFiles, docSnap.data()]);
                }
                setSavedList(savedList);
                setMyListings(myListings);
            },
            (error) => {
                console.error("Error fetching user document:", error);
            }
        );

        return () => unsubscribe();
    }, []);
    const { items } = useItems();
    const combinedItems = [...listings, ...items];
    //initialization for the categories
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
    // initialization for the whole items
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: "All",
    });

    useEffect(() => {
        // This effect will run whenever `listings` changes, including when it's first set.
        setFilteredItems(
            getItemList(categoryIndex.category, [...listings])
        );
    }, [listings, categoryIndex.category]);

    const [filteredItems, setFilteredItems] = useState(listings); 

    // filter function
    const handleCategorySelect = (category, index) => {
        setCategoryIndex({ index: index, category: category });
        setFilteredItems(getItemList(category, listings));
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            // here we will pass in the navigation, item
            // and the doc id and imageURl of the listing
            // so we can delete it later
            onPress={() =>
                navigation.navigate("ItemDetails", {
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
  //flatlist
  flatList: {
    marginTop: 15,
},
itemContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
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
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
},
itemDetails: {
    flex: 1,
},
itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
},
itemPrice: {
    fontSize: 16,
    color: COLORS.lightBlue,
    marginBottom: 4,
},
itemSeller: {
    fontSize: 14,
    color: "#888888",
},

});

export default Favorites;