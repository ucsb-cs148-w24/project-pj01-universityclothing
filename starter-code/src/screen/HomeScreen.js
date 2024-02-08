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
import HeaderBar from "../components/HeaderBar";
import { useNavigation } from "@react-navigation/native";
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from "react-native/Libraries/NewAppScreen";

const HomeScreen = ({ navigation }) => {
  // const navigation = useNavigation();

  const items = [
    {
      id: 1,
      title: 'Freddy',
      imageUrl: 'https://static.wikia.nocookie.net/fnafapedia/images/f/f1/Ff.png/revision/latest?cb=20170527211636',
      price: 499.99,
      seller: 'Five Nights At',
      description: 'A high-quality animatronic with advanced features.',
    },
    {
      id: 2,
      title: 'Bonnie',
      imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/52671c08-c1d4-443a-871c-2bbc036d9dbe/deouvme-31d6841f-5750-478f-a664-e59377b0a6e2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUyNjcxYzA4LWMxZDQtNDQzYS04NzFjLTJiYmMwMzZkOWRiZVwvZGVvdXZtZS0zMWQ2ODQxZi01NzUwLTQ3OGYtYTY2NC1lNTkzNzdiMGE2ZTIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.K-XIjsu8TGuPvEcfc7SjqtL5qkIOscQS_bBq2rNi9Jc',
      price: 349.99,
      seller: 'William Afton',
      description: 'A perfectly created bunny man.',
    }
    // Add more items as needed
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ItemDetails', { navigation, item })}
      style={styles.itemContainer}
    >
    <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      <Text style={styles.itemSeller}>Seller: {item.seller}</Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor="#F2F1EB" />
      {/* Header Bar */}
      <HeaderBar title="Gaucho Sell" />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    width: "100%",
    height: "100%",
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  flatList: {
    marginTop: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000000',
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
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: Colors.darkBlue,
    marginBottom: 4,
  },
  itemSeller: {
    fontSize: 14,
    color: '#888888',
  },
});

export default HomeScreen;
