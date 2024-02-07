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
import ItemScreen from '../screen/ItemScreen';

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
    // Add more items as needed
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ItemDetails', { item })}
      style={styles.itemContainer}
    >
    <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
    <Text style={styles.itemTitle}>{item.title}</Text>
    <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
    <Text style={styles.itemSeller}>Seller: {item.seller}</Text>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: "#F2F1EB",
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
  itemContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  itemImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
});

export default HomeScreen;
