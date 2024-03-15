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
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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

const HomeScreen = ({ navigation }) => {
    const [listings, setFiles] = useState([]);
    const [usersData, setUsersData] = useState({});

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "listings"), orderBy("timePosted", "asc")),
            (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    console.log("change", change.type);
                    if (change.type === "added") {
                        // Handle added documents
                        setFiles((prevFiles) => [
                            change.doc.data(),
                            ...prevFiles,
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
                    } else if (change.type === "modified") {
                        // the modified document
                        const modifiedData = change.doc.data();
                        console.log("modifiedData", modifiedData);
                        setFiles((prevFiles) =>
                            prevFiles.map((item) =>
                                item.timePosted === modifiedData.timePosted
                                    ? modifiedData
                                    : item
                            )
                        );
                    }
                });
            }
        );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "listings"), orderBy("timePosted", "asc")),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log("change", change.type);
          if (change.type === "added") {
            // Handle added documents
            setFiles((prevFiles) => [change.doc.data(), ...prevFiles]);
          } else if (change.type === "removed") {
            // Handle removed documents
            const removedImageURL = change.doc.data().imageURL;
            console.log("removed", removedImageURL);
            console.log("listings", listings);
            setFiles((prevFiles) =>
              prevFiles.filter((item) => item.imageURL !== removedImageURL)
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
  const [searchText, setSearchText] = useState("");
  //const [sortedItem, setSortedItem] = useState(
  //  combinedItems,
  //);

  //search function
  const searchItem = (search) => {
    setFilteredItems([
      ...combinedItems.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      ),
    ]);
  };

  const resetSearch = () => {
    setFilteredItems([...combinedItems]); //not sure
    setSearchText("");
  };

  const formatDate = (timePosted) => {
    if (timePosted && timePosted.dayOfWeek && timePosted.date && timePosted.month && timePosted.year) {
      return `${timePosted.dayOfWeek}, ${timePosted.month} ${timePosted.date}, ${timePosted.year}`;
    } else {
      return 'Invalid date';
    }
  };
  
  
  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ItemDetails", { navigation, item })}
      style={styles.itemContainer}
    >
      <Image source={{ uri: item.imageURL }} style={styles.itemImage} />
       {/* Date posted */}
       <Text style={styles.datePosted}>{formatDate(item.timePosted)}</Text>
      <View style={styles.itemDetails}>
      <Text style={styles.itemTitle}>{truncateTitle(item.title, 25)}</Text>
        <Text style={styles.itemPrice}>
          <FontAwesome name="dollar" size={13} color={COLORS.yellow} />
          {item.price.toFixed(2)}
        </Text>
        <Text style={styles.itemSeller}>ID: {item.listerDisplayName}</Text>
        <Text style={styles.itemSeller}>
          <Entypo name="email" size={14} color={"gray"} /> {item.lister}
        </Text>
       
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor="#F2F1EB" />
      {/* Header Bar */}
      <HeaderBar title="Gaucho Sell" />

      {/* Search Input */}

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Search with key words..."
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
            }}
            style={styles.searchInput}
            placeholderTextColor={"gray"}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                resetSearch();
              }}
            >
              <Entypo
                style={styles.Icon}
                name="cross"
                size={25}
                color={COLORS.black}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            searchItem(searchText);
          }}
        >
          <Entypo name="magnifying-glass" size={25} color={COLORS.darkBlue} />
        </TouchableOpacity>
      </View>
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
    //flex: 1,
    backgroundColor: "#f5f5f5",
    //width: "100%",
    height: "100%",
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 40,
    marginHorizontal: 10,
    margin: 10,
  },
  searchWrapper: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: COLORS.lightGrey,
    marginRight: "1%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  searchInput: {
    //textAlign: "center",
    color: "#000000",
    flex: 1,
    marginLeft: 20,
    //justifyContent:"flex-end",
    fontSize: 20,
  },
  Icon: {
    position: "absolute",
    marginVertical: -12,
    right: 10,
    //left:30,
    //marginLeft:"auto",
  },
  searchBtn: {
    width: 60,
    //marginRight:10,
    backgroundColor: COLORS.yellow,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "1%",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  flatList: {
    marginTop: 15,
  },
  flatListContent: {
    justifyContent: "center",
    alignItems: "center",
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
    position: "relative",
},
datePosted: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 10,
    color: 'gray',
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional for better visibility
    padding: 4,
    borderRadius: 6,
  },
itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
},
  itemDetails: {
    padding: 8,
    alignItems: "left",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 6,
  },
  itemPrice: {
    fontSize: 16,
    color: COLORS.yellow,
    marginBottom: 4,
    fontWeight: "bold",
  },
  itemSeller: {
    fontSize: 14,
    color: "#888888",
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

export default HomeScreen;
