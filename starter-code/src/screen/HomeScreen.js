import React, { useState, useCallback } from "react";
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
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import HeaderBar from "../components/HeaderBar";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import { useItems } from "../components/ItemsContext";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { useEffect } from "react";



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
    console.log("JON! YOU DID THIS ", category);
    return data.filter((item) => item.category === categoryID);
  }
};

const HomeScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const [listings, setFiles] = useState([]);


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "listings"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New file", change.doc.data());
          setFiles((prevFiles) => [...prevFiles, change.doc.data()]);
        }
      });
    });
    return () => unsubscribe();
  }, []);

  const initialItems = [
    {
      id: 1,
      title: "Freddy",
      imageUrl: "https://static.wikia.nocookie.net/fnafapedia/images/f/f1/Ff.png/revision/latest?cb=20170527211636",
      price: 499.99,
      seller: "Five Nights At",
      description: "A high-quality animatronic with advanced features.",
      category: "Furniture",
    },
    {
      id: 2,
      title: "Bonnie",
      imageUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/52671c08-c1d4-443a-871c-2bbc036d9dbe/deouvme-31d6841f-5750-478f-a664-e59377b0a6e2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUyNjcxYzA4LWMxZDQtNDQzYS04NzFjLTJiYmMwMzZkOWRiZVwvZGVvdXZtZS0zMWQ2ODQxZi01NzUwLTQ3OGYtYTY2NC1lNTkzNzdiMGE2ZTIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.K-XIjsu8TGuPvEcfc7SjqtL5qkIOscQS_bBq2rNi9Jc",
      price: 349.99,
      seller: "William Afton",
      description: "A perfectly created bunny man.",
      category: "Clothing",
    },
    // Add more items as needed
  ];

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
    "Others"
  ];

  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: "All",
  });

  
  // useFocusEffect(
  //   useCallback(() => {
  //     // This will run on screen focus. Refresh your listings or perform any other action here.
  //     // Here, simply filtering the items again to force a refresh on the FlatList.
  //     setCategoryIndex((currentCategoryIndex) => {
  //       const refreshedItems = getItemList(currentCategoryIndex.category, [...listings, ...initialItems]);
  //       setFilteredItems(refreshedItems);
  //       return currentCategoryIndex;
  //     });
  //   }, [listings, initialItems, getItemList])
  // );

  useEffect(() => {
    // This effect will run whenever `listings` changes, including when it's first set.
    setFilteredItems(getItemList(categoryIndex.category, [...listings, ...items]));
  }, [listings, items, categoryIndex.category]);


  const [filteredItems, setFilteredItems] = useState(combinedItems); // State to hold filtered items

  const handleCategorySelect = (category, index) => {
    setCategoryIndex({ index: index, category: category });
    setFilteredItems(getItemList(category, combinedItems));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ItemDetails", { navigation, item })}
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
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor="#F2F1EB" />
      {/* Header Bar */}
      <HeaderBar title="Gaucho Sell" />

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
              onPress={() => handleCategorySelect(category, index)} // Implement onPress here
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
  ScreenContainer: {
    // flex: 1,
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    padding: 20,
  },
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

  // Category Selector Styles
  CategoryScrollViewStyle: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#f2f2f2", // Light grey background
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

export default HomeScreen;
