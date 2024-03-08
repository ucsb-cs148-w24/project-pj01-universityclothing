import React, {useState, useRef} from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import {COLORS} from '../theme/theme';
import searchByName from '../../data/data';
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  searchFunc = (search) => {
    searchByName(search);
    <TouchableOpacity
      onPress={() => navigation.navigate("ItemDetails", { navigation, item })}
    ></TouchableOpacity>
  };
  const resetSearch= () => {  
    setSearchTerm('');
  };
  return(
    <View style={styles.ScreenContainer}>
      <View style = {styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            type = 'text'
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            style = {styles.searchInput}
            placeholderTextColor={COLORS.black}
            placeholder='Search with key words'
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} 
          onPress={() => searchByName(setSearchTerm)}>
        <Entypo
           //style = {styles.Icon1}
           name="magnifying-glass"
           size={25}
           color={COLORS.lightYellow}
          />
        </TouchableOpacity>
        {searchTerm.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                resetSearch();
              }}>
              <Entypo
                name="cross"
                size={25}
                color={COLORS.lightYellow}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
      </View>

      <View>
      <Text style={styles.text}>Recent Search</Text> 
      <TouchableOpacity onPress={()=> {}}>
      <Text style={styles.text3}>desk lamp</Text>
      </TouchableOpacity>
      </View>
    </View>

    
  )
};
export default SearchScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    //flex: 1,
    backgroundColor: "#F2F1EB",
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    width: 370,
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    height: 40,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    //height: "100%",
  },
  searchInput:{
    color: "#000000",
    fontSize: 20,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.darkBlue,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text:{
    left:30,
    top:20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text2:{
    textAlign:'right',
    fontSize: 15,
    right:20,
  },
  text3:{
    textAlign:'left',
    fontSize: 15,
    top: 20,
    left:50,
    marginBottom:20,
    },
});
